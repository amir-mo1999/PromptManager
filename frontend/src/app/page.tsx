"use client"

import { MainContentWrapper } from "@/components"
import { AIFunctionList } from "@/components"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function Home() {
  return (
    <MainContentWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "5px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "full" }}>
          <Typography variant="h5">AI Functions</Typography>
          <AIFunctionList></AIFunctionList>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "full" }}>
          <Typography variant="h5">Prompts</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "full" }}>
          <Typography variant="h5">Projects</Typography>
        </Box>
      </Box>
    </MainContentWrapper>
  )
}
