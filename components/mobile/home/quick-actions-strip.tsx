"use client";

import { createElement } from "react";
import {
  Anchor,
  Banknote,
  CalendarDays,
  CloudSun,
  Gauge,
  Lock,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACTION_ICONS: Record<string, LucideIcon> = {
  "Nuova prenotazione": UserPlus,
  "Assegna equipaggio": Anchor,
  "Registra pagamento": Banknote,
  "Blocca barca": Lock,
  "Apri calendario": CalendarDays,
  "Aggiorna meteo": CloudSun,
};

function iconFor(label: string): LucideIcon {
  return ACTION_ICONS[label] ?? Gauge;
}

export type QuickActionsStripProps = {
  actions: readonly string[];
  onAction: (label: string) => void;
  className?: string;
};

/** Single horizontal row of icon-first actions — compact, thumb-friendly. */
export function QuickActionsStrip({
  actions,
  onAction,
  className,
}: QuickActionsStripProps) {
  return (
    <div className={cn("-mx-1", className)}>
      <div className="flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {actions.map((label) => {
          const Icon = iconFor(label);
          const short =
            label === "Nuova prenotazione"
              ? "Prenota"
              : label === "Assegna equipaggio"
                ? "Equipaggio"
                : label === "Registra pagamento"
                  ? "Incasso"
                  : label === "Blocca barca"
                    ? "Blocca"
                    : label === "Apri calendario"
                      ? "Calendario"
                      : label === "Aggiorna meteo"
                        ? "Meteo"
                        : label;
          return (
            <Button
              key={label}
              type="button"
              variant="secondary"
              size="sm"
              className="h-auto shrink-0 flex-col gap-1 rounded-xl px-3 py-2 text-[10px] font-semibold shadow-none"
              onClick={() => onAction(label)}
            >
              {createElement(Icon, {
                className: "size-4 opacity-90",
                "aria-hidden": true,
              })}
              <span className="max-w-[4.5rem] leading-tight">{short}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
