import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { promises as fs } from "fs"
import path from "path"

interface User {
  id: string
  username: string
  email: string
  role?: string
}

function getUsersFilePath() {
  return path.join(process.cwd(), "data", "users.json")
}

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ user: null })
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return NextResponse.json({ user: null })
  }

  try {
    const data = await fs.readFile(getUsersFilePath(), "utf-8")
    const users = JSON.parse(data)

    const user = users.find((u: any) => u.id === payload.userId)

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch {
    return NextResponse.json({ user: null })
  }
}