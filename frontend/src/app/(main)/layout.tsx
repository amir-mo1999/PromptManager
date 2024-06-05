"use client"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { InitialsAvatar } from "@/components"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    /* Wrapper Box only sets the background color TODO: set the color from the theme */
    <Box sx={{ backgroundColor: "#F3F2F7" }}>
      {/* Wrapper Box for the top bar which contains the logo and the User Avatar*/}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          paddingTop: "1rem",
          paddingX: "4rem",
        }}
      >
        <Typography align="center" variant="h4">
          My Logo
        </Typography>
        <InitialsAvatar sx={{ height: 50, width: 50 }}></InitialsAvatar>
      </Box>
      {children}
    </Box>
  )
}
