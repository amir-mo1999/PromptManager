import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Box from "@mui/material/Box"
import DialogTitle from "@mui/material/DialogTitle"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { InputVariableT, InputConstraintsT } from "@/types"
import { TextInputField } from "@/components/Input"

interface InputVariableFormDialogProps {
  open: boolean
  inputVariables: Array<InputVariableT>
  setNewInputVariable: Dispatch<SetStateAction<InputVariableT | undefined>>
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

  // reset the form when the dialog is opened and we are adding a new variable
  function resetForm() {
    setName(addingNewVariable ? "" : inputVariables[indx].name)
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
    setNewInputVariable({ name: name })
  }
  useEffect(onChange, [name])

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClickClose}>
        <DialogTitle sx={{ paddingBottom: "10px" }}>Define Input Variable</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              margin: "10px",
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
