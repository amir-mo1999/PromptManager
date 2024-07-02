import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import { TextInputField } from "@/components/Input"
import { useState, Dispatch, SetStateAction } from "react"

interface NumericRecordFormProps {
  setDataset: Dispatch<SetStateAction<Array<Record<string, string | number>>>>
}

const NumericRecordForm: React.FC<NumericRecordFormProps> = ({}) => {
  return "numericinput"
}

export { NumericRecordForm }
