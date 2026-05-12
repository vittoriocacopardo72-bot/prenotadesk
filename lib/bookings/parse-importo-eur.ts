/**
 * Parse booking/payment display strings like "€ 1.280", "€ 620", "€ 0" to a EUR amount.
 * Italian-style grouping: dot as thousands separator; optional comma as decimal separator.
 */
export function parseImportoEurDisplay(raw: string): number {
  const s = raw.replace(/€/g, "").trim();
  if (!s) return 0;
  const lastComma = s.lastIndexOf(",");
  if (lastComma >= 0) {
    const intPart = s.slice(0, lastComma).replace(/\./g, "");
    const decPart = s.slice(lastComma + 1);
    const n = Number(`${intPart}.${decPart}`);
    return Number.isFinite(n) ? n : 0;
  }
  const digits = s.replace(/\./g, "");
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
}
