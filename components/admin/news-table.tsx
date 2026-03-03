"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import NewsEditor from "@/components/admin/news-editor"

export function NewsTable() {
  const [items, setItems] = useState<any[]>([])

  const load = async () => {
    const res = await fetch("/api/news")
    setItems(await res.json())
  }

  const remove = async (id: number) => {
    await fetch(`/api/news/${id}`, { method: "DELETE" })
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Заголовок</TableHead>
            <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Дата</TableHead>
            <TableHead className="font-mono text-xs tracking-widest text-white/30 uppercase">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((n, i) => (
            <motion.tr
              key={n.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="border-white/10 hover:bg-white/5 transition-all duration-200"
            >
              <TableCell className="font-mono font-bold text-white">{n.title}</TableCell>
              <TableCell className="font-mono text-sm text-white/40">{n.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 text-white/50 hover:text-primary transition-all duration-200">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </DialogTrigger>
                    <NewsEditor mode="edit" item={n} reload={load} />
                  </Dialog>

                  <button
                    onClick={() => remove(n.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 text-white/50 hover:text-red-400 transition-all duration-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}