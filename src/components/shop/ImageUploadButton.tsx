"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { isDurableMediaUrl, needsUnoptimizedImage } from "@/lib/media-url";

type Props = {
  onUploaded: (url: string) => void;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

/** Shrink stills so a durable data-URL can be stored in the catalog. */
async function prepareFile(file: File): Promise<File> {
  if (
    file.type === "image/gif" ||
    file.type === "image/svg+xml" ||
    file.type.startsWith("video/") ||
    !file.type.startsWith("image/")
  ) {
    return file;
  }

  if (file.size < 400_000) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const max = file.size > 2_000_000 ? 1200 : 1600;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/webp", 0.85)
    );
    if (!blob) return file;
    const name = file.name.replace(/\.\w+$/, "") + ".webp";
    return new File([blob], name, { type: "image/webp" });
  } catch {
    return file;
  }
}

function isEphemeralUrl(url: string) {
  return url.startsWith("/api/media/");
}

export async function uploadMediaFile(file: File): Promise<string> {
  const prepared = await prepareFile(file);

  let localDataUrl = "";
  try {
    localDataUrl = await readAsDataUrl(prepared);
  } catch {
    /* ignore */
  }

  const body = new FormData();
  body.append("file", prepared);
  const res = await fetch("/api/upload", { method: "POST", body });
  const data = (await res.json()) as {
    url?: string;
    durable?: boolean;
    error?: string;
  };

  if (res.ok && data.url && !isEphemeralUrl(data.url)) {
    return data.url;
  }

  if (localDataUrl.startsWith("data:image/") && localDataUrl.length <= 1_500_000) {
    return localDataUrl;
  }

  if (res.ok && data.url) return data.url;
  throw new Error(data.error || "Upload failed");
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

export { isDurableMediaUrl, needsUnoptimizedImage };
