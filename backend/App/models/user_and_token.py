from .user import User
from .token import Token
from pydantic import BaseModel


class UserAndToken(BaseModel):
    user = User
    token = Token
