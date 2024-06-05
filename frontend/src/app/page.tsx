"use client"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { api } from "@/network"
import Typography from "@mui/material/Typography"
import { InitialsAvatar, ProjectBox } from "@/components"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { project } from "@/types"

// when accessing the base route redirect the user based on their role
export default function Home() {
  // get current session
  const { data: session } = useSession()

  // get all projects of the current user
  const [projects, setProjects] = useState<[project]>()

  useEffect(() => {
    api
      .getAllProjects(session?.user.access_token as string)
      .then((res) => {
        return res.json()
      })
      .then((data) => setProjects(data.project_list))
  }, [])

  // this is the main page
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F3F2F7",
        paddingX: "4rem",
        height: "100vh",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingY: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">My Logo</Typography>
        </Box>
        <InitialsAvatar sx={{ height: 50, width: 50 }}></InitialsAvatar>
      </Box>
      {/* Wrapper Box for main content */}
      <Box sx={{ borderColor: "black", borderWidth: "1px", flex: 1 }}>Hello</Box>
    </Box>
  )
}
