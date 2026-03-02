// app/api/security/logs/route.ts
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const LOGS_FILE = path.join(process.cwd(), "data", "security-logs.json")

export async function GET() {
  try {
    if (!fs.existsSync(LOGS_FILE)) {
      return NextResponse.json({ logs: [] })
    }

    const logs = JSON.parse(fs.readFileSync(LOGS_FILE, "utf8") || "[]")
    return NextResponse.json({ logs })
  } catch (error) {
    console.error("Failed to read security logs:", error)
    return NextResponse.json({ logs: [] }, { status: 500 })
  }
}