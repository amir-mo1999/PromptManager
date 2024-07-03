import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Paper from "@mui/material/Paper"
import MenuItem from "@mui/material/MenuItem"
import Box from "@mui/material/Box"
import DialogTitle from "@mui/material/DialogTitle"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { inputVariableType, inputVariableObj } from "@/types"
import Typography from "@mui/material/Typography"
import { inputOutputTypes } from "@/app/utils"
import { DatapointFieldForm } from "./DatapointFieldForm"
import { IndeterminateCheckBox } from "@mui/icons-material"

interface DatasetFormDialogProps {
  open: boolean
  dataset: Array<Record<string, string | number>>
  settingNewRecord: boolean
  inputVariables: Array<inputVariableType>
  newRecord: Record<string, string | number>
  setNewRecord: Dispatch<SetStateAction<Record<string, string | number>>>
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
  newRecord,
  setNewRecord,
  onClickClose,
  onClickCreate,
  datasetIndx,
  fileNameMapping,
  setFileNameMapping,
}) => {
  const [disableCreateButton, setDisableCreateButton] = useState<boolean>(false)
  const [errorList, setErrorList] = useState<Array<boolean>>([])

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
                  record={newRecord}
                  setRecord={setNewRecord}
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
