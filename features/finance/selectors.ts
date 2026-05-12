/**
 * Pure finance derived state (Chunk A — finance-3a-controlled-activation).
 * Input: in-memory movement list from `useFinanceMovements` / movements-store; no I/O here.
 */
import type { FinanceMovement } from "@/types/finance";

export type FinanceCategoryShareItem = {
  categoria: FinanceMovement["categoria"];
  count: number;
  percentage: number;
};

export type FinanceTotals = {
  totaleEntrate: number;
  totaleUscite: number;
  saldo: number;
};

export type FinanceSummary = FinanceTotals & {
  movimentiOggi: number;
  ultimiMovimenti: FinanceMovement[];
  distribuzioneCategorie: FinanceCategoryShareItem[];
};

function isoDateFromNow(now: Date): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function selectFinanceTotals(
  movements: readonly FinanceMovement[]
): FinanceTotals {
  let totaleEntrate = 0;
  let totaleUscite = 0;

  for (const movement of movements) {
    if (movement.tipo === "Entrata") totaleEntrate += movement.importo;
    if (movement.tipo === "Uscita") totaleUscite += movement.importo;
  }

  return {
    totaleEntrate,
    totaleUscite,
    saldo: totaleEntrate - totaleUscite,
  };
}

export function selectFinanceTodayCount(
  movements: readonly FinanceMovement[],
  todayIsoDate: string
): number {
  let count = 0;
  for (const movement of movements) {
    if (movement.data === todayIsoDate) count += 1;
  }
  return count;
}

export function selectFinanceLatestMovements(
  movements: readonly FinanceMovement[],
  latestCount: number
): FinanceMovement[] {
  const safeCount = Math.max(0, Math.floor(latestCount));
  return movements.slice(0, safeCount);
}

export function selectFinanceCategoryShare(
  movements: readonly FinanceMovement[]
): FinanceCategoryShareItem[] {
  if (movements.length === 0) return [];

  const counts = new Map<FinanceMovement["categoria"], number>();
  for (const movement of movements) {
    counts.set(movement.categoria, (counts.get(movement.categoria) ?? 0) + 1);
  }

  const total = movements.length;
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([categoria, count]) => ({
      categoria,
      count,
      percentage: Math.round((count / total) * 100),
    }));
}

export function selectFinanceSummary(
  movements: readonly FinanceMovement[],
  options?: { todayIsoDate?: string; latestCount?: number; now?: Date }
): FinanceSummary {
  const todayIsoDate =
    options?.todayIsoDate ?? isoDateFromNow(options?.now ?? new Date());
  const latestCount = options?.latestCount ?? 5;
  const totals = selectFinanceTotals(movements);

  return {
    ...totals,
    movimentiOggi: selectFinanceTodayCount(movements, todayIsoDate),
    ultimiMovimenti: selectFinanceLatestMovements(movements, latestCount),
    distribuzioneCategorie: selectFinanceCategoryShare(movements),
  };
}
