import {
  BarChart3,
  CalendarDays,
  CreditCard,
  LifeBuoy,
  Settings,
  Ship,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react"

import type { SectionKey } from "@/lib/sections/section-registry"

/** Secondary modules reachable from the mobile Altro hub (Calendar lives here per product decision). */
export const ALTRO_SECTION_KEYS = [
  "Calendario",
  "Meteo marino",
  "Clienti",
  "Barche",
  "Servizi",
  "Finanze",
  "Report",
  "Impostazioni",
] as const satisfies readonly SectionKey[]

export type AltroSectionKey = (typeof ALTRO_SECTION_KEYS)[number]

export type AltroModuleEntry = {
  key: AltroSectionKey
  label: string
  icon: LucideIcon
}

export const ALTRO_MODULE_ENTRIES: readonly AltroModuleEntry[] = [
  { key: "Calendario", label: "Calendario", icon: CalendarDays },
  { key: "Meteo marino", label: "Meteo marino", icon: Sun },
  { key: "Clienti", label: "Clienti", icon: Users },
  { key: "Barche", label: "Barche", icon: Ship },
  { key: "Servizi", label: "Servizi", icon: LifeBuoy },
  { key: "Finanze", label: "Finanze", icon: CreditCard },
  { key: "Report", label: "Report", icon: BarChart3 },
  { key: "Impostazioni", label: "Impostazioni", icon: Settings },
]
