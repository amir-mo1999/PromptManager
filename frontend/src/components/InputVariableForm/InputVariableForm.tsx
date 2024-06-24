import { InputVariableFormDialog } from "./InputVariableFormDialog"
import { inputVariableType } from "@/types"
import { Dispatch, SetStateAction } from "react"

interface InputVariableFormProps {
  inputVariables: Array<inputVariableType>
  setInputVariables: Dispatch<SetStateAction<Array<inputVariableType>>>
}

const InputVariableForm: React.FC<InputVariableFormProps> = ({
  inputVariables,
  setInputVariables,
}) => {
  return (
    <>
      {inputVariables.map((_, indx) => {
        return (
          <InputVariableFormDialog
            showButton={false}
            inputVariables={inputVariables}
            setInputVariables={setInputVariables}
            indx={indx}
            key={indx}
          ></InputVariableFormDialog>
        )
      })}
      <InputVariableFormDialog
        inputVariables={inputVariables}
        showButton={true}
        setInputVariables={setInputVariables}
        indx={inputVariables.length + 1}
      ></InputVariableFormDialog>
    </>
  )
}

export { InputVariableForm }
