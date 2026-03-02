// components/initial-bot-check.tsx
"use client"

import { useState, useEffect } from "react"
import { BotCaptcha } from "@/components/bot-captcha" // тот, что выше

export function InitialBotCheck({ children }: { children: React.ReactNode }) {
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    // Проверяем только при первой загрузке
    const hasPassed = localStorage.getItem("rumi_human_verified") === "1"
    if (hasPassed) {
      setIsVerified(true)
      return
    }

    // Анализ поведения
    const referrer = document.referrer
    const isDirect = !referrer || referrer === window.location.href
    const isFromSearch = referrer.includes("google.com") || 
                         referrer.includes("bing.com") || 
                         referrer.includes("duckduckgo.com")

    // Если зашёл напрямую — требуем проверку
    if (isDirect && !isFromSearch) {
      setShowCaptcha(true)
    } else {
      // Пропускаем
      setIsVerified(true)
      localStorage.setItem("rumi_human_verified", "1")
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
    return null // ничего не показываем, пока не решим
  }

  return <>{children}</>
}