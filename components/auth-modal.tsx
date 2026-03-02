"use client"

import type React from "react"
import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useLanguage } from "@/lib/language-context"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "login" | "register"
  onModeChange: (mode: "login" | "register") => void
}

export function AuthModal({
  open,
  onOpenChange,
  mode,
  onModeChange,
}: AuthModalProps) {
  const { t } = useLanguage()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const resetForm = () => {
    setUsername("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Passwords do not match",
          })
          setLoading(false)
          return
        }

        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        })

        const data = await response.json()

        if (!response.ok)
          throw new Error(data.error || "Registration failed")

        toast({
          title: "Success!",
          description: "Account created successfully.",
        })

        onModeChange("login")
        resetForm()
      } else {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (!response.ok)
          throw new Error(data.error || "Login failed")

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })

        localStorage.setItem("rumi_user", JSON.stringify(data.user))
        window.dispatchEvent(new Event("authChange"))

        onOpenChange(false)
        resetForm()
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
        sm:max-w-md
        bg-zinc-900/80
        backdrop-blur-2xl
        border border-white/10
        rounded-2xl
        shadow-2xl
        p-7
      "
      >
        <DialogHeader>
          <DialogTitle
            className="
            text-3xl
            font-bold
            text-center
            font-mono
            bg-gradient-to-r
            from-white
            to-zinc-400
            bg-clip-text
            text-transparent
          "
          >
            {mode === "login"
              ? t.auth.login.title
              : t.auth.register.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {mode === "register" && (
            <Field
              label={t.auth.register.username}
              id="username"
            >
              <Input
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                disabled={loading}
                required
                className="auth-input"
              />
            </Field>
          )}

          <Field
            label={
              mode === "login"
                ? t.auth.login.email
                : t.auth.register.email
            }
            id="email"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              disabled={loading}
              required
              className="auth-input"
            />
          </Field>

          <PasswordField
            label={
              mode === "login"
                ? t.auth.login.password
                : t.auth.register.password
            }
            value={password}
            setValue={setPassword}
            visible={showPassword}
            setVisible={setShowPassword}
            loading={loading}
          />

          {mode === "register" && (
            <PasswordField
              label={t.auth.register.confirmPassword}
              value={confirmPassword}
              setValue={setConfirmPassword}
              visible={showConfirmPassword}
              setVisible={setShowConfirmPassword}
              loading={loading}
            />
          )}

          <Button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              h-11
              font-semibold
              bg-white
              text-black
              hover:bg-white/90
              transition-all
            "
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mode === "login"
              ? t.auth.login.submit
              : t.auth.register.submit}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                {t.auth.login.noAccount}{" "}
                <SwitchMode
                  onClick={() => {
                    onModeChange("register")
                    resetForm()
                  }}
                >
                  {t.auth.login.registerLink}
                </SwitchMode>
              </>
            ) : (
              <>
                {t.auth.register.hasAccount}{" "}
                <SwitchMode
                  onClick={() => {
                    onModeChange("login")
                    resetForm()
                  }}
                >
                  {t.auth.register.loginLink}
                </SwitchMode>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ---------- UI helpers ---------- */

function Field({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

function PasswordField({
  label,
  value,
  setValue,
  visible,
  setVisible,
  loading,
}: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          disabled={loading}
          required
          className="auth-input pr-10"
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
        >
          {visible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  )
}

function SwitchMode({
  children,
  onClick,
}: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white font-medium hover:underline"
    >
      {children}
    </button>
  )
}