"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { ensureFbClickId, trackBoth } from "@/lib/fb";
import { pixelIdForCountry, setActivePixelCountry } from "@/lib/meta-pixels";

function MetaPixelSpaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ensureFbClickId();
    trackBoth("PageView");
  }, [pathname, searchParams]);

  return null;
}

/** Meta Pixel — LATAM markets use the LATAM pixel, Arab markets the Arab pixel. */
export function MetaPixel() {
  const { country } = useStore();
  // Set during render so child/page effects (PageView, ViewContent) already see the market.
  setActivePixelCountry(country);
  const pixelId = pixelIdForCountry(country);

  useEffect(() => {
    ensureFbClickId();
  }, []);

  return (
    <>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <MetaPixelSpaPageView />
      </Suspense>
    </>
  );
}
