import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { SxProps, Theme } from "@mui/system"
import TextField from "@mui/material/TextField"
import { InputBaseComponentProps } from "@mui/material"
interface TextInputFieldProps {
  value: string
  valueSetter: Dispatch<SetStateAction<string>>
  isError: boolean
  setIsError: Dispatch<SetStateAction<boolean>>
  label?: string
  multiline?: boolean
  maxChars?: number
  minChars?: number
  minRows?: number
  maxRows?: number
  sx?: SxProps<Theme>
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  value,
  valueSetter,
  isError,
  setIsError,
  label,
  multiline,
  maxChars = 1000,
  minChars = 1,
  minRows,
  maxRows,
  sx,
}) => {
  const [helperText, setHelperText] = useState<string>("")

  const [showError, setShowError] = useState<boolean>(false)

  function isUnderMinCharLength(value: string) {
    if (value.length < minChars) {
      setIsError(true)
      return true
    } else {
      setIsError(false)
      setShowError(false)
      setHelperText("")
      return false
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    valueSetter(e.target.value)
    isUnderMinCharLength(e.target.value)
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
    if (isUnderMinCharLength(e.target.value)) {
      setShowError(true)
      setHelperText(`Must contain at least ${minChars} characters`)
    }
  }

  return (
    <TextField
      sx={sx}
      id="outlined-basic"
      value={value}
      label={label}
      variant="outlined"
      required={true}
      onChange={onChange}
      inputProps={{ maxLength: maxChars }}
      helperText={helperText}
      multiline={multiline ? multiline : false}
      minRows={minRows ? minRows : undefined}
      maxRows={maxRows ? maxRows : undefined}
      error={showError}
      onBlur={onBlur}
    />
  )
}

export { TextInputField }
