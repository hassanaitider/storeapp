import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/meta-config";
import { metaPixelHeadSnippet } from "@/lib/meta-pixel";

/**
 * Meta Pixel base code — deferred until after window load so fbevents.js
 * does not compete with hydration / LCP on the main thread.
 */
export function MetaPixelHead() {
  return (
    <>
      <Script id="meta-pixel" strategy="lazyOnload">
        {metaPixelHeadSnippet()}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
