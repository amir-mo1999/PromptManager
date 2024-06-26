import TextField from "@mui/material/TextField"
import { Dispatch, SetStateAction } from "react"
import { SxProps } from "@mui/material"
import { TextFieldVariants } from "@mui/material/TextField"

interface FloatInputProps {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  minValue?: number
  variant?: TextFieldVariants
  label?: string
  sx?: SxProps
}

const FloatInput: React.FC<FloatInputProps> = ({
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
      setValue(parseFloat(val))
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
      inputProps={{ inputMode: "numeric" }}
    />
  )
}

export { FloatInput }
