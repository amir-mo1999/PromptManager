"use client"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { api } from "@/network"
import Typography from "@mui/material/Typography"
import { MainContentWrapper } from "@/components"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { project } from "@/types"
import { useRouter } from "next/navigation"

// when accessing the base route redirect the user based on their role
export default function Home() {
  // set router for redirecting
  const router = useRouter()

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
      {/* Got it Button */}
      <Button variant="contained" onClick={() => router.push("/create-ai-function")}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography>🚀 Click here 🚀</Typography>
          <Typography>to define your first AI function!</Typography>
        </Box>
      </Button>
    </MainContentWrapper>
  )
}
