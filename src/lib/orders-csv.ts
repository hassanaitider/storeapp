import type { Order, Product } from "./types";

function csvEscape(value: string | number | undefined | null): string {
  const raw = value == null ? "" : String(value);
  if (/[",\n\r]/.test(raw)) return `"${raw.replace(/"/g, '""')}"`;
  return raw;
}

function addressOnly(c: Order["customer"]): string {
  return [
    c.address,
    c.neighborhood,
    c.district,
    c.state,
    c.postalCode,
  ]
    .filter((p) => Boolean(p?.trim()))
    .join(", ");
}

function skuForItem(
  productId: string,
  quantity: number,
  byId: Map<string, Product>
): string {
  const p = byId.get(productId);
  const sku = (p?.slug || productId).trim();
  return quantity > 1 ? `${sku} x${quantity}` : sku;
}

/**
 * Simple delivery sheet: Nom | Numéro | Ville | Adresse | SKU
 * One row per order (SKUs joined with " · " when several items).
 */
export function ordersToCsv(
  orders: Order[],
  products: Product[] = []
): string {
  const byId = new Map(products.map((p) => [p.id, p]));
  const headers = ["Nom", "Numéro", "Ville", "Adresse", "SKU"];
  const rows = [...orders]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((o) => {
      const sku = o.items
        .map((i) => skuForItem(i.productId, i.quantity, byId))
        .join(" · ");
      return [
        o.customer.name.trim(),
        o.customer.phone.trim(),
        o.customer.city.trim(),
        addressOnly(o.customer),
        sku,
      ]
        .map(csvEscape)
        .join(",");
    });
  return `\uFEFF${headers.join(",")}\n${rows.join("\n")}\n`;
}

export function downloadOrdersCsv(
  orders: Order[],
  products: Product[] = [],
  filename?: string
) {
  if (typeof window === "undefined") return;
  const stamp = new Date().toISOString().slice(0, 10);
  const name = filename ?? `commandes-${stamp}.csv`;
  const blob = new Blob([ordersToCsv(orders, products)], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
