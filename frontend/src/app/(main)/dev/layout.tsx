import { DevNavBar } from "@/components"
import { Box } from "@mui/material"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <DevNavBar></DevNavBar>
        {children}
      </Box>
    </main>
  )
}
