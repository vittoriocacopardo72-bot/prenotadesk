import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function BookingSummaryCards() {
  return (
    <div className="grid gap-3 content-start">
      <Card className="bg-white" size="sm">
        <CardHeader>
          <CardDescription>Prenotazioni oggi</CardDescription>
          <CardTitle className="text-xl">24</CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-white" size="sm">
        <CardHeader>
          <CardDescription>Incasso previsto</CardDescription>
          <CardTitle className="text-xl">€ 6.940</CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-white" size="sm">
        <CardHeader>
          <CardDescription>Ospiti totali</CardDescription>
          <CardTitle className="text-xl">73</CardTitle>
        </CardHeader>
      </Card>
      <Card className="bg-white" size="sm">
        <CardHeader>
          <CardDescription>Da confermare</CardDescription>
          <CardTitle className="text-xl">5</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
