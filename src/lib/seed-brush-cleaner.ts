import type { CountryCode, Product } from "./types";

export const BRUSH_CLEANER_SLUG = "nettoyeur-pinceaux-maquillage";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/brush-cleaner-1.webp",
  "/products/brush-cleaner-5.webp",
  "/products/brush-cleaner-6.webp",
  "/products/brush-cleaner-7.webp",
  "/products/brush-cleaner-8.webp",
  "/products/brush-cleaner-11.webp",
  "/products/brush-cleaner-3.webp",
  "/products/brush-cleaner-4.webp",
  "/products/brush-cleaner-9.webp",
  "/products/brush-cleaner-10.webp",
  "/products/brush-cleaner-2.webp",
  "/products/brush-cleaner-12.webp",
];

type Market = { country: CountryCode; price: number; priceUSD: number; label: string };

const MARKETS: Market[] = [
  { country: "MA", price: 199, priceUSD: 19.9, label: "199 درهم" },
  { country: "LY", price: 269, priceUSD: 48.9, label: "269 د.ل" },
];

function buildBrushCleaner(m: Market): Product {
  return {
    id: `prod-brush-cleaner-${m.country.toLowerCase()}`,
    slug: BRUSH_CLEANER_SLUG,
    categoryId: `cat-${m.country}`,
    availableIn: [m.country],
    priceUSD: m.priceUSD,
    compareAtUSD: m.priceUSD,
    marketPrices: { [m.country]: m.price },
    marketComparePrices: { [m.country]: m.price },
    nameAr: "منظف فرش المكياج الكهربائي — أوتوماتيكي",
    nameEn: "Automatic Electric Makeup Brush Cleaner",
    descriptionAr: `
<h3>فرشك تنظّف وحدها… بدون ما توسّخ يديك</h3>
<p>جهاز كهربائي ينظّف عدة فرش مكياج دفعة واحدة: حطّي الماء والصابون، ركّبي الفرش، واضغطي الزر. جسم شفاف باش تشوفي النتيجة، وغطاء يمسك كل المقاسات.</p>
<ul>
<li>تنظيف أوتوماتيكي بدون ما تمسكي الفرشاة باليد</li>
<li>ينظّف أكثر من فرشاة في نفس الوقت</li>
<li>يناسب أغلب مقاسات الفرش</li>
<li>يعمل أيضاً كحامل تجفيف وتخزين</li>
<li>تشغيل بزر واحد · طاقة USB</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Your brushes clean themselves — without dirty hands</h3>
<p>An electric cleaner that washes several makeup brushes at once: add water and soap, insert the brushes, press the button. A clear body so you see the result, and a lid that holds every size.</p>
<ul>
<li>Hands-free automatic cleaning</li>
<li>Cleans multiple brushes at once</li>
<li>Fits most brush sizes</li>
<li>Also works as a drying / storage stand</li>
<li>One-button start · USB powered</li>
</ul>
${COD_EN}`.trim(),
    detailsAr: [
      "منظف فرش مكياج كهربائي",
      "خزان شفاف مع خط MAX للماء",
      "غطاء سيليكون لمقاسات متعددة",
      "قاعدة بيضاء بزر تشغيل واحد",
      "قرص تنظيف داخلي + سجادة سيليكون يدوية",
      "كابل USB مرفق",
      "يُفضّل تنظيف حتى 4 فرش في المرة",
    ],
    detailsEn: [
      "Electric makeup brush cleaner",
      "Clear tank with MAX water line",
      "Silicone lid for multiple brush sizes",
      "White base with one power button",
      "Inner scrub disc + manual silicone mat",
      "USB cable included",
      "Best with up to 4 brushes at a time",
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
    createdAt: "2026-10-18T00:00:00.000Z",
    landing: {
      style: "pro",
      highlights: [
        { icon: "zap", titleAr: "تشغيل بلمسة واحدة", titleEn: "One-touch start" },
        { icon: "sparkles", titleAr: "تنظيف عميق", titleEn: "Deep clean" },
        { icon: "package", titleAr: "عدة فرش دفعة واحدة", titleEn: "Multi-brush" },
        { icon: "battery", titleAr: "طاقة USB", titleEn: "USB powered" },
      ],
      headlineAr: "منظف فرش المكياج الكهربائي — فرش نظيفة في دقائق",
      headlineEn: "Electric makeup brush cleaner — clean brushes in minutes",
      introAr: `وداعاً لغسيل الفرش باليد والأوساخ على الأصابع. حطّي الماء حتى خط MAX، ركّبي الفرش، واضغطي الزر — الجهاز كيكمّل الباقي. السعر ${m.label} فقط — توصيل مجاني والدفع عند الاستلام.`,
      introEn: `No more hand-washing brushes and dirty fingers. Fill to the MAX line, insert the brushes, press the button — the machine does the rest. Only ${m.label} — free delivery and cash on delivery.`,
      sections: [
        {
          titleAr: "تشوفي التنظيف بعينك",
          titleEn: "Watch the cleaning happen",
          bodyAr:
            "الخزان الشفاف يورّيك الأوساخ وهي كاتطلع من الفرش. ما بقاش تخمّني واش الفرشاة نقية ولا لا.",
          bodyEn:
            "The clear tank lets you see residue lift off the bristles. No more guessing whether a brush is really clean.",
          image: "/products/brush-cleaner-5.webp",
        },
        {
          titleAr: "عدة فرش… في دورة واحدة",
          titleEn: "Several brushes — one cycle",
          bodyAr:
            "الغطاء فيه فتحات بمقاسات مختلفة. ركّبي فرش الأساس، البودرة والعيون دفعة واحدة ووفّري الوقت.",
          bodyEn:
            "The lid has openings of different sizes. Clean foundation, powder and eye brushes together and save time.",
          image: "/products/brush-cleaner-6.webp",
        },
        {
          titleAr: "بدون ما توسّخي يديك",
          titleEn: "Keep your hands clean",
          bodyAr:
            "الفرش كتنزل في الماء والجهاز كيحرّك التنظيف. أنتِ غير كتشغّلي — بلا فرك يدوي متعب.",
          bodyEn:
            "Brushes sit in the water while the machine agitates the clean. You just start it — no tiring hand scrubbing.",
          image: "/products/brush-cleaner-10.webp",
        },
        {
          titleAr: "تجفيف وتخزين في نفس الجهاز",
          titleEn: "Dry and store in the same unit",
          bodyAr:
            "من بعد الغسيل، خلي الفرش واقفة في الغطاء باش تنشف وتبقى مرتبة فوق التسريحة.",
          bodyEn:
            "After washing, leave the brushes in the lid to dry and stay tidy on your vanity.",
          image: "/products/brush-cleaner-1.webp",
        },
        {
          titleAr: "طقم كامل جاهز من الصندوق",
          titleEn: "A complete kit out of the box",
          bodyAr:
            "الجهاز، كابل USB، سجادة سيليكون للتنظيف اليدوي عند الحاجة، ودليل استعمال بسيط.",
          bodyEn:
            "The unit, a USB cable, a silicone mat for optional hand scrubbing, and a simple guide.",
          image: "/products/brush-cleaner-7.webp",
        },
        {
          titleAr: "سجادة سيليكون للتنظيف اليدوي",
          titleEn: "Silicone mat for hand scrubbing",
          bodyAr:
            "إلا بغيتي فرك إضافي للبقع الصعبة، السجادة المرفقة كتعاونك قبل أو بعد الدورة الأوتوماتيكية.",
          bodyEn:
            "For stubborn spots, the included mat helps you scrub before or after the automatic cycle.",
          image: "/products/brush-cleaner-8.webp",
        },
        {
          titleAr: "شحن واستعمال سهل",
          titleEn: "Easy power and use",
          bodyAr:
            "كابل USB مرفق — وصّليه وشغّلي. زر واحد في القاعدة يكفي لبداية الدورة.",
          bodyEn:
            "USB cable included — plug in and go. One button on the base starts the cycle.",
          image: "/products/brush-cleaner-11.webp",
        },
      ],
      benefitsAr: [
        "تنظيف أوتوماتيكي بدون فرك يدوي",
        "عدة فرش في نفس الوقت",
        "يناسب أغلب المقاسات",
        "خزان شفاف + خط MAX",
        "كابل USB وسجادة مرفقة",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Automatic cleaning — no hand scrubbing",
        "Several brushes at once",
        "Fits most brush sizes",
        "Clear tank with MAX line",
        "USB cable and mat included",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "كيفاش نستعملو؟",
          questionEn: "How do I use it?",
          answerAr:
            "عمّري الماء حتى خط MAX، زيد شوية صابون لطيف، ركّبي الفرش من الغطاء، واضغطي زر التشغيل. من بعد صبّي الماء وخلي الفرش تنشف.",
          answerEn:
            "Fill water to the MAX line, add a little mild soap, insert brushes through the lid, and press power. Then empty the water and let the brushes dry.",
        },
        {
          questionAr: "شحال من فرشاة في المرة؟",
          questionEn: "How many brushes at once?",
          answerAr:
            "الأنسب حتى 4 فرش باش التنظيف يبقى فعال وما يثقلش على الجهاز.",
          answerEn:
            "Up to about 4 brushes is best so cleaning stays effective and the motor is not overloaded.",
        },
        {
          questionAr: "كيف أدفع؟",
          questionEn: "How do I pay?",
          answerAr: `تدفعين ${m.label} عند الاستلام، والتوصيل مجاني.`,
          answerEn: `You pay ${m.label} on delivery, and delivery is free.`,
        },
      ],
    },
  };
}

/** Morocco and Libya */
export const BRUSH_CLEANER_PRODUCTS: Product[] = MARKETS.map(buildBrushCleaner);
