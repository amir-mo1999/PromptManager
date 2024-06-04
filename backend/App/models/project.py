from pydantic import BaseModel, StringConstraints, ConfigDict, Field, NonNegativeInt
from typing import Annotated, Optional
from .objectID import PydanticObjectId
from datetime import datetime


class ProjectRouteInput(BaseModel):
    title: Annotated[str, StringConstraints(min_length=1)]
    description: Annotated[str, StringConstraints(min_length=1)]
    user_id: PydanticObjectId = Field()


class Project(ProjectRouteInput):
    model_config = ConfigDict(use_enum_values=True)
    number_of_functions: NonNegativeInt
    creation_time: datetime


class ProjectWithID(Project):
    id: PydanticObjectId = Field(alias="_id")
