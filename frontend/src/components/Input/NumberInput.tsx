import TextField from "@mui/material/TextField"
import { Dispatch, SetStateAction } from "react"
import { SxProps } from "@mui/material"
import { TextFieldVariants } from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

interface NumberInputProps {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  valueSuffix?: string
  acceptFloat?: boolean
  maxValue?: number
  minValue?: number
  variant?: TextFieldVariants
  label?: string
  sx?: SxProps
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  setValue,
  minValue,
  acceptFloat = false,
  maxValue = 10000,
  valueSuffix = "",
  variant = "outlined",
  label,
  sx,
}) => {
  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const val = e.target.value //.slice(0, 0)
    if (val === "") {
      setValue(minValue === undefined ? 0 : minValue)
    } else {
      let numValue = acceptFloat ? parseFloat(val) : parseInt(val, 10)
      if (numValue > maxValue) {
        numValue = maxValue
      }
      setValue(numValue)
    }
  }

  const inputProps = {
    endAdornment: <InputAdornment position="start">{valueSuffix}</InputAdornment>,
  }

  return (
    <TextField
      type="number" // Use "text" type to avoid automatic handling of number inputs
      label={label}
      variant={variant}
      value={value.toString()}
      onChange={onChange}
      sx={sx}
      InputProps={acceptFloat ? inputProps : { ...inputProps, inputMode: "numeric" }}
    />
  )
}

export { NumberInput }
