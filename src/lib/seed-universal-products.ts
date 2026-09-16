import {
  currencyForCountry,
  getCountry,
  isSpanishMarket,
  STORE_MARKETS,
} from "./countries";
import { convertFromUSD, retailRound } from "./currency";
import type { CountryCode, Locale, Product } from "./types";

/** MENA-only — do not ship these universal tools into Latin American markets. */
const UNIVERSAL_MENA_MARKETS = STORE_MARKETS.filter(
  (market) => !isSpanishMarket(market.code)
);

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";
const COD_ES =
  "<p><strong>Pide ahora</strong> — envío gratis · pago contra entrega · devoluciones en 30 días.</p>";

function marketIntro(country: CountryCode, locale: Locale) {
  const c = getCountry(country);
  if (locale === "ar") {
    return `توصيل مجاني والدفع عند الاستلام في ${c.nameAr}.`;
  }
  if (locale === "es") {
    return `Envío gratis y pago contra entrega en ${c.nameEs ?? c.nameEn}.`;
  }
  return `Free delivery and cash on delivery in ${c.nameEn}.`;
}

type MarketPrice = {
  price: number;
  compare?: number;
  priceUSD: number;
  compareAtUSD?: number;
};

type MarketPrices = Partial<Record<CountryCode, MarketPrice>>;

function convertedFallback(
  country: CountryCode,
  prices: MarketPrices
): MarketPrice {
  const reference = prices.SA ?? {
    price: 99,
    compare: 149,
    priceUSD: 29,
    compareAtUSD: 42,
  };
  const currency = currencyForCountry(country);
  return {
    price: retailRound(convertFromUSD(reference.priceUSD, currency), currency),
    compare: reference.compareAtUSD
      ? retailRound(
          convertFromUSD(reference.compareAtUSD, currency),
          currency
        )
      : undefined,
    priceUSD: reference.priceUSD,
    compareAtUSD: reference.compareAtUSD,
  };
}

function forMarkets(
  idPrefix: string,
  slug: string,
  prices: MarketPrices,
  build: (country: CountryCode) => Omit<
    Product,
    "id" | "slug" | "categoryId" | "availableIn" | "marketPrices" | "marketComparePrices" | "priceUSD" | "compareAtUSD"
  >
): Product[] {
  return UNIVERSAL_MENA_MARKETS.map((market) => {
    const country = market.code;
    // Markets without a hand-set price convert from USD; reusing the Saudi
    // amount would price, say, Mexico in riyal numbers.
    const local = prices[country] ?? convertedFallback(country, prices);
    const base = build(country);
    return {
      ...base,
      id: `${idPrefix}-${country.toLowerCase()}`,
      slug,
      categoryId: `cat-${country}`,
      availableIn: [country],
      priceUSD: local.priceUSD,
      compareAtUSD: local.compareAtUSD,
      marketPrices: { [country]: local.price },
      marketComparePrices: local.compare
        ? { [country]: local.compare }
        : undefined,
    };
  });
}

const WINDSHIELD_PRICES: MarketPrices = {
  MA: { price: 149, compare: 229, priceUSD: 15, compareAtUSD: 23 },
  SA: { price: 79, compare: 119, priceUSD: 21, compareAtUSD: 32 },
  AE: { price: 69, compare: 99, priceUSD: 19, compareAtUSD: 27 },
  OM: { price: 7.9, compare: 12.9, priceUSD: 21, compareAtUSD: 32 },
  IQ: { price: 20000, compare: 30000, priceUSD: 15, compareAtUSD: 23 },
  LY: { price: 85, compare: 129, priceUSD: 15, compareAtUSD: 23 },
};

const NECK_FAN_PRICES: MarketPrices = {
  MA: { price: 199, compare: 299, priceUSD: 20, compareAtUSD: 30 },
  SA: { price: 89, compare: 129, priceUSD: 24, compareAtUSD: 35 },
  AE: { price: 85, compare: 119, priceUSD: 23, compareAtUSD: 32 },
  OM: { price: 8.9, compare: 13.9, priceUSD: 24, compareAtUSD: 37 },
  IQ: { price: 26000, compare: 39000, priceUSD: 20, compareAtUSD: 30 },
  LY: { price: 110, compare: 165, priceUSD: 20, compareAtUSD: 30 },
};

export const UNIVERSAL_MARKET_PRODUCTS: Product[] = [
  ...forMarkets(
    "prod-car-windshield-umbrella",
    "car-windshield-sunshade-umbrella",
    WINDSHIELD_PRICES,
    (country) => ({
      nameAr: "مظلة شمس للزجاج الأمامي",
      nameEn: "Car Front Windshield Sun Umbrella",
      nameEs: "Parasol Paraguas para Parabrisas",
      descriptionAr: `
<h3>مظلة شمس للزجاج الأمامي</h3>
<p>مظلة قابلة للطي تحمي زجاج السيارة الأمامي من الشمس والحرارة. حجم مناسب مع جراب حمل — تفتح مثل المظلة وتغطي الزجاج بالكامل.</p>
<ul>
<li>تحجب أشعة الشمس وتقلل حرارة المقصورة</li>
<li>قابلة للطي وحملها سهل</li>
<li>تركيب سريع على الزجاج الأمامي</li>
<li>تحمي الطبلون من التلف الحراري</li>
</ul>
${COD_AR}`.trim(),
      descriptionEn: `
<h3>Car front windshield sun umbrella</h3>
<p>A foldable umbrella-style shade that protects the front windshield from sun and heat. Compact with a carry sleeve — opens like an umbrella to cover the glass.</p>
<ul>
<li>Blocks sunlight and reduces cabin heat</li>
<li>Folds easily for storage</li>
<li>Quick install on the front windshield</li>
<li>Helps protect the dashboard from heat</li>
</ul>
${COD_EN}`.trim(),
      descriptionEs: `
<h3>Parasol tipo paraguas para el parabrisas</h3>
<p>Un parasol plegable que protege el parabrisas del sol y del calor. Compacto y con funda — se abre como un paraguas y cubre todo el cristal.</p>
<ul>
<li>Bloquea el sol y baja la temperatura del interior</li>
<li>Se plega fácil para guardarlo</li>
<li>Instalación rápida en el parabrisas</li>
<li>Ayuda a proteger el tablero del calor</li>
</ul>
${COD_ES}`.trim(),
      detailsAr: [
        "مظلة لزجاج السيارة الأمامي",
        "قابلة للطي مع جراب",
        "عزل حراري من الشمس",
        "تركيب سريع",
        "مناسبة لمعظم السيارات",
      ],
      detailsEn: [
        "Front windshield sun umbrella",
        "Foldable with sleeve",
        "Thermal sun protection",
        "Quick install",
        "Fits most cars",
      ],
      detailsEs: [
        "Parasol para el parabrisas delantero",
        "Plegable y con funda",
        "Protección térmica contra el sol",
        "Instalación rápida",
        "Compatible con la mayoría de autos",
      ],
      images: [
        "/products/car-windshield-umbrella-demo.gif",
        "/products/car-windshield-umbrella-g1.png",
        "/products/car-windshield-umbrella-g2.png",
        "/products/car-windshield-umbrella-g3.png",
      ],
      colors: [],
      customColorEnabled: false,
      inStock: true,
      featured: true,
      rating: 4.7,
      reviewCount: 312,
      createdAt: "2026-08-22T00:09:00.000Z",
      landing: {
        headlineAr: "مظلة شمس للزجاج الأمامي",
        headlineEn: "Car front windshield sun umbrella",
        headlineEs: "Parasol tipo paraguas para el parabrisas",
        introAr: `حجمها مناسب ومعك في أي مكان. افتحها على الزجاج الأمامي لتحافظ على برودة السيارة — ${marketIntro(country, "ar")}`,
        introEn: `Portable size for everyday use. Open it on the front glass to keep the cabin cooler — ${marketIntro(country, "en")}`,
        introEs: `Tamaño portátil para el día a día. Ábrelo sobre el parabrisas y mantén el interior más fresco — ${marketIntro(country, "es")}`,
        sections: [
          {
            titleAr: "حماية من الشمس والحرارة",
            titleEn: "Sun and heat protection",
            titleEs: "Protección contra el sol y el calor",
            bodyAr: "تعكس أشعة الشمس عن الزجاج الأمامي وتساعد على خفض حرارة المقصورة.",
            bodyEn: "Reflects sunlight off the windshield and helps lower cabin heat.",
            bodyEs: "Refleja los rayos del sol en el parabrisas y ayuda a bajar el calor del interior.",
            image: "/products/car-windshield-umbrella.png",
          },
          {
            titleAr: "طي سهل وحمل خفيف",
            titleEn: "Easy fold & light carry",
            titleEs: "Fácil de plegar y llevar",
            bodyAr: "تُطوى داخل جراب أنيق وتبقى جاهزة في السيارة.",
            bodyEn: "Folds into a sleeve and stays ready in your car.",
            bodyEs: "Se plega dentro de su funda y queda siempre lista en tu auto.",
          },
        ],
        benefitsAr: [
          "تقليل حرارة السيارة",
          "قابلة للطي",
          "تركيب سريع",
          marketIntro(country, "ar"),
        ],
        benefitsEn: [
          "Reduces car heat",
          "Foldable design",
          "Quick install",
          marketIntro(country, "en"),
        ],
        benefitsEs: [
          "Baja el calor dentro del auto",
          "Diseño plegable",
          "Instalación rápida",
          marketIntro(country, "es"),
        ],
        faq: [
          {
            questionAr: "هل تناسب كل السيارات؟",
            questionEn: "Does it fit all cars?",
            questionEs: "¿Sirve para todos los autos?",
            answerAr: "مناسبة لمعظم السيارات الصغيرة والمتوسطة.",
            answerEn: "Fits most small and mid-size cars.",
            answerEs: "Sirve para la mayoría de autos chicos y medianos.",
          },
        ],
      },
    })
  ),
  ...forMarkets(
    "prod-neck-fan",
    "rechargeable-neck-fan",
    NECK_FAN_PRICES,
    (country) => ({
      nameAr: "مروحة رقبة قابلة للشحن",
      nameEn: "Rechargeable Neck Fan",
      nameEs: "Ventilador de Cuello Recargable",
      descriptionAr: `
<h3>مروحة رقبة قابلة للشحن</h3>
<p>مروحة رقبة محمولة بدون ريش، 3 سرعات، USB للشحن — مثالية للحر والسفر والعمل في الهواء الطلق.</p>
<ul>
<li>تصميم يُلبس حول الرقبة</li>
<li>3 مستويات سرعة</li>
<li>شحن USB قابل لإعادة الاستخدام</li>
<li>خفيفة وآمنة بدون ريش</li>
<li>هواء منعش في كل اتجاه</li>
</ul>
${COD_AR}`.trim(),
      descriptionEn: `
<h3>Rechargeable neck fan</h3>
<p>A portable bladeless neck fan with 3 speeds and USB charging — ideal for heat, travel, and outdoor work.</p>
<ul>
<li>Wearable around-the-neck design</li>
<li>3 speed levels</li>
<li>Rechargeable via USB</li>
<li>Lightweight bladeless safety</li>
<li>Refreshing airflow all around</li>
</ul>
${COD_EN}`.trim(),
      descriptionEs: `
<h3>Ventilador de cuello recargable</h3>
<p>Ventilador de cuello portátil sin aspas, con 3 velocidades y carga USB — ideal para el calor, viajes y trabajo al aire libre.</p>
<ul>
<li>Diseño que se lleva alrededor del cuello</li>
<li>3 niveles de velocidad</li>
<li>Recargable por USB</li>
<li>Ligero y seguro, sin aspas</li>
<li>Aire fresco en todas direcciones</li>
</ul>
${COD_ES}`.trim(),
      detailsAr: [
        "مروحة رقبة محمولة",
        "3 سرعات",
        "شحن USB",
        "بدون ريش",
        "خفيفة للاستخدام اليومي",
      ],
      detailsEn: [
        "Portable neck fan",
        "3 speeds",
        "USB charging",
        "Bladeless design",
        "Light for daily use",
      ],
      detailsEs: [
        "Ventilador de cuello portátil",
        "3 velocidades",
        "Carga por USB",
        "Diseño sin aspas",
        "Ligero para uso diario",
      ],
      images: [
        "/products/fashion-sling-demo.gif",
        "/products/fashion-sling-g1.png",
        "/products/fashion-sling-g2.png",
        "/products/fashion-sling-g3.png",
      ],
      colors: [],
      customColorEnabled: false,
      inStock: true,
      featured: true,
      rating: 4.6,
      reviewCount: 167,
      createdAt: "2026-08-23T00:00:00.000Z",
      landing: {
        headlineAr: "مروحة رقبة قابلة للشحن",
        headlineEn: "Rechargeable neck fan",
        headlineEs: "Ventilador de cuello recargable",
        introAr: `برودة فورية حول رقبتك بدون إزعاج. ${marketIntro(country, "ar")}`,
        introEn: `Instant cooling around your neck without hassle. ${marketIntro(country, "en")}`,
        introEs: `Frescura al instante alrededor de tu cuello, sin complicaciones. ${marketIntro(country, "es")}`,
        sections: [
          {
            titleAr: "3 سرعات حسب حاجتك",
            titleEn: "3 speeds for every moment",
            titleEs: "3 velocidades para cada momento",
            bodyAr: "اختر السرعة المناسبة للمشي، العمل، أو السفر — هواء منعش بضغطة زر.",
            bodyEn: "Pick the right speed for walking, work, or travel — fresh air at a button press.",
            bodyEs: "Elige la velocidad ideal para caminar, trabajar o viajar — aire fresco con un botón.",
            image: "/products/fashion-sling-g1.png",
          },
          {
            titleAr: "شحن USB واستخدام طويل",
            titleEn: "USB charging & long use",
            titleEs: "Carga USB y larga duración",
            bodyAr: "اشحنها بسهولة من أي USB واستخدمها طوال اليوم في الحر.",
            bodyEn: "Charge easily from any USB port and use it through hot days.",
            bodyEs: "Cárgalo desde cualquier puerto USB y úsalo todo el día cuando hace calor.",
          },
        ],
        benefitsAr: [
          "3 سرعات",
          "شحن USB",
          "خفيفة على الرقبة",
          marketIntro(country, "ar"),
        ],
        benefitsEn: [
          "3 speed levels",
          "USB charging",
          "Light on the neck",
          marketIntro(country, "en"),
        ],
        benefitsEs: [
          "3 niveles de velocidad",
          "Carga por USB",
          "Ligero en el cuello",
          marketIntro(country, "es"),
        ],
        faq: [],
      },
    })
  ),
];
