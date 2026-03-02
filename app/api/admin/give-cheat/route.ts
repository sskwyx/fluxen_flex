import { NextResponse } from "next/server"
import fs from "node:fs"
import path from "node:path"

export async function POST(request: Request) {
  try {
    const { userId, cheatName, cheatFile } = await request.json()

    if (!userId || !cheatName || !cheatFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), "data", "users.json")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const users = JSON.parse(fileContent)

    const userIndex = users.findIndex((u: any) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!users[userIndex].purchases) {
      users[userIndex].purchases = []
    }

    // Add cheat to purchases
    users[userIndex].purchases.push({
      id: Date.now().toString(),
      productId: "neverlose-cs2",
      productName: cheatName,
      price: 0,
      purchaseDate: new Date().toISOString(),
      downloadUrl: cheatFile,
      grantedByAdmin: true,
    })

    // Save updated users
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))

    return NextResponse.json({ success: true, message: "Cheat granted successfully" })
  } catch (error) {
    console.error("[v0] Failed to give cheat:", error)
    return NextResponse.json({ error: "Failed to grant cheat" }, { status: 500 })
  }
}
