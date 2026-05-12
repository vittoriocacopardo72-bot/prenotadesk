"use client";

import { useState } from "react";

import { registerPayment } from "@/lib/actions";
import type { ActionResult, RegisterPaymentInput } from "@/types/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

export type RegisterPaymentSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResult: (result: ActionResult<{ paymentId: string }>) => void;
};

const INITIAL: RegisterPaymentInput = {
  bookingRef: "",
  amount: 0,
  method: "POS",
  notes: "",
};

export function RegisterPaymentSheet({
  open,
  onOpenChange,
  onResult,
}: RegisterPaymentSheetProps) {
  const [form, setForm] = useState<RegisterPaymentInput>(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    const res = await registerPayment(form);
    setSubmitting(false);
    onResult(res);
    if (res.status === "success") {
      setForm(INITIAL);
      onOpenChange(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[88vh] gap-0 p-0"
        showCloseButton
      >
        <SheetHeader className="border-b border-slate-200 p-4">
          <SheetTitle>Registra incasso</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 p-4">
          <div className="space-y-1.5">
            <Label htmlFor="mobile-payment-ref">Riferimento prenotazione</Label>
            <Input
              id="mobile-payment-ref"
              value={form.bookingRef}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, bookingRef: e.target.value }))
              }
              placeholder="Es. Blue Horizon 09:30"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-payment-amount">Importo</Label>
            <Input
              id="mobile-payment-amount"
              type="number"
              min={0}
              value={form.amount}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  amount: Number(e.target.value || 0),
                }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-payment-method">Metodo</Label>
            <Input
              id="mobile-payment-method"
              list="payment-methods"
              value={form.method}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  method:
                    (e.target.value as RegisterPaymentInput["method"]) || "POS",
                }))
              }
            />
            <datalist id="payment-methods">
              <option value="POS" />
              <option value="Bonifico" />
              <option value="Contanti" />
            </datalist>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-payment-notes">Note</Label>
            <Textarea
              id="mobile-payment-notes"
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Note incasso..."
            />
          </div>
        </div>
        <SheetFooter className="border-t border-slate-200 p-4">
          <div className="grid w-full grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                onResult({
                  status: "cancelled",
                  message: "Registrazione incasso annullata.",
                });
              }}
            >
              Annulla
            </Button>
            <Button
              type="button"
              onClick={() => void submit()}
              disabled={submitting}
            >
              {submitting ? "Registrazione..." : "Conferma"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
