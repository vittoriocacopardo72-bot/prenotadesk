import { Ship, Users, Wallet, Waves } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const icons = {
  wallet: Wallet,
  waves: Waves,
  users: Users,
  ship: Ship,
} as const;

type KPI = {
  title: string;
  value: string;
  trend: string;
  occupancy: string;
  note: string;
  icon: keyof typeof icons;
  /** When true, trend/occupancy/note are illustrative only (value may still be live). */
  demoSubcopy?: boolean;
  /** Tooltip for the main numeric value. */
  valueTitle?: string;
};

export function DashboardKpiCards({ kpis }: { kpis: KPI[] }) {
  return (
    <>
      {kpis.map((metric) => {
        const Icon = icons[metric.icon];
        return (
          <Card key={metric.title} className="bg-white" size="sm">
            <CardHeader className="gap-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardDescription>{metric.title}</CardDescription>
                  <CardTitle className="text-xl" title={metric.valueTitle}>
                    {metric.value}
                  </CardTitle>
                </div>
                <div className="rounded-md bg-slate-100 p-1.5 text-slate-600">
                  <Icon className="size-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1.5">
              <p
                className={`text-xs ${metric.demoSubcopy ? "text-slate-400" : "text-slate-600"}`}
                title={metric.demoSubcopy ? "Dato dimostrativo" : undefined}
              >
                {metric.trend}
              </p>
              <p
                className={`text-xs ${metric.demoSubcopy ? "text-slate-400" : "text-slate-500"}`}
                title={metric.demoSubcopy ? "Dato dimostrativo" : undefined}
              >
                {metric.occupancy}
              </p>
              <p
                className={`text-[11px] ${metric.demoSubcopy ? "text-slate-300" : "text-slate-400"}`}
                title={metric.demoSubcopy ? "Dato dimostrativo" : undefined}
              >
                {metric.note}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
