import { currencyForCountry, getCountry, SPANISH_MARKET_CODES } from "./countries";
import { DEFAULT_CURRENCY_RATES, getCurrency } from "./currency";
import { SMART_TAG_SLUG } from "./product-slugs";
import type { CountryCode, Product } from "./types";

export { SMART_TAG_SLUG } from "./product-slugs";

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

/** Price is for the pack of 2 trackers */
const TAG_USD = 49;
const TAG_COMPARE_USD = 79;

function usdToLatamLocal(country: CountryCode, usd: number): number {
  const code = currencyForCountry(country);
  if (code === "USD") return usd;
  const raw = usd * DEFAULT_CURRENCY_RATES[code];
  if (raw >= 1000) return Math.round(raw / 10) * 10;
  if (raw >= 100) return Math.round(raw / 10) * 10 - 1;
  return Math.round(raw);
}

const TAG_PRICES: Record<CountryCode, LocalPrice> = Object.fromEntries(
  SPANISH_MARKET_CODES.map((country) => [
    country,
    {
      price: usdToLatamLocal(country, TAG_USD),
      compare: usdToLatamLocal(country, TAG_COMPARE_USD),
      priceUSD: TAG_USD,
      compareAtUSD: TAG_COMPARE_USD,
    },
  ])
) as Record<CountryCode, LocalPrice>;

// Same local price points as the other LATAM listings, scaled to $49 / $79
TAG_PRICES.AR = { price: 74900, compare: 119900, priceUSD: TAG_USD, compareAtUSD: TAG_COMPARE_USD };
TAG_PRICES.CR = { price: 22290, compare: 35990, priceUSD: TAG_USD, compareAtUSD: TAG_COMPARE_USD };
TAG_PRICES.DO = { price: 2890, compare: 4640, priceUSD: TAG_USD, compareAtUSD: TAG_COMPARE_USD };
TAG_PRICES.HN = { price: 1299, compare: 2019, priceUSD: TAG_USD, compareAtUSD: TAG_COMPARE_USD };
TAG_PRICES.MX = { price: 899, compare: 1449, priceUSD: TAG_USD, compareAtUSD: TAG_COMPARE_USD };

/** Short local price for copy, e.g. `L 1,299` in Honduras or `$49` in USD markets */
export function smartTagOfferLabel(country: CountryCode, amount: number): string {
  const code = currencyForCountry(country);
  const n = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);
  return code === "USD" ? `$${n}` : `${getCurrency(code).symbol}\u00A0${n}`;
}

/** First image is the storefront cover; the others are spread through the page */
const IMAGES = [
  "/products/smart-tag-es-1.webp",
  "/products/smart-tag-es-2.webp",
  "/products/smart-tag-3.webp",
  "/products/smart-tag-es-4.webp",
];

function buildSmartTag(country: CountryCode): Omit<
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
  const offer = smartTagOfferLabel(country, TAG_PRICES[country].price);
  return {
    nameAr: `2 متتبع ذكي بـ ${offer} · يعمل مع iPhone (iOS) و Android`,
    nameEn: `2 Smart Trackers for ${offer} · Works with iPhone (iOS) & Android`,
    nameEs: `2 Rastreadores Inteligentes por ${offer} · Para iPhone (iOS) y Android`,
    descriptionAr: `
<h3>2 متتبع ذكي بـ ${offer} — iPhone و Android</h3>
<p>متتبع صغير (32 مم) يعمل مع تطبيق Apple Find My على iPhone ومع Find Hub على Android. علّقه على المفاتيح أو المحفظة أو الحقيبة، واعرف مكانه على الخريطة، شغّل صوتًا للعثور عليه، واستقبل تنبيهًا إذا نسيته.</p>
<ul>
<li>عبوة من قطعتين بـ ${offer}</li>
<li>متوافق مع iPhone (Apple Find My) و Android (Find Hub)</li>
<li>تنبيه عند النسيان + تشغيل صوت</li>
<li>تصميم صغير 32 مم</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>2 smart trackers for ${offer} — iPhone and Android</h3>
<p>A tiny 32 mm tracker that works with Apple Find My on iPhone and Find Hub on Android. Attach it to keys, a wallet or a bag, see where it is on the map, play a sound to find it, and get an alert if you leave it behind.</p>
<ul>
<li>Pack of 2 for ${offer}</li>
<li>Works with iPhone (Apple Find My) and Android (Find Hub)</li>
<li>Left-behind alert + play sound</li>
<li>Tiny 32 mm design</li>
</ul>
${COD_EN}`.trim(),
    descriptionEs: `
<h3>2 rastreadores inteligentes por ${offer} — iPhone y Android</h3>
<p>Un rastreador pequeño (32 mm) que funciona con Apple Find My (Encontrar) en iPhone y con Find Hub en Android. Ponlo en tus llaves, cartera o mochila, mira dónde está en el mapa, haz que suene para encontrarlo y recibe una alerta si lo olvidas. Envío gratis a todo ${marketNameEs}.</p>
<ul>
<li>Pack de 2 rastreadores por ${offer}</li>
<li>Compatible con iPhone (Apple Find My) y Android (Find Hub)</li>
<li>Alerta de olvido + reproducir sonido</li>
<li>Diseño mini de 32 mm</li>
</ul>
${COD_ES}`.trim(),
    detailsAr: [
      "العبوة: 2 متتبع ذكي",
      "iPhone / iPad: تطبيق Apple Find My",
      "Android: تطبيق Find Hub من Google",
      "بدون اشتراك شهري",
      "موقع على الخريطة عبر شبكة Apple و Google",
      "تشغيل صوت للعثور عليه بالقرب منك",
      "تنبيه عند نسيان الغرض",
      "القياس: 32 × 32 مم",
    ],
    detailsEn: [
      "In the box: 2 smart trackers",
      "iPhone / iPad: Apple Find My app",
      "Android: Google Find Hub app",
      "No monthly subscription",
      "Map location through the Apple and Google networks",
      "Play a sound to find it nearby",
      "Left-behind alert",
      "Size: 32 × 32 mm",
    ],
    detailsEs: [
      "Incluye: 2 rastreadores inteligentes",
      "iPhone / iPad: app Apple Find My (Encontrar)",
      "Android: app Find Hub de Google",
      "Sin suscripción mensual",
      "Ubicación en el mapa por la red de Apple y de Google",
      "Reproduce un sonido para encontrarlo cerca",
      "Alerta si lo dejas olvidado",
      "Tamaño: 32 × 32 mm",
    ],
    images: [...IMAGES],
    colors: [],
    customColorEnabled: false,
    qtyUpsellEnabled: true,
    qtyOffers: [
      {
        quantity: 1,
        discountPercent: 0,
        popular: true,
        labelEs: "1 pack · 2 rastreadores",
        labelEn: "1 pack · 2 trackers",
        labelAr: "عبوة واحدة · 2 متتبع",
        codLabelEs: "1 pack · 2 rastreadores",
      },
      {
        quantity: 2,
        discountPercent: 10,
        labelEs: "2 packs · 4 rastreadores",
        labelEn: "2 packs · 4 trackers",
        labelAr: "عبوتان · 4 متتبعات",
        codLabelEs: "2 packs · 4 rastreadores · ahorra 10%",
      },
      {
        quantity: 3,
        discountPercent: 15,
        labelEs: "3 packs · 6 rastreadores",
        labelEn: "3 packs · 6 trackers",
        labelAr: "3 عبوات · 6 متتبعات",
        codLabelEs: "3 packs · 6 rastreadores · ahorra 15%",
      },
    ],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 312,
    createdAt: "2026-09-28T13:00:00.000Z",
    landing: {
      headlineAr: `2 متتبع بـ ${offer} · iPhone و Android`,
      headlineEn: `2 trackers for ${offer} · iPhone and Android`,
      headlineEs: `2 rastreadores por ${offer} — para iPhone y Android en ${marketNameEs}`,
      introAr:
        "لا تضيّع مفاتيحك أو محفظتك أو حقيبتك مرة أخرى. يعمل مع Apple Find My على iPhone ومع Find Hub على Android — بدون اشتراك.",
      introEn:
        "Never lose your keys, wallet or bag again. Works with Apple Find My on iPhone and Find Hub on Android — no subscription.",
      introEs:
        "No vuelvas a perder tus llaves, cartera o mochila. Funciona con Apple Find My en iPhone y con Find Hub en Android — sin suscripción.",
      sections: [
        {
          titleAr: "تتبع دقيق على الخريطة",
          titleEn: "Precise tracking on the map",
          titleEs: "Ubicación precisa en el mapa",
          bodyAr:
            "يظهر المتتبع على الخريطة في هاتفك بفضل شبكة Apple و Google. قربت منه؟ اضغط «العثور بالقرب» وشغّل صوتًا حتى تجده.",
          bodyEn:
            "The tracker shows on your phone's map through the Apple and Google networks. Nearby? Tap “Find nearby” and play a sound until you find it.",
          bodyEs:
            "El rastreador aparece en el mapa de tu teléfono gracias a la red de Apple y de Google. ¿Estás cerca? Toca «Buscar cerca» y haz que suene hasta encontrarlo.",
          image: "/products/smart-tag-es-2.webp",
        },
        {
          titleAr: "صغير جدًا — 32 مم فقط",
          titleEn: "Really small — only 32 mm",
          titleEs: "Muy pequeño — solo 32 mm",
          bodyAr:
            "أصغر من عملة كبيرة وخفيف جدًا. يدخل في المحفظة، يتعلق مع المفاتيح، أو تخبيه في الحقيبة أو الشنطة.",
          bodyEn:
            "Smaller than a large coin and very light. Slip it in a wallet, hang it on your keys, or hide it in a bag or suitcase.",
          bodyEs:
            "Más pequeño que una moneda grande y muy ligero. Cabe en la cartera, va en el llavero o lo escondes en la mochila o la maleta.",
          image: "/products/smart-tag-3.webp",
        },
        {
          titleAr: "تنبيه إذا نسيته",
          titleEn: "Alert when you leave it behind",
          titleEs: "Alerta si lo dejas olvidado",
          bodyAr:
            "إذا ابتعدت ونسيت مفاتيحك أو محفظتك، يرسل لك الهاتف تنبيهًا مع آخر مكان شوهد فيه، والاتجاهات للرجوع إليه.",
          bodyEn:
            "Walk away without your keys or wallet and your phone alerts you with the last place it was seen, plus directions back to it.",
          bodyEs:
            "Si te alejas sin tus llaves o tu cartera, el teléfono te avisa con el último lugar donde se vio y te da indicaciones para volver.",
          image: "/products/smart-tag-es-4.webp",
        },
      ],
      benefitsAr: [
        `2 متتبع بـ ${offer} فقط`,
        "يعمل مع iPhone (iOS) و Android",
        "بدون اشتراك شهري",
        "تنبيه عند النسيان وتشغيل صوت",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        `2 trackers for only ${offer}`,
        "Works with iPhone (iOS) and Android",
        "No monthly subscription",
        "Left-behind alert and play sound",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        `2 rastreadores por solo ${offer}`,
        "Funciona con iPhone (iOS) y Android",
        "Sin suscripción mensual",
        "Alerta de olvido y sonido para encontrarlo",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
        {
          questionAr: "هل يعمل مع iPhone و Android؟",
          questionEn: "Does it work with iPhone and Android?",
          questionEs: "¿Funciona con iPhone y con Android?",
          answerAr:
            "نعم. على iPhone يعمل مع تطبيق Apple Find My، وعلى Android مع Find Hub. كل متتبع يرتبط بنظام واحد في نفس الوقت — ويمكن إعادة ضبطه لتغيير النظام.",
          answerEn:
            "Yes. On iPhone it works with the Apple Find My app, and on Android with Find Hub. Each tracker pairs with one system at a time — reset it to switch.",
          answerEs:
            "Sí. En iPhone funciona con la app Apple Find My (Encontrar) y en Android con Find Hub. Cada rastreador se vincula a un sistema a la vez — lo reinicias para cambiar.",
        },
        {
          questionAr: "هل أحتاج اشتراك؟",
          questionEn: "Do I need a subscription?",
          questionEs: "¿Necesito pagar una suscripción?",
          answerAr: "لا. التطبيقات مجانية وبدون أي اشتراك شهري.",
          answerEn: "No. The apps are free with no monthly subscription.",
          answerEs: "No. Las apps son gratis y no hay ninguna suscripción mensual.",
        },
        {
          questionAr: "كم قطعة في العبوة؟",
          questionEn: "How many trackers come in the pack?",
          questionEs: "¿Cuántos rastreadores trae el pack?",
          answerAr:
            `العبوة فيها 2 متتبع بـ ${offer}. إذا بغيتي 4، اختار عبوتين وتاخذ خصم 10%.`,
          answerEn:
            `The pack has 2 trackers for ${offer}. Want 4? Choose 2 packs and get 10% off.`,
          answerEs:
            `El pack trae 2 rastreadores por ${offer}. ¿Quieres 4? Elige 2 packs y ahorras 10%.`,
        },
        {
          questionAr: "على ماذا يمكن تعليقه؟",
          questionEn: "What can I attach it to?",
          questionEs: "¿Dónde lo puedo poner?",
          answerAr:
            "المفاتيح، المحفظة، الحقيبة، حقيبة السفر، الدراجة، أو أي غرض تخاف تضيّعه.",
          answerEn:
            "Keys, wallet, backpack, suitcase, bike — anything you don't want to lose.",
          answerEs:
            "Llaves, cartera, mochila, maleta, bicicleta — cualquier cosa que no quieras perder.",
        },
      ],
    },
  };
}

/** One listing per Latin American Spanish market only. */
export const LATAM_SMART_TAG_PRODUCTS: Product[] = SPANISH_MARKET_CODES.map(
  (country) => {
    const local = TAG_PRICES[country];
    if (!local) {
      throw new Error(`Missing smart tag price for ${country}`);
    }
    return {
      ...buildSmartTag(country),
      id: `prod-smart-tag-${country.toLowerCase()}`,
      slug: SMART_TAG_SLUG,
      categoryId: `cat-${country}`,
      availableIn: [country],
      priceUSD: TAG_USD,
      compareAtUSD: TAG_COMPARE_USD,
      marketPrices: { [country]: local.price },
      marketComparePrices: { [country]: local.compare },
    };
  }
);
