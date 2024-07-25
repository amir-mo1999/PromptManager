import { AIFunctionT } from "@/types"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface AIFunctionPaperProps {
  AIFunction: AIFunctionT
}

const AIFunctionPaper: React.FC<AIFunctionPaperProps> = ({ AIFunction }) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">{AIFunction.name}</Typography>
        <Typography variant="body1">{AIFunction.description}</Typography>
      </Box>
    </Paper>
  )
}

export { AIFunctionPaper }
