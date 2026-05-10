import { ACTION_ERROR } from "@/lib/actions/types"
import { getAppState, updateAppState } from "@/lib/store/app-store"
import type { ActionResult, SetBoatBlockStateInput } from "@/types/actions"
import type { BoatStatus } from "@/types/domain"

export async function setBoatBlockState(
  input: SetBoatBlockStateInput
): Promise<ActionResult<{ boatName: string; blocked: boolean }>> {
  if (!input.boatName) {
    return { status: "error", code: ACTION_ERROR.validation, message: "Seleziona una barca." }
  }
  const target = getAppState().boats.find((b) => b.nome === input.boatName)
  if (!target) {
    return { status: "error", code: ACTION_ERROR.notFound, message: "Barca non trovata." }
  }

  const nextStatus: BoatStatus = input.blocked ? "Manutenzione" : "Pronta"
  updateAppState((prev) => ({
    ...prev,
    boats: prev.boats.map((boat) =>
      boat.nome === input.boatName
        ? {
            ...boat,
            blocked: input.blocked,
            stato: nextStatus,
            note: input.reason?.trim() || boat.note,
          }
        : boat
    ),
  }))
  return {
    status: "success",
    message: input.blocked ? "Barca bloccata." : "Barca sbloccata.",
    data: { boatName: input.boatName, blocked: input.blocked },
  }
}
