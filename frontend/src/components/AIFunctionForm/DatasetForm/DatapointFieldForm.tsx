import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import { TextRecordForm, NumericRecordForm, FileRecordForm } from "./DatasetRecordForms"
import { useState, Dispatch, SetStateAction } from "react"
interface DatapointFieldFormProps {
  inputVariable: inputVariableType
  record: Record<string, string | number>
  settingNewRecord: boolean
  setDisableCreateButton: Dispatch<SetStateAction<boolean>>
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
}

const DatapointFieldForm: React.FC<DatapointFieldFormProps> = ({
  inputVariable,
  settingNewRecord,
  record,
  setDisableCreateButton,
  setRecord,
}) => {
  let content = <></>
  if (record)
    switch (inputVariable.var_type) {
      case "string":
        content = (
          <TextRecordForm
            startValue={settingNewRecord ? "" : (record[inputVariable.name] as string)}
            setDisableCreateButton={setDisableCreateButton}
            inputVariable={inputVariable}
            record={record}
            setRecord={setRecord}
          ></TextRecordForm>
        )
        break
      case "numeric":
        content = (
          <NumericRecordForm
            startValue={settingNewRecord ? undefined : (record[inputVariable.name] as number)}
            inputVariable={inputVariable}
            record={record}
            setRecord={setRecord}
          ></NumericRecordForm>
        )
        break

      case "image_file":
        content = (
          <FileRecordForm
            mode="image_file"
            inputVariable={inputVariable}
            record={record}
            setRecord={setRecord}
            setDisableCreateButton={setDisableCreateButton}
          ></FileRecordForm>
        )
        break
      case "audio_file":
        content = (
          <FileRecordForm
            mode="audio_file"
            inputVariable={inputVariable}
            record={record}
            setRecord={setRecord}
            setDisableCreateButton={setDisableCreateButton}
          ></FileRecordForm>
        )
        break
    }

  return content
}

export { DatapointFieldForm }
