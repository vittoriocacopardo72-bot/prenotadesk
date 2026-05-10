"use client"

import { useState } from "react"

import { createBooking } from "@/lib/actions"
import { dashboardFleetLive } from "@/lib/mock/dashboard"
import type { ActionResult, CreateBookingInput } from "@/types/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

export type CreateBookingSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onResult: (result: ActionResult<{ bookingId: string }>) => void
}

const INITIAL: CreateBookingInput = {
  customerName: "",
  phone: "",
  boatName: "",
  service: "",
  date: "",
  time: "",
  guests: 1,
  notes: "",
}

export function CreateBookingSheet({ open, onOpenChange, onResult }: CreateBookingSheetProps) {
  const [form, setForm] = useState<CreateBookingInput>(INITIAL)
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof CreateBookingInput>(key: K, value: CreateBookingInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function submit() {
    setSubmitting(true)
    const res = await createBooking(form)
    setSubmitting(false)
    onResult(res)
    if (res.status === "success") {
      setForm(INITIAL)
      onOpenChange(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[92vh] gap-0 p-0" showCloseButton>
        <SheetHeader className="border-b border-slate-200 p-4">
          <SheetTitle>Nuova prenotazione</SheetTitle>
        </SheetHeader>
        <div className="max-h-[62vh] space-y-3 overflow-y-auto p-4">
          <div className="space-y-1.5">
            <Label htmlFor="mobile-booking-name">Cliente</Label>
            <Input id="mobile-booking-name" value={form.customerName} onChange={(e) => update("customerName", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-booking-phone">Telefono</Label>
            <Input id="mobile-booking-phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-booking-boat">Barca</Label>
            <Input
              id="mobile-booking-boat"
              list="boat-options"
              value={form.boatName}
              onChange={(e) => update("boatName", e.target.value)}
            />
            <datalist id="boat-options">
              {dashboardFleetLive.map((boat) => (
                <option key={boat.nome} value={boat.nome} />
              ))}
            </datalist>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-booking-service">Servizio</Label>
            <Input id="mobile-booking-service" value={form.service} onChange={(e) => update("service", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label htmlFor="mobile-booking-date">Data</Label>
              <Input id="mobile-booking-date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mobile-booking-time">Ora</Label>
              <Input id="mobile-booking-time" type="time" value={form.time} onChange={(e) => update("time", e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-booking-guests">Ospiti</Label>
            <Input
              id="mobile-booking-guests"
              type="number"
              min={1}
              value={form.guests}
              onChange={(e) => update("guests", Number(e.target.value || 1))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-booking-notes">Note</Label>
            <Textarea
              id="mobile-booking-notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Note operative..."
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
                onResult({ status: "cancelled", message: "Creazione prenotazione annullata." })
              }}
            >
              Annulla
            </Button>
            <Button type="button" onClick={() => void submit()} disabled={submitting}>
              {submitting ? "Salvataggio..." : "Crea"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
