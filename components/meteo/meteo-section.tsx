"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { meteoAlerts, meteoDeparturesImpact, meteoMainCards, meteoTimeSlots } from "@/lib/mock/meteo"

export function MeteoSection() {
  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle>Meteo marino</CardTitle>
              <CardDescription>Board operativo manuale per decisioni giornaliere su partenze e sicurezza</CardDescription>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
              <p className="text-[11px] text-emerald-700">Semaforo operativo</p>
              <p className="text-sm font-semibold text-emerald-700">Operativo</p>
            </div>
          </div>
          <div className="grid gap-2 text-xs text-slate-600 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-md bg-slate-50 px-2.5 py-2">Sintesi: condizioni generalmente favorevoli con attenzione nel pomeriggio.</div>
            <div className="rounded-md bg-slate-50 px-2.5 py-2">Ultimo aggiornamento manuale: 07:40</div>
            <div className="rounded-md bg-slate-50 px-2.5 py-2">Responsabile aggiornamento: Marco D.</div>
            <div className="rounded-md bg-slate-50 px-2.5 py-2">Prossima revisione: 13:00</div>
          </div>
        </CardHeader>
      </Card>

      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader>
          <CardTitle>Condizioni principali</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {meteoMainCards.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] text-slate-500">{item.label}</p>
              <p className="text-sm font-semibold text-slate-800">{item.value}</p>
              <p className="text-[11px] text-slate-500">{item.detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:col-span-2 xl:col-span-4 xl:grid-cols-[1.7fr_0.9fr]">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Fasce orarie giornata</CardTitle>
            <CardDescription>Valutazione manuale del rischio operativo per fascia</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="px-2 py-1.5 font-medium">Fascia</th>
                  <th className="px-2 py-1.5 font-medium">Vento</th>
                  <th className="px-2 py-1.5 font-medium">Mare</th>
                  <th className="px-2 py-1.5 font-medium">Rischio</th>
                  <th className="px-2 py-1.5 font-medium">Decisione operativa</th>
                </tr>
              </thead>
              <tbody>
                {meteoTimeSlots.map((slot) => (
                  <tr key={slot.fascia} className="border-b border-slate-100">
                    <td className="px-2 py-2 font-medium text-slate-800">{slot.fascia}</td>
                    <td className="px-2 py-2 text-slate-600">{slot.vento}</td>
                    <td className="px-2 py-2 text-slate-600">{slot.mare}</td>
                    <td className="px-2 py-2 text-slate-600">{slot.rischio}</td>
                    <td className="px-2 py-2">
                      <Badge variant={slot.decisione === "Operativo" ? "default" : slot.decisione === "Attenzione" ? "secondary" : "outline"}>
                        {slot.decisione}
                      </Badge>
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
              <CardTitle>Alert e limitazioni</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {meteoAlerts.map((alert) => (
                <p key={alert} className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-2 text-xs text-amber-700">
                  {alert}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Note operative manuali</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="min-h-24 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                Verificare briefing sicurezza per gruppi oltre 8 ospiti. Confermare equipaggiamento anti-spruzzo su barche open nel pomeriggio.
              </div>
              <Button type="button" size="sm">
                Aggiorna meteo manuale
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader>
          <CardTitle>Impatto su partenze</CardTitle>
          <CardDescription>Stato operativo delle prossime uscite</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {meteoDeparturesImpact.map((item) => (
            <div key={`${item.ora}-${item.corsa}`} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-slate-800">{item.ora}</p>
                <Badge
                  variant={
                    item.stato === "Confermata"
                      ? "default"
                      : item.stato === "Da monitorare"
                        ? "secondary"
                        : item.stato === "Consigliato briefing"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {item.stato}
                </Badge>
              </div>
              <p className="text-xs text-slate-600">{item.corsa}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
