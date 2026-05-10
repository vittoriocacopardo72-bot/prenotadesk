"use client"

import { useCallback, useMemo, useState } from "react"
import { Menu, Search } from "lucide-react"

import {
  DashboardMobileNav,
  DashboardSidebar,
  DesktopBookingFocusContext,
} from "@/components/dashboard/shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { filterNavByPermissions } from "@/lib/dashboard/filter-nav-tree"
import { dashboardNavConfig } from "@/lib/dashboard/nav-config"
import { createSectionContentMap, type SectionKey } from "@/lib/sections/section-registry"
import type { NavAccessContext, PermissionId } from "@/types/dashboard"

export function DesktopHomeShell() {
  const [activeSection, setActiveSection] = useState<SectionKey>("Dashboard")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [bookingFormFocusNonce, setBookingFormFocusNonce] = useState(0)
  const sectionContent = useMemo(() => createSectionContentMap(), [])

  const navigateSection = useCallback((section: SectionKey) => {
    if (section !== "Prenotazioni") {
      setBookingFormFocusNonce(0)
    }
    setActiveSection(section)
  }, [])

  const openDesktopCreateBooking = useCallback(() => {
    setActiveSection("Prenotazioni")
    setBookingFormFocusNonce((n) => n + 1)
  }, [])

  const desktopBookingFocus = useMemo(
    () => ({
      bookingFormFocusNonce,
      openDesktopCreateBooking,
      navigateToSection: navigateSection,
    }),
    [bookingFormFocusNonce, openDesktopCreateBooking, navigateSection]
  )
  const access = useMemo<NavAccessContext>(
    () => ({ permissions: new Set<PermissionId>() }),
    []
  )
  const navNodes = useMemo(
    () => filterNavByPermissions(dashboardNavConfig.nodes, access),
    [access]
  )
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
        <DashboardSidebar
          nodes={navNodes}
          activeSection={activeSection}
          onNavigate={navigateSection}
        />

        <main className="w-full p-4 md:p-6 lg:p-8">
          <header className="mb-6 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 lg:hidden">
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Apri menu"
                  aria-expanded={mobileNavOpen}
                  type="button"
                  onClick={() => setMobileNavOpen(true)}
                >
                  <Menu className="size-4" />
                </Button>
                <p className="text-sm font-medium">PrenotaDesk Marine</p>
              </div>
              <div className="relative w-full max-w-xl">
                <Search className="pointer-events-none absolute top-2 left-2.5 size-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Cerca prenotazioni, barche o clienti..."
                  className="pl-8"
                  disabled
                  title="Ricerca globale in arrivo"
                  aria-label="Ricerca globale (non ancora attiva)"
                />
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

          <DesktopBookingFocusContext.Provider value={desktopBookingFocus}>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {sectionContent[activeSection]}
            </section>
          </DesktopBookingFocusContext.Provider>
        </main>
      </div>

      <DashboardMobileNav
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        nodes={navNodes}
        activeSection={activeSection}
        onNavigate={navigateSection}
      />
    </div>
  )
}
