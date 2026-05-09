type MarineWidget = {
  label: string
  value: string
  detail: string
}

export function MarineWidgets({ widgets, compact = false }: { widgets: MarineWidget[]; compact?: boolean }) {
  if (compact) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="mb-2 text-xs font-medium text-slate-700">Meteo operativo rapido</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {widgets.slice(0, 4).map((widget) => (
            <div key={widget.label} className="rounded-md border border-slate-200 bg-white px-2 py-1.5">
              <p className="text-[11px] text-slate-500">{widget.label}</p>
              <p className="text-xs font-medium text-slate-800">{widget.value}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {widgets.map((widget) => (
        <div key={widget.label} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2">
          <p className="text-[11px] text-slate-500">{widget.label}</p>
          <p className="text-xs font-medium text-slate-800">{widget.value}</p>
          <p className="text-[11px] text-slate-500">{widget.detail}</p>
        </div>
      ))}
    </div>
  )
}
