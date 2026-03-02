"use client"

import { motion } from "framer-motion"
import {
  Gauge,
  Wrench,
  Headphones,
  GitBranch,
  Zap,
  Sparkles,
  ArrowUpRight,
} from "lucide-react"

const PRO_FEATURES = [
  {
    icon: Gauge,
    title: "Аналитика",
    desc: "Глубокие метрики и полный контроль проекта.",
  },
  {
    icon: Wrench,
    title: "Pro-модули",
    desc: "Эксклюзивные расширения поверх OSS.",
  },
  {
    icon: GitBranch,
    title: "Ранний доступ",
    desc: "Получайте функции раньше остальных.",
  },
  {
    icon: Headphones,
    title: "Поддержка",
    desc: "Прямой контакт с разработчиком.",
  },
  {
    icon: Zap,
    title: "Ускорение",
    desc: "Быстрое развитие без ограничений.",
  },
]

export function ProVersion() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 bg-black" />

      {/* glow atmosphere */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 blur-[180px]" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/20 blur-[180px]" />

      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <p className="font-mono text-xs tracking-[0.4em] text-primary mb-6">
            FLEX PRO
          </p>

          <h2 className="text-4xl md:text-6xl font-bold font-mono leading-tight">
            Open Source —
            <span className="block mt-3 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              без ограничений.
            </span>
          </h2>

          <p className="mt-6 text-white/60 text-lg leading-relaxed">
            Код остаётся открытым.
            <span className="text-white">
              {" "}Pro открывает скорость, стабильность
              и влияние на развитие проекта.
            </span>
          </p>
        </motion.div>

        {/* ================= FEATURES ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
          {PRO_FEATURES.map((f, i) => {
            const Icon = f.icon

            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="
                  group
                  relative
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-7
                  transition-all
                "
              >
                {/* hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/20 via-violet-400/20 to-transparent" />

                <div className="relative z-10">
                  <div className="mb-5 w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  <h3 className="font-mono text-base font-bold mb-2">
                    {f.title}
                  </h3>

                  <p className="text-sm text-white/55 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ================= CTA CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            relative
            rounded-[32px]
            border border-white/10
            bg-gradient-to-br
            from-white/[0.06]
            to-white/[0.02]
            backdrop-blur-2xl
            p-10
            md:p-14
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-8
          "
        >
          {/* glow */}
          <div className="absolute inset-0 rounded-[32px] bg-primary/10 blur-3xl opacity-30" />

          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
                Pro доступ
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold font-mono mb-3">
              Получить Flex Pro
            </h3>

            <p className="text-white/60">
              Покупка происходит через Telegram.
              Получите доступ моментально после оплаты.
            </p>
          </div>

          {/* TELEGRAM BUTTON */}
          <a
            href="https://t.me/fluxen_tg"
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative z-10
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              text-black
              px-8
              py-4
              font-semibold
              shadow-xl
              hover:scale-105
              transition
            "
          >
            Купить через Telegram
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}