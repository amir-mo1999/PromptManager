from pydantic import BaseModel, StringConstraints
from typing import Annotated, Literal


class InputVariable(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=40)]
    dtype: Literal["int", "string", "float"]


class NumericInput(BaseModel):
    pass


class StringInput(BaseModel):
    pass


class AudioFileInput(BaseModel):
    pass


class ImageFileInput(InputVariable):
    pass
