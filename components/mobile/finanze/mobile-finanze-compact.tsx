"use client"

import { useMemo, useState } from "react"

import { RegisterMovementDialog } from "@/components/finanze/register-movement-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useFinanceSummary } from "@/features/finance/hooks/use-finance-summary"
import { addFinanceMovement, deleteFinanceMovement, useFinanceMovements } from "@/lib/finance/movements-store"
import type { CreateFinanceMovementInput, FinanceMovementType } from "@/types/finance"

function formatFinEur(n: number): string {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n)
}

function formatDateDisplay(dateIso: string): string {
  if (!dateIso) return "—"
  const date = new Date(`${dateIso}T00:00:00`)
  return Number.isNaN(date.getTime()) ? dateIso : date.toLocaleDateString("it-IT")
}

/**
 * Mobile-only compact Finanze surface (Altro → Finanze). Same store/actions as desktop section; no desktop layout changes.
 */
export function MobileFinanzeCompact() {
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<"Tutti" | FinanceMovementType>("Tutti")
  const [registerOpen, setRegisterOpen] = useState(false)
  const movements = useFinanceMovements()
  const summary = useFinanceSummary()

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return movements.filter((row) => {
      const matchesSearch =
        q.length === 0 ||
        [row.descrizione, row.categoria, row.tipo, String(row.importo), row.data].join(" ").toLowerCase().includes(q)
      const matchesType = filterType === "Tutti" ? true : row.tipo === filterType
      return matchesSearch && matchesType
    })
  }, [search, filterType, movements])

  function onCreateMovement(input: CreateFinanceMovementInput) {
    addFinanceMovement(input)
  }

  return (
    <>
      <RegisterMovementDialog open={registerOpen} onOpenChange={setRegisterOpen} onSubmit={onCreateMovement} />

      <div className="flex min-w-0 flex-col gap-3">
        <Card className="border-slate-200 bg-white shadow-xs" size="sm">
          <CardHeader className="gap-2 pb-2">
            <CardTitle className="text-base">Finanze</CardTitle>
            <CardDescription>
              KPI e movimenti da registro locale (chiave prenotadesk_finance_movements_v1). Stessa logica della vista
              desktop.
            </CardDescription>
            <Button type="button" size="sm" className="w-full sm:w-auto" onClick={() => setRegisterOpen(true)}>
              Registra movimento
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 pt-0">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
              <p className="text-[10px] text-slate-500">Entrate</p>
              <p className="text-sm font-semibold text-slate-800">{formatFinEur(summary.totaleEntrate)}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
              <p className="text-[10px] text-slate-500">Uscite</p>
              <p className="text-sm font-semibold text-slate-800">{formatFinEur(summary.totaleUscite)}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
              <p className="text-[10px] text-slate-500">Saldo</p>
              <p className="text-sm font-semibold text-slate-800">{formatFinEur(summary.saldo)}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5">
              <p className="text-[10px] text-slate-500">Mov. oggi</p>
              <p className="text-sm font-semibold text-slate-800">{summary.movimentiOggi}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 border-slate-200 bg-white shadow-xs" size="sm">
          <CardHeader className="gap-2 pb-2">
            <CardTitle className="text-base">Movimenti</CardTitle>
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca…"
              className="h-9 text-sm"
            />
            <div className="flex flex-wrap gap-1.5">
              {(["Tutti", "Entrata", "Uscita"] as const).map((f) => (
                <Button
                  key={f}
                  type="button"
                  size="sm"
                  variant={filterType === f ? "default" : "outline"}
                  className="rounded-full px-3 text-xs"
                  onClick={() => setFilterType(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {filtered.length === 0 ? (
              <p className="text-center text-sm text-slate-400">Nessun movimento con i filtri correnti.</p>
            ) : (
              filtered.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-800"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="font-semibold">{row.descrizione || "—"}</p>
                      <p className="text-slate-600">
                        {formatDateDisplay(row.data)} · {row.tipo} · {row.categoria}
                      </p>
                    </div>
                    <p className="shrink-0 font-semibold">{formatFinEur(row.importo)}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 self-end text-destructive hover:text-destructive"
                    onClick={() => deleteFinanceMovement(row.id)}
                  >
                    Elimina
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {summary.ultimiMovimenti.length > 0 ? (
          <Card className="border-slate-200 bg-white shadow-xs" size="sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Ultimi (prime 5)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 pt-0 text-xs text-slate-700">
              {summary.ultimiMovimenti.map((row) => (
                <p key={row.id} className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5">
                  {formatDateDisplay(row.data)} · {row.tipo} · <span className="font-medium">{formatFinEur(row.importo)}</span>
                </p>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  )
}
