"use client";

import { useState } from "react";

import { createBooking } from "@/lib/actions";
import { getCreateBookingValidationError } from "@/features/bookings/validate-create-booking";
import { useAppStoreSelector } from "@/lib/store/app-store";
import type { CreateBookingInput } from "@/types/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BookingForm() {
  const boats = useAppStoreSelector((s) => s.boats);
  const [form, setForm] = useState<CreateBookingInput>({
    customerName: "",
    phone: "",
    boatName: "",
    service: "",
    date: "",
    time: "",
    guests: 1,
    notes: "",
  });
  const [feedback, setFeedback] = useState<{
    message: string;
    tone: "success" | "error";
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit() {
    const validationError = getCreateBookingValidationError(form);
    if (validationError) {
      setFeedback({ message: validationError, tone: "error" });
      return;
    }
    setFeedback(null);
    setSubmitting(true);
    const result = await createBooking(form);
    setSubmitting(false);
    setFeedback({
      message: result.message,
      tone: result.status === "success" ? "success" : "error",
    });
    if (result.status === "success") {
      setForm({
        customerName: "",
        phone: "",
        boatName: "",
        service: "",
        date: "",
        time: "",
        guests: 1,
        notes: "",
      });
    }
  }

  return (
    <Card className="bg-white sm:col-span-2 xl:col-span-4">
      <CardHeader>
        <CardTitle>Nuova prenotazione</CardTitle>
        <CardDescription>
          Crea una prenotazione operativa e aggiorna planning live
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="cliente">Cliente</Label>
          <Input
            id="cliente"
            placeholder="Nome cliente"
            value={form.customerName}
            onChange={(e) => {
              setFeedback(null);
              setForm((p) => ({ ...p, customerName: e.target.value }));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Telefono</Label>
          <Input
            id="telefono"
            placeholder="+39 000 000 0000"
            value={form.phone}
            onChange={(e) => {
              setFeedback(null);
              setForm((p) => ({ ...p, phone: e.target.value }));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="barca">Barca</Label>
          <Input
            id="barca"
            placeholder="Seleziona barca"
            list="desktop-boat-options"
            value={form.boatName}
            onChange={(e) => {
              setFeedback(null);
              setForm((p) => ({ ...p, boatName: e.target.value }));
            }}
          />
          <datalist id="desktop-boat-options">
            {boats.map((boat) => (
              <option key={boat.id} value={boat.nome} />
            ))}
          </datalist>
        </div>
        <div className="space-y-2">
          <Label htmlFor="servizio">Servizio</Label>
          <Input
            id="servizio"
            placeholder="Tipo servizio"
            value={form.service}
            onChange={(e) => {
              setFeedback(null);
              setForm((p) => ({ ...p, service: e.target.value }));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="data">Data</Label>
          <Input
            id="data"
            type="date"
            value={form.date}
            onChange={(e) => {
              setFeedback(null);
              setForm((p) => ({ ...p, date: e.target.value }));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ora">Ora</Label>
          <Input
            id="ora"
            type="time"
            value={form.time}
            onChange={(e) => {
              setFeedback(null);
              setForm((p) => ({ ...p, time: e.target.value }));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ospiti">Ospiti</Label>
          <Input
            id="ospiti"
            type="number"
            placeholder="0"
            min={1}
            value={form.guests}
            onChange={(e) => {
              setFeedback(null);
              setForm((p) => ({ ...p, guests: Number(e.target.value || 1) }));
            }}
          />
        </div>
        <div className="space-y-2 xl:col-span-1">
          <Label htmlFor="stato-prenotazione">Stato</Label>
          <Input
            id="stato-prenotazione"
            placeholder="In attesa"
            value="In attesa"
            readOnly
          />
        </div>
        <div className="space-y-2 md:col-span-2 xl:col-span-4">
          <Label htmlFor="note">Note</Label>
          <Textarea
            id="note"
            placeholder="Note operative della prenotazione..."
            value={form.notes}
            onChange={(e) => {
              setFeedback(null);
              setForm((p) => ({ ...p, notes: e.target.value }));
            }}
          />
        </div>
        <div className="md:col-span-2 xl:col-span-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              onClick={() => void onSubmit()}
              disabled={submitting}
            >
              {submitting ? "Salvataggio..." : "Salva prenotazione"}
            </Button>
            {feedback ? (
              <p
                className={
                  feedback.tone === "success"
                    ? "text-xs text-emerald-700"
                    : "text-xs text-red-600"
                }
                role="status"
              >
                {feedback.message}
              </p>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
