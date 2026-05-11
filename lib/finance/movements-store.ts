"use client"

import { useSyncExternalStore } from "react"

import type { CreateFinanceMovementInput, FinanceMovement } from "@/types/finance"

const STORAGE_KEY = "prenotadesk_finance_movements_v1"

type Listener = () => void

let movementsState: FinanceMovement[] = []
let hydrated = false
const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((listener) => listener())
}

function persist() {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(movementsState))
}

function isMovementLike(value: unknown): value is FinanceMovement {
  if (!value || typeof value !== "object") return false
  const item = value as Partial<FinanceMovement>
  return (
    typeof item.id === "string" &&
    (item.tipo === "Entrata" || item.tipo === "Uscita") &&
    typeof item.importo === "number" &&
    typeof item.descrizione === "string" &&
    typeof item.data === "string" &&
    (item.categoria === "Acconto" ||
      item.categoria === "Carburante" ||
      item.categoria === "Manutenzione" ||
      item.categoria === "Altro")
  )
}

function tryHydrate() {
  if (hydrated || typeof window === "undefined") return
  hydrated = true
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return
  try {
    const parsed = JSON.parse(raw) as unknown
    if (Array.isArray(parsed)) {
      movementsState = parsed.filter(isMovementLike)
    }
  } catch {
    movementsState = []
  }
}

function getSnapshot() {
  tryHydrate()
  return movementsState
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useFinanceMovements(): FinanceMovement[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => [])
}

export function addFinanceMovement(input: CreateFinanceMovementInput): FinanceMovement {
  const movement: FinanceMovement = {
    id: `mov_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    tipo: input.tipo,
    importo: Math.max(0, input.importo),
    descrizione: input.descrizione.trim(),
    data: input.data,
    categoria: input.categoria,
  }
  movementsState = [movement, ...getSnapshot()]
  persist()
  notify()
  return movement
}

export function deleteFinanceMovement(movementId: string): void {
  movementsState = getSnapshot().filter((movement) => movement.id !== movementId)
  persist()
  notify()
}
