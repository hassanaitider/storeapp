import type { Product } from "./types";

export const MATERNITY_BELT_SLUG = "ceinture-soutien-maternite";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const IMAGES = [
  "/products/maternity-belt-1.webp",
  "/products/maternity-belt-2.webp",
  "/products/maternity-belt-3.webp",
  "/products/maternity-belt-4.webp",
  "/products/maternity-belt-5.webp",
  "/products/maternity-belt-6.webp",
  "/products/maternity-belt-7.webp",
  "/products/maternity-belt-8.webp",
];

/** Morocco only — maternity / pregnancy belly support belt */
export const MATERNITY_BELT_PRODUCTS: Product[] = [
  {
    id: "prod-maternity-belt-ma",
    slug: MATERNITY_BELT_SLUG,
    categoryId: "cat-MA",
    availableIn: ["MA"],
    priceUSD: 24.9,
    compareAtUSD: 24.9,
    marketPrices: { MA: 249 },
    marketComparePrices: { MA: 249 },
    nameAr: "حزام دعم الحمل — رفع البطن ودعم الظهر",
    nameEn: "Maternity Support Belt — Belly Lift & Back Relief",
    descriptionAr: `
<h3>راحة للحامل… من الشهور الأولى حتى الولادة</h3>
<p>حزام دعم للحمل بتصميم <strong>3 في 1</strong>: يرفع البطن بلطف، يخفّف ضغط الجنين على الظهر والحوض، ويتعدّل على قدّك بفيلكرو. قماش مرن يتنفس — مناسب للدار، للمكتب، وللمشي اليومي.</p>
<ul>
<li>رفع البطن وتخفيف الضغط على أسفل الظهر</li>
<li>تصميم يتأقلم مع مراحل الحمل (3–5 · 5–7 · 7–10 أشهر)</li>
<li>قماش مرن مثقّب يدخل الهواء</li>
<li>إغلاق فيلكرو — تعدّلي الضغط كيف بغيتي</li>
<li>مقاسات: M · L · XL · XXL</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Comfort for pregnancy — from early months to delivery</h3>
<p>A maternity support belt with a <strong>3-in-1</strong> design: gently lifts the belly, eases fetal pressure on the back and pelvis, and adjusts to your size with Velcro. Flexible breathable fabric — for home, the office, and daily walks.</p>
<ul>
<li>Belly lift and lower-back pressure relief</li>
<li>Adapts through pregnancy stages (3–5 · 5–7 · 7–10 months)</li>
<li>Flexible perforated fabric that breathes</li>
<li>Velcro closure — set the pressure you need</li>
<li>Sizes: M · L · XL · XXL</li>
</ul>
${COD_EN}`.trim(),
    detailsAr: [
      "حزام دعم حمل — رفع البطن + دعم الظهر",
      "تصميم 3 في 1 حسب مرحلة الحمل",
      "قماش مرن يتنفس",
      "إغلاق فيلكرو قابل للتعديل",
      "مقاسات M / L / XL / XXL",
      "خفيف ويتلبس تحت الحوايج",
    ],
    detailsEn: [
      "Maternity belt — belly lift + back support",
      "3-in-1 design by pregnancy stage",
      "Flexible breathable fabric",
      "Adjustable Velcro closure",
      "Sizes M / L / XL / XXL",
      "Light enough to wear under clothes",
    ],
    images: [...IMAGES],
    colors: [],
    customColorEnabled: false,
    sizes: ["M", "L", "XL", "XXL"],
    qtyUpsellLocked: true,
    qtyUpsellEnabled: false,
    qtyOffers: [{ quantity: 1, discountPercent: 0 }],
    inStock: true,
    featured: true,
    rating: 0,
    reviewCount: 0,
    createdAt: "2026-10-23T00:00:00.000Z",
    landing: {
      style: "pro",
      highlights: [
        { icon: "shield", titleAr: "رفع البطن", titleEn: "Belly lift" },
        { icon: "heart", titleAr: "تخفيف الظهر", titleEn: "Back relief" },
        { icon: "wind", titleAr: "قماش يتنفس", titleEn: "Breathable" },
        { icon: "ruler", titleAr: "مقاسات M–XXL", titleEn: "Sizes M–XXL" },
      ],
      headlineAr: "حزام دعم الحمل — راحة من أول الشهور حتى الولادة",
      headlineEn: "Maternity support belt — comfort from early months to delivery",
      introAr:
        "حزام 3 في 1 كيرفع البطن بلطف وكيخفّف الضغط على الظهر والحوض، وكيتعادّل مع نمو الحمل. قماش مرن يتنفس وفيلكرو سهل التعديل. الثمن 249 درهم فقط — توصيل مجاني والدفع عند الاستلام فالمغرب.",
      introEn:
        "A 3-in-1 belt that gently lifts the belly and eases pressure on the back and pelvis as pregnancy grows. Flexible breathable fabric and easy Velcro adjustment. Only 249 MAD — free delivery and cash on delivery in Morocco.",
      sections: [
        {
          titleAr: "دعم واضح للبطن والظهر",
          titleEn: "Clear support for belly and back",
          bodyAr:
            "الشريط السفلي كيرفع البطن، والشريط العلوي كيثبّت الحزام — باش يقلّ الضغط على أسفل الظهر والحوض.",
          bodyEn:
            "The lower band lifts the belly; the upper strap steadies the belt — so pressure on the lower back and pelvis eases.",
          image: "/products/maternity-belt-1.webp",
        },
        {
          titleAr: "3 مراحل… نفس الحزام",
          titleEn: "3 stages — one belt",
          bodyAr:
            "من 3–5 أشهر استعمال بسيط، من 5–7 أشهر دعم أقوى للخصر، ومن 7–10 أشهر النظام الكامل 3 في 1.",
          bodyEn:
            "From 3–5 months for light daily wear, 5–7 months for stronger waist support, and 7–10 months with the full 3-in-1 setup.",
          image: "/products/maternity-belt-2.webp",
        },
        {
          titleAr: "قماش مرن يتنفس",
          titleEn: "Flexible fabric that breathes",
          bodyAr:
            "حزام مطاطي مثقّب يدخل الهواء، مع خياطة مزدوجة وتصميم دعم مريح طول النهار.",
          bodyEn:
            "Perforated elastic fabric lets air through, with double stitching and a support design built for all-day comfort.",
          image: "/products/maternity-belt-3.webp",
        },
        {
          titleAr: "فيلكرو + تصميم ثلاثي الأبعاد",
          titleEn: "Velcro + 3D lift design",
          bodyAr:
            "تعدّلي القد والضغط فثواني، وتصميم ثلاثي الأبعاد كيرفع البطن بشكل مريح بلا ما يضغط زيادة.",
          bodyEn:
            "Adjust size and pressure in seconds; the 3D design lifts the belly comfortably without over-tightening.",
          image: "/products/maternity-belt-4.webp",
        },
        {
          titleAr: "يتلبس تحت الحوايج",
          titleEn: "Wear under your clothes",
          bodyAr:
            "لون بيج ناعم وخفيف — مناسب للدار، للمشي، ولا للمكتب بلا ما يبان بزاف تحت اللباس.",
          bodyEn:
            "A soft nude tone and light profile — fine at home, on walks, or at the office without showing much under clothes.",
          image: "/products/maternity-belt-5.webp",
        },
        {
          titleAr: "اختاري المقاس المناسب",
          titleEn: "Pick the right size",
          bodyAr:
            "مقاسات M · L · XL · XXL مع جدول أبعاد واضح باش تلقاي القد اللي يناسبك.",
          bodyEn:
            "Sizes M · L · XL · XXL with a clear size chart so you find the fit that works for you.",
          image: "/products/maternity-belt-6.webp",
        },
        {
          titleAr: "تفاصيل الجودة قدام عينك",
          titleEn: "Quality details up close",
          bodyAr:
            "قماش مثقّب، أشرطة مرنة، وحواف مخيطة بعناية — باش يبقى الحزام مريح ومتين مع الاستعمال اليومي.",
          bodyEn:
            "Perforated fabric, flexible straps, and carefully finished edges — so the belt stays comfortable and durable with daily use.",
          image: "/products/maternity-belt-7.webp",
        },
      ],
      benefitsAr: [
        "رفع البطن وتخفيف ضغط الحمل",
        "دعم أسفل الظهر والحوض",
        "يتأقلم مع مراحل الحمل",
        "قماش يتنفس + فيلكرو قابل للتعديل",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Belly lift and pregnancy pressure relief",
        "Lower back and pelvic support",
        "Adapts through pregnancy stages",
        "Breathable fabric + adjustable Velcro",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "منين نقدر نلبسو؟",
          questionEn: "From which month can I wear it?",
          answerAr:
            "من الشهور الأولى (حوالي 3 أشهر) حتى آخر الحمل — كيزيد الدعم حسب المرحلة.",
          answerEn:
            "From the early months (around month 3) through late pregnancy — support increases by stage.",
        },
        {
          questionAr: "واش كاينين مقاسات؟",
          questionEn: "Are there sizes?",
          answerAr: "إيه — M · L · XL · XXL. اختاري المقاس فصفحة الطلب.",
          answerEn: "Yes — M · L · XL · XXL. Choose your size on the order form.",
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
