"use client"
import React from "react"
import { Typography, Grid, Card, CardContent, Button, Box } from "@mui/material"
import Link from "next/link"

const DeveloperHome: React.FC = () => {
  const sampleProjects = [
    {
      title: "Project Alpha",
      description: "An AI project for image recognition.",
      date: "31.05.2024",
    },
    {
      title: "Project Beta",
      description: "An AI project for natural language processing.",
      date: "12.03.2024",
    },
  ]

  const sampleFunctions = [
    {
      name: "Image Classifier",
      description: "Classifies images into categories.",
      inputType: "Image",
      outputType: "Category",
    },
    {
      name: "Text Summarizer",
      description: "Summarizes text documents.",
      inputType: "Text",
      outputType: "Summary",
    },
  ]

  return (
    <main>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                Projects
              </Typography>
              {sampleProjects.map((project, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{project.title}</Typography>
                    <Typography variant="body2">{project.description}</Typography>
                    <Typography variant="body2">{project.date}</Typography>
                  </CardContent>
                </Card>
              ))}
              <Link href="/dev/projects" passHref>
                <Button variant="contained" color="primary" fullWidth>
                  View All Projects
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2" gutterBottom>
                AI Functions
              </Typography>
              {sampleFunctions.map((func, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{func.name}</Typography>
                    <Typography variant="body2">{func.description}</Typography>
                    <Typography variant="caption">
                      Input: {func.inputType} | Output: {func.outputType}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              <Link href="/dev/ai-functions" passHref>
                <Button variant="contained" color="primary" fullWidth>
                  View All AI Functions
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </main>
  )
}

export default DeveloperHome
