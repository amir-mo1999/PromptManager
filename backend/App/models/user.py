from pydantic import BaseModel, EmailStr
from enum import Enum


class User(BaseModel):
    class Role(str, Enum):
        developer = "developer"
        prompt_engineer = "prompt engineer"
        admin = "admin"

    email: EmailStr | None = None
    hashed_password: str
    role: Role

    class Config:
        use_enum_values = True
