import * as React from "react"
import { inputVariableType } from "@/types"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { MuiFileInput } from "mui-file-input"
import { ImageFileInputConstraintsObj } from "@/types"

interface FileRecordFormProps {
  inputVariable: inputVariableType
  record: Record<string, string | number>
  setRecord: Dispatch<SetStateAction<Record<string, string | number>>>
  setDisableCreateButton: Dispatch<SetStateAction<boolean>>
}

const FileRecordForm: React.FC<FileRecordFormProps> = ({
  inputVariable,
  record,
  setRecord,
  setDisableCreateButton,
}) => {
  // parse constraints
  const constraints = ImageFileInputConstraintsObj.parse(inputVariable.constraints)

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
    setFile(value)
    setFileSize(value === null ? 0 : value.size / 1000000)

    let auxRecord: { [key: string]: string | number } = {}
    auxRecord[inputVariable.name] = value === null ? "null file" : value.name
    setRecord({ ...record, ...auxRecord })
  }
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
        inputProps={{ accept: ".png, .jpeg, .jpg" }}
        onChange={onChange}
      ></MuiFileInput>
    </Box>
  )
}

export { FileRecordForm }
