"use client"

import { createElement } from "react"
import {
  Anchor,
  Banknote,
  CalendarDays,
  CloudSun,
  Gauge,
  Lock,
  UserPlus,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const ACTION_ICONS: Record<string, LucideIcon> = {
  "Nuova prenotazione": UserPlus,
  "Assegna equipaggio": Anchor,
  "Registra pagamento": Banknote,
  "Blocca barca": Lock,
  "Apri calendario": CalendarDays,
  "Aggiorna meteo": CloudSun,
}

function actionIcon(label: string): LucideIcon {
  return ACTION_ICONS[label] ?? Gauge
}

export type MobileQuickActionsGridProps = {
  actions: readonly string[]
  onAction?: (label: string) => void
  className?: string
}

export function MobileQuickActionsGrid({
  actions,
  onAction,
  className,
}: MobileQuickActionsGridProps) {
  return (
    <Card className={cn("border-slate-200 bg-white shadow-xs", className)} size="sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Azioni rapide</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 pt-0">
        {actions.map((label) => {
          const Icon = actionIcon(label)
          return (
            <Button
              key={label}
              type="button"
              variant="outline"
              size="default"
              className="h-auto min-h-14 flex-col gap-1 py-3 text-center text-xs font-medium shadow-none"
              onClick={() => onAction?.(label)}
            >
              {createElement(Icon, { className: "size-4 shrink-0 opacity-80", "aria-hidden": true })}
              <span className="line-clamp-2 w-full leading-tight">{label}</span>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
