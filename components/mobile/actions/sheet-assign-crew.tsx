"use client"

import { useState } from "react"

import { assignCrew } from "@/lib/actions"
import { useAppStoreSelector } from "@/lib/store/app-store"
import type { ActionResult, AssignCrewInput } from "@/types/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

export type AssignCrewSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onResult: (result: ActionResult<{ assignmentId: string }>) => void
}

const INITIAL: AssignCrewInput = {
  departureRef: "",
  crewName: "",
  notes: "",
}

export function AssignCrewSheet({ open, onOpenChange, onResult }: AssignCrewSheetProps) {
  const [form, setForm] = useState<AssignCrewInput>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const bookings = useAppStoreSelector((s) => s.bookings.slice(0, 12))

  async function submit() {
    setSubmitting(true)
    const res = await assignCrew(form)
    setSubmitting(false)
    onResult(res)
    if (res.status === "success") {
      setForm(INITIAL)
      onOpenChange(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[88vh] gap-0 p-0" showCloseButton>
        <SheetHeader className="border-b border-slate-200 p-4">
          <SheetTitle>Assegna equipaggio</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 p-4">
          <div className="space-y-1.5">
            <Label htmlFor="mobile-crew-dep">Partenza</Label>
            <Input
              id="mobile-crew-dep"
              list="departure-options"
              value={form.departureRef}
              onChange={(e) => setForm((prev) => ({ ...prev, departureRef: e.target.value }))}
              placeholder="Seleziona partenza"
            />
            <datalist id="departure-options">
              {bookings.map((dep) => (
                <option key={dep.id} value={`${dep.ora} ${dep.barca}`} />
              ))}
            </datalist>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-crew-name">Equipaggio</Label>
            <Input
              id="mobile-crew-name"
              value={form.crewName}
              onChange={(e) => setForm((prev) => ({ ...prev, crewName: e.target.value }))}
              placeholder="Es. Marco + Luca"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-crew-notes">Note</Label>
            <Textarea
              id="mobile-crew-notes"
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Indicazioni operative..."
            />
          </div>
        </div>
        <SheetFooter className="border-t border-slate-200 p-4">
          <div className="grid w-full grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                onResult({ status: "cancelled", message: "Assegnazione annullata." })
              }}
            >
              Annulla
            </Button>
            <Button type="button" onClick={() => void submit()} disabled={submitting}>
              {submitting ? "Assegnazione..." : "Assegna"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
