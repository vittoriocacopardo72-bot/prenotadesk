"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export type FleetRow = {
  nome: string;
  readiness: string;
  fuel: string;
  next: string;
  crew: string;
};

export type MobileFleetSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: readonly FleetRow[];
  onOpenBarche: () => void;
};

export function MobileFleetSheet({
  open,
  onOpenChange,
  items,
  onOpenBarche,
}: MobileFleetSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[88vh] gap-0 p-0"
        showCloseButton
      >
        <SheetHeader className="border-b border-slate-200 p-4 text-left">
          <SheetTitle>Flotta</SheetTitle>
          <SheetDescription>Stato unità e prossime uscite.</SheetDescription>
        </SheetHeader>
        <div className="max-h-[55vh] space-y-2 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
              Nessuna barca disponibile.
            </p>
          ) : (
            items.map((boat) => (
              <div
                key={boat.nome}
                className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {boat.nome}
                  </p>
                  <Badge variant="outline" className="shrink-0 text-[10px]">
                    {boat.readiness}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Carburante {boat.fuel} · Prossima {boat.next}
                </p>
                <p className="text-xs text-slate-500">
                  Equipaggio: {boat.crew}
                </p>
              </div>
            ))
          )}
        </div>
        <SheetFooter className="border-t border-slate-200 p-4">
          <Button
            type="button"
            className="w-full"
            variant="secondary"
            onClick={onOpenBarche}
          >
            Apri gestione barche
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
