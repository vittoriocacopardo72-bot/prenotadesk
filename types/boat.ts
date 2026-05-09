export type BoatStatus = "Pronta" | "In uscita" | "In preparazione" | "Manutenzione" | "Check tecnico"

export type BoatRow = {
  nome: string
  modello: string
  capacita: string
  stato: BoatStatus
  prossimaUscita: string
  equipaggio: string
  note: string
}
