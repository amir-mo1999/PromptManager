import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { DatasetFormDialog } from "./DatasetFormDialog"
import { inputVariableType } from "@/types"
import Button from "@mui/material/Button"
import { RecordBox } from "./RecordBox"
import { DatasetTable } from "./DatasetTable"

interface DatasetFormProps {
  inputVariables: Array<inputVariableType>
  dataset: Array<Record<string, string | number>>
  setDataset: Dispatch<SetStateAction<Array<Record<string, string | number>>>>
}

const DatasetForm: React.FC<DatasetFormProps> = ({ inputVariables, dataset, setDataset }) => {
  // variable for opening the dialog
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const [recordIndx, setRecordIndx] = useState<number>(0)

  const [newRecord, setNewRecord] = useState<Record<string, string | number>>({})

  const [settingNewRecord, setSettingNewRecord] = useState<boolean>(false)

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

  // reset the new record when dataset changes
  useEffect(() => setNewRecord({}), [inputVariables])

  function onClickAddRecord() {
    setRecordIndx(dataset.length + 1)
    setOpenDialog(true)
  }

  function onClickEditRecord(indx: number) {
    const f = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setRecordIndx(indx)
      setOpenDialog(true)
    }
    return f
  }

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

  function onClickCreate() {
    const auxArray = dataset

    if (newRecord === undefined || Object.keys(newRecord).length === 0) {
      return
    } else {
      if (recordIndx >= dataset.length) {
        auxArray.push(newRecord)
      } else {
        auxArray[recordIndx] = newRecord
      }
      setDataset([...auxArray])
    }
    setOpenDialog(false)
  }

  useEffect(() => console.log("Record: ", newRecord), [newRecord])
  return (
    <>
      <DatasetFormDialog
        dataset={dataset}
        newRecord={newRecord}
        open={openDialog}
        inputVariables={inputVariables}
        settingNewRecord={settingNewRecord}
        setNewRecord={setNewRecord}
        onClickClose={onClickClose}
        onClickCreate={onClickCreate}
        datasetIndx={recordIndx}
        fileNameMapping={fileNameMapping}
        setFileNameMapping={setFileNameMapping}
      ></DatasetFormDialog>
      {/* <DatasetTable dataset={dataset}></DatasetTable> */}
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
