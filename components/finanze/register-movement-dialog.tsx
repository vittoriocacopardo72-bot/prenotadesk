"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  CreateFinanceMovementInput,
  FinanceMovementCategory,
  FinanceMovementType,
} from "@/types/finance";

const INITIAL: CreateFinanceMovementInput = {
  tipo: "Entrata",
  importo: 0,
  descrizione: "",
  data: "",
  categoria: "Altro",
};

export function RegisterMovementDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateFinanceMovementInput) => void;
}) {
  const [form, setForm] = useState<CreateFinanceMovementInput>(INITIAL);
  const [feedback, setFeedback] = useState<string | null>(null);

  function submit() {
    setFeedback(null);
    if (!form.descrizione.trim() || form.importo <= 0 || !form.data) {
      setFeedback("Inserisci descrizione, importo valido e data.");
      return;
    }
    onSubmit(form);
    setForm(INITIAL);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registra movimento</DialogTitle>
          <DialogDescription>
            Registra un movimento nel registro locale finanze.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="desk-movement-type">Tipo</Label>
            <select
              id="desk-movement-type"
              value={form.tipo}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  tipo: e.target.value as FinanceMovementType,
                }))
              }
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option value="Entrata">Entrata</option>
              <option value="Uscita">Uscita</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desk-movement-category">Categoria</Label>
            <select
              id="desk-movement-category"
              value={form.categoria}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  categoria: e.target.value as FinanceMovementCategory,
                }))
              }
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option value="Acconto">Acconto</option>
              <option value="Carburante">Carburante</option>
              <option value="Manutenzione">Manutenzione</option>
              <option value="Altro">Altro</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desk-movement-amount">Importo (EUR)</Label>
            <Input
              id="desk-movement-amount"
              type="number"
              min={0}
              step={0.01}
              value={form.importo || ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  importo: Number(e.target.value || 0),
                }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desk-movement-date">Data</Label>
            <Input
              id="desk-movement-date"
              type="date"
              value={form.data}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, data: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desk-movement-description">Descrizione</Label>
            <Textarea
              id="desk-movement-description"
              value={form.descrizione}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, descrizione: e.target.value }))
              }
              placeholder="Note operative..."
            />
          </div>
          {feedback ? <p className="text-xs text-red-600">{feedback}</p> : null}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Annulla
          </Button>
          <Button type="button" onClick={submit}>
            Conferma
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
