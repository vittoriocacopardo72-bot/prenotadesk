export type ActionResult<T = void> =
  | { status: "success"; message: string; data: T }
  | { status: "cancelled"; message: string }
  | { status: "error"; message: string; code: string }

export type CreateBookingInput = {
  customerName: string
  phone: string
  boatName: string
  service: string
  date: string
  time: string
  guests: number
  notes?: string
}

export type AssignCrewInput = {
  departureRef: string
  crewName: string
  notes?: string
}

export type RegisterPaymentInput = {
  bookingRef: string
  amount: number
  method: "POS" | "Bonifico" | "Contanti"
  notes?: string
}

export type SetBoatBlockStateInput = {
  boatName: string
  blocked: boolean
  reason?: string
}

export type MobileSearchResult = {
  id: string
  kind: "booking" | "departure" | "alert" | "boat" | "section"
  title: string
  subtitle: string
  target:
    | { type: "tab"; tab: "home" | "operazioni" | "prenotazioni" | "altro" }
    | { type: "section"; sectionKey: string }
}
