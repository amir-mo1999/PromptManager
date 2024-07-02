import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import TextField from "@mui/material/TextField"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { StringInputConstraintsObj } from "@/types"

interface TextRecordFormProps {
  inputVariable: inputVariableType
  setDataset: Dispatch<SetStateAction<Record<string, (string | number)[]>>>
  setDisableCreateButton: Dispatch<SetStateAction<boolean>>
}

const TextRecordForm: React.FC<TextRecordFormProps> = ({
  inputVariable,
  setDataset,
  setDisableCreateButton,
}) => {
  const [value, setValue] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)
  const [helperText, setHelperText] = useState<string>("")
  const constraints = StringInputConstraintsObj.parse(inputVariable.constraints)
  function onChange(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
    setValue(e.target.value)
    checkMinCharLength(e.target.value)
  }

  function checkMinCharLength(value: string) {
    if (value.length < constraints.min_char_length) {
      setIsError(true)
      setHelperText(`Must contain at least ${constraints.min_char_length} characters`)
    } else {
      setIsError(false)
      setHelperText("")
    }
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
    checkMinCharLength(e.target.value)
  }

  function checkDisableCreateButton() {
    if (value === "") {
      setDisableCreateButton(true)
    } else if (isError) {
      setDisableCreateButton(true)
    } else {
      setDisableCreateButton(false)
    }
  }

  useEffect(checkDisableCreateButton, [value, isError, setIsError])
  useEffect(checkDisableCreateButton, [])

  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      required={true}
      onChange={onChange}
      helperText={helperText}
      error={isError}
      onBlur={onBlur}
      inputProps={{ maxLength: constraints.max_char_length }}
    />
  )
}

export { TextRecordForm }
