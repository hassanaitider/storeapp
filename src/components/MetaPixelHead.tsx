import Script from "next/script";
import {
  META_PIXEL_ID,
  isMetaPixelConfigured,
} from "@/lib/meta-config";
import { metaPixelHeadSnippet } from "@/lib/meta-pixel";

/** Meta Pixel base code — loads after hydration (visible to Pixel Helper). */
export function MetaPixelHead() {
  if (!isMetaPixelConfigured()) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
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
