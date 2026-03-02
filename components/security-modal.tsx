"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { AlertTriangle, Download, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface SecurityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  releaseName: string
  downloadUrl: string
}

export function SecurityModal({ open, onOpenChange, releaseName, downloadUrl }: SecurityModalProps) {
  const [checks, setChecks] = useState({
    legal: false,
    purpose: false,
    responsibility: false,
    verification: false,
  })
  const [isDownloading, setIsDownloading] = useState(false)
  const { t } = useLanguage()

  const allChecked = Object.values(checks).every(Boolean)

  const handleDownload = async () => {
    if (allChecked && !isDownloading) {
      setIsDownloading(true)
      try {
        // Call the API endpoint to get the file
        const response = await fetch(downloadUrl)

        if (!response.ok) {
          throw new Error("Download failed")
        }

        // Get the blob from response
        const blob = await response.blob()

        // Create download link
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${releaseName.replace(/\s+/g, "_")}.zip`
        document.body.appendChild(link)
        link.click()

        // Cleanup
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        onOpenChange(false)
        setChecks({
          legal: false,
          purpose: false,
          responsibility: false,
          verification: false,
        })
      } catch (error) {
        console.error("Download error:", error)
        alert("Download failed. Please try again.")
      } finally {
        setIsDownloading(false)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl animate-fade-in border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
            {t.security.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {t.security.description} <span className="font-mono text-primary font-semibold">{releaseName}</span>,{" "}
            {t.security.pleaseConfirm}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <Field
            orientation="horizontal"
            className="items-start transition-all hover:bg-secondary/30 p-3 rounded-lg border border-transparent hover:border-primary/20"
          >
            <Checkbox
              id="legal"
              checked={checks.legal}
              onCheckedChange={(checked) => setChecks({ ...checks, legal: checked as boolean })}
              className="mt-1"
            />
            <FieldLabel htmlFor="legal" className="font-normal leading-relaxed text-sm">
              {t.security.legal}
            </FieldLabel>
          </Field>

          <Field
            orientation="horizontal"
            className="items-start transition-all hover:bg-secondary/30 p-3 rounded-lg border border-transparent hover:border-primary/20"
          >
            <Checkbox
              id="purpose"
              checked={checks.purpose}
              onCheckedChange={(checked) => setChecks({ ...checks, purpose: checked as boolean })}
              className="mt-1"
            />
            <FieldLabel htmlFor="purpose" className="font-normal leading-relaxed text-sm">
              {t.security.purpose}
            </FieldLabel>
          </Field>

          <Field
            orientation="horizontal"
            className="items-start transition-all hover:bg-secondary/30 p-3 rounded-lg border border-transparent hover:border-primary/20"
          >
            <Checkbox
              id="responsibility"
              checked={checks.responsibility}
              onCheckedChange={(checked) => setChecks({ ...checks, responsibility: checked as boolean })}
              className="mt-1"
            />
            <FieldLabel htmlFor="responsibility" className="font-normal leading-relaxed text-sm">
              {t.security.responsibility}
            </FieldLabel>
          </Field>

          <Field
            orientation="horizontal"
            className="items-start transition-all hover:bg-secondary/30 p-3 rounded-lg border border-transparent hover:border-primary/20"
          >
            <Checkbox
              id="verification"
              checked={checks.verification}
              onCheckedChange={(checked) => setChecks({ ...checks, verification: checked as boolean })}
              className="mt-1"
            />
            <FieldLabel htmlFor="verification" className="font-normal leading-relaxed text-sm">
              {t.security.verification}
            </FieldLabel>
          </Field>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="transition-all hover:scale-105 hover:border-primary/50"
            disabled={isDownloading}
          >
            {t.security.cancel}
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!allChecked || isDownloading}
            className="transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                {t.security.proceed}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
