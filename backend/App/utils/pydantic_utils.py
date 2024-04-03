from typing import Iterable
from pydantic import BaseModel
import pydantic

# Function to dynamically create a new model


# Function to dynamically create a new model
def combine_models(*models):
    # Create a dictionary to hold fields
    fields = {}

    # Loop through each model
    for model in models:
        model_fields = {}
        # Extract fields from the model
        for field_name, field_type in model.__annotations__.items():
            model_fields[field_name] = field_type
        # Store fields of the model under model name
        fields[model.__name__] = model_fields

    # Create a new Pydantic model dynamically
    CombinedModel = type("CombinedModel", (BaseModel,), fields)

    return CombinedModel
