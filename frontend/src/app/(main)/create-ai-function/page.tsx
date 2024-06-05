"use client"
import { MainContentWrapper } from "@/components"
import { Typography, Box, TextField, Button } from "@mui/material"
import { useState } from "react"
interface FormData {
  name: string
  description: string
  password: string
}
export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
  }

  return (
    <MainContentWrapper>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Define a new AI function
        </Typography>
        <TextField label="Name" value={formData.name} onChange={handleChange} required />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </MainContentWrapper>
  )
}
