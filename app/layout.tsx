// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Mono, Golos_Text } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { LanguageProvider } from "@/lib/language-context"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { ClientBotGuard } from "@/components/auth/client-bot-guard"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

const golosText = Golos_Text({
  subsets: ["cyrillic", "latin"],
  variable: "--font-golos",
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
  generator: 'fluxen.Team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceMono.variable} ${golosText.variable} font-sans antialiased`}>
        <LanguageProvider>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            {/* Защита — как обёртка */}
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
