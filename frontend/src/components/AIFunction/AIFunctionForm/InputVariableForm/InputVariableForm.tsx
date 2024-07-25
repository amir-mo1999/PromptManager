import { InputVariableFormDialog } from "./InputVariableFormDialog"
import { InputVariableT } from "@/types"
import { useState, Dispatch, SetStateAction } from "react"
import { InputVariableBox } from "./InputVariableBox"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
interface InputVariableFormProps {
  inputVariables: Array<InputVariableT>
  setInputVariables: Dispatch<SetStateAction<Array<InputVariableT>>>
}

const InputVariableForm: React.FC<InputVariableFormProps> = ({
  inputVariables,
  setInputVariables,
}) => {
  // variable for opening the dialog
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  // variable for index of the input variable that is currently being updated
  const [inputVariableIndx, setInputVariableIndx] = useState<number>(0)

  // variable holds a new input variable that is added once the create button is pressed
  const [newInputVariable, setNewInputVariable] = useState<InputVariableT>()

  // event handler for when add input variable button is clicked
  function onClickAddVariable() {
    setInputVariableIndx(inputVariables.length + 1)
    setOpenDialog(true)
  }

  // event handler for when input variable is edited
  function onClickEditVariable(indx: number) {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setInputVariableIndx(indx)
      setOpenDialog(true)
    }
    return f
  }

  // event handler for when input variable is deleted
  function onClickDeleteVariable(indx: number) {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const aux = inputVariables.filter((item, i) => i !== indx)
      setInputVariables([...aux])
    }
    return f
  }

  // event handler for when dialog is closed
  function onClickClose(reason: string) {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (reason !== "backdropClick") {
        setOpenDialog(false)
      }
    }
    return f
  }

  // event handler create button is clicked in dialog
  function onClickCreate() {
    if (newInputVariable === undefined) {
      return
    }

    const auxArray = inputVariables
    if (inputVariableIndx >= inputVariables.length) {
      auxArray.push(newInputVariable)
    } else {
      auxArray[inputVariableIndx] = newInputVariable
    }
    setInputVariables([...auxArray])
    setOpenDialog(false)
  }

  return (
    <>
      <InputVariableFormDialog
        open={openDialog}
        inputVariables={inputVariables}
        setNewInputVariable={setNewInputVariable}
        onClickCreate={onClickCreate}
        onClickClose={onClickClose}
        indx={inputVariableIndx}
      ></InputVariableFormDialog>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", overflow: "auto" }}>
        {inputVariables.map((inputVariable, indx) => {
          return (
            <InputVariableBox
              key={indx}
              inputVariable={inputVariable}
              onClickEdit={onClickEditVariable(indx)}
              onClickDelete={onClickDeleteVariable(indx)}
            ></InputVariableBox>
          )
        })}
      </Box>

      <Button variant="contained" sx={{ alignSelf: "center" }} onClick={onClickAddVariable}>
        Add Input Variable
      </Button>
    </>
  )
}

export { InputVariableForm }
