"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative mx-8 md:mx-32 mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl"
      >
        <Image
          src="/bg.jpg"
          alt="flex minecraft server"
          fill
          className="object-cover brightness-75"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <div className="relative flex flex-col items-center justify-center text-center px-8 py-32 md:py-40">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-tight"
          >
            flex — новый взгляд
            <br />
            на Minecraft-проекты
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            Чистый старт. Своя система доната. 
            Полный контроль над сервером и его развитием.
          </motion.p>

        </div>
      </motion.div>


      {/* ПРЕИМУЩЕСТВА */}
      <div className="mx-8 md:mx-32 mt-28 mb-32 grid md:grid-cols-3 gap-8">

        <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <h3 className="text-2xl font-bold mb-6">Своя экономика</h3>
          <p className="text-white/60 leading-relaxed">
            Донат, привилегии и управление полностью
            находятся под контролем администрации.
          </p>
        </div>

        <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <h3 className="text-2xl font-bold mb-6">Без ограничений</h3>
          <p className="text-white/60 leading-relaxed">
            Нет навязанных правил или комиссий.
            Проект развивается так, как решит команда.
          </p>
        </div>

        <div className="p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <h3 className="text-2xl font-bold mb-6">Открытый код</h3>
          <p className="text-white/60 leading-relaxed">
            Архитектура прозрачна.
            Любой разработчик может доработать систему под себя.
          </p>
        </div>

      </div>

    </div>
  )
}