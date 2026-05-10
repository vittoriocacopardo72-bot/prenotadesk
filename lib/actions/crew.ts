import { ACTION_ERROR } from "@/lib/actions/types"
import { updateAppState } from "@/lib/store/app-store"
import type { ActionResult, AssignCrewInput } from "@/types/actions"

export async function assignCrew(input: AssignCrewInput): Promise<ActionResult<{ assignmentId: string }>> {
  if (!input.departureRef || !input.crewName) {
    return { status: "error", code: ACTION_ERROR.validation, message: "Seleziona partenza ed equipaggio." }
  }

  const assignmentId = `asg_${Date.now().toString(36)}`
  updateAppState((prev) => ({
    ...prev,
    crewAssignments: [
      {
        id: assignmentId,
        departureRef: input.departureRef,
        crewName: input.crewName,
        notes: input.notes,
        createdAt: new Date().toISOString(),
      },
      ...prev.crewAssignments,
    ],
    boats: prev.boats.map((boat) =>
      input.departureRef.includes(boat.nome) ? { ...boat, equipaggio: input.crewName } : boat
    ),
  }))
  return { status: "success", message: "Equipaggio assegnato.", data: { assignmentId } }
}
