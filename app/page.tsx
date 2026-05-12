"use client";

import { DesktopHomeShell } from "@/components/dashboard/desktop-home-shell";
import { MobileAppRoot } from "@/components/mobile";
import { useIsMobileAppMode } from "@/hooks/use-is-mobile-app-mode";

export default function Home() {
  const isMobile = useIsMobileAppMode();

  if (isMobile === null) {
    return <div className="min-h-dvh bg-slate-50" aria-busy="true" />;
  }

  if (isMobile) {
    return <MobileAppRoot />;
  }

  return <DesktopHomeShell />;
}
