import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FinanceItem = {
  label: string;
  value: string;
  detail: string;
};

export function FinancialPanel({
  items,
  sourceNote,
}: {
  items: readonly FinanceItem[];
  /** Always-visible honesty line (device-local, demo, etc.); not tooltip-only */
  sourceNote: string;
}) {
  return (
    <Card className="bg-white" title={sourceNote}>
      <CardHeader className="gap-2">
        <CardTitle>Mini pannello finanziario</CardTitle>
        <CardDescription>
          Controllo economico rapido della giornata
        </CardDescription>
        <Badge
          variant="secondary"
          className="w-fit text-[11px] font-normal text-slate-600"
        >
          {sourceNote}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3"
          >
            <p className="text-[11px] text-slate-500">{item.label}</p>
            <p className="text-sm font-semibold text-slate-800">{item.value}</p>
            <p className="text-[11px] text-slate-500">{item.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
