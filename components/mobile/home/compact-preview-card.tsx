"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CompactPreviewCardProps = {
  title: string;
  hint?: string;
  preview: ReactNode;
  onOpen: () => void;
  className?: string;
  /** Optional count badge in header row */
  badge?: ReactNode;
};

export function CompactPreviewCard({
  title,
  hint,
  preview,
  onOpen,
  className,
  badge,
}: CompactPreviewCardProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "h-auto min-h-0 w-full flex-col items-stretch gap-1.5 rounded-xl border-slate-200 bg-white p-3 text-left font-normal shadow-none hover:bg-slate-50",
        className
      )}
      onClick={onOpen}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-slate-800 uppercase">
              {title}
            </span>
            {badge}
          </div>
          {hint ? (
            <p className="mt-0.5 text-[11px] text-slate-500">{hint}</p>
          ) : null}
        </div>
        <ChevronRight className="size-4 shrink-0 text-slate-400" aria-hidden />
      </div>
      <div className="pointer-events-none border-t border-slate-100 pt-2">
        {preview}
      </div>
    </Button>
  );
}
