import { AIFunctionT } from "@/types"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { AIFunctionDialog } from "./AIFunctionDialog"

interface AIFunctionPaperProps {
  AIFunction: AIFunctionT
}

const AIFunctionPaper: React.FC<AIFunctionPaperProps> = ({ AIFunction }) => {
  const [isHover, setIsHover] = useState<boolean>(false)

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  function onMouseEnter() {
    setIsHover(true)
  }

  function onMouseLeave() {
    setIsHover(false)
  }

  function onClick() {}

  return (
    <Paper
      elevation={isHover ? 15 : 2}
      sx={{
        width: "100%",
        elevation: 15,
        padding: 0.5,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">{AIFunction.name}</Typography>
        <Typography variant="body1">{AIFunction.description}</Typography>
      </Box>
      <AIFunctionDialog></AIFunctionDialog>
    </Paper>
  )
}

export { AIFunctionPaper }
