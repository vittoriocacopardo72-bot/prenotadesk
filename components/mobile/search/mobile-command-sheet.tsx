"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { searchMobile } from "@/lib/actions";
import type { MobileSearchResult } from "@/types/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export type MobileCommandSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPickResult: (item: MobileSearchResult) => void;
};

export function MobileCommandSheet({
  open,
  onOpenChange,
  onPickResult,
}: MobileCommandSheetProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<MobileSearchResult[]>([]);

  const emptyMessage = useMemo(() => {
    if (!query.trim()) return "Cerca prenotazioni, barche, partenze o alert.";
    if (loading) return "Ricerca in corso...";
    if (error) return error;
    return "Nessun risultato.";
  }, [error, loading, query]);

  async function runSearch(nextQuery: string) {
    setQuery(nextQuery);
    setError(null);
    if (!nextQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const res = await searchMobile(nextQuery);
    setLoading(false);
    if (res.status === "error") {
      setError(res.message);
      setResults([]);
      return;
    }
    if (res.status === "cancelled") {
      setResults([]);
      return;
    }
    setResults(res.data.items);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[88vh] gap-0 p-0"
        showCloseButton
      >
        <SheetHeader className="border-b border-slate-200 p-4">
          <SheetTitle>Cerca comando</SheetTitle>
        </SheetHeader>
        <div className="border-b border-slate-100 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => void runSearch(e.target.value)}
              placeholder="Es. Orion 31, incasso, alert..."
              className="pl-9"
            />
          </div>
        </div>
        <div className="max-h-[55vh] space-y-2 overflow-y-auto p-4">
          {results.length === 0 ? (
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
              {emptyMessage}
            </p>
          ) : (
            results.map((item) => (
              <Button
                key={item.id}
                type="button"
                variant="outline"
                className="h-auto w-full justify-start px-3 py-2 text-left"
                onClick={() => onPickResult(item)}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{item.title}</p>
                  <p className="truncate text-xs text-slate-500">
                    {item.subtitle}
                  </p>
                </div>
              </Button>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
