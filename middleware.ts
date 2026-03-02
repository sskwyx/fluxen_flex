import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export function middleware(request: NextRequest) {
  // Получаем IP из заголовков
  const ip =
    request.ip ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "0.0.0.0"
    const response = NextResponse.next()
    response.headers.set("x-real-ip", ip)

  // Проверяем JWT, если есть
    const token =
    request.cookies.get("token")?.value

  if (!token)
    return NextResponse.redirect(
      new URL("/login", request.url)
    )

  const payload = verifyToken(token)

  if (!payload)
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  return NextResponse.next()
  
}

// Применяем middleware ко всем путям, где нужен IP
export const config = {
  matcher: ["/", "/api/security/:path*", "/dashboard/:path*"],
}