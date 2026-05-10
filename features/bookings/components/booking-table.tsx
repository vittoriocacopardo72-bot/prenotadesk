import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingStatusBadge } from "./booking-status-badge"
import type { BookingRow, BookingStatus } from "@/types/booking"

const STATUS_ORDER: BookingStatus[] = ["In attesa", "Confermate", "In arrivo", "Check-in", "Cancellate"]

function nextStatus(status: BookingStatus): BookingStatus {
  const idx = STATUS_ORDER.indexOf(status)
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]
}

export function BookingTable({
  rows,
  onAdvanceStatus,
}: {
  rows: BookingRow[]
  onAdvanceStatus?: (rowId: string | undefined, nextStatus: BookingStatus) => void
}) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Elenco prenotazioni</CardTitle>
        <CardDescription>Vista operativa compatta della giornata</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="px-2 py-1.5 font-medium">Cliente</th>
              <th className="px-2 py-1.5 font-medium">Barca</th>
              <th className="px-2 py-1.5 font-medium">Servizio</th>
              <th className="px-2 py-1.5 font-medium">Data</th>
              <th className="px-2 py-1.5 font-medium">Ora</th>
              <th className="px-2 py-1.5 font-medium">Ospiti</th>
              <th className="px-2 py-1.5 font-medium">Stato</th>
              <th className="px-2 py-1.5 text-right font-medium">Importo</th>
              <th className="px-2 py-1.5 text-right font-medium">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id ?? `${row.cliente}-${row.data}-${row.ora}`} className="border-b border-slate-100 align-middle">
                <td className="px-2 py-2 font-medium text-slate-800">{row.cliente}</td>
                <td className="px-2 py-2 text-slate-600">{row.barca}</td>
                <td className="px-2 py-2 text-slate-600">{row.servizio}</td>
                <td className="px-2 py-2 text-slate-600">{row.data}</td>
                <td className="px-2 py-2 text-slate-600">{row.ora}</td>
                <td className="px-2 py-2 text-slate-600">{row.ospiti}</td>
                <td className="px-2 py-2">
                  <BookingStatusBadge status={row.stato} />
                </td>
                <td className="px-2 py-2 text-right font-medium text-slate-800">{row.importo}</td>
                <td className="px-2 py-2">
                  <div className="flex justify-end gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      disabled
                      title="Non ancora disponibile"
                    >
                      Dettagli
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="xs"
                      disabled
                      title="Non ancora disponibile"
                    >
                      Modifica
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="xs"
                      onClick={() => onAdvanceStatus?.(row.id, nextStatus(row.stato))}
                    >
                      Avanza stato
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
