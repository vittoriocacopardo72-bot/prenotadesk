import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function BookingSummaryCards({
  prenotazioniOggi,
  ospitiOggi,
  daConfermare,
}: {
  prenotazioniOggi: number;
  ospitiOggi: number;
  daConfermare: number;
}) {
  return (
    <div className="grid gap-3 content-start">
      <Card className="bg-white" size="sm">
        <CardHeader>
          <CardDescription>Prenotazioni oggi</CardDescription>
          <CardTitle className="text-xl">{prenotazioniOggi}</CardTitle>
        </CardHeader>
      </Card>
      <Card
        className="bg-white"
        size="sm"
        title="Stima non collegata allo store locale"
      >
        <CardHeader>
          <CardDescription>Incasso previsto</CardDescription>
          <CardTitle className="text-xl">—</CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-white" size="sm">
        <CardHeader>
          <CardDescription>Ospiti totali (oggi)</CardDescription>
          <CardTitle className="text-xl">{ospitiOggi}</CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-white" size="sm">
        <CardHeader>
          <CardDescription>Da confermare</CardDescription>
          <CardTitle className="text-xl">{daConfermare}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
