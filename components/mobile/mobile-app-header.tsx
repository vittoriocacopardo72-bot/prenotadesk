"use client"

import { ChevronLeft, Menu, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type MobileAppHeaderProps = {
  title: string
  showBack?: boolean
  onBack?: () => void
  showSearch?: boolean
  /** Side navigation (full module list). Hidden when `showBack` is true. */
  showMenuTrigger?: boolean
  onMenuOpen?: () => void
  /** Tighter header + search for cockpit / home. */
  compact?: boolean
  className?: string
}

export function MobileAppHeader({
  title,
  showBack,
  onBack,
  showSearch = true,
  showMenuTrigger,
  onMenuOpen,
  compact,
  className,
}: MobileAppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-slate-200 bg-slate-50/95 px-4 backdrop-blur-md",
        compact ? "pt-2 pb-2" : "pt-3 pb-3",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {showBack ? (
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Indietro"
            onClick={onBack}
          >
            <ChevronLeft className="size-4" />
          </Button>
        ) : showMenuTrigger && onMenuOpen ? (
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Apri menu"
            onClick={onMenuOpen}
          >
            <Menu className="size-4" />
          </Button>
        ) : null}
        <h1 className="min-w-0 flex-1 truncate text-base font-semibold tracking-tight">{title}</h1>
        <div className="flex shrink-0 items-center gap-1.5">
          <Badge className="bg-emerald-100 text-[10px] text-emerald-800 hover:bg-emerald-100">
            Operativo
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            VM
          </Badge>
        </div>
      </div>
      {showSearch ? (
        <div className={cn("relative", compact ? "mt-2" : "mt-3")}>
          <Search
            className={cn(
              "pointer-events-none absolute left-2.5 size-4 text-slate-400",
              compact ? "top-2" : "top-2.5"
            )}
          />
          <Input
            type="search"
            placeholder="Cerca prenotazioni, barche o clienti..."
            className={cn("pl-9 text-sm", compact ? "h-9 text-xs" : "h-10")}
          />
        </div>
      ) : null}
    </header>
  )
}
