"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  ShieldAlert,
  Sword,
  MessageCircleWarning,
  Ban,
  Gavel,
  ChevronDown,
} from "lucide-react"

/* =========================
   Типы наказаний
   ========================= */
const PUNISHMENTS = {
  warn: "Предупреждение",
  mute: "Мут",
  ban: "Бан",
  perm: "Перманентный бан",
}

/* =========================
   Правила
   ========================= */
const RULES = [
  {
    index: 1,
    title: "Общие положения",
    icon: ShieldAlert,
    items: [
      {
        text: "Запрещены любые формы оскорблений, дискриминации и провокаций.",
        critical: true,
        punishments: ["warn", "mute", "ban"],
        details:
          "Под оскорблениями понимаются любые уничижительные высказывания в адрес игроков, администрации или проекта в целом, включая завуалированные формы.",
      },
      {
        text: "Токсичное поведение может повлечь временные или постоянные санкции.",
        punishments: ["warn", "mute", "ban"],
        details:
          "Систематическое нарушение правил, агрессия и провокации усиливают наказание вплоть до блокировки аккаунта.",
      },
      {
        text: "Игрок обязан уважать других участников и правила сервера.",
        punishments: ["warn"],
        details:
          "Незнание правил не освобождает от ответственности. Играя на сервере, вы автоматически соглашаетесь с ними.",
      },
    ],
  },
  {
    index: 2,
    title: "Игровой процесс",
    icon: Sword,
    items: [
      {
        text: "Использование читов, макросов, дюпов и багов строго запрещено.",
        critical: true,
        punishments: ["ban", "perm"],
        details:
          "Любые сторонние инструменты, дающие преимущество, считаются нарушением — независимо от намерений игрока.",
      },
      {
        text: "Сторонние клиенты и модификации, влияющие на баланс, запрещены.",
        punishments: ["ban"],
        details:
          "Разрешены только официально одобренные модификации. Список может быть изменён администрацией.",
      },
      {
        text: "Обнаруженные баги необходимо сообщать администрации.",
        punishments: ["warn"],
        details:
          "Использование бага в личных целях приравнивается к эксплойту и наказывается.",
      },
    ],
  },
  {
    index: 3,
    title: "Чат и коммуникация",
    icon: MessageCircleWarning,
    items: [
      {
        text: "Флуд, спам, капс и реклама запрещены.",
        punishments: ["mute"],
        details:
          "Реклама сторонних ресурсов, серверов или услуг запрещена без согласования с администрацией.",
      },
      {
        text: "Запрещён оскорбительный, шокирующий и нелегальный контент.",
        critical: true,
        punishments: ["mute", "ban"],
        details:
          "Игрок несёт полную ответственность за публикуемый контент, включая ссылки и изображения.",
      },
      {
        text: "Политические и провокационные темы не приветствуются.",
        punishments: ["mute"],
        details:
          "Администрация вправе ограничить обсуждение любых тем, нарушающих комфорт сообщества.",
      },
    ],
  },
  {
    index: 4,
    title: "Аккаунты и безопасность",
    icon: Ban,
    items: [
      {
        text: "Передача, продажа и покупка аккаунтов запрещены.",
        critical: true,
        punishments: ["ban", "perm"],
        details:
          "Все действия, совершённые с аккаунта, считаются ответственностью его владельца.",
      },
      {
        text: "Запрещены мультиаккаунты для обхода наказаний.",
        punishments: ["perm"],
        details:
          "При выявлении связи аккаунтов блокируются все связанные профили.",
      },
      {
        text: "Игрок обязан самостоятельно обеспечивать безопасность аккаунта.",
        punishments: ["warn"],
        details:
          "Рекомендуется использовать сложные пароли и двухфакторную аутентификацию.",
      },
    ],
  },
  {
    index: 5,
    title: "Администрация и наказания",
    icon: Gavel,
    items: [
      {
        text: "Администрация вправе применять наказания по ситуации.",
        punishments: ["warn", "mute", "ban", "perm"],
        details:
          "Решения принимаются на основании логов, доказательств и здравого смысла.",
      },
      {
        text: "Решения администрации обязательны к исполнению.",
        punishments: ["ban"],
        details:
          "Попытки оспаривания в агрессивной форме могут привести к ужесточению наказания.",
      },
      {
        text: "Правила могут быть изменены без предварительного уведомления.",
        punishments: ["—"],
        details:
          "Актуальная версия правил всегда доступна на сайте проекта.",
      },
    ],
  },
]

/* =========================
   Страница
   ========================= */
export default function RulesPage() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="min-h-screen px-6 py-32 bg-gradient-to-b from-black to-neutral-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-4">
            ПРАВИЛА
          </p>
          <h1 className="text-5xl md:text-7xl font-bold font-mono">
            Правила сервера
            <span className="block text-primary mt-2">Flex</span>
          </h1>
          <p className="mt-8 text-lg text-white/60 max-w-2xl">
            Настоящие правила обязательны для всех игроков. Их соблюдение —
            основа комфортной и честной игры.
          </p>
        </motion.div>

        {/* Rules */}
        <div className="space-y-16">
          {RULES.map((section) => (
            <motion.div
              key={section.index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-t border-white/10 pt-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <section.icon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-mono font-bold">
                  {section.index}. {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.items.map((item, i) => {
                  const id = `${section.index}.${i + 1}`
                  const isOpen = open === id

                  return (
                    <div
                      key={id}
                      className={`rounded-xl border px-5 py-4 ${
                        item.critical
                          ? "border-red-500/30 bg-red-500/5"
                          : "border-white/10 bg-black/30"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpen(isOpen ? null : id)
                        }
                        className="w-full flex items-start gap-4 text-left"
                      >
                        <span className="font-mono text-sm text-primary mt-1">
                          {id}
                        </span>

                        <div className="flex-1">
                          <p className="text-white/80 leading-relaxed">
                            {item.text}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.punishments.map((p) => (
                              <span
                                key={p}
                                className="text-xs rounded-full bg-white/10 px-3 py-1"
                              >
                                {PUNISHMENTS[p as keyof typeof PUNISHMENTS] ??
                                  p}
                              </span>
                            ))}
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-5 h-5 text-white/40 transition ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pl-9 text-sm text-white/50"
                          >
                            {item.details}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
