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

  function checkMinCharLength(value: string) {
    if (value.length < minChars) {
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
      error={isError}
      onBlur={onBlur}
    />
  )
}

export { TextInputField }
