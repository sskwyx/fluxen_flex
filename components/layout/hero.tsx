"use client"

import { Button } from "@/components/ui/button"
import {
  ShoppingBag,
  Shield,
  Globe,
} from "lucide-react"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function Hero() {
  const { t, language, setLanguage } = useLanguage()

  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const fullText = "flex"

  /* ---------- typing animation ---------- */
  useEffect(() => {
    if (isPaused) return

    let timeout: NodeJS.Timeout

    if (!isDeleting && displayedText.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(
          fullText.slice(0, displayedText.length + 1)
        )
      }, 120)
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(displayedText.slice(0, -1))
      }, 70)
    } else if (!isDeleting) {
      setIsPaused(true)
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 3000)
    } else {
      setIsPaused(true)
      timeout = setTimeout(() => {
        setDisplayedText("")
        setIsDeleting(false)
        setIsPaused(false)
      }, 1500)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, isPaused])

  /* ---------- UI ---------- */

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 left-0 w-[40rem] h-[40rem] bg-primary/20 blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[45rem] h-[45rem] bg-accent/20 blur-[180px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-4xl px-4 space-y-10">
        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            inline-flex
            items-center
            gap-2
            px-6 py-2
            rounded-full
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            text-sm
            font-mono
          "
        >
          by fluxen
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="
            font-mono
            text-6xl
            md:text-8xl
            font-bold
            tracking-tight
          "
        >
          {displayedText}
          <span
            className={`ml-2 inline-block w-[3px] h-14 md:h-20 bg-white ${
              isPaused
                ? "opacity-40"
                : "animate-pulse"
            }`}
          />
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="
              rounded-full
              px-10
              py-6
              text-lg
              bg-white
              text-black
              hover:bg-white/90
              shadow-xl
              hover:scale-105
              transition
            "
          >
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              {t.nav.products}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="
              rounded-full
              px-10
              py-6
              text-lg
              border-white/20
              backdrop-blur-xl
              hover:bg-white/10
              hover:scale-105
              transition
            "
          >
            <Link href="/about">
              <Shield className="mr-2 h-5 w-5" />
              {t.nav.about}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}