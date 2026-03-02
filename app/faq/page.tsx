"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown, 
  Zap, Shield, Gamepad2, Users, Server, Crown, Globe, Headphones, Gift, ArrowLeft
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const faqLeft = [
  { q: "Когда открытие сервера?",      icon: Zap,      a: "27 декабря 2025 в 19:00 по МСК" },
  { q: "Нужна ли лицензия?",           icon: Shield,   a: "Только лицензия. Пиратам вход закрыт" },
  { q: "Поддерживаемые версии?",       icon: Gamepad2, a: "1.20.4 – 1.21.4 (рекомендуем 1.21.1 + Sodium/Iris)" },
  { q: "Сколько слотов на старте?",    icon: Users,    a: "1500+ одновременных игроков" },
  { q: "Будут ли вайпы?",              icon: Server,   a: "Главный мир — без вайпов навсегда" },
]

const faqRight = [
  { q: "Что с донатом?",               icon: Crown,    a: "Только косметика и комфорт. P2W запрещён на уровне ядра" },
  { q: "Уникальные механики?",         icon: Globe,    a: "Кастомные боссы, подземелья, кланы, земли, войны" },
  { q: "Можно играть с модами?",       icon: Headphones, a: "Да! Полная поддержка Fabric + наш лёгкий модпак" },
  { q: "Есть ли привилегии?",          icon: Gift,     a: "VIP / Premium / Elite — только визуал и удобство" },
]

export default function FAQPage() {
  const [openLeft, setOpenLeft] = useState<number | null>(null)
  const [openRight, setOpenRight] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Твоя панелька */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full h-80 mt-20 mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
      >
        <Image src="/bg.jpg" alt="Flex" fill className="object-cover opacity-80" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-16">
          <p className="text-xs uppercase tracking-widest text-primary font-mono mb-3">FAQ</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl">
            Часто задаваемые
            <span className="block text-primary mt-2">вопросы</span>
          </h1>
        </div>
      </motion.div>

      {/* ДВЕ КОЛОНКИ — лёгкий минимализм + крутое раскрытие */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Левая колонка */}
          <div className="space-y-3">
            {faqLeft.map((item, i) => {
              const Icon = item.icon
              const isOpen = openLeft === i

              return (
                <motion.div
                  key={i}
                  layout
                  className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl"
                  initial={false}
                >
                  <motion.button
                    onClick={() => setOpenLeft(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-white/10 group-hover:bg-primary/20 transition">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-lg font-medium font-mono">{item.q}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-white/40 group-hover:text-primary" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <div className="px-6 pb-6 pt-3 border-t border-white/10">
                          <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/70 pl-14 text-base leading-relaxed font-light"
                          >
                            {item.a}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Правая колонка */}
          <div className="space-y-3">
            {faqRight.map((item, i) => {
              const Icon = item.icon
              const isOpen = openRight === i

              return (
                <motion.div
                  key={i}
                  layout
                  className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl"
                  initial={false}
                >
                  <motion.button
                    onClick={() => setOpenRight(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-white/10 group-hover:bg-primary/20 transition">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-lg font-medium font-mono">{item.q}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-white/40 group-hover:text-primary" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <div className="px-6 pb-6 pt-3 border-t border-white/10">
                          <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/70 pl-14 text-base leading-relaxed font-light"
                          >
                            {item.a}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Кнопка назад */}
        <div className="flex justify-center mt-20">
          <Link href="/">
            <button className="inline-flex items-center gap-3 px-9 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-primary/40 transition text-lg font-mono">
              <ArrowLeft className="h-5 w-5" />
              На главную
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}