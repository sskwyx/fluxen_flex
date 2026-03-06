"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Wifi, WifiOff, Users, Zap,
  Monitor, RefreshCw, Sparkles, Copy, Check,
} from "lucide-react"

type ServerData = {
  online: boolean
  players?: { online: number; max: number; list?: string[] }
  version?: { name: string }
  motd?: { clean: string[] }
  debug?: { ping: number }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-200"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      <span className="text-xs">{text}</span>
    </button>
  )
}

export function ServerStatusModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [data, setData] = useState<ServerData | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetch_ = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/server")
      setData(await res.json())
      setLastUpdated(new Date())
    } catch {
      setData({ online: false })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) fetch_()
  }, [open])

  // автообновление каждые 30 секунд
  useEffect(() => {
    if (!open) return
    const interval = setInterval(fetch_, 30_000)
    return () => clearInterval(interval)
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const isOnline = data?.online
  const players = data?.players
  const version = data?.version?.name
  const ping = data?.debug?.ping
  const motd = data?.motd?.clean?.[0]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto w-full max-w-lg"
              style={{ fontFamily: "var(--font-unbounded), system-ui, sans-serif" }}
            >
              <div className="relative rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/60">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -top-20 left-1/3 w-64 h-64 bg-primary/15 blur-[80px] rounded-full" />
                  <div className="absolute -top-20 right-1/4 w-64 h-64 bg-violet-500/15 blur-[80px] rounded-full" />
                </div>

                <div className="relative z-10 p-7">

                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">flex server</p>
                        <p className="text-[10px] text-white/30 tracking-widest uppercase">Мониторинг</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={fetch_}
                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-200"
                      ><RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /></button>
                      <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-200"
                      ><X className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>

                  {loading && !data ? (
                    <div className="flex flex-col items-center gap-4 py-12">
                      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      <p className="text-xs text-white/30 tracking-widest uppercase">Подключение...</p>
                    </div>
                  ) : (
                    <>
                      <div className={`relative rounded-2xl border p-6 mb-5 overflow-hidden ${isOnline ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                        <div className={`absolute inset-0 blur-3xl opacity-20 ${isOnline ? "bg-emerald-500" : "bg-red-500"}`} />
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${isOnline ? "bg-emerald-500/15 border-emerald-500/30" : "bg-red-500/15 border-red-500/30"}`}>
                              {isOnline
                                ? <Wifi className="w-6 h-6 text-emerald-400" />
                                : <WifiOff className="w-6 h-6 text-red-400" />
                              }
                            </div>
                            <div>
                              <p className={`text-2xl font-black ${isOnline ? "text-emerald-400" : "text-red-400"}`}>
                                {isOnline ? "ONLINE" : "OFFLINE"}
                              </p>
                              {motd && <p className="text-xs text-white/40 mt-0.5">{motd}</p>}
                            </div>
                          </div>
                          {isOnline && (
                            <div className="text-right">
                              <p className="text-3xl font-black text-white">{players?.online ?? 0}</p>
                              <p className="text-xs text-white/30">/ {players?.max ?? 0} игроков</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {isOnline && (
                        <div className="grid grid-cols-3 gap-3 mb-5">
                          {[
                            { icon: Users, label: "Онлайн",  value: `${players?.online ?? 0} / ${players?.max ?? 0}` },
                            { icon: Zap,   label: "Пинг",    value: ping ? `${ping}ms` : "—" },
                            { icon: Sparkles, label: "Версия", value: version ?? "—" },
                          ].map((s, i) => {
                            const Icon = s.icon
                            return (
                              <div key={i} className="rounded-2xl border border-white/8 bg-white/5 p-4 text-center">
                                <Icon className="w-4 h-4 text-primary mx-auto mb-2" />
                                <p className="text-sm font-bold text-white">{s.value}</p>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">{s.label}</p>
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {isOnline && players?.list && players.list.length > 0 && (
                        <div className="rounded-2xl border border-white/8 bg-white/5 p-4 mb-5">
                          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Игроки онлайн</p>
                          <div className="flex flex-wrap gap-2">
                            {players.list.map((name) => (
                              <span key={name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/8 border border-white/10 text-xs text-white/70">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Подключиться</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <CopyButton text="flex.fluxen.ru" />
                          <CopyButton text="25565" />
                        </div>
                      </div>

                      {lastUpdated && (
                        <p className="text-[10px] text-white/15 text-center mt-4 tracking-widest uppercase">
                          Обновлено в {lastUpdated.toLocaleTimeString("ru-RU")} · авто каждые 30с
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}