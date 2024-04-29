"use client"
import "./globals.css"
import { Providers } from "@/components"
import theme from "@/mui_theme"
import { ThemeProvider } from "@mui/material"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
