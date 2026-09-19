"use client";

import { MapPin } from "lucide-react";
import { isOtherPlace } from "@/lib/latam-other-place";

export function LatamOtherPlaceField({
  selected,
  value,
  onChange,
  placeholder,
}: {
  selected: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  if (!isOtherPlace(selected)) return null;
  return (
    <label className="flex items-center gap-2.5 rounded-xl border border-transparent bg-[#f3f3f3] px-3 py-3 focus-within:border-[#ff7a00]/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ff7a00]/20">
      <span className="shrink-0 text-[#9a9a9a]">
        <MapPin className="h-4 w-4" />
      </span>
      <input
        type="text"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent text-sm text-[#222] outline-none placeholder:text-[#9a9a9a]"
      />
    </label>
  );
}
