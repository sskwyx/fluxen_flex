import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

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
    const filePath = getUsersFilePath()
    const fileData = await fs.readFile(filePath, "utf-8")
    return JSON.parse(fileData)
  } catch (error) {
    return []
  }
}

async function writeUsers(users: User[]): Promise<void> {
  const filePath = getUsersFilePath()
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8")
}

export async function POST(request: Request) {
  try {
    const { userId, amount, operation } = await request.json()

    if (!userId || amount === undefined || !operation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const users = await readUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update balance
    if (operation === "add") {
      users[userIndex].balance = (users[userIndex].balance || 0) + Number.parseFloat(amount)
    } else if (operation === "subtract") {
      if (users[userIndex].balance < Number.parseFloat(amount)) {
        return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
      }
      users[userIndex].balance = (users[userIndex].balance || 0) - Number.parseFloat(amount)
    }

    await writeUsers(users)

    return NextResponse.json({
      message: "Balance updated successfully",
      newBalance: users[userIndex].balance,
    })
  } catch (error) {
    console.error("[v0] Balance update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
