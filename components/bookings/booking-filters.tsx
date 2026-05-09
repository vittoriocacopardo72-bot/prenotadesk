import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { BookingFilter } from "@/types/booking"

export function BookingFilters({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  filters,
}: {
  search: string
  onSearchChange: (value: string) => void
  filter: BookingFilter
  onFilterChange: (value: BookingFilter) => void
  filters: readonly BookingFilter[]
}) {
  return (
    <Card className="bg-white sm:col-span-2 xl:col-span-4">
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Prenotazioni</CardTitle>
            <CardDescription>Gestione richieste, conferme e partenze giornaliere</CardDescription>
          </div>
          <Button>Nuova prenotazione</Button>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute top-2 left-2.5 size-4 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              type="search"
              placeholder="Cerca per cliente, barca o servizio..."
              className="pl-8"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={filter === item ? "default" : "outline"}
                onClick={() => onFilterChange(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
