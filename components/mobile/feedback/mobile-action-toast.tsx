"use client"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MobileFeedbackState } from "@/types/mobile-flows"

export type MobileActionToastProps = {
  feedback: MobileFeedbackState | null
  onClose: () => void
}

export function MobileActionToast({ feedback, onClose }: MobileActionToastProps) {
  if (!feedback) return null

  const toneClass =
    feedback.tone === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : feedback.tone === "cancelled"
        ? "border-slate-200 bg-slate-100 text-slate-800"
        : "border-red-200 bg-red-50 text-red-900"

  return (
    <div className="pointer-events-none fixed right-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] left-3 z-50">
      <div className={cn("pointer-events-auto rounded-xl border px-3 py-2 shadow-sm", toneClass)}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">{feedback.title}</p>
            {feedback.detail ? <p className="mt-0.5 text-xs opacity-90">{feedback.detail}</p> : null}
          </div>
          <Button type="button" size="icon-sm" variant="ghost" onClick={onClose} aria-label="Chiudi feedback">
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
