import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import {
  catalogToJson,
  parseCatalogJson,
  type PersistedCatalog,
} from "@/lib/catalog-persist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GlobalCatalog = {
  __smartShopCatalog?: PersistedCatalog;
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

async function readCatalog(): Promise<PersistedCatalog | null> {
  const g = mem();
  if (g.__smartShopCatalog) return g.__smartShopCatalog;

  for (const file of [tmpPath(), dataPath()]) {
    try {
      const raw = await readFile(file, "utf8");
      const parsed = parseCatalogJson(raw);
      if (parsed) {
        g.__smartShopCatalog = parsed;
        return parsed;
      }
    } catch {
      /* missing */
    }
  }
  return null;
}

async function writeCatalog(data: PersistedCatalog): Promise<void> {
  const clean = parseCatalogJson(catalogToJson(data));
  if (!clean) throw new Error("Invalid catalog");
  mem().__smartShopCatalog = clean;
  const raw = catalogToJson(clean);

  try {
    await writeFile(tmpPath(), raw, "utf8");
  } catch {
    /* /tmp may be unavailable */
  }

  try {
    await mkdir(path.dirname(dataPath()), { recursive: true });
    await writeFile(dataPath(), raw, "utf8");
  } catch {
    /* Vercel read-only filesystem — memory + /tmp still help */
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
    if (!clean || (!clean.categories?.length && !clean.products?.length)) {
      // Allow empty after intentional wipe, but require shape
      if (!clean) {
        return NextResponse.json({ ok: false, error: "bad payload" }, { status: 400 });
      }
    }
    await writeCatalog(clean!);
    return NextResponse.json({ ok: true, updatedAt: clean!.updatedAt });
  } catch (err) {
    console.error("catalog PUT failed", err);
    return NextResponse.json({ ok: false, error: "save failed" }, { status: 500 });
  }
}
