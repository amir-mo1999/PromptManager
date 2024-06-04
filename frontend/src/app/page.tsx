"use client"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { InitialsAvatar } from "@/components"
// when accessing the base route redirect the user based on their role
export default function Home() {
  return (
    <main className=" bg-[#F2EDDE] px-10">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingY: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">My Logo</Typography>
        </Box>
        <InitialsAvatar sx={{ height: 50, width: 50 }}></InitialsAvatar>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 2,
            width: "30%",
            height: "80%",
          }}
        >
          <Typography variant="h4">Projects</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 2,
            width: "30%",
            height: "80%",
          }}
        >
          <Typography variant="h4">AI Functions</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 2,
            width: "30%",
            height: "80%",
          }}
        ></Box>
      </Box>
    </main>
  )
}
