"use client"

import { useSyncExternalStore } from "react"

import { APP_STORE_VERSION, createSeedState } from "@/lib/store/seed-data"
import type { AlertItem, AppState, Boat, Booking, Payment } from "@/types/domain"
import type { BookingRow } from "@/types/booking"
import type { BoatRow } from "@/types/boat"
import type { TransazioneRow } from "@/types/incassi"

const STORAGE_KEY = `prenotadesk_app_store_v${APP_STORE_VERSION}`

type Listener = () => void

let state: AppState = createSeedState()
const listeners = new Set<Listener>()
let hydrated = false

function notify() {
  listeners.forEach((l) => l())
}

function persist() {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function tryHydrate() {
  if (hydrated || typeof window === "undefined") return
  hydrated = true
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return
  try {
    const parsed = JSON.parse(raw) as AppState
    state = parsed
  } catch {
    state = createSeedState()
  }
}

export function getAppState(): AppState {
  tryHydrate()
  return state
}

export function setAppState(next: AppState) {
  state = next
  persist()
  notify()
}

export function updateAppState(updater: (prev: AppState) => AppState) {
  setAppState(updater(getAppState()))
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useAppStoreSelector<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getAppState()),
    () => selector(state)
  )
}

export function selectBookingRows(s: AppState): BookingRow[] {
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
}

export function selectBoatRows(s: AppState): BoatRow[] {
  return s.boats.map((b: Boat) => ({
    nome: b.nome,
    modello: b.modello,
    capacita: b.capacita,
    stato: b.stato,
    prossimaUscita: b.prossimaUscita,
    equipaggio: b.equipaggio,
    note: b.note,
  }))
}

export function selectPaymentRows(s: AppState): TransazioneRow[] {
  return s.payments.map((p: Payment) => ({
    cliente: p.cliente,
    prenotazioneServizio: p.prenotazioneServizio,
    metodo: p.metodo,
    stato: p.stato,
    importo: p.importo,
    dataOra: p.dataOra,
    note: p.note,
  }))
}

export function selectActiveAlerts(s: AppState): AlertItem[] {
  return s.alerts.filter((a) => !a.resolved)
}
