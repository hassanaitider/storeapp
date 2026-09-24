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
    nameAr: "وحدة ألعاب محمولة FORYOBUD R36S 64 جيجا",
    nameEn: "FORYOBUD R36S Portable Console 64 GB",
    nameEs: "Consola portátil FORYOBUD R36S 64 GB",
    descriptionAr: `
<h3>وحدة ألعاب محمولة FORYOBUD R36S</h3>
<p>كونسول ريترو محمول — موديل R36S، شاشة ملونة 3.5 إنش بدقة 640×480، وبطاقة ذاكرة 64 جيجابايت مع نحو 20,000 لعبة مدمجة.</p>
<ul>
<li>العلامة: FORYOBUD · الموديل: R36S</li>
<li>معالج Rockchip RK3326 / ARM Cortex-A35 (64 بت)</li>
<li>شاشة ملونة 3.5" · 640×480 · بدون لمس</li>
<li>بطارية 3000 مللي أمبير · نظام Linux</li>
<li>~20,000 لعبة مدمجة · واي فاي · هيكل ABS</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>FORYOBUD R36S portable video game console</h3>
<p>Handheld retro console — model R36S, 3.5" color screen at 640×480, and a 64 GB memory card with about 20,000 built-in games.</p>
<ul>
<li>Brand: FORYOBUD · Model: R36S</li>
<li>Rockchip RK3326 / ARM Cortex-A35 64-bit processor</li>
<li>3.5" color display · 640×480 · not touchscreen</li>
<li>3000 mAh battery · Linux OS</li>
<li>~20,000 built-in games · Wi-Fi · ABS plastic</li>
</ul>
${COD_EN}
`.trim(),
    descriptionEs: `
<h3>Consola de juego portátil FORYOBUD R36S</h3>
<p>Consola retro de mano — modelo R36S, pantalla a color de 3.5" a 640×480 y tarjeta de memoria de 64 GB con unos 20.000 juegos integrados.</p>
<ul>
<li>Marca: FORYOBUD · Modelo: R36S</li>
<li>Procesador Rockchip RK3326 / ARM Cortex-A35 64 bits</li>
<li>Pantalla a color 3.5" · 640×480 · sin táctil</li>
<li>Batería 3000 mAh · sistema Linux</li>
<li>~20.000 juegos integrados · Wi-Fi · plástico ABS</li>
</ul>
<p><em>Envío a ${marketNameEs}.</em></p>
${COD_ES}
`.trim(),
    detailsAr: [
      "FORYOBUD · R36S",
      "معالج Rockchip RK3326 / Cortex-A35 64 بت",
      'شاشة ملونة 3.5" · 640×480 · غير لمسية',
      "بطارية 3000 مللي أمبير",
      "نظام Linux",
      "واي فاي",
      "~20,000 لعبة مدمجة",
      "ذاكرة: بطاقة 64 جيجا (خيار 128 جيجا)",
      "مادة: بلاستيك ABS",
      "منشأ: Guangdong, China",
    ],
    detailsEn: [
      "FORYOBUD · R36S",
      "Rockchip RK3326 / Cortex-A35 64-bit",
      '3.5" color display · 640×480 · not touch',
      "3000 mAh battery",
      "Linux OS",
      "Wi-Fi",
      "~20,000 built-in games",
      "Memory: 64 GB card (128 GB option)",
      "ABS plastic",
      "Origin: Guangdong, China",
    ],
    detailsEs: [
      "FORYOBUD · R36S",
      "Procesador Rockchip RK3326 / Cortex-A35 64 bits",
      'Pantalla a color 3.5" · 640×480 · no táctil',
      "Batería 3000 mAh",
      "Sistema operativo Linux",
      "Wi-Fi",
      "~20.000 juegos integrados",
      "Memoria: tarjeta 64 GB (opción 128 GB)",
      "Material: plástico ABS",
      "Origen: Guangdong, China",
      "Molde privado: sí",
    ],
    images: [...IMAGES],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 312,
    createdAt: "2026-09-22T00:00:00.000Z",
    landing: {
      headlineAr: "FORYOBUD R36S — كلاسيكيات في يدك",
      headlineEn: "FORYOBUD R36S — classics in your hand",
      headlineEs: "FORYOBUD R36S — clásicos en tu mano",
      introAr:
        "نحو 20,000 لعبة، شاشة ملونة 640×480، وبطاقة 64 جيجا — شغّل والعب.",
      introEn:
        "About 20,000 games, a 640×480 color screen, and a 64 GB card — switch on and play.",
      introEs:
        "Unos 20.000 juegos, pantalla a color 640×480 y tarjeta de 64 GB — enciende y juega.",
      sections: [
        {
          titleAr: "شاشة ملونة 3.5 إنش · 640×480",
          titleEn: "3.5\" color screen · 640×480",
          titleEs: "Pantalla a color 3.5\" · 640×480",
          bodyAr:
            "عرض ملون واضح بدقة 640×480. الشاشة غير لمسية — التحكم بالأزرار والعصي.",
          bodyEn:
            "Clear color display at 640×480. Not a touchscreen — play with buttons and sticks.",
          bodyEs:
            "Pantalla a color nítida a 640×480. No es táctil — juegas con botones y sticks.",
          image: "/products/retrolab-console-1.jpg",
        },
        {
          titleAr: "RK3326 وبطاقة 64 جيجا",
          titleEn: "RK3326 and 64 GB card",
          titleEs: "RK3326 y tarjeta de 64 GB",
          bodyAr:
            "معالج Rockchip RK3326 (Cortex-A35)، نظام Linux، بطارية 3000 مللي أمبير، وواي فاي. الذاكرة عبر بطاقة 64 جيجا (متوفر أيضًا 128 جيجا).",
          bodyEn:
            "Rockchip RK3326 (Cortex-A35), Linux OS, 3000 mAh battery, and Wi-Fi. Storage on a 64 GB card (128 GB also available).",
          bodyEs:
            "Rockchip RK3326 (Cortex-A35), Linux, batería 3000 mAh y Wi-Fi. Memoria en tarjeta de 64 GB (también hay opción 128 GB).",
          image: "/products/retrolab-console-1.jpg",
        },
      ],
      benefitsAr: [
        "~20,000 لعبة مدمجة",
        "RK3326 · Linux · واي فاي",
        "64 جيجا · بطارية 3000 مللي أمبير",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "~20,000 built-in games",
        "RK3326 · Linux · Wi-Fi",
        "64 GB · 3000 mAh battery",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        "~20.000 juegos integrados",
        "RK3326 · Linux · Wi-Fi",
        "64 GB · batería 3000 mAh",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
        {
          questionAr: "ما الموديل والعلامة؟",
          questionEn: "What brand and model is it?",
          questionEs: "¿Qué marca y modelo es?",
          answerAr: "FORYOBUD، الموديل R36S — وحدة ألعاب فيديو محمولة.",
          answerEn: "FORYOBUD, model R36S — a portable video game console.",
          answerEs:
            "FORYOBUD, modelo R36S — consola de juego de video portátil.",
        },
        {
          questionAr: "كم سعة الذاكرة؟",
          questionEn: "What is the memory capacity?",
          questionEs: "¿Cuál es la capacidad de memoria?",
          answerAr: "بطاقة ذاكرة 64 جيجابايت (يتوفر أيضًا خيار 128 جيجا).",
          answerEn: "64 GB memory card (128 GB option also available).",
          answerEs: "Tarjeta de memoria de 64 GB (también hay opción de 128 GB).",
        },
        {
          questionAr: "هل الشاشة لمسية؟",
          questionEn: "Is the screen touch?",
          questionEs: "¿La pantalla es táctil?",
          answerAr: "لا. شاشة ملونة فقط — التحكم بالأزرار.",
          answerEn: "No. Color display only — control with buttons.",
          answerEs: "No. Solo pantalla a color — control con botones.",
        },
        {
          questionAr: "كم عدد الألعاب؟",
          questionEn: "How many games are included?",
          questionEs: "¿Cuántos juegos incluye?",
          answerAr: "نحو 20,000 لعبة مدمجة.",
          answerEn: "About 20,000 built-in games.",
          answerEs: "Unos 20.000 juegos integrados.",
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
      marketPrices: { [country]: local.price },
      marketComparePrices: { [country]: local.compare },
    };
  }
);
