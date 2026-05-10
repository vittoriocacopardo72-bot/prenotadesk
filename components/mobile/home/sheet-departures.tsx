"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { ComponentProps } from "react"

export type DepartureItem = {
  ora: string
  barca: string
  servizio: string
  stato: string
}

function statusVariant(status: string): ComponentProps<typeof Badge>["variant"] {
  if (status === "Confermata") return "default"
  if (status === "Imbarco") return "secondary"
  return "outline"
}

export type MobileDeparturesSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  departures: readonly DepartureItem[]
  onOpenOperazioni: () => void
}

export function MobileDeparturesSheet({
  open,
  onOpenChange,
  departures,
  onOpenOperazioni,
}: MobileDeparturesSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[88vh] gap-0 p-0" showCloseButton>
        <SheetHeader className="border-b border-slate-200 p-4 text-left">
          <SheetTitle>Partenze</SheetTitle>
          <SheetDescription>Prossime uscite e stato imbarco.</SheetDescription>
        </SheetHeader>
        <div className="max-h-[55vh] space-y-2 overflow-y-auto p-4">
          {departures.length === 0 ? (
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
              Nessuna partenza imminente.
            </p>
          ) : (
            departures.map((row) => (
              <div
                key={`${row.ora}-${row.barca}`}
                className="flex items-start justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {row.ora} · {row.barca}
                  </p>
                  <p className="truncate text-xs text-slate-600">{row.servizio}</p>
                </div>
                <Badge variant={statusVariant(row.stato)} className="shrink-0 text-[10px]">
                  {row.stato}
                </Badge>
              </div>
            ))
          )}
        </div>
        <SheetFooter className="border-t border-slate-200 p-4">
          <Button type="button" className="w-full" variant="secondary" onClick={onOpenOperazioni}>
            Timeline e centro operativo
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
