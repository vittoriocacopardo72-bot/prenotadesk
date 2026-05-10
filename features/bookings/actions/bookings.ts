import { ACTION_ERROR } from "@/lib/actions/types"
import { formatIsoDateToIt } from "@/features/bookings/booking-dates"
import { getCreateBookingValidationError } from "@/features/bookings/validate-create-booking"
import { getAppState, updateAppState } from "@/lib/store/app-store"
import type { ActionResult, CreateBookingInput } from "@/types/actions"
import type { Booking, BookingStatus, Client } from "@/types/domain"

export async function createBooking(input: CreateBookingInput): Promise<ActionResult<{ bookingId: string }>> {
  const validationError = getCreateBookingValidationError(input)
  if (validationError) {
    return { status: "error", code: ACTION_ERROR.validation, message: validationError }
  }

  const dateDisplay = /^\d{4}-\d{2}-\d{2}$/.test(input.date.trim())
    ? formatIsoDateToIt(input.date)
    : input.date.trim()

  const booking: Booking = {
    id: `booking_${Date.now().toString(36)}`,
    cliente: input.customerName.trim(),
    barca: input.boatName.trim(),
    servizio: input.service?.trim() || "Servizio standard",
    data: dateDisplay,
    ora: input.time.trim(),
    ospiti: Math.max(1, input.guests || 1),
    stato: "In attesa",
    importo: "€ 0",
  }

  updateAppState((prev) => {
    const normalizedName = input.customerName.trim().toLowerCase()
    const existingClient = prev.clients.find((c) => c.nome.trim().toLowerCase() === normalizedName)
    const clients = existingClient
      ? prev.clients
      : [
          {
            id: `client_${Date.now().toString(36)}`,
            nome: input.customerName.trim(),
            telefono: input.phone || "",
            email: "",
            provenienza: "Mobile/Desktop app",
            ultimaPrenotazione: booking.data,
            preferenze: booking.servizio,
            stato: "Attivo",
            isNuovo: true,
            daRicontattare: false,
            richiesteSpeciali: Boolean(input.notes?.trim()),
          } satisfies Client,
          ...prev.clients,
        ]

    return {
      ...prev,
      bookings: [booking, ...prev.bookings],
      clients,
      alerts: [
        {
          id: `alert_${Date.now().toString(36)}`,
          text: `Nuova prenotazione: ${booking.cliente} · ${booking.ora} ${booking.barca}`,
          resolved: false,
        },
        ...prev.alerts,
      ],
    }
  })
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
    alerts: [
      {
        id: `alert_${Date.now().toString(36)}`,
        text: `Stato aggiornato: ${current.cliente} · ${current.ora} ${current.barca} → ${status}`,
        resolved: false,
      },
      ...prev.alerts,
    ],
  }))
  return { status: "success", message: "Stato prenotazione aggiornato.", data: { bookingId, status } }
}
