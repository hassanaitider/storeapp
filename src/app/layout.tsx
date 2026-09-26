import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Tajawal } from "next/font/google";
import { StoreProvider } from "@/context/StoreContext";
import { SiteShell } from "@/components/layout/SiteShell";
import { MetaPixel } from "@/components/MetaPixel";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const arabic = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Smart Shop | سمارت شوب",
    template: "%s | Smart Shop",
  },
  description:
    "متجر Smart Shop — متجر متنوع · توصيل مجاني · الدفع عند الاستلام · استرداد 30 يومًا",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Smart Shop",
    locale: "ar_AR",
    title: "Smart Shop | سمارت شوب",
    description:
      "متجر Smart Shop — متجر متنوع · توصيل مجاني · الدفع عند الاستلام · استرداد 30 يومًا",
    images: [{ url: "/brand/smart-shop-logo.webp" }],
  },
  icons: {
    icon: "/brand/smart-shop-logo.webp",
    apple: "/brand/smart-shop-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${arabic.variable} font-sans antialiased`}
      >
        <StoreProvider>
          <MetaPixel />
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}
