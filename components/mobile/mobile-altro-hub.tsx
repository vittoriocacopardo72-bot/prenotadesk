"use client";

import { createElement } from "react";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ALTRO_MODULE_ENTRIES,
  type AltroSectionKey,
} from "@/lib/mobile/altro-sections";

export type MobileAltroHubProps = {
  onSelect: (key: AltroSectionKey) => void;
};

export function MobileAltroHub({ onSelect }: MobileAltroHubProps) {
  return (
    <Card className="border-slate-200 bg-white shadow-xs" size="sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Strumenti e moduli</CardTitle>
        <CardDescription>
          Calendario, meteo, anagrafiche e amministrazione.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 pt-0">
        {ALTRO_MODULE_ENTRIES.map((entry) => {
          const Icon = entry.icon;
          return (
            <Button
              key={entry.key}
              type="button"
              variant="outline"
              className="h-12 justify-between gap-2 px-3 font-normal"
              onClick={() => onSelect(entry.key)}
            >
              <span className="flex min-w-0 items-center gap-2">
                {createElement(Icon, {
                  className: "size-4 shrink-0 text-slate-600",
                  "aria-hidden": true,
                })}
                <span className="truncate text-sm font-medium text-slate-900">
                  {entry.label}
                </span>
              </span>
              <ChevronRight
                className="size-4 shrink-0 text-slate-400"
                aria-hidden
              />
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
