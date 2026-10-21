import type { Product } from "./types";

export const INSULIN_COOLER_SLUG = "sac-isotherme-insuline";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/insulin-cooler-1.webp",
  "/products/insulin-cooler-2.webp",
  "/products/insulin-cooler-3.webp",
  "/products/insulin-cooler-5.webp",
  "/products/insulin-cooler-4.webp",
  "/products/insulin-cooler-6.webp",
  "/products/insulin-cooler-7.webp",
  "/products/insulin-cooler-8.webp",
];

/** Morocco only — portable insulin / meds cooling travel bag with temp display */
export const INSULIN_COOLER_PRODUCTS: Product[] = [
  {
    id: "prod-insulin-cooler-ma",
    slug: INSULIN_COOLER_SLUG,
    categoryId: "cat-MA",
    availableIn: ["MA"],
    priceUSD: 22.9,
    compareAtUSD: 22.9,
    marketPrices: { MA: 229 },
    marketComparePrices: { MA: 229 },
    nameAr: "حقيبة سفر مبردة للأنسولين — شاشة حرارة",
    nameEn: "Insulin Cooling Travel Bag — Temperature Display",
    descriptionAr: `
<h3>حقيبة مبردة محمولة… مع شاشة كتورّيك الحرارة</h3>
<p>حقيبة EVA صلبة مع سحاب، حزام للكتف، وشاشة رقمية للحرارة. داخلها جيوب منظمة وأكياس تبريد — مناسبة لحمل الأدوية الحساسة للحرارة فالدار، فالمكتب، ولا فالسفر.</p>
<ul>
<li>شاشة حرارة رقمية على الغطاء</li>
<li>قشرة EVA صلبة تحمي المحتوى</li>
<li>أكياس تبريد مرفقة + تنظيم داخلي</li>
<li>حزام كتف للسفر</li>
<li>خفيفة وسهلة الحمل</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>A portable cooling bag — with a live temperature screen</h3>
<p>A hard EVA shell with zipper, shoulder strap, and a digital temperature display. Inside: organized pockets and gel packs — handy for carrying temperature-sensitive medication at home, at work, or when you travel.</p>
<ul>
<li>Digital temperature display on the lid</li>
<li>Hard EVA shell for protection</li>
<li>Gel packs included + organized interior</li>
<li>Shoulder strap for travel</li>
<li>Light and easy to carry</li>
</ul>
${COD_EN}`.trim(),
    detailsAr: [
      "حقيبة تبريد محمولة بقشرة EVA",
      "شاشة حرارة رقمية",
      "سحاب محيط + حزام كتف",
      "تنظيم داخلي (جيوب / حلقات)",
      "أكياس تبريد جل مرفقة",
      "مناسبة للأدوية الحساسة للحرارة",
    ],
    detailsEn: [
      "Portable cooling bag with EVA shell",
      "Digital temperature display",
      "Wraparound zipper + shoulder strap",
      "Organized interior (pockets / loops)",
      "Gel ice packs included",
      "For temperature-sensitive medication",
    ],
    images: [...IMAGES],
    colors: [],
    customColorEnabled: false,
    qtyUpsellLocked: true,
    qtyUpsellEnabled: false,
    qtyOffers: [{ quantity: 1, discountPercent: 0 }],
    inStock: true,
    featured: true,
    rating: 0,
    reviewCount: 0,
    createdAt: "2026-10-21T00:00:00.000Z",
    landing: {
      style: "pro",
      highlights: [
        { icon: "zap", titleAr: "شاشة حرارة", titleEn: "Temp display" },
        { icon: "shield", titleAr: "قشرة صلبة", titleEn: "Hard shell" },
        { icon: "package", titleAr: "أكياس تبريد", titleEn: "Gel packs" },
        { icon: "feather", titleAr: "خفيفة للسفر", titleEn: "Travel-ready" },
      ],
      headlineAr: "حقيبة سفر مبردة للأنسولين — شاشة كتورّيك الحرارة",
      headlineEn: "Insulin cooling travel bag — see the temperature clearly",
      introAr:
        "ملي كتسافر أو كتمشي للمكتب، هاد الحقيبة كتخليك تشوف الحرارة على الشاشة، مع تنظيم داخلي وأكياس تبريد. الثمن 229 درهم فقط — توصيل مجاني والدفع عند الاستلام فالمغرب.",
      introEn:
        "When you travel or go to the office, this bag shows the temperature on screen, with an organized interior and gel packs. Only 229 MAD — free delivery and cash on delivery in Morocco.",
      sections: [
        {
          titleAr: "شاشة حرارة قدام عينك",
          titleEn: "Temperature right on the lid",
          bodyAr:
            "الشاشة الرقمية كاتورّيك درجة الحرارة بسهولة — بلا ما تفتح الحقيبة كل مرة.",
          bodyEn:
            "The digital screen shows the temperature at a glance — no need to open the bag every time.",
          image: "/products/insulin-cooler-1.webp",
        },
        {
          titleAr: "قشرة صلبة… وحجم محمول",
          titleEn: "Hard shell — still portable",
          bodyAr:
            "EVA متينة تحمي المحتوى، وحجم صغير كيدخل فالشنطة أو كيتحمّل بالحزام.",
          bodyEn:
            "Durable EVA protects what’s inside, in a compact size that fits a bag or hangs from the strap.",
          image: "/products/insulin-cooler-6.webp",
        },
        {
          titleAr: "تنظيم داخلي واضح",
          titleEn: "Clear interior organization",
          bodyAr:
            "جيوب وحلقات باش ترتّب الأقلام والإكسسوارات، مع أكياس تبريد فالبلاصة ديالها.",
          bodyEn:
            "Pockets and loops keep pens and accessories tidy, with gel packs in their place.",
          image: "/products/insulin-cooler-3.webp",
        },
        {
          titleAr: "أكياس تبريد مرفقة",
          titleEn: "Gel packs included",
          bodyAr:
            "حطّي الأكياس فالمجمدة قبل السفر، وركّبهم فالحقيبة باش تبقا البلاصة باردة أطول.",
          bodyEn:
            "Freeze the packs before you travel, then place them in the bag to keep the space cooler longer.",
          image: "/products/insulin-cooler-5.webp",
        },
        {
          titleAr: "مفتوحة ولا مغلقة — جاهزة للاستعمال",
          titleEn: "Open or closed — ready to use",
          bodyAr:
            "تفتحها بسهولة باش ترتّب، وتسكّرها بالسحاب باش تكون محمية فالطريق.",
          bodyEn:
            "Open it easily to organize, then zip it shut for protection on the go.",
          image: "/products/insulin-cooler-4.webp",
        },
        {
          titleAr: "للاستعمال اليومي والسفر",
          titleEn: "For daily use and travel",
          bodyAr:
            "فالدار، فالمكتب، ولا فالطريق — حقيبة وحدة مع شاشة وحزام.",
          bodyEn:
            "At home, at the office, or on the road — one bag with a screen and a strap.",
          image: "/products/insulin-cooler-2.webp",
        },
      ],
      benefitsAr: [
        "شاشة حرارة رقمية",
        "قشرة EVA صلبة",
        "أكياس تبريد مرفقة",
        "حزام كتف للسفر",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Digital temperature display",
        "Hard EVA shell",
        "Gel packs included",
        "Shoulder strap for travel",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "واش الشاشة كتورّي الحرارة؟",
          questionEn: "Does the screen show the temperature?",
          answerAr: "إيه — شاشة رقمية على الغطاء كاتورّيك درجة الحرارة.",
          answerEn: "Yes — a digital display on the lid shows the temperature.",
        },
        {
          questionAr: "واش كاينين أكياس تبريد؟",
          questionEn: "Are gel packs included?",
          answerAr: "إيه — كتجي مع أكياس تبريد جل باش تركّبهم فالحقيبة.",
          answerEn: "Yes — gel packs are included to place inside the bag.",
        },
        {
          questionAr: "كيف ندفع؟",
          questionEn: "How do I pay?",
          answerAr: "كتدفع 229 درهم عند الاستلام، والتوصيل مجاني فالمغرب.",
          answerEn: "You pay 229 MAD on delivery, and delivery is free in Morocco.",
        },
      ],
    },
  },
];
