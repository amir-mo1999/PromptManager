"use client"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { MainContentWrapper } from "@/components"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import { Dispatch, SetStateAction } from "react"
interface HelpDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const HelpDialog: React.FC<HelpDialogProps> = ({ open, setOpen }) => {
  function onClose() {
    setOpen(false)
  }

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" align="center" sx={{ paddingBottom: "4rem", paddingTop: "5rem" }}>
          Welcome to App-Name!
        </Typography>
        {/* Wrapper Box for main content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingBottom: "5rem",
            width: "100%",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%" }}
          >
            <Typography variant="h4">1</Typography>
            <Typography variant="h4" align="center">
              Start by defining AI use cases as functions.
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%" }}
          >
            <Typography variant="h4">2</Typography>
            <Typography variant="h4" align="center">
              Write and evaluate prompts that implement your functions or invite other prompt
              engineers to collaborate with you.
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%" }}
          >
            <Typography variant="h4">3</Typography>
            <Typography variant="h4" align="center">
              Put functions together in projects and execute AI functions via the generated project
              endpoint.
            </Typography>
          </Box>
        </Box>
      </Box>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} variant="contained">
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { HelpDialog }
