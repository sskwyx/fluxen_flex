"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, X, ArrowLeft } from "lucide-react"
import { LauncherPromo } from "@/components/LauncherPromo"

const newsData = [
  {
    id: 1,
    icon: "🌐",
    title: "Глобальное обновление сервера",
    tag: "UPDATE",
    date: "07.12.2025",
    image: "/bg.jpg",
    content: "Полностью переработана генерация мира, улучшен античит, обновлены данжи...",
  },
  {
    id: 2,
    icon: "❄️",
    title: "Зимний ивент и награды",
    tag: "EVENT",
    date: "05.12.2025",
    image: "/donate1.jpg",
    content: "Новогодние квесты, уникальные предметы, снежный хаб...",
  },
  {
    id: 3,
    icon: "🚀",
    title: "Обновление лаунчера",
    tag: "LAUNCHER",
    date: "02.12.2025",
    image: "/bgpromo.jpg",
    content: "Автообновления, защита, мгновенный запуск без патчей...",
  },
]


export function NewsSection() {
  const [isNewsOpen, setIsNewsOpen] = useState(false)
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null)

  const selectedNews = newsData.find(n => n.id === selectedNewsId)

  return (
    <>
    {/* ================= HERO NEWS BLOCK (ВОЗВРАЩЁН) ================= */}
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-32 -left-40 w-[46rem] h-[46rem] bg-primary/15 rounded-full blur-[180px]" />
    <div className="absolute bottom-0 right-0 w-[52rem] h-[52rem] bg-accent/10 rounded-full blur-[190px]" />
  </div>

  <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 xl:grid-cols-[420px_1fr_380px] gap-16 items-start">

    {/* ===== ЛЕВЫЙ БЛОК — FLEX ATMOSPHERE ===== */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative h-full min-h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
    >
      <Image src="/bg.jpg" alt="bg" fill className="object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-xs uppercase tracking-widest text-primary font-mono mb-2">
          Flex Project
        </p>

        <h3 className="text-xl font-bold">
          Атмосфера сервера
          <span className="block text-primary mt-1">
            в одном кадре
          </span>
        </h3>
      </div>
    </motion.div>

    {/* ===== ЦЕНТР — ЗАГОЛОВОК + ПРЕВЬЮ ===== */}
    <div className="max-w-3xl w-full">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center xl:text-left"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 mb-6 border border-primary/20 font-mono text-xs text-primary">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Новости проекта
        </div>

        <h2 className="font-mono text-4xl md:text-6xl font-bold mb-5 leading-tight">
          Последние обновления
          <span className="block text-primary mt-2">
            и события сервера
          </span>
        </h2>
      </motion.div>

      {/* КАРТОЧКА ПРЕВЬЮ */}
      <motion.button
  onClick={() => setIsNewsOpen(true)}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  className="relative w-full h-[140px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex items-center justify-center"
>
  <img
    src="/bg.jpg"
    className="absolute inset-0 w-full h-full object-cover opacity-40"
  />

  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

  <p className="relative z-10 text-lg md:text-xl font-semibold tracking-wide text-white/90">
    Нажми, чтобы открыть все новости →
  </p>
</motion.button>

    </div>

    {/* ===== ПРАВЫЙ БЛОК — LAUNCHER PROMO ===== */}
    <LauncherPromo />

  </div>
</section>

      {/* ================= FULLSCREEN NEWS ================= */}
      <AnimatePresence>
        {isNewsOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsNewsOpen(false)
                setSelectedNewsId(null)
              }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl"
            />

            {/* WINDOW */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
              className="fixed inset-6 z-50 rounded-[2.5rem] overflow-hidden border border-white/20 bg-gradient-to-br from-black via-neutral-950 to-black shadow-2xl flex flex-col"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-10 py-7 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                <h2 className="text-4xl md:text-5xl font-bold font-mono">
                  Новости <span className="text-primary">Flex Project</span>
                </h2>

                <button
                  onClick={() => {
                    setIsNewsOpen(false)
                    setSelectedNewsId(null)
                  }}
                  className="p-3 rounded-full bg-white/10 hover:bg-primary/20 transition shadow-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 relative overflow-hidden">
                {/* ================= LIST ================= */}
                <motion.div
                  animate={{ x: selectedNewsId ? "-100%" : "0%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 240 }}
                  className="absolute inset-0 flex flex-col"
                >
                  <div className="flex-1 overflow-y-auto p-10 pb-32 no-scrollbar">
                    <div className="max-w-5xl mx-auto grid gap-10">
                      {newsData.map((item) => (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedNewsId(item.id)}
                          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl hover:border-primary/50 transition"
                        >
                          <div className="relative h-[340px]">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                          </div>

                          <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <div className="flex items-center gap-5 mb-5">
                              <span className="text-6xl">{item.emoji}</span>
                              <div>
                                <span className="px-4 py-2 rounded-full bg-primary/25 text-primary font-mono text-sm">
                                  {item.tag}
                                </span>
                                <span className="block text-sm text-muted-foreground mt-2">{item.date}</span>
                              </div>
                            </div>

                            <h3 className="text-4xl font-bold font-mono max-w-3xl">
                              {item.title}
                            </h3>

                            <ChevronRight className="absolute right-10 bottom-10 h-12 w-12 text-primary opacity-70 group-hover:translate-x-4 transition" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* ================= DETAIL ================= */}
                <AnimatePresence mode="wait">
                  {selectedNews && (
                    <motion.div
                      initial={{ opacity: 0, x: "100%" }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: "100%" }}
                      transition={{ type: "spring", damping: 26, stiffness: 220 }}
                      className="absolute inset-0 bg-black flex flex-col"
                    >
                      {/* BACK */}
                      <div className="px-10 py-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
                        <button
                          onClick={() => setSelectedNewsId(null)}
                          className="flex items-center gap-4 text-primary hover:gap-6 transition-all font-mono text-lg"
                        >
                          <ArrowLeft className="h-6 w-6" />
                          Назад к новостям
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto no-scrollbar">
                        <div className="max-w-6xl mx-auto p-12">
                          <div className="flex items-center gap-6 mb-10">
                            <span className="text-8xl">{selectedNews.emoji}</span>
                            <div>
                              <span className="px-6 py-2 rounded-full bg-primary/20 text-primary font-mono text-lg">
                                {selectedNews.tag}
                              </span>
                              <p className="text-xl text-muted-foreground mt-2">{selectedNews.date}</p>
                            </div>
                          </div>

                          <h1 className="text-6xl md:text-7xl font-bold font-mono mb-14 leading-tight">
                            {selectedNews.title}
                          </h1>

                          <div className="relative w-full h-[520px] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
                            <Image
                              src={selectedNews.image}
                              alt={selectedNews.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                          </div>

                          <p className="text-2xl leading-relaxed text-muted-foreground max-w-4xl">
                            {selectedNews.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
