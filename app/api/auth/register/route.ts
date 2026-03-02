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
    // If file doesn't exist, return empty array
    return []
  }
}

// Write users to JSON file
async function writeUsers(users: User[]): Promise<void> {
  const filePath = getUsersFilePath()
  const dirPath = path.dirname(filePath)

  // Ensure data directory exists
  await fs.mkdir(dirPath, { recursive: true })

  await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8")
}

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Read existing users
    const users = await readUsers()

    // Check if email already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Create new user
    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      email,
      password: hashPassword(password),
      balance: 0,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    // Add user to array and save
    users.push(newUser)
    await writeUsers(users)

    // Return success (without password)
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
