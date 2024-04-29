"use client"
import { useSession } from "next-auth/react"
import { Box, Typography, Button } from "@mui/material"
import { signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  if (session?.user.role === undefined) {
    // TODO: replace with a custom loading component
    return <main>Loading ...</main>
  } else if (session?.user.role === "developer") {
    return (
      <Box
        sx={{
          height: "80%", // Set height to 50% of the viewport height
          width: "80%", // Set width to 50% of the viewport width
          border: "1px solid gray",
        }}
        display="flex"
        flexDirection="column"
        gap={2}
        p={2}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h3">Projects</Typography>
          <Button variant="contained" onClick={() => signOut()}>
            Sign Out
          </Button>
        </Box>

        <Box display="flex">
          <Typography variant="h5" mr={5}>
            Title
          </Typography>
          <Typography variant="h5" mr={5}>
            Description
          </Typography>
          <Typography variant="h5" mr={5}>
            Functions
          </Typography>
          <Typography variant="h5" mr={5}>
            Created
          </Typography>
        </Box>
      </Box>
    )
  }

  // TODO: replace with a custom not authorized component
  return <main>You are not authorized to view this page!</main>
}
