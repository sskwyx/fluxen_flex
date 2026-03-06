"use client"

import { motion } from "framer-motion"
import {
  MessageCircle,
  Send,
  Users,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

const CONTACTS = [
  {
    title: "Поддержка",
    description:
      "Технические вопросы, проблемы с сервисами Flex и обратная связь. Живые ответы без ботов.",
    icon: MessageCircle,
    link: "https://t.me/fluxen_flex",
    label: "@fluxen_flex",
  },
  {
    title: "Обновления",
    description:
      "Релизы, изменения, новые проекты и системные апдейты команды Flex.",
    icon: Send,
    link: "https://t.me/fluxen_flex",
    label: "Telegram канал",
  },
  {
    title: "Партнёрства",
    description:
      "Коммерческие предложения, сотрудничество и интеграции.",
    icon: Users,
    link: "https://t.me/fluxen_flex",
    label: "Связаться",
  },
]

const STATUS = [
  { label: "Поддержка",      value: "24 / 7"  },
  { label: "Средний ответ",  value: "~15 мин" },
  { label: "Языки",          value: "RU · EN" },
]

export default function ContactPage() {
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

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <p className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">
            contact
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Связь с командой
            <span className="block mt-3 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Flex
            </span>
          </h1>

          <p className="mt-6 text-white/50 text-lg leading-relaxed">
            Официальные каналы связи.{" "}
            <span className="text-white">Поддержка, обновления и взаимодействие с командой.</span>
          </p>
        </motion.div>

        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-5 mb-24">
          {CONTACTS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 transition-all"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/20 via-violet-400/10 to-transparent" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-primary transition duration-300" />
                  </div>

                  <h2 className="font-mono font-bold text-lg text-white mb-3">
                    {item.title}
                  </h2>

                  <p className="text-sm text-white/40 leading-relaxed mb-8">
                    {item.description}
                  </p>

                  <span className="font-mono text-xs tracking-widest text-primary uppercase">
                    {item.label}
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* STATUS — CTA STYLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-2xl p-10 md:p-14"
        >
          <div className="absolute inset-0 rounded-[32px] bg-primary/10 blur-3xl opacity-30 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
                system status
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {STATUS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                >
                  <p className="font-mono text-xs tracking-widest text-white/30 uppercase mb-3">
                    {s.label}
                  </p>
                  <p className="font-mono font-bold text-3xl md:text-4xl text-white">
                    {s.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}