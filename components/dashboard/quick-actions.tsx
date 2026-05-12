import { Gauge } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardQuickActions({
  actions,
  onAction,
  disabled = false,
  disabledHint,
}: {
  actions: readonly string[];
  onAction?: (label: string) => void;
  /** When true, actions are non-interactive (e.g. mobile shell without desktop navigation). */
  disabled?: boolean;
  disabledHint?: string;
}) {
  const title = disabled ? disabledHint : undefined;
  return (
    <Card className="bg-white" title={title}>
      <CardHeader>
        <CardTitle>Azioni rapide</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {actions.map((action) => (
          <Button
            key={action}
            type="button"
            variant="outline"
            size="sm"
            className="justify-start"
            disabled={disabled}
            title={disabled ? disabledHint : undefined}
            onClick={() => onAction?.(action)}
          >
            <Gauge className="size-4" />
            {action}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
