import * as React from "react"
import { InputVariableT } from "@/types"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { MuiFileInput } from "mui-file-input"
import { ImageFileInputConstraints, AudioFileInputConstraints } from "@/models"
import { useSession } from "next-auth/react"
import { api } from "@/network"

interface FileRecordFormProps {
  mode: "image_file" | "audio_file"
  inputVariable: InputVariableT
  errorIndx: number
  errorList: Array<boolean>
  setErrorList: Dispatch<SetStateAction<Array<boolean>>>
  record: Record<string, string | number>
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
  startValue?: string
  fileNameMapping: Record<string, Record<string, string | number>>
  setFileNameMapping: Dispatch<SetStateAction<Record<string, Record<string, string | number>>>>
}

const FileRecordForm: React.FC<FileRecordFormProps> = ({
  mode,
  inputVariable,
  record,
  errorIndx,
  errorList,
  setErrorList,
  setRecord,
  startValue,
  fileNameMapping,
  setFileNameMapping,
}) => {
  // parse constraints based on mode
  const constraints =
    mode === "image_file"
      ? ImageFileInputConstraints.parse(inputVariable.constraints)
      : AudioFileInputConstraints.parse(inputVariable.constraints)

  // get current session and access token
  const { data: session } = useSession()
  const accessToken = session?.user.access_token as string

  // define state variables for file input
  const emptyFile = new File([""], "filename.txt", { type: "text/plain" })
  const [file, setFile] = useState<File | null>(emptyFile)
  const [fileName, setFileName] = useState<string>("")
  const [fileSize, setFileSize] = useState<number>(0)
  const [helperText, setHelperText] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)
  const [maxFileSize, _] = useState<number>(constraints.max_file_size)

  // retrieve the file name and file size for the file, if we are editing an existing record
  function initFileNameAndSize() {
    if (startValue !== undefined) {
      setFileName(fileNameMapping[startValue]["fileName"] as string)
      setFileSize((fileNameMapping[startValue]["fileSize"] as number) / 1000000)
    }
  }
  useEffect(initFileNameAndSize, [])

  // check if the file size exceeds the maximum file size whenever the maximum file size or the file size change
  function checkFileSize() {
    if (fileSize > maxFileSize) {
      setIsError(true)
      setHelperText(`File must be smaller than ${maxFileSize}mb`)
    } else {
      setIsError(false)
      setHelperText("")
    }
  }
  useEffect(checkFileSize, [fileSize, maxFileSize])

  // update the respective entry in the dialog error list based on the isError variable or if the fileSize is zero
  function updateErrorList() {
    const aux = errorList
    if (isError || fileSize === 0) {
      aux[errorIndx] = true
    } else {
      aux[errorIndx] = false
    }
    setErrorList([...aux])
  }
  useEffect(updateErrorList, [isError, file, fileSize])

  // on change event handler
  function onChange(value: File | null) {
    // return if value is null
    if (value === null) {
      return
    }

    // set the file variables
    setFile(value)
    setFileSize(value === null ? 0 : value.size / 1000000)
    setFileName(value.name)

    // push the file to the backend and save the object id in the new record and set the record
    let auxRecord: { [key: string]: string | number } = {}
    // only push the file to the backend if there is no error
    if (!isError) {
      api
        .postFile(accessToken, value)
        .then((res) => res.json())
        .then((d) => {
          auxRecord[inputVariable.name] = d.object_id
          setRecord({ ...record, ...auxRecord })

          // update the filename mapping
          const auxMapping = fileNameMapping
          auxMapping[d.object_id] = {}
          auxMapping[d.object_id]["fileName"] = value.name
          auxMapping[d.object_id]["fileSize"] = value.size
          setFileNameMapping({ ...auxMapping })
        })
    }
  }

  // returns text to be displayed in the file input
  function getInputText(_: File | null) {
    return fileName
  }

  // returns file size text to be displayed in the file input
  function getSizeText(_: File | null) {
    let r: string = ""

    if (fileSize === 0) r = ""

    if (fileSize < 1) r = (fileSize * 1000).toString() + "kb"

    if (fileSize >= 1) r = fileSize.toString() + "mb"

    return r
  }

  // set what files the input should accept based on the mode
  const accept = mode === "image_file" ? ".png, .jpeg, .jpg" : ".mp3"

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        justifyContent: "space-between",
      }}
    >
      <Typography>Variable: </Typography>
      <Typography fontWeight="bold">{inputVariable.name}</Typography>
      <MuiFileInput
        value={file}
        helperText={helperText}
        error={isError}
        inputProps={{ accept: accept }}
        onChange={onChange}
        getSizeText={getSizeText}
        getInputText={getInputText}
      ></MuiFileInput>
    </Box>
  )
}

export { FileRecordForm }
