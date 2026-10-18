import type { Product } from "./types";

export const HAND_NECK_MASSAGER_SLUG = "masseur-cou-main-sans-fil";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/hand-neck-massager-1.webp",
  "/products/hand-neck-massager-2.webp",
  "/products/hand-neck-massager-3.webp",
  "/products/hand-neck-massager-4.webp",
  "/products/hand-neck-massager-5.webp",
  "/products/hand-neck-massager-7.webp",
  "/products/hand-neck-massager-6.webp",
  "/products/hand-neck-massager-8.webp",
  "/products/hand-neck-massager-9.webp",
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
          titleAr: "طقم كامل جاهز من الصندوق",
          titleEn: "A complete kit out of the box",
          bodyAr:
            "الجهاز، الحزام، كابل الشحن، ودليل بسيط. تركّبيه في دقائق وتبداي الجلسة في الدار.",
          bodyEn:
            "The device, the strap, a charging cable and a simple guide. Set it up in minutes and start at home.",
          image: "/products/hand-neck-massager-1.webp",
        },
        {
          titleAr: "يثبت على العنق… وأنتِ مرتاحة",
          titleEn: "Holds on the neck — you stay comfortable",
          bodyAr:
            "الحزام الجلدي يثبّت الجهاز على العنق. ما تحتاجيش تمسكيه — تقراي، تتفرجي، ولا ترتاحي.",
          bodyEn:
            "The leather strap holds the device on the neck. No need to hold it — read, watch, or rest.",
          image: "/products/hand-neck-massager-2.webp",
        },
        {
          titleAr: "فوق العنق أو تحت الكتف",
          titleEn: "Over the neck or under the shoulder",
          bodyAr:
            "وجه الأصابع لفوق أو لتحت حسب البلاصة اللي بغيتي ترتاحي فيها. نفس الجهاز، وضعين.",
          bodyEn:
            "Point the fingers up or down depending on where you want to unwind. Same device, two positions.",
          image: "/products/hand-neck-massager-7.webp",
        },
        {
          titleAr: "أصابع سيليكون ناعمة",
          titleEn: "Soft silicone fingers",
          bodyAr:
            "8 أصابع مرنة كتحاكي ضغط أطراف الأصابع. ناعمة على البشرة، وثابتة على المنطقة.",
          bodyEn:
            "8 flexible fingers that mimic fingertip pressure. Soft on the skin, steady on the area.",
          image: "/products/hand-neck-massager-5.webp",
        },
        {
          titleAr: "دفء لطيف أثناء الجلسة",
          titleEn: "Gentle warmth during the session",
          bodyAr:
            "الدفء كيزيد الإحساس بالراحة — خاصة ملي تكوني جالسة بزاف قدام الشاشة أو فالطريق.",
          bodyEn:
            "Warmth adds to the comfort — especially after long screen time or a drive.",
          image: "/products/hand-neck-massager-6.webp",
        },
        {
          titleAr: "تفاصيل متقونة",
          titleEn: "Thoughtful details",
          bodyAr:
            "حزام ناعم، أزرار بسيطة، قماش مريح، وأصابع سيليكون. كل حاجة فبلاصتها.",
          bodyEn:
            "A soft strap, simple buttons, comfortable fabric, and silicone fingers. Everything in its place.",
          image: "/products/hand-neck-massager-8.webp",
        },
        {
          titleAr: "خفيف… تاخديه وين ما بغيتي",
          titleEn: "Light — take it anywhere",
          bodyAr:
            "لاسلكي وقابل للشحن. حطّيه فالدار، فالمكتب، ولا فالسفر. كابل USB-C مرفق.",
          bodyEn:
            "Cordless and rechargeable. Use it at home, at the desk, or when you travel. USB-C cable included.",
          image: "/products/hand-neck-massager-9.webp",
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
