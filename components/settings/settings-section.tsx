"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSettingsSectionDisplay } from "@/features/settings"
import { updateSettingsPreferences } from "@/lib/actions/settings"
import { planCards } from "@/lib/mock/settings"

export function SettingsSection() {
  const { settingsArea, groups } = useSettingsSectionDisplay()

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
            {groups.map((group) => (
              <details
                key={group.id}
                className="group rounded-lg border border-slate-200 bg-slate-50/70"
                open={
                  group.id === "profilo-azienda" ||
                  group.id === "preferenze-app" ||
                  group.id === "operativita-giornaliera"
                }
              >
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
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="text-[11px] font-normal text-slate-600">
                          Dati dimostrativi: limiti e contatori non collegati a dati reali
                        </Badge>
                      </div>
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
                    <div className="space-y-3">
                      {group.id === "preferenze-app" ? (
                        <Badge variant="secondary" className="w-fit text-[11px] font-normal text-slate-600">
                          Parzialmente dimostrativo: le righe con «Attiva»/«Disattiva» salvano preferenze sul dispositivo; le altre
                          voci sono testo statico di esempio
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="w-fit text-[11px] font-normal text-slate-600">
                          Dati dimostrativi: configurazione di esempio, non collegata a dati reali o backend
                        </Badge>
                      )}
                      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                      {group.itemsResolved.map((row) =>
                        row.control === "toggle" ? (
                          <div
                            key={row.label}
                            className="flex flex-col gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] text-slate-500">{row.label}</p>
                              <p className="text-sm text-slate-800">{row.value}</p>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="shrink-0 self-start sm:self-center"
                              onClick={() =>
                                void updateSettingsPreferences({
                                  preferenze: { [row.prefKey]: row.isOn ? "off" : "on" },
                                })
                              }
                            >
                              {row.isOn ? "Disattiva" : "Attiva"}
                            </Button>
                          </div>
                        ) : (
                          <div key={row.label} className="rounded-md border border-slate-200 bg-white px-3 py-2">
                            <p className="text-[11px] text-slate-500">{row.label}</p>
                            <p className="text-sm text-slate-800">{row.value}</p>
                          </div>
                        )
                      )}
                      </div>
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
