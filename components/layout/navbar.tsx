"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Users, Package, HelpCircle, Info, Mail,
  User, UserPlus, LogOut, Shield,
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
import Image from "next/image"

function Avatar({ username }: { username: string }) {
  const letter = username?.[0]?.toUpperCase() ?? "?"
  const colors = ["from-violet-500 to-primary", "from-blue-500 to-cyan-400", "from-emerald-500 to-teal-400", "from-orange-500 to-yellow-400"]
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
  const { language, setLanguage, t } = useLanguage()
  const [authModalOpen, setAuthModalOpen]     = useState(false)
  const [authMode, setAuthMode]               = useState<"login" | "register">("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername]               = useState("")
  const [isAdmin, setIsAdmin]                 = useState(false)
  const [mounted, setMounted]                 = useState(false)
  const [mobileOpen, setMobileOpen]           = useState(false)
  const [serverModalOpen, setServerModalOpen] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  useEffect(() => {
    fetch("/api/me").then(r => r.json()).then(d => {
      if (d.user) { setIsAuthenticated(true); setUsername(d.user.username || d.user.email); setIsAdmin(d.user.role === "admin") }
    }).catch(() => {})
  }, [])

  const navItems = [
    { href: "/",         icon: Users,      label: t.nav.home     },
    { href: "/products", icon: Package,    label: t.nav.products },
    { href: "/news",     icon: Newspaper,  label: t.nav.news     },
    { href: "/rules",    icon: Server,     label: t.nav.rules    },
    { href: "/faq",      icon: HelpCircle, label: t.nav.faq      },
    { href: "/about",    icon: Info,       label: t.nav.about    },
    { href: "/contact",  icon: Mail,       label: t.nav.contact  },
  ]

  const openAuthModal = (mode: "login" | "register") => { setAuthMode(mode); setAuthModalOpen(true); setMobileOpen(false) }
  const handleLogout = () => {
    localStorage.removeItem("flex_user")
    setIsAuthenticated(false); setIsAdmin(false); setUsername("")
    window.dispatchEvent(new Event("authChange"))
    router.push("/"); setMobileOpen(false)
  }

  const toggleLanguage = () => setLanguage(language === "ru" ? "en" : "ru")

  return (
    <>
      <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pointer-events-auto flex items-center gap-1.5 rounded-full px-2.5 py-2"
          style={{
            background:     "rgba(8,8,8,0.82)",
            backdropFilter: "blur(24px)",
            border:         "1px solid rgba(255,255,255,0.1)",
            boxShadow:      "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
            minHeight:      52,
          }}>

          {/* Лого */}
          <Link href="/" className="flex items-center gap-2 px-2 py-1.5 rounded-full group">
            <div className="w-7 h-7 rounded-xl bg-primary/15 border border-primary/25 group-hover:bg-primary/25 group-hover:border-primary/40 flex items-center justify-center transition-all duration-200">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-mono text-sm font-bold text-white/80 group-hover:text-white transition-colors">flex</span>
          </Link>

          <div className="w-px h-5 bg-white/10" />

          {/* Навигация */}
          {mounted && (
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <div key={item.href} className="relative group/nav">
                    <Link href={item.href}
                      className={cn(
                        "relative flex items-center gap-2 px-3 py-2 rounded-full font-mono text-xs transition-all duration-200",
                        isActive ? "text-white" : "text-white/35 hover:text-white/65"
                      )}>
                      {isActive && (
                        <motion.div layoutId="nav-active"
                          className="absolute inset-0 rounded-full"
                          style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.13)" }}
                          transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                      <item.icon className="w-3.5 h-3.5 relative z-10 shrink-0" />
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden whitespace-nowrap relative z-10 text-xs font-mono font-medium">
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                    {!isActive && (
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-mono text-white/60 whitespace-nowrap pointer-events-none opacity-0 group-hover/nav:opacity-100 transition-all duration-150 translate-y-1 group-hover/nav:translate-y-0"
                        style={{ background: "rgba(0,0,0,0.92)", border: "1px solid rgba(255,255,255,0.1)", zIndex: 100 }}>
                        {item.label}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* Правая часть */}
          {mounted && (
            <div className="hidden md:flex items-center gap-1">

              {/* Сервер */}
              <button onClick={() => setServerModalOpen(true)} title="Статус сервера"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-emerald-500/10 transition-all duration-200 relative"
                style={{ border: "1px solid rgba(52,211,153,0.15)" }}>
                <Monitor className="w-3.5 h-3.5 text-emerald-400/70" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>

              {/* Язык — кнопка-свитчер с флагом */}
              <button onClick={toggleLanguage} title={language === "ru" ? "Switch to English" : "Переключить на русский"}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/8 transition-all duration-200 overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={language}
                    initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7, rotate: 10 }}
                    transition={{ duration: 0.18 }}
                    className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={`/${language}.png`}
                      alt={language}
                      width={20}
                      height={20}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Авторизация */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Avatar username={username} />
                      <span className="font-mono text-xs text-white/55 max-w-[72px] truncate">{username}</span>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl border-white/10 bg-black/92 backdrop-blur-xl min-w-[175px]">
                    <div className="px-3 py-2.5 border-b border-white/8 mb-1">
                      <p className="font-mono text-xs font-bold text-white">{username}</p>
                      <p className="font-mono text-[10px] text-white/30 mt-0.5">{isAdmin ? "Администратор" : "Игрок"}</p>
                    </div>
                    <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer rounded-xl font-mono text-sm">
                      📦 {t.dashboard.title}
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => router.push("/admin")} className="cursor-pointer rounded-xl font-mono text-sm text-primary">
                        <Shield className="h-3.5 w-3.5 mr-2 inline" />Админка
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-xl font-mono text-sm text-red-400 mt-1">
                      <LogOut className="h-3.5 w-3.5 mr-2 inline" />{t.auth.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-1">
                  {/* Войти */}
                  <button onClick={() => openAuthModal("login")} title="Войти"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white/75 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                    <User className="h-3.5 w-3.5" />
                  </button>
                  {/* Регистрация */}
                  <button onClick={() => openAuthModal("register")} title="Регистрация"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-primary/80 hover:text-primary transition-all duration-200"
                    style={{ background: "rgba(var(--primary-rgb),0.12)", border: "1px solid rgba(var(--primary-rgb),0.25)" }}>
                    <UserPlus className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Мобиль */}
          <div className="md:hidden flex items-center gap-1.5 ml-1">
            <button onClick={() => setServerModalOpen(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center relative"
              style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.18)" }}>
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
            <button onClick={() => setMobileOpen(v => !v)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="h-4 w-4" /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="h-4 w-4" /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>

        </motion.div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-20 left-3 right-3 z-50 md:hidden rounded-3xl overflow-hidden"
              style={{ background: "rgba(8,8,8,0.95)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(24px)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>

              {isAuthenticated && (
                <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <Avatar username={username} />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm font-bold text-white truncate">{username}</p>
                    <p className="font-mono text-[10px] text-white/25">{isAdmin ? "Администратор" : "Игрок"}</p>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              )}

              <div className="p-3 grid grid-cols-2 gap-1">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div key={item.href} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.025 }}>
                      <Link href={item.href}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 rounded-2xl transition-all font-mono text-xs border",
                          isActive ? "bg-primary/10 border-primary/20 text-white" : "text-white/35 hover:text-white/70 hover:bg-white/4 border-transparent"
                        )}>
                        <item.icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-primary" : "text-white/20")} />
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mx-3 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

              <div className="p-3 flex flex-col gap-1">
                {isAuthenticated ? (
                  <>
                    <button onClick={() => { router.push("/dashboard"); setMobileOpen(false) }}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl font-mono text-xs text-white/40 hover:text-white hover:bg-white/5 transition-all">
                      <User className="h-3.5 w-3.5 text-white/20" />{t.dashboard.title}
                    </button>
                    {isAdmin && (
                      <button onClick={() => { router.push("/admin"); setMobileOpen(false) }}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl font-mono text-xs text-primary/50 hover:text-primary hover:bg-primary/5 transition-all">
                        <Shield className="h-3.5 w-3.5" />Админка
                      </button>
                    )}
                    <button onClick={handleLogout}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl font-mono text-xs text-red-400/40 hover:text-red-400 hover:bg-red-500/5 transition-all">
                      <LogOut className="h-3.5 w-3.5" />{t.auth.logout}
                    </button>
                  </>
                ) : (
                  <div className="flex gap-1.5">
                    <button onClick={() => openAuthModal("login")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl font-mono text-xs text-white/40 hover:text-white transition-all"
                      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                      <User className="h-3.5 w-3.5" />Войти
                    </button>
                    <button onClick={() => openAuthModal("register")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl font-mono text-xs text-primary font-bold transition-all hover:opacity-80"
                      style={{ background: "rgba(var(--primary-rgb),0.1)", border: "1px solid rgba(var(--primary-rgb),0.2)" }}>
                      <UserPlus className="h-3.5 w-3.5" />Регистрация
                    </button>
                  </div>
                )}
                {/* Язык в мобиле new */}
                <button onClick={toggleLanguage}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl font-mono text-xs text-white/35 hover:text-white hover:bg-white/5 transition-all mt-0.5">
                  <div className="w-4 h-4 rounded-full overflow-hidden shrink-0">
                    <Image src={`/${language}.png`} alt={language} width={16} height={16} className="w-full h-full object-cover" />
                  </div>
                  {language === "ru" ? "Русский → English" : "English → Русский"}
                </button>
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