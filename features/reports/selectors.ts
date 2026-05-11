import type { FinanceSummary } from "@/features/finance"
import { isBookingDateToday } from "@/lib/bookings/booking-dates"
import type { BookingRow } from "@/types/booking"

export type ReportsLocalSnapshot = {
  bookingTotal: number
  bookingToday: number
  paymentRowCount: number
  financeMovementCount: number
  financeTotals: Pick<FinanceSummary, "totaleEntrate" | "totaleUscite" | "saldo" | "movimentiOggi">
}

/** Total movement count derived from category distribution (matches full register length). */
export function countMovementsFromFinanceSummary(summary: FinanceSummary): number {
  return summary.distribuzioneCategorie.reduce((n, c) => n + c.count, 0)
}

export function selectReportsLocalSnapshot(
  bookingRows: Pick<BookingRow, "data">[],
  paymentRows: readonly unknown[],
  financeSummary: FinanceSummary
): ReportsLocalSnapshot {
  return {
    bookingTotal: bookingRows.length,
    bookingToday: bookingRows.filter((b) => isBookingDateToday(b.data)).length,
    paymentRowCount: paymentRows.length,
    financeMovementCount: countMovementsFromFinanceSummary(financeSummary),
    financeTotals: {
      totaleEntrate: financeSummary.totaleEntrate,
      totaleUscite: financeSummary.totaleUscite,
      saldo: financeSummary.saldo,
      movimentiOggi: financeSummary.movimentiOggi,
    },
  }
}
