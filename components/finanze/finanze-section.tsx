"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { incassiFilters, transazioniRows } from "@/lib/mock/incassi"
import type { TransazioneFilter, TransazioneStato } from "@/types/incassi"

function statoVariant(stato: TransazioneStato): "default" | "secondary" | "outline" | "destructive" {
  if (stato === "Pagato") return "default"
  if (stato === "In sospeso") return "secondary"
  if (stato === "Deposito") return "outline"
  return "destructive"
}

export function FinanzeSection() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<TransazioneFilter>("Tutti")

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
  }, [search, filter])

  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardContent className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Incasso oggi</p>
            <p className="text-xl font-semibold text-slate-800">€ 4.860</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Incasso previsto</p>
            <p className="text-xl font-semibold text-slate-800">€ 6.940</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">In sospeso</p>
            <p className="text-xl font-semibold text-slate-800">€ 820</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Rimborsi</p>
            <p className="text-xl font-semibold text-slate-800">€ 70</p>
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
            <Button type="button">Registra movimento</Button>
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
            <CardDescription>Registro operativo giornaliero (mock — integrazione POS/banca futura)</CardDescription>
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
                  <tr key={`${row.cliente}-${row.dataOra}-${row.importo}`} className="border-b border-slate-100 align-middle">
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
                        <Button type="button" variant="outline" size="xs">
                          Dettagli
                        </Button>
                        <Button type="button" variant="ghost" size="xs">
                          Modifica
                        </Button>
                        <Button type="button" variant="ghost" size="xs">
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
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                Sea & Co. Charter — €300 acconto noleggio premium (bonifico atteso).
              </p>
              <p className="rounded-md bg-slate-50 px-3 py-2">Partner Nord — fattura gruppo 14/05.</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Metodi piu usati</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Carta / POS</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Bonifico</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Contanti</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Acconti / depositi</span>
                <span className="font-medium">5%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
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
          <Card className="bg-white">
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
