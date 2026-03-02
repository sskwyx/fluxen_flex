import { NextResponse } from "next/server"
import fs from "node:fs"
import path from "node:path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "users.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const users = JSON.parse(fileContent)

    const safeUsers = users.map((user: any) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      balance: user.balance || 0,
      role: user.role || "user",
      createdAt: user.createdAt,
      purchases: user.purchases || [],
    }))

    return NextResponse.json({ users: safeUsers })
  } catch (error) {
    console.error("[v0] Failed to read users:", error)
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 })
  }
}
