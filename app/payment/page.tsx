"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Wallet, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const productId = searchParams.get("product")
  const price = Number(searchParams.get("price"))

  const [user, setUser] = useState<any>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!productId || !price) {
      router.push("/products")
      return
    }

    const userData = localStorage.getItem("rumi_user")
    if (userData) setUser(JSON.parse(userData))
  }, [productId, price, router])

  const handlePay = async () => {
    if (!user || user.balance < price) {
      toast({
        title: "Недостаточно средств",
        variant: "destructive",
      })
      return
    }

    // списываем баланс
    const balanceRes = await fetch("/api/balance/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        amount: price,
        operation: "subtract",
      }),
    })

    if (!balanceRes.ok) {
      toast({ title: "Ошибка оплаты", variant: "destructive" })
      return
    }

    // выдаём донат
    await fetch("/api/donate/grant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        product: {
          id: productId,
          name: productId.toUpperCase(),
        },
      }),
    })

    const updatedUser = {
      ...user,
      balance: user.balance - price,
      donates: [
        ...(user.donates || []),
        {
          id: productId,
          name: productId.toUpperCase(),
          activatedAt: new Date().toISOString(),
          expiresAt: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
    }

    localStorage.setItem("rumi_user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setSuccess(true)

    setTimeout(() => router.push("/profile"), 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="font-mono text-3xl font-bold">
            Донат активирован
          </h1>
          <p className="text-muted-foreground">
            Он уже отображается в вашем профиле
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-primary/10">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-mono text-2xl font-bold">
                Оплата доната
              </h1>
              <p className="text-muted-foreground">
                Донат будет активирован автоматически
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between p-4 rounded-xl bg-background border border-border">
              <span className="text-muted-foreground">Ваш баланс</span>
              <span className="font-mono font-bold">
                ₽ {user?.balance?.toLocaleString("ru-RU")}
              </span>
            </div>

            <div className="flex justify-between p-4 rounded-xl bg-background border border-border">
              <span className="text-muted-foreground">Стоимость</span>
              <span className="font-mono font-bold">
                ₽ {price.toLocaleString("ru-RU")}
              </span>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={handlePay}>
            Подтвердить оплату
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PaymentContent />
    </Suspense>
  )
}
