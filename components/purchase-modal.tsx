"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { CreditCard, Send, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"

interface PurchaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    id: string
    name: string
    price: number
    duration: string
  }
}

export function PurchaseModal({ open, onOpenChange, product }: PurchaseModalProps) {
  const { t } = useLanguage()
  const router = useRouter()

  const paymentMethods = [
    { id: "card", name: "Т-Банк", icon: CreditCard, description: "Перевод по номеру карты" },
    { id: "telegram", name: "Telegram", icon: Send, description: "@voxmanee_reseller" },
    { id: "balance", name: t.purchase.balance, icon: Wallet, description: t.purchase.balanceDesc },
  ]

  const handleMethodSelect = (methodId: string) => {
    onOpenChange(false)
    router.push(`/payment?method=${methodId}&product=${product.id}&price=${product.price}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-mono">{t.purchase.title}</DialogTitle>
        </DialogHeader>

        <div className="border-y border-border py-4 my-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{t.purchase.product}:</span>
            <span className="font-medium font-mono">{product.name}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Duration:</span>
            <span className="font-medium">{product.duration}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="font-semibold">{t.purchase.total}:</span>
            <span className="text-2xl font-bold font-mono">${product.price}</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">{t.purchase.selectMethod}</p>
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className="w-full flex items-center gap-4 p-4 border border-border rounded-lg hover:border-foreground hover:bg-accent/50 transition-all group"
            >
              <div className="p-3 rounded-lg bg-muted group-hover:bg-foreground/10 transition-colors">
                <method.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold font-mono">{method.name}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </button>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full mt-4 bg-transparent"
          onClick={() => onOpenChange(false)}
        >
          {t.purchase.cancel}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
