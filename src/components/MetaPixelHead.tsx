import { META_PIXEL_ID } from "@/lib/meta-config";
import { metaPixelHeadSnippet } from "@/lib/meta-pixel";

/** Meta Pixel base code in document <head> */
export function MetaPixelHead() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: metaPixelHeadSnippet() }}
      />
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
