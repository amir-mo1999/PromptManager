import TextField from "@mui/material/TextField"
import { Dispatch, SetStateAction, useEffect } from "react"
import { SxProps } from "@mui/material"
import { TextFieldVariants } from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"

//TODO: add validation to check that number min is lower than number max

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
  minValue = -10000,
  acceptFloat = false,
  maxValue = 10000,
  valueSuffix = "",
  variant = "outlined",
  label,
  sx,
}) => {
  // make sure the value is within the boundaries whenever they change
  function checkBoundaries() {
    if (value > maxValue) {
      value = maxValue
      setValue(maxValue)
    } else if (value < minValue) {
      setValue(minValue)
    }
  }

  useEffect(checkBoundaries, [minValue, maxValue])

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const val = e.target.value //.slice(0, 0)
    if (val === "") {
      setValue(minValue === undefined ? 0 : minValue)
    } else {
      let numValue = acceptFloat ? parseFloat(val) : parseInt(val, 10)
      if (numValue > maxValue) {
        numValue = maxValue
      } else if (numValue < minValue) {
        numValue = minValue
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
