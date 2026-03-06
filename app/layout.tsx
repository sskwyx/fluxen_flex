// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { LanguageProvider } from "@/lib/language-context"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { ClientBotGuard } from "@/components/auth/client-bot-guard"
import { Unbounded, Space_Mono } from "next/font/google"

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "flex - Minecraft server.",
  description: "Premium Minecraft server platform",
  keywords: ["game", "enhancement", "platform", "gaming", "minecraft", "cheats", "premium"],
  authors: [{ name: "fluxen.Team" }],
  openGraph: {
    title: "flex - Minecraft server.",
    description: "Premium gaming enhancement platform",
    type: "website",
  },
  generator: "fluxen.Team",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${unbounded.variable} ${spaceMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <ClientBotGuard>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <Toaster />
            </ClientBotGuard>
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}