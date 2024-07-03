import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { DatasetFormDialog } from "./DatasetFormDialog"
import { inputVariableType } from "@/types"
import Button from "@mui/material/Button"
import { RecordBox } from "./RecordBox"

interface DatasetFormProps {
  inputVariables: Array<inputVariableType>
  dataset: Array<Record<string, string | number>>
  setDataset: Dispatch<SetStateAction<Array<Record<string, string | number>>>>
}

const DatasetForm: React.FC<DatasetFormProps> = ({ inputVariables, dataset, setDataset }) => {
  // variable for opening the dialog
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  // the current record
  const [record, setRecord] = useState<Record<string, string | number>>({})

  // the index in the dataset of the current record
  const [recordIndx, setRecordIndx] = useState<number>(0)

  // if we are setting a new record or updating an existing one
  const [settingNewRecord, setSettingNewRecord] = useState<boolean>(false)

  // this object maps object id's of files stored in the database to actual file names and sizes
  const [fileNameMapping, setFileNameMapping] = useState<
    Record<string, Record<string, string | number>>
  >({})

  // set the variable for checking if we are adding a new record or editing an existing one
  useEffect(() => {
    if (recordIndx >= dataset.length) {
      setSettingNewRecord(true)
    } else {
      setSettingNewRecord(false)
    }
  }, [recordIndx, dataset])

  // reset the current record when input variables change
  useEffect(() => setRecord({}), [inputVariables])

  // event handler when clicking add new record
  function onClickAddRecord() {
    setRecordIndx(dataset.length + 1)
    setOpenDialog(true)
  }

  // event handler when editing a record
  function onClickEditRecord(indx: number) {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setRecordIndx(indx)
      setOpenDialog(true)
    }
    return f
  }

  // event handler when deleting a record
  function onClickDeleteRecord(indx: number) {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const aux = dataset.filter((item, i) => i !== indx)
      setDataset([...aux])
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

  // event handler when creating a new record in the dataset
  function onClickCreate() {
    const auxArray = dataset

    if (record === undefined || Object.keys(record).length === 0) {
      return
    } else {
      if (recordIndx >= dataset.length) {
        auxArray.push(record)
      } else {
        auxArray[recordIndx] = record
      }
      setDataset([...auxArray])
    }
    setOpenDialog(false)
  }

  return (
    <>
      <DatasetFormDialog
        dataset={dataset}
        record={record}
        open={openDialog}
        inputVariables={inputVariables}
        settingNewRecord={settingNewRecord}
        setRecord={setRecord}
        onClickClose={onClickClose}
        onClickCreate={onClickCreate}
        datasetIndx={recordIndx}
        fileNameMapping={fileNameMapping}
        setFileNameMapping={setFileNameMapping}
      ></DatasetFormDialog>
      {dataset.map((record, indx) => {
        return (
          <RecordBox
            key={indx}
            record={record}
            onClickEdit={onClickEditRecord(indx)}
            onClickDelete={onClickDeleteRecord(indx)}
          ></RecordBox>
        )
      })}

      <Button variant="contained" sx={{ alignSelf: "center" }} onClick={onClickAddRecord}>
        Add Record
      </Button>
    </>
  )
}

export { DatasetForm }
