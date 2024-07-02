import { inputVariableType } from "@/types"
import { inputOutputTypes, inputConstraintsAliases } from "@/app/utils"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { MouseEventHandler } from "react"

interface InputVariableBoxProps {
  inputVariable: inputVariableType
  onClickEdit: MouseEventHandler<HTMLButtonElement>
  onClickDelete: MouseEventHandler<HTMLButtonElement>
}

const InputVariableBox: React.FC<InputVariableBoxProps> = ({
  inputVariable,
  onClickEdit,
  onClickDelete,
}) => {
  const varTypeAlias = inputOutputTypes[inputVariable.var_type]
  const constraintKeys = Object.keys(inputVariable.constraints)
  return (
    <Paper>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Typography fontWeight="bold" sx={{ flex: 1 }}>
          {inputVariable.name}
        </Typography>
        <Button variant="contained" onClick={onClickEdit}>
          Edit
        </Button>
        <Button variant="contained" onClick={onClickDelete}>
          Delete
        </Button>
      </Box>

      <Typography>Input Type: {varTypeAlias}</Typography>
      {constraintKeys.map((key, indx) => {
        if (key === "type") {
          return ""
        }
        // @ts-ignore
        const constraintValue = inputVariable.constraints[key]
        // @ts-ignore
        const keyAlias = inputConstraintsAliases[key]
        return (
          <Typography key={indx}>
            {keyAlias}: {constraintValue as string}
          </Typography>
        )
      })}
    </Paper>
  )
}

export { InputVariableBox }
