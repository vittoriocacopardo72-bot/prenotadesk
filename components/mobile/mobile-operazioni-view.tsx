"use client";

import { createElement } from "react";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  CreditCard,
  Settings,
  Ship,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AltroSectionKey } from "@/lib/mobile/altro-sections";
import type { MobileMainTab } from "@/types/mobile";

type OperazioniCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  target:
    | { kind: "tab"; tab: MobileMainTab }
    | { kind: "altro"; section: AltroSectionKey };
};

const OPERAZIONI_CARDS: readonly OperazioniCard[] = [
  {
    title: "Prenotazioni",
    description: "Elenco, stati e nuove richieste.",
    icon: ClipboardList,
    target: { kind: "tab", tab: "prenotazioni" },
  },
  {
    title: "Calendario",
    description: "Slot e impegni giornalieri.",
    icon: CalendarDays,
    target: { kind: "altro", section: "Calendario" },
  },
  {
    title: "Clienti",
    description: "Anagrafica e contatti.",
    icon: Users,
    target: { kind: "altro", section: "Clienti" },
  },
  {
    title: "Barche",
    description: "Flotta e disponibilità.",
    icon: Ship,
    target: { kind: "altro", section: "Barche" },
  },
  {
    title: "Finanze",
    description: "Movimenti cassa su questo dispositivo.",
    icon: CreditCard,
    target: { kind: "altro", section: "Finanze" },
  },
  {
    title: "Report",
    description: "Riepiloghi da dati locali.",
    icon: BarChart3,
    target: { kind: "altro", section: "Report" },
  },
  {
    title: "Meteo marino",
    description: "Sintesi operativa (non live API).",
    icon: Sun,
    target: { kind: "altro", section: "Meteo marino" },
  },
  {
    title: "Impostazioni",
    description: "Preferenze e configurazione.",
    icon: Settings,
    target: { kind: "altro", section: "Impostazioni" },
  },
] as const;

export type MobileOperazioniViewProps = {
  onNavigateTab: (tab: MobileMainTab) => void;
  onOpenAltroSection: (key: AltroSectionKey) => void;
};

export function MobileOperazioniView({
  onNavigateTab,
  onOpenAltroSection,
}: MobileOperazioniViewProps) {
  return (
    <div className="flex flex-col gap-3">
      <Card className="border-slate-200 bg-white shadow-xs" size="sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Operazioni</CardTitle>
          <CardDescription>
            Accedi ai moduli senza la vista dashboard desktop.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {OPERAZIONI_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Button
              key={card.title}
              type="button"
              variant="outline"
              className="h-auto min-h-[4.25rem] flex-col items-stretch justify-start gap-1 rounded-xl border-slate-200 px-3 py-3 text-left font-normal shadow-xs"
              onClick={() => {
                if (card.target.kind === "tab") {
                  onNavigateTab(card.target.tab);
                  return;
                }
                onOpenAltroSection(card.target.section);
              }}
            >
              <span className="flex items-center gap-2">
                {createElement(Icon, {
                  className: "size-4 shrink-0 text-sky-700",
                  "aria-hidden": true,
                })}
                <span className="text-sm font-semibold text-slate-900">
                  {card.title}
                </span>
              </span>
              <span className="pl-6 text-xs leading-snug text-slate-600">
                {card.description}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
