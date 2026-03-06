import { NextResponse } from "next/server"

const SERVER_HOST = "mc.hypixel.net"
const SERVER_PORT = 25565

export async function GET() {
  try {
    const res = await fetch(
      `https://api.mcsrvstat.us/3/${SERVER_HOST}:${SERVER_PORT}`,
      { next: { revalidate: 30 } }
    )
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ online: false })
  }
}