import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { amount, productId, userId } = await request.json()

    const API_KEY = process.env.NOWPAYMENTS_API_KEY

    if (!API_KEY) {
      return NextResponse.json({ error: "Crypto payment gateway not configured" }, { status: 500 })
    }

    // Create crypto payment invoice
    const paymentData = {
      price_amount: amount,
      price_currency: "usd",
      pay_currency: "usdttrc20",
      order_id: `${productId}-${Date.now()}`,
      order_description: `Payment for ${productId}`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/crypto/callback`,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    }

    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(paymentData),
    })

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: "Crypto payment creation failed", details: result },
        { status: response.status },
      )
    }

    return NextResponse.json({
      paymentUrl: result.invoice_url,
      paymentId: result.id,
      payAddress: result.pay_address,
      payAmount: result.pay_amount,
    })
  } catch (error) {
    console.error("[v0] Crypto payment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
