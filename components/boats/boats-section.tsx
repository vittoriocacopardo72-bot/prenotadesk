import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { BoatsTable } from "@/components/boats/boats-table"
import { FleetSummaryCards } from "@/components/boats/fleet-summary-cards"
import { MaintenancePanel } from "@/components/boats/maintenance-panel"
import { fleetRows } from "@/lib/mock/boats"

export function BoatsSection() {
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
              <Button type="button">Aggiungi barca</Button>
              <Button type="button" variant="outline">
                Aggiorna disponibilita
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <FleetSummaryCards />

      <div className="grid gap-6 sm:col-span-2 xl:col-span-4 xl:grid-cols-[1.7fr_0.9fr]">
        <BoatsTable boats={fleetRows} />
        <MaintenancePanel />
      </div>
    </>
  )
}
