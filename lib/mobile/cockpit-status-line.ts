/**
 * Pure formatter for mobile cockpit status strip (no mock KPIs).
 * Callers supply counts from app store + finance summary selectors/hooks.
 */

export type CockpitStatusLineParts = {
  prenotazioniOggi: number
  ospitiOggi: number
  saldoLocaleEur: number
  movimentiCassaOggi: number
}

function formatEur(n: number): string {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)
}

export function buildCockpitStatusLine(parts: CockpitStatusLineParts): string {
  const { prenotazioniOggi, ospitiOggi, saldoLocaleEur, movimentiCassaOggi } = parts
  return `${prenotazioniOggi} pren. oggi · ${ospitiOggi} ospiti · ${movimentiCassaOggi} mov. cassa · saldo ${formatEur(saldoLocaleEur)}`
}
