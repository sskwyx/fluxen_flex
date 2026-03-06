"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown, Zap, Shield, Gamepad2, Users,
  Server, Crown, Globe, Headphones, Gift, Sparkles, ArrowUpRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const faqLeft = [
  { q: "Когда открытие сервера?",   icon: Zap,      a: "27 декабря 2025 в 19:00 по МСК" },
  { q: "Нужна ли лицензия?",        icon: Shield,   a: "Только лицензия. Пиратам вход закрыт" },
  { q: "Поддерживаемые версии?",    icon: Gamepad2, a: "1.20.4 – 1.21.4 (рекомендуем 1.21.1 + Sodium/Iris)" },
  { q: "Сколько слотов на старте?", icon: Users,    a: "1500+ одновременных игроков" },
  { q: "Будут ли вайпы?",           icon: Server,   a: "Главный мир — без вайпов навсегда" },
]

const faqRight = [
  { q: "Что с донатом?",         icon: Crown,      a: "Только косметика и комфорт. P2W запрещён на уровне ядра" },
  { q: "Уникальные механики?",   icon: Globe,      a: "Кастомные боссы, подземелья, кланы, земли, войны" },
  { q: "Можно играть с модами?", icon: Headphones, a: "Да! Полная поддержка Fabric + наш лёгкий модпак" },
  { q: "Есть ли привилегии?",    icon: Gift,       a: "VIP / Premium / Elite — только визуал и удобство" },
]

function FAQItem({ item, isOpen, onToggle }: { item: typeof faqLeft[0], isOpen: boolean, onToggle: () => void }) {
  const Icon = item.icon
  return (
    <motion.div
      layout
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/30 transition duration-300">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="font-mono font-medium text-white/80 group-hover:text-white transition">
            {item.q}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-primary transition" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-6 pb-5 pt-2 border-t border-white/10">
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white/50 pl-14 text-sm leading-relaxed font-mono"
              >
                {item.a}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
  const [openLeft, setOpenLeft] = useState<number | null>(null)
  const [openRight, setOpenRight] = useState<number | null>(null)

  return (
    <section className="relative min-h-screen overflow-hidden py-24 px-6">

      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-500/20 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* NAVBAR */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-24"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
            Flex Project
          </span>
        </motion.div>

        {/* HERO TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">FAQ</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Часто задаваемые
            <span className="block mt-3 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              вопросы
            </span>
          </h1>
          <p className="mt-6 text-white/50 text-lg leading-relaxed">
            Всё что нужно знать.{" "}
            <span className="text-white">Перед стартом и после него.</span>
          </p>
        </motion.div>

        {/* HERO BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mb-24 rounded-3xl overflow-hidden border border-white/10"
          style={{ height: 260 }}
        >
          <Image src="/bg.jpg" alt="Flex" fill className="object-cover brightness-50" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        </motion.div>

        {/* FAQ GRID */}
        <div className="grid lg:grid-cols-2 gap-4 mb-24">
          <div className="space-y-3">
            {faqLeft.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openLeft === i}
                onToggle={() => setOpenLeft(openLeft === i ? null : i)}
              />
            ))}
          </div>
          <div className="space-y-3">
            {faqRight.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openRight === i}
                onToggle={() => setOpenRight(openRight === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-2xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute inset-0 rounded-[32px] bg-primary/10 blur-3xl opacity-30 pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs tracking-widest text-white/30 uppercase">навигация</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-mono mb-3">Вернуться на главную</h3>
            <p className="text-white/50">Управляй. Запускай. Играй без ограничений.</p>
          </div>
          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-3 rounded-full bg-white text-black px-8 py-4 font-semibold shadow-xl hover:scale-105 transition"
          >
            На главную
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}