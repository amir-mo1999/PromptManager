from pydantic import (
    BaseModel,
    StringConstraints,
    Field,
    NonNegativeInt,
    EmailStr,
    model_validator,
)
from typing import Annotated, List, Dict, Union, Literal
from .objectID import PydanticObjectId
from datetime import datetime
from .input_variable import InputVariable


class AIFunctionRouteInput(BaseModel):
    # name of the ai function
    name: Annotated[str, StringConstraints(min_length=1, max_length=30)]

    # description of the ai function
    description: Annotated[str, StringConstraints(min_length=1, max_length=1000)]

    # list of input variables
    input_variables: List[InputVariable] = Field(
        ...,
        example=[
            {"name": "text", "dtype": "string"},
            {"name": "number_of_sentences", "dtype": "int"},
        ],
        description="A list of input variables. Each input variable has a name and a type",
    )

    # output type; same type options as for input variables
    output_type: Literal["numeric", "string", "audio_file", "image_file"]

    # the example dataset works differently depending on what type of input data is used
    # for file inputs such as audio files or image files the object id of this file is saved in the dataset not the content of the file itself
    # for numeric or string inputs the actual value of the input is saved
    example_dataset: Dict[str, Union[List[Union[int, float]], List[str]]] = Field(
        ...,
        example={
            "text": [
                "This is an example text.",
                "This is an another example text.",
                "This is an yet another example text.",
                "This is one more example text.",
                "This is the last example text.",
            ],
            "number_of_sentences": [1, 1, 2, 2, 3],
            "output": [
                "This is the summarized text in one sentence.",
                "This is the summarized text in one sentence.",
                "This is the summarized text in two sentences.",
                "This is the summarized text in two sentences.",
                "This is the summarized text in three sentences.",
            ],
        },
    )

    @model_validator(mode="after")
    def validate_fields(self):
        # assert that the input variable names are present in the example dataset
        input_variable_names = []
        for input_variable in self.input_variables:
            input_variable_names.append(input_variable.name)

        for input_variable_name in input_variable_names:
            if input_variable_name not in self.example_dataset.keys():
                raise AssertionError(
                    f"The input variable {input_variable_name} is not present in the example dataset."
                )

        # assert that the output key is present in the example dataset
        if "output" not in self.example_dataset.keys():
            raise AssertionError(
                f"The 'output' key is not provided in the example dataset."
            )

        # assert that the example dataset does not contain additional keys other than 'output' or input variable names
        if len(self.example_dataset.keys()) != (len(input_variable_names) + 1):
            raise AssertionError(
                f"The example dataset contains additional keys other than 'output' or input variable names."
            )

        # assert that the example dataset contains at least 5 data points
        example_dataset_values = list(self.example_dataset.values())
        l = len(example_dataset_values[0])
        if l < 5:
            raise AssertionError(
                f"The example dataset does not contain at least 5 data points."
            )

        # assert that the example dataset value lists are all the same length
        for value in example_dataset_values[1:]:
            if len(value) != l:
                raise AssertionError(
                    f"The example dataset value lists are not all the same length."
                )

        # TODO: add validator to assert that the input types and the types of the example dataset match
        return self


class AIFunction(AIFunctionRouteInput):
    number_of_prompts: NonNegativeInt
    username: EmailStr
    creation_time: datetime


class AIFunctionWithID(AIFunction):
    id: PydanticObjectId = Field(alias="_id")


class AIFunctionList(BaseModel):
    ai_function_list: List[AIFunctionWithID]
