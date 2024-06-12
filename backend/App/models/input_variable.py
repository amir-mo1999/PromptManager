from pydantic import BaseModel, StringConstraints
from typing import Annotated, Literal


class InputVariable(BaseModel):
    var_name: Annotated[str, StringConstraints(min_length=1, max_length=20)]
    var_type: Literal["int", "string", "float"]
