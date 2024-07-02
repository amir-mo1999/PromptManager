import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import MenuItem from "@mui/material/MenuItem"
import Box from "@mui/material/Box"
import DialogTitle from "@mui/material/DialogTitle"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { inputVariableType, InputConstraints } from "@/types"
import Typography from "@mui/material/Typography"
import { inputOutputTypes, initInputConstraints } from "@/app/utils"
import { InputVariableConstraintsForm } from "./InputVariableConstraintsForm"
import { TextInputField } from "@/components/Input"

interface InputVariableFormDialogProps {
  open: boolean
  inputVariables: Array<inputVariableType>
  setNewInputVariable: Dispatch<SetStateAction<inputVariableType | undefined>>
  onClickClose: (reason: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onClickCreate: () => void
  indx: number
}

const InputVariableFormDialog: React.FC<InputVariableFormDialogProps> = ({
  open,
  inputVariables,
  setNewInputVariable,
  onClickCreate,
  onClickClose,
  indx,
}) => {
  // check if we are adding a new variable or editing an existing one
  const addingNewVariable = indx >= inputVariables.length
  // variables for name, type and constraints of new input variable
  const [name, setName] = useState<string>(addingNewVariable ? "" : inputVariables[indx].name)
  const [type, setType] = useState<inputVariableType["var_type"]>(
    addingNewVariable ? "string" : inputVariables[indx].var_type
  )
  const [constraints, setConstraints] = useState<InputConstraints>(initInputConstraints(type))

  // reset the form when the dialog is opened and we are adding a new variable
  function resetForm() {
    setName(addingNewVariable ? "" : inputVariables[indx].name)
    setType(addingNewVariable ? "string" : inputVariables[indx].var_type)
    setConstraints(
      addingNewVariable ? initInputConstraints("string") : inputVariables[indx].constraints
    )
    setNameError(false)
  }
  useEffect(resetForm, [open])

  // error variable for name field
  const [nameError, setNameError] = useState<boolean>(false)

  // variable for checking if the create button should be disabled
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

  // update the new input variable whenever a field changes
  function onChange() {
    setNewInputVariable({ name: name, var_type: type, constraints: constraints })
  }
  useEffect(onChange, [name, type, constraints])

  // event handler the input for the input variable type changes
  function onTypeChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setType(e.target.value as inputVariableType["var_type"])
  }

  return (
    <React.Fragment>
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
            <TextInputField
              value={name}
              valueSetter={setName}
              isError={nameError}
              setIsError={setNameError}
              minChars={2}
              label="variable name"
              maxChars={40}
            ></TextInputField>
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
              constraints={constraints}
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
