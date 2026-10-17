import type { Order } from "./types";

function csvEscape(value: string | number | undefined | null): string {
  const raw = value == null ? "" : String(value);
  if (/[",\n\r]/.test(raw)) return `"${raw.replace(/"/g, '""')}"`;
  return raw;
}

function itemSummary(order: Order): string {
  return order.items
    .map((i) => `${i.productId}×${i.quantity}`)
    .join(" · ");
}

function addressLine(c: Order["customer"]): string {
  return [
    c.address,
    c.city,
    c.neighborhood,
    c.district,
    c.state,
    c.postalCode,
  ]
    .filter((p) => Boolean(p?.trim()))
    .join(", ");
}

const HEADERS = [
  "id",
  "createdAt",
  "status",
  "country",
  "currency",
  "totalUSD",
  "name",
  "phone",
  "city",
  "address",
  "state",
  "neighborhood",
  "district",
  "postalCode",
  "nationalId",
  "notes",
  "items",
] as const;

/** Builds a UTF-8 CSV (with BOM) for Excel / Google Sheets. */
export function ordersToCsv(orders: Order[]): string {
  const rows = [...orders]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((o) =>
      [
        o.id,
        o.createdAt,
        o.status,
        o.country,
        o.currency,
        o.totalUSD,
        o.customer.name,
        o.customer.phone,
        o.customer.city,
        addressLine(o.customer),
        o.customer.state ?? "",
        o.customer.neighborhood ?? "",
        o.customer.district ?? "",
        o.customer.postalCode ?? "",
        o.customer.nationalId ?? "",
        o.customer.notes ?? "",
        itemSummary(o),
      ]
        .map(csvEscape)
        .join(",")
    );
  return `\uFEFF${HEADERS.join(",")}\n${rows.join("\n")}\n`;
}

export function downloadOrdersCsv(orders: Order[], filename?: string) {
  if (typeof window === "undefined") return;
  const stamp = new Date().toISOString().slice(0, 10);
  const name = filename ?? `smartshop-orders-${stamp}.csv`;
  const blob = new Blob([ordersToCsv(orders)], {
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
