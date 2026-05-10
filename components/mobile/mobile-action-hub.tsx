"use client"

import { useCallback, useState, type ReactNode } from "react"

import { CreateBookingSheet } from "@/components/mobile/actions/sheet-create-booking"
import { AssignCrewSheet } from "@/components/mobile/actions/sheet-assign-crew"
import { RegisterPaymentSheet } from "@/components/mobile/actions/sheet-register-payment"
import { BlockBoatSheet } from "@/components/mobile/actions/sheet-block-boat"
import { MobileActionToast } from "@/components/mobile/feedback/mobile-action-toast"
import { MobileCommandSheet } from "@/components/mobile/search/mobile-command-sheet"
import type { ActionResult, MobileSearchResult } from "@/types/actions"
import type { MobileFeedbackState } from "@/types/mobile-flows"
import type { MobileMainTab } from "@/types/mobile"

type ActionSheet = "create-booking" | "register-payment" | "assign-crew" | "toggle-boat-block" | null

export type MobileActionHubApi = {
  openSearch: () => void
  handleQuickAction: (label: string) => void
}

export type MobileActionHubProps = {
  onNavigateTab: (tab: MobileMainTab) => void
  onNavigateSection: (sectionKey: string) => void
  children: (api: MobileActionHubApi) => ReactNode
}

function toFeedback(result: ActionResult<unknown>): MobileFeedbackState {
  if (result.status === "success") {
    return { tone: "success", title: result.message }
  }
  if (result.status === "cancelled") {
    return { tone: "cancelled", title: result.message }
  }
  return { tone: "error", title: result.message, detail: result.code }
}

export function MobileActionHub({ onNavigateTab, onNavigateSection, children }: MobileActionHubProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sheet, setSheet] = useState<ActionSheet>(null)
  const [feedback, setFeedback] = useState<MobileFeedbackState | null>(null)

  const onActionResult = useCallback((result: ActionResult<unknown>) => {
    setFeedback(toFeedback(result))
  }, [])

  const handleSearchPick = useCallback(
    (item: MobileSearchResult) => {
      setSearchOpen(false)
      if (item.target.type === "tab") {
        onNavigateTab(item.target.tab)
        setFeedback({ tone: "success", title: `Aperto: ${item.title}` })
        return
      }
      onNavigateSection(item.target.sectionKey)
      setFeedback({ tone: "success", title: `Aperto modulo: ${item.target.sectionKey}` })
    },
    [onNavigateSection, onNavigateTab]
  )

  const handleQuickAction = useCallback(
    (label: string) => {
      if (label === "Nuova prenotazione") return setSheet("create-booking")
      if (label === "Registra pagamento") return setSheet("register-payment")
      if (label === "Assegna equipaggio") return setSheet("assign-crew")
      if (label === "Blocca barca") return setSheet("toggle-boat-block")
      if (label === "Apri calendario") return onNavigateSection("Calendario")
      if (label === "Aggiorna meteo") return onNavigateSection("Meteo marino")
      onNavigateTab("operazioni")
    },
    [onNavigateSection, onNavigateTab]
  )

  return (
    <>
      {children({
        openSearch: () => setSearchOpen(true),
        handleQuickAction,
      })}

      <MobileCommandSheet open={searchOpen} onOpenChange={setSearchOpen} onPickResult={handleSearchPick} />

      <CreateBookingSheet
        open={sheet === "create-booking"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        onResult={onActionResult}
      />
      <RegisterPaymentSheet
        open={sheet === "register-payment"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        onResult={onActionResult}
      />
      <AssignCrewSheet
        open={sheet === "assign-crew"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        onResult={onActionResult}
      />
      <BlockBoatSheet
        open={sheet === "toggle-boat-block"}
        onOpenChange={(open) => {
          if (!open) setSheet(null)
        }}
        onResult={onActionResult}
      />

      <MobileActionToast feedback={feedback} onClose={() => setFeedback(null)} />
    </>
  )
}
