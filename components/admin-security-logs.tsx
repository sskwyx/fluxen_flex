// components/admin-security-logs.tsx
"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Bot, User } from "lucide-react"

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
      .then(res => res.json())
      .then(data => setLogs(data.logs || []))
  }, [])

  const getTypeInfo = (log: SecurityLog) => {
    if (log.eventType === "captcha_success") {
      return { label: "Human", icon: User, color: "text-green-400" }
    }
    if (log.eventType === "captcha_fail") {
      return { label: "Bot (failed captcha)", icon: Bot, color: "text-red-400" }
    }
    if (log.eventType === "no_referrer") {
      return { label: "Bot (suspicious)", icon: Bot, color: "text-orange-400" }
    }
    return { label: "Unknown", icon: Shield, color: "text-muted-foreground" }
  }

  return (
    <div className="mt-12 bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold font-mono">Security Logs</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor bot attempts and human verifications
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono">IP Address</TableHead>
              <TableHead className="font-mono">Type</TableHead>
              <TableHead className="font-mono">Captcha Attempts</TableHead>
              <TableHead className="font-mono">First Seen</TableHead>
              <TableHead className="font-mono">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length > 0 ? (
              logs.map((log) => {
                const info = getTypeInfo(log)
                const Icon = info.icon
                return (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono font-semibold">{log.ip || "—"}</TableCell>
                    <TableCell className="font-mono">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${info.color}`} />
                        {info.label}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">
                      {log.captchaAttempts || (log.eventType === "captcha_success" ? 1 : "—")}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString("ru-RU")}
                    </TableCell>
                    <TableCell>
                      {log.eventType === "captcha_success" ? (
                        <span className="text-green-400 font-mono">✅ Verified</span>
                      ) : (
                        <span className="text-red-400 font-mono">❌ Blocked</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No security events yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}