"use client";

import { selectBookingRows } from "@/features/bookings/selectors";
import { useAppStoreSelector } from "@/lib/store/app-store";

export function useBookingRows() {
  return useAppStoreSelector((s) => selectBookingRows(s));
}
