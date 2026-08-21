import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const ABSOLUTE_MAX_BYTES = 25 * 1024 * 1024;
/** Durable data-URL budget (fits localStorage catalog) */
const DATA_URL_MAX = 1_400_000;

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
    /* memory only */
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

async function toDurableDataUrl(
  mime: string,
  buffer: Buffer
): Promise<string | null> {
  const direct = `data:${mime};base64,${buffer.toString("base64")}`;
  if (direct.length <= DATA_URL_MAX) return direct;

  // GIF / SVG: cannot safely recompress here — skip
  if (mime.includes("gif") || mime.includes("svg")) return null;

  try {
    const sharp = (await import("sharp")).default;
    // Step down until it fits
    for (const [size, q] of [
      [1600, 88],
      [1200, 82],
      [900, 76],
      [700, 70],
    ] as const) {
      const out = await sharp(buffer)
        .rotate()
        .resize({
          width: size,
          height: size,
          fit: "inside",
          withoutEnlargement: true,
          kernel: sharp.kernel.lanczos3,
        })
        .webp({ quality: q, effort: 4 })
        .toBuffer();
      const url = `data:image/webp;base64,${out.toString("base64")}`;
      if (url.length <= DATA_URL_MAX) return url;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/**
 * Upload product images with durable URLs.
 * On Vercel without Blob, ephemeral /api/media is skipped — data-URLs persist in catalog.
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
    const ext = extFor(file, mime);
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const onVercel = Boolean(process.env.VERCEL);

    // 1) Vercel Blob — durable public URL
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`products/${filename}`, raw, {
          access: "public",
          contentType: mime,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        return NextResponse.json({ url: blob.url, durable: true });
      } catch (err) {
        console.error("blob upload failed", err);
      }
    }

    // 2) Local public/uploads (dev / non-serverless)
    const localUrl = await saveToPublic(filename, raw);
    if (localUrl) {
      return NextResponse.json({ url: localUrl, durable: true });
    }

    // 3) Durable data-URL (works on Vercel + localStorage catalog)
    const dataUrl = await toDurableDataUrl(mime, raw);
    if (dataUrl) {
      return NextResponse.json({ url: dataUrl, durable: true });
    }

    // 4) Ephemeral tmp only off Vercel (or last resort with warning)
    if (!onVercel) {
      try {
        const url = await saveToTmp(filename, raw, mime);
        return NextResponse.json({ url, durable: false });
      } catch (err) {
        console.error("tmp upload failed", err);
      }
    }

    return NextResponse.json(
      {
        error:
          mime.includes("gif")
            ? "GIF كبير جدًا للحفظ الدائم. صغّره أو فعّل Vercel Blob."
            : "تعذر حفظ الصورة بشكل دائم. صغّر الملف وحاول مجددًا.",
      },
      { status: 413 }
    );
  } catch (err) {
    console.error("upload failed", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
