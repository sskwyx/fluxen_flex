// components/client-bot-guard.tsx
"use client"

import { useState, useEffect } from "react"
import { BotCaptcha } from "@/components/auth/bot-captcha"

export function ClientBotGuard({ children }: { children: React.ReactNode }) {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
  if (typeof window === "undefined") return

  if (localStorage.getItem("rumi_human_verified") === "1") {
    setIsVerified(true)
    return
  }

  const referrer = document.referrer
  const isDirect = !referrer || referrer === window.location.href
  const isFromSearch = 
    referrer.includes("google.com") || 
    referrer.includes("bing.com") || 
    referrer.includes("duckduckgo.com") || 
    referrer.includes("yandex.") || 
    referrer.includes("t.co")

  if (isDirect && !isFromSearch) {
    // Логируем подозрительный заход
    fetch("/api/security/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userAgent: navigator.userAgent,
        eventType: "direct_access_suspicious",
        referrer: document.referrer,
      }),
    })
    setShowCaptcha(true)
  } else {
    setIsVerified(true)
    localStorage.setItem("rumi_human_verified", "1")

    // Логируем успешный проход (без капчи)
    fetch("/api/security/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userAgent: navigator.userAgent,
        eventType: "captcha_success", // условно — прошёл без капчи
        captchaAttempts: 1,
        referrer: document.referrer,
      }),
    })
  }
}, [])

  const handleCaptchaVerify = (success: boolean) => {
    if (success) {
      setIsVerified(true)
      setShowCaptcha(false)
      localStorage.setItem("rumi_human_verified", "1")
    }
  }

  if (showCaptcha) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
        <div className="bg-background border border-white/10 rounded-2xl p-6 w-full max-w-md">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 mb-3 border border-primary/20 font-mono text-xs text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              SECURITY
            </div>
            <h3 className="font-mono text-xl font-bold">Human Verification</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Please verify you're not a bot.
            </p>
          </div>
          <BotCaptcha onVerify={handleCaptchaVerify} />
        </div>
      </div>
    )
  }

  if (!isVerified) {
    return null
  }

  return <>{children}</>
}
