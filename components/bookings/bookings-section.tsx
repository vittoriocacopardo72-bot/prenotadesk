"use client"

import { useMemo, useState } from "react"

import { BookingFilters } from "@/components/bookings/booking-filters"
import { BookingForm } from "@/components/bookings/booking-form"
import { BookingSummaryCards } from "@/components/bookings/booking-summary-cards"
import { BookingTable } from "@/components/bookings/booking-table"
import { updateBookingStatus } from "@/lib/actions"
import { bookingStatusFilters } from "@/lib/mock/bookings"
import { selectBookingRows, useAppStoreSelector } from "@/lib/store/app-store"
import type { BookingFilter } from "@/types/booking"

export function BookingsSection() {
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>("Tutte")
  const [bookingSearch, setBookingSearch] = useState("")
  const bookingRows = useAppStoreSelector((s) => selectBookingRows(s))

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
    <>
      <BookingFilters
        search={bookingSearch}
        onSearchChange={setBookingSearch}
        filter={bookingFilter}
        onFilterChange={setBookingFilter}
        filters={bookingStatusFilters}
      />
      <div className="grid gap-6 sm:col-span-2 xl:col-span-4 xl:grid-cols-[1.7fr_0.9fr]">
        <BookingTable
          rows={filteredPrenotazioni}
          onAdvanceStatus={(rowId, nextStatus) => {
            if (!rowId) return
            void updateBookingStatus(rowId, nextStatus)
          }}
        />
        <BookingSummaryCards />
      </div>
      <BookingForm />
    </>
  )
}
