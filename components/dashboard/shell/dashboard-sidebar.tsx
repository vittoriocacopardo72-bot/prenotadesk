import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SectionKey } from "@/lib/sections/section-registry";
import type { NavNode } from "@/types/dashboard";

import { DashboardSidebarNav } from "./dashboard-sidebar-nav";

export type DashboardSidebarProps = {
  nodes: readonly NavNode[];
  activeSection: SectionKey;
  onNavigate: (key: SectionKey) => void;
  className?: string;
};

export function DashboardSidebar({
  nodes,
  activeSection,
  onNavigate,
  className,
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "hidden min-h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white/85 p-6 lg:flex",
        className
      )}
    >
      <div className="mb-8 space-y-1">
        <Badge
          variant="outline"
          className="border-sky-200 bg-sky-50 text-sky-700"
        >
          Console operativa
        </Badge>
        <h1 className="text-xl font-semibold tracking-tight">
          PrenotaDesk Marine
        </h1>
        <p className="text-sm text-slate-500">Gestione portuale e charter</p>
      </div>

      <DashboardSidebarNav
        className="flex-1 space-y-1"
        nodes={nodes}
        activeSection={activeSection}
        onNavigate={onNavigate}
      />

      <div className="mt-auto rounded-xl border border-sky-100 bg-sky-50/70 p-4">
        <p className="text-xs font-medium text-sky-700">Stato sistema</p>
        <p className="mt-1 text-sm text-slate-700">
          Sincronizzazione ormeggi attiva
        </p>
      </div>
    </aside>
  );
}
