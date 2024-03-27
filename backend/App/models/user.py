from pydantic import BaseModel, EmailStr, StringConstraints
from enum import Enum
from typing import Annotated


class User(BaseModel):
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
