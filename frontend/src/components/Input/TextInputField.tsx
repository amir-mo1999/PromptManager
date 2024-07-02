import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { SxProps, Theme } from "@mui/system"
import TextField from "@mui/material/TextField"
import { InputBaseComponentProps } from "@mui/material"

interface TextInputFieldProps {
  valueSetter: Dispatch<SetStateAction<string>>
  isError: boolean
  setIsError: Dispatch<SetStateAction<boolean>>
  label: string
  inputProps?: InputBaseComponentProps
  multiline?: boolean
  minChars?: number
  minRows?: number
  maxRows?: number
  sx?: SxProps<Theme>
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  valueSetter,
  isError,
  setIsError,
  label,
  inputProps,
  multiline,
  minChars = 0,
  minRows,
  maxRows,
  sx,
}) => {
  const [helperText, setHelperText] = useState<string>("")

  function checkMinCharLength(value: string) {
    if (value.length < minChars && value.length !== 0) {
      setIsError(true)
      setHelperText(`Must contain at least ${minChars} characters`)
    } else {
      setIsError(false)
      setHelperText("")
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    valueSetter(e.target.value)
    checkMinCharLength(e.target.value)
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
    checkMinCharLength(e.target.value)
  }

  return (
    <TextField
      sx={sx}
      id="outlined-basic"
      label={label}
      variant="outlined"
      required={true}
      onChange={(e) => {
        valueSetter(e.target.value)
        if (e.target.value !== "") {
          setIsError(false)
          setHelperText("")
        }
      }}
      inputProps={inputProps}
      helperText={helperText}
      multiline={multiline ? multiline : false}
      minRows={minRows ? minRows : undefined}
      maxRows={maxRows ? maxRows : undefined}
      error={isError}
      onBlur={(e) => {
        if (e.target.value === "") {
          setIsError(true)
          setHelperText("This field is required")
        } else {
          setIsError(false)
          setHelperText("")
        }
      }}
    />
  )
}

export { TextInputField }
