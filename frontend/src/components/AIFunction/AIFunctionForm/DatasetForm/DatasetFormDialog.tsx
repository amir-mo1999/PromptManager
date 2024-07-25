import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Box from "@mui/material/Box"
import DialogTitle from "@mui/material/DialogTitle"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { InputVariableT } from "@/types"
import { DatapointFieldForm } from "./DatapointFieldForm"

interface DatasetFormDialogProps {
  open: boolean
  dataset: Array<Record<string, string | number>>
  settingNewRecord: boolean
  inputVariables: Array<InputVariableT>
  record: Record<string, string | number>
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
  onClickClose: (reason: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onClickCreate: () => void
  datasetIndx: number
  fileNameMapping: Record<string, Record<string, string | number>>
  setFileNameMapping: Dispatch<SetStateAction<Record<string, Record<string, string | number>>>>
}

const DatasetFormDialog: React.FC<DatasetFormDialogProps> = ({
  open,
  inputVariables,
  dataset,
  settingNewRecord,
  record,
  setRecord,
  onClickClose,
  onClickCreate,
  datasetIndx,
  fileNameMapping,
  setFileNameMapping,
}) => {
  // checks if the disable create button in the dialog should be disabled
  const [disableCreateButton, setDisableCreateButton] = useState<boolean>(false)

  // array holds an entry for each form field; if one entry is true the create button is disabled
  const [errorList, setErrorList] = useState<Array<boolean>>([])

  // checks if the create button should be disabled based on the errorList
  function checkDisableCreateButton() {
    const hasTrue = errorList.some((value) => value === true)
    if (hasTrue) {
      setDisableCreateButton(true)
    } else {
      setDisableCreateButton(false)
    }
  }
  useEffect(checkDisableCreateButton, [errorList])

  return (
    <React.Fragment>
      <Dialog open={open}>
        <DialogTitle sx={{ paddingBottom: "10px" }}>Define a Dataset Record</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {inputVariables.map((inputVariable, indx) => {
              return (
                <DatapointFieldForm
                  dataset={dataset}
                  datasetIndx={datasetIndx}
                  errorList={errorList}
                  setErrorList={setErrorList}
                  errorIndx={indx}
                  key={indx}
                  settingNewRecord={settingNewRecord}
                  record={record}
                  setRecord={setRecord}
                  inputVariable={inputVariable}
                  fileNameMapping={fileNameMapping}
                  setFileNameMapping={setFileNameMapping}
                ></DatapointFieldForm>
              )
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose("buttonClick")}>Cancel</Button>
          <Button onClick={onClickCreate} disabled={disableCreateButton}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export { DatasetFormDialog }
