import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type CockpitStatusTone = "ok" | "warn" | "risk"

export type CockpitStatusBarProps = {
  tone: CockpitStatusTone
  line: string
  /** Short badge for data scope (avoid implying live cloud sync). */
  badgeLabel?: string
  className?: string
}

const toneClass: Record<CockpitStatusTone, string> = {
  ok: "bg-emerald-500",
  warn: "bg-amber-500",
  risk: "bg-red-500",
}

export function CockpitStatusBar({ tone, line, badgeLabel = "Locale", className }: CockpitStatusBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2",
        className
      )}
    >
      <span className={cn("size-2 shrink-0 rounded-full", toneClass[tone])} aria-hidden />
      <p className="min-w-0 flex-1 truncate text-xs font-medium text-slate-800">{line}</p>
      <Badge variant="outline" className="shrink-0 border-slate-200 px-1.5 py-0 text-[10px]" title="Dati su questo dispositivo">
        {badgeLabel}
      </Badge>
    </div>
  )
}
