import type { Product } from "./types";

export const SLING_BAG_SLUG = "sacoche-antitheft-usb";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/sling-bag-1-offer.webp",
  "/products/sling-bag-demo.gif",
  "/products/sling-bag-2-offer.webp",
  "/products/sling-bag-3-offer.webp",
  "/products/sling-bag-4-offer.webp",
  "/products/sling-bag-5-offer.webp",
  "/products/sling-bag-6-offer.webp",
  "/products/sling-bag-7-offer.webp",
  "/products/sling-bag-8-offer.webp",
  "/products/sling-bag-9-offer.webp",
];

/** Morocco only — anti-theft USB sling / crossbody bag */
export const SLING_BAG_PRODUCTS: Product[] = [
  {
    id: "prod-sling-bag-ma",
    slug: SLING_BAG_SLUG,
    categoryId: "cat-MA",
    availableIn: ["MA"],
    priceUSD: 19.9,
    compareAtUSD: 29.9,
    marketPrices: { MA: 199 },
    marketComparePrices: { MA: 299 },
    discountBadgePercent: 33,
    nameAr: "حقيبة كتف ذكية مضادة للسرقة — منفذ USB · عرض محدود",
    nameEn: "Anti-Theft Smart Sling Bag — USB Port · Limited Offer",
    descriptionAr: `
<h3>عرض محدود… حقيبة أنيقة + قفل + شحن USB</h3>
<p>حقيبة كتف / صدر مضادة للسرقة: قفل برقم سري، منفذ شحن USB خارجي، قماش مقاوم للماء، وتنظيم داخلي للهاتف والباوربانك والسماعات. خفيفة ومريحة للمدينة والسفر.</p>
<ul>
<li>قفل أمان برقم سري ضد السرقة</li>
<li>منفذ شحن USB — وصل الباوربانك من الداخل</li>
<li>قماش مقاوم للماء + سحاب مرن</li>
<li>حزام مبطّن مريح + جيب على الحزام</li>
<li><strong>عرض محدود</strong> — 199 درهم فقط فالمغرب</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Limited offer — sleek bag + lock + USB charging</h3>
<p>An anti-theft sling / chest bag with a combination lock, external USB charging port, water-resistant fabric, and organized interior for phone, power bank and headphones. Light and comfortable for city and travel.</p>
<ul>
<li>Combination anti-theft lock</li>
<li>External USB port — charge from a power bank inside</li>
<li>Water-resistant fabric + durable zipper</li>
<li>Padded strap + strap pocket</li>
<li><strong>Limited offer</strong> — only 199 MAD in Morocco</li>
</ul>
${COD_EN}`.trim(),
    detailsAr: [
      "حقيبة كتف / صدر مضادة للسرقة",
      "قفل برقم سري (كلمة المرور الابتدائية 000)",
      "منفذ شحن USB خارجي",
      "قماش مقاوم للماء",
      "تنظيم داخلي (جيوب للتابلت / الباوربانك)",
      "حزام مبطّن قابل للتعديل",
      "عرض محدود — 199 درهم",
    ],
    detailsEn: [
      "Anti-theft sling / chest bag",
      "Combination lock (default code 000)",
      "External USB charging port",
      "Water-resistant fabric",
      "Organized interior (tablet / power-bank pockets)",
      "Padded adjustable strap",
      "Limited offer — 199 MAD",
    ],
    images: [...IMAGES],
    colors: [
      { id: "grey", nameAr: "رمادي", nameEn: "Grey", hex: "#5a5a5a" },
      { id: "black", nameAr: "أسود", nameEn: "Black", hex: "#1a1a1a" },
      { id: "navy", nameAr: "كحلي", nameEn: "Navy", hex: "#1e2a44" },
    ],
    customColorEnabled: false,
    qtyUpsellLocked: true,
    qtyUpsellEnabled: false,
    qtyOffers: [{ quantity: 1, discountPercent: 0 }],
    inStock: true,
    featured: true,
    rating: 0,
    reviewCount: 0,
    createdAt: "2026-10-26T18:00:00.000Z",
    landing: {
      style: "pro",
      highlights: [
        { icon: "sparkles", titleAr: "عرض محدود", titleEn: "Limited offer" },
        { icon: "shield", titleAr: "قفل ضد السرقة", titleEn: "Anti-theft lock" },
        { icon: "zap", titleAr: "منفذ USB", titleEn: "USB port" },
        { icon: "feather", titleAr: "مريحة وأنيقة", titleEn: "Comfortable & sleek" },
      ],
      headlineAr: "عرض محدود — حقيبة كتف ذكية بـ 199 درهم فقط",
      headlineEn: "Limited offer — smart sling bag for only 199 MAD",
      introAr:
        "حقيبة مضادة للسرقة بقفل برقم سري ومنفذ شحن USB، قماش يقاوم الماء، وحزام مريح. عرض محدود فالمغرب — 199 درهم بدل 299، توصيل مجاني والدفع عند الاستلام.",
      introEn:
        "An anti-theft bag with a combination lock and USB charging port, water-resistant fabric, and a comfortable strap. Limited offer in Morocco — 199 MAD instead of 299, free delivery and cash on delivery.",
      sections: [
        {
          titleAr: "عرض محدود… ميزات واضحة",
          titleEn: "Limited offer — clear features",
          bodyAr:
            "مقاومة للماء، منفذ USB، تصميم مضاد للسرقة، ومريحة وأنيقة — كلشي فالواجهة قدامك.",
          bodyEn:
            "Water-resistant, USB port, anti-theft design, comfortable and stylish — everything up front.",
          image: "/products/sling-bag-1-offer.webp",
        },
        {
          titleAr: "شحن والتيليفون مربوط فالحزام",
          titleEn: "Charge while your phone rides on the strap",
          bodyAr:
            "منفذ USB خارجي + جيب على الحزام — وصل الباوربانك من الداخل وشحن التيليفون وأنت كتمشي.",
          bodyEn:
            "External USB port + strap pocket — plug a power bank inside and charge your phone on the go.",
          image: "/products/sling-bag-2-offer.webp",
        },
        {
          titleAr: "قفل برقم سري… ومتعددة الوظائف",
          titleEn: "Combination lock — multi-function",
          bodyAr:
            "قفل سري يحمي السحاب، مع مخرج شحن وتنظيم داخلي واضح للسماعات والأجهزة.",
          bodyEn:
            "A combo lock secures the zipper, with a charging outlet and clear interior space for headphones and devices.",
          image: "/products/sling-bag-3-offer.webp",
        },
        {
          titleAr: "تنظيم داخلي مرتّب",
          titleEn: "Organized interior",
          bodyAr:
            "جيوب للتابلت والباوربانك والمحفظة، ومساحة للسماعات — بلا ما يختلط كلشي.",
          bodyEn:
            "Pockets for tablet, power bank and wallet, plus room for headphones — without everything mixing.",
          image: "/products/sling-bag-5-offer.webp",
        },
        {
          titleAr: "تفاصيل الجودة: سحاب، قفل، USB، مشبك",
          titleEn: "Quality details: zipper, lock, USB, buckle",
          bodyAr:
            "سحاب مرن، قفل أمان، منفذ USB، ومشبك معدني قوي — مصمّمة للاستعمال اليومي.",
          bodyEn:
            "Flexible zipper, security lock, USB port, and a strong metal buckle — built for daily use.",
          image: "/products/sling-bag-6-offer.webp",
        },
        {
          titleAr: "كيف تفتح القفل؟",
          titleEn: "How do you open the lock?",
          bodyAr:
            "الرقم الابتدائي 000 — دورو، اضغط على الزر الأزرق، وافتح السحاب بسهولة.",
          bodyEn:
            "Default code is 000 — dial it, press the blue button, and open the zipper smoothly.",
          image: "/products/sling-bag-8-offer.webp",
        },
        {
          titleAr: "للمدينة والسفر — بألوان متعددة",
          titleEn: "City and travel — several colors",
          bodyAr:
            "رمادي، أسود، أو كحلي — اختاري اللون اللي كيناسبك، ونفس الميزات: قفل + USB.",
          bodyEn:
            "Grey, black, or navy — pick the color that suits you, same features: lock + USB.",
          image: "/products/sling-bag-9-offer.webp",
        },
      ],
      benefitsAr: [
        "عرض محدود — 199 درهم بدل 299",
        "قفل برقم سري ضد السرقة",
        "منفذ شحن USB خارجي",
        "قماش مقاوم للماء",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Limited offer — 199 MAD instead of 299",
        "Combination anti-theft lock",
        "External USB charging port",
        "Water-resistant fabric",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "واش فيها قفل؟",
          questionEn: "Does it have a lock?",
          answerAr:
            "إيه — قفل برقم سري. الرقم الابتدائي عادة 000، ومن بعد تقدر تبدّلو.",
          answerEn:
            "Yes — a combination lock. The default code is usually 000, then you can change it.",
        },
        {
          questionAr: "كيفاش كيخدم منفذ USB؟",
          questionEn: "How does the USB port work?",
          answerAr:
            "تحط الباوربانك داخل الحقيبة وتوصل كابل للتيليفون عبر المنفذ الخارجي.",
          answerEn:
            "Put a power bank inside the bag and connect your phone through the external port.",
        },
        {
          questionAr: "كيف ندفع؟",
          questionEn: "How do I pay?",
          answerAr: "كتدفع 199 درهم عند الاستلام، والتوصيل مجاني فالمغرب.",
          answerEn: "You pay 199 MAD on delivery, and delivery is free in Morocco.",
        },
      ],
    },
  },
];
