import { updateAppState } from "@/lib/store/app-store"
import type { ActionResult } from "@/types/actions"
import type { AppSettings } from "@/types/domain"

export async function updateSettingsPreferences(
  patch: Partial<AppSettings>
): Promise<ActionResult<{ updated: true }>> {
  updateAppState((prev) => ({
    ...prev,
    settings: {
      ...prev.settings,
      ...patch,
      preferenze: { ...prev.settings.preferenze, ...(patch.preferenze ?? {}) },
    },
  }))
  return { status: "success", message: "Preferenze aggiornate.", data: { updated: true } }
}
