import { addPayment } from "@/lib/actions/mobile-store"
import { ACTION_ERROR } from "@/lib/actions/types"
import type { ActionResult, RegisterPaymentInput } from "@/types/actions"

export async function registerPayment(
  input: RegisterPaymentInput
): Promise<ActionResult<{ paymentId: string }>> {
  if (!input.bookingRef || input.amount <= 0) {
    return {
      status: "error",
      code: ACTION_ERROR.validation,
      message: "Inserisci riferimento prenotazione e importo valido.",
    }
  }

  const row = addPayment(input)
  return {
    status: "success",
    message: "Incasso registrato.",
    data: { paymentId: row.id },
  }
}
