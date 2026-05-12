"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { SectionKey } from "@/lib/sections/section-registry";
import type { NavNode } from "@/types/dashboard";

import { DashboardSidebarNav } from "./dashboard-sidebar-nav";

export type DashboardMobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: readonly NavNode[];
  activeSection: SectionKey;
  onNavigate: (key: SectionKey) => void;
  title?: string;
  description?: string;
  contentClassName?: string;
};

export function DashboardMobileNav({
  open,
  onOpenChange,
  nodes,
  activeSection,
  onNavigate,
  title = "PrenotaDesk Marine",
  description = "Gestione portuale e charter",
  contentClassName,
}: DashboardMobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className={cn(
          "flex w-[min(100%,20rem)] flex-col gap-0 p-0",
          contentClassName
        )}
      >
        <SheetHeader className="border-b border-slate-200 p-4 text-left">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <DashboardSidebarNav
            nodes={nodes}
            activeSection={activeSection}
            onNavigate={(key) => {
              onNavigate(key);
              onOpenChange(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
