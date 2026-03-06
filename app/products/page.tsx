"use client"

import { ProductCard } from "@/components/products/product-card"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const products = [
  {
    id: "donate-1",
    name: "ДОНАТ 1",
    version: "1",
    description: "Крутой донат за свои деньги.",
    price: 699,
    duration: "30 days",
    features: ["ГМ 1", "ДОСТУП К /OP"],
    image: "/donate1.jpg",
    category: "DONATE",
    popular: true,
    nonsale: false,
  },
  {
    id: "donate-2",
    name: "ДОНАТ 2",
    version: "2",
    description: "Крутой донат за свои деньги.",
    price: 999,
    duration: "30 days",
    features: ["ГМ 1", "ДОСТУП К /OP"],
    image: "/donate1.jpg",
    category: "DONATE",
    popular: true,
    nonsale: true,
  },
]

export default function ProductsPage() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen overflow-hidden py-24 px-6">

      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 blur-[180px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-500/20 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* NAVBAR */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-24"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Flex Project</span>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <p className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">donate</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Улучши игровой
            <span className="block mt-3 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
              опыт
            </span>
          </h1>
          <p className="mt-6 text-white/50 text-lg leading-relaxed">
            Уникальные возможности для игроков.{" "}
            <span className="text-white">Выбери подходящий пакет и начни прямо сейчас.</span>
          </p>
        </motion.div>

        {/* PRODUCTS GRID */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative"
            >
              {/* badges */}
              {product.popular && !product.nonsale && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 text-xs font-bold text-black shadow-md font-mono">
                    ★ Popular
                  </span>
                </div>
              )}
              {product.nonsale && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-mono text-white/40">
                    🚧 Coming Soon
                  </span>
                </div>
              )}

              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/10">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/20 via-violet-400/10 to-transparent pointer-events-none" />
                <ProductCard {...product} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}