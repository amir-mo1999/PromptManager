import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import TextField from "@mui/material/TextField"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { StringInputConstraintsObj } from "@/types"
import { Typography } from "@mui/material"
import { TextInputField } from "@/components/Input"

interface TextRecordFormProps {
  inputVariable: inputVariableType
  errorIndx: number
  errorList: Array<boolean>
  setErrorList: Dispatch<SetStateAction<Array<boolean>>>
  record: Record<string, string | number>
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
  startValue?: string
}

const TextRecordForm: React.FC<TextRecordFormProps> = ({
  inputVariable,
  record,
  setRecord,
  errorIndx,
  errorList,
  setErrorList,
  startValue = "",
}) => {
  const [value, setValue] = useState<string>(startValue)
  const [isError, setIsError] = useState<boolean>(false)
  const constraints = StringInputConstraintsObj.parse(inputVariable.constraints)

  function onChange() {
    let auxRecord: { [key: string]: string | number } = {}
    auxRecord[inputVariable.name] = value
    setRecord({ ...record, ...auxRecord })
  }

  useEffect(onChange, [value])

  function updateErrorList() {
    const aux = errorList
    if (isError || value === "") {
      aux[errorIndx] = true
    } else {
      aux[errorIndx] = false
    }
    setErrorList([...aux])
  }
  useEffect(updateErrorList, [isError, value])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        justifyContent: "space-between",
      }}
    >
      <Typography>Variable: </Typography>
      <Typography fontWeight="bold">{inputVariable.name}</Typography>
      <TextInputField
        value={value}
        valueSetter={setValue}
        isError={isError}
        setIsError={setIsError}
        minChars={constraints.min_char_length}
        maxChars={constraints.max_char_length}
      ></TextInputField>
    </Box>
  )
}

export { TextRecordForm }
