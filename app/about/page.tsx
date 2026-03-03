"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, Wallet, Zap, Code2 } from "lucide-react"

const FEATURES = [
  {
    icon: Wallet,
    title: "Своя экономика",
    desc: "Донат, привилегии и управление полностью находятся под контролем администрации.",
  },
  {
    icon: Zap,
    title: "Без ограничений",
    desc: "Нет навязанных правил или комиссий. Проект развивается так, как решит команда.",
  },
  {
    icon: Code2,
    title: "Открытый код",
    desc: "Архитектура прозрачна. Любой разработчик может доработать систему под себя.",
  },
]

export default function AboutPage() {
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
          <p className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">
            about
          </p>

          <h1 className="text-4xl md:text-6xl font-bold font-mono leading-tight">
            Новый взгляд на
            <span className="block mt-3 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Minecraft-проекты
            </span>
          </h1>

          <p className="mt-6 text-white/50 text-lg leading-relaxed">
            Чистый старт. Своя система доната.{" "}
            <span className="text-white">Полный контроль над сервером и его развитием.</span>
          </p>
        </motion.div>

        {/* HERO BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mb-24 rounded-3xl overflow-hidden border border-white/10"
          style={{ height: 340 }}
        >
          <Image
            src="/bg.jpg"
            alt="flex minecraft server"
            fill
            className="object-cover brightness-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        </motion.div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 transition-all"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/20 via-violet-400/10 to-transparent" />

                <div className="relative z-10">
                  <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  <h3 className="font-mono font-bold text-lg text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/40 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}