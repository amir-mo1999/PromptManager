import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import { TextRecordForm } from "./DatasetRecordForms"
import { useState, Dispatch, SetStateAction } from "react"
interface DatapointFieldFormProps {
  inputVariable: inputVariableType
  record: Record<string, string | number>
  setDisableCreateButton: Dispatch<SetStateAction<boolean>>
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
}

const DatapointFieldForm: React.FC<DatapointFieldFormProps> = ({
  inputVariable,
  record,
  setDisableCreateButton,
  setRecord,
}) => {
  let content = <></>
  switch (inputVariable.var_type) {
    case "string":
      content = (
        <TextRecordForm
          setDisableCreateButton={setDisableCreateButton}
          inputVariable={inputVariable}
          record={record}
          setRecord={setRecord}
        ></TextRecordForm>
      )
    // case "numeric":
    //   content = <NumericInput setDataset={setDataset}></NumericInput>
    // case "image_file":
    //   content = <FileInput setDataset={setDataset}></FileInput>
    // case "audio_file":
    //   content = <FileInput setDataset={setDataset}></FileInput>
  }

  return content
}

export { DatapointFieldForm }
