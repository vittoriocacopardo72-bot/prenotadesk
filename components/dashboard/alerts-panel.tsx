import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AlertsPanel({ alerts }: { alerts: readonly string[] }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Alert operativi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.map((alert) => (
          <p
            key={alert}
            className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-2 text-xs text-amber-700"
          >
            {alert}
          </p>
        ))}
      </CardContent>
    </Card>
  );
}
