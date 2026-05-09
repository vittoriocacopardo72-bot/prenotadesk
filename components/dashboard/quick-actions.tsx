import { Gauge } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardQuickActions({ actions }: { actions: readonly string[] }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Azioni rapide</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {actions.map((action) => (
          <Button key={action} variant="outline" size="sm" className="justify-start">
            <Gauge className="size-4" />
            {action}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
