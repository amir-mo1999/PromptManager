import { AIFunctionT } from "@/types"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog"
import Button from "@mui/material/Button"

import { useState, Dispatch, SetStateAction } from "react"
import { DialogActions } from "@mui/material"

interface AIFunctionDialogProps {
  AIFunction: AIFunctionT
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AIFunctionDialog: React.FC<AIFunctionDialogProps> = ({ AIFunction, open, setOpen }) => {
  function onClickClose() {
    setOpen(false)
  }

  return (
    <Dialog open={open} maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
        <Typography variant="h5">{AIFunction.name}</Typography>
        <Typography variant="body1">{AIFunction.description}</Typography>
        <Typography variant="subtitle1">Input Variables</Typography>

        {AIFunction.input_variables.map((inputVariable, indx) => (
          <Typography key={indx}>{inputVariable.name}</Typography>
        ))}
      </Box>
      <DialogActions>
        <Button variant="contained" onClick={onClickClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export { AIFunctionDialog }
