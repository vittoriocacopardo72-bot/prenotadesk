"use client"

import { useMemo } from "react"

import { resolveSettingsGroupsForDisplay, type SettingsArea } from "@/features/settings/selectors"
import { useAppStoreSelector } from "@/lib/store/app-store"

export function useSettingsSectionDisplay() {
  const settingsArea = useAppStoreSelector((s) => s.settings.settingsArea) as SettingsArea
  const preferenze = useAppStoreSelector((s) => s.settings.preferenze)

  const groups = useMemo(
    () => resolveSettingsGroupsForDisplay(settingsArea, preferenze),
    [settingsArea, preferenze]
  )

  return { settingsArea, groups }
}
