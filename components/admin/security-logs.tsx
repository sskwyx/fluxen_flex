"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Bot, User, Lock } from "lucide-react"

type SecurityLog = {
  id: string
  ip: string
  userAgent: string
  eventType: string
  captchaAttempts: number
  timestamp: string
}

export function AdminSecurityLogs() {
  const [logs, setLogs] = useState<SecurityLog[]>([])

  useEffect(() => {
    fetch("/api/security/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs || []))
  }, [])

  const getTypeInfo = (log: SecurityLog) => {
    if (log.eventType === "captcha_success") return { label: "Human",          icon: User,   color: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" }
    if (log.eventType === "captcha_fail")    return { label: "Bot (captcha)",  icon: Bot,    color: "text-red-400",     badge: "bg-red-500/10 text-red-400 border-red-500/20" }
    if (log.eventType === "no_referrer")     return { label: "Bot (suspicious)",icon: Bot,   color: "text-orange-400",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" }
    return                                          { label: "Unknown",         icon: Shield, color: "text-white/30",   badge: "bg-white/5 text-white/30 border-white/10" }
  }

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3 p-8 border-b border-white/10">
        <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
          <Lock className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="font-mono font-bold text-2xl">Security Logs</h2>
          <p className="font-mono text-xs text-white/30 tracking-widest uppercase">
            Мониторинг активности
          </p>
        </div>
      </div>

      <div className="relative z-10 p-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">IP</TableHead>
              <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Тип</TableHead>
              <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Попытки</TableHead>
              <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Время</TableHead>
              <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length > 0 ? (
              logs.map((log, i) => {
                const info = getTypeInfo(log)
                const Icon = info.icon
                return (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-white/10 hover:bg-white/5 transition-all duration-200"
                  >
                    <TableCell className="font-mono text-sm text-white">{log.ip || "—"}</TableCell>
                    <TableCell>
                      <span className={["inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border", info.badge].join(" ")}>
                        <Icon className="w-3 h-3" />
                        {info.label}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-white/50">
                      {log.captchaAttempts || (log.eventType === "captcha_success" ? 1 : "—")}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-white/30">
                      {new Date(log.timestamp).toLocaleString("ru-RU")}
                    </TableCell>
                    <TableCell>
                      {log.eventType === "captcha_success" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                          ✕ Blocked
                        </span>
                      )}
                    </TableCell>
                  </motion.tr>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 font-mono text-xs text-white/20 uppercase tracking-widest">
                  Нет событий
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}