import {
  BarChart3,
  CalendarDays,
  CreditCard,
  Home,
  LifeBuoy,
  Settings,
  Ship,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { NavIconId } from "@/types/dashboard";

const navIconMap = {
  home: Home,
  calendar: CalendarDays,
  sun: Sun,
  users: Users,
  ship: Ship,
  lifebuoy: LifeBuoy,
  "credit-card": CreditCard,
  "bar-chart": BarChart3,
  settings: Settings,
} as const satisfies Record<NavIconId, LucideIcon>;

export function getNavIcon(id: NavIconId): LucideIcon {
  return navIconMap[id];
}
