import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import {
  verifyPassword,
  createToken,
} from "@/lib/auth"

interface User {
  id: string
  username: string
  email: string
  password: string
}

function getUsersFilePath() {
  return path.join(process.cwd(), "data", "users.json")
}

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(
      getUsersFilePath(),
      "utf-8"
    )
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: "All fields required" },
      { status: 400 }
    )
  }

  const users = await readUsers()

  const user = users.find(u => u.email === email)

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  }

  const valid = await verifyPassword(
    password,
    user.password
  )

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  }

  // 🔥 ВАЖНО: await
  const token = await createToken(user.id)

  const response = NextResponse.json({
    message: "Login successful",
  })

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return response
}