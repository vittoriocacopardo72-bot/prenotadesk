"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { AlertItem } from "@/types/domain"

export type MobileAlertsSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  alerts: readonly AlertItem[]
  onOpenOperazioni: () => void
  onResolveAlert?: (alertId: string) => void
}

export function MobileAlertsSheet({
  open,
  onOpenChange,
  alerts,
  onOpenOperazioni,
  onResolveAlert,
}: MobileAlertsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[88vh] gap-0 p-0" showCloseButton>
        <SheetHeader className="border-b border-slate-200 p-4 text-left">
          <SheetTitle>Centro alert</SheetTitle>
          <SheetDescription>Tutti gli avvisi operativi attivi.</SheetDescription>
        </SheetHeader>
        <div className="max-h-[55vh] space-y-2 overflow-y-auto p-4">
          {alerts.length === 0 ? (
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
              Nessun alert attivo.
            </p>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border border-amber-200/90 bg-amber-50 px-3 py-2.5">
                <p className="text-sm leading-snug text-amber-950">{alert.text}</p>
                {onResolveAlert ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-1 h-auto px-0 text-xs text-amber-900"
                    onClick={() => onResolveAlert(alert.id)}
                  >
                    Segna come risolto
                  </Button>
                ) : null}
              </div>
            ))
          )}
        </div>
        <SheetFooter className="border-t border-slate-200 p-4">
          <Button type="button" className="w-full" variant="secondary" onClick={onOpenOperazioni}>
            Apri pannello operazioni completo
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
