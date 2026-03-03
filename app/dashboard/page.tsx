"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Mail, Wallet, Download, LogOut, Crown, Clock,
  CheckCircle2, XCircle, ArrowUpRight,
  Sparkles, Plus, Copy, Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function Avatar({ username }: { username: string }) {
  const letter = username?.[0]?.toUpperCase() ?? "?"
  const colors = [
    "from-violet-500 to-primary",
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-orange-500 to-yellow-400",
  ]
  const color = colors[username.charCodeAt(0) % colors.length]
  return (
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-black font-black text-2xl font-mono shadow-lg shrink-0`}>
      {letter}
    </div>
  )
}

function CopyID({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 font-mono text-xs text-white/20 hover:text-white/50 transition-all duration-200 group"
    >
      <span>#{id}</span>
      {copied
        ? <Check className="w-3 h-3 text-emerald-400" />
        : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
      }
    </button>
  )
}

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="font-mono text-xs tracking-widest text-white/30 uppercase">Загрузка</p>
        </motion.div>
      </div>
    )
  }

  if (!user) return null

  const balance = user.balance || 0

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
          className="flex items-center justify-between mb-20"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Flex Project</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/files/launcher.zip"
              download
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-white/10 bg-white/5 font-mono text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
            ><Download className="w-3.5 h-3.5" />Лаунчер</a>
            <button
              onClick={handleLogout}
              className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-200"
            ><LogOut className="w-3.5 h-3.5" /></button>
          </div>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 mb-5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-violet-500/5 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">

            {/* left: avatar + info */}
            <div className="flex items-center gap-5 flex-1 min-w-0">
              <Avatar username={user.username} />
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-widest text-primary/70 uppercase mb-1">профиль</p>
                <h1 className="text-xl md:text-2xl font-bold font-mono text-white truncate">{user.username}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-xs text-white/30 truncate">{user.email}</span>
                  <span className="text-white/10">·</span>
                  <CopyID id={user.id} />
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="hidden md:block w-px h-16 bg-white/10" />

            {/* right: balance + topup */}
            <div className="flex items-center justify-between md:justify-end gap-6 md:shrink-0">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-1">Баланс</p>
                <p className="font-mono font-bold text-2xl text-primary">
                  ₽ {balance.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:border-primary/40 px-4 py-2.5 font-mono text-xs text-primary transition-all duration-200 whitespace-nowrap"
              ><Plus className="w-3.5 h-3.5" />Пополнить</Link>
            </div>
          </div>
        </motion.div>

        {/* INFO ROW */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { icon: Mail,   label: "Почта",   value: user.email   },
            { icon: Wallet, label: "Баланс",  value: `₽ ${balance.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, accent: true },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition-all"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/12 via-violet-400/6 to-transparent" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:border-primary/20 transition duration-300">
                    <Icon className={`w-4 h-4 transition duration-300 ${item.accent ? "text-primary" : "text-white/40 group-hover:text-primary"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] tracking-widest text-white/25 uppercase">{item.label}</p>
                    <p className={`font-mono font-semibold text-sm truncate ${item.accent ? "text-primary" : "text-white"}`}>{item.value}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* DONATES */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <Crown className="w-4 h-4 text-primary" />
            <p className="font-mono text-xs tracking-widest text-primary uppercase">Донаты</p>
            {user?.donates?.length > 0 && (
              <span className="ml-auto font-mono text-xs text-white/20">
                {user.donates.filter((d: any) => new Date(d.expiresAt) >= new Date()).length} активных
              </span>
            )}
          </div>

          {user?.donates?.length > 0 ? (
            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {user.donates.map((donate: any, i: number) => {
                  const expires   = new Date(donate.expiresAt)
                  const activated = new Date(donate.activatedAt)
                  const isExpired = expires < new Date()

                  return (
                    <motion.div
                      key={donate.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.07 }}
                      className={[
                        "group relative rounded-2xl border backdrop-blur-xl px-6 py-5",
                        "flex items-center justify-between gap-6 overflow-hidden transition-all duration-300",
                        isExpired
                          ? "border-white/5 bg-white/5 opacity-40"
                          : "border-white/10 bg-white/5 hover:border-primary/20",
                      ].join(" ")}
                    >
                      <div className={[
                        "absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300",
                        isExpired ? "bg-white/8" : "bg-primary/30 group-hover:bg-primary/60",
                      ].join(" ")} />

                      {!isExpired && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/6 via-violet-400/3 to-transparent" />
                      )}

                      <div className="relative z-10 pl-2">
                        <h3 className="font-mono font-bold text-white mb-1.5">{donate.name}</h3>
                        <div className="flex items-center gap-4 font-mono text-xs text-white/25">
                          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{activated.toLocaleDateString("ru-RU")}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{expires.toLocaleDateString("ru-RU")}</span>
                        </div>
                      </div>

                      <div className="relative z-10 shrink-0">
                        {isExpired ? (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase bg-red-500/8 text-red-400/50 border border-red-500/10"
                          ><XCircle className="w-3 h-3" />Истёк</span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          ><CheckCircle2 className="w-3 h-3" />Активен</span>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-white/5 p-12 flex flex-col items-center gap-3 text-center">
              <Crown className="w-8 h-8 text-white/8" />
              <p className="font-mono text-xs text-white/20 uppercase tracking-widest">Нет активных донатов</p>
              <Link
                href="/products"
                className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 px-4 py-2 font-mono text-xs text-primary transition-all duration-200"
              ><Plus className="w-3 h-3" />Получить донат</Link>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute inset-0 rounded-[32px] bg-primary/8 blur-3xl opacity-40 pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs tracking-widest text-white/30 uppercase">Навигация</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-mono mb-3">Вернуться на главную</h3>
            <p className="text-white/40 text-sm">Управляй. Запускай. Играй без ограничений.</p>
          </div>
          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-3 rounded-full bg-white text-black px-8 py-4 font-semibold shadow-xl hover:scale-105 transition"
          >На главную<ArrowUpRight className="w-4 h-4" /></Link>
        </motion.div>

      </div>
    </section>
  )
}