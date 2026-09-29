import { NextResponse } from "next/server";
import { GEO_MX } from "@/lib/mexico-geo";

/** Municipio → colonias for one estado, so the 2.7 MB tree never ships to the browser. */
export function GET(request: Request) {
  const estado = new URL(request.url).searchParams.get("estado") ?? "";
  const tree = GEO_MX[estado];
  if (!tree) {
    return NextResponse.json({ error: "unknown estado" }, { status: 404 });
  }
  return NextResponse.json(tree, {
    headers: {
      "Cache-Control":
        "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
