import { currencyForCountry, getCountry, SPANISH_MARKET_CODES } from "./countries";
import { DEFAULT_CURRENCY_RATES } from "./currency";
import { RETROLAB_SLUG } from "./product-slugs";
import type { CountryCode, Product } from "./types";

export { RETROLAB_SLUG } from "./product-slugs";

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

/** Hand-set local prices from before the 99 USD conversion; saved catalogs still carry them */
export const RETROLAB_SUPERSEDED_PRICES: Partial<Record<CountryCode, number[]>> = {
  AR: [149900],
  CR: [44900],
  DO: [5890],
  HN: [2499],
  MX: [1799],
};
export const RETROLAB_SUPERSEDED_COMPARE: Partial<Record<CountryCode, number[]>> = {
  AR: [299900],
  CR: [89900],
  DO: [11890],
  HN: [4999],
  MX: [3599],
};

const IMAGES = [
  "/products/retrolab-r36s-hero.webp",
  "/products/retrolab-r36s-2.webp",
  "/products/retrolab-r36s-9.webp",
  "/products/retrolab-r36s-7-es.webp",
  "/products/retrolab-r36s-8-es.webp",
  "/products/retrolab-r36s-3.webp",
  "/products/retrolab-r36s-4.webp",
  "/products/retrolab-r36s-5.webp",
  "/products/retrolab-r36s-6.webp",
];

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
      "ذاكرة: بطاقة 64 جيجا · تقبل بطاقات 64 أو 128 جيجا",
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
      "Memory: 64 GB card · accepts 64 or 128 GB cards",
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
      "Memoria: tarjeta de 64 GB · admite tarjetas de 64 o 128 GB",
      "Material: plástico ABS",
      "Origen: Guangdong, China",
      "Molde privado: sí",
    ],
    images: [...IMAGES],
    customColorEnabled: true,
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
      video: {
        src: "/videos/r36s-console-sound.mp4",
        poster: "/videos/r36s-console-poster.webp",
      },
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
          image: "/products/retrolab-r36s-7-es.webp",
        },
        {
          titleAr: "عصا تحكم ثلاثية الأبعاد مزدوجة",
          titleEn: "Dual 3D joysticks",
          titleEs: "Doble joystick 3D",
          bodyAr:
            "صليب الاتجاهات مع عصاتي تحكم — اختر التحكم الأنسب لكل لعبة.",
          bodyEn:
            "A D-pad plus two analog sticks — pick the best controls for each game.",
          bodyEs:
            "Cruceta direccional y dos palancas analógicas — elige los mejores controles para cada juego.",
          image: "/products/retrolab-r36s-8-es.webp",
        },
        {
          titleAr: "RK3326 وبطاقة 64 جيجا",
          titleEn: "RK3326 and 64 GB card",
          titleEs: "RK3326 y tarjeta de 64 GB",
          bodyAr:
            "معالج Rockchip RK3326 (Cortex-A35)، نظام Linux، بطارية 3000 مللي أمبير، وواي فاي. تأتي ببطاقة 64 جيجا، وتقبل بطاقات ذاكرة 64 أو 128 جيجا.",
          bodyEn:
            "Rockchip RK3326 (Cortex-A35), Linux OS, 3000 mAh battery, and Wi-Fi. Comes with a 64 GB card and accepts 64 or 128 GB memory cards.",
          bodyEs:
            "Rockchip RK3326 (Cortex-A35), Linux, batería 3000 mAh y Wi-Fi. Incluye tarjeta de 64 GB y admite tarjetas de memoria de 64 o 128 GB.",
          image: "/products/retrolab-r36s-2.webp",
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
          answerAr: "تأتي ببطاقة ذاكرة 64 جيجا، وتقبل بطاقات 64 أو 128 جيجا.",
          answerEn: "It comes with a 64 GB memory card and accepts 64 or 128 GB cards.",
          answerEs: "Incluye una tarjeta de memoria de 64 GB y admite tarjetas de 64 o 128 GB.",
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
        {
          questionAr: "هل يمكنني اختيار اللون؟",
          questionEn: "Can I choose the color?",
          questionEs: "¿Puedo elegir el color?",
          answerAr: "نعم — اكتب اللون الذي تريده في نموذج الطلب.",
          answerEn: "Yes — type the color you want in the order form.",
          answerEs: "Sí — escribe el color que quieres en el formulario de pedido.",
        },
      ],
      reviews: [
        {
          name: "I***a",
          stars: 5,
          textEn:
            "This game system is great. Has tons of games already added. The battery lasts pretty long also. Great for someone that likes to game on the go. Perfect gift.",
          textEs:
            "Esta consola es genial. Trae muchísimos juegos ya instalados y la batería dura bastante. Ideal para quien le gusta jugar en cualquier lugar. Regalo perfecto.",
        },
        {
          name: "M***e",
          stars: 5,
          textEn: "Awesome device — have a ton of fun playing on it!",
          textEs: "Excelente consola — ¡me divierto muchísimo jugando con ella!",
        },
        {
          name: "S***l",
          stars: 5,
          textEn:
            "I bought this game as a birthday gift for my son. I just turned it on and was impressed by the color quality. I like that it's practical to take anywhere… I know he's going to love it; I recommend it.",
          textEs:
            "La compré como regalo de cumpleaños para mi hijo. La encendí y me impresionó la calidad del color. Me gusta que es práctica para llevar a todas partes… Sé que le va a encantar; la recomiendo.",
        },
        {
          name: "L***a",
          stars: 5,
          textEn: "It's for my son's birthday. He loves it a lot.",
          textEs: "Es para el cumpleaños de mi hijo. Le encanta.",
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
      discountBadgePercent: 30,
    };
  }
);
