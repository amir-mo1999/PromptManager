from pydantic import BaseModel, StringConstraints
from typing import Annotated, Literal, Union
from .input_and_output_constraints import InputConstraints


# TODO: implement constraints
class InputVariable(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=40)]
    var_type: Literal["numeric", "string", "audio_file", "image_file"]
    constraints: InputConstraints
