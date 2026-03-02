"use client"

import { useState } from "react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function NewsEditor({ mode, item, reload }: any) {
  const { toast } = useToast()

  const [title, setTitle] = useState(item?.title || "")
  const [content, setContent] = useState(item?.content || "")
  const [icon, setIcon] = useState(item?.icon || "")
  const [image, setImage] = useState(item?.image || "")

  const submit = async () => {
    const body = { title, content, icon, image }

    const url = mode === "edit" ? `/api/news/${item.id}` : "/api/news"
    const method = mode === "edit" ? "PATCH" : "POST"

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    toast({
      title: mode === "edit" ? "Новость обновлена" : "Новость создана",
    })

    reload?.()
  }

  return (
    <DialogContent className="bg-black border-white/10 text-white rounded-3xl">
      <DialogHeader>
        <DialogTitle className="text-3xl font-black font-mono">
          {mode === "edit" ? "Редактировать новость" : "Новая новость"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-5 py-8">
        <div>
          <Label>Иконка</Label>
          <Input value={icon} onChange={(e) => setIcon(e.target.value)} />
        </div>

        <div>
          <Label>Заголовок</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <Label>URL картинки</Label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <div>
          <Label>Текст</Label>
          <textarea
            className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button onClick={submit} className="w-full py-6 text-xl font-black rounded-xl">
          {mode === "edit" ? "Сохранить" : "Создать"}
        </Button>
      </div>
    </DialogContent>
  )
}
