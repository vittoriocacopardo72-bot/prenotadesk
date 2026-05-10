"use client"

import { useMemo } from "react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { isBookingDateToday } from "@/lib/bookings/booking-dates"
import { reportSectionMeta } from "@/lib/mock/report"
import { selectPaymentRows, useAppStoreSelector } from "@/lib/store/app-store"

export function ReportSection() {
  const bookings = useAppStoreSelector((s) => s.bookings)
  const payments = useAppStoreSelector((s) => selectPaymentRows(s))

  const storeSnapshot = useMemo(() => {
    const oggi = bookings.filter((b) => isBookingDateToday(b.data)).length
    return { totale: bookings.length, oggi, transazioni: payments.length }
  }, [bookings, payments])

  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader>
          <CardTitle>Report</CardTitle>
          <CardDescription>
            {reportSectionMeta.subtitle} · Store locale: {storeSnapshot.totale} prenotazioni ({storeSnapshot.oggi}{" "}
            oggi), {storeSnapshot.transazioni} movimenti finanziari.
          </CardDescription>
        </CardHeader>
      </Card>
      {reportSectionMeta.cards.map((card) => (
        <Card key={card.title} className="bg-white" title="Dato dimostrativo — indicatori descrittivi">
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
  )
}
