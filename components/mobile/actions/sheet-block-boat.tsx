"use client"

import { useState } from "react"

import { setBoatBlockState } from "@/lib/actions"
import { dashboardFleetLive } from "@/lib/mock/dashboard"
import type { ActionResult } from "@/types/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

export type BlockBoatSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onResult: (result: ActionResult<{ boatName: string; blocked: boolean }>) => void
}

export function BlockBoatSheet({ open, onOpenChange, onResult }: BlockBoatSheetProps) {
  const [boatName, setBoatName] = useState("")
  const [reason, setReason] = useState("")
  const [mode, setMode] = useState<"block" | "unblock">("block")
  const [submitting, setSubmitting] = useState(false)

  async function submit() {
    setSubmitting(true)
    const res = await setBoatBlockState({ boatName, blocked: mode === "block", reason })
    setSubmitting(false)
    onResult(res)
    if (res.status === "success") {
      setBoatName("")
      setReason("")
      onOpenChange(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[88vh] gap-0 p-0" showCloseButton>
        <SheetHeader className="border-b border-slate-200 p-4">
          <SheetTitle>{mode === "block" ? "Blocca barca" : "Sblocca barca"}</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 p-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={mode === "block" ? "default" : "outline"}
              onClick={() => setMode("block")}
            >
              Blocca
            </Button>
            <Button
              type="button"
              variant={mode === "unblock" ? "default" : "outline"}
              onClick={() => setMode("unblock")}
            >
              Sblocca
            </Button>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-block-boat">Barca</Label>
            <Input
              id="mobile-block-boat"
              list="boat-block-options"
              value={boatName}
              onChange={(e) => setBoatName(e.target.value)}
            />
            <datalist id="boat-block-options">
              {dashboardFleetLive.map((boat) => (
                <option key={boat.nome} value={boat.nome} />
              ))}
            </datalist>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile-block-reason">Motivo</Label>
            <Textarea
              id="mobile-block-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Motivo operativo..."
            />
          </div>
        </div>
        <SheetFooter className="border-t border-slate-200 p-4">
          <div className="grid w-full grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                onResult({ status: "cancelled", message: "Operazione barca annullata." })
              }}
            >
              Annulla
            </Button>
            <Button type="button" onClick={() => void submit()} disabled={submitting}>
              {submitting ? "Invio..." : mode === "block" ? "Conferma blocco" : "Conferma sblocco"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
