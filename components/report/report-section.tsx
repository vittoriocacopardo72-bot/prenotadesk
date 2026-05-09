"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { reportSectionMeta } from "@/lib/mock/report"

export function ReportSection() {
  return (
    <>
      <Card className="bg-white sm:col-span-2 xl:col-span-4">
        <CardHeader>
          <CardTitle>Report</CardTitle>
          <CardDescription>{reportSectionMeta.subtitle}</CardDescription>
        </CardHeader>
      </Card>
      {reportSectionMeta.cards.map((card) => (
        <Card key={card.title} className="bg-white">
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
  )
}
