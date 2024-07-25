import { AIFunctionT } from "@/types"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog"

import { useState, Dispatch, SetStateAction } from "react"

interface AIFunctionDialogProps {
  AIFunction: AIFunctionT
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AIFunctionDialog: React.FC<AIFunctionDialogProps> = ({ AIFunction, open, setOpen }) => {
  return (
    <Dialog open={open}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>{AIFunction.name}</Box>
    </Dialog>
  )
}
export { AIFunctionDialog }
