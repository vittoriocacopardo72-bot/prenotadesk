"use client"

import { useMemo } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { selectBookingRows, useAppStoreSelector } from "@/lib/store/app-store"
import { isBookingDateToday } from "@/lib/bookings/booking-dates"
import { calendarWeek } from "@/lib/mock/calendar"
import type { BookingStatus } from "@/types/booking"

const GIORNI_IT = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"] as const

function giornoItalianoOggi(): (typeof GIORNI_IT)[number] {
  return GIORNI_IT[new Date().getDay()]
}

function badgeVariantAgenda(stato: BookingStatus): "default" | "secondary" | "outline" {
  if (stato === "Confermate" || stato === "Check-in") return "default"
  if (stato === "In arrivo") return "secondary"
  return "outline"
}

export function CalendarSection() {
  const bookingRows = useAppStoreSelector((s) => selectBookingRows(s))
  const partenzeOggi = useMemo(
    () => bookingRows.filter((r) => isBookingDateToday(r.data)).length,
    [bookingRows]
  )
  const oggiWeekdayLabel = useMemo(() => giornoItalianoOggi(), [])
  const agendaOggi = useMemo(() => {
    return bookingRows
      .filter((r) => isBookingDateToday(r.data))
      .slice()
      .sort((a, b) => a.ora.localeCompare(b.ora))
  }, [bookingRows])

  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Calendario</CardTitle>
              <CardDescription>Pianificazione operativa giornaliera e settimanale</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" disabled title="Non ancora disponibile">
                Oggi
              </Button>
              <Button type="button" variant="outline" size="sm" disabled title="Non ancora disponibile">
                Giorno
              </Button>
              <Button type="button" size="sm" disabled title="Non ancora disponibile">
                Settimana
              </Button>
              <Button type="button" size="sm" disabled title="Non ancora disponibile">
                Nuovo evento
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="grid gap-6 sm:col-span-2 xl:col-span-4 xl:grid-cols-[1.7fr_0.9fr]">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Settimana operativa</CardTitle>
            <CardDescription>Vista compatta da lunedi a domenica</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {calendarWeek.map((day) => {
                const isToday = day.giorno === oggiWeekdayLabel
                return (
                  <div
                    key={day.giorno}
                    className={`rounded-lg border p-3 ${isToday ? "border-sky-200 bg-sky-50/40" : "border-slate-200 bg-slate-50/70"}`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-800">{day.giorno}</p>
                      <p className="text-xs text-slate-500">{day.data}</p>
                    </div>
                    <div className="space-y-2">
                      {day.eventi.length === 0 ? (
                        <p className="text-xs text-slate-400">Nessun evento</p>
                      ) : (
                        day.eventi.map((event, index) => (
                          <div key={`${day.giorno}-${event.ora}-${index}`} className="rounded-md border border-slate-200 bg-white p-2">
                            <div className="mb-1 flex items-center justify-between">
                              <p className="text-xs font-medium text-slate-700">{event.ora}</p>
                              <Badge variant={event.stato === "Confermata" ? "default" : event.stato === "In arrivo" ? "secondary" : "outline"}>
                                {event.stato}
                              </Badge>
                            </div>
                            <p className="text-xs font-medium text-slate-800">{event.barca}</p>
                            <p className="text-xs text-slate-500">{event.dettaglio}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4 content-start">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Agenda di oggi</CardTitle>
              <CardDescription>Ordine cronologico partenze/eventi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {agendaOggi.length === 0 ? (
                <p className="text-xs text-slate-400">Nessuna prenotazione per oggi nel store locale.</p>
              ) : (
                agendaOggi.map((row) => (
                  <div
                    key={row.id ?? `${row.cliente}-${row.ora}-${row.barca}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-700">{row.ora}</p>
                      <Badge variant={badgeVariantAgenda(row.stato)}>{row.stato}</Badge>
                    </div>
                    <p className="text-xs font-medium text-slate-800">{row.barca}</p>
                    <p className="text-xs text-slate-500">
                      {row.cliente} · {row.servizio}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <Card className="bg-white" size="sm">
              <CardHeader>
                <CardDescription>Partenze oggi</CardDescription>
                <CardTitle className="text-xl">{partenzeOggi}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white" size="sm" title="Dato dimostrativo">
              <CardHeader>
                <CardDescription>Slot disponibili</CardDescription>
                <CardTitle className="text-xl">7</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white" size="sm" title="Dato dimostrativo">
              <CardHeader>
                <CardDescription>Eventi speciali</CardDescription>
                <CardTitle className="text-xl">2</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white" size="sm" title="Dato dimostrativo">
              <CardHeader>
                <CardDescription>Equipaggi assegnati</CardDescription>
                <CardTitle className="text-xl">12</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
