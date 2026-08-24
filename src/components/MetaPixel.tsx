"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { trackPageView } from "@/lib/meta-pixel";

function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const first = useRef(true);

  useEffect(() => {
    // First load: head already fired PageView — only mirror to CAPI with same event_id
    if (first.current) {
      first.current = false;
      const initialId =
        typeof window !== "undefined"
          ? window.__metaInitialPageViewId
          : undefined;
      if (initialId) {
        void fetch("/api/meta/capi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName: "PageView",
            eventId: initialId,
            eventSourceUrl: window.location.href,
            userData: {
              fbp: document.cookie.match(/(?:^|; )_fbp=([^;]*)/)?.[1]
                ? decodeURIComponent(
                    document.cookie.match(/(?:^|; )_fbp=([^;]*)/)![1]
                  )
                : undefined,
              fbc: document.cookie.match(/(?:^|; )_fbc=([^;]*)/)?.[1]
                ? decodeURIComponent(
                    document.cookie.match(/(?:^|; )_fbc=([^;]*)/)![1]
                  )
                : undefined,
            },
          }),
          keepalive: true,
        }).catch(() => {});
      } else {
        trackPageView();
      }
      return;
    }
    trackPageView();
  }, [pathname, searchParams]);

  return null;
}

/** SPA PageView + CAPI pairing (base Pixel code lives in <head>) */
export function MetaPixel() {
  return (
    <Suspense fallback={null}>
      <MetaPixelPageView />
    </Suspense>
  );
}
