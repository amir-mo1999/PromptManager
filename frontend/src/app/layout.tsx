"use client"
import "./globals.css"
import { Providers } from "@/components"
import theme from "@/mui_theme"
import { ThemeProvider } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { InitialsAvatar } from "@/components"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { useState } from "react"
import { HelpDialog } from "@/components"
import { SessionLoaded } from "@/components"

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
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider theme={theme}>
            <SessionLoaded>
              <Box
                sx={{
                  backgroundColor: "#F3F2F7",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
              </Box>
              <HelpDialog open={openHelp} setOpen={setOpenHelp}></HelpDialog>
            </SessionLoaded>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
