import type { DashboardNavConfig } from "@/types/dashboard"

/**
 * Single source of truth for dashboard navigation structure.
 * Visual styling stays in shell components; this file only declares hierarchy and targets.
 */
export const dashboardNavConfig: DashboardNavConfig = {
  nodes: [
    {
      kind: "group",
      id: "operations",
      label: "Operatività",
      defaultOpen: true,
      children: [
        {
          kind: "link",
          id: "nav-dashboard",
          label: "Dashboard",
          icon: "home",
          sectionKey: "Dashboard",
        },
        {
          kind: "link",
          id: "nav-bookings",
          label: "Prenotazioni",
          icon: "calendar",
          sectionKey: "Prenotazioni",
        },
        {
          kind: "link",
          id: "nav-calendar",
          label: "Calendario",
          icon: "calendar",
          sectionKey: "Calendario",
        },
        {
          kind: "link",
          id: "nav-weather",
          label: "Meteo marino",
          icon: "sun",
          sectionKey: "Meteo marino",
        },
      ],
    },
    {
      kind: "group",
      id: "resources",
      label: "Risorse",
      defaultOpen: true,
      children: [
        {
          kind: "link",
          id: "nav-clients",
          label: "Clienti",
          icon: "users",
          sectionKey: "Clienti",
        },
        {
          kind: "link",
          id: "nav-boats",
          label: "Barche",
          icon: "ship",
          sectionKey: "Barche",
        },
        {
          kind: "link",
          id: "nav-services",
          label: "Servizi",
          icon: "lifebuoy",
          sectionKey: "Servizi",
        },
      ],
    },
    {
      kind: "group",
      id: "admin",
      label: "Amministrazione",
      defaultOpen: true,
      children: [
        {
          kind: "link",
          id: "nav-finance",
          label: "Finanze",
          icon: "credit-card",
          sectionKey: "Finanze",
        },
        {
          kind: "link",
          id: "nav-report",
          label: "Report",
          icon: "bar-chart",
          sectionKey: "Report",
        },
      ],
    },
    {
      kind: "link",
      id: "nav-settings",
      label: "Impostazioni",
      icon: "settings",
      sectionKey: "Impostazioni",
    },
  ],
}
