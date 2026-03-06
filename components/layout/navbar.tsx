"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Users, Package, HelpCircle, Info, Mail,
  User, UserPlus, Globe, LogOut, Shield,
  Server, Newspaper, Menu, X, Sparkles, Monitor,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { AuthModal } from "@/components/auth/auth-modal"
import { ServerStatusModal } from "@/components/home/server-status-modal"

function Avatar({ username }: { username: string }) {
  const letter = username?.[0]?.toUpperCase() ?? "?"
  const colors = [
    "from-violet-500 to-primary",
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-orange-500 to-yellow-400",
  ]
  const color = colors[username.charCodeAt(0) % colors.length]
  return (
    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-black font-black text-[10px] font-mono shrink-0`}>
      {letter}
    </div>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { setLanguage, t } = useLanguage()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [serverModalOpen, setServerModalOpen] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

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
          setUsername("")
        }
      } catch {
        setIsAuthenticated(false)
        setIsAdmin(false)
      }
    }
    fetchUser()
  }, [])

  const navItems = [
    { href: "/",         icon: Users,      label: t.nav.home },
    { href: "/products", icon: Package,    label: t.nav.products },
    { href: "/news",     icon: Newspaper,  label: t.nav.news },
    { href: "/rules",    icon: Server,     label: t.nav.rules },
    { href: "/faq",      icon: HelpCircle, label: t.nav.faq },
    { href: "/about",    icon: Info,       label: t.nav.about },
    { href: "/contact",  icon: Mail,       label: t.nav.contact },
  ]

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
    setMobileOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("flex_user")
    setIsAuthenticated(false)
    setIsAdmin(false)
    setUsername("")
    window.dispatchEvent(new Event("authChange"))
    router.push("/")
    setMobileOpen(false)
  }

  const desktopNav = (
    <div className="hidden md:flex items-center gap-1.5">

      <button
        onClick={() => setServerModalOpen(true)}
        className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 hover:bg-emerald-500/15 hover:border-emerald-500/30 px-3 py-1.5 transition-all duration-200 mr-1"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <Monitor className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-mono text-xs text-emerald-400">Сервер</span>
      </button>

      <div className="w-px h-5 bg-white/10 mr-1" />

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
                isActive ? "text-white" : "text-white/50 hover:text-white"
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
                  >{item.label}</motion.span>
                )}
              </AnimatePresence>
            </Link>

            {isActive && (
              <motion.div
                layoutId="navbar-active"
                className="absolute inset-0 rounded-full bg-white/12 border border-white/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                style={{ pointerEvents: "none" }}
              />
            )}

            {hoveredItem === item.href && !isActive && (
              <motion.div
                layoutId="navbar-hover"
                className="absolute inset-0 rounded-full bg-white/6"
                transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
                style={{ pointerEvents: "none" }}
              />
            )}

            <AnimatePresence>
              {hoveredItem === item.href && !isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.92 }}
                  transition={{ duration: 0.12 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/95 border border-white/10 text-white/70 text-[11px] rounded-lg whitespace-nowrap pointer-events-none font-mono z-50"
                >{item.label}</motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}

      <div className="w-px h-5 bg-white/10 mx-1" />

      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 px-2.5 py-1.5 transition-colors duration-200"
            >
              <Avatar username={username} />
              <span className="font-mono text-xs text-white/60 max-w-[64px] truncate">{username}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl border-white/10 bg-black/90 backdrop-blur-xl min-w-[160px]">
            <div className="px-3 py-2.5 border-b border-white/8 mb-1">
              <p className="font-mono text-xs font-bold text-white">{username}</p>
              <p className="font-mono text-[10px] text-white/30 mt-0.5">{isAdmin ? "Администратор" : "Игрок"}</p>
            </div>
            <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer rounded-xl font-mono text-sm">
              📦 {t.dashboard.title}
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={() => router.push("/admin")} className="cursor-pointer rounded-xl font-mono text-sm text-primary">
                <Shield className="h-4 w-4 mr-2 inline" /> Админка
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-xl font-mono text-sm text-red-400 mt-1">
              <LogOut className="h-4 w-4 mr-2 inline" /> {t.auth.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-1">
          <button
            onClick={() => openAuthModal("login")}
            className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all duration-200"
          ><User className="h-4 w-4 text-white/60" /></button>
          <button
            onClick={() => openAuthModal("register")}
            className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 flex items-center justify-center transition-all duration-200"
          ><UserPlus className="h-4 w-4 text-primary/80" /></button>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 flex items-center justify-center transition-all duration-200">
            <Globe className="h-4 w-4 text-white/40" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-2xl border-white/10 bg-black/90 backdrop-blur-xl">
          <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer rounded-xl font-mono text-sm">EN — English</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("ru")} className="cursor-pointer rounded-xl font-mono text-sm">RU — Русский</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-4xl">
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

        <div className="rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl shadow-black/30 px-4">
          <div className="flex h-14 items-center justify-between gap-2">

            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-7 h-7 rounded-xl bg-primary/15 border border-primary/20 group-hover:bg-primary/25 group-hover:border-primary/35 flex items-center justify-center transition-all duration-200">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="font-mono text-base font-bold text-white group-hover:text-primary transition-colors duration-200">flex</span>
            </Link>

            {mounted ? desktopNav : (
              <div className="hidden md:flex items-center gap-1.5">
                {navItems.map((item) => (
                  <div key={item.href} className="w-9 h-9 rounded-full bg-white/5 border border-white/8 animate-pulse" />
                ))}
              </div>
            )}

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setServerModalOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 hover:bg-emerald-500/15 px-2.5 py-1.5 transition-all duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="h-4 w-4 text-white/70" /></motion.div>
                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="h-4 w-4 text-white/70" /></motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <div className="rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl overflow-hidden">

                {isAuthenticated && (
                  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
                    <Avatar username={username} />
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-bold text-white truncate">{username}</p>
                      <p className="font-mono text-[10px] text-white/30">{isAdmin ? "Администратор" : "Игрок"}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-mono text-[10px] text-white/30">онлайн</span>
                    </div>
                  </div>
                )}

                <div className="p-3 grid grid-cols-2 gap-1">
                  {navItems.map((item, i) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.div key={item.href} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2.5 rounded-2xl transition-all duration-200 border",
                            isActive
                              ? "bg-primary/12 border-primary/20 text-white"
                              : "text-white/40 hover:text-white hover:bg-white/5 border-transparent"
                          )}
                        >
                          <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "text-white/30")} />
                          <span className="font-mono text-xs truncate">{item.label}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="h-px bg-white/8 mx-3" />

                <div className="p-3 space-y-1">
                  {isAuthenticated ? (
                    <>
                      <button onClick={() => { router.push("/dashboard"); setMobileOpen(false) }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200">
                        <User className="h-4 w-4 text-white/30" />
                        <span className="font-mono text-xs">{t.dashboard.title}</span>
                      </button>
                      {isAdmin && (
                        <button onClick={() => { router.push("/admin"); setMobileOpen(false) }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200">
                          <Shield className="h-4 w-4" />
                          <span className="font-mono text-xs">Админка</span>
                        </button>
                      )}
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-red-400/50 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200">
                        <LogOut className="h-4 w-4" />
                        <span className="font-mono text-xs">{t.auth.logout}</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => openAuthModal("login")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 font-mono text-xs text-white/50 hover:text-white transition-all duration-200">
                        <User className="h-3.5 w-3.5" />Войти
                      </button>
                      <button onClick={() => openAuthModal("register")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/20 font-mono text-xs text-primary transition-all duration-200">
                        <UserPlus className="h-3.5 w-3.5" />Регистрация
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => { setServerModalOpen(true); setMobileOpen(false) }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-200"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <span className="font-mono text-xs text-emerald-400">Статус сервера</span>
                    <Monitor className="h-3.5 w-3.5 text-emerald-400 ml-auto" />
                  </button>

                  <div className="flex gap-1.5 pt-0.5">
                    {["ru", "en"].map((lang) => (
                      <button key={lang} onClick={() => setLanguage(lang as "ru" | "en")} className="flex-1 py-2 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 font-mono text-[11px] text-white/30 hover:text-white transition-all duration-200 uppercase tracking-widest">
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} mode={authMode} onModeChange={setAuthMode} />
      <ServerStatusModal open={serverModalOpen} onClose={() => setServerModalOpen(false)} />
    </>
  )
}