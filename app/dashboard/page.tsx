"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  User,
  Mail,
  Wallet,
  Fingerprint,
  Download,
  LogOut,
} from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("rumi_user")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) return null

  return (
    <section className="relative min-h-screen overflow-hidden py-32 px-4 bg-gradient-to-b from-background via-background to-black/40">

      {/* ================= AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-20 w-[500px] h-[500px] bg-primary/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-blue-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute inset-0 rounded-[40px] border border-white/5 pointer-events-none" />

        {/* ================= TOP MENU ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
          relative flex flex-col md:flex-row md:items-center md:justify-between
          gap-6 mb-20 p-6 rounded-3xl
          border border-white/10
          bg-gradient-to-r from-white/10 via-white/5 to-white/10
          backdrop-blur-xl
          overflow-hidden
          transition-all duration-500
          hover:border-primary/30
          hover:shadow-2xl hover:shadow-primary/10
        "
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
              Flex Project
            </p>

            <h3 className="text-xl md:text-2xl font-bold">
              Управляй. Запускай.
              <span className="block text-primary">
                Играй без ограничений.
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition"
            >
              <a href="/files/launcher.zip" download>
                <Download className="mr-2 h-5 w-5" />
                Скачать лаунчер
              </a>
            </Button>

            <Button
              variant="ghost"
              className="rounded-xl border border-white/10 hover:border-primary/40"
              onClick={() => {
                localStorage.removeItem("rumi_user")
                router.push("/")
              }}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* ================= PROFILE HERO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[260px] mb-20 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
          <img
            src="/bg.jpg"
            alt="Flex Atmosphere"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />

          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[140px]" />

          <div className="relative z-10 h-full flex flex-col justify-end p-8">
            <p className="text-xs uppercase tracking-widest text-primary font-mono mb-2">
              profile
            </p>

            <h3 className="text-2xl md:text-3xl font-bold">
              Добро пожаловать,
              <span className="text-primary ml-2">
                {user.username}
              </span>
            </h3>
          </div>
        </motion.div>

        {/* ================= USER INFO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 mb-20"
        >
          {[
            {
              icon: User,
              label: "Никнейм",
              value: user.username,
            },
            {
              icon: Mail,
              label: "Почта",
              value: user.email,
            },
            {
              icon: Fingerprint,
              label: "Member ID",
              value: user.id,
            },
            {
              icon: Wallet,
              label: "Баланс",
              value: `₽ ${(user.balance || 0).toLocaleString(
                "ru-RU",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}`,
            },
          ].map((item, i) => {
            const Icon = item.icon

            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="
                group flex items-center gap-4 p-6 rounded-2xl
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                transition-all duration-300
                hover:border-primary/40
                hover:bg-white/10
                hover:shadow-xl hover:shadow-primary/10
              "
              >
                <Icon className="text-primary transition group-hover:scale-110" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="font-mono text-lg break-all">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ================= DONATES ================= */}
        <div className="mt-10 mb-20">
          <h2 className="font-mono text-2xl font-bold mb-6">
            Активные донаты
          </h2>

          {user?.donates?.length > 0 ? (
            <div className="grid gap-4">
              {user.donates.map((donate: any) => {
                const expires = new Date(donate.expiresAt)
                const isExpired = expires < new Date()

                return (
                  <div
                    key={donate.id}
                    className="
                    rounded-2xl border border-white/10
                    bg-gradient-to-r from-white/5 to-white/10
                    backdrop-blur-xl
                    p-5 flex justify-between items-center
                    transition-all duration-300
                    hover:border-primary/30
                    hover:shadow-lg hover:shadow-primary/10
                  "
                  >
                    <div>
                      <h3 className="font-mono text-lg font-bold">
                        {donate.name}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Активирован:{" "}
                        {new Date(
                          donate.activatedAt
                        ).toLocaleDateString("ru-RU")}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Истекает:{" "}
                        {expires.toLocaleDateString("ru-RU")}
                      </p>
                    </div>

                    {isExpired ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                        Истёк
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                        Активен
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-muted-foreground">
              У вас пока нет активных донатов
            </div>
          )}
        </div>

        {/* ================= BACK ================= */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="rounded-xl px-12 shadow-lg shadow-primary/20 hover:scale-105 transition"
          >
            <Link href="/">На главную</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}