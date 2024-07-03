import * as React from "react"
import { inputVariableType } from "@/types"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { MuiFileInput } from "mui-file-input"
import { ImageFileInputConstraintsObj, AudioFileInputConstraintsObj } from "@/types"
import { useSession } from "next-auth/react"
import { api } from "@/network"

interface FileRecordFormProps {
  mode: "image_file" | "audio_file"
  inputVariable: inputVariableType
  record: Record<string, string | number>
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
  setDisableCreateButton: Dispatch<SetStateAction<boolean>>
}

const FileRecordForm: React.FC<FileRecordFormProps> = ({
  mode,
  inputVariable,
  record,
  setRecord,
  setDisableCreateButton,
}) => {
  // parse constraints based in mode
  const constraints =
    mode === "image_file"
      ? ImageFileInputConstraintsObj.parse(inputVariable.constraints)
      : AudioFileInputConstraintsObj.parse(inputVariable.constraints)

  // get current session
  const { data: session } = useSession()

  // define state variables
  const [file, setFile] = useState<File | null>(null)
  const [fileSize, setFileSize] = useState<number>(0)
  const [helperText, setHelperText] = useState<string>("")
  const [isError, setIsError] = useState<boolean>(false)
  const [maxFileSize, _] = useState<number>(constraints.max_file_size)

  // check if the file size exceeds the maximum whenever the maximum file size or the file size change
  function checkFileSize() {
    if (fileSize > maxFileSize) {
      setIsError(true)
      setHelperText(`File must be smaller than ${maxFileSize}mb`)
      setDisableCreateButton(true)
    } else {
      setIsError(false)
      setHelperText("")
      setDisableCreateButton(false)
    }
  }
  useEffect(checkFileSize, [fileSize, maxFileSize])

  // TODO: right now the file name is just passed to the data set as a placeholder
  // TODO: instead send the file to the backend and add the object id of the file to the dataset
  // on change event handler
  function onChange(value: File | null) {
    // return if value is null
    if (value === null) {
      return
    }

    // set the file and the file size based on the value
    setFile(value)
    setFileSize(value === null ? 0 : value.size / 1000000)

    // create the new record
    let auxRecord: { [key: string]: string | number } = {}

    // TODO: handle the deletion of files that were not actually used to create an ai function
    // post the file to the backend and its object id to the record
    if (!isError) {
      api
        .postFile(session?.user.access_token as string, value)
        .then((res) => res.json())
        .then((d) => {
          auxRecord[inputVariable.name] = d.object_id
          setRecord({ ...record, ...auxRecord })
        })
    }
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
      ></MuiFileInput>
    </Box>
  )
}

export { FileRecordForm }
