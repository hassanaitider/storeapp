import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** Allow larger uploads on Vercel Pro / configured plans */
export const maxDuration = 60;

/** Soft ceiling only to protect the server — no format whitelist */
const ABSOLUTE_MAX_BYTES = 25 * 1024 * 1024; // 25MB

type MediaStore = {
  __smartShopMedia?: Map<string, { buffer: Buffer; type: string }>;
};

function mediaMap() {
  const g = globalThis as MediaStore;
  if (!g.__smartShopMedia) g.__smartShopMedia = new Map();
  return g.__smartShopMedia;
}

function extFor(file: File, mime: string): string {
  const fromName = file.name.includes(".")
    ? `.${file.name.split(".").pop()!.toLowerCase()}`
    : "";
  const known = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".avif",
    ".bmp",
    ".svg",
    ".heic",
    ".heif",
    ".tif",
    ".tiff",
    ".ico",
  ];
  if (known.includes(fromName)) {
    return fromName === ".jpeg" ? ".jpg" : fromName;
  }
  if (mime.includes("png")) return ".png";
  if (mime.includes("webp")) return ".webp";
  if (mime.includes("gif")) return ".gif";
  if (mime.includes("avif")) return ".avif";
  if (mime.includes("svg")) return ".svg";
  if (mime.includes("bmp")) return ".bmp";
  if (mime.includes("heic") || mime.includes("heif")) return ".heic";
  return ".bin";
}

function resolveMime(file: File): string {
  if (file.type && file.type !== "application/octet-stream") return file.type;
  const ext = file.name.includes(".")
    ? file.name.split(".").pop()!.toLowerCase()
    : "";
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    avif: "image/avif",
    bmp: "image/bmp",
    svg: "image/svg+xml",
    heic: "image/heic",
    heif: "image/heif",
    tif: "image/tiff",
    tiff: "image/tiff",
    ico: "image/x-icon",
  };
  return map[ext] || "application/octet-stream";
}

async function saveToTmp(
  filename: string,
  buffer: Buffer,
  type: string
): Promise<string> {
  mediaMap().set(filename, { buffer, type });
  try {
    const { mkdir, writeFile } = await import("fs/promises");
    const path = await import("path");
    const dir = path.join("/tmp", "smart-shop-uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), buffer);
  } catch {
    /* memory map still works for this instance */
  }
  return `/api/media/${filename}`;
}

async function saveToPublic(
  filename: string,
  buffer: Buffer
): Promise<string | null> {
  try {
    const { mkdir, writeFile } = await import("fs/promises");
    const path = await import("path");
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    return `/uploads/${filename}`;
  } catch {
    return null;
  }
}

async function maybeCompress(
  mime: string,
  buffer: Buffer,
  ext: string
): Promise<{ buffer: Buffer; type: string; ext: string }> {
  // Keep GIF / SVG / reasonable files untouched for maximum clarity
  if (
    mime.includes("gif") ||
    mime.includes("svg") ||
    mime.includes("png") ||
    buffer.length < 5_000_000
  ) {
    return { buffer, type: mime, ext };
  }
  try {
    const sharp = (await import("sharp")).default;
    const out = await sharp(buffer)
      .rotate()
      .resize({
        width: 3200,
        height: 3200,
        fit: "inside",
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3,
      })
      .webp({ quality: 95, effort: 4 })
      .toBuffer();
    // Only use compressed if meaningfully smaller
    if (out.length >= buffer.length * 0.95) {
      return { buffer, type: mime, ext };
    }
    return { buffer: out, type: "image/webp", ext: ".webp" };
  } catch {
    return { buffer, type: mime, ext };
  }
}

/**
 * Accept any image/GIF (and common media files) of any practical size.
 * Storage order: Vercel Blob → public/uploads → /tmp API → data-URL.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size <= 0) {
      return NextResponse.json({ error: "Empty file" }, { status: 400 });
    }

    if (file.size > ABSOLUTE_MAX_BYTES) {
      return NextResponse.json(
        { error: "File exceeds 25MB hard limit" },
        { status: 413 }
      );
    }

    const mime = resolveMime(file);
    const raw = Buffer.from(await file.arrayBuffer());
    const baseExt = extFor(file, mime);
    const prepared = await maybeCompress(mime, raw, baseExt);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${prepared.ext}`;

    // 1) Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`products/${filename}`, prepared.buffer, {
          access: "public",
          contentType: prepared.type,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        return NextResponse.json({ url: blob.url });
      } catch (err) {
        console.error("blob upload failed", err);
      }
    }

    // 2) Local disk
    const localUrl = await saveToPublic(filename, prepared.buffer);
    if (localUrl) {
      return NextResponse.json({ url: localUrl });
    }

    // 3) /tmp + /api/media
    try {
      const url = await saveToTmp(filename, prepared.buffer, prepared.type);
      return NextResponse.json({ url });
    } catch (err) {
      console.error("tmp upload failed", err);
    }

    // 4) data-URL fallback (any size that fits catalog soft limit)
    const dataUrl = `data:${prepared.type};base64,${prepared.buffer.toString("base64")}`;
    if (dataUrl.length <= 900_000) {
      return NextResponse.json({ url: dataUrl });
    }

    // Last attempt: harder compress then data-URL
    try {
      const sharp = (await import("sharp")).default;
      const tiny = await sharp(raw)
        .rotate()
        .resize({ width: 1000, height: 1000, fit: "inside" })
        .webp({ quality: 90 })
        .toBuffer();
      const tinyUrl = `data:image/webp;base64,${tiny.toString("base64")}`;
      if (tinyUrl.length <= 900_000) {
        return NextResponse.json({ url: tinyUrl });
      }
    } catch {
      /* ignore */
    }

    return NextResponse.json(
      {
        error:
          "Could not store this file. Enable Vercel Blob (BLOB_READ_WRITE_TOKEN) for large media.",
      },
      { status: 413 }
    );
  } catch (err) {
    console.error("upload failed", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
