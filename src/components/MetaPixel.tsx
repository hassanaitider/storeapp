"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { isMetaPixelConfigured } from "@/lib/meta-config";
import { trackBoth } from "@/lib/fb";

function scheduleIdle(fn: () => void) {
  if (typeof window === "undefined") return;
  const ric = window.requestIdleCallback;
  if (typeof ric === "function") {
    ric.call(window, () => fn(), { timeout: 4000 });
  } else {
    window.setTimeout(fn, 1);
  }
}

/** Wait briefly so fbq('init') from head is ready before first trackBoth */
function waitForFbq(ms = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (typeof window.fbq === "function") {
      resolve(true);
      return;
    }
    const start = Date.now();
    const timer = window.setInterval(() => {
      if (typeof window.fbq === "function") {
        window.clearInterval(timer);
        resolve(true);
      } else if (Date.now() - start >= ms) {
        window.clearInterval(timer);
        resolve(false);
      }
    }, 40);
  });
}

function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isMetaPixelConfigured()) return;

    let cancelled = false;

    scheduleIdle(() => {
      void (async () => {
        await waitForFbq();
        if (cancelled) return;
        // Browser + Server PageView with shared event_id
        trackBoth("PageView");
      })();
    });

    return () => {
      cancelled = true;
    };
  }, [pathname, searchParams]);

  return null;
}

/** PageView on every route via trackBoth → Navigateur + Serveur */
export function MetaPixel() {
  if (!isMetaPixelConfigured()) return null;

  return (
    <Suspense fallback={null}>
      <MetaPixelPageView />
    </Suspense>
  );
}
