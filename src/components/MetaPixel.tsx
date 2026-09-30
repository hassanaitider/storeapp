"use client";

import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackBoth } from "@/lib/fb";

/** Every fbq('track', …) is delivered to all pixels initialised here. */
const PIXEL_IDS = ["964436486676478", "2098415630739868"];

const PIXEL_SNIPPET = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
${PIXEL_IDS.map((id) => `fbq('init', '${id}');`).join("\n")}
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

/** Meta Pixels — strategy: afterInteractive */
export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {PIXEL_SNIPPET}
      </Script>
      <noscript>
        {PIXEL_IDS.map((id) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={id}
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
            alt=""
          />
        ))}
      </noscript>
      <Suspense fallback={null}>
        <MetaPixelSpaPageView />
      </Suspense>
    </>
  );
}
