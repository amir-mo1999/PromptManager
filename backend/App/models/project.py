from pydantic import (
    BaseModel,
    StringConstraints,
    ConfigDict,
    Field,
    NonNegativeInt,
    EmailStr,
)
from typing import Annotated, List
from .objectID import PydanticObjectId
from datetime import datetime


class ProjectRouteInput(BaseModel):
    title: Annotated[str, StringConstraints(min_length=1)]
    description: Annotated[str, StringConstraints(min_length=1)]
    username: EmailStr


class Project(ProjectRouteInput):
    model_config = ConfigDict(use_enum_values=True)
    number_of_functions: NonNegativeInt
    creation_time: datetime


class ProjectWithID(Project):
    id: PydanticObjectId = Field(alias="_id")


class ProjectList(BaseModel):
    project_list: List[ProjectWithID]
