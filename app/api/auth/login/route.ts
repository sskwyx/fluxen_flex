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
  const { email, password } =
    await request.json()

  const users = await readUsers()

  const user = users.find(
    u => u.email === email
  )

  if (!user)
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )

  const valid = await verifyPassword(
    password,
    user.password
  )

  if (!valid)
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )

  const token = createToken(user.id)

  const res = NextResponse.json({
    message: "Login successful",
  })

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return res
}