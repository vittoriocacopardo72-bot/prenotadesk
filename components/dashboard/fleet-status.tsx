import { Badge } from "@/components/ui/badge"

type FleetItem = {
  nome: string
  readiness: string
  fuel: string
  next: string
  crew: string
}

export function FleetStatus({ items }: { items: FleetItem[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="mb-2 text-xs font-medium text-slate-700">Stato flotta live</p>
      <div className="space-y-2">
        {items.map((boat) => (
          <div key={boat.nome} className="rounded-md border border-slate-200 bg-white p-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-800">{boat.nome}</p>
              <Badge
                variant={
                  boat.readiness === "Pronta"
                    ? "default"
                    : boat.readiness === "In uscita"
                      ? "secondary"
                      : boat.readiness === "Check tecnico"
                        ? "outline"
                        : "destructive"
                }
              >
                {boat.readiness}
              </Badge>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Fuel {boat.fuel} - Prossima uscita {boat.next}
            </p>
            <p className="text-[11px] text-slate-500">Equipaggio: {boat.crew}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
