import { ACTION_ERROR } from "@/lib/actions/types"
import { updateAppState } from "@/lib/store/app-store"
import type { ActionResult } from "@/types/actions"
import type { WeatherSummary } from "@/types/domain"

export async function updateWeatherSummary(
  patch: Partial<WeatherSummary>
): Promise<ActionResult<{ updated: true }>> {
  if (Object.keys(patch).length === 0) {
    return { status: "error", code: ACTION_ERROR.validation, message: "Nessun dato meteo da aggiornare." }
  }
  updateAppState((prev) => ({ ...prev, weather: { ...prev.weather, ...patch } }))
  return { status: "success", message: "Meteo aggiornato.", data: { updated: true } }
}
