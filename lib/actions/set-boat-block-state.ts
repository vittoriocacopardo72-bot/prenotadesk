import { getBoatBlocked, setBoatBlocked } from "@/lib/actions/mobile-store"
import { ACTION_ERROR } from "@/lib/actions/types"
import type { ActionResult, SetBoatBlockStateInput } from "@/types/actions"

export async function setBoatBlockState(
  input: SetBoatBlockStateInput
): Promise<ActionResult<{ boatName: string; blocked: boolean }>> {
  if (!input.boatName) {
    return {
      status: "error",
      code: ACTION_ERROR.validation,
      message: "Seleziona una barca.",
    }
  }

  const current = getBoatBlocked(input.boatName)
  if (current === input.blocked) {
    return {
      status: "error",
      code: ACTION_ERROR.validation,
      message: input.blocked ? "La barca è già bloccata." : "La barca è già operativa.",
    }
  }

  setBoatBlocked(input.boatName, input.blocked, input.reason)
  return {
    status: "success",
    message: input.blocked ? "Barca bloccata." : "Barca sbloccata.",
    data: { boatName: input.boatName, blocked: input.blocked },
  }
}
