/** Normalize HTML date (YYYY-MM-DD) to display format used by seed data (DD/MM/YYYY). */
export function formatIsoDateToIt(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return iso.trim();
  return `${m[3]}/${m[2]}/${m[1]}`;
}

export function formatTodayIt(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function formatTodayIsoLocal(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function isBookingDateToday(dataField: string): boolean {
  const t = dataField.trim();
  return t === formatTodayIt() || t === formatTodayIsoLocal();
}
