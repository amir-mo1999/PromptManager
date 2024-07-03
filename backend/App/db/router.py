# import Python stuff
import os
from typing import Annotated
from bson import ObjectId
from datetime import datetime

# import FastAPI stuff
from fastapi import APIRouter, HTTPException, Path, Depends, File, UploadFile
from fastapi.responses import PlainTextResponse, JSONResponse
from pydantic import BaseModel

# import mongo client
from pymongo.mongo_client import MongoClient

# jwt stuff
from jose import JWTError

# import stuff from other modules
from ..models import (
    User,
    UserRouteInput,
    Project,
    ProjectRouteInput,
    ProjectList,
    AIFunction,
    AIFunctionRouteInput,
)
from ..utils import get_user
from ..utils.db_utils import calculate_file_hash
from ..auth import oauth2_scheme
from ..utils.auth_utils import decode_token


# define router object and add routes from routes folder
db_router = APIRouter(prefix="/db")


# set up mongo client
uri = os.environ.get("MONGO_CON_STRING")
client = MongoClient(uri)
db = client["prompt-broker"]


## User routes
@db_router.post("/user", tags=["Database Operations"])
async def post_user(user: UserRouteInput):
    # get user collection
    user_collection = db["users"]

    # check if user with this email exists; if not insert
    if user_collection.find_one({"email": user.email}):
        raise HTTPException(
            status_code=409, detail="User with this email already exists"
        )
    else:
        user_collection.insert_one(dict(user))

        return JSONResponse(content={"message": "User created"}, status_code=200)


@db_router.get("/user/{email}", response_model=User, tags=["Database Operations"])
async def get_user_route(
    email: str = Path(..., description="Email of the user to retrieve")
):
    user_data = get_user(email)

    if user_data:
        return user_data
    else:
        # If the user doesn't exist, raise an HTTPException with a 404 status code
        raise HTTPException(status_code=404, detail="User not found")


## Project routes
@db_router.post("/project", tags=["Database Operations"])
async def post_project(
    project_input: ProjectRouteInput,
    access_token: Annotated[str, Depends(oauth2_scheme)],
):
    # try decoding the token
    try:
        decoded_token = decode_token(access_token)
    except JWTError:
        raise HTTPException(status_code=400, detail="invalid access token")

    # get the username from the token
    username = decoded_token.sub

    # get project collection
    project_collection = db["projects"]

    # get user collection
    user_collection = db["users"]

    # check if username (email) exists in user collection
    if not user_collection.find_one({"email": username}):
        raise HTTPException(
            status_code=400,
            detail=f"User with the E-Mail {username} does not exist",
        )

    # check if a project with this title and user id already exists
    if project_collection.find_one(
        {"title": project_input.title, "username": username}
    ):
        raise HTTPException(
            status_code=409, detail="Project with this title already exists"
        )

    # get time stamp
    now = datetime.now()

    # set the number of functions in the project (at creation this is always zero)
    number_of_functions = 0

    # create the project object
    project = Project(
        **dict(project_input),
        number_of_functions=number_of_functions,
        creation_time=now,
        username=username,
    )

    # insert it to the collection
    project_collection.insert_one(dict(project))

    return JSONResponse(content={"message": "Project created"}, status_code=200)


@db_router.get("/get-all-projects", tags=["Database Operations"])
async def get_all_projects(access_token: Annotated[str, Depends(oauth2_scheme)]):

    # try decoding the token
    try:
        decoded_token = decode_token(access_token)
    except JWTError:
        raise HTTPException(status_code=400, detail="invalid access token")

    # get the username from the token
    username = decoded_token.sub

    # set the project collection
    project_collection = db["projects"]

    # retrieve all projects with the username from the token
    projects = project_collection.find({"username": username})

    # create the project list
    project_list = []
    for project in projects:
        project_list.append(project)
    project_list = ProjectList(project_list=project_list)

    return project_list


## AI Function routes
@db_router.post("/ai-function", tags=["Database Operations"])
async def post_ai_function(
    ai_function_input: AIFunctionRouteInput,
    access_token: Annotated[str, Depends(oauth2_scheme)],
):
    # try decoding the token
    try:
        decoded_token = decode_token(access_token)
    except JWTError:
        raise HTTPException(status_code=400, detail="invalid access token")

    # get the username from the token
    username = decoded_token.sub

    # get ai function collection
    ai_function_collection = db["ai-functions"]

    # get user collection
    user_collection = db["users"]

    # check if username (email) exists in user collection
    if not user_collection.find_one({"email": username}):
        raise HTTPException(
            status_code=400,
            detail=f"User with the E-Mail {username} does not exist",
        )

    # check if a ai function with this name and user id already exists
    if ai_function_collection.find_one(
        {"name": ai_function_input.name, "username": username}
    ):
        raise HTTPException(
            status_code=409, detail="AI Function with this name already exists"
        )

    # get time stamp
    now = datetime.now()

    # set the number of prompts written for the ai function (at creation this is always zero)
    number_of_prompts = 0

    # create the ai function object
    ai_function = AIFunction(
        **dict(ai_function_input),
        number_of_prompts=number_of_prompts,
        creation_time=now,
        username=username,
    )

    # insert it to the collection
    ai_function_collection.insert_one(ai_function.model_dump())

    return JSONResponse(content={"message": "AI function created"}, status_code=200)


## endpoint for uploading a file
@db_router.post("/upload-file", tags=["Database Operations"])
async def upload_file(
    access_token: Annotated[str, Depends(oauth2_scheme)], file: UploadFile = File(...)
):
    # try decoding the token
    try:
        decoded_token = decode_token(access_token)
    except JWTError:
        raise HTTPException(status_code=400, detail="invalid access token")

    # get the collection for saving the files
    collection = db["example-data-files"]

    try:
        # Read the file content
        file_content = await file.read()

        # Calculate the hash of the file content
        file_hash = calculate_file_hash(file_content)

        # check if the file already exists in the collection
        # if so just return its object id without creating a new document
        document = collection.find_one(
            {"hash": file_hash, "username": decoded_token.sub}
        )
        if document:
            return JSONResponse(
                content={"object_id": str(document["_id"])}, status_code=200
            )

        # Create a document with the file content, hash, and metadata
        document = {
            "filename": file.filename,
            "username": decoded_token.sub,
            "content_type": file.content_type,
            "content": file_content,
            "file_size": len(file_content),
            "hash": file_hash,
        }

        # Insert the document into the collection
        result = collection.insert_one(document)

        # Return the object ID of the inserted document
        return JSONResponse(
            content={"object_id": str(result.inserted_id)}, status_code=200
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@db_router.get("/get-file-meta-data/{object_id}", tags=["Database Operations"])
async def get_file_meta_data(
    access_token: Annotated[str, Depends(oauth2_scheme)],
    object_id: str,
):
    # try decoding the token
    try:
        decoded_token = decode_token(access_token)
    except JWTError:
        raise HTTPException(status_code=400, detail="invalid access token")

    # check if object id is valid
    if not ObjectId.is_valid(object_id):
        raise HTTPException(status_code=400, detail="invalid object id")

    # get the collection for saving the files
    collection = db["example-data-files"]

    # get the file document
    document = collection.find_one(
        {"_id": ObjectId(object_id)},
        {
            "_id": 0,
            "username": 0,
            "content_type": 0,
            "content": 0,
            "hash": 0,
        },
    )
    if not document:
        raise HTTPException(status_code=404, detail="file not found")

    return JSONResponse(content=document, status_code=200)
