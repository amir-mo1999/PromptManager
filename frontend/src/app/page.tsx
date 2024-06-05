"use client"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { api } from "@/network"
import Typography from "@mui/material/Typography"
import { InitialsAvatar } from "@/components"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { project } from "@/types"

// when accessing the base route redirect the user based on their role
export default function Home() {
  // get current session
  const { data: session } = useSession()

  // get all projects of the current user
  const [projects, setProjects] = useState<project[]>([])

  // initialize projects
  useEffect(() => {
    api
      .getAllProjects(session?.user.access_token as string)
      .then((res) => {
        return res.json()
      })
      .then((data) => setProjects(data.project_list))
  }, [])

  if (projects.length !== 0) {
    return <main>You have no projects yet!</main>
  }
  // this is the main page
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
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
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
      {/* Got it Button */}
      <Button variant="contained">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography>🚀 Click here 🚀</Typography>
          <Typography>to create your first project</Typography>
        </Box>
      </Button>
    </Box>
  )
}
