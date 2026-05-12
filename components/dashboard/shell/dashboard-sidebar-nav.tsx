"use client";

import { createElement } from "react";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { getNavIcon } from "@/lib/dashboard/nav-icons";
import type { SectionKey } from "@/lib/sections/section-registry";
import type { NavIconId, NavNode } from "@/types/dashboard";

const linkClasses = (active: boolean) =>
  cn(
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition",
    active
      ? "bg-sky-50 font-medium text-sky-800"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  );

const groupTriggerClasses = cn(
  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
);

function GroupIcon({ iconId }: { iconId: NavIconId }) {
  return createElement(getNavIcon(iconId), {
    className: "size-4 shrink-0 text-slate-600",
    "aria-hidden": true,
  });
}

export type DashboardSidebarNavProps = {
  nodes: readonly NavNode[];
  activeSection: SectionKey;
  onNavigate: (key: SectionKey) => void;
  className?: string;
};

function NavLinkRow({
  label,
  iconId,
  badge,
  active,
  onSelect,
}: {
  label: string;
  iconId: NavIconId;
  badge?: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button type="button" className={linkClasses(active)} onClick={onSelect}>
      {createElement(getNavIcon(iconId), {
        className: "size-4 shrink-0",
        "aria-hidden": true,
      })}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {badge ? (
        <Badge variant="secondary" className="shrink-0 text-[10px]">
          {badge}
        </Badge>
      ) : null}
    </button>
  );
}

function NavTree({
  nodes,
  depth,
  activeSection,
  onNavigate,
}: {
  nodes: readonly NavNode[];
  depth: number;
  activeSection: SectionKey;
  onNavigate: (key: SectionKey) => void;
}) {
  return (
    <div
      className={cn(
        "space-y-1",
        depth > 0 && "mt-1 ml-2 border-l border-slate-200 pl-2"
      )}
    >
      {nodes.map((node) => {
        if (node.kind === "link") {
          const active = activeSection === node.sectionKey;
          return (
            <NavLinkRow
              key={node.id}
              label={node.label}
              iconId={node.icon}
              badge={node.badge}
              active={active}
              onSelect={() => onNavigate(node.sectionKey)}
            />
          );
        }

        return (
          <Collapsible
            key={node.id}
            className="group/collapsible"
            defaultOpen={node.defaultOpen ?? false}
          >
            <CollapsibleTrigger className={groupTriggerClasses}>
              <ChevronRight
                className="size-4 shrink-0 text-slate-500 transition-transform group-data-[state=open]/collapsible:rotate-90"
                aria-hidden
              />
              {node.icon ? <GroupIcon iconId={node.icon} /> : null}
              <span className="min-w-0 flex-1 truncate text-left">
                {node.label}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <NavTree
                nodes={node.children}
                depth={depth + 1}
                activeSection={activeSection}
                onNavigate={onNavigate}
              />
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}

export function DashboardSidebarNav({
  nodes,
  activeSection,
  onNavigate,
  className,
}: DashboardSidebarNavProps) {
  return (
    <nav aria-label="Console operativa" className={cn(className)}>
      <NavTree
        nodes={nodes}
        depth={0}
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
    </nav>
  );
}
