import { getAppState } from "@/lib/store/app-store";
import type { ActionResult, MobileSearchResult } from "@/types/actions";

export async function searchMobile(
  query: string
): Promise<ActionResult<{ items: MobileSearchResult[] }>> {
  const q = query.trim().toLowerCase();
  if (!q) {
    return {
      status: "success",
      message: "Inserisci almeno 1 carattere.",
      data: { items: [] },
    };
  }

  const src = getAppState();
  const items: MobileSearchResult[] = [];

  src.alerts
    .filter((a) => !a.resolved)
    .forEach((alert, idx) => {
      if (alert.text.toLowerCase().includes(q)) {
        items.push({
          id: `alert_${idx}`,
          kind: "alert",
          title: "Alert operativo",
          subtitle: alert.text,
          target: { type: "tab", tab: "home" },
        });
      }
    });

  src.bookings.forEach((booking) => {
    const line =
      `${booking.cliente} ${booking.barca} ${booking.servizio}`.toLowerCase();
    if (line.includes(q)) {
      items.push({
        id: booking.id,
        kind: "booking",
        title: booking.cliente,
        subtitle: `${booking.barca} • ${booking.data} ${booking.ora}`,
        target: { type: "tab", tab: "prenotazioni" },
      });
    }
  });

  src.bookings.forEach((dep, idx) => {
    const line =
      `${dep.ora} ${dep.barca} ${dep.servizio} ${dep.stato}`.toLowerCase();
    if (line.includes(q)) {
      items.push({
        id: `dep_${idx}`,
        kind: "departure",
        title: `${dep.ora} · ${dep.barca}`,
        subtitle: `${dep.servizio} • ${dep.stato}`,
        target: { type: "tab", tab: "operazioni" },
      });
    }
  });

  src.boats.forEach((boat, idx) => {
    const line = `${boat.nome} ${boat.stato} ${boat.equipaggio}`.toLowerCase();
    if (line.includes(q)) {
      items.push({
        id: `boat_${idx}`,
        kind: "boat",
        title: boat.nome,
        subtitle: `${boat.stato} • Prossima ${boat.prossimaUscita}`,
        target: { type: "section", sectionKey: "Barche" },
      });
    }
  });

  return {
    status: "success",
    message: `${items.length} risultati`,
    data: { items: items.slice(0, 20) },
  };
}
