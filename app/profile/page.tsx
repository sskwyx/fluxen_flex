"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

export default function ProfilePage() {
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    router.push("/dashboard")
  }, [router])

  return null
}
