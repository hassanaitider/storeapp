import { currencyForCountry, getCountry, SPANISH_MARKET_CODES } from "./countries";
import { DEFAULT_CURRENCY_RATES } from "./currency";
import type { CountryCode, Product } from "./types";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";
const COD_ES =
  "<p><strong>Pide ahora</strong> — envío gratis · pago contra entrega · devoluciones en 30 días.</p>";

type LocalPrice = {
  price: number;
  compare: number;
  priceUSD: number;
  compareAtUSD: number;
};

const RETRO_USD = 99;
const RETRO_COMPARE_USD = 199;

function usdToLatamLocal(country: CountryCode, usd: number): number {
  const code = currencyForCountry(country);
  if (code === "USD") return usd;
  const raw = usd * DEFAULT_CURRENCY_RATES[code];
  if (raw >= 10000) return Math.round(raw / 10) * 10;
  if (raw >= 1000) return Math.round(raw / 10) * 10;
  if (raw >= 100) return Math.round(raw / 10) * 10 - 1;
  return Math.round(raw);
}

const RETRO_PRICES: Record<CountryCode, LocalPrice> = Object.fromEntries(
  SPANISH_MARKET_CODES.map((country) => [
    country,
    {
      price: usdToLatamLocal(country, RETRO_USD),
      compare: usdToLatamLocal(country, RETRO_COMPARE_USD),
      priceUSD: RETRO_USD,
      compareAtUSD: RETRO_COMPARE_USD,
    },
  ])
) as Record<CountryCode, LocalPrice>;

RETRO_PRICES.AR = {
  price: 149900,
  compare: 299900,
  priceUSD: RETRO_USD,
  compareAtUSD: RETRO_COMPARE_USD,
};
RETRO_PRICES.CR = {
  price: 44900,
  compare: 89900,
  priceUSD: RETRO_USD,
  compareAtUSD: RETRO_COMPARE_USD,
};
RETRO_PRICES.DO = {
  price: 5890,
  compare: 11890,
  priceUSD: RETRO_USD,
  compareAtUSD: RETRO_COMPARE_USD,
};
RETRO_PRICES.HN = {
  price: 2499,
  compare: 4999,
  priceUSD: RETRO_USD,
  compareAtUSD: RETRO_COMPARE_USD,
};
RETRO_PRICES.MX = {
  price: 1799,
  compare: 3599,
  priceUSD: RETRO_USD,
  compareAtUSD: RETRO_COMPARE_USD,
};

const RETRO_MARKET_PRICES: Partial<Record<CountryCode, number>> =
  Object.fromEntries(
    SPANISH_MARKET_CODES.map((country) => [country, RETRO_PRICES[country].price])
  );

const RETRO_MARKET_COMPARE: Partial<Record<CountryCode, number>> =
  Object.fromEntries(
    SPANISH_MARKET_CODES.map((country) => [
      country,
      RETRO_PRICES[country].compare,
    ])
  );

const IMAGES = ["/products/retrolab-console-1.jpg"];

export const RETROLAB_SLUG = "consola-retrolab";

function buildRetroLab(country: CountryCode): Omit<
  Product,
  | "id"
  | "slug"
  | "categoryId"
  | "availableIn"
  | "marketPrices"
  | "marketComparePrices"
  | "priceUSD"
  | "compareAtUSD"
> {
  const marketNameEs = getCountry(country).nameEs ?? getCountry(country).nameEn;
  return {
    nameAr: "وحدة ألعاب ريترو لاب 64 جيجا",
    nameEn: "RetroLab Console 64 GB",
    nameEs: "Consola RetroLab 64 GB",
    descriptionAr: `
<h3>أكثر من 60,000 لعبة كلاسيكية في جهاز واحد</h3>
<p>وحدة محمولة بتصميم شفاف أرجواني، شاشة 3.5 إنش، وسعة 64 جيجابايت — جاهزة للعب فورًا بدون إنترنت أو اشتراك.</p>
<ul>
<li>أكثر من 60,000 لعبة مثبتة مسبقًا</li>
<li>شاشة IPS عالية الدقة 3.5"</li>
<li>سعة 64 جيجابايت + فتحة توسعة</li>
<li>بطارية طويلة · شحن USB-C</li>
<li>لعب جماعي وحفظ التقدم</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>60,000+ classic games in one handheld</h3>
<p>Portable console with a transparent purple shell, 3.5" screen, and 64 GB storage — ready to play with no WiFi or subscription.</p>
<ul>
<li>60,000+ pre-loaded games</li>
<li>3.5" IPS HD display</li>
<li>64 GB storage + expandable slot</li>
<li>Long battery · USB-C charging</li>
<li>Multiplayer and save progress</li>
</ul>
${COD_EN}
`.trim(),
    descriptionEs: `
<h3>Más de 60.000 juegos clásicos en una sola consola</h3>
<p>Consola portátil con carcasa transparente morada, pantalla de 3.5" y 64 GB de almacenamiento — lista para jugar sin WiFi ni suscripción.</p>
<ul>
<li>Más de 60.000 juegos precargados</li>
<li>Pantalla IPS HD de 3.5"</li>
<li>Almacenamiento 64 GB + ranura expansible</li>
<li>Batería de larga duración · carga USB-C</li>
<li>Multijugador y guardado de partida</li>
</ul>
<p><em>Envío a ${marketNameEs}.</em></p>
${COD_ES}
`.trim(),
    detailsAr: [
      "سعة 64 جيجابايت",
      'شاشة IPS 3.5"',
      "أكثر من 60,000 لعبة مثبتة",
      "معالج رباعي النواة 64-bit",
      "بطارية حتى ~12 ساعة",
      "شحن USB-C",
      "حفظ التقدم ولعب جماعي",
    ],
    detailsEn: [
      "64 GB capacity",
      '3.5" IPS screen',
      "60,000+ pre-installed games",
      "64-bit quad-core processor",
      "Battery up to ~12 hours",
      "USB-C charging",
      "Save progress & multiplayer",
    ],
    detailsEs: [
      "Capacidad 64 GB",
      'Pantalla IPS 3.5"',
      "Más de 60.000 juegos precargados",
      "Procesador quad-core 64-bit",
      "Batería hasta ~12 horas",
      "Carga USB-C",
      "Guardar partida y multijugador",
    ],
    images: [...IMAGES],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 1018,
    createdAt: "2026-09-22T00:00:00.000Z",
    landing: {
      headlineAr: "كل كلاسيكياتك… في يدك",
      headlineEn: "Everything you grew up playing. In one handheld.",
      headlineEs: "Todo lo que jugabas de niño. En una sola consola.",
      introAr:
        "أكثر من 60,000 لعبة جاهزة. شغّل والجعب — بدون تنزيل أو اشتراك.",
      introEn:
        "60,000+ games ready to go. Switch on and play — no downloads or subscription.",
      introEs:
        "Más de 60.000 juegos listos. Enciende y juega — sin descargas ni suscripción.",
      sections: [
        {
          titleAr: "شاشة حادة 3.5 إنش",
          titleEn: "Sharp 3.5\" HD display",
          titleEs: "Pantalla nítida de 3.5\"",
          bodyAr:
            "شاشة IPS عالية الدقة — ألعابك القديمة تبان أوضح من أي وقت. ويمكن توصيلها بالتلفزيون عبر HDMI.",
          bodyEn:
            "IPS HD screen — your classics look sharper than ever. Or connect to a TV with HDMI.",
          bodyEs:
            "Pantalla IPS HD — tus clásicos se ven más nítidos que nunca. O conéctala a la TV con HDMI.",
          image: "/products/retrolab-console-1.jpg",
        },
        {
          titleAr: "64 جيجا وجاهز للعب",
          titleEn: "64 GB — ready to play",
          titleEs: "64 GB — lista para jugar",
          bodyAr:
            "سعة 64 جيجابايت مع فتحة توسعة. الألعاب مثبتة مسبقًا — بدون واي فاي.",
          bodyEn:
            "64 GB storage plus an expandable slot. Games are pre-loaded — no WiFi needed.",
          bodyEs:
            "64 GB de almacenamiento más ranura expansible. Juegos precargados — sin necesidad de WiFi.",
          image: "/products/retrolab-console-1.jpg",
        },
      ],
      benefitsAr: [
        "أكثر من 60,000 لعبة",
        'شاشة 3.5" IPS',
        "64 جيجابايت",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "60,000+ games",
        '3.5" IPS screen',
        "64 GB storage",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        "Más de 60.000 juegos",
        'Pantalla IPS 3.5"',
        "Almacenamiento 64 GB",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
        {
          questionAr: "كم سعة التخزين؟",
          questionEn: "What is the storage capacity?",
          questionEs: "¿Cuál es la capacidad de almacenamiento?",
          answerAr: "64 جيجابايت، مع فتحة لتوسيع السعة ببطاقة إضافية.",
          answerEn: "64 GB, plus an expandable slot for an extra card.",
          answerEs: "64 GB, más una ranura expansible para una tarjeta extra.",
        },
        {
          questionAr: "ما حجم الشاشة؟",
          questionEn: "What is the screen size?",
          questionEs: "¿Cuál es el tamaño de la pantalla?",
          answerAr: 'شاشة IPS عالية الدقة بحجم 3.5 إنش.',
          answerEn: 'A 3.5" IPS HD display.',
          answerEs: 'Pantalla IPS HD de 3.5".',
        },
        {
          questionAr: "هل تحتاج إنترنت؟",
          questionEn: "Does it need internet?",
          questionEs: "¿Necesita internet?",
          answerAr: "لا. الألعاب مثبتة مسبقًا — العب فورًا بدون واي فاي أو اشتراك.",
          answerEn: "No. Games are pre-loaded — play with no WiFi or subscription.",
          answerEs:
            "No. Los juegos vienen precargados — juega sin WiFi ni suscripción.",
        },
      ],
    },
  };
}

/** One listing per Latin American Spanish market only. */
export const LATAM_RETROLAB_PRODUCTS: Product[] = SPANISH_MARKET_CODES.map(
  (country) => {
    const local = RETRO_PRICES[country];
    if (!local) {
      throw new Error(`Missing RetroLab price for ${country}`);
    }
    return {
      ...buildRetroLab(country),
      id: `prod-retrolab-${country.toLowerCase()}`,
      slug: RETROLAB_SLUG,
      categoryId: `cat-${country}`,
      availableIn: [country],
      priceUSD: RETRO_USD,
      compareAtUSD: RETRO_COMPARE_USD,
      marketPrices: { ...RETRO_MARKET_PRICES },
      marketComparePrices: { ...RETRO_MARKET_COMPARE },
    };
  }
);
