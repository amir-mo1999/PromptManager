from pydantic import BaseModel, StringConstraints, ConfigDict, Field
from typing import Annotated
from .objectID import PydanticObjectId


class ProjectInput(BaseModel):
    title: Annotated[str, StringConstraints(min_length=1)]
    description: Annotated[str, StringConstraints(min_length=1)]
    developer_id: PydanticObjectId = Field()


class Project(ProjectInput):
    model_config = ConfigDict(use_enum_values=True)

    id: PydanticObjectId = Field(alias="_id")
