import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type MobileCriticalAlertsProps = {
  alerts: readonly string[]
  /** Cap visible alerts on home to reduce scroll. */
  maxVisible?: number
  className?: string
}

export function MobileCriticalAlerts({
  alerts,
  maxVisible = 3,
  className,
}: MobileCriticalAlertsProps) {
  const visible = alerts.slice(0, maxVisible)
  if (visible.length === 0) return null

  return (
    <Card className={cn("border-slate-200 bg-white shadow-xs", className)} size="sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Alert critici</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {visible.map((alert) => (
          <p
            key={alert}
            className="rounded-lg border border-amber-200/90 bg-amber-50 px-2.5 py-2 text-xs leading-snug text-amber-900"
          >
            {alert}
          </p>
        ))}
      </CardContent>
    </Card>
  )
}
