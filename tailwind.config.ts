import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7f4",
          100: "#dceee5",
          200: "#bbddd0",
          300: "#8fc5b2",
          400: "#5fa890",
          500: "#3f8b74",
          600: "#2f6f5c",
          700: "#27594b",
          800: "#21483e",
          900: "#1c3c34",
          950: "#0e221d",
        },
        sand: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e6ddd0",
          300: "#d4c5b0",
          400: "#c0a88d",
          500: "#b09274",
        },
        ink: {
          900: "#121816",
          800: "#1a2420",
          700: "#2a3531",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        arabic: ["var(--font-arabic)", "sans-serif"],
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(63,139,116,0.25), transparent), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(176,146,116,0.2), transparent), linear-gradient(165deg, #0e221d 0%, #1c3c34 45%, #27594b 100%)",
        "grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in": "slide-in 0.5s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
