import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type OperationalStatusTone = "operativo" | "attenzione" | "critico";

export type MobileOperationalStatusStripProps = {
  tone: OperationalStatusTone;
  title: string;
  metricsLine: string;
  className?: string;
};

const toneBadge: Record<OperationalStatusTone, string> = {
  operativo: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  attenzione: "bg-amber-100 text-amber-900 hover:bg-amber-100",
  critico: "bg-red-100 text-red-800 hover:bg-red-100",
};

export function MobileOperationalStatusStrip({
  tone,
  title,
  metricsLine,
  className,
}: MobileOperationalStatusStripProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-xs",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          {title}
        </p>
        <Badge
          className={cn(
            "shrink-0 border-0 text-[10px] font-semibold",
            toneBadge[tone]
          )}
        >
          {tone === "operativo"
            ? "Operativo"
            : tone === "attenzione"
              ? "Attenzione"
              : "Critico"}
        </Badge>
      </div>
      <p className="text-sm leading-snug font-medium text-slate-900">
        {metricsLine}
      </p>
    </div>
  );
}
