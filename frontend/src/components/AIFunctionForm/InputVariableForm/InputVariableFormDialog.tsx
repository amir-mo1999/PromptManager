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
import {
  inputVariableType,
  inputVariable,
  InputConstraints,
  StringInputConstraintsObj,
} from "@/types"
import Typography from "@mui/material/Typography"
import { inputOutputTypes, inputConstraintsAliases } from "@/app/utils"
import { InputVariableConstraintsForm } from "./InputVariableConstraintsForm"
import { InputVariableBox } from "./InputVariableBox"

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
  const [constraints, setConstraints] = useState<InputConstraints>(
    StringInputConstraintsObj.parse({})
  )
  const [disableCreateButton, setDisableCreateButton] = useState<boolean>(true)

  // checks if the create button the dialog should be disabled or not
  function checkDisableCreateButton() {
    if (nameError === true || name === "") {
      setDisableCreateButton(true)
    } else {
      setDisableCreateButton(false)
    }
  }

  // disable or enable the create button based on the name and the nameError
  useEffect(checkDisableCreateButton, [])
  useEffect(checkDisableCreateButton, [name, nameError])

  // event handler when dialog is opened
  function onClickOpen() {
    setOpen(true)
    checkDisableCreateButton()
  }

  function onClickAddVariable() {
    setName("")
    setType("string")
    checkDisableCreateButton()
    setOpen(true)
  }

  // event handler create button is clicked in dialog
  function onClickCreate() {
    const auxArray = inputVariables
    if (indx >= inputVariables.length) {
      const auxElement = inputVariable.parse({
        name: name,
        var_type: type,
        constraints: constraints,
      })
      auxArray.push(auxElement)
    } else {
      auxArray[indx].name = name
      auxArray[indx].var_type = type
      auxArray[indx].constraints = constraints
    }
    setInputVariables([...auxArray])
    setOpen(false)
  }

  // resets the form by resetting the nameError and the helperText
  function resetForm() {
    setNameError(false)
    setNameHelperText("")
  }

  // event handler for when dialog is closed
  function onClickClose(reason: string) {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (reason !== "backdropClick") {
        setOpen(false)
        resetForm()
      }
    }
    return f
  }

  // event handler when input for name field changes
  function onNameChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setName(e.target.value)
    if (e.target.value !== "") {
      setNameError(false)
      setNameHelperText("")
    }
  }

  // event handler for when user blurs away from input field
  function onNameBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
    if (e.target.value === "") {
      setNameError(true)
      setNameHelperText("This field is required")
    }
  }

  // event handler the input for the input variable type changes
  function onTypeChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setType(e.target.value as inputVariableType["var_type"])
  }

  // event handler when delete input variable button is clicked
  function onDeleteVariable(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const a = inputVariables.filter((item, i) => i !== indx)
    setInputVariables([...a])
  }

  return (
    <React.Fragment>
      {showButton ? (
        <Button variant="contained" sx={{ alignSelf: "center" }} onClick={onClickAddVariable}>
          Add Input Variable
        </Button>
      ) : (
        <InputVariableBox
          inputVariable={inputVariables[indx]}
          onClickEdit={onClickOpen}
          onClickDelete={onDeleteVariable}
        ></InputVariableBox>
      )}

      <Dialog open={open} onClose={onClickClose}>
        <DialogTitle sx={{ paddingBottom: "10px" }}>Define Input Variable</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* Field for the input variable name */}
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
            {/* Field for the input variable type */}
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

            {/* Field for the input variable constraints */}
            <InputVariableConstraintsForm
              constraintType={type}
              inputVariable={inputVariables[indx]}
              setConstraints={setConstraints}
            ></InputVariableConstraintsForm>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose("buttonClick")}>Cancel</Button>
          <Button disabled={disableCreateButton} onClick={onClickCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export { InputVariableFormDialog }
