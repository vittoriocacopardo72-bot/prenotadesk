"use client"

import { useEffect, useState } from "react"

const QUERY = "(max-width: 1023px)"

/**
 * Matches Tailwind `lg` breakpoint (1024px). `null` until hydrated to avoid SSR/client mismatch.
 */
export function useIsMobileAppMode(): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  return isMobile
}
