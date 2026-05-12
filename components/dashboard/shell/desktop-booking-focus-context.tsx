"use client";

import { createContext, useContext } from "react";

import type { SectionKey } from "@/lib/sections/section-registry";

export type DesktopBookingFocusContextValue = {
  /** Increments when the user should scroll/focus the desktop booking form (Dashboard quick action). Resets to 0 when leaving Prenotazioni. */
  bookingFormFocusNonce: number;
  /** Navigate to Prenotazioni and request focus on the shared create-booking form (same `BookingForm` + `createBooking` as mobile sheet). */
  openDesktopCreateBooking: () => void;
  /** Sidebar navigation from dashboard modules (Azioni rapide). */
  navigateToSection: (section: SectionKey) => void;
};

export const DesktopBookingFocusContext =
  createContext<DesktopBookingFocusContextValue | null>(null);

export function useDesktopBookingFocusOptional() {
  return useContext(DesktopBookingFocusContext);
}
