import type { BookingFilter, BookingRow } from "@/types/booking"

export const bookingStatusFilters: BookingFilter[] = [
  "Tutte",
  "Confermate",
  "In arrivo",
  "In attesa",
  "Cancellate",
]

export const prenotazioniRows: BookingRow[] = [
  {
    cliente: "Blue Horizon S.r.l.",
    barca: "Azzurra 44",
    servizio: "Charter giornaliero",
    data: "09/05/2026",
    ora: "09:30",
    ospiti: 8,
    stato: "Confermate",
    importo: "€ 1.280",
  },
  {
    cliente: "Luca Rinaldi",
    barca: "Orion 31",
    servizio: "Tour costiero",
    data: "09/05/2026",
    ora: "10:15",
    ospiti: 4,
    stato: "In arrivo",
    importo: "€ 620",
  },
  {
    cliente: "Sea & Co. Charter",
    barca: "Marlin 52",
    servizio: "Noleggio premium",
    data: "09/05/2026",
    ora: "11:00",
    ospiti: 10,
    stato: "In attesa",
    importo: "€ 1.950",
  },
  {
    cliente: "Alessia Bianchi",
    barca: "Levante 28",
    servizio: "Sunset tour",
    data: "09/05/2026",
    ora: "18:00",
    ospiti: 3,
    stato: "Confermate",
    importo: "€ 420",
  },
  {
    cliente: "Mare Vivo Eventi",
    barca: "Tyrrhenian 40",
    servizio: "Evento privato",
    data: "10/05/2026",
    ora: "12:30",
    ospiti: 12,
    stato: "Cancellate",
    importo: "€ 0",
  },
]
