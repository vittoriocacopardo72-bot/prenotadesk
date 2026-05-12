"use client";

import { useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { BoatRow } from "@/types/boat";

export function FleetSummaryCards({ boats }: { boats: readonly BoatRow[] }) {
  const metrics = useMemo(() => {
    const disponibili = boats.filter(
      (b) => b.stato === "Pronta" && !b.blocked
    ).length;
    const inUscita = boats.filter((b) => b.stato === "In uscita").length;
    const inManutenzione = boats.filter(
      (b) => b.stato === "Manutenzione"
    ).length;
    const fuoriServizio = boats.filter(
      (b) => b.stato === "Check tecnico"
    ).length;
    return { disponibili, inUscita, inManutenzione, fuoriServizio };
  }, [boats]);

  return (
    <Card className="bg-white sm:col-span-2 xl:col-span-4">
      <CardContent className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          className="rounded-lg border border-slate-200 bg-slate-50 p-3"
          title="Barche in stato Pronta e non bloccate (store locale)"
        >
          <p className="text-xs text-slate-500">Disponibili oggi</p>
          <p className="text-xl font-semibold text-slate-800">
            {metrics.disponibili}
          </p>
        </div>
        <div
          className="rounded-lg border border-slate-200 bg-slate-50 p-3"
          title="Barche in stato In uscita (store locale)"
        >
          <p className="text-xs text-slate-500">In uscita</p>
          <p className="text-xl font-semibold text-slate-800">
            {metrics.inUscita}
          </p>
        </div>
        <div
          className="rounded-lg border border-slate-200 bg-slate-50 p-3"
          title="Barche in stato Manutenzione (store locale)"
        >
          <p className="text-xs text-slate-500">In manutenzione</p>
          <p className="text-xl font-semibold text-slate-800">
            {metrics.inManutenzione}
          </p>
        </div>
        <div
          className="rounded-lg border border-slate-200 bg-slate-50 p-3"
          title="Barche in stato Check tecnico (store locale)"
        >
          <p className="text-xs text-slate-500">Out of service</p>
          <p className="text-xl font-semibold text-slate-800">
            {metrics.fuoriServizio}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
