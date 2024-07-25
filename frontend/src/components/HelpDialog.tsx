"use client"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { MainContentWrapper } from "@/components"

const HelpDialog: React.FC = () => {
  return (
    <MainContentWrapper>
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
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%" }}>
          <Typography variant="h4">1</Typography>
          <Typography variant="h4" align="center">
            Start by defining AI use cases as functions.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%" }}>
          <Typography variant="h4">2</Typography>
          <Typography variant="h4" align="center">
            Write and evaluate prompts that implement your functions or invite other prompt
            engineers to collaborate with you.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "30%" }}>
          <Typography variant="h4">3</Typography>
          <Typography variant="h4" align="center">
            Put functions together in projects and execute AI functions via the generated project
            endpoint.
          </Typography>
        </Box>
      </Box>
    </MainContentWrapper>
  )
}

export { HelpDialog }
