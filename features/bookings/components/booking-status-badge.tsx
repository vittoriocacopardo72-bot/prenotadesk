import type { BookingStatus } from "@/types/booking"
import { Badge } from "@/components/ui/badge"

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge
      variant={
        status === "Confermate"
          ? "default"
          : status === "In arrivo"
            ? "secondary"
            : status === "In attesa"
              ? "outline"
              : "destructive"
      }
    >
      {status}
    </Badge>
  )
}
