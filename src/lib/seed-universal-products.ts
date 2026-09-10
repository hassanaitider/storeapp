import { getCountry, STORE_MARKETS } from "./countries";
import type { CountryCode, Product } from "./types";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

function marketIntro(country: CountryCode, locale: "ar" | "en") {
  const c = getCountry(country);
  return locale === "ar"
    ? `توصيل مجاني والدفع عند الاستلام في ${c.nameAr}.`
    : `Free delivery and cash on delivery in ${c.nameEn}.`;
}

type MarketPrices = Partial<
  Record<
    CountryCode,
    { price: number; compare?: number; priceUSD: number; compareAtUSD?: number }
  >
>;

function forMarkets(
  idPrefix: string,
  slug: string,
  prices: MarketPrices,
  build: (country: CountryCode) => Omit<
    Product,
    "id" | "slug" | "categoryId" | "availableIn" | "marketPrices" | "marketComparePrices" | "priceUSD" | "compareAtUSD"
  >
): Product[] {
  return STORE_MARKETS.map((market) => {
    const country = market.code;
    const local = prices[country] ?? prices.SA ?? {
      price: 99,
      compare: 149,
      priceUSD: 29,
      compareAtUSD: 42,
    };
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
        introAr: `حجمها مناسب ومعك في أي مكان. افتحها على الزجاج الأمامي لتحافظ على برودة السيارة — ${marketIntro(country, "ar")}`,
        introEn: `Portable size for everyday use. Open it on the front glass to keep the cabin cooler — ${marketIntro(country, "en")}`,
        sections: [
          {
            titleAr: "حماية من الشمس والحرارة",
            titleEn: "Sun and heat protection",
            bodyAr: "تعكس أشعة الشمس عن الزجاج الأمامي وتساعد على خفض حرارة المقصورة.",
            bodyEn: "Reflects sunlight off the windshield and helps lower cabin heat.",
            image: "/products/car-windshield-umbrella.png",
          },
          {
            titleAr: "طي سهل وحمل خفيف",
            titleEn: "Easy fold & light carry",
            bodyAr: "تُطوى داخل جراب أنيق وتبقى جاهزة في السيارة.",
            bodyEn: "Folds into a sleeve and stays ready in your car.",
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
        faq: [
          {
            questionAr: "هل تناسب كل السيارات؟",
            questionEn: "Does it fit all cars?",
            answerAr: "مناسبة لمعظم السيارات الصغيرة والمتوسطة.",
            answerEn: "Fits most small and mid-size cars.",
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
        introAr: `برودة فورية حول رقبتك بدون إزعاج. ${marketIntro(country, "ar")}`,
        introEn: `Instant cooling around your neck without hassle. ${marketIntro(country, "en")}`,
        sections: [
          {
            titleAr: "3 سرعات حسب حاجتك",
            titleEn: "3 speeds for every moment",
            bodyAr: "اختر السرعة المناسبة للمشي، العمل، أو السفر — هواء منعش بضغطة زر.",
            bodyEn: "Pick the right speed for walking, work, or travel — fresh air at a button press.",
            image: "/products/fashion-sling-g1.png",
          },
          {
            titleAr: "شحن USB واستخدام طويل",
            titleEn: "USB charging & long use",
            bodyAr: "اشحنها بسهولة من أي USB واستخدمها طوال اليوم في الحر.",
            bodyEn: "Charge easily from any USB port and use it through hot days.",
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
        faq: [],
      },
    })
  ),
];
