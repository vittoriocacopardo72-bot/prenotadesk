export type TransazioneStato = "Pagato" | "In sospeso" | "Rimborso" | "Deposito"

export type TransazioneFilter = "Tutti" | "Pagato" | "In sospeso" | "Rimborso" | "Deposito"

export type TransazioneRow = {
  cliente: string
  prenotazioneServizio: string
  metodo: string
  stato: TransazioneStato
  importo: string
  dataOra: string
  note: string
}
