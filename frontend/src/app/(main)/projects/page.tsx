"use client"

import { MainContentWrapper } from "@/components"
import Typography from "@mui/material/Typography"
import { useState, useEffect } from "react"
import { api } from "@/network"
import { project } from "@/types"
import { useSession } from "next-auth/react"

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

  return (
    <MainContentWrapper>
      <Typography>Hello</Typography>
    </MainContentWrapper>
  )
}
