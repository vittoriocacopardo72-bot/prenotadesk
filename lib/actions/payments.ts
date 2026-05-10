import { ACTION_ERROR } from "@/lib/actions/types"
import { updateAppState } from "@/lib/store/app-store"
import type { ActionResult, RegisterPaymentInput } from "@/types/actions"
import type { PaymentStatus } from "@/types/domain"

export async function registerPayment(
  input: RegisterPaymentInput
): Promise<ActionResult<{ paymentId: string }>> {
  if (!input.bookingRef || input.amount <= 0) {
    return { status: "error", code: ACTION_ERROR.validation, message: "Inserisci riferimento e importo valido." }
  }

  const paymentId = `payment_${Date.now().toString(36)}`
  const method = input.method === "POS" ? "Carta" : input.method
  const status: PaymentStatus = input.method === "Bonifico" ? "In sospeso" : "Pagato"

  updateAppState((prev) => ({
    ...prev,
    payments: [
      {
        id: paymentId,
        cliente: input.bookingRef,
        prenotazioneServizio: "Incasso mobile",
        metodo: method,
        stato: status,
        importo: `€ ${input.amount.toFixed(2)}`,
        dataOra: new Date().toLocaleString("it-IT", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }),
        note: input.notes ?? "",
      },
      ...prev.payments,
    ],
  }))
  return { status: "success", message: "Incasso registrato.", data: { paymentId } }
}
