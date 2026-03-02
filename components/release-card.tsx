"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Copy, Check, Shield } from "lucide-react"
import { SecurityModal } from "@/components/security-modal"
import { useLanguage } from "@/lib/language-context"

interface ReleaseCardProps {
  name: string
  version: string
  description: string
  date: string
  sha256: string
  downloadUrl: string
  category: string
}

export function ReleaseCard({ name, version, description, date, sha256, downloadUrl, category }: ReleaseCardProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { t } = useLanguage()

  const copyHash = async () => {
    await navigator.clipboard.writeText(sha256)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Card className="group flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 animate-fade-in bg-card/50 backdrop-blur-sm rounded-2xl">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1">
              <CardTitle className="font-mono text-lg group-hover:text-primary transition-colors flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                {name}
              </CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </div>
            <Badge variant="secondary" className="shrink-0 rounded-full font-mono text-xs px-3 py-1">
              {category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{t.releases.version}:</span>
              <span className="font-mono text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full text-xs">
                {version}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{t.releases.released}:</span>
              <span className="font-mono text-xs">{date}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {t.releases.sha256}
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-xl bg-secondary/50 px-3 py-2 font-mono text-xs break-all border border-border/50">
                {sha256}
              </code>
              <Button size="sm" variant="ghost" onClick={copyHash} className="shrink-0 rounded-full">
                {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Button
            className="w-full rounded-full group/btn transition-all hover:scale-105"
            onClick={() => setModalOpen(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            {t.releases.download} {name}
          </Button>
        </CardFooter>
      </Card>

      <SecurityModal open={modalOpen} onOpenChange={setModalOpen} releaseName={name} downloadUrl={downloadUrl} />
    </>
  )
}
