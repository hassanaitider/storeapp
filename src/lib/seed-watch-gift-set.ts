import type { Product } from "./types";

export const WATCH_GIFT_SET_SLUG = "coffret-montre-bijoux-femme";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/watch-gift-set-1-offer.webp",
  "/products/watch-gift-set-2-offer.webp",
  "/products/watch-gift-set-3-offer.webp",
  "/products/watch-gift-set-4-offer.webp",
  "/products/watch-gift-set-5-offer.webp",
];

/** Morocco only — women's smartwatch + jewelry gift set (A58 Plus) */
export const WATCH_GIFT_SET_PRODUCTS: Product[] = [
  {
    id: "prod-watch-gift-set-ma",
    slug: WATCH_GIFT_SET_SLUG,
    categoryId: "cat-MA",
    availableIn: ["MA"],
    priceUSD: 27.5,
    compareAtUSD: 39.9,
    marketPrices: { MA: 275 },
    marketComparePrices: { MA: 399 },
    discountBadgePercent: 31,
    nameAr: "طقم ساعة ذكية + مجوهرات للمرأة — عرض محدود",
    nameEn: "Women's Smartwatch + Jewelry Gift Set — Limited Offer",
    descriptionAr: `
<h3>عرض محدود… طقم كامل فبوكس واحد</h3>
<p>ساعة ذكية A58 Plus مع شاشة كبيرة، ساعة كوارتز مرصّعة، سوار، عقد، حلق، خاتم، حزام إضافي وكابل شحن — كلشي مرتّب فبوكس وردي أنيق. مثالي كهدية أو لنفسكِ.</p>
<ul>
<li>ساعة ذكية بشاشة لمس كبيرة (~2.0 إنش)</li>
<li>ساعة كوارتز مرصّعة + مجوهرات مطابقة</li>
<li>حزام سيليكون إضافي + كابل شحن مغناطيسي</li>
<li>بوكس هدية وردي جاهز للتقديم</li>
<li><strong>عرض محدود</strong> — 275 درهم فقط فالمغرب</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Limited offer — a full set in one box</h3>
<p>A58 Plus smartwatch with a large screen, a crystal quartz watch, bracelet, necklace, earrings, ring, extra strap and charging cable — all in a pretty pink gift box. Perfect as a gift or for yourself.</p>
<ul>
<li>Smartwatch with a large touch screen (~2.0\")</li>
<li>Crystal quartz watch + matching jewelry</li>
<li>Extra silicone strap + magnetic charging cable</li>
<li>Pink gift box ready to give</li>
<li><strong>Limited offer</strong> — only 275 MAD in Morocco</li>
</ul>
${COD_EN}`.trim(),
    detailsAr: [
      "ساعة ذكية A58 Plus — شاشة لمس كبيرة",
      "ساعة كوارتز مرصّعة",
      "سوار + عقد + حلق + خاتم",
      "حزام سيليكون إضافي",
      "كابل شحن مغناطيسي",
      "بوكس هدية وردي",
      "عرض محدود — 275 درهم",
    ],
    detailsEn: [
      "A58 Plus smartwatch — large touch screen",
      "Crystal quartz watch",
      "Bracelet + necklace + earrings + ring",
      "Extra silicone strap",
      "Magnetic charging cable",
      "Pink gift box",
      "Limited offer — 275 MAD",
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
    createdAt: "2026-10-26T00:00:00.000Z",
    landing: {
      style: "pro",
      highlights: [
        { icon: "sparkles", titleAr: "عرض محدود", titleEn: "Limited offer" },
        { icon: "package", titleAr: "طقم كامل", titleEn: "Full gift set" },
        { icon: "zap", titleAr: "ساعة ذكية", titleEn: "Smartwatch" },
        { icon: "heart", titleAr: "مجوهرات مطابقة", titleEn: "Matching jewelry" },
      ],
      headlineAr: "عرض محدود — طقم ساعة ذكية ومجوهرات بـ 275 درهم فقط",
      headlineEn: "Limited offer — smartwatch & jewelry set for only 275 MAD",
      introAr:
        "بوكس وردي كامل: ساعة ذكية، ساعة كوارتز مرصّعة، سوار، عقد، حلق، خاتم، حزام إضافي وكابل شحن. عرض محدود فالمغرب — 275 درهم بدل 399، توصيل مجاني والدفع عند الاستلام.",
      introEn:
        "A full pink gift box: smartwatch, crystal quartz watch, bracelet, necklace, earrings, ring, extra strap and charger. Limited offer in Morocco — 275 MAD instead of 399, free delivery and cash on delivery.",
      sections: [
        {
          titleAr: "عرض محدود… بوكس هدية كامل",
          titleEn: "Limited offer — a complete gift box",
          bodyAr:
            "كلشي مرتّب فبوكس وردي أنيق: ساعتين، مجوهرات، حزام وكابل. جاهز كهدية بلا ما تزيدي شي.",
          bodyEn:
            "Everything arranged in a pretty pink box: two watches, jewelry, strap and cable. Gift-ready with nothing extra to buy.",
          image: "/products/watch-gift-set-1-offer.webp",
        },
        {
          titleAr: "ساعة ذكية A58 Plus",
          titleEn: "A58 Plus smartwatch",
          bodyAr:
            "شاشة لمس كبيرة (~2.0 إنش)، بلوتوث، بطارية ليثيوم، وشحن مغناطيسي — مع حزام سيليكون مريح.",
          bodyEn:
            "Large touch screen (~2.0\"), Bluetooth, lithium battery, and magnetic charging — with a comfortable silicone strap.",
          image: "/products/watch-gift-set-2-offer.webp",
        },
        {
          titleAr: "ألوان متعددة… نفس الطقم",
          titleEn: "Several colors — same set",
          bodyAr:
            "اختاري الحزام اللي كيناسبك (وردي، أسود، رمادي…) مع ساعة كوارتز مرصّعة ومجوهرات مطابقة.",
          bodyEn:
            "Pick the strap that suits you (pink, black, grey…) with a crystal quartz watch and matching jewelry.",
          image: "/products/watch-gift-set-3-offer.webp",
        },
        {
          titleAr: "الساعة الذكية قدام عينك",
          titleEn: "See the smartwatch clearly",
          bodyAr:
            "تصميم أنثوي بلون وردي/ذهبي وردي، شاشة واضحة، وحزام ناعم للاستعمال اليومي.",
          bodyEn:
            "A feminine rose-gold / pink look, a clear screen, and a soft strap for everyday wear.",
          image: "/products/watch-gift-set-4-offer.webp",
        },
        {
          titleAr: "طقم كامل جاهز للتقديم",
          titleEn: "A complete set ready to gift",
          bodyAr:
            "البوكس كايورّي المحتوى كامل — مثالي كهدية للعيد، عيد الميلاد، ولا لأي مناسبة.",
          bodyEn:
            "The box shows the full contents — ideal as a gift for Eid, a birthday, or any occasion.",
          image: "/products/watch-gift-set-5-offer.webp",
        },
      ],
      benefitsAr: [
        "عرض محدود — 275 درهم بدل 399",
        "ساعة ذكية + ساعة كوارتز",
        "مجوهرات كاملة (سوار، عقد، حلق، خاتم)",
        "حزام إضافي + كابل شحن",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Limited offer — 275 MAD instead of 399",
        "Smartwatch + quartz watch",
        "Full jewelry (bracelet, necklace, earrings, ring)",
        "Extra strap + charging cable",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "شنو كاين فالبوكس؟",
          questionEn: "What's in the box?",
          answerAr:
            "ساعة ذكية، ساعة كوارتز مرصّعة، سوار، عقد، حلق، خاتم، حزام سيليكون إضافي، وكابل شحن.",
          answerEn:
            "A smartwatch, a crystal quartz watch, bracelet, necklace, earrings, ring, an extra silicone strap, and a charging cable.",
        },
        {
          questionAr: "واش العرض محدود؟",
          questionEn: "Is this a limited offer?",
          answerAr: "إيه — عرض محدود بـ 275 درهم بدل 399 فالمغرب، والتوصيل مجاني.",
          answerEn: "Yes — a limited offer at 275 MAD instead of 399 in Morocco, with free delivery.",
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
