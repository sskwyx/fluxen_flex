"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Users, Package, HelpCircle, Info, Mail, User, UserPlus, Globe, LogOut, Shield, Server } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { AuthModal } from "@/components/auth-modal"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("rumi_user")
      if (user) {
        try {
          const userData = JSON.parse(user)
          setIsAuthenticated(true)
          setUsername(userData.username || userData.email)
          setIsAdmin(userData.role === "admin")
        } catch {
          setIsAuthenticated(false)
          setIsAdmin(false)
        }
      } else {
        setIsAuthenticated(false)
        setIsAdmin(false)
      }
    }

    checkAuth()
    const handleStorage = () => checkAuth()
    window.addEventListener("storage", handleStorage)
    window.addEventListener("authChange", handleStorage)
    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("authChange", handleStorage)
    }
  }, [])

  // Добавлен /status
  const navItems = [
    { href: "/", icon: Users, label: t.nav.home }, // home page
    { href: "/products", icon: Package, label: t.nav.products }, // products page
    { href: "/rules", icon: Server, label: t.nav.rules }, // rules page
    { href: "/faq", icon: HelpCircle, label: t.nav.faq }, // faq page
    { href: "/about", icon: Info, label: t.nav.about }, // about page
    { href: "/contact", icon: Mail, label: t.nav.contact }, // contact page
  ]

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("flex_user") // удаление ключа flex_user при выходе
    setIsAuthenticated(false)
    setIsAdmin(false)
    setUsername("")
    window.dispatchEvent(new Event("authChange"))
    router.push("/")
  }

  if (!mounted) {
    return (
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto rounded-full border border-white/10 bg-black/30 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20 shadow-xl max-w-4xl px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-mono text-xl font-bold text-white">
            flex
          </Link>
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/10 text-white">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/10 text-white">
              <UserPlus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/10 text-white">
              <Globe className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto rounded-full border border-white/10 bg-black/30 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20 shadow-xl max-w-4xl px-6">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xl font-bold text-white hover:text-primary transition-colors"
          >
            flex
          </Link>

          <div className="flex items-center gap-3">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors relative z-10",
                    pathname === item.href
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                  {pathname === item.href && <span>{item.label}</span>}
                </Link>

                {/* Пилюля при наведении */}
                {hoveredItem === item.href && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-full whitespace-nowrap"
                    style={{ pointerEvents: "none" }}
                  >
                    {item.label}
                  </motion.div>
                )}

                {/* Подсветка при наведении */}
                {hoveredItem === item.href && (
                  <motion.div
                    layoutId="navbar-highlight"
                    className="absolute inset-0 rounded-full bg-white/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                    style={{ pointerEvents: "none" }}
                  />
                )}
              </div>
            ))}

            {/* Аутентификация */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                    <User className="h-4 w-4 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer rounded-lg">
                    📦 {t.dashboard.title}
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => router.push("/admin")}
                      className="cursor-pointer rounded-lg text-primary"
                    >
                      <Shield className="h-4 w-4 mr-2 inline" /> Админка
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-lg text-destructive">
                    <LogOut className="h-4 w-4 mr-2 inline" /> {t.auth.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20"
                  onClick={() => openAuthModal("login")}
                  aria-label={t.nav.login}
                >
                  <User className="h-4 w-4 text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/20"
                  onClick={() => openAuthModal("register")}
                  aria-label={t.nav.register}
                >
                  <UserPlus className="h-4 w-4 text-white" />
                </Button>
              </>
            )}

            {/* Язык  ;  смена языка в хедере*/} 
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                  <Globe className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer rounded-lg">
                  <span className="font-mono">EN</span> — English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ru")} className="cursor-pointer rounded-lg">
                  <span className="font-mono">RU</span> — Русский
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} mode={authMode} onModeChange={setAuthMode} />
    </>
  )
}