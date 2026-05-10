"use client"

import { useCallback, useMemo, useState } from "react"

import { DashboardMobileNav } from "@/components/dashboard/shell"
import { filterNavByPermissions } from "@/lib/dashboard/filter-nav-tree"
import { dashboardNavConfig } from "@/lib/dashboard/nav-config"
import { ALTRO_SECTION_KEYS, type AltroSectionKey } from "@/lib/mobile/altro-sections"
import { createSectionContentMap, type SectionKey } from "@/lib/sections/section-registry"
import type { MobileMainTab } from "@/types/mobile"
import type { NavAccessContext, PermissionId } from "@/types/dashboard"

import { MobileAltroHub } from "./mobile-altro-hub"
import { MobileAppHeader } from "./mobile-app-header"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { MobileHomeView } from "./mobile-home-view"
import { MobileOperazioniView } from "./mobile-operazioni-view"
import { MobileActionHub } from "./mobile-action-hub"

export function MobileAppRoot() {
  const [tab, setTab] = useState<MobileMainTab>("home")
  const [altroSection, setAltroSection] = useState<AltroSectionKey | null>(null)
  const [sideNavOpen, setSideNavOpen] = useState(false)

  const sectionContent = useMemo(() => createSectionContentMap(), [])
  const access = useMemo<NavAccessContext>(
    () => ({ permissions: new Set<PermissionId>() }),
    []
  )
  const navNodes = useMemo(
    () => filterNavByPermissions(dashboardNavConfig.nodes, access),
    [access]
  )

  const handleTabChange = useCallback((next: MobileMainTab) => {
    setTab(next)
    if (next !== "altro") setAltroSection(null)
  }, [])

  const navigateToSection = useCallback((key: SectionKey | string) => {
    if (key === "Dashboard") {
      setTab("home")
      setAltroSection(null)
      return
    }
    if (key === "Prenotazioni") {
      setTab("prenotazioni")
      setAltroSection(null)
      return
    }
    if ((ALTRO_SECTION_KEYS as readonly string[]).includes(key)) {
      setTab("altro")
      setAltroSection(key as AltroSectionKey)
      return
    }
    setTab("home")
    setAltroSection(null)
  }, [])

  const navigateFromMenu = useCallback(
    (key: SectionKey) => {
      setSideNavOpen(false)
      navigateToSection(key)
    },
    [navigateToSection]
  )

  const menuActiveSection: SectionKey =
    tab === "home"
      ? "Dashboard"
      : tab === "prenotazioni"
        ? "Prenotazioni"
        : tab === "operazioni"
          ? "Dashboard"
          : altroSection ?? "Calendario"

  const headerTitle =
    tab === "altro" && altroSection
      ? altroSection
      : tab === "home"
        ? "PrenotaDesk Marine"
        : tab === "operazioni"
          ? "Operazioni"
          : tab === "prenotazioni"
            ? "Prenotazioni"
            : "Altro"

  const showBack = tab === "altro" && altroSection !== null
  const showSearch = !(tab === "altro" && altroSection !== null)
  const showShellMenu = !showBack

  return (
    <MobileActionHub
      onNavigateTab={handleTabChange}
      onNavigateSection={(sectionKey) => navigateToSection(sectionKey)}
    >
      {(flow) => (
        <div className="flex min-h-dvh flex-col bg-slate-50 text-slate-900">
          <MobileAppHeader
            title={headerTitle}
            showBack={showBack}
            showSearch={showSearch}
            showMenuTrigger={showShellMenu}
            onMenuOpen={() => setSideNavOpen(true)}
            onSearchOpen={flow.openSearch}
            compact={tab === "home"}
            onBack={() => setAltroSection(null)}
          />

          <main className="flex-1 overflow-y-auto px-4 pt-3 pb-[calc(5.25rem+env(safe-area-inset-bottom))]">
            {tab === "home" ? (
              <MobileHomeView
                onQuickAction={flow.handleQuickAction}
                onOpenOperazioni={() => handleTabChange("operazioni")}
                onOpenMeteoModule={() => {
                  setTab("altro")
                  setAltroSection("Meteo marino")
                }}
                onOpenBarcheModule={() => {
                  setTab("altro")
                  setAltroSection("Barche")
                }}
              />
            ) : null}

            {tab === "operazioni" ? <MobileOperazioniView /> : null}

            {tab === "prenotazioni" ? (
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{sectionContent.Prenotazioni}</section>
            ) : null}

            {tab === "altro" && !altroSection ? <MobileAltroHub onSelect={setAltroSection} /> : null}

            {tab === "altro" && altroSection ? (
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{sectionContent[altroSection]}</section>
            ) : null}
          </main>

          <MobileBottomNav active={tab} onChange={handleTabChange} />

          <DashboardMobileNav
            open={sideNavOpen}
            onOpenChange={setSideNavOpen}
            nodes={navNodes}
            activeSection={menuActiveSection}
            onNavigate={navigateFromMenu}
          />
        </div>
      )}
    </MobileActionHub>
  )
}
