"use client"

import { createElement } from "react"
import { ClipboardList, Home, LayoutDashboard, MoreHorizontal, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MobileMainTab } from "@/types/mobile"

const TAB_CONFIG: Record<
  MobileMainTab,
  { label: string; icon: LucideIcon; shortLabel?: string }
> = {
  home: { label: "Home", icon: Home },
  operazioni: { label: "Operazioni", icon: LayoutDashboard, shortLabel: "Ops" },
  prenotazioni: { label: "Prenotazioni", icon: ClipboardList, shortLabel: "Preno" },
  altro: { label: "Altro", icon: MoreHorizontal },
}

export type MobileBottomNavProps = {
  active: MobileMainTab
  onChange: (tab: MobileMainTab) => void
  className?: string
}

export function MobileBottomNav({ active, onChange, className }: MobileBottomNavProps) {
  const tabs = Object.keys(TAB_CONFIG) as MobileMainTab[]

  return (
    <nav
      aria-label="Navigazione principale"
      className={cn(
        "fixed right-0 bottom-0 left-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between gap-0 px-1 pt-1">
        {tabs.map((tab) => {
          const cfg = TAB_CONFIG[tab]
          const isActive = active === tab
          const Icon = cfg.icon
          return (
            <Button
              key={tab}
              type="button"
              variant="ghost"
              size="sm"
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "h-auto min-w-0 flex-1 flex-col gap-0.5 rounded-lg py-2 text-[10px] font-medium",
                isActive ? "text-sky-800 bg-sky-50" : "text-slate-600"
              )}
              onClick={() => onChange(tab)}
            >
              {createElement(Icon, { className: "size-5 shrink-0", "aria-hidden": true })}
              <span className="truncate">{cfg.shortLabel ?? cfg.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
