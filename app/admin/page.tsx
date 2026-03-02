"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, DollarSign, Plus, Shield, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AdminSecurityLogs } from "@/components/admin-security-logs"
import NewsEditor from "@/components/NewsEditor"
import { NewsTable } from "@/components/NewsTable"

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [grantDialogOpen, setGrantDialogOpen] = useState(false)
  const [grantAmount, setGrantAmount] = useState("")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("rumi_user")
    if (!userData) {
      router.push("/")
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      router.push("/")
      return
    }
    setUser(parsedUser)
    loadUsers()
  }, [router])

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
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось выдать средства", variant: "destructive" })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-32 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ГЕРОЙСКИЙ ЗАГОЛОВОК */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="rounded-full hover:bg-white/10 transition-all hover:scale-110"
            >
              <ArrowLeft className="h-8 w-8" />
            </Button>

            <div>
              <h1 className="text-7xl md:text-9xl font-black font-mono tracking-tighter leading-none">
                ADMIN
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/50 text-xl mt-4 font-light"
              >
                Добро пожаловать, <span className="text-primary font-mono">{user?.username}</span>
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/50 backdrop-blur-xl"
          >
            <Shield className="h-10 w-10 text-primary" />
          </motion.div>
        </motion.div>

        {/* ОСНОВНОЙ БЛОК — СУПЕРКРУТО */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden"
        >
          {/* Шапка */}
          <div className="p-10 border-b border-white/10 bg-gradient-to-r from-primary/10 via-transparent to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-5xl font-black font-mono">Пользователи</h2>
                <p className="text-2xl text-white/60 mt-3">Всего: {users.length}</p>
              </div>

              <Dialog open={grantDialogOpen} onOpenChange={setGrantDialogOpen}>
                <DialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-6 rounded-full bg-primary text-black font-black text-xl shadow-2xl hover:shadow-primary/50 transition-all flex items-center gap-4"
                  >
                    <Plus className="h-7 w-7" />
                    Выдать средства
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="bg-black/95 border-white/10 backdrop-blur-3xl rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-black font-mono">Выдать средства</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-8 py-8">
                    <div className="space-y-3">
                      <Label className="text-xl">Пользователь</Label>
                      <select
                        value={selectedUserId || ""}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-lg focus:border-primary/50 transition"
                      >
                        <option value="">— Выберите —</option>
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.username} • {u.email}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xl">Сумма (₽)</Label>
                      <Input
                        type="number"
                        value={grantAmount}
                        onChange={(e) => setGrantAmount(e.target.value)}
                        placeholder="0"
                        className="text-3xl text-center py-8 bg-white/5 border-white/10 focus:border-primary/50"
                      />
                    </div>
                    <Button onClick={handleGrantBalance} size="lg" className="w-full py-8 text-2xl font-black rounded-2xl">
                      <DollarSign className="mr-3 h-8 w-8" />
                      Выдать средства
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* ТАБЛИЦА — ЧИСТО И КРАСИВО */}
          <div className="p-8">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/70 font-mono text-lg">Ник</TableHead>
                  <TableHead className="text-white/70 font-mono text-lg">Почта</TableHead>
                  <TableHead className="text-white/70 font-mono text-lg">Баланс</TableHead>
                  <TableHead className="text-white/70 font-mono text-lg">Регистрация</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-white/10 hover:bg-white/5 transition-all duration-300"
                  >
                    <TableCell className="font-black text-2xl font-mono">{u.username}</TableCell>
                    <TableCell className="text-white/60 text-lg">{u.email}</TableCell>
                    <TableCell className="text-primary font-black text-2xl font-mono">
                      ₽ {(u.balance || 0).toLocaleString("ru-RU")}
                    </TableCell>
                    <TableCell className="text-white/50">
                      {new Date(u.createdAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>


        {/* -------- НОВОСТИ -------- */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden mt-32"
      >
        <div className="p-10 border-b border-white/10 bg-gradient-to-r from-primary/10 via-transparent to-transparent flex items-center justify-between">
          <div>
            <h2 className="text-5xl font-black font-mono">Новости</h2>
            <p className="text-2xl text-white/60 mt-3">Управление новостями</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-6 rounded-full bg-primary text-black font-black text-xl shadow-2xl hover:shadow-primary/50 transition-all flex items-center gap-4"
              >
                <Plus className="h-7 w-7" />
                Новая новость
              </motion.button>
            </DialogTrigger>

            <NewsEditor mode="create" />
          </Dialog>
        </div>

        <NewsTable />
      </motion.div>

        {/* ЛОГИ — ОСТАЮТСЯ КАК ЕСТЬ */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-20"
        >
          <AdminSecurityLogs />



        </motion.div>
      </div>
    </div>
  )
}