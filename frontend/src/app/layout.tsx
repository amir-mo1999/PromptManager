"use client"
import "./globals.css"
import { Providers } from "@/components"
import theme from "@/mui_theme"
import { ThemeProvider } from "@mui/material"
import { SessionLoaded } from "@/components"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider theme={theme}>
            <SessionLoaded>{children}</SessionLoaded>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
