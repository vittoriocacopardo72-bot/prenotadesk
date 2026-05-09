"use client"

import { useMemo, useState } from "react"
import { Menu, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createSectionContentMap, getOrderedSectionEntries, type SectionKey } from "@/lib/sections/section-registry"

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionKey>("Dashboard")
  const sectionContent = useMemo(() => createSectionContentMap(), [])
  const navEntries = useMemo(() => getOrderedSectionEntries(), [])
  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("it-IT", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date()),
    []
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-[1440px]">
        <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white/85 p-6 lg:flex lg:flex-col">
          <div className="mb-8 space-y-1">
            <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
              Console operativa
            </Badge>
            <h1 className="text-xl font-semibold tracking-tight">PrenotaDesk Marine</h1>
            <p className="text-sm text-slate-500">Gestione portuale e charter</p>
          </div>
          <nav className="space-y-1">
            {navEntries.map((entry) => {
              const Icon = entry.icon
              const isActive = activeSection === entry.key
              return (
                <button
                  key={entry.key}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${isActive ? "bg-sky-50 font-medium text-sky-800" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                  type="button"
                  onClick={() => setActiveSection(entry.key)}
                >
                  <Icon className="size-4" />
                  <span>{entry.title}</span>
                </button>
              )
            })}
          </nav>
          <div className="mt-auto rounded-xl border border-sky-100 bg-sky-50/70 p-4">
            <p className="text-xs font-medium text-sky-700">Stato sistema</p>
            <p className="mt-1 text-sm text-slate-700">Sincronizzazione ormeggi attiva</p>
          </div>
        </aside>

        <main className="w-full p-4 md:p-6 lg:p-8">
          <header className="mb-6 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 lg:hidden">
                <Button variant="outline" size="icon-sm" aria-label="Apri menu">
                  <Menu className="size-4" />
                </Button>
                <p className="text-sm font-medium">PrenotaDesk Marine</p>
              </div>
              <div className="relative w-full max-w-xl">
                <Search className="pointer-events-none absolute top-2 left-2.5 size-4 text-slate-400" />
                <Input type="search" placeholder="Cerca prenotazioni, barche o clienti..." className="pl-8" />
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="hidden capitalize text-slate-600 md:inline-flex">
                  {formattedDate}
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Operativo</Badge>
                <Badge variant="secondary">VM</Badge>
              </div>
            </div>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{sectionContent[activeSection]}</section>
        </main>
      </div>
    </div>
  )
}
