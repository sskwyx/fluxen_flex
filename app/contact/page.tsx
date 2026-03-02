"use client"

import { motion } from "framer-motion"
import {
  MessageCircle,
  Send,
  Users,
  Clock,
  ArrowUpRight,
} from "lucide-react"

const CONTACTS = [
  {
    title: "Поддержка",
    description:
      "Технические вопросы, проблемы с сервисами Flex и обратная связь. Живые ответы без ботов.",
    icon: MessageCircle,
    link: "https://t.me/fluxen_flex",
    label: "@fluxen_flex",
    accent: "from-primary/20 to-primary/5",
  },
  {
    title: "Обновления",
    description:
      "Релизы, изменения, новые проекты и системные апдейты команды Flex.",
    icon: Send,
    link: "https://t.me/fluxen_flex",
    label: "Telegram канал",
    accent: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Партнёрства",
    description:
      "Коммерческие предложения, сотрудничество и интеграции.",
    icon: Users,
    link: "https://t.me/fluxen_flex",
    label: "Связаться",
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
]

export default function ContactPage() {
  return (
    <section className="relative min-h-screen px-6 py-32 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black to-neutral-900" />

      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
            contact
          </p>
          <h1 className="text-5xl md:text-7xl font-bold font-mono leading-tight">
            Связь с командой
            <span className="block text-primary mt-3">Flex</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/60">
            Официальные каналы связи Flex. Поддержка, обновления и
            взаимодействие с командой.
          </p>
        </motion.div>

        {/* ================= CONTACT CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-10 mb-32">
          {CONTACTS.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-black/40 p-8 overflow-hidden"
            >
              {/* glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br ${item.accent}`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <item.icon className="w-7 h-7 text-primary" />
                  <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-primary transition" />
                </div>

                <h2 className="text-2xl font-mono font-bold mb-4">
                  {item.title}
                </h2>

                <p className="text-white/60 leading-relaxed mb-8">
                  {item.description}
                </p>

                <span className="inline-flex items-center gap-2 font-mono text-primary">
                  {item.label}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ================= SYSTEM STATUS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-black/40 p-10"
        >
          <div className="flex items-center gap-3 mb-10">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">
              system status
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-10 text-center">
            <div>
              <p className="text-sm text-white/40 mb-2">Поддержка</p>
              <p className="font-mono text-3xl text-primary">24 / 7</p>
            </div>
            <div>
              <p className="text-sm text-white/40 mb-2">Средний ответ</p>
              <p className="font-mono text-3xl text-primary">~15 мин</p>
            </div>
            <div>
              <p className="text-sm text-white/40 mb-2">Языки</p>
              <p className="font-mono text-3xl text-primary">RU · EN</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
