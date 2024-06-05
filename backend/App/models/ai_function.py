from pydantic import (
    BaseModel,
    StringConstraints,
    Field,
    NonNegativeInt,
    EmailStr,
)
from typing import Annotated, List, Dict, Union
from .objectID import PydanticObjectId
from datetime import datetime


class AIFunctionRouteInput(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=30)]
    description: Annotated[str, StringConstraints(min_length=1, max_length=1000)]
    username: EmailStr
    example_dataset: Dict[str, Union[List[int], List[str], List[float]]]


class AIFunction(AIFunctionRouteInput):
    number_of_prompts: NonNegativeInt
    creation_time: datetime


class AIFunctionWithID(AIFunction):
    id: PydanticObjectId = Field(alias="_id")


class AIFunctionList(BaseModel):
    ai_function_list: List[AIFunctionWithID]
