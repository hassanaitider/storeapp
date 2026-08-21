import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Tajawal } from "next/font/google";
import { StoreProvider } from "@/context/StoreContext";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const arabic = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-arabic",
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
    images: [{ url: "/brand/smart-shop-logo.png" }],
  },
  icons: {
    icon: "/brand/smart-shop-logo.png",
    apple: "/brand/smart-shop-logo.png",
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
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}
