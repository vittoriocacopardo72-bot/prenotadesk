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

export type MobileAlertsSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  alerts: readonly string[]
  onOpenOperazioni: () => void
}

export function MobileAlertsSheet({
  open,
  onOpenChange,
  alerts,
  onOpenOperazioni,
}: MobileAlertsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[88vh] gap-0 p-0" showCloseButton>
        <SheetHeader className="border-b border-slate-200 p-4 text-left">
          <SheetTitle>Centro alert</SheetTitle>
          <SheetDescription>Tutti gli avvisi operativi attivi.</SheetDescription>
        </SheetHeader>
        <div className="max-h-[55vh] space-y-2 overflow-y-auto p-4">
          {alerts.map((alert) => (
            <p
              key={alert}
              className="rounded-lg border border-amber-200/90 bg-amber-50 px-3 py-2.5 text-sm leading-snug text-amber-950"
            >
              {alert}
            </p>
          ))}
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
