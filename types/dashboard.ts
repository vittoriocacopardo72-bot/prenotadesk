import type { SectionKey } from "@/lib/sections/section-registry"

/** Opaque permission key for future RBAC; nav items can declare requirements now. */
export type PermissionId = string

export const NAV_ICON_IDS = [
  "home",
  "calendar",
  "sun",
  "users",
  "ship",
  "lifebuoy",
  "credit-card",
  "bar-chart",
  "settings",
] as const

export type NavIconId = (typeof NAV_ICON_IDS)[number]

export type NavLinkItem = {
  kind: "link"
  id: string
  label: string
  icon: NavIconId
  sectionKey: SectionKey
  requiredPermissions?: readonly PermissionId[]
  badge?: string
}

export type NavGroupItem = {
  kind: "group"
  id: string
  label: string
  /** Optional group icon (e.g. section headers in dense sidebars). */
  icon?: NavIconId
  defaultOpen?: boolean
  children: readonly NavNode[]
  requiredPermissions?: readonly PermissionId[]
}

export type NavNode = NavLinkItem | NavGroupItem

export type DashboardNavConfig = {
  readonly nodes: readonly NavNode[]
}

export type NavAccessContext = {
  readonly permissions: ReadonlySet<PermissionId>
}
