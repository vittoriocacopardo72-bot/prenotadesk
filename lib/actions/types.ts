export const ACTION_ERROR = {
  validation: "VALIDATION_ERROR",
  notFound: "NOT_FOUND",
  unknown: "UNKNOWN_ERROR",
} as const

export type ActionErrorCode = (typeof ACTION_ERROR)[keyof typeof ACTION_ERROR]
