import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import { TextInputField } from "@/components/Input"
import { NumericInputConstraintsObj } from "@/types"

import { useState, Dispatch, SetStateAction } from "react"

interface NumericRecordFormProps {
  inputVariable: inputVariableType
  record: Record<string, string | number>
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
  setDisableCreateButton: Dispatch<SetStateAction<boolean>>
}
const NumericRecordForm: React.FC<NumericRecordFormProps> = ({
  inputVariable,
  record,
  setRecord,
  setDisableCreateButton,
}) => {
  const [value, setValue] = useState<number>()
  const constraints = NumericInputConstraintsObj.parse(inputVariable.constraints)

  return "numericinput"
}

export { NumericRecordForm }
