export type BookingStatus =
  | "Confermate"
  | "In arrivo"
  | "In attesa"
  | "Cancellate"
  | "Check-in";

export type BookingFilter =
  | "Tutte"
  | "Confermate"
  | "In arrivo"
  | "In attesa"
  | "Cancellate";

export type BookingRow = {
  id?: string;
  cliente: string;
  barca: string;
  servizio: string;
  data: string;
  ora: string;
  ospiti: number;
  stato: BookingStatus;
  importo: string;
};
