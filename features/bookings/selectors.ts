import { memoizeByState } from "@/lib/store/memoize-by-app-state"
import type { AppState, Booking } from "@/types/domain"
import type { BookingRow } from "@/types/booking"

export const selectBookingRows = memoizeByState((s: AppState): BookingRow[] => {
  return s.bookings.map((b: Booking) => ({
    id: b.id,
    cliente: b.cliente,
    barca: b.barca,
    servizio: b.servizio,
    data: b.data,
    ora: b.ora,
    ospiti: b.ospiti,
    stato: b.stato,
    importo: b.importo,
  }))
})
