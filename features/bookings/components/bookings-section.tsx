"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useDesktopBookingFocusOptional } from "@/components/dashboard/shell"
import { BookingFilters } from "./booking-filters"
import { BookingForm } from "./booking-form"
import { BookingSummaryCards } from "./booking-summary-cards"
import { BookingTable } from "./booking-table"
import { useBookingRows } from "@/features/bookings/hooks/use-booking-rows"
import { updateBookingStatus } from "@/lib/actions"
import { isBookingDateToday } from "@/lib/bookings/booking-dates"
import { bookingStatusFilters } from "@/lib/mock/bookings"
import type { BookingFilter } from "@/types/booking"

export function BookingsSection() {
  const formAnchorRef = useRef<HTMLDivElement>(null)
  const [bookingFilter, setBookingFilter] = useState<BookingFilter>("Tutte")
  const [bookingSearch, setBookingSearch] = useState("")
  const bookingRows = useBookingRows()
  const desktopBookingFocus = useDesktopBookingFocusOptional()
  const desktopBookingFocusNonce = desktopBookingFocus?.bookingFormFocusNonce ?? 0

  const scrollToCreateForm = useCallback(() => {
    formAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.requestAnimationFrame(() => {
      document.getElementById("cliente")?.focus()
    })
  }, [])

  useEffect(() => {
    if (desktopBookingFocusNonce === 0) return
    scrollToCreateForm()
  }, [desktopBookingFocusNonce, scrollToCreateForm])

  const summaryStats = useMemo(() => {
    const todayRows = bookingRows.filter((row) => isBookingDateToday(row.data))
    return {
      prenotazioniOggi: todayRows.length,
      ospitiOggi: todayRows.reduce((s, row) => s + (Number(row.ospiti) || 0), 0),
      daConfermare: bookingRows.filter((row) => row.stato === "In attesa").length,
    }
  }, [bookingRows])

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
        onCreateBookingClick={scrollToCreateForm}
      />
      <div className="grid gap-6 sm:col-span-2 xl:col-span-4 xl:grid-cols-[1.7fr_0.9fr]">
        <BookingTable
          rows={filteredPrenotazioni}
          onAdvanceStatus={(rowId, nextStatus) => {
            if (!rowId) return
            void updateBookingStatus(rowId, nextStatus)
          }}
        />
        <BookingSummaryCards
          prenotazioniOggi={summaryStats.prenotazioniOggi}
          ospitiOggi={summaryStats.ospitiOggi}
          daConfermare={summaryStats.daConfermare}
        />
      </div>
      <div ref={formAnchorRef}>
        <BookingForm />
      </div>
    </>
  )
}
