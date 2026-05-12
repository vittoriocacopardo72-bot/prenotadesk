import { createElement, type ComponentType, type ReactElement } from "react";
import {
  BarChart3,
  CalendarDays,
  CreditCard,
  Home as HomeIcon,
  LifeBuoy,
  Settings,
  Ship,
  Sun,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { BookingsSection } from "@/features/bookings";
import { BoatsSection } from "@/components/boats/boats-section";
import { CalendarSection } from "@/components/calendar/calendar-section";
import { ClientsSection } from "@/components/clients/clients-section";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { FinanzeSection } from "@/components/finanze/finanze-section";
import { MeteoSection } from "@/components/meteo/meteo-section";
import { ReportSection } from "@/components/report/report-section";
import { ServiziSection } from "@/components/servizi/servizi-section";
import { SettingsSection } from "@/components/settings/settings-section";
import { reportSectionMeta } from "@/lib/mock/report";

/** Ordine voci sidebar e chiavi sezione (fonte unica per SectionKey). */
export const SECTION_ORDER = [
  "Dashboard",
  "Prenotazioni",
  "Calendario",
  "Meteo marino",
  "Clienti",
  "Barche",
  "Servizi",
  "Finanze",
  "Report",
  "Impostazioni",
] as const;

export type SectionKey = (typeof SECTION_ORDER)[number];

export type SectionMetadata = {
  /** Descrizione breve: header, tooltips, documentazione */
  description: string;
  /** Card riepilogo opzionali (es. Report) */
  highlights?: readonly { title: string; description: string }[];
};

export type SectionRegistryEntry = {
  key: SectionKey;
  title: string;
  icon: LucideIcon;
  component: ComponentType<Record<string, never>>;
  metadata: SectionMetadata;
};

type SectionDefinition = Omit<SectionRegistryEntry, "key">;

const sectionRegistryDefinitions = {
  Dashboard: {
    title: "Dashboard",
    icon: HomeIcon,
    component: DashboardSection,
    metadata: {
      description: "Vista sintetica operativa, KPI e agenda giornaliera",
    },
  },
  Prenotazioni: {
    title: "Prenotazioni",
    icon: CalendarDays,
    component: BookingsSection,
    metadata: {
      description: "Gestione richieste, conferme e partenze giornaliere",
    },
  },
  Calendario: {
    title: "Calendario",
    icon: CalendarDays,
    component: CalendarSection,
    metadata: {
      description: "Pianificazione operativa giornaliera e settimanale",
    },
  },
  "Meteo marino": {
    title: "Meteo marino",
    icon: Sun,
    component: MeteoSection,
    metadata: {
      description: "Condizioni mare e supporto alle decisioni sulle partenze",
    },
  },
  Clienti: {
    title: "Clienti",
    icon: Users,
    component: ClientsSection,
    metadata: {
      description: "Anagrafiche, storico e preferenze ospiti",
    },
  },
  Barche: {
    title: "Barche",
    icon: Ship,
    component: BoatsSection,
    metadata: {
      description: "Disponibilita flotta e stato manutentivo",
    },
  },
  Servizi: {
    title: "Servizi",
    icon: LifeBuoy,
    component: ServiziSection,
    metadata: {
      description: "Catalogo servizi accessori e attivazioni",
    },
  },
  Finanze: {
    title: "Finanze",
    icon: CreditCard,
    component: FinanzeSection,
    metadata: {
      description:
        "Cassa, transazioni, incassi e movimenti collegati alle prenotazioni",
    },
  },
  Report: {
    title: "Report",
    icon: BarChart3,
    component: ReportSection,
    metadata: {
      description: reportSectionMeta.subtitle,
      highlights: reportSectionMeta.cards,
    },
  },
  Impostazioni: {
    title: "Impostazioni",
    icon: Settings,
    component: SettingsSection,
    metadata: {
      description: "Configurazioni operative del sistema e integrazioni",
    },
  },
} satisfies Record<SectionKey, SectionDefinition>;

export const sectionRegistryByKey: Record<SectionKey, SectionDefinition> =
  sectionRegistryDefinitions;

/** Voci registry nell’ordine sidebar (per navigazione e menu). */
export function getOrderedSectionEntries(): SectionRegistryEntry[] {
  return SECTION_ORDER.map((key) => ({
    key,
    ...sectionRegistryByKey[key],
  }));
}

/**
 * Mappa type-safe: ogni SectionKey → elemento React della sezione.
 * Nessun lookup dinamico su metadati opzionali: il componente è sempre noto a compile-time.
 */
function buildSectionContentMap(): Record<SectionKey, ReactElement> {
  const map = {} as Record<SectionKey, ReactElement>;
  for (const key of SECTION_ORDER) {
    const Cmp = sectionRegistryByKey[key].component;
    map[key] = createElement(Cmp);
  }
  return map;
}

const sectionContentMap = Object.freeze(buildSectionContentMap());

export function createSectionContentMap(): Readonly<
  Record<SectionKey, ReactElement>
> {
  return sectionContentMap;
}
