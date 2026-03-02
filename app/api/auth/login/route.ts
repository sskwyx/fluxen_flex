import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

interface User {
  id: string
  username: string
  email: string
  password: string
  balance: number
  role?: string
  createdAt: string
}

// Hash password using SHA-256
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

// Get path to users data file
function getUsersFilePath() {
  return path.join(process.cwd(), "data", "users.json")
}

// Read users from JSON file
async function readUsers(): Promise<User[]> {
  try {
    const filePath = getUsersFilePath()
    const fileData = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileData)
  } catch (error) {
    return []
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Read users
    const users = await readUsers()

    // Find user by email
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const hashedPassword = hashPassword(password)
    if (user.password !== hashedPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Return success (without password)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
