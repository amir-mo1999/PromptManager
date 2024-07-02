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
import { render } from "react-dom"

interface DatapointFieldFormProps {
  inputVariable: inputVariableType
}

const DatapointFieldForm: React.FC<DatapointFieldFormProps> = ({ inputVariable }) => {
  const stringFieldForm = <Box sx={{ display: "flex", flexDirection: "column" }}></Box>

  const numericFieldForm = <Box sx={{ display: "flex", flexDirection: "column" }}></Box>

  const imageFileFieldForm = <Box sx={{ display: "flex", flexDirection: "column" }}></Box>

  const audioFileFieldForm = <Box sx={{ display: "flex", flexDirection: "column" }}></Box>
  return ""
}

export { DatapointFieldForm }
