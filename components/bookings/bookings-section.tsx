"use client"

import { useMemo, useState } from "react"

import { BookingFilters } from "@/components/bookings/booking-filters"
import { BookingForm } from "@/components/bookings/booking-form"
import { BookingSummaryCards } from "@/components/bookings/booking-summary-cards"
import { BookingTable } from "@/components/bookings/booking-table"
import { bookingStatusFilters, prenotazioniRows } from "@/lib/mock/bookings"
import type { BookingFilter } from "@/types/booking"

export function BookingsSection() {
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>("Tutte")
  const [bookingSearch, setBookingSearch] = useState("")

  const filteredPrenotazioni = useMemo(() => {
    return prenotazioniRows.filter((row) => {
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
  }, [bookingFilter, bookingSearch])

  return (
    <>
      <BookingFilters
        search={bookingSearch}
        onSearchChange={setBookingSearch}
        filter={bookingFilter}
        onFilterChange={setBookingFilter}
        filters={bookingStatusFilters}
      />
      <div className="grid gap-6 sm:col-span-2 xl:col-span-4 xl:grid-cols-[1.7fr_0.9fr]">
        <BookingTable rows={filteredPrenotazioni} />
        <BookingSummaryCards />
      </div>
      <BookingForm />
    </>
  )
}
