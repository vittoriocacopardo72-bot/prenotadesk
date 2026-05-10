"use client"

import { useMemo } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { updateSettingsPreferences } from "@/lib/actions"
import { advancedSettingsGroupIds, baseSettingsGroupIds, planCards, settingsGroups } from "@/lib/mock/settings"
import { useAppStoreSelector } from "@/lib/store/app-store"

type SettingsArea = "Base" | "Avanzate"

export function SettingsSection() {
  const settingsArea = useAppStoreSelector((s) => s.settings.settingsArea as SettingsArea)

  const visibleSettingsGroups = useMemo(() => {
    const activeIds = settingsArea === "Base" ? new Set<string>(baseSettingsGroupIds) : new Set<string>(advancedSettingsGroupIds)
    return settingsGroups.filter((group) => activeIds.has(group.id))
  }, [settingsArea])

  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader>
          <CardTitle>Impostazioni</CardTitle>
          <CardDescription>Centro di controllo operativo per configurazioni aziendali, piattaforma e integrazioni</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 sm:col-span-2 xl:col-span-4">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Configurazioni modulari</CardTitle>
            <CardDescription>Separa impostazioni base per utenti standard e impostazioni avanzate tecniche</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant={settingsArea === "Base" ? "default" : "outline"}
                onClick={() => void updateSettingsPreferences({ settingsArea: "Base" })}
              >
                Base
              </Button>
              <Button
                type="button"
                size="sm"
                variant={settingsArea === "Avanzate" ? "default" : "outline"}
                onClick={() => void updateSettingsPreferences({ settingsArea: "Avanzate" })}
              >
                Avanzate
              </Button>
            </div>
            {settingsArea === "Avanzate" ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">Modifica queste impostazioni solo se conosci l&apos;impatto operativo.</div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">Area consigliata per utenti operativi e amministrativi non tecnici.</div>
            )}
            {visibleSettingsGroups.map((group) => (
              <details key={group.id} className="group rounded-lg border border-slate-200 bg-slate-50/70" open={group.id === "profilo-azienda" || group.id === "operativita-giornaliera"}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{group.title}</p>
                    <p className="text-xs text-slate-500">{group.subtitle}</p>
                  </div>
                  <Badge variant="outline" className="text-[11px]">
                    Espandi
                  </Badge>
                </summary>
                <div className="border-t border-slate-200 px-4 py-3">
                  {group.id === "piani-abbonamento" ? (
                    <div className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                          <p className="text-xs text-slate-500">Piano corrente</p>
                          <p className="mt-1 text-lg font-semibold text-slate-800">Free</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                          <p className="text-xs text-slate-500">Stato rinnovo</p>
                          <p className="mt-1 text-lg font-semibold text-slate-800">Non attivo</p>
                        </div>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {planCards.map((plan) => (
                          <div key={plan.nome} className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
                            <p className="text-sm font-semibold text-slate-800">{plan.nome}</p>
                            <p className="mt-1 text-lg font-semibold text-slate-900">{plan.prezzo}</p>
                            <p className="mt-2 text-xs text-slate-600">{plan.target}</p>
                            <p className="mt-1 min-h-10 text-xs text-slate-500">{plan.features}</p>
                            <Button
                              type="button"
                              variant={plan.nome === "Free" ? "outline" : "default"}
                              size="sm"
                              className="mt-3 w-full"
                              disabled
                              title="Selezione piano non ancora disponibile"
                            >
                              Seleziona piano
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                          <p className="text-xs text-slate-500">Utilizzo piano</p>
                          <p className="mt-1 text-sm font-medium text-slate-800">1/1 utenti attivi, 42/100 prenotazioni mese</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-4">
                          <p className="text-xs text-slate-500">Storico fatture mock</p>
                          <p className="mt-1 text-sm font-medium text-slate-800">Nessuna fattura emessa (profilo Free)</p>
                        </div>
                      </div>
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">Gateway di pagamento abbonamento non ancora attivo in questa versione</div>
                    </div>
                  ) : (
                    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                      {group.items.map((item) => (
                        <div key={item.label} className="rounded-md border border-slate-200 bg-white px-3 py-2">
                          <p className="text-[11px] text-slate-500">{item.label}</p>
                          <p className="text-sm text-slate-800">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </details>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
