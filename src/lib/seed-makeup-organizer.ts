import type { Product } from "./types";

export const MAKEUP_ORGANIZER_SLUG = "malette-maquillage-miroir-led";

const IMAGES = [
  "/products/makeup-organizer-primary.webp",
  "/products/makeup-organizer-hero.webp",
  "/products/makeup-organizer-open.webp",
  "/products/makeup-organizer-battery.webp",
  "/products/makeup-organizer-mirror.webp",
  "/products/makeup-organizer-storage.webp",
];

export const MAKEUP_ORGANIZER_PRODUCTS: Product[] = [
  {
    id: "prod-makeup-organizer-ma",
    slug: MAKEUP_ORGANIZER_SLUG,
    categoryId: "cat-MA",
    availableIn: ["MA"],
    priceUSD: 29.9,
    compareAtUSD: 29.9,
    marketPrices: { MA: 299 },
    marketComparePrices: { MA: 299 },
    nameAr: "حقيبة تنظيم المكياج بمراية وإضاءة LED",
    nameEn: "LED Mirror Makeup Organizer Case",
    descriptionAr: `
<h3>مرايتك وإضاءة المكياج… معاك فين ما مشيتي</h3>
<p>حقيبة عملية كتجمع مراية مضوية LED مع مساحة منظمة للمكياج والإكسسوارات. اختاري بين 3 ألوان ديال الضوء، رتّبي مستحضراتك فالأقسام الداخلية، وسدّي الحقيبة باش تبقى كل حاجة مجموعة فالدار ولا فالسفر.</p>
<ul>
<li>مراية بإضاءة LED مدمجة وزر لمس</li>
<li>3 اختيارات للإضاءة: باردة، طبيعية ودافئة</li>
<li>بطارية قابلة للشحن 2000mAh مع شحن USB</li>
<li>أقسام داخلية لترتيب مستحضرات التجميل</li>
<li>تصميم محمول بمقبض وسحاب للإغلاق</li>
</ul>
<p>الثمن 299 درهم — التوصيل مجاني والدفع عند الاستلام فالمغرب. مستحضرات التجميل غير مشمولة.</p>`.trim(),
    descriptionEn: `
<h3>Your lit vanity mirror, ready to travel</h3>
<p>A practical case combining a built-in LED mirror with organized storage for makeup and accessories. Choose between three light tones, arrange your essentials in the interior compartments, and zip everything together at home or on the go.</p>
<ul>
<li>Built-in LED mirror with touch control</li>
<li>Three light tones: cool, natural and warm</li>
<li>Rechargeable 2000mAh battery with USB charging</li>
<li>Interior compartments for makeup organization</li>
<li>Portable case with handle and zip closure</li>
</ul>
<p>299 MAD — free delivery and cash on delivery in Morocco. Makeup products are not included.</p>`.trim(),
    detailsAr: [
      "حقيبة تنظيم للمكياج بمراية LED مدمجة",
      "3 ألوان للإضاءة: باردة، طبيعية ودافئة",
      "تحكم باللمس في المراية",
      "بطارية قابلة للشحن بسعة 2000mAh",
      "الشحن عبر USB",
      "أقسام داخلية للتخزين ومقبض للحمل",
      "مستحضرات التجميل غير مشمولة",
    ],
    detailsEn: [
      "Makeup organizer case with built-in LED mirror",
      "Three light tones: cool, natural and warm",
      "Touch control on the mirror",
      "Rechargeable 2000mAh battery",
      "USB charging",
      "Interior storage compartments and carry handle",
      "Makeup products are not included",
    ],
    images: [...IMAGES],
    colors: [
      {
        id: "rose",
        nameAr: "وردي",
        nameEn: "Rose",
        hex: "#E88BA8",
      },
      {
        id: "black",
        nameAr: "أسود",
        nameEn: "Noir",
        hex: "#171717",
      },
    ],
    customColorEnabled: false,
    qtyUpsellLocked: true,
    qtyUpsellEnabled: false,
    qtyOffers: [{ quantity: 1, discountPercent: 0 }],
    inStock: true,
    featured: true,
    rating: 0,
    reviewCount: 0,
    createdAt: "2026-11-09T00:00:00.000Z",
    landing: {
      style: "pro",
      highlights: [
        { icon: "sparkles", titleAr: "مراية LED", titleEn: "LED mirror" },
        { icon: "sun", titleAr: "3 ألوان للضوء", titleEn: "3 light tones" },
        { icon: "battery", titleAr: "شحن USB", titleEn: "USB charging" },
        { icon: "package", titleAr: "تنظيم محمول", titleEn: "Portable storage" },
      ],
      headlineAr: "حقيبة مكياج بمراية LED — أناقتك مرتبة فين ما كنتي",
      headlineEn: "LED mirror makeup case — your essentials, neatly together",
      introAr:
        "مراية مضوية، 3 ألوان ديال الإضاءة، وبلاصة منظمة للمكياج في حقيبة وحدة. خديها معاك من الدار للسفر — بـ299 درهم، والتوصيل مجاني والدفع عند الاستلام فالمغرب.",
      introEn:
        "A lit mirror, three light tones and organized makeup storage in one portable case. Take it from home to travel — 299 MAD with free delivery and cash on delivery in Morocco.",
      sections: [
        {
          titleAr: "إضاءة تختاريها على حساب المكان",
          titleEn: "Choose the light for your setting",
          bodyAr:
            "بدّلي بين الإضاءة الباردة والطبيعية والدافئة باش تختاري الجو اللي مناسب ليك وقت التزيّن.",
          bodyEn:
            "Switch between cool, natural and warm light to choose the setting that suits your routine.",
          image: IMAGES[4],
        },
        {
          titleAr: "مكياجك مجموع ومرتب",
          titleEn: "Keep your makeup together",
          bodyAr:
            "الأقسام الداخلية كتعاونك ترتبي المستحضرات والإكسسوارات وتلقاي كل حاجة بسهولة.",
          bodyEn:
            "Interior compartments help organize your products and accessories so they are easy to find.",
          image: IMAGES[5],
        },
        {
          titleAr: "مراية مضوية قابلة للشحن",
          titleEn: "A rechargeable lighted mirror",
          bodyAr:
            "المراية فيها تحكم باللمس وبطارية 2000mAh كتتشحن عبر USB، باش تبقى واجدة للاستعمال.",
          bodyEn:
            "The mirror has touch control and a 2000mAh rechargeable battery with USB charging.",
          image: IMAGES[3],
        },
        {
          titleAr: "من التسريحة حتى للسفر",
          titleEn: "From your vanity to your suitcase",
          bodyAr:
            "سدّي الحقيبة بالسحاب وشديها من المقبض. تصميم واحد كيجمع التخزين والمراية فبلاصة وحدة.",
          bodyEn:
            "Zip the case closed and carry it by the handle. Storage and a mirror come together in one piece.",
          image: IMAGES[5],
        },
      ],
      benefitsAr: [
        "مراية LED بثلاثة ألوان للإضاءة",
        "بطارية قابلة للشحن عبر USB",
        "أقسام داخلية لتنظيم المستحضرات",
        "مقبض وسحاب لسهولة الحمل",
        "299 درهم مع التوصيل المجاني",
        "الدفع عند الاستلام فالمغرب",
      ],
      benefitsEn: [
        "LED mirror with three light tones",
        "Rechargeable battery with USB charging",
        "Interior compartments for organization",
        "Handle and zipper for carrying",
        "299 MAD with free delivery",
        "Cash on delivery in Morocco",
      ],
      faq: [
        {
          questionAr: "شحال الثمن والتوصيل؟",
          questionEn: "How much is it, and is delivery included?",
          answerAr: "الثمن 299 درهم والتوصيل مجاني لجميع المدن المغربية.",
          answerEn: "It costs 299 MAD, with free delivery across Morocco.",
        },
        {
          questionAr: "كيفاش كنشحن المراية؟",
          questionEn: "How do I charge the mirror?",
          answerAr: "المراية فيها بطارية 2000mAh وكتتشحن عبر USB.",
          answerEn: "The mirror has a 2000mAh battery that charges via USB.",
        },
        {
          questionAr: "واش المكياج اللي باين فالصور داخل مع الحقيبة؟",
          questionEn: "Are the makeup products shown in the photos included?",
          answerAr: "لا، العرض كيشمل الحقيبة والمراية فقط. مستحضرات التجميل غير مشمولة.",
          answerEn: "No. The offer includes the case and mirror only. Makeup products are not included.",
        },
        {
          questionAr: "كيفاش نخلص؟",
          questionEn: "How can I pay?",
          answerAr: "كتخلصي 299 درهم ملي توصلك الطلبية، والتوصيل مجاني.",
          answerEn: "Pay 299 MAD when your order arrives. Delivery is free.",
        },
      ],
    },
  },
];