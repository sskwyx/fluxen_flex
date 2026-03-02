"use client"

import { ProductCard } from "@/components/product-card"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

// Product data with pricing
const products = [
  {
    id: "donate-1", // id продукта
    name: "ДОНАТ 1", // название продукта
    version: "1", // было добавлено по приколу (может кому будет нужно)
    description: "Крутой донат за свои деньги.", // описание продукта
    price: 699, // цена в рублях (без копеек)
    duration: "30 days", // время на сколько даётся доступ к донату
    features: [ // особенности продукта (что входит)
      "ГМ 1",
      "ДОСТУП К /OP",
    ],
    image: "/donate1.jpg", // изображение продукта
    category: "DONATE", // категория продукта
    popular: true, // популярный ли продукт (отображение бейджа) (пометка)
    nonsale: false, // не продаётся ли продукт (отображение бейджа) (пометка)
  },
  {
    id: "donate-2",
    name: "ДОНАТ 2",
    version: "2",
    description:
      "Крутой донат за свои деньги.",
    price: 999,
    duration: "30 days",
    features: [
      "ГМ 1",
      "ДОСТУП К /OP",
    ],
    image: "/donate1.jpg",
    category: "DONATE",
    popular: true,
    nonsale: true,
  },
]

export default function ProductsPage() {
  const { t } = useLanguage()

  return (
    <div className="relative py-16 min-h-screen">
      {/* Soft background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/80 to-background" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6 border border-primary/20 text-primary font-mono text-sm"
          >
            🔒 24/7 Support
          </motion.div>

          <h1 className="mb-6 font-mono text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            donate
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Наши товары на сервере предоставляют уникальные возможности для улучшения вашего игрового опыта. Выберите подходящий пакет и наслаждайтесь преимуществами уже сегодня!
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="relative">
                {product.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 text-xs font-bold text-black shadow-md">
                      ★ Popular
                    </span>
                  </motion.div>
                )}

                {product.nonsale && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-800/80 backdrop-blur-sm px-3 py-1 text-xs font-bold text-muted-foreground border border-white/10">
                      🚧 Coming Soon
                    </span>
                  </motion.div>
                )}

                <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-2xl">
                  <ProductCard {...product} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}