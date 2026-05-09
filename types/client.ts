export type ClientStato = "VIP" | "Business" | "Attivo" | "Partner"

export type ClientFilter =
  | "Tutti"
  | "VIP"
  | "Nuovi"
  | "Da ricontattare"
  | "Con richieste speciali"

export type ClientRow = {
  nome: string
  telefono: string
  email: string
  provenienza: string
  ultimaPrenotazione: string
  preferenze: string
  stato: ClientStato
  isNuovo: boolean
  daRicontattare: boolean
  richiesteSpeciali: boolean
}
