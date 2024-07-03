import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import Typography from "@mui/material/Typography"
import { NumericInputConstraintsObj } from "@/types"
import { NumberInput } from "@/components/Input"
import { useState, useEffect, Dispatch, SetStateAction } from "react"

interface NumericRecordFormProps {
  inputVariable: inputVariableType
  record: Record<string, string | number>
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
  startValue?: number
}
const NumericRecordForm: React.FC<NumericRecordFormProps> = ({
  inputVariable,
  record,
  setRecord,
  startValue,
}) => {
  const [value, setValue] = useState<number>(0)
  const constraints = NumericInputConstraintsObj.parse(inputVariable.constraints)

  // initialize the value based on the start value
  function initValue() {
    if (startValue === undefined) {
      setValue(constraints.min_value)
    } else {
      setValue(startValue)
    }
  }
  useEffect(initValue, [])

  function onChange() {
    let auxRecord: { [key: string]: string | number } = {}
    auxRecord[inputVariable.name] = value
    setRecord({ ...record, ...auxRecord })
    console.log(record)
  }

  useEffect(onChange, [value])

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
      <NumberInput
        value={value}
        setValue={setValue}
        minValue={constraints.min_value}
        maxValue={constraints.max_value}
      ></NumberInput>
    </Box>
  )
}

export { NumericRecordForm }
