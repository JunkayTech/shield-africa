// components/track-pageview.tsx
// Fire-and-forget page-view tracking for the public site.
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function TrackPageview() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const body = JSON.stringify({ path: pathname });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // never break the page because of analytics
    }
  }, [pathname]);

  return null;
}
