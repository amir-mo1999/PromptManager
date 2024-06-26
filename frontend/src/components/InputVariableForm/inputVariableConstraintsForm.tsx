import React, { useState, Dispatch, SetStateAction } from "react"
import {
  StringInputConstraintsObj,
  NumericInputConstraintsObj,
  ImageFileInputConstraintsObj,
  AudioFileInputConstraintsObj,
} from "@/types"
import { inputOutputTypes } from "@/app/utils"
import TextField from "@mui/material/TextField"
import { IntegerInput } from "../Input/IntegerInput"
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

  // for string constraints
  const [maxCharLength, setMaxCharLength] = useState<number>(1000)
  const [minCharLength, setMinCharLength] = useState<number>(0)

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

  return (
    <>
      <IntegerInput
        value={maxCharLength}
        setValue={setMaxCharLength}
        label="max. character length"
        minValue={1}
      ></IntegerInput>
      <IntegerInput
        value={minCharLength}
        setValue={setMinCharLength}
        label="min. character length"
      ></IntegerInput>
    </>
  )
}

export { InputVariableConstraintsForm }
