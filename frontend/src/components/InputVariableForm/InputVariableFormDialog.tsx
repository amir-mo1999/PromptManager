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
import { inputVariableType } from "@/types"
import { Typography } from "@mui/material"
import { inputOutputTypes } from "@/app/utils"

interface InputVariableFormDialogProps {
  setInputVariables: Dispatch<SetStateAction<Array<inputVariableType>>>
  indx: number
  showButton: boolean
  inputVariables: Array<inputVariableType>
}

const InputVariableFormDialog: React.FC<InputVariableFormDialogProps> = ({
  inputVariables,
  setInputVariables,
  showButton,
  indx,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [name, setName] = useState(showButton ? "" : inputVariables[indx].name)
  const [type, setType] = useState<inputVariableType["var_type"]>(
    showButton ? "string" : inputVariables[indx].var_type
  )
  const [nameError, setNameError] = useState<boolean>(false)
  const [nameHelperText, setNameHelperText] = useState<string>("")

  const [disableCreateButton, setDisableCreateButton] = useState<boolean>(false)

  function checkDisableCreateButton() {
    const f = () => {
      if (nameError === true || name === "") {
        setDisableCreateButton(true)
      } else {
        setDisableCreateButton(false)
      }
    }
    return f
  }

  useEffect(checkDisableCreateButton(), [name, nameError])

  function onClickOpen() {
    setOpen(true)
  }

  function onClickCreate() {
    const a = inputVariables
    if (indx >= inputVariables.length) {
      a.push({ name: name, var_type: type })
    } else {
      a[indx].name = name
      a[indx].var_type = type
    }
    setInputVariables([...a])
    setOpen(false)
    setName("")
    setType("string")
  }

  function resetForm() {
    setNameError(false)
    setNameHelperText("")
  }

  function handleClose(reason: string) {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (reason !== "backdropClick") {
        setOpen(false)
        resetForm()
      }
    }
    return f
  }

  function onNameChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setName(e.target.value)
    if (e.target.value !== "") {
      setNameError(false)
      setNameHelperText("")
    }
  }

  function onNameBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
    if (e.target.value === "") {
      setNameError(true)
      setNameHelperText("This field is required")
    }
  }

  function onTypeChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setType(e.target.value as inputVariableType["var_type"])
  }

  function onDeleteVariable(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const a = inputVariables.filter((item, i) => i !== indx)
    setInputVariables([...a])
  }

  return (
    <React.Fragment>
      {showButton ? (
        <Button variant="contained" sx={{ alignSelf: "center" }} onClick={onClickOpen}>
          Add Input Variable
        </Button>
      ) : (
        <Paper
          sx={{
            backgroundColor: "#F3F2F7",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box onClick={onClickOpen}>
            <Typography>Variable 1 {inputVariables[indx].name}</Typography>
            <Typography>Input Type {inputOutputTypes[inputVariables[indx].var_type]}</Typography>
          </Box>
          <Button variant="contained" onClick={onDeleteVariable}>
            -
          </Button>
        </Paper>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ paddingBottom: "10px" }}>Define Input Variable</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="variable name"
              variant="standard"
              required={true}
              value={name}
              inputProps={{ maxLength: 40 }}
              onChange={onNameChange}
              error={nameError}
              helperText={nameHelperText}
              onBlur={onNameBlur}
            />
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
              <Typography>Input Type</Typography>

              <TextField
                defaultValue={"string"}
                select={true}
                required={true}
                value={type}
                onChange={onTypeChange}
                sx={{ width: "120px" }}
              >
                {Object.keys(inputOutputTypes).map((key, indx) => {
                  // @ts-ignore
                  const alias = inputOutputTypes[key]
                  return (
                    <MenuItem key={indx} value={key}>
                      {
                        // @ts-ignore
                        inputOutputTypes[key]
                      }
                    </MenuItem>
                  )
                })}
              </TextField>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose("buttonClick")}>Cancel</Button>
          <Button disabled={disableCreateButton} onClick={onClickCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export { InputVariableFormDialog }
