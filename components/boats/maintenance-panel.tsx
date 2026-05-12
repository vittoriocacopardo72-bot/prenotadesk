"use client";

import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BoatRow } from "@/types/boat";

export function MaintenancePanel({ boats }: { boats: readonly BoatRow[] }) {
  const openMaintenance = useMemo(
    () =>
      boats.filter(
        (b) => b.stato === "Manutenzione" || b.stato === "Check tecnico"
      ),
    [boats]
  );

  return (
    <div className="grid gap-4 content-start">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Manutenzioni aperte</CardTitle>
          <CardDescription>
            Interventi da chiudere entro la settimana
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {openMaintenance.length === 0 ? (
            <p className="text-xs text-slate-400">
              Nessuna barca in manutenzione o check tecnico nel store.
            </p>
          ) : (
            openMaintenance.map((boat) => (
              <div
                key={boat.nome}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
              >
                {boat.nome} — {boat.note || boat.stato}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card
        className="bg-white"
        title="Dato dimostrativo — fascia oraria non collegata alle prenotazioni"
      >
        <CardHeader>
          <CardTitle>Disponibilita per fascia oraria</CardTitle>
          <CardDescription>Capacita operativa della giornata</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-slate-700">
          <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
            <span>08:00 - 12:00</span>
            <span className="font-medium">5 barche libere</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
            <span>12:00 - 16:00</span>
            <span className="font-medium">3 barche libere</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
            <span>16:00 - 20:00</span>
            <span className="font-medium">4 barche libere</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white" title="Dato dimostrativo">
        <CardHeader>
          <CardTitle>Note operative del giorno</CardTitle>
          <CardDescription>
            Promemoria rapidi per il team banchina
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-slate-700">
          <p className="rounded-md bg-slate-50 px-3 py-2">
            Verifica carburante su Azzurra 44 prima delle 09:00.
          </p>
          <p className="rounded-md bg-slate-50 px-3 py-2">
            Confermare dotazioni sicurezza su Marlin 52.
          </p>
          <p className="rounded-md bg-slate-50 px-3 py-2">
            Slot assistenza tecnica riservato alle 14:30.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
