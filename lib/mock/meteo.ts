export const meteoMainCards = [
  { label: "Vento", value: "NE 14 nodi", detail: "Stabile mattina" },
  { label: "Raffiche", value: "18 nodi", detail: "Picco previsto 16:30" },
  { label: "Mare", value: "Mosso leggero", detail: "Condizioni gestibili" },
  { label: "Onda", value: "0.8 m", detail: "In crescita lieve" },
  { label: "Visibilita", value: "9.5 km", detail: "Ottima lungo costa" },
  { label: "Temperatura", value: "24 C", detail: "Percepita 26 C" },
  { label: "Corrente", value: "Moderata", detail: "Direzione sud-est" },
  { label: "Stato porto", value: "Regolare", detail: "Traffico medio" },
] as const

export const meteoTimeSlots = [
  { fascia: "08:00-10:00", vento: "12 nodi", mare: "Calmo-mosso", rischio: "Basso", decisione: "Operativo" },
  { fascia: "10:00-12:00", vento: "14 nodi", mare: "Mosso leggero", rischio: "Basso", decisione: "Operativo" },
  { fascia: "12:00-14:00", vento: "15 nodi", mare: "Mosso", rischio: "Medio", decisione: "Attenzione" },
  { fascia: "14:00-16:00", vento: "17 nodi", mare: "Mosso", rischio: "Medio", decisione: "Attenzione" },
  { fascia: "16:00-18:00", vento: "20 nodi", mare: "Mosso in aumento", rischio: "Medio-alto", decisione: "Monitorare" },
] as const

export const meteoAlerts = [
  "Vento in aumento nel pomeriggio.",
  "Uscite premium ok nelle prime fasce.",
  "Barche piccole da valutare dopo le 16:00.",
  "Briefing ospiti consigliato prima della partenza.",
] as const

export const meteoDeparturesImpact = [
  { ora: "09:30", corsa: "Azzurra 44 - Blue Horizon", stato: "Confermata" },
  { ora: "10:15", corsa: "Orion 31 - Tour costiero", stato: "Da monitorare" },
  { ora: "11:00", corsa: "Marlin 52 - Noleggio premium", stato: "Consigliato briefing" },
  { ora: "16:30", corsa: "Levante 28 - Sunset pre-tour", stato: "Possibile ritardo" },
] as const
