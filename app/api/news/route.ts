import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "news.json")

export async function GET() {
  const file = fs.readFileSync(filePath, "utf8")
  const json = JSON.parse(file)
  return NextResponse.json(json)
}

export async function POST(req: Request) {
  const body = await req.json()
  const file = fs.readFileSync(filePath, "utf8")
  const json = JSON.parse(file)

  const newItem = {
    ...body,
    id: Date.now(),
    date: new Date().toLocaleDateString("ru-RU"),
  }

  json.push(newItem)
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2))

  return NextResponse.json(newItem)
}
