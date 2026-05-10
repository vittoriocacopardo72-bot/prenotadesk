import type { AppState } from "@/types/domain"

/** Memoize a selector by `AppState` reference (same pattern as the global app store). */
export function memoizeByState<T>(selector: (s: AppState) => T) {
  let hasCachedValue = false
  let cachedSource: AppState
  let cachedValue: T

  return (s: AppState) => {
    if (hasCachedValue && cachedSource === s) {
      return cachedValue
    }

    cachedSource = s
    cachedValue = selector(s)
    hasCachedValue = true
    return cachedValue
  }
}
