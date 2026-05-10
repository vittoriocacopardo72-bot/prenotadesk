"use client"

import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { DailyAgenda } from "@/components/dashboard/daily-agenda"
import { FinancialPanel } from "@/components/dashboard/financial-panel"
import { DashboardKpiCards } from "@/components/dashboard/kpi-cards"
import { MarineWidgets } from "@/components/dashboard/marine-widgets"
import { OperationalBoard } from "@/components/dashboard/operational-board"
import { DashboardQuickActions } from "@/components/dashboard/quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { selectActiveAlerts, useAppStoreSelector } from "@/lib/store/app-store"
import {
  dashboardAgenda,
  dashboardFinance,
  dashboardKpis,
  dashboardQuickActions,
} from "@/lib/mock/dashboard"

export function DashboardSection() {
  const bookings = useAppStoreSelector((s) => s.bookings)
  const boats = useAppStoreSelector((s) => s.boats)
  const weather = useAppStoreSelector((s) => s.weather)
  const activeAlerts = useAppStoreSelector((s) => selectActiveAlerts(s).map((a) => a.text))

  const departures = bookings.slice(0, 6).map((b) => ({
    ora: b.ora,
    barca: b.barca,
    servizio: b.servizio,
    stato: b.stato === "Confermate" ? "Confermata" : b.stato,
  }))
  const fleetLive = boats.slice(0, 4).map((b) => ({
    nome: b.nome,
    readiness: b.stato,
    fuel: "n/d",
    next: b.prossimaUscita,
    crew: b.equipaggio,
  }))
  const activeCrew = boats
    .map((b) => b.equipaggio)
    .filter((crew) => crew && crew !== "-")
    .slice(0, 6)

  const marineWidgets = [
    { label: "Mare", value: weather.mare, detail: "Store locale" },
    { label: "Vento", value: weather.vento, detail: "Store locale" },
    { label: "Visibilita", value: weather.visibilita, detail: "Store locale" },
    { label: "Stato porto", value: weather.statoPorto, detail: "Store locale" },
  ]

  const agenda = {
    ...dashboardAgenda,
    checkIn: bookings.slice(0, 3).map((b) => `${b.ora} ${b.cliente}`),
    partenze: departures.slice(0, 3).map((d) => `${d.ora} ${d.barca}`),
  }

  return (
    <>
      <DashboardKpiCards kpis={[...dashboardKpis]} />

      <section className="mt-6 space-y-4 sm:col-span-2 xl:col-span-4">
        <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
          <OperationalBoard
            departures={departures}
            fleetLive={fleetLive}
            activeCrew={activeCrew}
            marineWidgets={marineWidgets}
          />

          <div className="grid gap-4 content-start">
            <DailyAgenda agenda={agenda} />
            <AlertsPanel alerts={activeAlerts} />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr]">
          <FinancialPanel items={dashboardFinance} />
          <DashboardQuickActions actions={dashboardQuickActions} />
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Widget marine</CardTitle>
              <CardDescription>Condizioni operative in tempo reale (store locale)</CardDescription>
            </CardHeader>
            <CardContent>
              <MarineWidgets widgets={marineWidgets} />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
