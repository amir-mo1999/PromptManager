from ..models import User, UserInput, Project, ProjectInput
from fastapi import APIRouter, HTTPException, Path
from fastapi.responses import PlainTextResponse
from pymongo.mongo_client import MongoClient
import os
from ..utils import get_user
from bson import ObjectId

# define router object and add routes from routes folder
db_router = APIRouter(prefix="/db")


# set up mongo client
uri = os.environ.get("MONGO_CON_STRING")
client = MongoClient(uri)
db = client["prompt-broker"]


## User routes
@db_router.post("/user", tags=["Database Operations"])
async def post_user(user: UserInput):
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
async def post_project(project: ProjectInput):
    # get project collection
    project_collection = db["projects"]

    # get user collection
    user_collection = db["users"]

    # check if id is valid

    # check if developer id exists in user collection
    if not user_collection.find_one(
        {"_id": ObjectId(project.developer_id), "role": "developer"}
    ):
        raise HTTPException(
            status_code=400,
            detail=f"Developer with the id {project.developer_id} does not exist",
        )

    # check if a project with this title and developer id already exists
    if project_collection.find_one(
        {"title": project.title, "developer_id": project.developer_id}
    ):
        raise HTTPException(
            status_code=409, detail="Project with this title already exists"
        )

    # create project
    project_collection.insert_one(dict(project))

    return PlainTextResponse(content="Project created", status_code=200)
