export type BookingStatus =
  | "Confermate"
  | "In arrivo"
  | "In attesa"
  | "Cancellate"
  | "Check-in";

export type Booking = {
  id: string;
  cliente: string;
  barca: string;
  servizio: string;
  data: string;
  ora: string;
  ospiti: number;
  stato: BookingStatus;
  importo: string;
};

export type Client = {
  id: string;
  nome: string;
  telefono: string;
  email: string;
  provenienza: string;
  ultimaPrenotazione: string;
  preferenze: string;
  stato: "VIP" | "Business" | "Attivo" | "Partner";
  isNuovo: boolean;
  daRicontattare: boolean;
  richiesteSpeciali: boolean;
};

export type BoatStatus =
  | "Pronta"
  | "In uscita"
  | "In preparazione"
  | "Manutenzione"
  | "Check tecnico";

export type Boat = {
  id: string;
  nome: string;
  modello: string;
  capacita: string;
  stato: BoatStatus;
  prossimaUscita: string;
  equipaggio: string;
  note: string;
  blocked: boolean;
};

export type PaymentStatus = "Pagato" | "In sospeso" | "Rimborso" | "Deposito";

export type Payment = {
  id: string;
  cliente: string;
  prenotazioneServizio: string;
  metodo: string;
  stato: PaymentStatus;
  importo: string;
  dataOra: string;
  note: string;
};

export type CrewAssignment = {
  id: string;
  departureRef: string;
  crewName: string;
  notes?: string;
  createdAt: string;
};

export type AlertItem = {
  id: string;
  text: string;
  resolved: boolean;
};

export type WeatherSummary = {
  mare: string;
  vento: string;
  visibilita: string;
  statoPorto: string;
  livelloOperativo: string;
};

export type AppSettings = {
  settingsArea: "Base" | "Avanzate";
  preferenze: Record<string, string>;
};

export type AppState = {
  bookings: Booking[];
  clients: Client[];
  boats: Boat[];
  payments: Payment[];
  crewAssignments: CrewAssignment[];
  alerts: AlertItem[];
  weather: WeatherSummary;
  settings: AppSettings;
};
