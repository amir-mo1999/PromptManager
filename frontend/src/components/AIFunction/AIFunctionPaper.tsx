import { AIFunctionT } from "@/types"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import { AIFunctionDialog } from "./AIFunctionDialog"
import { SxProps } from "@mui/material"
interface AIFunctionPaperProps {
  AIFunction: AIFunctionT
  sx?: SxProps
}

const AIFunctionPaper: React.FC<AIFunctionPaperProps> = ({ AIFunction, sx }) => {
  const [isHover, setIsHover] = useState<boolean>(false)

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  function onMouseEnter() {
    setIsHover(true)
  }

  function onMouseLeave() {
    setIsHover(false)
  }

  // event handler when editing a record
  function onClick() {
    setOpenDialog(true)
  }

  return (
    <>
      <Paper
        elevation={isHover ? 15 : 2}
        sx={{
          elevation: 15,
          padding: 0.5,
          ...sx,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">{AIFunction.name}</Typography>
          <Typography variant="body1">{AIFunction.description}</Typography>
        </Box>
      </Paper>
      <AIFunctionDialog
        AIFunction={AIFunction}
        open={openDialog}
        setOpen={setOpenDialog}
      ></AIFunctionDialog>
    </>
  )
}

export { AIFunctionPaper }
