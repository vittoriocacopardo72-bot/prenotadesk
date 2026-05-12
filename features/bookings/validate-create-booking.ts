import type { CreateBookingInput } from "@/types/actions";

/** Client and server: required fields for createBooking. */
export function getCreateBookingValidationError(
  input: CreateBookingInput
): string | null {
  if (!input.customerName?.trim()) {
    return "Inserisci il nome cliente.";
  }
  if (!input.boatName?.trim()) {
    return "Inserisci la barca.";
  }
  if (!input.date?.trim()) {
    return "Seleziona la data.";
  }
  if (!input.time?.trim()) {
    return "Seleziona l'ora.";
  }
  return null;
}
