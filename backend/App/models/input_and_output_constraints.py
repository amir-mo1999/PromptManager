from pydantic import BaseModel
from typing import Union, Literal


class StringInputConstraints(BaseModel):
    type: Literal["string"]
    max_char_length: int = 1000
    min_char_length: int = 0


class NumericInputConstraints(BaseModel):
    type: Literal["numeric"]
    max_value: Union[int, float] = float("inf")
    min_value: Union[int, float] = -float("inf")


class AudioFileInputConstraints(BaseModel):
    type: Literal["audio_file"]
    max_file_size: float = float("inf")
    min_file_size: float = 0
    min_length: float = 0
    max_length: float = float("inf")


class ImageFileInputConstraints(BaseModel):
    type: Literal["image_file"]
    max_file_size: float = float("inf")
    min_file_size: float = 0
    min_width: float = 0
    max_width: float = float("inf")
    min_height: float = 0
    max_height: float = float("inf")


class StringOutputConstraints(StringInputConstraints):
    type: Literal["string"]


class NumericOutputConstraints(NumericInputConstraints):
    type: Literal["numeric"]


class AudioFileOutputConstraints(AudioFileInputConstraints):
    type: Literal["audio_file"]


class ImageFileOutputConstraints(ImageFileInputConstraints):
    type: Literal["image_file"]
