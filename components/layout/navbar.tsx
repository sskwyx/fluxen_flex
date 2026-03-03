"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Users, Package, HelpCircle, Info, Mail,
  User, UserPlus, Globe, LogOut, Shield,
  Server, Newspaper,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { AuthModal } from "@/components/auth/auth-modal"

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

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me")
        const data = await res.json()
        if (data.user) {
          setIsAuthenticated(true)
          setUsername(data.user.username || data.user.email)
          setIsAdmin(data.user.role === "admin")
        } else {
          setIsAuthenticated(false)
          setIsAdmin(false)
        }
      } catch {
        setIsAuthenticated(false)
        setIsAdmin(false)
      }
    }
    fetchUser()
  }, [])

  const navItems = [
    { href: "/",         icon: Users,       label: t.nav.home },
    { href: "/products", icon: Package,     label: t.nav.products },
    { href: "/news",     icon: Newspaper,   label: "Новости" },
    { href: "/rules",    icon: Server,      label: t.nav.rules },
    { href: "/faq",      icon: HelpCircle,  label: t.nav.faq },
    { href: "/about",    icon: Info,        label: t.nav.about },
    { href: "/contact",  icon: Mail,        label: t.nav.contact },
  ]

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("flex_user")
    setIsAuthenticated(false)
    setIsAdmin(false)
    setUsername("")
    window.dispatchEvent(new Event("authChange"))
    router.push("/")
  }

  const navContent = (
    <div className="flex items-center gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => setHoveredItem(item.href)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-all duration-200 relative z-10",
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white"
              )}
              aria-label={item.label}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap text-xs font-mono"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* tooltip */}
            <AnimatePresence>
              {hoveredItem === item.href && !isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/90 border border-white/10 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none font-mono"
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>

            {/* hover pill */}
            {hoveredItem === item.href && (
              <motion.div
                layoutId="navbar-highlight"
                className="absolute inset-0 rounded-full bg-white/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
                style={{ pointerEvents: "none" }}
              />
            )}
          </div>
        )
      })}

      {/* AUTH */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-primary/30 flex items-center justify-center transition-all duration-200">
              <User className="h-4 w-4 text-white/70" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl border-white/10 bg-black/90 backdrop-blur-xl">
            <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer rounded-xl font-mono text-sm">
              📦 {t.dashboard.title}
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={() => router.push("/admin")} className="cursor-pointer rounded-xl font-mono text-sm text-primary">
                <Shield className="h-4 w-4 mr-2 inline" /> Админка
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-xl font-mono text-sm text-red-400">
              <LogOut className="h-4 w-4 mr-2 inline" /> {t.auth.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <button
            onClick={() => openAuthModal("login")}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all duration-200"
            aria-label={t.nav.login}
          >
            <User className="h-4 w-4 text-white/70" />
          </button>
          <button
            onClick={() => openAuthModal("register")}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all duration-200"
            aria-label={t.nav.register}
          >
            <UserPlus className="h-4 w-4 text-white/70" />
          </button>
        </>
      )}

      {/* LANGUAGE */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all duration-200">
            <Globe className="h-4 w-4 text-white/70" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-2xl border-white/10 bg-black/90 backdrop-blur-xl">
          <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer rounded-xl font-mono text-sm">
            EN — English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("ru")} className="cursor-pointer rounded-xl font-mono text-sm">
            RU — Русский
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-4xl">
        <div className="rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl px-5">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/"
              className="font-mono text-xl font-bold text-white hover:text-primary transition-colors shrink-0"
            >
              flex
            </Link>
            {mounted ? navContent : (
              <div className="flex items-center gap-2">
                {navItems.map((item) => (
                  <div key={item.href} className="w-9 h-9 rounded-full bg-white/10" />
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}