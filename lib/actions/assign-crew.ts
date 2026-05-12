import { addAssignment } from "@/lib/actions/mobile-store";
import { ACTION_ERROR } from "@/lib/actions/types";
import type { ActionResult, AssignCrewInput } from "@/types/actions";

export async function assignCrew(
  input: AssignCrewInput
): Promise<ActionResult<{ assignmentId: string }>> {
  if (!input.departureRef || !input.crewName) {
    return {
      status: "error",
      code: ACTION_ERROR.validation,
      message: "Seleziona partenza ed equipaggio.",
    };
  }

  const row = addAssignment(input);
  return {
    status: "success",
    message: "Equipaggio assegnato.",
    data: { assignmentId: row.id },
  };
}
