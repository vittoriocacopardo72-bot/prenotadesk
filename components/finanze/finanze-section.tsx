"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

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

export function FinanzeSection() {
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<"Tutti" | FinanceMovementType>("Tutti")
  const [filterDate, setFilterDate] = useState("")
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
      const matchesDate = !filterDate || row.data === filterDate
      return matchesSearch && matchesType && matchesDate
    })
  }, [search, filterType, filterDate, movements])

  function onCreateMovement(input: CreateFinanceMovementInput) {
    addFinanceMovement(input)
  }

  function onDeleteMovement(movementId: string) {
    deleteFinanceMovement(movementId)
  }

  return (
    <>
      <RegisterMovementDialog open={registerOpen} onOpenChange={setRegisterOpen} onSubmit={onCreateMovement} />

      <Card
        className="bg-white sm:col-span-2 xl:col-span-4"
        title="KPI da movimenti salvati in locale (chiave prenotadesk_finance_movements_v1)."
      >
        <CardContent className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Totale entrate</p>
            <p className="text-xl font-semibold text-slate-800">{formatFinEur(summary.totaleEntrate)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Totale uscite</p>
            <p className="text-xl font-semibold text-slate-800">{formatFinEur(summary.totaleUscite)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Saldo</p>
            <p className="text-xl font-semibold text-slate-800">{formatFinEur(summary.saldo)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Movimenti oggi</p>
            <p className="text-xl font-semibold text-slate-800">{summary.movimentiOggi}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Finanze</CardTitle>
              <CardDescription>
                Cassa operativa locale con entrate e uscite persistenti su dispositivo. I KPI sopra seguono i movimenti
                salvati (nessun dato dimostrativo).
              </CardDescription>
            </div>
            <Button type="button" onClick={() => setRegisterOpen(true)}>
              Registra movimento
            </Button>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute top-2 left-2.5 size-4 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Cerca descrizione, categoria o importo"
                className="pl-8"
              />
            </div>
            <Input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full lg:w-[180px]"
            />
            <div className="flex flex-wrap gap-2">
              {(["Tutti", "Entrata", "Uscita"] as const).map((f) => (
                <Button
                  key={f}
                  type="button"
                  size="sm"
                  variant={filterType === f ? "default" : "outline"}
                  onClick={() => setFilterType(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 sm:col-span-2 xl:col-span-4 xl:grid-cols-[1.7fr_0.9fr]">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Movimenti</CardTitle>
            <CardDescription>Dati reali da registro locale persistente</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="px-2 py-1.5 font-medium">Data</th>
                  <th className="px-2 py-1.5 font-medium">Tipo</th>
                  <th className="px-2 py-1.5 font-medium">Categoria</th>
                  <th className="px-2 py-1.5 font-medium">Descrizione</th>
                  <th className="px-2 py-1.5 font-medium">Importo</th>
                  <th className="px-2 py-1.5 text-right font-medium">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-2 py-6 text-center text-slate-400">
                      Nessun movimento trovato con i filtri correnti.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 align-middle">
                      <td className="px-2 py-2 text-slate-700">{formatDateDisplay(row.data)}</td>
                      <td className="px-2 py-2 font-medium text-slate-800">{row.tipo}</td>
                      <td className="px-2 py-2 text-slate-700">{row.categoria}</td>
                      <td className="px-2 py-2 text-slate-700">{row.descrizione}</td>
                      <td className="px-2 py-2 font-medium text-slate-800">{formatFinEur(row.importo)}</td>
                      <td className="px-2 py-2 text-right">
                        <Button type="button" variant="ghost" size="xs" onClick={() => onDeleteMovement(row.id)}>
                          Elimina
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid gap-4 content-start">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Ultimi movimenti</CardTitle>
              <CardDescription>Prime 5 registrazioni dal registro locale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              {summary.ultimiMovimenti.length === 0 ? (
                <p className="text-slate-400">Nessun movimento registrato.</p>
              ) : (
                summary.ultimiMovimenti.map((row) => (
                  <p
                    key={row.id}
                    className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700"
                  >
                    {formatDateDisplay(row.data)} · {row.tipo} · {row.categoria}
                    <span className="font-medium"> · {formatFinEur(row.importo)}</span>
                  </p>
                ))
              )}
            </CardContent>
          </Card>
          <Card className="bg-white" title="Distribuzione categorie su movimenti reali">
            <CardHeader>
              <CardTitle>Categorie più usate</CardTitle>
              <CardDescription>
                Percentuali sull&apos;intero registro movimenti (non filtrate dalla ricerca sotto).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              {summary.distribuzioneCategorie.length === 0 ? (
                <p className="text-slate-400">Nessun movimento nel registro.</p>
              ) : (
                summary.distribuzioneCategorie.map(({ categoria, percentage }) => (
                  <div key={categoria} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                    <span>{categoria}</span>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
