from pydantic import BaseModel, StringConstraints
from typing import Annotated, Literal


class InputVariable(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=20)]
    dtype: Literal["int", "string", "float"]
