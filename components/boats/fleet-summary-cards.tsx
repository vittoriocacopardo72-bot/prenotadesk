import { Card, CardContent } from "@/components/ui/card"

export function FleetSummaryCards() {
  return (
    <Card className="bg-white sm:col-span-2 xl:col-span-4">
      <CardContent className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Disponibili oggi</p>
          <p className="text-xl font-semibold text-slate-800">9</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-500">In uscita</p>
          <p className="text-xl font-semibold text-slate-800">3</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-500">In manutenzione</p>
          <p className="text-xl font-semibold text-slate-800">2</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-500">Out of service</p>
          <p className="text-xl font-semibold text-slate-800">1</p>
        </div>
      </CardContent>
    </Card>
  )
}
