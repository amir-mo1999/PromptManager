import TextField from "@mui/material/TextField"
import { Dispatch, SetStateAction } from "react"
import { SxProps } from "@mui/material"
import { TextFieldVariants } from "@mui/material/TextField"
interface IntegerInputProps {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  minValue?: number
  variant?: TextFieldVariants
  label?: string
  sx?: SxProps
}

const IntegerInput: React.FC<IntegerInputProps> = ({
  value,
  setValue,
  minValue,
  variant,
  label,
  sx,
}) => {
  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const val = e.target.value
    if (val === "") {
      setValue(minValue === undefined ? 0 : minValue)
    } else {
      setValue(parseInt(val, 10))
    }
  }

  return (
    <TextField
      type="number" // Use "text" type to avoid automatic handling of number inputs
      label={label}
      variant={variant}
      value={value.toString()}
      onChange={onChange}
      sx={sx}
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    />
  )
}

export { IntegerInput }
