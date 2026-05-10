"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { clientFilters } from "@/lib/mock/clients"
import { selectClientRows, useAppStoreSelector } from "@/lib/store/app-store"
import type { ClientFilter, ClientRow, ClientStato } from "@/types/client"

function statoBadgeVariant(stato: ClientStato): "default" | "secondary" | "outline" {
  if (stato === "VIP") return "default"
  if (stato === "Business") return "secondary"
  return "outline"
}

export function ClientsSection() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<ClientFilter>("Tutti")
  const clientiRows = useAppStoreSelector((s) => selectClientRows(s))

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return clientiRows.filter((row) => {
      const matchesSearch =
        q.length === 0 ||
        [row.nome, row.telefono, row.email, row.provenienza, row.preferenze].join(" ").toLowerCase().includes(q)

      const matchesFilter =
        filter === "Tutti"
          ? true
          : filter === "VIP"
            ? row.stato === "VIP"
            : filter === "Nuovi"
              ? row.isNuovo
              : filter === "Da ricontattare"
                ? row.daRicontattare
                : row.richiesteSpeciali

      return matchesSearch && matchesFilter
    })
  }, [search, filter, clientiRows])

  const metrics = useMemo(
    () => ({
      attivi: clientiRows.length,
      nuovi: clientiRows.filter((c) => c.isNuovo).length,
      vip: clientiRows.filter((c) => c.stato === "VIP").length,
      speciali: clientiRows.filter((c) => c.richiesteSpeciali).length,
    }),
    [clientiRows]
  )

  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardContent className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Clienti attivi</p>
            <p className="text-xl font-semibold text-slate-800">{metrics.attivi}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Nuovi contatti</p>
            <p className="text-xl font-semibold text-slate-800">{metrics.nuovi}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Clienti VIP</p>
            <p className="text-xl font-semibold text-slate-800">{metrics.vip}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Richieste speciali</p>
            <p className="text-xl font-semibold text-slate-800">{metrics.speciali}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Clienti</CardTitle>
              <CardDescription>CRM leggero per anagrafiche, contatti e follow-up</CardDescription>
            </div>
            <Button type="button">Aggiungi cliente</Button>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute top-2 left-2.5 size-4 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Cerca cliente, telefono o email"
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {clientFilters.map((f) => (
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
            <CardTitle>Elenco clienti</CardTitle>
            <CardDescription>Vista operativa contatti e stato relazione</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[1020px] text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="px-2 py-1.5 font-medium">Nome cliente</th>
                  <th className="px-2 py-1.5 font-medium">Telefono</th>
                  <th className="px-2 py-1.5 font-medium">Email</th>
                  <th className="px-2 py-1.5 font-medium">Provenienza</th>
                  <th className="px-2 py-1.5 font-medium">Ultima prenotazione</th>
                  <th className="px-2 py-1.5 font-medium">Preferenze</th>
                  <th className="px-2 py-1.5 font-medium">Stato</th>
                  <th className="px-2 py-1.5 text-right font-medium">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row: ClientRow) => (
                  <tr key={row.email} className="border-b border-slate-100 align-middle">
                    <td className="px-2 py-2 font-medium text-slate-800">{row.nome}</td>
                    <td className="px-2 py-2 text-slate-600">{row.telefono}</td>
                    <td className="px-2 py-2 text-slate-600">{row.email}</td>
                    <td className="px-2 py-2 text-slate-600">{row.provenienza}</td>
                    <td className="px-2 py-2 text-slate-600">{row.ultimaPrenotazione}</td>
                    <td className="px-2 py-2 text-slate-600">{row.preferenze}</td>
                    <td className="px-2 py-2">
                      <Badge variant={statoBadgeVariant(row.stato)}>{row.stato}</Badge>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex flex-wrap justify-end gap-1">
                        <Button type="button" variant="outline" size="xs">
                          Dettagli
                        </Button>
                        <Button type="button" variant="ghost" size="xs">
                          Modifica
                        </Button>
                        <Button type="button" variant="ghost" size="xs">
                          Nuova prenotazione
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
              <CardTitle>Note clienti speciali</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <p className="rounded-md bg-slate-50 px-3 py-2">Famiglia Rinaldi: lounge e transfer dedicato.</p>
              <p className="rounded-md bg-slate-50 px-3 py-2">Sea & Co.: gruppi 10+ richiedono secondo equipaggio.</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Clienti da ricontattare</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                Sea & Co. Charter — confermare disponibilita weekend 17/05.
              </p>
              <p className="rounded-md bg-slate-50 px-3 py-2">Blue Horizon — follow-up preventivo charter Q3.</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Preferenze frequenti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Sunset + extra</span>
                <span className="font-medium">34%</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Charter premium</span>
                <span className="font-medium">22%</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Barca privata / piccoli gruppi</span>
                <span className="font-medium">18%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Provenienza clienti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Diretto / sito</span>
                <span className="font-medium">41%</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Agenzie</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Partner / referral</span>
                <span className="font-medium">21%</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>WhatsApp / social</span>
                <span className="font-medium">10%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
