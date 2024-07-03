import * as React from "react"
import Box from "@mui/material/Box"
import { inputVariableType } from "@/types"
import { TextRecordForm, NumericRecordForm, FileRecordForm } from "./DatasetRecordForms"
import { useState, Dispatch, SetStateAction } from "react"
interface DatapointFieldFormProps {
  inputVariable: inputVariableType
  errorIndx: number
  errorList: Array<boolean>
  setErrorList: Dispatch<SetStateAction<Array<boolean>>>
  record: Record<string, string | number>
  settingNewRecord: boolean
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
}

const DatapointFieldForm: React.FC<DatapointFieldFormProps> = ({
  inputVariable,
  errorIndx,
  errorList,
  setErrorList,
  settingNewRecord,
  record,
  setRecord,
}) => {
  let content = <></>
  if (record)
    switch (inputVariable.var_type) {
      case "string":
        content = (
          <TextRecordForm
            errorList={errorList}
            setErrorList={setErrorList}
            errorIndx={errorIndx}
            startValue={settingNewRecord ? "" : (record[inputVariable.name] as string)}
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
            errorList={errorList}
            setErrorList={setErrorList}
            errorIndx={errorIndx}
            mode="image_file"
            inputVariable={inputVariable}
            record={record}
            setRecord={setRecord}
          ></FileRecordForm>
        )
        break
      case "audio_file":
        content = (
          <FileRecordForm
            errorList={errorList}
            setErrorList={setErrorList}
            errorIndx={errorIndx}
            mode="audio_file"
            inputVariable={inputVariable}
            record={record}
            setRecord={setRecord}
          ></FileRecordForm>
        )
        break
    }

  return content
}

export { DatapointFieldForm }
