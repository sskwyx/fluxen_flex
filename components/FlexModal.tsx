"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gauge,
  Wrench,
  Headphones,
  GitBranch,
  Zap,
  Sparkles,
  ArrowUpRight,
  X,
} from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    icon: Gauge,
    title: "Статистика",
    desc: "Следите за проектом в реальном времени с полной аналитикой.",
  },
  {
    icon: Wrench,
    title: "Модули Flex",
    desc: "Используйте эксклюзивные расширения для вашего сервера.",
  },
  {
    icon: GitBranch,
    title: "Ранний доступ",
    desc: "Получайте новые функции раньше остальных пользователей.",
  },
  {
    icon: Headphones,
    title: "Поддержка",
    desc: "Связь напрямую с разработчиком через Telegram.",
  },
  {
    icon: Zap,
    title: "Ускорение",
    desc: "Оптимизация работы сервера без ограничений.",
  },
];

export default function FlexMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(true); // <-- сразу открыто

  // ESC для закрытия
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* ================= Кнопка-пилюля снизу ================= */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white/10 text-white px-6 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition"
        >
          Меню Flex
        </button>
      )}

      {/* ================= FULLSCREEN MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] overflow-y-auto bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* HEADER */}
              <motion.div
                className="text-center max-w-3xl mb-8"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-mono text-xs tracking-[0.4em] text-blue-400 mb-6">
                  flex | by fluxen.
                </p>
                <h2 className="text-4xl md:text-6xl font-bold font-mono leading-tight">
                  <span className="block mt-3 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                    Привет! Это превью сайта.
                  </span>
                </h2>
                <p className="text-gray-400 font-semibold">
                  Вы можете установить его с GitHub по кнопке ниже. 
                </p>
                <p className="mt-2 text-white/50 text-base">
                Это <span className="text-white font-semibold">бесплатная версия</span> Flex.
                </p>
                <p className="mt-2 text-white text-base font-semibold">
                  Также у нас есть Flex PRO — вот её возможности:
                </p>
              </motion.div>

              {/* FEATURES */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full mb-20">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.title}
                      whileHover={{ y: -6, scale: 1.02 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 transition-all"
                    >
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/20 via-violet-400/20 to-transparent" />
                      <div className="relative z-10">
                        <div className="mb-5 w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="font-mono text-base font-bold mb-2">{f.title}</h3>
                        <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* ================= CTA BUTTONS ================= */}
              <motion.div
                className="flex flex-col md:flex-row gap-6 w-full max-w-md justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <a
                  href="https://fluxen.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-4 font-semibold shadow-xl hover:scale-105 transition"
                >
                  fluxen.ru
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/sskwyx/fluxen_flex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full border border-white text-white px-8 py-4 font-semibold shadow-xl hover:bg-white hover:text-black transition"
                >
                  GitHub
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}