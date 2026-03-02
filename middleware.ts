// middleware.ts
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Получаем IP из заголовков
  const ip =
    request.ip ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0"

  // Передаём IP дальше через заголовок
  const response = NextResponse.next()
  response.headers.set("x-real-ip", ip)
  return response
}

// Применяем middleware ко всем путям, где нужен IP
export const config = {
  matcher: ["/", "/api/security/:path*"],
}