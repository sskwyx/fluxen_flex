import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"
import { hashPassword, createToken } from "@/lib/auth"

interface User {
  id: string
  username: string
  email: string
  password: string
  balance: number
  role?: string
  createdAt: string
}

function getUsersFilePath() {
  return path.join(process.cwd(), "data", "users.json")
}

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(getUsersFilePath(), "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeUsers(users: User[]) {
  const file = getUsersFilePath()
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(users, null, 2))
}

export async function POST(request: Request) {
  const { username, email, password } =
    await request.json()

  if (!username || !email || !password)
    return NextResponse.json(
      { error: "All fields required" },
      { status: 400 }
    )

  const users = await readUsers()

  if (users.find(u => u.email === email))
    return NextResponse.json(
      { error: "Email exists" },
      { status: 400 }
    )

  const newUser: User = {
    id: crypto.randomUUID(),
    username,
    email,
    password: await hashPassword(password),
    balance: 0,
    role: "user",
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  await writeUsers(users)

  const token = createToken(newUser.id)

  const res = NextResponse.json({
    message: "Registered",
  })

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return res
}