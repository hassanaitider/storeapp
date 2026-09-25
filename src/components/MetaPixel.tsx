"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { isMetaPixelConfigured } from "@/lib/meta-config";
import { trackPageView } from "@/lib/meta-pixel";

function scheduleIdle(fn: () => void) {
  if (typeof window === "undefined") return;
  const ric = window.requestIdleCallback;
  if (typeof ric === "function") {
    ric.call(window, () => fn(), { timeout: 4000 });
  } else {
    window.setTimeout(fn, 1);
  }
}

/** Pixel uses lazyOnload — wait briefly for the head snippet's event id. */
function waitForInitialPageViewId(ms = 10000): Promise<string | undefined> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(undefined);
      return;
    }
    if (window.__metaInitialPageViewId) {
      resolve(window.__metaInitialPageViewId);
      return;
    }
    const start = Date.now();
    const timer = window.setInterval(() => {
      if (window.__metaInitialPageViewId) {
        window.clearInterval(timer);
        resolve(window.__metaInitialPageViewId);
      } else if (Date.now() - start >= ms) {
        window.clearInterval(timer);
        resolve(undefined);
      }
    }, 100);
  });
}

function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const first = useRef(true);

  useEffect(() => {
    if (!isMetaPixelConfigured()) return;

    let cancelled = false;

    const run = async () => {
      if (first.current) {
        first.current = false;
        const initialId = await waitForInitialPageViewId();
        if (cancelled) return;
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
    };

    scheduleIdle(() => {
      void run();
    });

    return () => {
      cancelled = true;
    };
  }, [pathname, searchParams]);

  return null;
}

/** SPA PageView + CAPI pairing — inactive until a Pixel ID is configured */
export function MetaPixel() {
  if (!isMetaPixelConfigured()) return null;

  return (
    <Suspense fallback={null}>
      <MetaPixelPageView />
    </Suspense>
  );
}
