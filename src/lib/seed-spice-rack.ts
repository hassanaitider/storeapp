import type { Product } from "./types";

export const SPICE_RACK_SLUG = "organisateur-epices-12-pots";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/spice-rack-1-lg.webp",
  "/products/spice-rack-5-lg.webp",
  "/products/spice-rack-8-lg.webp",
  "/products/spice-rack-7-lg.webp",
  "/products/spice-rack-4-lg.webp",
  "/products/spice-rack-2-lg.webp",
  "/products/spice-rack-3-lg.webp",
  "/products/spice-rack-6-lg.webp",
];

/** Morocco only — 12-jar two-tier spice organizer */
export const SPICE_RACK_PRODUCTS: Product[] = [
  {
    id: "prod-spice-rack-ma",
    slug: SPICE_RACK_SLUG,
    categoryId: "cat-MA",
    availableIn: ["MA"],
    priceUSD: 24.9,
    compareAtUSD: 24.9,
    marketPrices: { MA: 249 },
    marketComparePrices: { MA: 249 },
    nameAr: "طقم توابل عصري — 12 علبة بطابقين",
    nameEn: "Modern Spice Rack — 12 Jars, Two Tiers",
    descriptionAr: `
<h3>كل التوابل مرتّبة… فالطبخة كتولي أسرع</h3>
<p>منظم توابل بطابقين مع 12 علبة شفافة بمقابض. كتشوفي شنو داخل من غير ما تفتحي، وكتسحبي العلبة بسهولة. فوق المنظم كاين رف صغير للزيت أو النباتات.</p>
<ul>
<li>12 علبة شفافة بمقابض مريحة</li>
<li>طابقين — كيوفر البلاصة فوق الطبلة</li>
<li>أغطية قابلة للفتح + ملاعق صغيرة</li>
<li>ملصقات للمقابض باش تسمّي التوابل</li>
<li>تصميم عصري رمادي يمشي مع الكوزينة</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Every spice in its place — cooking gets faster</h3>
<p>A two-tier spice organizer with 12 clear jars and easy handles. See what’s inside without opening, and pull each jar out smoothly. The flat top holds oil bottles or small plants.</p>
<ul>
<li>12 clear jars with comfortable handles</li>
<li>Two tiers — saves counter space</li>
<li>Flip lids + small spoons</li>
<li>Handle labels to name your spices</li>
<li>Modern grey design that fits the kitchen</li>
</ul>
${COD_EN}`.trim(),
    detailsAr: [
      "منظم توابل بطابقين",
      "12 علبة شفافة بمقابض",
      "أغطية قابلة للفتح",
      "ملاعق صغيرة مرفقة",
      "ملصقات للمقابض",
      "رف علوي للزيت أو الديكور",
      "بلاستيك متين بتصميم مضلع",
    ],
    detailsEn: [
      "Two-tier spice organizer",
      "12 clear jars with handles",
      "Flip-open lids",
      "Small spoons included",
      "Handle labels included",
      "Top shelf for oil or décor",
      "Durable ribbed plastic",
    ],
    images: [...IMAGES],
    colors: [],
    customColorEnabled: false,
    qtyUpsellLocked: true,
    qtyUpsellEnabled: true,
    qtyOffers: [
      { quantity: 1, discountPercent: 0 },
      { quantity: 2, discountPercent: 10, popular: true },
      { quantity: 3, discountPercent: 20 },
    ],
    inStock: true,
    featured: true,
    rating: 0,
    reviewCount: 0,
    createdAt: "2026-10-20T00:00:00.000Z",
    landing: {
      style: "pro",
      highlights: [
        { icon: "package", titleAr: "12 علبة جاهزة", titleEn: "12 jars ready" },
        { icon: "sparkles", titleAr: "ترتيب واضح", titleEn: "Clear & tidy" },
        { icon: "feather", titleAr: "يوفر البلاصة", titleEn: "Saves space" },
        { icon: "zap", titleAr: "سحب سهل", titleEn: "Easy pull-out" },
      ],
      headlineAr: "طقم توابل عصري — كوزينتك مرتّبة فبلاصة وحدة",
      headlineEn: "A modern spice set — your kitchen tidy in one place",
      introAr:
        "ما بقاش التوابل مبعثرة فالخزائن. هاد الطقم فيه 12 علبة شفافة بطابقين، مع مقابض وملاعق وملصقات. الثمن 249 درهم فقط — توصيل مجاني والدفع عند الاستلام فالمغرب.",
      introEn:
        "No more spices scattered in the cupboards. This set has 12 clear jars on two tiers, with handles, spoons and labels. Only 249 MAD — free delivery and cash on delivery in Morocco.",
      sections: [
        {
          titleAr: "كل شي فمتناول يدك",
          titleEn: "Everything within reach",
          bodyAr:
            "طابقين، علب شفافة، ورف فوق للمنظم. الزيت، الملح، والحبهارات فالطبخة قدامك.",
          bodyEn:
            "Two tiers, clear jars, and a shelf on top. Oil, salt and spices stay right where you cook.",
          image: "/products/spice-rack-1-lg.webp",
        },
        {
          titleAr: "12 علبة… كل وحدة باسمها",
          titleEn: "12 jars — each with its name",
          bodyAr:
            "العلب شفافة باش تبان الكمية، والملصقات كتخليك تسمّي الكمون، الفلفل، القرفة… بلا لخبطة.",
          bodyEn:
            "Clear jars show how much is left, and labels let you name cumin, pepper, cinnamon… without mix-ups.",
          image: "/products/spice-rack-2-lg.webp",
        },
        {
          titleAr: "مقبض قوي وغطاء سهل",
          titleEn: "Strong handle and easy lid",
          bodyAr:
            "كتسحبي العلبة بمقبض مريح، وكتفتحي الغطاء بضغطة باش تزيدي التوابل أو تاخذي بمعلقة.",
          bodyEn:
            "Pull the jar with a comfortable handle, and open the lid with a press to refill or scoop with the spoon.",
          image: "/products/spice-rack-7-lg.webp",
        },
        {
          titleAr: "معلقة صغيرة داخل كل علبة",
          titleEn: "A small spoon in every jar",
          bodyAr:
            "ما تحتاجيش تقلّب على معلقة فالدرج — كل علبة كتجي مع معلقة باش الكمية تكون مضبوطة.",
          bodyEn:
            "No more hunting for a spoon in the drawer — each jar comes with one so portions stay neat.",
          image: "/products/spice-rack-8-lg.webp",
        },
        {
          titleAr: "رف فوق للمنظم",
          titleEn: "A shelf on top of the rack",
          bodyAr:
            "حطّي فوقو زجاجات الزيت، الصوص، ولا نبتة صغيرة — بلاصة إضافية بلا ما تاخدي مساحة من الطبلة.",
          bodyEn:
            "Place oil bottles, sauces or a small plant on top — extra space without taking more of the counter.",
          image: "/products/spice-rack-5-lg.webp",
        },
        {
          titleAr: "تصميم يمشي مع الكوزينة العصرية",
          titleEn: "A look that fits a modern kitchen",
          bodyAr:
            "رمادي أنيق مع علب شفافة — مرتّب، نظيف، وسهل التنظيف بمسحة بسيطة.",
          bodyEn:
            "Sleek grey with clear jars — tidy, clean, and easy to wipe down.",
          image: "/products/spice-rack-4-lg.webp",
        },
      ],
      benefitsAr: [
        "12 علبة شفافة بمقابض",
        "طابقين يوفّرون البلاصة",
        "ملاعق وملصقات مرفقة",
        "رف علوي للزيت أو الديكور",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "12 clear jars with handles",
        "Two tiers that save space",
        "Spoons and labels included",
        "Top shelf for oil or décor",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "شحال من علبة كاينة؟",
          questionEn: "How many jars are included?",
          answerAr: "12 علبة شفافة مع المنظم بطابقين، ملاعق، وملصقات للمقابض.",
          answerEn: "12 clear jars with the two-tier rack, spoons, and handle labels.",
        },
        {
          questionAr: "واش التوابل مرفقة؟",
          questionEn: "Are the spices included?",
          answerAr:
            "لا — الطقم للمنظم والعلب فارغة. كتعمّريهم بتوابلك من الدار.",
          answerEn:
            "No — the set is the organizer and empty jars. You fill them with your own spices.",
        },
        {
          questionAr: "كيف ندفع؟",
          questionEn: "How do I pay?",
          answerAr: "كتدفع 249 درهم عند الاستلام، والتوصيل مجاني فالمغرب.",
          answerEn: "You pay 249 MAD on delivery, and delivery is free in Morocco.",
        },
      ],
    },
  },
];
