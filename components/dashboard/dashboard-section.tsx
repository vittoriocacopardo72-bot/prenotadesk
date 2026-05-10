"use client"

import { useCallback, useMemo } from "react"

import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { DailyAgenda } from "@/components/dashboard/daily-agenda"
import { FinancialPanel } from "@/components/dashboard/financial-panel"
import { DashboardKpiCards } from "@/components/dashboard/kpi-cards"
import { MarineWidgets } from "@/components/dashboard/marine-widgets"
import { OperationalBoard } from "@/components/dashboard/operational-board"
import { DashboardQuickActions } from "@/components/dashboard/quick-actions"
import { useDesktopBookingFocusOptional } from "@/components/dashboard/shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { isBookingDateToday } from "@/lib/bookings/booking-dates"
import {
  dashboardAgenda,
  dashboardFinance,
  dashboardKpis,
  dashboardQuickActions,
} from "@/lib/mock/dashboard"
import { selectActiveAlertTexts, useAppStoreSelector } from "@/lib/store/app-store"

export function DashboardSection() {
  const desktopBooking = useDesktopBookingFocusOptional()

  const handleDashboardQuickAction = useCallback(
    (label: string) => {
      if (label === "Nuova prenotazione" && desktopBooking) {
        desktopBooking.openDesktopCreateBooking()
      }
    },
    [desktopBooking]
  )

  const bookings = useAppStoreSelector((s) => s.bookings)
  const boats = useAppStoreSelector((s) => s.boats)
  const weather = useAppStoreSelector((s) => s.weather)
  const activeAlerts = useAppStoreSelector(selectActiveAlertTexts)

  const kpisLive = useMemo(() => {
    const todays = bookings.filter((b) => isBookingDateToday(b.data))
    const ospitiSum = todays.reduce((s, b) => s + (Number(b.ospiti) || 0), 0)
    return [
      { ...dashboardKpis[0] },
      { ...dashboardKpis[1], value: String(todays.length) },
      { ...dashboardKpis[2], value: String(ospitiSum) },
      { ...dashboardKpis[3] },
    ]
  }, [bookings])

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
      <DashboardKpiCards kpis={kpisLive} />

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
          <DashboardQuickActions actions={dashboardQuickActions} onAction={handleDashboardQuickAction} />
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
