import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DepartureRow = {
  time: string;
  boat: string;
  service: string;
  status: string;
};

export type MobileNextDeparturesProps = {
  departures: readonly DepartureRow[];
  maxVisible?: number;
  onSeeAll?: () => void;
  className?: string;
};

function statusVariant(
  status: string
): ComponentProps<typeof Badge>["variant"] {
  if (status === "Confermata") return "default";
  if (status === "Imbarco") return "secondary";
  return "outline";
}

export function MobileNextDepartures({
  departures,
  maxVisible = 4,
  onSeeAll,
  className,
}: MobileNextDeparturesProps) {
  const rows = departures.slice(0, maxVisible);

  return (
    <Card
      className={cn("border-slate-200 bg-white shadow-xs", className)}
      size="sm"
    >
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">Prossime partenze</CardTitle>
        <span className="text-[10px] font-medium tracking-wide text-sky-700 uppercase">
          Live
        </span>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {rows.map((row) => (
          <div
            key={`${row.time}-${row.boat}`}
            className="flex items-start justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-2.5 py-2"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                {row.time} · {row.boat}
              </p>
              <p className="truncate text-xs text-slate-600">{row.service}</p>
            </div>
            <Badge
              variant={statusVariant(row.status)}
              className="shrink-0 text-[10px]"
            >
              {row.status}
            </Badge>
          </div>
        ))}
      </CardContent>
      {onSeeAll ? (
        <CardFooter className="pt-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full text-sky-800"
            onClick={onSeeAll}
          >
            Centro operativo completo
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}
