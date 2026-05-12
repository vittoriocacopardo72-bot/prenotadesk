import type { BoatStatus } from "@/types/boat";
import { Badge } from "@/components/ui/badge";

export function BoatStatusBadge({ status }: { status: BoatStatus }) {
  return (
    <Badge
      variant={
        status === "Pronta"
          ? "default"
          : status === "In uscita"
            ? "secondary"
            : status === "In preparazione" || status === "Check tecnico"
              ? "outline"
              : "destructive"
      }
    >
      {status}
    </Badge>
  );
}
