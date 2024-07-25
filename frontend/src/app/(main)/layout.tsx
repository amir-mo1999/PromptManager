"use client"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { InitialsAvatar } from "@/components"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { useState } from "react"
import { HelpDialog } from "@/components"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [openHelp, setOpenHelp] = useState<boolean>(false)

  function onClickHelp() {
    setOpenHelp(true)
  }

  return (
    /* Wrapper Box only sets the background color TODO: set the color from the theme */

    <Box sx={{ backgroundColor: "#F3F2F7", width: "100%" }}>
      {/* Wrapper Box for the top bar which contains the logo and the User Avatar*/}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "1rem",
          paddingX: "4rem",
          gap: 2,
        }}
      >
        <Typography align="left" variant="h4" sx={{ flex: 1 }}>
          My Logo
        </Typography>
        <HelpOutlineIcon onClick={onClickHelp} />
        <InitialsAvatar sx={{ height: 50, width: 50 }}></InitialsAvatar>
      </Box>
      {children}
      <HelpDialog open={openHelp} setOpen={setOpenHelp}></HelpDialog>
    </Box>
  )
}
