"use client"
import React from "react"
import Box from "@mui/material/Box"

interface ProjectBoxProps {
  children?: React.ReactNode
}

const MainContentWrapper: React.FC<ProjectBoxProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#F3F2F7",
        paddingX: "4rem",
        paddingY: "1rem",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  )
}

export { MainContentWrapper }
