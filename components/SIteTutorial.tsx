"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"

const steps = [
  {
    title: "Добро пожаловать в Flex Project",
    text: "Это короткое обучение поможет тебе разобраться во всех возможностях платформы.",
    image: "/bg.jpg",
  },
  {
    title: "Дизайн и интерфейс",
    text: "Стиль сайта заточен под минимализм и удобство использования на любых устройствах.",
    image: "/tutorial/design.jpg",
  },
  {
    title: "Код",
    text: "Код написан максимально понятно и прозрачно, чтобы ты мог легко ориентироваться.",
    image: "/tutorial/code.jpg",
  },
  {
    title: "Новости и обновления",
    text: "Блок новостей стал красивее и информативнее, чтобы ты мог его использовать!",
    image: "/tutorial/news.jpg",
  },
  {
    title: "Обновления",
    text: "Проект будет обновляться чаще, с новыми функциями и улучшениями.",
    image: "/tutorial/upd.jpg",
  },
  {
    title: "Конец и различие версий",
    text: "Есть FREE версия - это твоя, а есть PRO версия - для тех кто поддерживает нас, там обновления просто выходят чаще и раньше чем в FREE.",
    image: "/tutorial/final.jpg",
  },
]

export function SiteTutorial() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const viewed = localStorage.getItem("flex_tutorial_done")
    if (!viewed) setOpen(true)
  }, [])

  const finishTutorial = () => {
    localStorage.setItem("flex_tutorial_done", "true")
    setOpen(false)
  }

  const nextStep = () => {
    if (step === steps.length - 1) {
      finishTutorial()
    } else {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black"
        >
          {/* Background Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={steps[step].image}
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 py-10 md:px-20">

            {/* Top */}
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-primary font-mono">
                Обучение Flex Project
              </p>

              <div className="text-sm text-muted-foreground font-mono">
                {step + 1} / {steps.length}
              </div>
            </div>

            {/* Center */}
            <div className="max-w-3xl">
              <motion.h1
                key={steps[step].title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              >
                {steps[step].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              >
                {steps[step].text}
              </motion.p>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between gap-4">

              {/* Back */}
              <Button
                onClick={prevStep}
                disabled={step === 0}
                variant="outline"
                className="rounded-xl px-8 border-white/20 disabled:opacity-30"
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Назад
              </Button>

              {/* Progress Bar */}
              <div className="flex-1 mx-6 h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  key={step}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((step + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-primary"
                />
              </div>

              {/* Next */}
              <Button
                onClick={nextStep}
                className="rounded-xl px-10 shadow-lg shadow-primary/30"
              >
                {step === steps.length - 1 ? "Начать" : "Далее"}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
