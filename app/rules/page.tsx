"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldAlert, Sword, MessageCircleWarning,
  Ban, Gavel, ChevronDown, Sparkles, ArrowUpRight,
} from "lucide-react"
import Link from "next/link"

const PUNISHMENTS = {
  warn: "Предупреждение",
  mute: "Мут",
  ban: "Бан",
  perm: "Перманентный бан",
}

const RULES = [
  {
    index: 1,
    title: "Общие положения",
    icon: ShieldAlert,
    items: [
      { text: "Запрещены любые формы оскорблений, дискриминации и провокаций.", critical: true, punishments: ["warn", "mute", "ban"], details: "Под оскорблениями понимаются любые уничижительные высказывания в адрес игроков, администрации или проекта в целом, включая завуалированные формы." },
      { text: "Токсичное поведение может повлечь временные или постоянные санкции.", punishments: ["warn", "mute", "ban"], details: "Систематическое нарушение правил, агрессия и провокации усиливают наказание вплоть до блокировки аккаунта." },
      { text: "Игрок обязан уважать других участников и правила сервера.", punishments: ["warn"], details: "Незнание правил не освобождает от ответственности. Играя на сервере, вы автоматически соглашаетесь с ними." },
    ],
  },
  {
    index: 2,
    title: "Игровой процесс",
    icon: Sword,
    items: [
      { text: "Использование читов, макросов, дюпов и багов строго запрещено.", critical: true, punishments: ["ban", "perm"], details: "Любые сторонние инструменты, дающие преимущество, считаются нарушением — независимо от намерений игрока." },
      { text: "Сторонние клиенты и модификации, влияющие на баланс, запрещены.", punishments: ["ban"], details: "Разрешены только официально одобренные модификации. Список может быть изменён администрацией." },
      { text: "Обнаруженные баги необходимо сообщать администрации.", punishments: ["warn"], details: "Использование бага в личных целях приравнивается к эксплойту и наказывается." },
    ],
  },
  {
    index: 3,
    title: "Чат и коммуникация",
    icon: MessageCircleWarning,
    items: [
      { text: "Флуд, спам, капс и реклама запрещены.", punishments: ["mute"], details: "Реклама сторонних ресурсов, серверов или услуг запрещена без согласования с администрацией." },
      { text: "Запрещён оскорбительный, шокирующий и нелегальный контент.", critical: true, punishments: ["mute", "ban"], details: "Игрок несёт полную ответственность за публикуемый контент, включая ссылки и изображения." },
      { text: "Политические и провокационные темы не приветствуются.", punishments: ["mute"], details: "Администрация вправе ограничить обсуждение любых тем, нарушающих комфорт сообщества." },
    ],
  },
  {
    index: 4,
    title: "Аккаунты и безопасность",
    icon: Ban,
    items: [
      { text: "Передача, продажа и покупка аккаунтов запрещены.", critical: true, punishments: ["ban", "perm"], details: "Все действия, совершённые с аккаунта, считаются ответственностью его владельца." },
      { text: "Запрещены мультиаккаунты для обхода наказаний.", punishments: ["perm"], details: "При выявлении связи аккаунтов блокируются все связанные профили." },
      { text: "Игрок обязан самостоятельно обеспечивать безопасность аккаунта.", punishments: ["warn"], details: "Рекомендуется использовать сложные пароли и двухфакторную аутентификацию." },
    ],
  },
  {
    index: 5,
    title: "Администрация и наказания",
    icon: Gavel,
    items: [
      { text: "Администрация вправе применять наказания по ситуации.", punishments: ["warn", "mute", "ban", "perm"], details: "Решения принимаются на основании логов, доказательств и здравого смысла." },
      { text: "Решения администрации обязательны к исполнению.", punishments: ["ban"], details: "Попытки оспаривания в агрессивной форме могут привести к ужесточению наказания." },
      { text: "Правила могут быть изменены без предварительного уведомления.", punishments: ["—"], details: "Актуальная версия правил всегда доступна на сайте проекта." },
    ],
  },
]

export default function RulesPage() {
  const [open, setOpen] = useState<string | null>(null)

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
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Flex Project</span>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <p className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">правила</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Правила сервера
            <span className="block mt-3 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              Flex
            </span>
          </h1>
          <p className="mt-6 text-white/50 text-lg leading-relaxed">
            Обязательны для всех игроков.{" "}
            <span className="text-white">Соблюдение — основа честной игры.</span>
          </p>
        </motion.div>

        {/* RULES */}
        <div className="space-y-6 mb-24">
          {RULES.map((section, si) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: si * 0.07 }}
                className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/10 via-violet-400/5 to-transparent pointer-events-none" />

                {/* section header */}
                <div className="relative z-10 flex items-center gap-4 px-7 py-6 border-b border-white/10">
                  <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="font-mono font-bold text-lg text-white">
                    {section.index}. {section.title}
                  </h2>
                </div>

                {/* items */}
                <div className="relative z-10 p-4 space-y-2">
                  {section.items.map((item, i) => {
                    const id = `${section.index}.${i + 1}`
                    const isOpen = open === id

                    return (
                      <div
                        key={id}
                        className={[
                          "rounded-2xl border overflow-hidden transition-all duration-300",
                          item.critical
                            ? "border-red-500/20 bg-red-500/5"
                            : "border-white/8 bg-white/5",
                        ].join(" ")}
                      >
                        <button
                          onClick={() => setOpen(isOpen ? null : id)}
                          className="w-full px-5 py-4 flex items-start gap-4 text-left group"
                        >
                          <span className="font-mono text-xs text-primary mt-0.5 shrink-0">{id}</span>

                          <div className="flex-1">
                            <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition">
                              {item.text}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {item.punishments.map((p) => (
                                <span
                                  key={p}
                                  className={[
                                    "text-xs rounded-full px-3 py-1 font-mono",
                                    p === "perm" || p === "ban"
                                      ? "bg-red-500/10 text-red-400/70 border border-red-500/15"
                                      : "bg-white/5 text-white/40 border border-white/10",
                                  ].join(" ")}
                                >
                                  {PUNISHMENTS[p as keyof typeof PUNISHMENTS] ?? p}
                                </span>
                              ))}
                            </div>
                          </div>

                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="shrink-0 mt-0.5"
                          >
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
                              <div className="px-5 pb-4 pt-2 border-t border-white/10">
                                <motion.p
                                  initial={{ y: -6, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="text-xs text-white/40 pl-8 leading-relaxed font-mono"
                                >
                                  {item.details}
                                </motion.p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
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