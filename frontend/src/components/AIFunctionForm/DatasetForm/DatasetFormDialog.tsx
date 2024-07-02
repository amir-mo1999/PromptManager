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
import { inputVariableType, inputVariable } from "@/types"
import Typography from "@mui/material/Typography"
import { inputOutputTypes } from "@/app/utils"
import { DatapointFieldForm } from "./DatapointFieldForm"
import { IndeterminateCheckBox } from "@mui/icons-material"

interface DatasetFormDialogProps {
  inputVariables: Array<inputVariableType>
  showButton: boolean
  dataset: Array<Record<string, string | number>>
  indx: number
  setDataset: Dispatch<SetStateAction<Array<Record<string, string | number>>>>
}

const DatasetFormDialog: React.FC<DatasetFormDialogProps> = ({
  inputVariables,
  showButton,
  dataset,
  indx,
  setDataset,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [disableCreateButton, setDisableCreateButton] = useState<boolean>(false)
  const [record, setRecord] = useState<Record<string, string | number>>({})

  useEffect(() => console.log(record), [record])

  // event handler when dialog is opened
  function onClickOpen() {
    setOpen(true)
  }

  // event handler for when dialog is closed
  function onClickClose(reason: string) {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (reason !== "backdropClick") {
        setOpen(false)
      }
    }
    return f
  }

  function onClickCreate() {
    let auxArray = dataset
    if (indx >= dataset.length) {
      auxArray.push(record)
    } else {
      auxArray[indx] = record
    }
    console.log(auxArray)
    setDataset([...auxArray])
    setOpen(false)
  }

  if (showButton) {
    return (
      <React.Fragment>
        <Button variant="contained" sx={{ alignSelf: "center" }} onClick={onClickOpen}>
          Add Record
        </Button>
        <Dialog open={open}>
          <DialogTitle sx={{ paddingBottom: "10px" }}>Define a Dataset Record</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {inputVariables.map((inputVariable, indx) => {
                return (
                  <DatapointFieldForm
                    key={indx}
                    record={record}
                    setRecord={setRecord}
                    setDisableCreateButton={setDisableCreateButton}
                    inputVariable={inputVariable}
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
  } else {
    return ""
  }
}

export { DatasetFormDialog }
