"use client"
import React from "react"
import { project } from "@/types"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface ProjectBoxProps {
  project: project
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ project }) => {
  return (
    <Box>
      <Typography>{project.title}</Typography>
      <Typography>{project.description}</Typography>
      <Typography>{project.creation_time}</Typography>
      <Typography>{project.number_of_functions}</Typography>
    </Box>
  )
}

export { ProjectBox }
