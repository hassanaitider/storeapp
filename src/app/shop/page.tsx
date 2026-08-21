import { Suspense } from "react";
import ShopClient from "./ShopClient";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-[var(--muted)]">
          Loading…
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
