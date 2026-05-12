import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FleetStatus } from "@/components/dashboard/fleet-status";
import { MarineWidgets } from "@/components/dashboard/marine-widgets";

type Departure = {
  ora: string;
  barca: string;
  servizio: string;
  stato: string;
};

type FleetItem = {
  nome: string;
  readiness: string;
  fuel: string;
  next: string;
  crew: string;
};

export function OperationalBoard({
  departures,
  fleetLive,
  activeCrew,
  marineWidgets,
}: {
  departures: readonly Departure[];
  fleetLive: FleetItem[];
  activeCrew: readonly string[];
  marineWidgets: { label: string; value: string; detail: string }[];
}) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Centro operativo</CardTitle>
        <CardDescription>
          Monitoraggio live partenze, flotta ed equipaggi
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-medium text-slate-700">
              Prossime partenze
            </p>
            <div className="space-y-2">
              {departures.map((item) => (
                <div
                  key={`${item.ora}-${item.barca}`}
                  className="flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {item.ora} - {item.barca}
                    </p>
                    <p className="text-slate-500">{item.servizio}</p>
                  </div>
                  <Badge
                    variant={
                      item.stato === "Confermata"
                        ? "default"
                        : item.stato === "Imbarco"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {item.stato}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <MarineWidgets widgets={marineWidgets} compact />
        </div>

        <div className="space-y-3">
          <FleetStatus items={fleetLive} />
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-medium text-slate-700">
              Equipaggi attivi
            </p>
            <div className="space-y-1.5">
              {activeCrew.map((crew) => (
                <p
                  key={crew}
                  className="rounded-md bg-white px-2 py-1 text-xs text-slate-700"
                >
                  {crew}
                </p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
