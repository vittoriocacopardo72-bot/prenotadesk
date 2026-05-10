import { dashboardAlerts, dashboardDepartures, dashboardFleetLive } from "@/lib/mock/dashboard"
import type { AssignCrewInput, CreateBookingInput, RegisterPaymentInput } from "@/types/actions"

type BookingRecord = CreateBookingInput & { id: string; createdAt: string }
type PaymentRecord = RegisterPaymentInput & { id: string; createdAt: string }
type CrewRecord = AssignCrewInput & { id: string; createdAt: string }

type Store = {
  bookings: BookingRecord[]
  payments: PaymentRecord[]
  assignments: CrewRecord[]
  boatBlocked: Record<string, { blocked: boolean; reason?: string }>
}

const store: Store = {
  bookings: [],
  payments: [],
  assignments: [],
  boatBlocked: Object.fromEntries(
    dashboardFleetLive.map((boat) => [boat.nome, { blocked: boat.readiness.toLowerCase().includes("manut") }])
  ),
}

export function addBooking(input: CreateBookingInput): BookingRecord {
  const row: BookingRecord = {
    ...input,
    id: `bk_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  }
  store.bookings.unshift(row)
  return row
}

export function addPayment(input: RegisterPaymentInput): PaymentRecord {
  const row: PaymentRecord = {
    ...input,
    id: `pay_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  }
  store.payments.unshift(row)
  return row
}

export function addAssignment(input: AssignCrewInput): CrewRecord {
  const row: CrewRecord = {
    ...input,
    id: `asg_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  }
  store.assignments.unshift(row)
  return row
}

export function setBoatBlocked(boatName: string, blocked: boolean, reason?: string) {
  store.boatBlocked[boatName] = { blocked, reason }
}

export function getBoatBlocked(boatName: string): boolean {
  return Boolean(store.boatBlocked[boatName]?.blocked)
}

export function getSearchSnapshot() {
  return {
    alerts: [...dashboardAlerts],
    departures: [...dashboardDepartures],
    fleet: [...dashboardFleetLive],
    bookings: [...store.bookings],
  }
}
