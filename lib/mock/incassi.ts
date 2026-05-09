import type { TransazioneFilter, TransazioneRow } from "@/types/incassi"

export const incassiFilters: TransazioneFilter[] = [
  "Tutti",
  "Pagato",
  "In sospeso",
  "Rimborso",
  "Deposito",
]

export const transazioniRows: TransazioneRow[] = [
  {
    cliente: "Blue Horizon S.r.l.",
    prenotazioneServizio: "Charter giornaliero",
    metodo: "Bonifico",
    stato: "Pagato",
    importo: "€1.200",
    dataOra: "09/05 09:10",
    note: "Saldo saldato",
  },
  {
    cliente: "Luca Rinaldi",
    prenotazioneServizio: "Tour costiero",
    metodo: "Carta",
    stato: "Pagato",
    importo: "€180",
    dataOra: "09/05 10:00",
    note: "POS banchina",
  },
  {
    cliente: "Sea & Co. Charter",
    prenotazioneServizio: "Noleggio premium",
    metodo: "Acconto",
    stato: "In sospeso",
    importo: "€300",
    dataOra: "09/05 10:45",
    note: "In attesa bonifico",
  },
  {
    cliente: "Alessia Bianchi",
    prenotazioneServizio: "Sunset tour",
    metodo: "Contanti",
    stato: "Pagato",
    importo: "€210",
    dataOra: "09/05 17:30",
    note: "",
  },
  {
    cliente: "Mare Vivo Eventi",
    prenotazioneServizio: "Evento privato",
    metodo: "Bonifico",
    stato: "Deposito",
    importo: "€500",
    dataOra: "10/05 12:30",
    note: "Cauzione evento",
  },
  {
    cliente: "Famiglia Rinaldi",
    prenotazioneServizio: "Upgrade premium",
    metodo: "Carta",
    stato: "Rimborso",
    importo: "-€70",
    dataOra: "09/05 13:15",
    note: "Annullamento parziale",
  },
]
