"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Globe, 
  MessageCircle, 
  Shield, 
  Heart,
  Copyright 
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-2xl mt-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <span className="text-2xl font-black font-mono tracking-tighter">flex</span>
            </div>
            <p className="text-white/60 max-w-xs leading-relaxed">
              Вечный мир. Честная игра. Будущее Minecraft.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h3 className="text-sm uppercase tracking-widest text-white/50 font-mono">Навигация</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Главная" },
                { href: "/about", label: "О проекте" },
                { href: "/faq", label: "FAQ" },
                { href: "/rules", label: "Правила" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-primary transition-colors duration-300 text-lg font-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h3 className="text-sm uppercase tracking-widest text-white/50 font-mono">Сообщество</h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://discord.gg/flex"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 hover:text-primary transition-all group"
              >
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/40 transition">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span>Discord</span>
              </a>
              <a
                href="https://vk.com/flexproject"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 hover:text-primary transition-all group"
              >
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/40 transition">
                  <Globe className="h-5 w-5" />
                </div>
                <span>VK</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Нижняя строка — обновлено по твоему желанию */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm"
        >
          <div className="flex items-center gap-2">
            <Copyright className="h-4 w-4" />
            <span>{currentYear} flex project. Все права защищены.</span>
          </div>

          <Link
            href="https://t.me/fluxen_tg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors group"
          >
            <span>Сделано с</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 group-hover:scale-110 transition" />
            <span className="underline decoration-white/30 group-hover:decoration-primary">
              by fluxen
            </span>
          </Link>
        </motion.div>
      </div>
    </footer>
  )
}