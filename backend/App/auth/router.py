# import python stuff
from typing import Annotated
from datetime import timedelta

# import fast api stuff
from fastapi import Depends, HTTPException, status, APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

# jwt stuff
from jose import JWTError

# import other modules
from .utils import *

# define router object
auth_router = APIRouter(prefix="/auth")

# some global variables
ACCESS_TOKEN_EXPIRE_MINUTES = 60
HEADERS = headers = {"content-type": "application/json; charset=utf-8"}

# define oauth2_scheme; to protect an endpoint add this parameter "token: Annotated[str, Depends(oauth2_scheme)]"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# Test route
@auth_router.get("/")
async def home():
    return "Auth routes are running"


@auth_router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    """
    Endpoint for the login procedure. Takes username and password as form-data input.
    If credentials match a user in the database return a jwt token else return http exception 401.
    """

    # try to authenticate user
    user = authenticate_user(form_data.username, form_data.password)

    # if user was not found raise 401 exception
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # if user was found get access token and return it
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return JSONResponse(content=token, headers=HEADERS)


@auth_router.get("/get-current-user")
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    """Retrieve user data for user that is associated with the passed auth token."""

    # decode the token; return error message if token is invalid
    try:
        payload = decode_token(token)
    except JWTError:
        raise HTTPException(status_code=400, detail="invalid access token")

    # get username from decoded token
    username = payload.get("sub")

    # get user data from fake user database and return it
    user_data = get_user(username)
    user_data = user_data.dict(exclude={"hashed_password"})
    return user_data
