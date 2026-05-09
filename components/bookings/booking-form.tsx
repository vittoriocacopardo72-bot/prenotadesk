import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function BookingForm() {
  return (
    <Card className="bg-white sm:col-span-2 xl:col-span-4">
      <CardHeader>
        <CardTitle>Nuova prenotazione</CardTitle>
        <CardDescription>Blocco form mock pronto per integrazione</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="cliente">Cliente</Label>
          <Input id="cliente" placeholder="Nome cliente" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Telefono</Label>
          <Input id="telefono" placeholder="+39 000 000 0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="barca">Barca</Label>
          <Input id="barca" placeholder="Seleziona barca" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="servizio">Servizio</Label>
          <Input id="servizio" placeholder="Tipo servizio" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="data">Data</Label>
          <Input id="data" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ora">Ora</Label>
          <Input id="ora" type="time" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ospiti">Ospiti</Label>
          <Input id="ospiti" type="number" placeholder="0" />
        </div>
        <div className="space-y-2 xl:col-span-1">
          <Label htmlFor="stato-prenotazione">Stato</Label>
          <Input id="stato-prenotazione" placeholder="In attesa" />
        </div>
        <div className="space-y-2 md:col-span-2 xl:col-span-4">
          <Label htmlFor="note">Note</Label>
          <Textarea id="note" placeholder="Note operative della prenotazione..." />
        </div>
        <div className="md:col-span-2 xl:col-span-4">
          <Button type="button">Salva prenotazione</Button>
        </div>
      </CardContent>
    </Card>
  )
}
