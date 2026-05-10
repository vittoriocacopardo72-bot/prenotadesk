"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { RegisterMovementDialog } from "@/components/finanze/register-movement-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { isBookingDateToday } from "@/lib/bookings/booking-dates"
import { parseImportoEurDisplay } from "@/lib/bookings/parse-importo-eur"
import { incassiFilters } from "@/lib/mock/incassi"
import { isPaymentDataOraToday } from "@/lib/payments/is-payment-today"
import { selectPaymentRows, useAppStoreSelector } from "@/lib/store/app-store"
import type { TransazioneFilter, TransazioneStato } from "@/types/incassi"

function statoVariant(stato: TransazioneStato): "default" | "secondary" | "outline" | "destructive" {
  if (stato === "Pagato") return "default"
  if (stato === "In sospeso") return "secondary"
  if (stato === "Deposito") return "outline"
  return "destructive"
}

function formatFinEur(n: number): string {
  return `€ ${Math.round(Math.abs(n)).toLocaleString("it-IT")}`
}

export function FinanzeSection() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<TransazioneFilter>("Tutti")
  const [registerOpen, setRegisterOpen] = useState(false)
  const transazioniRows = useAppStoreSelector((s) => selectPaymentRows(s))
  const bookings = useAppStoreSelector((s) => s.bookings)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return transazioniRows.filter((row) => {
      const matchesSearch =
        q.length === 0 ||
        [row.cliente, row.prenotazioneServizio, row.metodo, row.note, row.importo, row.dataOra]
          .join(" ")
          .toLowerCase()
          .includes(q)
      const matchesFilter = filter === "Tutti" ? true : row.stato === filter
      return matchesSearch && matchesFilter
    })
  }, [search, filter, transazioniRows])

  const kpis = useMemo(() => {
    let incassoOggi = 0
    let inSospeso = 0
    let rimborsi = 0
    for (const row of transazioniRows) {
      const amt = parseImportoEurDisplay(row.importo)
      if (row.stato === "In sospeso") {
        inSospeso += Math.abs(amt)
      }
      if (row.stato === "Rimborso") {
        rimborsi += Math.abs(amt)
      }
      if (isPaymentDataOraToday(row.dataOra) && (row.stato === "Pagato" || row.stato === "Deposito")) {
        incassoOggi += Math.max(0, amt)
      }
    }
    const incassoPrevisto = bookings
      .filter((b) => isBookingDateToday(b.data) && b.stato !== "Cancellate")
      .reduce((s, b) => s + parseImportoEurDisplay(b.importo), 0)

    return {
      incassoOggi,
      incassoPrevisto,
      inSospeso,
      rimborsi,
    }
  }, [transazioniRows, bookings])

  const metodiShare = useMemo(() => {
    if (transazioniRows.length === 0) return []
    const counts = new Map<string, number>()
    for (const row of transazioniRows) {
      const k = row.metodo.trim() || "Altro"
      counts.set(k, (counts.get(k) ?? 0) + 1)
    }
    const total = transazioniRows.length
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([metodo, n]) => ({ metodo, pct: Math.round((n / total) * 100) }))
  }, [transazioniRows])

  const sospesiList = useMemo(
    () => transazioniRows.filter((r) => r.stato === "In sospeso"),
    [transazioniRows]
  )

  return (
    <>
      <RegisterMovementDialog open={registerOpen} onOpenChange={setRegisterOpen} />

      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardContent className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
          <div
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            title="Pagato e depositi con data/ora odierna nel store"
          >
            <p className="text-xs text-slate-500">Incasso oggi</p>
            <p className="text-xl font-semibold text-slate-800">{formatFinEur(kpis.incassoOggi)}</p>
          </div>
          <div
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            title="Somma importi prenotazioni di oggi non cancellate (stima da anagrafica)"
          >
            <p className="text-xs text-slate-500">Incasso previsto</p>
            <p className="text-xl font-semibold text-slate-800">{formatFinEur(kpis.incassoPrevisto)}</p>
          </div>
          <div
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            title="Somma transazioni in stato In sospeso"
          >
            <p className="text-xs text-slate-500">In sospeso</p>
            <p className="text-xl font-semibold text-slate-800">{formatFinEur(kpis.inSospeso)}</p>
          </div>
          <div
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            title="Somma importi contrassegnati come Rimborso"
          >
            <p className="text-xs text-slate-500">Rimborsi</p>
            <p className="text-xl font-semibold text-slate-800">{formatFinEur(kpis.rimborsi)}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Finanze</CardTitle>
              <CardDescription>
                Cassa, transazioni, incassi e movimenti collegati alle prenotazioni (vista operativa)
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
                placeholder="Cerca cliente, prenotazione o transazione"
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {incassiFilters.map((f) => (
                <Button
                  key={f}
                  type="button"
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => setFilter(f)}
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
            <CardTitle>Movimenti e transazioni</CardTitle>
            <CardDescription>Dati da store locale (integrazione POS/banca in arrivo)</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="px-2 py-1.5 font-medium">Cliente</th>
                  <th className="px-2 py-1.5 font-medium">Prenotazione/Servizio</th>
                  <th className="px-2 py-1.5 font-medium">Metodo</th>
                  <th className="px-2 py-1.5 font-medium">Stato</th>
                  <th className="px-2 py-1.5 font-medium">Importo</th>
                  <th className="px-2 py-1.5 font-medium">Data/Ora</th>
                  <th className="px-2 py-1.5 font-medium">Note</th>
                  <th className="px-2 py-1.5 text-right font-medium">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id ?? `${row.cliente}-${row.dataOra}-${row.importo}`}
                    className="border-b border-slate-100 align-middle"
                  >
                    <td className="px-2 py-2 font-medium text-slate-800">{row.cliente}</td>
                    <td className="px-2 py-2 text-slate-600">{row.prenotazioneServizio}</td>
                    <td className="px-2 py-2 text-slate-600">{row.metodo}</td>
                    <td className="px-2 py-2">
                      <Badge variant={statoVariant(row.stato)}>{row.stato}</Badge>
                    </td>
                    <td className="px-2 py-2 font-medium text-slate-800">{row.importo}</td>
                    <td className="px-2 py-2 text-slate-600">{row.dataOra}</td>
                    <td className="px-2 py-2 text-slate-600">{row.note || "—"}</td>
                    <td className="px-2 py-2">
                      <div className="flex flex-wrap justify-end gap-1">
                        <Button type="button" variant="outline" size="xs" disabled title="Non ancora disponibile">
                          Dettagli
                        </Button>
                        <Button type="button" variant="ghost" size="xs" disabled title="Non ancora disponibile">
                          Modifica
                        </Button>
                        <Button type="button" variant="ghost" size="xs" disabled title="Non ancora disponibile">
                          Ricevuta
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid gap-4 content-start">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Pagamenti in sospeso</CardTitle>
              <CardDescription>Da registro transazioni locale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              {sospesiList.length === 0 ? (
                <p className="text-slate-400">Nessun pagamento in sospeso nel store.</p>
              ) : (
                sospesiList.map((row) => (
                  <p
                    key={row.id ?? `${row.cliente}-${row.dataOra}`}
                    className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800"
                  >
                    {row.cliente} — {row.importo} ({row.metodo})
                    {row.note ? ` · ${row.note}` : ""}
                  </p>
                ))
              )}
            </CardContent>
          </Card>
          <Card className="bg-white" title="Distribuzione calcolata sulle transazioni nel store">
            <CardHeader>
              <CardTitle>Metodi piu usati</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              {metodiShare.length === 0 ? (
                <p className="text-slate-400">Nessuna transazione nel store.</p>
              ) : (
                metodiShare.map(({ metodo, pct }) => (
                  <div key={metodo} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                    <span>{metodo}</span>
                    <span className="font-medium">{pct}%</span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          <Card className="bg-white" title="Dato dimostrativo">
            <CardHeader>
              <CardTitle>Extra venduti oggi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Prosecco e transfer</span>
                <span className="font-medium">€ 340</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Foto e upgrade tour</span>
                <span className="font-medium">€ 185</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white" title="Dato dimostrativo">
            <CardHeader>
              <CardTitle>Note contabili operative</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <p className="rounded-md bg-slate-50 px-3 py-2">
                Allineare incassi POS con chiusura cassa entro le 20:00.
              </p>
              <p className="rounded-md bg-slate-50 px-3 py-2">
                Rimborsi: doppia conferma responsabile commerciale (mock).
              </p>
              <p className="rounded-md bg-slate-50 px-3 py-2">
                Integrazione gateway e fiscalita: da configurare in versione successiva.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
