import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Agenda = {
  checkIn: readonly string[]
  partenze: readonly string[]
  manutenzioni: readonly string[]
  vip: readonly string[]
  ritardi: readonly string[]
}

export function DailyAgenda({ agenda }: { agenda: Agenda }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Agenda giornaliera</CardTitle>
        <CardDescription>Vista rapida operazioni critiche</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-xs">
        <div>
          <p className="mb-1 font-medium text-slate-700">Prossimi check-in</p>
          {agenda.checkIn.map((item) => (
            <p key={item} className="text-slate-600">
              {item}
            </p>
          ))}
        </div>
        <Separator />
        <div>
          <p className="mb-1 font-medium text-slate-700">Partenze imminenti</p>
          {agenda.partenze.map((item) => (
            <p key={item} className="text-slate-600">
              {item}
            </p>
          ))}
        </div>
        <Separator />
        <div>
          <p className="mb-1 font-medium text-slate-700" title="Dato dimostrativo">
            Manutenzioni programmate
          </p>
          {agenda.manutenzioni.map((item) => (
            <p key={item} className="text-slate-600">
              {item}
            </p>
          ))}
        </div>
        <Separator />
        <div>
          <p className="mb-1 font-medium text-slate-700" title="Dato dimostrativo">
            VIP / Clienti speciali
          </p>
          {agenda.vip.map((item) => (
            <p key={item} className="text-slate-600">
              {item}
            </p>
          ))}
        </div>
        <Separator />
        <div>
          <p className="mb-1 font-medium text-slate-700" title="Dato dimostrativo">
            Ritardi (dimostrativo)
          </p>
          {agenda.ritardi.map((item) => (
            <p key={item} className="text-slate-600">
              {item}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
