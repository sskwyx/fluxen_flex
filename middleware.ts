import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 🔥 Разрешаем всё публичное
  const publicPaths = [
    "/",
    "/products",
    "/rules",
    "/faq",
    "/about",
    "/contact",
    "/api/register",
    "/api/login",
  ]

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 🔒 Проверяем только приватные роуты
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}