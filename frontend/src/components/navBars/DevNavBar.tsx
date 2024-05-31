import React from "react"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { InitialsAvatar } from "@/components"
import Link from "next/link"

const DevNavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Box>
          <Link href="/dev" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/dev/projects" passHref>
            <Button color="inherit">Projects</Button>
          </Link>
          <Link href="/dev/ai-functions" passHref>
            <Button color="inherit">AI Functions</Button>
          </Link>
        </Box>
        <InitialsAvatar></InitialsAvatar>
      </Toolbar>
    </AppBar>
  )
}

export { DevNavBar }
