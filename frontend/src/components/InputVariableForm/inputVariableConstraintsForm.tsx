import React, { useState, Dispatch, SetStateAction } from "react"
import {
  StringInputConstraintsObj,
  NumericInputConstraintsObj,
  ImageFileInputConstraintsObj,
  AudioFileInputConstraintsObj,
} from "@/types"
import { inputOutputTypes } from "@/app/utils"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

interface inputVariableConstraintsFormProps {
  constraintType: string
  setConstraints: Dispatch<SetStateAction<{}>>
}

const InputVariableConstraintsForm: React.FC<inputVariableConstraintsFormProps> = ({
  constraintType,
}) => {
  // variable for constraints object
  let constraints = {}

  // initialize constraints object with the default constraints object for the respective constraints type
  const inputTypes = Object.keys(inputOutputTypes)
  switch (constraintType) {
    case inputTypes[0]:
      constraints = StringInputConstraintsObj.parse({})
      break
    case inputTypes[1]:
      constraints = NumericInputConstraintsObj.parse({})
      break
    case inputTypes[2]:
      constraints = ImageFileInputConstraintsObj.parse({})
      break
    case inputTypes[3]:
      constraints = AudioFileInputConstraintsObj.parse({})
      break
    default:
      throw new Error(`Constraint Type ${constraintType} is invalid`)
  }

  return ""
}

export { InputVariableConstraintsForm }
