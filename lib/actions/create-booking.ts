import { addBooking } from "@/lib/actions/mobile-store";
import { ACTION_ERROR } from "@/lib/actions/types";
import type { ActionResult, CreateBookingInput } from "@/types/actions";

export async function createBooking(
  input: CreateBookingInput
): Promise<ActionResult<{ bookingId: string }>> {
  if (!input.customerName || !input.boatName || !input.date || !input.time) {
    return {
      status: "error",
      code: ACTION_ERROR.validation,
      message: "Compila cliente, barca, data e ora.",
    };
  }

  const row = addBooking(input);
  return {
    status: "success",
    message: "Prenotazione creata.",
    data: { bookingId: row.id },
  };
}
