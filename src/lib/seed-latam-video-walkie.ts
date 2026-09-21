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

const WALKIE_USD = 59;
const WALKIE_COMPARE_USD = 99;

function usdToLatamLocal(country: CountryCode, usd: number): number {
  const code = currencyForCountry(country);
  if (code === "USD") return usd;
  const raw = usd * DEFAULT_CURRENCY_RATES[code];
  if (raw >= 10000) return Math.round(raw / 10) * 10;
  if (raw >= 1000) return Math.round(raw / 10) * 10;
  if (raw >= 100) return Math.round(raw / 10) * 10 - 1;
  return Math.round(raw);
}

const WALKIE_PRICES: Record<CountryCode, LocalPrice> = Object.fromEntries(
  SPANISH_MARKET_CODES.map((country) => [
    country,
    {
      price: usdToLatamLocal(country, WALKIE_USD),
      compare: usdToLatamLocal(country, WALKIE_COMPARE_USD),
      priceUSD: WALKIE_USD,
      compareAtUSD: WALKIE_COMPARE_USD,
    },
  ])
) as Record<CountryCode, LocalPrice>;

WALKIE_PRICES.AR = {
  price: 89900,
  compare: 149900,
  priceUSD: WALKIE_USD,
  compareAtUSD: WALKIE_COMPARE_USD,
};
WALKIE_PRICES.CR = {
  price: 26500,
  compare: 44500,
  priceUSD: WALKIE_USD,
  compareAtUSD: WALKIE_COMPARE_USD,
};
WALKIE_PRICES.DO = {
  price: 3490,
  compare: 5890,
  priceUSD: WALKIE_USD,
  compareAtUSD: WALKIE_COMPARE_USD,
};
WALKIE_PRICES.HN = {
  price: 1499,
  compare: 2499,
  priceUSD: WALKIE_USD,
  compareAtUSD: WALKIE_COMPARE_USD,
};
WALKIE_PRICES.MX = {
  price: 1099,
  compare: 1849,
  priceUSD: WALKIE_USD,
  compareAtUSD: WALKIE_COMPARE_USD,
};

const WALKIE_MARKET_PRICES: Partial<Record<CountryCode, number>> =
  Object.fromEntries(
    SPANISH_MARKET_CODES.map((country) => [country, WALKIE_PRICES[country].price])
  );

const WALKIE_MARKET_COMPARE: Partial<Record<CountryCode, number>> =
  Object.fromEntries(
    SPANISH_MARKET_CODES.map((country) => [
      country,
      WALKIE_PRICES[country].compare,
    ])
  );

const IMAGES = [
  "/products/video-walkie-1.jpg",
  "/products/video-walkie-2.jpg",
  "/products/video-walkie-3.jpg",
  "/products/video-walkie-4.jpg",
  "/products/video-walkie-5.jpg",
  "/products/video-walkie-6.jpg",
];

export const VIDEO_WALKIE_SLUG = "walkie-talkie-video";

function buildVideoWalkie(country: CountryCode): Omit<
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
    nameAr: "جهاز اتصال لاسلكي بالفيديو 1 par",
    nameEn: "Video Walkie Talkie 1 par",
    nameEs: "Walkie Talkie con Video 1 par",
    descriptionAr: `
<h3>كاميرا وشاشة في جهاز واحد</h3>
<p>جهاز اتصال لاسلكي بالفيديو عبر الواي فاي — الطفل يشوفك وأنت تشوفه، بمسافة 150 إلى 500 متر.</p>
<ul>
<li>اتصال فيديو وصوت واضح</li>
<li>واي فاي · 150–500 م · 0.5 واط</li>
<li>بطارية 500–1000 مللي أمبير</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Camera and screen in one set</h3>
<p>WiFi video walkie-talkies — you see each other while you talk, with a range of 150 to 500 m.</p>
<ul>
<li>Video call plus clear audio</li>
<li>WiFi · 150–500 m · 0.5 W</li>
<li>500–1000 mAh battery</li>
</ul>
${COD_EN}`.trim(),
    descriptionEs: `
<h3>Cámara y pantalla en un solo set</h3>
<p>Walkie-talkie de video por WiFi: se ven y se escuchan, con alcance de 150 a 500 m.</p>
<ul>
<li>Videollamada y audio claro</li>
<li>WiFi · 150–500 m · 0.5 W</li>
<li>Batería 500–1000 mAh</li>
</ul>
${COD_ES}`.trim(),
    detailsAr: [
      "جهاز اتصال لاسلكي بالفيديو",
      "نوع التردد: واي فاي",
      "مدى الاتصال: 150–500 م",
      "قدرة الإخراج: 0.5 واط",
      "سعة البطارية: 500–1000 مللي أمبير",
      "قنوات تخزين بلا حد",
    ],
    detailsEn: [
      "Video walkie-talkie",
      "Frequency type: WiFi",
      "Range: 150–500 m",
      "Output power: 0.5 W",
      "Battery: 500–1000 mAh",
      "Unlimited storage channels",
    ],
    detailsEs: [
      "Walkie-talkie de video",
      "Tipo de frecuencia: WiFi",
      "Alcance: 150–500 m",
      "Potencia de salida: 0.5 W",
      "Batería: 500–1000 mAh",
      "Canales de almacenamiento ilimitados",
    ],
    images: IMAGES,
    colors: [],
    customColorEnabled: true,
    qtyUpsellEnabled: true,
    qtyOffers: [
      { quantity: 1, discountPercent: 0, labelEs: "1 set", labelEn: "1 set", labelAr: "طقم واحد" },
      {
        quantity: 2,
        discountPercent: 10,
        popular: true,
        labelEs: "2 sets · para casa y patio",
        labelEn: "2 sets · home and yard",
        labelAr: "طقمين · للبيت والفناء",
      },
      {
        quantity: 3,
        discountPercent: 15,
        labelEs: "3 sets · pack familiar",
        labelEn: "3 sets · family pack",
        labelAr: "3 أطقم · باقة عائلية",
      },
    ],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 86,
    createdAt: "2026-09-21T16:00:00.000Z",
    landing: {
      headlineAr: "فيديو وصوت بينك وبين الطفل",
      headlineEn: "Video and voice between you and your child",
      headlineEs: `Video y voz entre tú y tu hijo, en ${marketNameEs}`,
      introAr:
        "جهازان بشاشة وكاميرا: تتكلمون وتشوفون بعض عبر الواي فاي، حتى 500 متر. مناسب للبيت، الحديقة، واللعب.",
      introEn:
        "Two units with screen and camera: talk and see each other over WiFi, up to 500 m. For home, yard, and play.",
      introEs:
        "Dos aparatos con pantalla y cámara: se hablan y se ven por WiFi, hasta 500 m. Para casa, patio y juegos.",
      sections: [
        {
          titleAr: "فيديو مباشر مع الطفل",
          titleEn: "Live video with your child",
          titleEs: "Video en vivo con tu hijo",
          bodyAr: "ما كيبقاش صوت فقط. الشاشة تبين الوجه — للبيت، للحديقة، أو وقت الأكل.",
          bodyEn: "Not voice only. The screen shows their face — at home, in the yard, or at dinner time.",
          bodyEs: "No es solo voz. La pantalla muestra la cara — en casa, en el patio o a la hora de comer.",
          image: "/products/video-walkie-3.jpg",
        },
        {
          titleAr: "واي فاي ومدى حتى 500 م",
          titleEn: "WiFi range up to 500 m",
          titleEs: "WiFi con alcance de hasta 500 m",
          bodyAr: "تردد واي فاي، قدرة 0.5 واط، ومدى 150 إلى 500 متر. قنوات بلا حد.",
          bodyEn: "WiFi frequency, 0.5 W output, and 150 to 500 m range. Unlimited channels.",
          bodyEs: "Frecuencia WiFi, 0.5 W de salida y alcance de 150 a 500 m. Canales ilimitados.",
          image: "/products/video-walkie-5.jpg",
        },
      ],
      benefitsAr: [
        "اتصال فيديو + صوت",
        "واي فاي · 150–500 م",
        "بطارية 500–1000 مللي أمبير",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Video + voice",
        "WiFi · 150–500 m",
        "500–1000 mAh battery",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        "Video + voz",
        "WiFi · 150–500 m",
        "Batería 500–1000 mAh",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
        {
          questionAr: "واش فيه فيديو ولا صوت فقط؟",
          questionEn: "Is it video or voice only?",
          questionEs: "¿Es de video o solo de voz?",
          answerAr: "فيديو وصوت معًا. كل جهاز فيه شاشة وكاميرا.",
          answerEn: "Video and voice. Each unit has a screen and a camera.",
          answerEs: "Video y voz. Cada aparato trae pantalla y cámara.",
        },
        {
          questionAr: "كيف نختار اللون؟",
          questionEn: "How do I pick a color?",
          questionEs: "¿Cómo elijo el color?",
          answerAr: "اكتب الأزرق أو الوردي في صفحة المنتج قبل تأكيد الطلب.",
          answerEn: "Type blue or pink on the product page before you confirm.",
          answerEs: "Escribe azul o rosa en la página del producto antes de confirmar.",
        },
      ],
    },
  };
}

/** One listing per Latin American Spanish market only. */
export const LATAM_VIDEO_WALKIE_PRODUCTS: Product[] = SPANISH_MARKET_CODES.map(
  (country) => {
    const local = WALKIE_PRICES[country];
    if (!local) {
      throw new Error(`Missing video walkie price for ${country}`);
    }
    return {
      ...buildVideoWalkie(country),
      id: `prod-video-walkie-${country.toLowerCase()}`,
      slug: VIDEO_WALKIE_SLUG,
      categoryId: `cat-${country}`,
      availableIn: [country],
      priceUSD: WALKIE_USD,
      compareAtUSD: WALKIE_COMPARE_USD,
      marketPrices: { ...WALKIE_MARKET_PRICES },
      marketComparePrices: { ...WALKIE_MARKET_COMPARE },
    };
  }
);
