"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BoatStatusBadge } from "@/components/boats/boat-status-badge"
import { setBoatBlockState } from "@/lib/actions"
import type { BoatRow } from "@/types/boat"

export function BoatsTable({ boats }: { boats: BoatRow[] }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Flotta operativa</CardTitle>
        <CardDescription>Situazione aggiornata per uscite e disponibilita</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[1080px] text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="px-2 py-1.5 font-medium">Nome barca</th>
              <th className="px-2 py-1.5 font-medium">Modello</th>
              <th className="px-2 py-1.5 font-medium">Capacita</th>
              <th className="px-2 py-1.5 font-medium">Stato</th>
              <th className="px-2 py-1.5 font-medium">Prossima uscita</th>
              <th className="px-2 py-1.5 font-medium">Equipaggio</th>
              <th className="px-2 py-1.5 font-medium">Note operative</th>
              <th className="px-2 py-1.5 text-right font-medium">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {boats.map((boat) => {
              const inUscita = boat.stato === "In uscita"
              const canBlock = !boat.blocked && !inUscita
              return (
                <tr key={boat.nome} className="border-b border-slate-100 align-middle">
                  <td className="px-2 py-2 font-medium text-slate-800">{boat.nome}</td>
                  <td className="px-2 py-2 text-slate-600">{boat.modello}</td>
                  <td className="px-2 py-2 text-slate-600">{boat.capacita}</td>
                  <td className="px-2 py-2">
                    <BoatStatusBadge status={boat.stato} />
                  </td>
                  <td className="px-2 py-2 text-slate-600">{boat.prossimaUscita}</td>
                  <td className="px-2 py-2 text-slate-600">{boat.equipaggio}</td>
                  <td className="px-2 py-2 text-slate-600">{boat.note}</td>
                  <td className="px-2 py-2">
                    <div className="flex justify-end gap-1">
                      <Button type="button" variant="outline" size="xs" disabled title="Non ancora disponibile">
                        Dettagli
                      </Button>
                      {boat.blocked ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={() => {
                            void setBoatBlockState({ boatName: boat.nome, blocked: false, reason: "" })
                          }}
                        >
                          Sblocca
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          disabled={!canBlock}
                          title={
                            inUscita
                              ? "Impossibile bloccare durante uscita attiva"
                              : "Blocca barca (manutenzione) nel store locale"
                          }
                          onClick={() => {
                            if (!canBlock) return
                            void setBoatBlockState({ boatName: boat.nome, blocked: true, reason: "Bloccata da console" })
                          }}
                        >
                          Blocca
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
