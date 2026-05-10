import { formatTodayIt } from "@/features/bookings/booking-dates"

/** Match payment `dataOra` seed formats (e.g. "10/05 12:30") and locale strings (e.g. "10/05/2026, 12:30"). */
export function isPaymentDataOraToday(dataOra: string): boolean {
  const todayIt = formatTodayIt()
  const d = Number(todayIt.slice(0, 2))
  const m = Number(todayIt.slice(3, 5))
  const dm = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`
  const head = dataOra.trim().split(/[\s,]+/)[0] ?? ""
  const mm = /^(\d{1,2})\/(\d{1,2})/.exec(head)
  if (!mm) return false
  const rowDm = `${mm[1].padStart(2, "0")}/${mm[2].padStart(2, "0")}`
  return rowDm === dm
}
