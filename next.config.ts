import type { NextConfig } from "next";

const LONG_CACHE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    // Cap variants — product UI rarely needs 2K+ srcsets on mobile storefronts
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/products/:path*",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/categories/:path*",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/uploads/:path*",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default nextConfig;
