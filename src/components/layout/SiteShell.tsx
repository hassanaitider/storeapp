"use client";

import { useStore } from "@/context/StoreContext";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { locale } = useStore();
  const isRtl = locale === "ar";

  return (
    <div
      className={isRtl ? "font-arabic" : "font-sans"}
      dir={isRtl ? "rtl" : "ltr"}
      lang={locale}
    >
      <Header />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </div>
  );
}
