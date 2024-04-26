from pydantic import BaseModel, EmailStr, StringConstraints, ConfigDict, Field
from enum import Enum
from typing import Annotated, Literal
from .objectID import PydanticObjectId


class UserInput(BaseModel):
    email: EmailStr
    first_name: Annotated[str, StringConstraints(min_length=1)]
    last_name: Annotated[str, StringConstraints(min_length=1)]
    role: Literal["developer", "prompt_engineer", "admin"]
    hashed_password: Annotated[str, Field(exclude=True)]


class User(UserInput):
    model_config = ConfigDict(use_enum_values=True)

    id: PydanticObjectId = Field(alias="_id")


class UserWithAccessToken(BaseModel):
    access_token: str
    email: EmailStr
    first_name: Annotated[str, StringConstraints(min_length=1)]
    last_name: Annotated[str, StringConstraints(min_length=1)]
    role: Literal["developer", "prompt engineer", "admin"]
    id: PydanticObjectId = Field(alias="_id")
