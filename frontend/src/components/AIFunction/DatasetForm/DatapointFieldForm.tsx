import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import { TextRecordForm } from "./DatasetRecordForms"
import { useState, Dispatch, SetStateAction } from "react"
interface DatapointFieldFormProps {
  inputVariable: inputVariableType
  setDisableCreateButton: Dispatch<SetStateAction<boolean>>
  setDataset: Dispatch<SetStateAction<Record<string, (string | number)[]>>>
}

const DatapointFieldForm: React.FC<DatapointFieldFormProps> = ({
  inputVariable,
  setDisableCreateButton,
  setDataset,
}) => {
  let content = <></>
  switch (inputVariable.var_type) {
    case "string":
      content = (
        <TextRecordForm
          setDisableCreateButton={setDisableCreateButton}
          inputVariable={inputVariable}
          setDataset={setDataset}
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
