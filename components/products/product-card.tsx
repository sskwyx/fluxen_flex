"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Lock } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function ProductCard(product: any) {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={240}
        className="object-cover w-full h-48"
      />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-mono text-xl font-bold">{product.name}</h3>
          {product.popular && <Badge>Popular</Badge>}
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {product.description}
        </p>

        <ul className="text-sm space-y-1 mb-6">
          {product.features.map((f: string) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>

        <div className="mt-auto">
          <div className="text-2xl font-mono font-bold mb-4">
            ₽ {product.price}
            <span className="text-sm text-muted-foreground ml-2">
              / {product.duration}
            </span>
          </div>

          {product.nonsale ? (
            <Button disabled className="w-full">
              <Lock className="mr-2 h-4 w-4" /> Скоро
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() =>
                router.push(`/payment?product=${product.id}&price=${product.price}&method=balance`)
              }
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Купить
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
