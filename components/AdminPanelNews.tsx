"use client"

import { useEffect, useState } from "react"

export function AdminPanelNews() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ emoji: "", title: "", tag: "", date: "", image: "", content: "" })

  async function load() {
    const r = await fetch("/api/news")
    setItems(await r.json())
  }

  async function create() {
    await fetch("/api/news", {
      method: "POST",
      body: JSON.stringify(form),
    })
    load()
  }

  async function remove(id: string) {
    await fetch(`/api/news/${id}`, { method: "DELETE" })
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div className="p-10">
      <h2 className="text-3xl font-mono mb-6">Управление новостями</h2>

      <div className="grid gap-4 max-w-xl mb-10">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            className="p-3 rounded bg-white/5 border border-white/10"
            onChange={e => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
        <button onClick={create} className="px-6 py-3 bg-primary rounded-xl">
          Создать новость
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="p-4 border border-white/10 rounded-xl flex justify-between">
            <span>{item.title}</span>
            <button className="text-red-400" onClick={() => remove(item.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  )
}
