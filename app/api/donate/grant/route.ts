import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
  const { userId, product } = await req.json()

  const file = path.join(process.cwd(), "data/users.json")
  const users = JSON.parse(fs.readFileSync(file, "utf-8"))

  const user = users.find((u: any) => u.id === userId)
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const now = new Date()
  const expires = new Date()
  expires.setDate(now.getDate() + 30)

  user.donates = user.donates || []
  user.donates.push({
    id: product.id,
    name: product.name,
    activatedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  })

  fs.writeFileSync(file, JSON.stringify(users, null, 2))

  return NextResponse.json({ success: true })
}
