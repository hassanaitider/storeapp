import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import {
  catalogBlobConfigured,
  readCatalogBlobRaw,
  writeCatalogBlobRaw,
} from "@/lib/catalog-blob";
import {
  catalogToJson,
  parseCatalogJson,
  type PersistedCatalog,
} from "@/lib/catalog-persist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GlobalCatalog = {
  __smartShopCatalog?: PersistedCatalog;
  __smartShopCatalogUpdatedAt?: number;
};

function mem(): GlobalCatalog {
  return globalThis as GlobalCatalog;
}

function tmpPath() {
  return path.join("/tmp", "smart-shop-catalog.json");
}

function dataPath() {
  return path.join(process.cwd(), "data", "catalog.json");
}

async function readFromFiles(): Promise<PersistedCatalog | null> {
  for (const file of [tmpPath(), dataPath()]) {
    try {
      const raw = await readFile(file, "utf8");
      const parsed = parseCatalogJson(raw);
      if (parsed) return parsed;
    } catch {
      /* missing */
    }
  }
  return null;
}

async function writeToFiles(raw: string): Promise<boolean> {
  let wrote = false;
  try {
    await writeFile(tmpPath(), raw, "utf8");
    wrote = true;
  } catch {
    /* /tmp may be unavailable */
  }
  try {
    await mkdir(path.dirname(dataPath()), { recursive: true });
    await writeFile(dataPath(), raw, "utf8");
    wrote = true;
  } catch {
    /* Vercel read-only filesystem */
  }
  return wrote;
}

async function readCatalog(): Promise<PersistedCatalog | null> {
  const g = mem();

  // Prefer durable blob first (source of truth on production)
  if (catalogBlobConfigured()) {
    const raw = await readCatalogBlobRaw();
    if (raw) {
      const parsed = parseCatalogJson(raw);
      if (parsed) {
        g.__smartShopCatalog = parsed;
        g.__smartShopCatalogUpdatedAt = parsed.updatedAt;
        return parsed;
      }
    }
  }

  if (g.__smartShopCatalog) return g.__smartShopCatalog;

  const fromFiles = await readFromFiles();
  if (fromFiles) {
    g.__smartShopCatalog = fromFiles;
    g.__smartShopCatalogUpdatedAt = fromFiles.updatedAt;
    return fromFiles;
  }

  return null;
}

async function writeCatalog(data: PersistedCatalog): Promise<{ durable: boolean }> {
  const clean = parseCatalogJson(catalogToJson(data));
  if (!clean) throw new Error("Invalid catalog");
  const raw = catalogToJson(clean);

  mem().__smartShopCatalog = clean;
  mem().__smartShopCatalogUpdatedAt = clean.updatedAt;

  if (catalogBlobConfigured()) {
    const url = await writeCatalogBlobRaw(raw);
    if (!url) throw new Error("Blob write failed");
    // Mirror to files when possible (local/dev)
    await writeToFiles(raw);
    return { durable: true };
  }

  const onVercel = Boolean(process.env.VERCEL);
  const wrote = await writeToFiles(raw);

  if (onVercel) {
    // /tmp is ephemeral on Vercel — refuse silent "success"
    throw new Error(
      "BLOB_READ_WRITE_TOKEN missing — catalog cannot persist on Vercel"
    );
  }

  if (!wrote) throw new Error("Catalog write failed");
  return { durable: false };
}

export async function GET() {
  const data = await readCatalog();
  if (!data) {
    return NextResponse.json({ ok: true, data: null });
  }
  return NextResponse.json({ ok: true, data });
}

export async function PUT(request: Request) {
  try {
    const jar = await cookies();
    const session = verifyAdminSessionToken(jar.get(ADMIN_COOKIE)?.value);
    if (!session.ok) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as PersistedCatalog;
    const clean = parseCatalogJson(catalogToJson(body));
    if (!clean) {
      return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
    }

    await writeCatalog(clean);
    return NextResponse.json({
      ok: true,
      updatedAt: clean.updatedAt,
      durable: catalogBlobConfigured(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "save failed";
    console.error("catalog PUT failed", err);
    const needsBlob = message.includes("BLOB_READ_WRITE_TOKEN");
    return NextResponse.json(
      {
        ok: false,
        error: needsBlob ? "missing_blob_token" : "save failed",
        message,
      },
      { status: needsBlob ? 503 : 500 }
    );
  }
}
