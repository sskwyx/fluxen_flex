"use client"

import { Hero } from "@/components/hero"
import { motion } from "framer-motion"
import { LauncherPromo } from "@/components/LauncherPromo"
import { ProVersion } from "@/components/ProVersion"
import { useState } from "react"

// Отзывы
const playerTestimonials = [
  {
    quote: "Крутой майнкрафт сервер с античитом, который реально работает! Никаких читеров не видел с тех пор, как начал играть здесь.",
    name: "player1",
    avatar: "/placeholder.svg",
  },
  {
    quote: "Мой любимый сервер для игры с друзьями. Стабильный, быстрый и с отличной защитой от читеров.",
    name: "player2",
    avatar: "/placeholder.svg",
  },
  {
    quote: "Люблю этот сервер за его дружелюбное сообщество и регулярные обновления. Античит просто супер!",
    name: "player3",
    avatar: "/placeholder.svg",
  },
]

// Фичи для анимированной сетки

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Саркастичный блок с отзывами */}
      <section className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-32 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[150px] opacity-30" />
          <div className="absolute bottom-0 right-0 w-[45rem] h-[45rem] bg-accent/10 rounded-full blur-[160px] opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 mb-6 border border-primary/20 font-mono text-sm text-primary">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Отзывы?
            </div>
            <h2 className="font-mono text-4xl md:text-6xl font-bold">
              Конечно.  
              <span className="block text-primary mt-2">Для вас.</span>
            </h2>
          </div>

          <div className="relative w-full h-[320px] overflow-hidden max-w-4xl mx-auto">
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background/80 to-transparent pointer-events-none z-30" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20" />

            <div className="flex gap-6" style={{ animation: 'scroll 25s linear infinite', width: 'fit-content' }}>
              {[...Array(3)].flatMap(() => playerTestimonials).map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-96">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full">
                    <div className="text-primary text-4xl mb-4">“</div>
                    <p className="text-white mb-4 font-mono text-sm leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="border-t border-white/10 pt-4 mt-2">
                      <div className="flex items-center gap-3">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-10 h-10 rounded-full object-cover border border-white/20"
                        />
                        <div>
                          <div className="font-mono font-bold text-white">{testimonial.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />

            <style jsx global>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-96px * 3 - 24px * 3)); }
              }
            `}</style>
          </div>
        </div>
      </section>

      <ProVersion />
          
              
    </> 
  )
}