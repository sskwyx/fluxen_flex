import { type NextRequest, NextResponse } from "next/server"

// Mock file storage - in production, this would fetch from actual storage
const files: Record<string, { name: string; content: Uint8Array; mimeType: string }> = {
  "shrk-toolkit-v2.1.0": {
    name: "shRk_Toolkit_v2.1.0.zip",
    content: new Uint8Array([80, 75, 3, 4]), // ZIP file header
    mimeType: "application/zip",
  },
  "network-scanner-pro-v1.5.2": {
    name: "Network_Scanner_Pro_v1.5.2.zip",
    content: new Uint8Array([80, 75, 3, 4]),
    mimeType: "application/zip",
  },
  "crypto-analyzer-v3.0.1": {
    name: "Crypto_Analyzer_v3.0.1.zip",
    content: new Uint8Array([80, 75, 3, 4]),
    mimeType: "application/zip",
  },
  "payload-generator-v1.8.0": {
    name: "Payload_Generator_v1.8.0.zip",
    content: new Uint8Array([80, 75, 3, 4]),
    mimeType: "application/zip",
  },
  "stealth-proxy-v2.3.0": {
    name: "Stealth_Proxy_v2.3.0.zip",
    content: new Uint8Array([80, 75, 3, 4]),
    mimeType: "application/zip",
  },
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fileId = searchParams.get("id")

  if (!fileId) {
    return NextResponse.json({ error: "File ID is required" }, { status: 400 })
  }

  const file = files[fileId]

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }

  // In production, you would:
  // 1. Fetch the actual file from storage (S3, Vercel Blob, etc.)
  // 2. Log the download for analytics
  // 3. Check user permissions if needed
  // 4. Stream large files instead of loading into memory

  return new NextResponse(file.content, {
    headers: {
      "Content-Type": file.mimeType,
      "Content-Disposition": `attachment; filename="${file.name}"`,
      "Cache-Control": "no-cache",
    },
  })
}
