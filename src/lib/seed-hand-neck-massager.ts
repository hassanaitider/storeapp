import type { Product } from "./types";

export const HAND_NECK_MASSAGER_SLUG = "masseur-cou-main-sans-fil";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/hand-neck-massager-a3.webp",
  "/products/hand-neck-massager-a2.webp",
  "/products/hand-neck-massager-a1.webp",
  "/products/hand-neck-massager-b.webp",
  "/products/hand-neck-massager-c.webp",
  "/products/hand-neck-massager-d.webp",
  "/products/hand-neck-massager-e.webp",
];

/** Morocco only — cordless hand-shaped neck massager */
export const HAND_NECK_MASSAGER_PRODUCTS: Product[] = [
  {
    id: "prod-hand-neck-massager-ma",
    slug: HAND_NECK_MASSAGER_SLUG,
    categoryId: "cat-MA",
    availableIn: ["MA"],
    priceUSD: 34.9,
    compareAtUSD: 34.9,
    marketPrices: { MA: 349 },
    marketComparePrices: { MA: 349 },
    nameAr: "مساج العنق اللاسلكي — يد سيليكون بأحزمة",
    nameEn: "Cordless Hand-Shaped Neck Massager",
    descriptionAr: `
<h3>إحساس يد حقيقية… وأنتِ مسترخية</h3>
<p>جهاز مساج لاسلكي بشكل يد، بأصابع سيليكون ناعمة وحزام يثبتو على العنق أو الكتف. شغّليه، اختاري القوة، وخلّيه يخدم بلا ما تمسكيه.</p>
<ul>
<li>8 أصابع سيليكون ناعمة — إحساس قريب من مساج اليد</li>
<li>3 مستويات قوة</li>
<li>دفء لطيف أثناء الجلسة</li>
<li>لاسلكي وقابل للشحن (USB-C)</li>
<li>حزام يثبّته — يديك تبقى حرة</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>A hand-like feel — while you stay relaxed</h3>
<p>A cordless massager shaped like a hand, with soft silicone fingers and a strap that holds it on the neck or shoulder. Turn it on, pick a level, and let it work without holding it.</p>
<ul>
<li>8 soft silicone fingers — a feel close to a hand massage</li>
<li>3 intensity levels</li>
<li>Gentle warmth during the session</li>
<li>Cordless and rechargeable (USB-C)</li>
<li>Strap holds it in place — hands free</li>
</ul>
${COD_EN}`.trim(),
    detailsAr: [
      "مساج لاسلكي بشكل يد",
      "8 أصابع سيليكون ناعمة",
      "3 مستويات قوة",
      "دفء لطيف أثناء الاستعمال",
      "حزام تثبيت على العنق أو الكتف",
      "شحن USB-C — كابل مرفق",
      "غطاء قماش ناعم + أزرار بسيطة",
    ],
    detailsEn: [
      "Cordless hand-shaped massager",
      "8 soft silicone fingers",
      "3 intensity levels",
      "Gentle warmth during use",
      "Strap for neck or shoulder",
      "USB-C charging — cable included",
      "Soft fabric cover + simple buttons",
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
    createdAt: "2026-10-18T18:00:00.000Z",
    landing: {
      style: "pro",
      highlights: [
        { icon: "heart", titleAr: "إحساس قريب من اليد", titleEn: "Hand-like feel" },
        { icon: "zap", titleAr: "3 مستويات قوة", titleEn: "3 intensity levels" },
        { icon: "battery", titleAr: "لاسلكي USB-C", titleEn: "Cordless USB-C" },
        { icon: "feather", titleAr: "حزام — يديك حرة", titleEn: "Hands-free strap" },
      ],
      headlineAr: "مساج العنق اللاسلكي — استرخي بعد يوم طويل",
      headlineEn: "Cordless neck massager — unwind after a long day",
      introAr:
        "بعد الجلوس الطويل أو القيادة، العنق والكتف كيحتاجو استراحة. هاد الجهاز بشكل يد، بأصابع سيليكون وحزام تثبيت — تشغّليه وتخلّيه يخدم. الثمن 349 درهم فقط — توصيل مجاني والدفع عند الاستلام فالمغرب.",
      introEn:
        "After long sitting or driving, the neck and shoulders deserve a break. This hand-shaped device has silicone fingers and a strap — turn it on and let it work. Only 349 MAD — free delivery and cash on delivery in Morocco.",
      sections: [
        {
          titleAr: "استرخاء في الدار… بلا ما تمسكيه",
          titleEn: "Relax at home — hands free",
          bodyAr:
            "الحزام يثبّت الجهاز على العنق والكتف. تشغّليه وترتاحي — تقراي، تتفرجي، ولا ترتاحي.",
          bodyEn:
            "The strap holds the device on the neck and shoulder. Turn it on and rest — read, watch, or unwind.",
          image: "/products/hand-neck-massager-a3.webp",
        },
        {
          titleAr: "مساج احترافي كل يوم",
          titleEn: "Professional massage every day",
          bodyAr:
            "يد تحاكي المساج اليدوي بأصابع سيليكون، دفء أحمر، وتشغيل بزر واحد — راحة بعد يوم طويل.",
          bodyEn:
            "Bionic silicone fingers, red-light warmth, and one-touch control — relief after a long day.",
          image: "/products/hand-neck-massager-a2.webp",
        },
        {
          titleAr: "8 أصابع فوق العنق… وإبهام على الكتف",
          titleEn: "8 fingers on the neck — thumbs on the trapezius",
          bodyAr:
            "الأصابع كتعجن العنق من فوق، والإبهام كيرفع ويضغط عضلة الترابيز — دعم واضح للعنق والكتف.",
          bodyEn:
            "Fingers knead the upper neck while the thumbs lift and press the trapezius — clear neck and shoulder support.",
          image: "/products/hand-neck-massager-b.webp",
        },
        {
          titleAr: "ضغط عميق على نقاط العنق والكتف",
          titleEn: "Deep press on neck and shoulder points",
          bodyAr:
            "كيغطي مناطق السكالين، الرافعة للكتف، والترابيز — مساج مركّز باش يخفّف التوتر.",
          bodyEn:
            "It covers the scalenes, levator scapulae, and trapezius — focused massage to ease tension.",
          image: "/products/hand-neck-massager-c.webp",
        },
        {
          titleAr: "خفيف، سيليكون غذائي، ودفء أحمر",
          titleEn: "Light, food-grade silicone, red-light heat",
          bodyAr:
            "جسم خفيف، مادة سيليكون ناعمة، ضغط حراري أحمر، ويد تحاكي المساج اليدوي — تشغيل بسيط بزر.",
          bodyEn:
            "A light body, soft silicone, red-light heat, and a bionic hand — simple one-touch operation.",
          image: "/products/hand-neck-massager-d.webp",
        },
        {
          titleAr: "للاستعمال المتعدد… وين ما كاين التوتر",
          titleEn: "Multi-purpose — wherever it hurts",
          bodyAr:
            "على العنق والكتف وأنتِ كتستعملي التيليفون، ولا على الرجل على وسادة ناعمة — نفس الجهاز.",
          bodyEn:
            "On the neck and shoulders while you use your phone, or on the leg over a soft pad — same device.",
          image: "/products/hand-neck-massager-e.webp",
        },
      ],
      benefitsAr: [
        "إحساس قريب من مساج اليد",
        "3 مستويات قوة",
        "دفء لطيف",
        "حزام — يديك حرة",
        "لاسلكي وشحن USB-C",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "A feel close to a hand massage",
        "3 intensity levels",
        "Gentle warmth",
        "Hands-free strap",
        "Cordless USB-C charging",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "واش خاصني نمسكو؟",
          questionEn: "Do I have to hold it?",
          answerAr:
            "لا — الحزام يثبّتو على العنق أو الكتف، ويدك تبقى حرة.",
          answerEn:
            "No — the strap holds it on the neck or shoulder, so your hands stay free.",
        },
        {
          questionAr: "كيفاش نشحنو؟",
          questionEn: "How do I charge it?",
          answerAr:
            "بكابل USB-C المرفق. وصّليه لأي شاحن USB عادي.",
          answerEn:
            "With the included USB-C cable. Plug it into any regular USB charger.",
        },
        {
          questionAr: "كيف ندفع؟",
          questionEn: "How do I pay?",
          answerAr: "كتدفع 349 درهم عند الاستلام، والتوصيل مجاني فالمغرب.",
          answerEn: "You pay 349 MAD on delivery, and delivery is free in Morocco.",
        },
      ],
    },
  },
];
