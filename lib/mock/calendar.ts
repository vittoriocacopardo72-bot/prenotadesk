export const calendarMockEvents = [
  { ora: "09:30", barca: "Azzurra 44", dettaglio: "Blue Horizon", stato: "Confermata" },
  { ora: "10:15", barca: "Orion 31", dettaglio: "Tour costiero", stato: "In arrivo" },
  { ora: "11:00", barca: "Marlin 52", dettaglio: "Noleggio premium", stato: "In attesa" },
  { ora: "18:00", barca: "Levante 28", dettaglio: "Sunset tour", stato: "Confermata" },
] as const

export const calendarWeek = [
  { giorno: "Lunedi", data: "11 mag", eventi: [calendarMockEvents[0], calendarMockEvents[1]] },
  { giorno: "Martedi", data: "12 mag", eventi: [calendarMockEvents[2]] },
  { giorno: "Mercoledi", data: "13 mag", eventi: [] },
  { giorno: "Giovedi", data: "14 mag", eventi: [calendarMockEvents[3]] },
  { giorno: "Venerdi", data: "15 mag", eventi: [calendarMockEvents[1], calendarMockEvents[2]] },
  { giorno: "Sabato", data: "16 mag", eventi: [calendarMockEvents[0]] },
  { giorno: "Domenica", data: "17 mag", eventi: [] },
] as const

export const todayAgenda = [
  { ora: "09:30", titolo: "Azzurra 44", descrizione: "Blue Horizon", stato: "Confermata" },
  { ora: "10:15", titolo: "Orion 31", descrizione: "Tour costiero", stato: "In arrivo" },
  { ora: "11:00", titolo: "Marlin 52", descrizione: "Noleggio premium", stato: "In attesa" },
  { ora: "18:00", titolo: "Levante 28", descrizione: "Sunset tour", stato: "Confermata" },
] as const
