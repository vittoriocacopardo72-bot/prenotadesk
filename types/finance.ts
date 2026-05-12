export type FinanceMovementType = "Entrata" | "Uscita";

export type FinanceMovementCategory =
  | "Acconto"
  | "Carburante"
  | "Manutenzione"
  | "Altro";

export type FinanceMovement = {
  id: string;
  tipo: FinanceMovementType;
  importo: number;
  descrizione: string;
  data: string;
  categoria: FinanceMovementCategory;
};

export type CreateFinanceMovementInput = Omit<FinanceMovement, "id">;
