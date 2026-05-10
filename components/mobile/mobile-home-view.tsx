"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  dashboardAlerts,
  dashboardDepartures,
  dashboardFleetLive,
  dashboardKpis,
  dashboardMarineWidgets,
  dashboardQuickActions,
} from "@/lib/mock/dashboard"

import { CockpitStatusBar, type CockpitStatusTone } from "./home/cockpit-status-bar"
import { CompactPreviewCard } from "./home/compact-preview-card"
import { MobileAlertsSheet } from "./home/sheet-alerts"
import { MobileDeparturesSheet } from "./home/sheet-departures"
import { MobileFleetSheet } from "./home/sheet-fleet"
import { MobileMarineSheet } from "./home/sheet-marine"
import { QuickActionsStrip } from "./home/quick-actions-strip"

type HomeSheet = "alerts" | "departures" | "marine" | "fleet" | null

function cockpitTone(alerts: readonly string[]): CockpitStatusTone {
  const blob = alerts.join(" ").toLowerCase()
  if (blob.includes("blocc")) return "risk"
  if (alerts.length >= 3) return "warn"
  return "ok"
}

export type MobileHomeViewProps = {
  onQuickAction: (label: string) => void
  onOpenOperazioni: () => void
  onOpenMeteoModule: () => void
  onOpenBarcheModule: () => void
}

export function MobileHomeView({
  onQuickAction,
  onOpenOperazioni,
  onOpenMeteoModule,
  onOpenBarcheModule,
}: MobileHomeViewProps) {
  const [sheet, setSheet] = useState<HomeSheet>(null)

  const kpis = [...dashboardKpis]
  const statusLine = `${kpis[1]?.value ?? "—"} partenze · ${kpis[2]?.value ?? "—"} ospiti · ${kpis[0]?.value ?? "—"}`

  const d0 = dashboardDepartures[0]
  const d1 = dashboardDepartures[1]
  const departuresPreview = d0 && d1 ? `${d0.ora} ${d0.barca} · ${d1.ora} ${d1.barca}` : d0 ? `${d0.ora} ${d0.barca}` : "Nessuna partenza"

  const alertsPreview =
    dashboardAlerts[0]?.length > 72
      ? `${dashboardAlerts[0].slice(0, 72)}…`
      : dashboardAlerts[0] ?? "Nessun alert"

  const wWind = dashboardMarineWidgets[1]
  const wSea = dashboardMarineWidgets[0]
  const marinePreview =
    wWind && wSea ? `${wWind.value} vento · ${wSea.value} mare` : "Dati meteo"

  const f0 = dashboardFleetLive[0]
  const f1 = dashboardFleetLive[1]
  const fleetPreview =
    f0 && f1 ? `${f0.nome} ${f0.readiness.toLowerCase()} · ${f1.nome}` : f0 ? `${f0.nome} · ${f0.readiness}` : "Flotta"

  const closeAnd = (fn: () => void) => {
    setSheet(null)
    fn()
  }

  return (
    <div className="flex flex-col gap-2">
      <CockpitStatusBar tone={cockpitTone(dashboardAlerts)} line={statusLine} />

      <div>
        <p className="mb-1.5 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
          Azioni
        </p>
        <QuickActionsStrip actions={dashboardQuickActions} onAction={onQuickAction} />
      </div>

      <div>
        <p className="mb-1.5 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
          Control center
        </p>
        <div className="flex flex-col gap-2">
          <CompactPreviewCard
            title="Alert"
            hint="Tocca per il centro alert"
            badge={
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] tabular-nums">
                {dashboardAlerts.length}
              </Badge>
            }
            preview={<p className="line-clamp-2 text-xs text-slate-700">{alertsPreview}</p>}
            onOpen={() => setSheet("alerts")}
          />

          <CompactPreviewCard
            title="Partenze"
            hint="Prossime uscite"
            preview={<p className="text-xs font-medium text-slate-800">{departuresPreview}</p>}
            onOpen={() => setSheet("departures")}
          />

          <CompactPreviewCard
            title="Meteo"
            hint="Riepilogo operativo"
            preview={<p className="text-xs font-medium text-slate-800">{marinePreview}</p>}
            onOpen={() => setSheet("marine")}
          />

          <CompactPreviewCard
            title="Flotta"
            hint="Stato unità"
            preview={<p className="line-clamp-2 text-xs text-slate-700">{fleetPreview}</p>}
            onOpen={() => setSheet("fleet")}
          />
        </div>
      </div>

      <MobileAlertsSheet
        open={sheet === "alerts"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        alerts={dashboardAlerts}
        onOpenOperazioni={() => closeAnd(onOpenOperazioni)}
      />
      <MobileDeparturesSheet
        open={sheet === "departures"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        departures={dashboardDepartures}
        onOpenOperazioni={() => closeAnd(onOpenOperazioni)}
      />
      <MobileMarineSheet
        open={sheet === "marine"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        rows={[...dashboardMarineWidgets]}
        onOpenMeteo={() => closeAnd(onOpenMeteoModule)}
      />
      <MobileFleetSheet
        open={sheet === "fleet"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        items={[...dashboardFleetLive]}
        onOpenBarche={() => closeAnd(onOpenBarcheModule)}
      />
    </div>
  )
}
