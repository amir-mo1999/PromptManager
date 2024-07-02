import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import { TextInputField } from "@/components/Input"
import { useState, Dispatch, SetStateAction } from "react"

interface FileRecordFormProps {
  setDataset: Dispatch<SetStateAction<Array<Record<string, string | number>>>>
}

const FileRecordForm: React.FC<FileRecordFormProps> = ({}) => {
  return "fileinput"
}

export { FileRecordForm }
