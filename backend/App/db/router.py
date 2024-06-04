from ..models import User, UserRouteInput, Project, ProjectRouteInput
from fastapi import APIRouter, HTTPException, Path
from fastapi.responses import PlainTextResponse
from pymongo.mongo_client import MongoClient
import os
from ..utils import get_user
from bson import ObjectId
from datetime import datetime

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

    return PlainTextResponse(content="User created", status_code=200)


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


## User routes
@db_router.post("/project", tags=["Database Operations"])
async def post_project(project_input: ProjectRouteInput):
    # get project collection
    project_collection = db["projects"]

    # get user collection
    user_collection = db["users"]

    # check if user id exists in user collection
    if not user_collection.find_one({"_id": ObjectId(project_input.user_id)}):
        raise HTTPException(
            status_code=400,
            detail=f"User with the id {project_input.user_id} does not exist",
        )

    # check if a project with this title and user id already exists
    if project_collection.find_one(
        {"title": project_input.title, "user_id": project_input.user_id}
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
    )

    # insert it to the collection
    project_collection.insert_one(dict(project))

    return PlainTextResponse(content="Project created", status_code=200)


# @db_router.get("/get-all-projects", )
