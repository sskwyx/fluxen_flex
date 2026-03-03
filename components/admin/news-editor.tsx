"use client"

import { useState } from "react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function NewsEditor({ mode, item, reload }: any) {
  const { toast } = useToast()
  const [title, setTitle] = useState(item?.title || "")
  const [content, setContent] = useState(item?.content || "")
  const [icon, setIcon] = useState(item?.icon || "")
  const [image, setImage] = useState(item?.image || "")

  const submit = async () => {
    const url = mode === "edit" ? `/api/news/${item.id}` : "/api/news"
    const method = mode === "edit" ? "PATCH" : "POST"
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, icon, image }),
    })
    toast({ title: mode === "edit" ? "Новость обновлена" : "Новость создана" })
    reload?.()
  }

  const fieldClass = "w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:border-primary/50 focus:outline-none transition placeholder:text-white/20"
  const labelClass = "block font-mono text-xs tracking-widest text-white/30 uppercase mb-2"

  return (
    <DialogContent className="bg-black/95 border-white/10 backdrop-blur-3xl rounded-3xl">
      <DialogHeader>
        <DialogTitle className="font-mono font-bold text-xl">
          {mode === "edit" ? "Редактировать новость" : "Новая новость"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-5 py-4">
        <div>
          <label className={labelClass}>Иконка</label>
          <input className={fieldClass} value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="🔥" />
        </div>
        <div>
          <label className={labelClass}>Заголовок</label>
          <input className={fieldClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок новости" />
        </div>
        <div>
          <label className={labelClass}>URL картинки</label>
          <input className={fieldClass} value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass}>Текст</label>
          <textarea
            className={[fieldClass, "h-36 resize-none"].join(" ")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Текст новости..."
          />
        </div>
        <button
          onClick={submit}
          className="w-full py-3.5 rounded-2xl bg-primary text-black font-mono font-bold text-sm hover:opacity-90 transition"
        >
          {mode === "edit" ? "Сохранить изменения" : "Создать новость"}
        </button>
      </div>
    </DialogContent>
  )
}