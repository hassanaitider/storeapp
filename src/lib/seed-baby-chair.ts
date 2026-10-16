import type { Product } from "./types";

export const BABY_CHAIR_SLUG = "chaise-haute-bebe-portable";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/baby-chair-main.webp",
  "/products/baby-chair-5.webp",
  "/products/baby-chair-4.webp",
  "/products/baby-chair-2.webp",
  "/products/baby-chair-3.webp",
];

/** Morocco only — foldable portable baby high chair */
export const BABY_CHAIR_PRODUCTS: Product[] = [
  {
    id: "prod-baby-chair-ma",
    slug: BABY_CHAIR_SLUG,
    categoryId: "cat-MA",
    availableIn: ["MA"],
    priceUSD: 27.5,
    compareAtUSD: 27.5,
    marketPrices: { MA: 275 },
    marketComparePrices: { MA: 275 },
    nameAr: "كرسي أكل للبيبي — قابل للطي ومحمول",
    nameEn: "Portable Foldable Baby High Chair",
    descriptionAr: `
<h3>كرسي أكل خفيف… فالدار، فالسفر، وفالحديقة</h3>
<p>كرسي أكل للبيبي قابل للطي، بصحن أبيض سهل التنظيف وحزام أمان. خفيف، مستقر، وكيتطوي فثواني باش تاخدو معاك وين ما مشيتي.</p>
<ul>
<li>قابل للطي — كياخد بلاصة صغيرة</li>
<li>صحن أبيض قابل للفك — سهل الغسيل</li>
<li>حزام أمان يثبت البيبي</li>
<li>أقدام عريضة للاستقرار</li>
<li>حقيبة حمل مرفقة</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>A light feeding chair — at home, on trips, outdoors</h3>
<p>A foldable baby high chair with a wipe-clean white tray and a safety harness. Light, stable, and folds in seconds so you can take it anywhere.</p>
<ul>
<li>Folds flat — takes little space</li>
<li>Removable white tray — easy to clean</li>
<li>Safety harness keeps baby secure</li>
<li>Wide feet for stability</li>
<li>Carrying bag included</li>
</ul>
${COD_EN}`.trim(),
    detailsAr: [
      "كرسي أكل قابل للطي",
      "صحن بلاستيك أبيض قابل للفك",
      "حزام أمان رمادي",
      "هيكل معدني خفيف مع أقدام عريضة",
      "قماش رمادي سهل المسح",
      "حقيبة حمل مرفقة",
    ],
    detailsEn: [
      "Foldable feeding chair",
      "Removable white plastic tray",
      "Grey safety harness",
      "Light metal frame with wide feet",
      "Wipe-clean grey fabric",
      "Carrying bag included",
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
    createdAt: "2026-10-15T00:00:00.000Z",
    landing: {
      style: "pro",
      highlights: [
        { icon: "package", titleAr: "قابل للطي ومحمول", titleEn: "Foldable & portable" },
        { icon: "shield", titleAr: "حزام أمان", titleEn: "Safety harness" },
        { icon: "sparkles", titleAr: "صحن سهل التنظيف", titleEn: "Easy-clean tray" },
        { icon: "feather", titleAr: "خفيف ومستقر", titleEn: "Light & stable" },
      ],
      headlineAr: "كرسي أكل للبيبي… فالدار وفالسفر",
      headlineEn: "A baby feeding chair — at home and on the go",
      introAr:
        "ما بقاش خاصك تشري كرسي ثقيل. هاد الكرسي كيتطوي فثواني، فيه صحن للأكل وحزام أمان، وكيجي مع حقيبة باش تاخدو معاك للدار، الحديقة، ولا السفر. الثمن 275 درهم فقط — توصيل مجاني والدفع عند الاستلام فالمغرب.",
      introEn:
        "No need for a heavy high chair. This one folds in seconds, has a feeding tray and a safety harness, and comes with a carrying bag for home, the park, or travel. Only 275 MAD — free delivery and cash on delivery in Morocco.",
      sections: [
        {
          titleAr: "البيبي كياكل مريح… وأنتي مطمئنة",
          titleEn: "Baby eats comfortably — you stay at ease",
          bodyAr:
            "صحن واسع وظهر مرتفع، والبيبي كايجلس مثبت بالحزام. مثالي للوجبة أو للسناك فأي بلاصة فالدار.",
          bodyEn:
            "A wide tray and a high backrest, with baby held secure by the harness. Ideal for meals or snacks anywhere at home.",
          image: "/products/baby-chair-main.webp",
        },
        {
          titleAr: "صحن أبيض + حقيبة حمل",
          titleEn: "White tray + carrying bag",
          bodyAr:
            "الصحن كيتفك بسهولة باش تغسليه، والحقيبة السوداء كتخليك تاخدي الكرسي معاك بلا تعب.",
          bodyEn:
            "The tray comes off easily to wash, and the black bag lets you carry the chair without hassle.",
          image: "/products/baby-chair-5.webp",
        },
        {
          titleAr: "كيطوي فثواني ويوفر البلاصة",
          titleEn: "Folds in seconds and saves space",
          bodyAr:
            "ملي تسالي الوجبة، طوي الكرسي وخبيه فالقنط ولا فالكار. كياخد بلاصة صغيرة بزاف.",
          bodyEn:
            "When the meal is done, fold the chair and tuck it in a corner or in the car. It takes very little space.",
          image: "/products/baby-chair-5.webp",
        },
        {
          titleAr: "مفتوح ولا مطوي — جاهز فأي لحظة",
          titleEn: "Open or folded — ready in a moment",
          bodyAr:
            "سواء فالحديقة ولا فالدار، الكرسي كيتفتح بسرعة وكيعطي للبيبي بلاصة آمنة للأكل.",
          bodyEn:
            "Whether at the park or at home, the chair opens quickly and gives baby a safe spot to eat.",
          image: "/products/baby-chair-4.webp",
        },
        {
          titleAr: "مثالي للنزهة والهواء الطلق",
          titleEn: "Ideal for picnics and the outdoors",
          bodyAr:
            "أقدام عريضة كتثبتو فوق العشب، وصحن للأكل، وجيب خلفي باش تحطي منديل ولا لعبة صغيرة.",
          bodyEn:
            "Wide feet hold it on the grass, a tray for food, and a back pocket for a wipe or a small toy.",
          image: "/products/baby-chair-2.webp",
        },
        {
          titleAr: "خفيف… حتى فالبحر",
          titleEn: "Light enough for the beach",
          bodyAr:
            "الهيكل خفيف وسهل الطي — تاخديه معاك للشاطئ، للحديقة، ولا لأي خرجة مع البيبي.",
          bodyEn:
            "A light frame that folds easily — take it to the beach, the park, or any outing with baby.",
          image: "/products/baby-chair-3.webp",
        },
      ],
      benefitsAr: [
        "قابل للطي ومحمول",
        "صحن قابل للفك سهل التنظيف",
        "حزام أمان",
        "حقيبة حمل مرفقة",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Foldable and portable",
        "Removable easy-clean tray",
        "Safety harness",
        "Carrying bag included",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "واش كيتطوي بسهولة؟",
          questionEn: "Does it fold easily?",
          answerAr: "إيه — كيتطوي فثواني وكياخد بلاصة صغيرة فالكار ولا فالدار.",
          answerEn: "Yes — it folds in seconds and takes little space in the car or at home.",
        },
        {
          questionAr: "واش كاين حقيبة؟",
          questionEn: "Is there a carrying bag?",
          answerAr: "إيه — كتجي معاه حقيبة سوداء باش تاخديه معاك بسهولة.",
          answerEn: "Yes — a black carrying bag is included so you can take it with you easily.",
        },
        {
          questionAr: "كيف ندفع؟",
          questionEn: "How do I pay?",
          answerAr: "كتدفع 275 درهم عند الاستلام، والتوصيل مجاني فالمغرب.",
          answerEn: "You pay 275 MAD on delivery, and delivery is free in Morocco.",
        },
      ],
    },
  },
];
