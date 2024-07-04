import { inputVariableType } from "@/types"
import { inputOutputTypes, inputConstraintsAliases } from "@/app/utils"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { MouseEventHandler } from "react"

interface RecordBoxProps {
  record: Record<string, string | number>
  onClickEdit: MouseEventHandler<HTMLButtonElement>
  onClickDelete: MouseEventHandler<HTMLButtonElement>
}

const RecordBox: React.FC<RecordBoxProps> = ({ record, onClickEdit, onClickDelete }) => {
  return (
    <Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" onClick={onClickEdit}>
          Edit
        </Button>
        <Button variant="contained" onClick={onClickDelete}>
          Delete
        </Button>
      </Box>

      {Object.keys(record).map((key, indx) => {
        return <Typography key={indx}>{key + " " + record[key]}</Typography>
      })}
    </Paper>
  )
}

export { RecordBox }
