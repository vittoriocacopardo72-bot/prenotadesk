import { ACTION_ERROR } from "@/lib/actions/types"
import { getAppState, updateAppState } from "@/lib/store/app-store"
import type { ActionResult, CreateBookingInput } from "@/types/actions"
import type { Booking, BookingStatus } from "@/types/domain"

export async function createBooking(input: CreateBookingInput): Promise<ActionResult<{ bookingId: string }>> {
  if (!input.customerName || !input.boatName || !input.date || !input.time) {
    return { status: "error", code: ACTION_ERROR.validation, message: "Compila i campi obbligatori." }
  }

  const booking: Booking = {
    id: `booking_${Date.now().toString(36)}`,
    cliente: input.customerName,
    barca: input.boatName,
    servizio: input.service || "Servizio standard",
    data: input.date,
    ora: input.time,
    ospiti: Math.max(1, input.guests || 1),
    stato: "In attesa",
    importo: "€ 0",
  }

  updateAppState((prev) => ({ ...prev, bookings: [booking, ...prev.bookings] }))
  return { status: "success", message: "Prenotazione creata.", data: { bookingId: booking.id } }
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus
): Promise<ActionResult<{ bookingId: string; status: BookingStatus }>> {
  const current = getAppState().bookings.find((b) => b.id === bookingId)
  if (!current) {
    return { status: "error", code: ACTION_ERROR.notFound, message: "Prenotazione non trovata." }
  }

  updateAppState((prev) => ({
    ...prev,
    bookings: prev.bookings.map((b) => (b.id === bookingId ? { ...b, stato: status } : b)),
  }))
  return { status: "success", message: "Stato prenotazione aggiornato.", data: { bookingId, status } }
}
