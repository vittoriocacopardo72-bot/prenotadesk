"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export type MarineRow = {
  label: string;
  value: string;
  detail: string;
};

export type MobileMarineSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rows: readonly MarineRow[];
  onOpenMeteo: () => void;
  onRefreshWeather?: () => void;
};

export function MobileMarineSheet({
  open,
  onOpenChange,
  rows,
  onOpenMeteo,
  onRefreshWeather,
}: MobileMarineSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[88vh] gap-0 p-0"
        showCloseButton
      >
        <SheetHeader className="border-b border-slate-200 p-4 text-left">
          <SheetTitle>Condizioni operative</SheetTitle>
          <SheetDescription>
            Mare, vento e stato porto (anteprima).
          </SheetDescription>
        </SheetHeader>
        <div className="max-h-[55vh] space-y-2 overflow-y-auto p-4">
          {rows.length === 0 ? (
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
              Dati meteo non disponibili.
            </p>
          ) : (
            rows.map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-sky-100 bg-sky-50/60 px-3 py-2.5"
              >
                <p className="text-[11px] font-medium tracking-wide text-sky-900 uppercase">
                  {row.label}
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {row.value}
                </p>
                <p className="text-xs text-slate-600">{row.detail}</p>
              </div>
            ))
          )}
        </div>
        <SheetFooter className="border-t border-slate-200 p-4">
          <div className="grid w-full grid-cols-2 gap-2">
            <Button type="button" variant="outline" onClick={onRefreshWeather}>
              Aggiorna riepilogo
            </Button>
            <Button type="button" variant="secondary" onClick={onOpenMeteo}>
              Apri meteo completo
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
