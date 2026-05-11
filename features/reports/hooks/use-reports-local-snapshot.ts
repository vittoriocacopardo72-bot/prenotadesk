"use client"

import { useMemo } from "react"

import { useFinanceSummary } from "@/features/finance"
import { selectBookingRows, selectPaymentRows, useAppStoreSelector } from "@/lib/store/app-store"

import { selectReportsLocalSnapshot } from "../selectors"

/**
 * Read-only lane: app store (bookings/payments) + finance summary hook.
 * No mutations; no finance store imports beyond public `useFinanceSummary`.
 */
export function useReportsLocalSnapshot() {
  const bookingRows = useAppStoreSelector(selectBookingRows)
  const paymentRows = useAppStoreSelector(selectPaymentRows)
  const financeSummary = useFinanceSummary()

  return useMemo(
    () => selectReportsLocalSnapshot(bookingRows, paymentRows, financeSummary),
    [bookingRows, paymentRows, financeSummary]
  )
}
