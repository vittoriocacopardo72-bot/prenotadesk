import { fleetRows } from "@/lib/mock/boats";
import { prenotazioniRows } from "@/lib/mock/bookings";
import { clientiRows } from "@/lib/mock/clients";
import { dashboardAlerts, dashboardMarineWidgets } from "@/lib/mock/dashboard";
import { transazioniRows } from "@/lib/mock/incassi";
import type { AppState } from "@/types/domain";

export const APP_STORE_VERSION = 1;

export function createSeedState(): AppState {
  const marineMap = Object.fromEntries(
    dashboardMarineWidgets.map((w) => [w.label, w.value])
  ) as Record<string, string>;

  return {
    bookings: prenotazioniRows.map((row, idx) => ({
      ...row,
      id: `booking_${idx + 1}`,
    })),
    clients: clientiRows.map((row, idx) => ({
      ...row,
      id: `client_${idx + 1}`,
    })),
    boats: fleetRows.map((row, idx) => ({
      ...row,
      id: `boat_${idx + 1}`,
      blocked: row.stato === "Manutenzione",
    })),
    payments: transazioniRows.map((row, idx) => ({
      ...row,
      id: `payment_${idx + 1}`,
    })),
    crewAssignments: [],
    alerts: dashboardAlerts.map((text, idx) => ({
      id: `alert_${idx + 1}`,
      text,
      resolved: false,
    })),
    weather: {
      mare: marineMap.Mare ?? "N/D",
      vento: marineMap.Vento ?? "N/D",
      visibilita: marineMap.Visibilita ?? "N/D",
      statoPorto: marineMap["Stato porto"] ?? "N/D",
      livelloOperativo: marineMap["Livello operativo giornata"] ?? "N/D",
    },
    settings: {
      settingsArea: "Base",
      preferenze: {},
    },
  };
}
