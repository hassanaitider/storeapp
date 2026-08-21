"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onUploaded: (url: string) => void;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

/** Soft client shrink only for huge stills — preserve clarity; never touch GIF. */
async function prepareFile(file: File): Promise<File> {
  if (
    file.type === "image/gif" ||
    file.type === "image/svg+xml" ||
    file.type === "image/png" ||
    file.type.startsWith("video/") ||
    !file.type.startsWith("image/") ||
    file.size < 5_000_000
  ) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const max = 3200;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    if (scale >= 0.98) {
      bitmap.close();
      return file;
    }
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/webp", 0.95)
    );
    if (!blob || blob.size >= file.size * 0.95) return file;
    const name = file.name.replace(/\.\w+$/, "") + ".webp";
    return new File([blob], name, { type: "image/webp" });
  } catch {
    return file;
  }
}

export async function uploadMediaFile(file: File): Promise<string> {
  const prepared = await prepareFile(file);
  const body = new FormData();
  body.append("file", prepared);
  const res = await fetch("/api/upload", { method: "POST", body });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Upload failed");
  }
  return data.url;
}

export function ImageUploadButton({
  onUploaded,
  label,
  className,
  size = "md",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sizeClass =
    size === "sm"
      ? "h-9 w-9"
      : size === "lg"
        ? "h-12 w-12"
        : "h-10 w-10";

  const onPick = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setLoading(true);
    try {
      const url = await uploadMediaFile(file);
      onUploaded(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("inline-flex flex-col items-start gap-1", className)}>
      <button
        type="button"
        disabled={loading}
        title={label}
        aria-label={label || "Upload image or GIF"}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "inline-flex items-center justify-center rounded-xl border border-sand-300 bg-white text-brand-700 shadow-sm transition hover:border-brand-400 hover:bg-brand-50 disabled:opacity-60",
          sizeClass,
          label && "w-auto gap-2 px-3"
        )}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <ImagePlus className="h-5 w-5" />
        )}
        {label ? <span className="text-sm font-medium">{label}</span> : null}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="*/*"
        className="hidden"
        onChange={(e) => onPick(e.target.files?.[0])}
      />
      {error ? (
        <p className="max-w-[16rem] text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  );
}

export function needsUnoptimizedImage(src: string) {
  return (
    src.startsWith("data:") ||
    src.startsWith("blob:") ||
    src.startsWith("/api/media/") ||
    /\.gif($|\?)/i.test(src) ||
    // Prefer original bytes for product clarity
    src.startsWith("/products/") ||
    src.startsWith("/uploads/")
  );
}
