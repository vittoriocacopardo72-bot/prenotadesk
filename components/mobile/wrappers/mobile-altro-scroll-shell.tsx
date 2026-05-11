import type { ReactNode } from "react"

/**
 * Constrains wide section layouts (tables, multi-column grids) inside the mobile Altro route.
 */
export function MobileAltroScrollShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0 max-w-full overflow-x-auto [-webkit-overflow-scrolling:touch] pb-1">{children}</div>
  )
}
