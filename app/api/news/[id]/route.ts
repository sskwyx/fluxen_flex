import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "news.json")

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params

  const file = fs.readFileSync(filePath, "utf8")
  const json = JSON.parse(file)
  const item = json.find((n: any) => n.id == id)

  return item
    ? NextResponse.json(item)
    : NextResponse.json({ error: "Not found" }, { status: 404 })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params

  const file = fs.readFileSync(filePath, "utf8")
  let json = JSON.parse(file)

  json = json.filter((n: any) => n.id != id)

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2))
  return NextResponse.json({ ok: true })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await req.json()

  const file = fs.readFileSync(filePath, "utf8")
  let json = JSON.parse(file)

  const index = json.findIndex((n: any) => n.id == id)
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  json[index] = { ...json[index], ...body }
  
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2))

  return NextResponse.json(json[index])
}
