import type { AppSettings } from "@/types/domain";
import {
  advancedSettingsGroupIds,
  baseSettingsGroupIds,
  settingsGroups,
  type SettingsGroupDef,
  type SettingsItemDef,
  type SettingsItemResolved,
} from "@/lib/mock/settings";

export type SettingsArea = AppSettings["settingsArea"];

const baseIds = new Set<string>(baseSettingsGroupIds);
const advancedIds = new Set<string>(advancedSettingsGroupIds);

export function selectActiveGroupIds(area: SettingsArea): Set<string> {
  return area === "Base" ? baseIds : advancedIds;
}

export function selectVisibleSettingsGroupDefs(
  area: SettingsArea
): readonly SettingsGroupDef[] {
  const ids = selectActiveGroupIds(area);
  return settingsGroups.filter((g) => ids.has(g.id));
}

export function resolveSettingsItemValue(
  item: SettingsItemDef,
  preferenze: Record<string, string>
): SettingsItemResolved {
  if (!("control" in item) || item.control !== "toggle") {
    return { label: item.label, value: item.value, control: "static" };
  }
  const stored = preferenze[item.prefKey];
  const isOn = stored !== "off";
  return {
    label: item.label,
    value: isOn ? item.onLabel : item.offLabel,
    control: "toggle",
    prefKey: item.prefKey,
    isOn,
  };
}

export function resolveSettingsGroupsForDisplay(
  area: SettingsArea,
  preferenze: Record<string, string>
): Array<SettingsGroupDef & { itemsResolved: SettingsItemResolved[] }> {
  return selectVisibleSettingsGroupDefs(area).map((group) => ({
    ...group,
    itemsResolved: group.items.map((item) =>
      resolveSettingsItemValue(item, preferenze)
    ),
  }));
}
