from pydantic import BaseModel, EmailStr, StringConstraints, Field
from enum import Enum
from typing import Annotated
from pydantic_mongo import AbstractRepository, ObjectIdField


class UserInput(BaseModel):
    class Role(str, Enum):
        developer = "developer"
        prompt_engineer = "prompt engineer"
        admin = "admin"

    email: EmailStr
    first_name: Annotated[str, StringConstraints(min_length=1)]
    last_name: Annotated[str, StringConstraints(min_length=1)]
    hashed_password: str
    role: Role

    class Config:
        use_enum_values = True


class User(BaseModel):
    class Role(str, Enum):
        developer = "developer"
        prompt_engineer = "prompt engineer"
        admin = "admin"

    _id: ObjectIdField
    email: EmailStr
    first_name: Annotated[str, StringConstraints(min_length=1)]
    last_name: Annotated[str, StringConstraints(min_length=1)]
    hashed_password: str
    role: Role

    class Config:
        use_enum_values = True
