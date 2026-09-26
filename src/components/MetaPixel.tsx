"use client";

import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackBoth } from "@/lib/fb";

/** أبو يحيى — sole Pixel on cargolf.net (do not add a second init) */
const PIXEL_ID = "964436486676478";

const PIXEL_SNIPPET = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
`.trim();

function MetaPixelSpaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const first = useRef(true);

  useEffect(() => {
    // First PageView already fired once in PIXEL_SNIPPET
    if (first.current) {
      first.current = false;
      return;
    }
    trackBoth("PageView");
  }, [pathname, searchParams]);

  return null;
}

/**
 * Meta Pixel — one init only (964436486676478).
 * strategy: afterInteractive
 */
export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {PIXEL_SNIPPET}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <MetaPixelSpaPageView />
      </Suspense>
    </>
  );
}
