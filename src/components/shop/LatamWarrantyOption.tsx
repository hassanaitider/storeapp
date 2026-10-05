"use client";

import { ShieldCheck } from "lucide-react";
import { WARRANTY_MONTHS, warrantyUnitLabel } from "@/lib/latam-warranty";
import type { CountryCode } from "@/lib/types";
import { cn } from "@/lib/utils";

export function LatamWarrantyOption({
  country,
  qty,
  checked,
  onChange,
}: {
  country: CountryCode;
  qty: number;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border-2 px-3 py-3 transition",
        checked ? "border-[#ff7a00] bg-[#fff6ee]" : "border-dashed border-[#e2e2e2] bg-white"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 accent-[#ff7a00]"
      />
      <span className="flex-1 text-sm text-[#222]">
        <span className="flex items-center gap-1.5 font-bold">
          <ShieldCheck className="h-4 w-4 text-[#ff7a00]" />
          Agregar garantía de {WARRANTY_MONTHS} meses
        </span>
        <span className="mt-0.5 block text-xs text-[#6b6b6b]">
          +{warrantyUnitLabel(country)} por unidad
          {qty > 1 ? ` · ${qty} unidades` : ""}
        </span>
      </span>
    </label>
  );
}
