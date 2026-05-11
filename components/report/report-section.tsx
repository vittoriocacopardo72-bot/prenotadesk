"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useReportsLocalSnapshot } from "@/features/reports"
import { reportSectionMeta } from "@/lib/mock/report"

function formatEur(n: number) {
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n)
}

export function ReportSection() {
  const snap = useReportsLocalSnapshot()
  const allSourcesEmpty =
    snap.bookingTotal === 0 && snap.paymentRowCount === 0 && snap.financeMovementCount === 0
  const partialEmpty =
    !allSourcesEmpty &&
    (snap.bookingTotal === 0 || snap.paymentRowCount === 0 || snap.financeMovementCount === 0)

  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader>
          <CardTitle>Report</CardTitle>
          <CardDescription className="space-y-3 text-pretty">
            <p>{reportSectionMeta.subtitle}</p>
            <p className="text-muted-foreground text-xs">
              Questa sezione legge solo dati presenti su questo dispositivo; nulla è sincronizzato con altri browser o
              utenti.
            </p>
            <div className="text-foreground space-y-2 text-sm">
              <p className="font-medium">Riepilogo da dati locali (sola lettura)</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>
                  Prenotazioni nello store app: <strong>{snap.bookingTotal}</strong> totali,{" "}
                  <strong>{snap.bookingToday}</strong> con data oggi
                </li>
                <li>
                  Righe incassi / pagamenti nello store app: <strong>{snap.paymentRowCount}</strong>
                </li>
                <li>
                  Movimenti registro Finanze (<code className="text-xs">prenotadesk_finance_movements_v1</code>
                  ): <strong>{snap.financeMovementCount}</strong> — entrate {formatEur(snap.financeTotals.totaleEntrate)}
                  , uscite {formatEur(snap.financeTotals.totaleUscite)}, saldo {formatEur(snap.financeTotals.saldo)}
                  , movimenti con data oggi <strong>{snap.financeTotals.movimentiOggi}</strong>
                </li>
              </ul>
              {allSourcesEmpty ? (
                <p className="text-muted-foreground border-muted border-l-2 pl-3">
                  In attesa dati reali: non risultano prenotazioni, righe incassi né movimenti finanziari nei
                  archivi locali collegati. Usa Prenotazioni, Incassi e Finanze per popolare lo stato; questo Report
                  si aggiorna in lettura.
                </p>
              ) : partialEmpty ? (
                <p className="text-muted-foreground border-muted border-l-2 pl-3 text-xs">
                  Alcune fonti sono ancora vuote (prenotazioni, incassi store app o movimenti Finanze); i valori
                  mostrati riguardano solo le fonti con dati.
                </p>
              ) : null}
              <p className="text-muted-foreground text-xs">
                {reportSectionMeta.demoLead} Nessun analytics server-side in questa build.
              </p>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      {reportSectionMeta.cards.map((card) => (
        <Card key={card.title} className="bg-white">
          <CardHeader className="space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <CardTitle className="pr-2">{card.title}</CardTitle>
              <Badge variant="secondary" className="shrink-0">
                Dimostrativo
              </Badge>
            </div>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
  )
}
