from ..models import User, UserInput
from fastapi import APIRouter, HTTPException, Path
from fastapi.responses import PlainTextResponse
from pymongo.mongo_client import MongoClient
import os
from ..utils import get_user

# define router object and add routes from routes folder
db_router = APIRouter(prefix="/db")


# set up mongo client
uri = os.environ.get("MONGO_CON_STRING")
client = MongoClient(uri)
db = client["prompt-broker"]


## User routes
@db_router.post("/user")
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


@db_router.get("/user/{email}", response_model=User)
async def get_user_route(
    email: str = Path(..., description="Email of the user to retrieve")
):
    user_data = get_user(email)

    if user_data:
        return user_data
    else:
        # If the user doesn't exist, raise an HTTPException with a 404 status code
        raise HTTPException(status_code=404, detail="User not found")
