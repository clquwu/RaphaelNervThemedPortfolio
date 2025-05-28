import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import localFont from "next/font/local"

// Load custom fonts
const matisseEB = localFont({
  src: "/fonts/MatisseEB.ttf",
  variable: "--font-matisse",
  display: "swap",
})

export const metadata = {
  title: "NERV Terminal - Developer Portfolio",
  description: "A portfolio website inspired by NERV from Evangelion"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${matisseEB.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}