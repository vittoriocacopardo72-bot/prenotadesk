"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { BoatsTable } from "@/components/boats/boats-table"
import { FleetSummaryCards } from "@/components/boats/fleet-summary-cards"
import { MaintenancePanel } from "@/components/boats/maintenance-panel"
import { selectBoatRows, useAppStoreSelector } from "@/lib/store/app-store"

export function BoatsSection() {
  const boats = useAppStoreSelector((s) => selectBoatRows(s))

  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Barche</CardTitle>
              <CardDescription>Disponibilita flotta, stato operativo e manutenzioni</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" disabled title="Non ancora disponibile">
                Aggiungi barca
              </Button>
              <Button type="button" variant="outline" disabled title="Non ancora disponibile">
                Aggiorna disponibilita
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <FleetSummaryCards boats={boats} />

      <div className="grid gap-6 sm:col-span-2 xl:col-span-4 xl:grid-cols-[1.7fr_0.9fr]">
        <BoatsTable boats={boats} />
        <MaintenancePanel boats={boats} />
      </div>
    </>
  )
}
