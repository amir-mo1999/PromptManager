"use client"
import React from "react"
import { ProjectT } from "@/types"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface ProjectBoxProps {
  project: ProjectT
}

function formatDate(datetime: string): string {
  // Parse the datetime string to a Date object
  const date = new Date(datetime)

  // Extract the day, month, and year
  const day = date.getDate()
  const month = date.getMonth() + 1 // getMonth() returns 0-indexed month
  const year = date.getFullYear()

  // Pad the day and month with leading zeros if necessary
  const dayString = day < 10 ? `0${day}` : `${day}`
  const monthString = month < 10 ? `0${month}` : `${month}`

  // Return the formatted date string
  return `${dayString}.${monthString}.${year}`
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ project }) => {
  return (
    <Box>
      <Typography>{project.title}</Typography>
      <Typography>{project.description}</Typography>
      <Typography>{formatDate(project.creation_time)}</Typography>
      <Typography>{project.number_of_functions}</Typography>
    </Box>
  )
}

export { ProjectBox }
