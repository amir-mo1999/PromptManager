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
    <main className=" bg-[#F2EDDE] px-10">
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
      <Box
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 2,
            width: "30%",
            height: "80%",
          }}
        >
          <Typography variant="h4">Projects</Typography>
          <Button onClick={() => console.log(projects)}>Get all projects</Button>
          {projects !== undefined ? <ProjectBox project={projects[0]}></ProjectBox> : ""}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 2,
            width: "30%",
            height: "80%",
          }}
        >
          <Typography variant="h4">AI Functions</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 2,
            width: "30%",
            height: "80%",
          }}
        ></Box>
      </Box>
    </main>
  )
}
