import type { CountryCode, Product } from "./types";

export const SCREWDRIVER_SLUG = "visseuse-sans-fil-kit";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/screwdriver-2.webp",
  "/products/screwdriver-3.webp",
];

type Market = { country: CountryCode; price: number; priceUSD: number; label: string };

const MARKETS: Market[] = [
  { country: "LY", price: 299, priceUSD: 54.4, label: "299 د.ل" },
  { country: "LB", price: 29, priceUSD: 29, label: "29$" },
];

function buildScrewdriver(m: Market): Product {
  return {
    id: `prod-screwdriver-${m.country.toLowerCase()}`,
    slug: SCREWDRIVER_SLUG,
    categoryId: `cat-${m.country}`,
    availableIn: [m.country],
    priceUSD: m.priceUSD,
    compareAtUSD: m.priceUSD,
    marketPrices: { [m.country]: m.price },
    marketComparePrices: { [m.country]: m.price },
    nameAr: "مفك كهربائي لاسلكي — طقم كامل في حقيبة",
    nameEn: "Cordless Electric Screwdriver — Complete Kit in a Case",
    descriptionAr: `
<h3>كل أدوات التركيب والتصليح… في حقيبة واحدة</h3>
<p>مفك كهربائي لاسلكي قابل للشحن، يأتي في حقيبة منظمة مع مجموعة رؤوس ولقم متنوعة ووصلة مرنة للأماكن الضيقة. ركّب الأثاث، شدّ المفصلات، وصلّح أجهزتك بسرعة وبدون تعب.</p>
<ul>
<li>لاسلكي وقابل للشحن — اشتغل في أي مكان</li>
<li>زر اتجاهين: ربط وفك بضغطة واحدة</li>
<li>وصلة مرنة توصل للزوايا الضيقة</li>
<li>مجموعة رؤوس ولقم متنوعة لأغلب البراغي</li>
<li>حقيبة متينة ترتّب كل القطع</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Everything you need to assemble and repair — in one case</h3>
<p>A rechargeable cordless screwdriver in an organized case with assorted bits, sockets and a flexible extension for tight spots. Assemble furniture, tighten hinges and fix your devices quickly and effortlessly.</p>
<ul>
<li>Cordless and rechargeable — work anywhere</li>
<li>Forward/reverse button: tighten or loosen in one press</li>
<li>Flexible extension reaches tight corners</li>
<li>Assorted bits and sockets for most screws</li>
<li>Sturdy case keeps every piece organized</li>
</ul>
${COD_EN}`.trim(),
    detailsAr: [
      "مفك كهربائي لاسلكي قابل للشحن",
      "كابل شحن مرفق",
      "زر اتجاهين (ربط / فك)",
      "وصلة مرنة للأماكن الضيقة",
      "مجموعة رؤوس ولقم متنوعة",
      "حقيبة تخزين متينة",
    ],
    detailsEn: [
      "Rechargeable cordless screwdriver",
      "Charging cable included",
      "Forward / reverse button",
      "Flexible extension for tight spots",
      "Assorted bits and sockets",
      "Sturdy storage case",
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
    createdAt: "2026-10-09T00:00:00.000Z",
    landing: {
      headlineAr: "مفك كهربائي لاسلكي — طقم احترافي لكل أعمال البيت",
      headlineEn: "Cordless electric screwdriver — a pro kit for every home job",
      introAr: `ودّع المفك اليدوي والتعب. طقم كامل في حقيبة واحدة: مفك لاسلكي قابل للشحن، رؤوس ولقم متنوعة، ووصلة مرنة. مثالي للأثاث، الأبواب، الأجهزة والدراجات. السعر ${m.label} فقط — توصيل مجاني والدفع عند الاستلام.`,
      introEn: `Say goodbye to manual screwdrivers. A complete kit in one case: a rechargeable cordless screwdriver, assorted bits and sockets, and a flexible extension. Ideal for furniture, doors, devices and bikes. Only ${m.label} — free delivery and cash on delivery.`,
      sections: [
        {
          titleAr: "طقم كامل في حقيبة منظمة",
          titleEn: "A complete kit in an organized case",
          bodyAr:
            "كل قطعة في مكانها: المفك، الرؤوس، اللقم، الوصلة المرنة وكابل الشحن. تجد ما تحتاجه بسرعة وتحمله معك أينما ذهبت.",
          bodyEn:
            "Every piece has its place: screwdriver, bits, sockets, flexible extension and charging cable. Find what you need fast and take it anywhere.",
        },
        {
          titleAr: "تركيب الأثاث والمفصلات بسهولة",
          titleEn: "Furniture and hinges made easy",
          bodyAr:
            "ركّب الخزائن والرفوف، وشدّ مفصلات الأبواب في ثواني بدل دقائق من الشغل اليدوي.",
          bodyEn:
            "Assemble cabinets and shelves and tighten door hinges in seconds instead of minutes of manual work.",
        },
        {
          titleAr: "وصلة مرنة للأماكن الصعبة",
          titleEn: "Flexible extension for hard-to-reach spots",
          bodyAr:
            "الوصلة المرنة تنحني وتوصل للبراغي في الزوايا الضيقة وخلف الأثاث، حيث لا يصل المفك العادي.",
          bodyEn:
            "The flexible extension bends to reach screws in tight corners and behind furniture where a regular screwdriver can't go.",
          image: "/products/screwdriver-2.webp",
        },
        {
          titleAr: "من الكمبيوتر للدراجة",
          titleEn: "From laptops to bikes",
          bodyAr:
            "رؤوس صغيرة ودقيقة لتصليح الأجهزة، ولقم أقوى لتركيب الدراجات والألعاب — أداة واحدة لكل الاستعمالات.",
          bodyEn:
            "Small precision bits for device repairs and stronger sockets for bikes and toys — one tool for every job.",
          image: "/products/screwdriver-3.webp",
        },
        {
          titleAr: "قبضة مريحة وزر اتجاهين",
          titleEn: "Comfortable grip and forward/reverse button",
          bodyAr:
            "قبضة مطاطية لا تنزلق، وزر لتبديل الاتجاه بين الربط والفك بلمسة واحدة.",
          bodyEn:
            "A non-slip rubber grip and a button to switch between tightening and loosening in one touch.",        },
      ],
      benefitsAr: [
        "لاسلكي وقابل للشحن",
        "طقم كامل في حقيبة",
        "وصلة مرنة للزوايا الضيقة",
        "رؤوس ولقم لأغلب البراغي",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Cordless and rechargeable",
        "Complete kit in a case",
        "Flexible extension for tight corners",
        "Bits and sockets for most screws",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "هل يحتاج إلى كهرباء أثناء الاستعمال؟",
          questionEn: "Does it need to be plugged in while working?",
          answerAr:
            "لا — بطاريته قابلة للشحن. اشحنه بالكابل المرفق واستعمله بدون أسلاك في أي مكان.",
          answerEn:
            "No — it has a rechargeable battery. Charge it with the included cable and use it cordless anywhere.",
        },
        {
          questionAr: "ماذا تحتوي الحقيبة؟",
          questionEn: "What's in the case?",
          answerAr:
            "المفك الكهربائي، كابل الشحن، وصلة مرنة، ومجموعة رؤوس ولقم متنوعة — كلها مرتبة في حقيبة.",
          answerEn:
            "The electric screwdriver, charging cable, a flexible extension and assorted bits and sockets — all organized in a case.",
        },
        {
          questionAr: "كيف أدفع؟",
          questionEn: "How do I pay?",
          answerAr: `تدفع ${m.label} عند الاستلام، والتوصيل مجاني.`,
          answerEn: `You pay ${m.label} on delivery, and delivery is free.`,
        },
      ],
    },
  };
}

/** Libya and Lebanon only. */
export const SCREWDRIVER_PRODUCTS: Product[] = MARKETS.map(buildScrewdriver);
