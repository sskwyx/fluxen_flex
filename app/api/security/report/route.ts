// app/api/security/report/route.ts
// app/api/security/report/route.ts
import { NextRequest } from "next/server"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const LOGS_FILE = path.join(DATA_DIR, "security-logs.json")

// Убедимся, что папка data существует
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Инициализация файла, если не существует
if (!fs.existsSync(LOGS_FILE)) {
  fs.writeFileSync(LOGS_FILE, JSON.stringify([]))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userAgent = body.userAgent || "Unknown"
    const eventType = body.eventType || "unknown"
    const captchaAttempts = body.captchaAttempts || 0
    const referrer = body.referrer || null

    // Получаем IP из заголовка (установленного middleware)
    const realIp = request.headers.get("x-real-ip") || "0.0.0.0"

    // Генерируем уникальный ID
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

    const newLog = {
      id,
      ip: realIp,
      userAgent,
      eventType,
      captchaAttempts,
      referrer,
      timestamp: new Date().toISOString(),
    }

    // Читаем текущие логи
    const logs = JSON.parse(fs.readFileSync(LOGS_FILE, "utf8") || "[]")

    // Добавляем в начало и ограничиваем 500 записями
    logs.unshift(newLog)
    if (logs.length > 500) logs.length = 500

    fs.writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2))

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Failed to log security event:", error)
    return new Response(JSON.stringify({ success: false }), { status: 500 })
  }
}