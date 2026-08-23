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

async function writeToFiles(raw: string): Promise<void> {
  try {
    await writeFile(tmpPath(), raw, "utf8");
  } catch {
    /* /tmp may be unavailable */
  }
  try {
    await mkdir(path.dirname(dataPath()), { recursive: true });
    await writeFile(dataPath(), raw, "utf8");
  } catch {
    /* Vercel read-only filesystem */
  }
}

async function readCatalog(): Promise<PersistedCatalog | null> {
  const g = mem();
  if (g.__smartShopCatalog) return g.__smartShopCatalog;

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

  const fromFiles = await readFromFiles();
  if (fromFiles) {
    g.__smartShopCatalog = fromFiles;
    g.__smartShopCatalogUpdatedAt = fromFiles.updatedAt;
    return fromFiles;
  }

  return null;
}

async function writeCatalog(data: PersistedCatalog): Promise<void> {
  const clean = parseCatalogJson(catalogToJson(data));
  if (!clean) throw new Error("Invalid catalog");
  const raw = catalogToJson(clean);

  mem().__smartShopCatalog = clean;
  mem().__smartShopCatalogUpdatedAt = clean.updatedAt;

  let persisted = false;

  if (catalogBlobConfigured()) {
    const url = await writeCatalogBlobRaw(raw);
    if (url) persisted = true;
  } else {
    await writeToFiles(raw);
    persisted = true;
  }

  if (!persisted) {
    throw new Error("Catalog write failed");
  }
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
    console.error("catalog PUT failed", err);
    return NextResponse.json({ ok: false, error: "save failed" }, { status: 500 });
  }
}
