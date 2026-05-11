"use client"

import { useMemo, useState } from "react"

import { BookingStatusBadge } from "@/features/bookings/components/booking-status-badge"
import { useBookingRows } from "@/features/bookings/hooks/use-booking-rows"
import { updateBookingStatus } from "@/lib/actions"
import { bookingStatusFilters } from "@/lib/mock/bookings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { BookingFilter } from "@/types/booking"
import type { BookingStatus } from "@/types/booking"

const STATUS_ORDER: BookingStatus[] = ["In attesa", "Confermate", "In arrivo", "Check-in", "Cancellate"]

function nextStatus(status: BookingStatus): BookingStatus {
  const idx = STATUS_ORDER.indexOf(status)
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]
}

export function MobileBookingsStack() {
  const bookingRows = useBookingRows()
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>("Tutte")
  const [bookingSearch, setBookingSearch] = useState("")

  const filteredPrenotazioni = useMemo(() => {
    return bookingRows.filter((row) => {
      const matchesFilter = bookingFilter === "Tutte" ? true : row.stato === bookingFilter
      const query = bookingSearch.trim().toLowerCase()
      const matchesSearch =
        query.length === 0
          ? true
          : [row.cliente, row.barca, row.servizio, row.data, row.ora, row.stato]
              .join(" ")
              .toLowerCase()
              .includes(query)
      return matchesFilter && matchesSearch
    })
  }, [bookingFilter, bookingRows, bookingSearch])

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <Card className="border-slate-200 bg-white shadow-xs" size="sm">
        <CardHeader className="gap-2 pb-2">
          <div>
            <CardTitle className="text-base">Prenotazioni</CardTitle>
            <CardDescription>Lista compatta; stessi dati della vista desktop.</CardDescription>
          </div>
          <Input
            type="search"
            value={bookingSearch}
            onChange={(e) => setBookingSearch(e.target.value)}
            placeholder="Cerca cliente, barca, servizio…"
            className="h-9 text-sm"
          />
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {bookingStatusFilters.map((f) => (
              <Button
                key={f}
                type="button"
                size="sm"
                variant={bookingFilter === f ? "default" : "outline"}
                className="shrink-0 rounded-full px-3 text-xs"
                onClick={() => setBookingFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>

      <ul className="flex list-none flex-col gap-2 p-0">
        {filteredPrenotazioni.length === 0 ? (
          <li className="rounded-lg border border-dashed border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
            Nessuna prenotazione con i filtri correnti.
          </li>
        ) : (
          filteredPrenotazioni.map((row) => (
            <li key={row.id ?? `${row.cliente}-${row.data}-${row.ora}`}>
              <Card className="border-slate-200 bg-white shadow-xs" size="sm">
                <CardContent className="space-y-2 pt-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{row.cliente}</p>
                      <p className="truncate text-xs text-slate-600">
                        {row.barca} · {row.servizio}
                      </p>
                    </div>
                    <BookingStatusBadge status={row.stato} />
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
                    <span>{row.data}</span>
                    <span>{row.ora}</span>
                    <span>{row.ospiti} ospiti</span>
                    <span className="font-medium text-slate-800">{row.importo}</span>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      if (!row.id) return
                      void updateBookingStatus(row.id, nextStatus(row.stato))
                    }}
                    disabled={!row.id}
                  >
                    Avanza stato
                  </Button>
                </CardContent>
              </Card>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
