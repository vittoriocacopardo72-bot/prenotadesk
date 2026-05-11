"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { useBookingRows } from "@/features/bookings/hooks/use-booking-rows"
import { useFinanceSummary } from "@/features/finance/hooks/use-finance-summary"
import { markAlertResolved, updateWeatherSummary } from "@/lib/actions"
import { isBookingDateToday } from "@/lib/bookings/booking-dates"
import { buildCockpitStatusLine } from "@/lib/mobile/cockpit-status-line"
import { dashboardQuickActions } from "@/lib/mock/dashboard"
import { selectActiveAlerts, useAppStoreSelector } from "@/lib/store/app-store"

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
  const activeAlerts = useAppStoreSelector((s) => selectActiveAlerts(s))
  const bookings = useAppStoreSelector((s) => s.bookings)
  const boats = useAppStoreSelector((s) => s.boats)
  const weather = useAppStoreSelector((s) => s.weather)
  const bookingRows = useBookingRows()
  const financeSummary = useFinanceSummary()

  const todayRows = bookingRows.filter((row) => isBookingDateToday(row.data))
  const prenotazioniOggi = todayRows.length
  const ospitiOggi = todayRows.reduce((s, row) => s + (Number(row.ospiti) || 0), 0)
  const statusLine = buildCockpitStatusLine({
    prenotazioniOggi,
    ospitiOggi,
    saldoLocaleEur: financeSummary.saldo,
    movimentiCassaOggi: financeSummary.movimentiOggi,
  })

  const departures = bookings.slice(0, 6).map((b) => ({
    ora: b.ora,
    barca: b.barca,
    servizio: b.servizio,
    stato: b.stato === "Confermate" ? "Confermata" : b.stato,
  }))
  const d0 = departures[0]
  const d1 = departures[1]
  const departuresPreview = d0 && d1 ? `${d0.ora} ${d0.barca} · ${d1.ora} ${d1.barca}` : d0 ? `${d0.ora} ${d0.barca}` : "Nessuna partenza"

  const alertsPreview =
    activeAlerts[0]?.text.length > 72
      ? `${activeAlerts[0].text.slice(0, 72)}…`
      : activeAlerts[0]?.text ?? "Nessun alert"

  const marinePreview = `${weather.vento} vento · ${weather.mare} mare`

  const f0 = boats[0]
  const f1 = boats[1]
  const fleetPreview =
    f0 && f1 ? `${f0.nome} ${f0.stato.toLowerCase()} · ${f1.nome}` : f0 ? `${f0.nome} · ${f0.stato}` : "Flotta"

  const closeAnd = (fn: () => void) => {
    setSheet(null)
    fn()
  }

  return (
    <div className="flex flex-col gap-2">
      <CockpitStatusBar tone={cockpitTone(activeAlerts.map((a) => a.text))} line={statusLine} />

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
                {activeAlerts.length}
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
        alerts={activeAlerts}
        onOpenOperazioni={() => closeAnd(onOpenOperazioni)}
        onResolveAlert={(alertId) => {
          void markAlertResolved(alertId)
        }}
      />
      <MobileDeparturesSheet
        open={sheet === "departures"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        departures={departures}
        onOpenOperazioni={() => closeAnd(onOpenOperazioni)}
      />
      <MobileMarineSheet
        open={sheet === "marine"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        rows={[
          { label: "Mare", value: weather.mare, detail: "Sintesi operativa" },
          { label: "Vento", value: weather.vento, detail: "Sintesi operativa" },
          { label: "Visibilita", value: weather.visibilita, detail: "Sintesi operativa" },
          { label: "Stato porto", value: weather.statoPorto, detail: "Sintesi operativa" },
        ]}
        onOpenMeteo={() => closeAnd(onOpenMeteoModule)}
        onRefreshWeather={() => {
          void updateWeatherSummary({
            vento: `${Math.max(8, Math.round(Math.random() * 20))} nodi`,
            livelloOperativo: Math.random() > 0.5 ? "Alto" : "Medio",
          })
        }}
      />
      <MobileFleetSheet
        open={sheet === "fleet"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        items={boats.map((b) => ({
          nome: b.nome,
          readiness: b.stato,
          fuel: "n/d",
          next: b.prossimaUscita,
          crew: b.equipaggio,
        }))}
        onOpenBarche={() => closeAnd(onOpenBarcheModule)}
      />
    </div>
  )
}
