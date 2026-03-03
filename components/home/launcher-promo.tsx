"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Sparkles, ShieldCheck, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function LauncherPromo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative h-full min-h-[560px] w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col justify-between p-7"
    >
      {/* Background Image */}
      <Image
        src="/bgpromo.jpg"
        alt="Launcher background"
        fill
        className="object-cover opacity-30"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80" />

      {/* Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />

      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6 border border-primary/20 font-mono text-xs text-primary">
          <Sparkles className="h-4 w-4" />
          FLEX LAUNCHER
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold leading-tight mb-3">
          Один клик — и ты в игре.
          <span className="block text-primary mt-1">Максимум скорости.</span>
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Фирменный лаунчер Flex с автообновлениями, защитой и мгновенным подключением.
          Никаких ручных патчей и лишних действий — просто запускай и играй.
        </p>

        {/* Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Zap className="h-4 w-4 text-primary" />
            Мгновенный запуск
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Встроенная защита
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            Автообновления без перекачек
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="relative z-10">
        <Button className="w-full rounded-xl text-base shadow-lg shadow-primary/20 hover:scale-[1.03] transition-transform">
          <Download className="mr-2 h-5 w-5" />
          Скачать лаунчер
        </Button>
      </div>
    </motion.div>
  )
}
