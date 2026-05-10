"use client"

import { useState } from "react"

import { registerPayment } from "@/lib/actions"
import type { ActionResult, RegisterPaymentInput } from "@/types/actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const INITIAL: RegisterPaymentInput = {
  bookingRef: "",
  amount: 0,
  method: "POS",
  notes: "",
}

export function RegisterMovementDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [form, setForm] = useState<RegisterPaymentInput>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  async function submit() {
    setFeedback(null)
    setSubmitting(true)
    const res: ActionResult<{ paymentId: string }> = await registerPayment(form)
    setSubmitting(false)
    if (res.status === "success") {
      setForm(INITIAL)
      onOpenChange(false)
      return
    }
    if (res.status === "error") {
      setFeedback(res.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registra movimento</DialogTitle>
          <DialogDescription>
            Registra un incasso nel registro locale (stesso flusso dell&apos;app mobile).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="desk-payment-ref">Riferimento / cliente</Label>
            <Input
              id="desk-payment-ref"
              value={form.bookingRef}
              onChange={(e) => setForm((prev) => ({ ...prev, bookingRef: e.target.value }))}
              placeholder="Es. Blue Horizon S.r.l."
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desk-payment-amount">Importo (EUR)</Label>
            <Input
              id="desk-payment-amount"
              type="number"
              min={0}
              step={0.01}
              value={form.amount || ""}
              onChange={(e) => setForm((prev) => ({ ...prev, amount: Number(e.target.value || 0) }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desk-payment-method">Metodo</Label>
            <Input
              id="desk-payment-method"
              list="desk-payment-methods"
              value={form.method}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  method: (e.target.value as RegisterPaymentInput["method"]) || "POS",
                }))
              }
            />
            <datalist id="desk-payment-methods">
              <option value="POS" />
              <option value="Bonifico" />
              <option value="Contanti" />
            </datalist>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desk-payment-notes">Note</Label>
            <Textarea
              id="desk-payment-notes"
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Note operative..."
            />
          </div>
          {feedback ? <p className="text-xs text-red-600">{feedback}</p> : null}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button type="button" onClick={() => void submit()} disabled={submitting}>
            {submitting ? "Registrazione..." : "Conferma"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
