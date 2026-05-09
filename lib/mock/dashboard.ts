export const dashboardKpis = [
  {
    title: "Incasso oggi",
    value: "€ 4.860",
    trend: "+12% vs ieri",
    occupancy: "Target giornaliero 68%",
    note: "Picco vendite tra 10:00 e 12:00",
    icon: "wallet",
  },
  {
    title: "Partenze oggi",
    value: "18",
    trend: "+3 slot rispetto a ieri",
    occupancy: "Slot occupati 81%",
    note: "4 partenze entro 90 minuti",
    icon: "waves",
  },
  {
    title: "Ospiti totali",
    value: "127",
    trend: "+9% settimana su settimana",
    occupancy: "Capienza giornaliera 84%",
    note: "12 ospiti VIP in agenda",
    icon: "users",
  },
  {
    title: "Barche libere",
    value: "9",
    trend: "-2 rispetto alle 08:00",
    occupancy: "Flotta disponibile 47%",
    note: "2 unita in standby meteo",
    icon: "ship",
  },
] as const

export const dashboardDepartures = [
  { ora: "09:30", barca: "Azzurra 44", servizio: "Blue Horizon", stato: "Confermata" },
  { ora: "10:15", barca: "Orion 31", servizio: "Tour costiero", stato: "Imbarco" },
  { ora: "11:00", barca: "Marlin 52", servizio: "Noleggio premium", stato: "In preparazione" },
  { ora: "12:30", barca: "Tyrrhenian 40", servizio: "Charter privato", stato: "Confermata" },
] as const

export const dashboardFleetLive = [
  { nome: "Azzurra 44", readiness: "Pronta", fuel: "78%", next: "09:30", crew: "Marco + Luca" },
  { nome: "Orion 31", readiness: "In uscita", fuel: "65%", next: "10:15", crew: "Salvo" },
  { nome: "Marlin 52", readiness: "Check tecnico", fuel: "82%", next: "11:00", crew: "Andrea + Fabio" },
  { nome: "Levante 28", readiness: "Manutenzione", fuel: "40%", next: "Nessuna", crew: "-" },
] as const

export const dashboardActiveCrew = [
  "Marco e Luca - Molo A",
  "Salvo - Banchina nord",
  "Andrea e Fabio - Preparazione premium",
  "Giuseppe e Mario - Standby charter",
] as const

export const dashboardAlerts = [
  "Vento in aumento previsto dalle 16:00.",
  "Levante 28 in manutenzione: uscita bloccata.",
  "2 check-in VIP richiedono briefing dedicato.",
] as const

export const dashboardAgenda = {
  checkIn: ["09:00 Blue Horizon", "10:45 Sea Pearl Group", "11:30 Vip Concierge Napoli"],
  partenze: ["09:30 Azzurra 44", "10:15 Orion 31", "11:00 Marlin 52"],
  manutenzioni: ["14:30 Levante 28 - controllo motore", "17:00 Mistral 36 - test impianto"],
  vip: ["Famiglia Rinaldi - lounge premium", "Charter Aurora - assistenza dedicata"],
  ritardi: ["Orion 31 +10 min per ritardo ospiti"],
} as const

export const dashboardFinance = [
  { label: "Incasso previsto giornata", value: "€ 7.240", detail: "67% gia confermato" },
  { label: "Incassi da chiudere", value: "€ 1.120", detail: "5 transazioni in sospeso" },
  { label: "Extra venduti", value: "23", detail: "Prosecco e transfer top richiesta" },
  { label: "Upgrade premium", value: "6", detail: "Valore medio €85" },
] as const

export const dashboardQuickActions = [
  "Nuova prenotazione",
  "Assegna equipaggio",
  "Registra pagamento",
  "Blocca barca",
  "Apri calendario",
  "Aggiorna meteo",
] as const

export const dashboardMarineWidgets = [
  { label: "Mare", value: "Mosso leggero", detail: "Onda 0.7m" },
  { label: "Vento", value: "NE 14 nodi", detail: "Raffiche 18 nodi" },
  { label: "Visibilita", value: "Ottima", detail: "9.8 km stimati" },
  { label: "Stato porto", value: "Regolare", detail: "Traffico medio" },
  { label: "Livello operativo giornata", value: "Alto", detail: "78% capacita attiva" },
] as const
