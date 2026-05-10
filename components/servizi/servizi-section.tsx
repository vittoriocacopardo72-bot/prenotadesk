"use client"

import { useMemo } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { servicesRows } from "@/lib/mock/servizi"

export function ServiziSection() {
  const serviziAttivi = useMemo(
    () => servicesRows.filter((s) => s.stato === "Attivo").length,
    []
  )

  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Servizi</CardTitle>
              <CardDescription>Catalogo tour, extra, upgrade e servizi accessori</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" disabled title="Non ancora disponibile">
                Aggiungi servizio
              </Button>
              <Button type="button" variant="outline" disabled title="Non ancora disponibile">
                Nuovo pacchetto
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardContent className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
          <div
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            title="Voci catalogo con stato Attivo (dati seed locali)"
          >
            <p className="text-xs text-slate-500">Servizi attivi</p>
            <p className="text-xl font-semibold text-slate-800">{serviziAttivi}</p>
          </div>
          <div
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            title="Dato dimostrativo — non collegato allo store"
          >
            <p className="text-xs text-slate-500">Upgrade venduti oggi</p>
            <p className="text-xl font-semibold text-slate-400">—</p>
          </div>
          <div
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            title="Dato dimostrativo — non collegato allo store"
          >
            <p className="text-xs text-slate-500">Ricavo extra previsto</p>
            <p className="text-xl font-semibold text-slate-400">—</p>
          </div>
          <div
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            title="Dato dimostrativo — non collegato allo store"
          >
            <p className="text-xs text-slate-500">Staff richiesto</p>
            <p className="text-xl font-semibold text-slate-400">—</p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 sm:col-span-2 xl:col-span-4 xl:grid-cols-[1.7fr_0.9fr]">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Catalogo servizi</CardTitle>
            <CardDescription>Servizi attivi per tour, charter ed extra a bordo</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="px-2 py-1.5 font-medium">Servizio</th>
                  <th className="px-2 py-1.5 font-medium">Categoria</th>
                  <th className="px-2 py-1.5 font-medium">Durata</th>
                  <th className="px-2 py-1.5 font-medium">Prezzo</th>
                  <th className="px-2 py-1.5 font-medium">Disponibilita</th>
                  <th className="px-2 py-1.5 font-medium">Staff richiesto</th>
                  <th className="px-2 py-1.5 font-medium">Stato</th>
                  <th className="px-2 py-1.5 text-right font-medium">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {servicesRows.map((service) => (
                  <tr key={service.servizio} className="border-b border-slate-100 align-middle">
                    <td className="px-2 py-2 font-medium text-slate-800">{service.servizio}</td>
                    <td className="px-2 py-2 text-slate-600">{service.categoria}</td>
                    <td className="px-2 py-2 text-slate-600">{service.durata}</td>
                    <td className="px-2 py-2 text-slate-600">{service.prezzo}</td>
                    <td className="px-2 py-2 text-slate-600">{service.disponibilita}</td>
                    <td className="px-2 py-2 text-slate-600">{service.staff}</td>
                    <td className="px-2 py-2">
                      <Badge variant="default">{service.stato}</Badge>
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex justify-end gap-1">
                        <Button type="button" variant="outline" size="xs" disabled title="Non ancora disponibile">
                          Dettagli
                        </Button>
                        <Button type="button" variant="ghost" size="xs" disabled title="Non ancora disponibile">
                          Modifica
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
          <Card className="bg-white" title="Dato dimostrativo">
            <CardHeader>
              <CardTitle>Pacchetti consigliati</CardTitle>
              <CardDescription>Combinazioni ad alta conversione</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <p className="rounded-md bg-slate-50 px-3 py-2">Sunset tour + Prosecco a bordo</p>
              <p className="rounded-md bg-slate-50 px-3 py-2">Tour costiero + Transfer skipper</p>
              <p className="rounded-md bg-slate-50 px-3 py-2">Noleggio premium + hostess dedicata</p>
            </CardContent>
          </Card>
          <Card className="bg-white" title="Dato dimostrativo">
            <CardHeader>
              <CardTitle>Extra piu richiesti</CardTitle>
              <CardDescription>Preferenze clienti ultima settimana</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Prosecco a bordo</span>
                <span className="font-medium">42 ordini</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Transfer skipper</span>
                <span className="font-medium">18 richieste</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>Foto ricordo</span>
                <span className="font-medium">13 ordini</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white" title="Dato dimostrativo">
            <CardHeader>
              <CardTitle>Note operative servizi</CardTitle>
              <CardDescription>Allineamento rapido team commerciale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-700">
              <p className="rounded-md bg-slate-50 px-3 py-2">Verificare disponibilita steward per fascia 18:00-20:00.</p>
              <p className="rounded-md bg-slate-50 px-3 py-2">Aggiornare upsell automatico su noleggio premium.</p>
              <p className="rounded-md bg-slate-50 px-3 py-2">Promuovere pacchetto sunset nel briefing mattutino.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
