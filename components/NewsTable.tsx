"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import NewsEditor from "./NewsEditor"

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

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="p-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white/70 font-mono text-lg">Заголовок</TableHead>
            <TableHead className="text-white/70 font-mono text-lg">Дата</TableHead>
            <TableHead className="text-white/70 font-mono text-lg">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((n, i) => (
            <motion.tr
              key={n.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-white/10 hover:bg-white/5 transition-all"
            >
              <TableCell className="font-mono text-xl">{n.title}</TableCell>
              <TableCell>{n.date}</TableCell>
              <TableCell className="flex gap-4">

                {/* EDIT */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Pencil />
                    </Button>
                  </DialogTrigger>
                  <NewsEditor mode="edit" item={n} reload={load} />
                </Dialog>

                {/* DELETE */}
                <Button variant="destructive" size="icon" onClick={() => remove(n.id)}>
                  <Trash />
                </Button>

              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
