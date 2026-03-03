// components/bot-captcha.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function BotCaptcha({ 
  onVerify, 
  className = "" 
}: { 
  onVerify: (success: boolean) => void 
  className?: string 
}) {
  const [captchaText, setCaptchaText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Генерация случайной строки (4 символа: A-Z, 0-9)
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
    let result = ""
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Рисование капчи на canvas
  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Очистка
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Фон
    ctx.fillStyle = "transparent"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Случайные линии
    ctx.strokeStyle = "rgba(255,255,255,0.1)"
    ctx.lineWidth = 1
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.stroke()
    }

    // Текст капчи
    ctx.font = "bold 32px monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Каждая буква — отдельно, с поворотом
    const charWidth = canvas.width / captchaText.length
    for (let i = 0; i < text.length; i++) {
      ctx.save()
      ctx.translate(charWidth * i + charWidth / 2, canvas.height / 2)
      ctx.rotate((Math.random() - 0.5) * 0.5) // небольшой поворот
      ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 70%)`
      ctx.fillText(text[i], 0, 0)
      ctx.restore()
    }
  }

  // Инициализация
  useEffect(() => {
    const newCaptcha = generateCaptcha()
    setCaptchaText(newCaptcha)
  }, [])

  useEffect(() => {
    if (captchaText) {
      drawCaptcha(captchaText)
    }
  }, [captchaText])

  const handleVerify = () => {
  const success = userInput.trim().toUpperCase() === captchaText
  setIsVerified(success)

  // Отправка лога
  fetch("/api/security/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userAgent: navigator.userAgent,
      eventType: success ? "captcha_success" : "captcha_fail",
      captchaAttempts: 1, // можно улучшить до счётчика
      referrer: document.referrer,
    }),
  })

  onVerify(success)
  if (!success) {
    const newCaptcha = generateCaptcha()
    setCaptchaText(newCaptcha)
    setUserInput("")
  }
}

  const handleRefresh = () => {
    const newCaptcha = generateCaptcha()
    setCaptchaText(newCaptcha)
    setUserInput("")
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col gap-4 ${className}`}
    >
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2 font-mono">
          Prove you are human
        </p>
        
        {/* Canvas с капчей */}
        <div className="relative inline-block bg-white/5 rounded-lg p-2 border border-white/10">
          <canvas
            ref={canvasRef}
            width={160}
            height={60}
            className="block"
          />
          <button
            type="button"
            onClick={handleRefresh}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary/30 transition-colors"
            aria-label="Refresh"
          >
            ↻
          </button>
        </div>
      </div>

      {/* Поле ввода */}
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter code"
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-white placeholder:text-muted-foreground font-mono text-center"
          maxLength={4}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <Button
          type="button"
          onClick={handleVerify}
          disabled={userInput.length < 4}
          className="px-4 rounded-lg font-mono"
        >
          {isVerified ? "✓" : "GO"}
        </Button>
      </div>

      {isVerified && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-green-400 font-mono text-center"
        >
          Verified. You may proceed.
        </motion.p>
      )}
    </motion.div>
  )
}

// Минималистичная кнопка
function Button({ 
  children, 
  onClick, 
  disabled,
  className 
}: { 
  children: React.ReactNode 
  onClick: () => void 
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary text-background font-bold rounded transition-colors hover:bg-primary/80 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}