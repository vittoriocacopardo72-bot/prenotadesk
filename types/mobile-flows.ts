export type MobileActionSheetId =
  | "search"
  | "create-booking"
  | "register-payment"
  | "assign-crew"
  | "toggle-boat-block"

export type MobileFeedbackTone = "success" | "error" | "cancelled"

export type MobileFeedbackState = {
  tone: MobileFeedbackTone
  title: string
  detail?: string
}
