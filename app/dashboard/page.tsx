"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User, Mail, Wallet, Fingerprint,
  Download, LogOut, Crown, Clock,
  CheckCircle2, XCircle, ArrowUpRight, Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/me")
        const data = await res.json()
        if (!data.user) { router.push("/"); return }
        setUser(data.user)
      } catch {
        router.push("/")
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("rumi_user")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="font-mono text-xs tracking-widest text-white/30 uppercase">Загрузка</p>
        </motion.div>
      </div>
    )
  }

  if (!user) return null

  const INFO = [
    { icon: User,        label: "Никнейм",   value: user.username,  accent: false },
    { icon: Mail,        label: "Почта",     value: user.email,     accent: false },
    { icon: Fingerprint, label: "Member ID", value: `#${user.id}`,  accent: false },
    {
      icon: Wallet,
      label: "Баланс",
      accent: true,
      value: `₽ ${(user.balance || 0).toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden py-24 px-6 bg-black">

      {/* ATMOSPHERE */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-500/20 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto">

        {/* NAVBAR */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-24"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase">
              Flex Project
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/files/launcher.zip"
              download
              className={[
                "inline-flex items-center gap-2 rounded-full px-5 py-2",
                "border border-white/10 bg-white/5",
                "font-mono text-xs text-white/70",
                "hover:bg-white/10 hover:border-white/20 hover:text-white",
                "transition-all duration-200",
              ].join(" ")}
            >
              <Download className="w-3.5 h-3.5" />
              Лаунчер
            </a>

            <button
              onClick={handleLogout}
              className={[
                "inline-flex items-center justify-center w-9 h-9 rounded-full",
                "border border-white/10 bg-white/5 text-white/40",
                "hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400",
                "transition-all duration-200",
              ].join(" ")}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <p className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">
            Личный кабинет
          </p>

          <h1 className="text-4xl md:text-6xl font-bold font-mono leading-tight">
            Добро пожаловать,
            <span className="block mt-3 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              {user.username}
            </span>
          </h1>

          <p className="mt-6 text-white/50 text-lg leading-relaxed">
            Управляй аккаунтом.{" "}
            <span className="text-white">Запускай без ограничений.</span>
          </p>
        </motion.div>

        {/* INFO CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {INFO.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 transition-all"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/20 via-violet-400/10 to-transparent" />

                <div className="relative z-10">
                  <div className="mb-5 w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                    <Icon className={item.accent ? "w-5 h-5 text-primary" : "w-5 h-5 text-white/50"} />
                  </div>
                  <p className="font-mono text-xs tracking-widest text-white/30 uppercase mb-1">
                    {item.label}
                  </p>
                  <p className={item.accent ? "font-mono font-bold text-base break-all text-primary" : "font-mono font-bold text-base break-all text-white"}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* DONATES */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">Донаты</p>
            {user?.donates?.length > 0 && (
              <span className="ml-auto font-mono text-xs text-white/20">
                {user.donates.filter((d: any) => new Date(d.expiresAt) >= new Date()).length} активных
              </span>
            )}
          </div>

          {user?.donates?.length > 0 ? (
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {user.donates.map((donate: any, i: number) => {
                  const expires = new Date(donate.expiresAt)
                  const activated = new Date(donate.activatedAt)
                  const isExpired = expires < new Date()

                  return (
                    <motion.div
                      key={donate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className={[
                        "group relative rounded-3xl border backdrop-blur-xl p-7",
                        "flex items-center justify-between gap-6 transition-all duration-300",
                        isExpired
                          ? "border-white/5 bg-white/5 opacity-50"
                          : "border-white/10 bg-white/5 hover:border-white/20",
                      ].join(" ")}
                    >
                      {!isExpired && (
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/10 via-violet-400/5 to-transparent" />
                      )}

                      <div className="relative z-10">
                        <h3 className="font-mono font-bold text-lg text-white mb-2">
                          {donate.name}
                        </h3>
                        <div className="flex items-center gap-5 font-mono text-xs text-white/30">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3" />
                            {activated.toLocaleDateString("ru-RU")}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {expires.toLocaleDateString("ru-RU")}
                          </span>
                        </div>
                      </div>

                      <div className="relative z-10 shrink-0">
                        {isExpired ? (
                          <span className="flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase bg-red-500/10 text-red-400/50 border border-red-500/10">
                            <XCircle className="w-3 h-3" />
                            Истёк
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            Активен
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/5 bg-white/5 p-14 flex flex-col items-center gap-4 text-center">
              <Crown className="w-10 h-10 text-white/10" />
              <p className="font-mono text-sm text-white/25">У вас пока нет активных донатов</p>
            </div>
          )}
        </motion.div>

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
              <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
                Навигация
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-mono mb-3">
              Вернуться на главную
            </h3>
            <p className="text-white/50">
              Управляй. Запускай. Играй без ограничений.
            </p>
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