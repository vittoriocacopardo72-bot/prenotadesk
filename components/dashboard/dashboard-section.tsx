import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { DailyAgenda } from "@/components/dashboard/daily-agenda"
import { FinancialPanel } from "@/components/dashboard/financial-panel"
import { DashboardKpiCards } from "@/components/dashboard/kpi-cards"
import { MarineWidgets } from "@/components/dashboard/marine-widgets"
import { OperationalBoard } from "@/components/dashboard/operational-board"
import { DashboardQuickActions } from "@/components/dashboard/quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  dashboardActiveCrew,
  dashboardAgenda,
  dashboardAlerts,
  dashboardDepartures,
  dashboardFinance,
  dashboardFleetLive,
  dashboardKpis,
  dashboardMarineWidgets,
  dashboardQuickActions,
} from "@/lib/mock/dashboard"

export function DashboardSection() {
  return (
    <>
      <DashboardKpiCards kpis={[...dashboardKpis]} />

      <section className="mt-6 space-y-4 sm:col-span-2 xl:col-span-4">
        <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
          <OperationalBoard
            departures={dashboardDepartures}
            fleetLive={[...dashboardFleetLive]}
            activeCrew={dashboardActiveCrew}
            marineWidgets={[...dashboardMarineWidgets]}
          />

          <div className="grid gap-4 content-start">
            <DailyAgenda agenda={dashboardAgenda} />
            <AlertsPanel alerts={dashboardAlerts} />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr]">
          <FinancialPanel items={dashboardFinance} />
          <DashboardQuickActions actions={dashboardQuickActions} />
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Widget marine</CardTitle>
              <CardDescription>Condizioni operative in tempo reale (mock)</CardDescription>
            </CardHeader>
            <CardContent>
              <MarineWidgets widgets={[...dashboardMarineWidgets]} />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
