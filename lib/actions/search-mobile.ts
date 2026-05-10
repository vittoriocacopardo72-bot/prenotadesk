import { getSearchSnapshot } from "@/lib/actions/mobile-store"
import type { ActionResult, MobileSearchResult } from "@/types/actions"

export async function searchMobile(query: string): Promise<ActionResult<{ items: MobileSearchResult[] }>> {
  const q = query.trim().toLowerCase()
  if (!q) {
    return { status: "success", message: "Inserisci almeno 1 carattere.", data: { items: [] } }
  }

  const src = getSearchSnapshot()
  const items: MobileSearchResult[] = []

  src.alerts.forEach((alert, idx) => {
    if (alert.toLowerCase().includes(q)) {
      items.push({
        id: `alert_${idx}`,
        kind: "alert",
        title: "Alert operativo",
        subtitle: alert,
        target: { type: "tab", tab: "home" },
      })
    }
  })

  src.departures.forEach((dep, idx) => {
    const line = `${dep.ora} ${dep.barca} ${dep.servizio} ${dep.stato}`.toLowerCase()
    if (line.includes(q)) {
      items.push({
        id: `dep_${idx}`,
        kind: "departure",
        title: `${dep.ora} · ${dep.barca}`,
        subtitle: `${dep.servizio} • ${dep.stato}`,
        target: { type: "tab", tab: "operazioni" },
      })
    }
  })

  src.fleet.forEach((boat, idx) => {
    const line = `${boat.nome} ${boat.readiness} ${boat.crew}`.toLowerCase()
    if (line.includes(q)) {
      items.push({
        id: `boat_${idx}`,
        kind: "boat",
        title: boat.nome,
        subtitle: `${boat.readiness} • Prossima ${boat.next}`,
        target: { type: "section", sectionKey: "Barche" },
      })
    }
  })

  src.bookings.forEach((booking) => {
    const line = `${booking.customerName} ${booking.boatName} ${booking.service}`.toLowerCase()
    if (line.includes(q)) {
      items.push({
        id: booking.id,
        kind: "booking",
        title: booking.customerName,
        subtitle: `${booking.boatName} • ${booking.date} ${booking.time}`,
        target: { type: "tab", tab: "prenotazioni" },
      })
    }
  })

  return { status: "success", message: `${items.length} risultati`, data: { items: items.slice(0, 20) } }
}
