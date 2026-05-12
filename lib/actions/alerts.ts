import { ACTION_ERROR } from "@/lib/actions/types";
import {
  getAppState,
  selectActiveAlerts,
  updateAppState,
} from "@/lib/store/app-store";
import type { ActionResult } from "@/types/actions";

export async function markAlertResolved(
  alertId: string
): Promise<ActionResult<{ alertId: string }>> {
  const target = getAppState().alerts.find((a) => a.id === alertId);
  if (!target) {
    return {
      status: "error",
      code: ACTION_ERROR.notFound,
      message: "Alert non trovato.",
    };
  }

  updateAppState((prev) => ({
    ...prev,
    alerts: prev.alerts.map((a) =>
      a.id === alertId ? { ...a, resolved: true } : a
    ),
  }));
  return { status: "success", message: "Alert risolto.", data: { alertId } };
}

export function getUnresolvedAlerts() {
  return selectActiveAlerts(getAppState());
}
