import { Dispatch, SetStateAction } from "react"
import { DatasetFormDialog } from "./DatasetFormDialog"
import { inputVariableType } from "@/types"

interface DatasetFormProps {
  inputVariables: Array<inputVariableType>
  dataset: Array<Record<string, string | number>>
  setDataset: Dispatch<SetStateAction<Array<Record<string, string | number>>>>
}

const DatasetForm: React.FC<DatasetFormProps> = ({ inputVariables, dataset, setDataset }) => {
  return (
    <>
      {dataset.map((_, indx) => {
        return (
          <DatasetFormDialog
            showButton={false}
            inputVariables={inputVariables}
            setDataset={setDataset}
            dataset={dataset}
            indx={indx}
            key={indx}
          ></DatasetFormDialog>
        )
      })}
      <DatasetFormDialog
        showButton={true}
        inputVariables={inputVariables}
        setDataset={setDataset}
        dataset={dataset}
        indx={dataset.length + 1}
      ></DatasetFormDialog>
    </>
  )
}

export { DatasetForm }
