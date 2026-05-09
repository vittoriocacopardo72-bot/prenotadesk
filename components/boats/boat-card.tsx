import type { BoatRow } from "@/types/boat"
import { BoatStatusBadge } from "@/components/boats/boat-status-badge"

export function BoatCard({ boat }: { boat: BoatRow }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-800">{boat.nome}</p>
        <BoatStatusBadge status={boat.stato} />
      </div>
      <p className="mt-1 text-[11px] text-slate-500">
        {boat.modello} - {boat.capacita} - Prossima uscita {boat.prossimaUscita}
      </p>
      <p className="text-[11px] text-slate-500">Equipaggio: {boat.equipaggio}</p>
    </div>
  )
}
