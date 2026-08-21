import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MediaStore = {
  __smartShopMedia?: Map<string, { buffer: Buffer; type: string }>;
};

function mediaMap() {
  const g = globalThis as MediaStore;
  if (!g.__smartShopMedia) g.__smartShopMedia = new Map();
  return g.__smartShopMedia;
}

const SAFE = /^[\w.-]+$/;

function mimeFromName(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    avif: "image/avif",
    bmp: "image/bmp",
    svg: "image/svg+xml",
    heic: "image/heic",
    heif: "image/heif",
    tif: "image/tiff",
    tiff: "image/tiff",
    ico: "image/x-icon",
    bin: "application/octet-stream",
  };
  return map[ext] || "application/octet-stream";
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;
  if (!name || !SAFE.test(name)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const cached = mediaMap().get(name);
  if (cached) {
    return new NextResponse(new Uint8Array(cached.buffer), {
      headers: {
        "Content-Type": cached.type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  try {
    const filePath = path.join("/tmp", "smart-shop-uploads", name);
    const buffer = await readFile(filePath);
    const type = mimeFromName(name);
    mediaMap().set(name, { buffer, type });
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
