import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Poppins } from "next/font/google"
import { Header } from "@/components/header"
import { MouseFollower } from "@/components/mouse-follower"
import { LenisProvider } from "@/components/lenis-smooth-scroll"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${poppins.variable} bg-background`}
    >
      <body className="font-sans">
        <LenisProvider>
          <Header />
          {children}
          <MouseFollower />
        </LenisProvider>
      </body>
    </html>
  )
}
