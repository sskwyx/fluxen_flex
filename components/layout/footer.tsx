"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Sparkles, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const steps = [
    {
      tag: "Старт",
      title: "Зарегистрируйся",
      desc: "Создай аккаунт за 30 секунд и получи доступ к серверу.",
      step: "01",
    },
    {
      tag: "Донат",
      title: "Выбери привилегию",
      desc: "Усиль своего персонажа уникальными возможностями.",
      step: "02",
    },
    {
      tag: "Игра",
      title: "Заходи и играй",
      desc: "Подключайся к серверу и наслаждайся игрой без ограничений.",
      step: "03",
    },
  ]

  return (
    <footer
      className="relative mt-32 overflow-hidden"
      style={{ fontFamily: "var(--font-unbounded), system-ui, sans-serif" }}
    >

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-500/20 blur-[180px] rounded-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-10">

        {/* BIG CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-widest text-primary uppercase">присоединяйся</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-8"
          >
            Готов начать
            <span className="block mt-2 bg-gradient-to-r from-white via-white to-white/30 bg-clip-text text-transparent">
              играть?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-lg mb-12 max-w-md mx-auto leading-relaxed"
          >
            Вечный мир. Честная игра.{" "}
            <span className="text-white/70">Будущее Minecraft.</span>
          </motion.p>

          {/* GLASS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
            {steps.map((card, i) => (
              <motion.div
                key={card.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 overflow-hidden"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/15 via-violet-400/8 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-widest text-primary uppercase px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {card.tag}
                    </span>
                    <span className="text-4xl font-black text-white/5">{card.step}</span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{card.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 font-bold text-sm hover:scale-105 transition-all duration-200 shadow-2xl shadow-white/10"
            >Получить донат<ArrowUpRight className="w-4 h-4" /></Link>

            <a
              href="https://t.me/fluxen_tg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 px-8 py-4 text-sm text-white/60 hover:text-white transition-all duration-200"
            >Написать в Telegram</a>
          </motion.div>
        </motion.div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">flex</span>
            </Link>
            <span className="text-xs text-white/20">© {currentYear} flex project</span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { href: "/faq",     label: "FAQ" },
              { href: "/rules",   label: "Правила" },
              { href: "/contact", label: "Контакты" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-white/25 hover:text-white/60 transition-colors duration-200"
              >{item.label}</Link>
            ))}
          </div>

          <a
            href="https://fluxen.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/20 hover:text-white/50 transition-colors group"
          >
            <span>by</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-primary transition-colors">fluxen</span>
          </a>
        </motion.div>

      </div>
    </footer>
  )
}