"use client"

/**
 * Read-only finance summary (Chunk B — finance-3a-controlled-activation).
 * Consumes `useFinanceMovements`; no writes, no localStorage here.
 */

import { useMemo } from "react"

import { selectFinanceSummary } from "@/features/finance/selectors"
import { useFinanceMovements } from "@/lib/finance/movements-store"

export function useFinanceSummary() {
  const movements = useFinanceMovements()

  return useMemo(() => {
    return selectFinanceSummary(movements, { latestCount: 5 })
  }, [movements])
}
