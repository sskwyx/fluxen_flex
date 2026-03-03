"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Plus, Shield, Sparkles, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AdminSecurityLogs } from "@/components/admin/security-logs"
import NewsEditor from "@/components/admin/news-editor"
import { NewsTable } from "@/components/admin/news-table"

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [grantDialogOpen, setGrantDialogOpen] = useState(false)
  const [grantAmount, setGrantAmount] = useState("")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const loadUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      if (response.ok) setUsers(data.users)
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/me")
      const data = await res.json()
      if (!data.user || data.user.role !== "admin") {
        router.push("/")
        return
      }
      setUser(data.user)
      await loadUsers()
    }
    loadUser()
  }, [router])

  const handleGrantBalance = async () => {
    if (!selectedUserId || !grantAmount || Number.parseFloat(grantAmount) <= 0) {
      toast({ title: "Ошибка", description: "Выберите пользователя и сумму", variant: "destructive" })
      return
    }
    try {
      const response = await fetch("/api/balance/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUserId, amount: grantAmount, operation: "add" }),
      })
      if (response.ok) {
        const selectedUser = users.find((u) => u.id === selectedUserId)
        toast({ title: "Успешно", description: `Выдано ₽${Number(grantAmount).toLocaleString()} → ${selectedUser?.username}` })
        setGrantDialogOpen(false)
        setGrantAmount("")
        setSelectedUserId(null)
        loadUsers()
      }
    } catch {
      toast({ title: "Ошибка", description: "Не удалось выдать средства", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="font-mono text-xs tracking-widest text-white/30 uppercase">Загрузка</p>
        </motion.div>
      </div>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden py-24 px-6">

      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-500/20 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* NAVBAR */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-24"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Flex Project</span>
          </div>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 font-mono text-xs text-white/50 hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            На главную
          </button>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <p className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">admin panel</p>
          <h1 className="text-5xl md:text-7xl font-bold font-mono leading-none">
            ADMIN
          </h1>
          <p className="mt-4 text-white/40 font-mono text-sm">
            Добро пожаловать,{" "}
            <span className="text-primary">{user?.username}</span>
          </p>
        </motion.div>

        {/* USERS BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

          {/* header */}
          <div className="relative z-10 flex items-center justify-between p-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-mono font-bold text-2xl">Пользователи</h2>
              </div>
              <p className="font-mono text-xs text-white/30 tracking-widest uppercase ml-11">
                Всего: {users.length}
              </p>
            </div>

            <Dialog open={grantDialogOpen} onOpenChange={setGrantDialogOpen}>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-black px-6 py-3 font-mono font-bold text-sm shadow-lg shadow-primary/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Выдать средства
                </motion.button>
              </DialogTrigger>
              <DialogContent className="bg-black/95 border-white/10 backdrop-blur-3xl rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="font-mono font-bold text-xl">Выдать средства</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-6">
                  <div className="space-y-2">
                    <Label className="font-mono text-xs tracking-widest text-white/40 uppercase">Пользователь</Label>
                    <select
                      value={selectedUserId || ""}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:border-primary/50 transition"
                    >
                      <option value="">— Выберите —</option>
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.username} • {u.email}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs tracking-widest text-white/40 uppercase">Сумма (₽)</Label>
                    <Input
                      type="number"
                      value={grantAmount}
                      onChange={(e) => setGrantAmount(e.target.value)}
                      placeholder="0"
                      className="text-2xl text-center py-6 bg-white/5 border-white/10 focus:border-primary/50 font-mono rounded-2xl"
                    />
                  </div>
                  <button
                    onClick={handleGrantBalance}
                    className="w-full py-4 rounded-2xl bg-primary text-black font-mono font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
                  >
                    <DollarSign className="w-4 h-4" />
                    Выдать средства
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* table */}
          <div className="relative z-10 p-6">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Ник</TableHead>
                  <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Почта</TableHead>
                  <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Баланс</TableHead>
                  <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Регистрация</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-white/10 hover:bg-white/5 transition-all duration-200"
                  >
                    <TableCell className="font-mono font-bold text-white">{u.username}</TableCell>
                    <TableCell className="font-mono text-sm text-white/50">{u.email}</TableCell>
                    <TableCell className="font-mono font-bold text-primary">
                      ₽ {(u.balance || 0).toLocaleString("ru-RU")}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-white/30">
                      {new Date(u.createdAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* NEWS BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between p-8 border-b border-white/10">
            <div>
              <h2 className="font-mono font-bold text-2xl mb-1">Новости</h2>
              <p className="font-mono text-xs text-white/30 tracking-widest uppercase">Управление публикациями</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-black px-6 py-3 font-mono font-bold text-sm shadow-lg shadow-primary/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Новая новость
                </motion.button>
              </DialogTrigger>
              <NewsEditor mode="create" />
            </Dialog>
          </div>

          <div className="relative z-10">
            <NewsTable />
          </div>
        </motion.div>

        {/* SECURITY LOGS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AdminSecurityLogs />
        </motion.div>

      </div>
    </section>
  )
}