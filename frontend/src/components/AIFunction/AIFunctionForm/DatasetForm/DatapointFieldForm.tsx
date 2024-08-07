import * as React from "react"
import { InputVariableT } from "@/types"
import { TextRecordForm, NumericRecordForm, FileRecordForm } from "./DatasetRecordForms"
import { Dispatch, SetStateAction } from "react"
interface DatapointFieldFormProps {
  inputVariable: InputVariableT
  errorIndx: number
  errorList: Array<boolean>
  setErrorList: Dispatch<SetStateAction<Array<boolean>>>
  record: Record<string, string | number>
  settingNewRecord: boolean
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
  dataset: Array<Record<string, string | number>>
  datasetIndx: number
  fileNameMapping: Record<string, Record<string, string | number>>
  setFileNameMapping: Dispatch<SetStateAction<Record<string, Record<string, string | number>>>>
}

const DatapointFieldForm: React.FC<DatapointFieldFormProps> = ({
  inputVariable,
  errorIndx,
  errorList,
  setErrorList,
  settingNewRecord,
  record,
  setRecord,
  dataset,
  datasetIndx,
  fileNameMapping,
  setFileNameMapping,
}) => {
  // the content to return
  let content = <></>

  // return a form field for depending on the variable type of the respective input variable
  if (record)
    switch (inputVariable.var_type) {
      case "string":
        content = (
          <TextRecordForm
            startValue={
              settingNewRecord ? undefined : (dataset[datasetIndx][inputVariable.name] as string)
            }
            errorList={errorList}
            setErrorList={setErrorList}
            errorIndx={errorIndx}
            inputVariable={inputVariable}
            record={record}
            setRecord={setRecord}
          ></TextRecordForm>
        )
        break
      case "numeric":
        content = (
          <NumericRecordForm
            inputVariable={inputVariable}
            record={record}
            setRecord={setRecord}
            startValue={
              settingNewRecord ? undefined : (dataset[datasetIndx][inputVariable.name] as number)
            }
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
            startValue={
              settingNewRecord ? undefined : (dataset[datasetIndx][inputVariable.name] as string)
            }
            fileNameMapping={fileNameMapping}
            setFileNameMapping={setFileNameMapping}
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
            startValue={
              settingNewRecord ? undefined : (dataset[datasetIndx][inputVariable.name] as string)
            }
            fileNameMapping={fileNameMapping}
            setFileNameMapping={setFileNameMapping}
          ></FileRecordForm>
        )
        break
    }

  return content
}

export { DatapointFieldForm }
