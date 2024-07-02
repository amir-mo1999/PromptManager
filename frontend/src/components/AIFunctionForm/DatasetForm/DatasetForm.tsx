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

interface DatasetFormProps {
  inputVariables: Array<inputVariableType>
  setDataset: Dispatch<SetStateAction<Record<string, (string | number)[]>>>
}

const DatasetForm: React.FC<DatasetFormProps> = ({ inputVariables, setDataset }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [disableCreateButton, setDisableCreateButton] = useState<boolean>(false)
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

  return (
    <React.Fragment>
      <Button variant="contained" sx={{ alignSelf: "center" }} onClick={onClickOpen}>
        Add Record
      </Button>
      <Dialog open={open}>
        <DialogTitle sx={{ paddingBottom: "10px" }}>Define a Dataset Record</DialogTitle>
        <DialogContent>
          {inputVariables.map((inputVariable, indx) => {
            return (
              <DatapointFieldForm
                key={indx}
                setDisableCreateButton={setDisableCreateButton}
                inputVariable={inputVariable}
                setDataset={setDataset}
              ></DatapointFieldForm>
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose("buttonClick")}>Cancel</Button>
          <Button disabled={disableCreateButton}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export { DatasetForm }
