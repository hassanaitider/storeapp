import { STORE_MARKETS } from "./countries";
import type { Category, Product } from "./types";

const CATEGORY_IMAGES: Record<string, string> = {
  MA: "/products/fashion-sling-1.png",
  SA: "/products/car-vacuum.png",
  AE: "/products/air-bed.png",
  OM: "/products/neck-massager.webp",
};

/** Morocco, Saudi Arabia, UAE, and Oman */
export const SEED_CATEGORIES: Category[] = STORE_MARKETS.map((c) => ({
  id: `cat-${c.code}`,
  slug: `products-${c.code.toLowerCase()}`,
  nameAr: `منتجات ${c.nameAr}`,
  nameEn: `${c.nameEn} Products`,
  descriptionAr: `تشكيلة مختارة لسوق ${c.nameAr} بأسعار ${c.currency}`,
  descriptionEn: `Curated picks for ${c.nameEn} priced in ${c.currency}`,
  image: CATEGORY_IMAGES[c.code] ?? "/products/car-vacuum.png",
  createdAt: "2026-03-01T00:00:00.000Z",
  country: c.code,
  availableIn: [c.code],
}));

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

export const SEED_PRODUCTS: Product[] = [
  {
    id: "prod-fashion-sling",
    slug: "anti-theft-usb-sling-bag",
    nameAr: "حقيبة كتف مضادة للسرقة بمنفذ USB",
    nameEn: "Anti-Theft USB Sling Bag",
    descriptionAr: `
<h3>أناقتك… وحمايتك… في حقيبة واحدة</h3>
<p>حقيبة صدر عصرية للمدينة والسفر: تصميم أنيق، قفل رقمي مضاد للسرقة، ومنفذ شحن USB خارجي لشحن هاتفك وأنت في الطريق. خفيفة، مقاومة للماء، وتسع تابلت 9.7 إنش.</p>
<ul>
<li>قفل تركيبة رقمي يحمي السحّابات</li>
<li>منفذ USB خارجي لشحن الهاتف عبر باور بانك داخلي</li>
<li>سعة منظمة: تابلت، سماعات، محفظة، باور بانك</li>
<li>ألوان: أسود · رمادي · أسود/برونزي</li>
<li>مقاس تقريبي: 32 × 16 × 9 سم</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Style and security — in one bag</h3>
<p>A modern chest sling for city and travel: sleek design, anti-theft combination lock, and an external USB port to charge your phone on the go. Light, water-resistant, and fits a 9.7" tablet.</p>
<ul>
<li>Combination lock secures the zipper pulls</li>
<li>External USB port for phone charging via an internal power bank</li>
<li>Organized capacity: tablet, headphones, wallet, power bank</li>
<li>Colors: Black · Grey · Black/Bronze</li>
<li>Approx. size: 32 × 16 × 9 cm</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "قفل تركيبة رقمي مضاد للسرقة",
      "منفذ شحن USB خارجي",
      "مادة مقاومة للماء بلمسة فاخرة",
      "تتسع لتابلت 9.7 إنش",
      "حزام كتف مبطّن قابل للتعديل",
      "مقاس: 32 × 16 × 9 سم",
    ],
    detailsEn: [
      "Anti-theft combination lock",
      "External USB charging port",
      "Water-resistant premium finish",
      "Fits a 9.7-inch tablet",
      "Padded adjustable shoulder strap",
      "Size: 32 × 16 × 9 cm",
    ],
    priceUSD: 39,
    compareAtUSD: 59,
    marketPrices: { MA: 249, SA: 149, AE: 145, OM: 14.9 },
    marketComparePrices: { MA: 399, SA: 229, AE: 219, OM: 22.9 },
    availableIn: ["MA"],
    images: [
      "/products/fashion-sling-1.png",
      "/products/fashion-sling-2.png",
      "/products/fashion-sling-3.png",
      "/products/fashion-sling-4.png",
      "/products/fashion-sling-5.png",
    ],
    colors: [],
    customColorEnabled: true,
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 186,
    categoryId: "cat-MA",
    createdAt: "2026-08-21T00:00:00.000Z",
    landing: {
      headlineAr: "حقيبة أنيقة… محمية… وجاهزة للشحن",
      headlineEn: "Sleek, secure, and charge-ready",
      introAr:
        "صُممت لحياتك اليومية في المدينة والسفر: شكل عمودي أنيق، قفل رقمي يحمي أغراضك، ومنفذ USB يبقي هاتفك مشحونًا. اختر لونك المفضل واطلب الآن — توصيل مجاني والدفع عند الاستلام في المغرب.",
      introEn:
        "Built for daily city life and travel: a sleek vertical shape, a digital lock that protects your essentials, and a USB port that keeps your phone charged. Pick your color and order now — free delivery and cash on delivery in Morocco.",
      sections: [
        {
          titleAr: "تصميم يلفت الأنظار",
          titleEn: "A look that stands out",
          bodyAr:
            "واجهة سوداء أنيقة مع كلمة FASHION ولمسة برونزية عصرية. تظهر الحقيبة على الصدر بشكل عملي وأنيق — مثالية للعمل، الجولات، وركوب الدراجة النارية.",
          bodyEn:
            "A sleek black face with FASHION branding and a modern bronze accent. It sits cleanly across the chest — ideal for work, city walks, and motorcycle rides.",
          image: "/products/fashion-sling-1.png",
        },
        {
          titleAr: "جاهزة للطريق والمدينة",
          titleEn: "Ready for the road and the city",
          bodyAr:
            "مقبض علوي وحزام كتف مبطّن لراحة طوال اليوم. احملها بثقة بجانب الدراجة أو في التنقل اليومي — خفيفة ومتينة في الوقت نفسه.",
          bodyEn:
            "A top handle and padded strap for all-day comfort. Carry it with confidence next to your bike or on your daily commute — light yet durable.",
          image: "/products/fashion-sling-2.png",
        },
        {
          titleAr: "اشحن هاتفك… وأنت تتحرك",
          titleEn: "Charge while you move",
          bodyAr:
            "ضع باور بانك داخل الحقيبة وصِل هاتفك عبر منفذ USB الخارجي. شحن مستمر دون فتح الحقيبة — مثالي للرحلات والتنقل الطويل.",
          bodyEn:
            "Keep a power bank inside and plug your phone into the external USB port. Charge without opening the bag — perfect for trips and long days out.",
          image: "/products/fashion-sling-3.png",
        },
        {
          titleAr: "تنظيم ذكي لأجهزتك",
          titleEn: "Smart organization for your gear",
          bodyAr:
            "حجرة رئيسية واسعة مع جيب داخلي: تناسب السماعات الكبيرة، التابلت، الهاتف، والباور بانك. كل شيء في مكانه… بدون فوضى.",
          bodyEn:
            "A roomy main compartment with an inner pocket fits large headphones, a tablet, phone, and power bank. Everything in place — no clutter.",
          image: "/products/fashion-sling-4.png",
        },
        {
          titleAr: "مقاس عملي يتسع للتابلت",
          titleEn: "Practical size — fits your tablet",
          bodyAr:
            "الأبعاد التقريبية 32 × 16 × 9 سم تتسع لتابلت 9.7 إنش. قفل تركيبة رقمي يحمي السحّابات من الفتح غير المرغوب — أمان إضافي في الأماكن المزدحمة.",
          bodyEn:
            "Approx. 32 × 16 × 9 cm — fits a 9.7-inch tablet. A combination lock secures the zippers against unwanted opening — extra safety in crowded places.",
          image: "/products/fashion-sling-5.png",
        },
      ],
      benefitsAr: [
        "قفل مضاد للسرقة",
        "منفذ USB للشحن",
        "مقاومة للماء",
        "تتسع لتابلت 9.7″",
        "ألوان متعددة — اكتب لونك",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Anti-theft lock",
        "USB charging port",
        "Water-resistant",
        "Fits 9.7″ tablet",
        "Multiple colors — type yours",
        "Free delivery and COD",
      ],
      faq: [
        {
          questionAr: "هل الشحن يحتاج باور بانك؟",
          questionEn: "Does charging need a power bank?",
          answerAr:
            "نعم — المنفذ الخارجي يمرّر الشحن من باور بانك تضعه داخل الحقيبة إلى هاتفك. (الباور بانك غير مرفق عادةً).",
          answerEn:
            "Yes — the external port routes power from a bank you place inside the bag to your phone. (Power bank usually not included.)",
        },
        {
          questionAr: "ما الألوان المتوفرة؟",
          questionEn: "What colors are available?",
          answerAr:
            "أسود، رمادي، وأسود/برونزي. اكتب اللون المفضل في صفحة المنتج قبل الطلب.",
          answerEn:
            "Black, grey, and black/bronze. Type your preferred color on the product page before ordering.",
        },
        {
          questionAr: "هل تناسب التابلت؟",
          questionEn: "Will it fit a tablet?",
          answerAr: "نعم، تتسع عادةً لتابلت بحجم 9.7 إنش حسب الغلاف.",
          answerEn: "Yes — typically fits a 9.7-inch tablet depending on the case.",
        },
      ],
    },
  },
  {
    id: "prod-rolling-cart",
    slug: "3-tier-rolling-storage-cart",
    nameAr: "عربة تخزين متنقلة 3 مستويات بسطح خشبي",
    nameEn: "3-Tier Rolling Storage Cart",
    descriptionAr: `
<h3>تنظيم أنيق… يتحرك معك</h3>
<p>طاولة جانبية وعربة تخزين في قطعة واحدة: سطح خشبي أنيق + سلتان معدنيتان عميقتان + عجلات 360° صامتة مع فرامل. مثالية للصالة، غرفة النوم، المكتب أو المطبخ.</p>
<ul>
<li>سطح خشبي سميك لوضع الإضاءة والكتب والمشروبات</li>
<li>سلتان معدنيتان بسعة كبيرة وتثبيت آمن</li>
<li>عجلات كونية 360° صامتة لا تخدش الأرضية</li>
<li>نظام فرامل للتثبيت عند الحاجة</li>
<li>هيكل أنابيب معدنية متين بلون أسود مطفي</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Stylish storage that moves with you</h3>
<p>A side table and storage cart in one: elegant wood top + two deep metal baskets + silent 360° casters with brakes. Perfect for the living room, bedroom, office, or kitchen.</p>
<ul>
<li>Thick wood-grain top for lamps, books, and drinks</li>
<li>Two deep metal baskets with secure capacity</li>
<li>Silent 360° casters that won’t mark floors</li>
<li>Brake system to lock when needed</li>
<li>Sturdy matte-black tubular metal frame</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "3 مستويات: سطح خشبي + سلتان معدنيتان",
      "عجلات 360° صامتة مع فرامل",
      "هيكل معدني متين مقاوم للتشوه",
      "مثالية كطاولة جانبية أو عربة تنظيم",
      "سهلة التحريك بين الغرف",
    ],
    detailsEn: [
      "3 tiers: wood top + two metal baskets",
      "Silent 360° casters with brakes",
      "Sturdy metal frame that resists bending",
      "Ideal as a side table or organizer cart",
      "Easy to move between rooms",
    ],
    priceUSD: 55,
    compareAtUSD: 89,
    marketPrices: { MA: 329, SA: 199, AE: 189, OM: 19.9 },
    marketComparePrices: { MA: 499, SA: 299, AE: 289, OM: 29.9 },
    availableIn: ["MA"],
    images: [
      "/products/rolling-cart-1.png",
      "/products/rolling-cart-2.png",
      "/products/rolling-cart-3.png",
      "/products/rolling-cart-4.png",
      "/products/rolling-cart-demo.gif",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 128,
    categoryId: "cat-MA",
    createdAt: "2026-08-21T12:00:00.000Z",
    landing: {
      headlineAr: "طاولة جانبية… وعربة تخزين… في قطعة واحدة",
      headlineEn: "Side table and storage cart — in one piece",
      introAr:
        "رتّب كتبك وإضاءتك وأغراضك اليومية على تصميم عصري يتحرك بسهولة بين الغرف. سطح خشبي أنيق، سلتان عميقتان، وعجلات صامتة مع فرامل — حل عملي للمنازل المغربية الحديثة.",
      introEn:
        "Organize books, lighting, and daily essentials on a modern design that rolls easily between rooms. Elegant wood top, two deep baskets, and silent casters with brakes — practical for modern Moroccan homes.",
      sections: [
        {
          titleAr: "عجلات صامتة مع فرامل أمان",
          titleEn: "Silent wheels with safety brakes",
          bodyAr:
            "عجلات كونية 360° تتحرك بسلاسة دون إزعاج ودون خدش الأرضية. عند التثبيت، فعّل الفرامل لوضع أغراض أكبر بثبات وأمان.",
          bodyEn:
            "360° casters glide smoothly without noise or floor marks. When parked, engage the brakes to place larger items safely and securely.",
          image: "/products/rolling-cart-1.png",
        },
        {
          titleAr: "سعة كبيرة… وتنظيم مرتب",
          titleEn: "Large capacity — tidy organization",
          bodyAr:
            "سلتان معدنيتان عميقتان تستوعبان الكتب والديكور والسلال. ضع ما تريد بثقة — الجوانب مرتفعة لتقليل السقوط.",
          bodyEn:
            "Two deep metal baskets hold books, décor, and organizers. Place items with confidence — high sides help keep everything in place.",
          image: "/products/rolling-cart-2.png",
        },
        {
          titleAr: "سطح خشبي أنيق للاستخدام اليومي",
          titleEn: "Elegant wood top for daily use",
          bodyAr:
            "لوحة سميكة بحواف مستديرة تصلح كطاولة جانبية بجانب الكنبة أو السرير: إضاءة، مشروب، أو دفتر ملاحظات دائمًا في متناولك.",
          bodyEn:
            "A thick rounded-corner board works as a side table by the sofa or bed: lamp, drink, or notebook always within reach.",
          image: "/products/rolling-cart-3.png",
        },
        {
          titleAr: "هيكل متين بلمسة عصرية",
          titleEn: "Sturdy frame with a modern look",
          bodyAr:
            "أنابيب معدنية سميكة بلون أسود مطفي تقاوم التشوه وتمنح مظهرًا صناعيًا أنيقًا يناسب الصالة والمكتب والمطبخ.",
          bodyEn:
            "Thick matte-black metal tubes resist bending and give a clean industrial look that fits living rooms, offices, and kitchens.",
          image: "/products/rolling-cart-4.png",
        },
      ],
      benefitsAr: [
        "عجلات 360° صامتة",
        "فرامل تثبيت",
        "سطح خشبي عملي",
        "سلتان بسعة كبيرة",
        "تصميم عصري خفيف الحركة",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Silent 360° casters",
        "Locking brakes",
        "Practical wood top",
        "Two high-capacity baskets",
        "Modern easy-roll design",
        "Free delivery and COD",
      ],
      faq: [
        {
          questionAr: "هل العجلات تخدش الأرضية؟",
          questionEn: "Will the wheels mark the floor?",
          answerAr:
            "العجلات مصممة للحركة السلسة والصامتة مع تقليل الضرر على الأرضيات عند الاستخدام العادي.",
          answerEn:
            "The casters are designed for smooth, quiet movement and to minimize floor marks in normal use.",
        },
        {
          questionAr: "أين يمكن استخدامها؟",
          questionEn: "Where can I use it?",
          answerAr:
            "كطاولة جانبية في الصالة، طاولة سرير، عربة تنظيم للمكتب، أو مساحة تخزين إضافية في المطبخ.",
          answerEn:
            "As a living-room side table, bedside table, office organizer cart, or extra kitchen storage.",
        },
        {
          questionAr: "هل التركيب صعب؟",
          questionEn: "Is assembly difficult?",
          answerAr:
            "عادةً تركيب بسيط بالأدوات المرفقة واتباع الخطوات — جاهزة للاستخدام خلال وقت قصير.",
          answerEn:
            "Usually simple assembly with the included hardware and steps — ready in a short time.",
        },
      ],
    },
  },
  {
    id: "prod-car-vacuum",
    slug: "cordless-car-vacuum",
    nameAr: "مكنسة سيارة لاسلكية",
    nameEn: "Cordless Car Vacuum",
    descriptionAr: `
<h3>نظافة سيارتك… في إيدك</h3>
<p>الرمال والفتات بين المقاعد؟ مع هذه المكنسة اللاسلكية تنظّف الكونسول والمقاعد والزوايا الضيقة في دقائق — <strong>بدون أسلاك تعيقك</strong> وبدون انتظار المغسلة.</p>
<ul>
<li>فوهة رفيعة تصل لما لا تصل إليه المكنسة العادية</li>
<li>حاوية شفافة تشوف الأوساخ وأنت تشفط</li>
<li>خفيفة ومحمولة… جاهزة في الصندوق دائمًا</li>
<li>مثالية لمناخ الخليج والغبار اليومي</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Your car’s cleanliness — in your hand</h3>
<p>Sand and crumbs between the seats? This cordless vacuum cleans consoles, seats, and tight corners in minutes — <strong>no cables in the way</strong>, no waiting for a wash.</p>
<ul>
<li>Slim nozzle reaches what regular vacuums miss</li>
<li>Transparent chamber shows dirt as you clean</li>
<li>Light and portable — always ready in the trunk</li>
<li>Built for Gulf dust and daily messes</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "تصميم لاسلكي محمول بقوة شفط عالية",
      "فوهة رفيعة للأماكن الضيقة والكونسول",
      "حاوية شفافة سهلة التفريغ",
      "مثالية لداخل السيارة والمناخ الرملي",
      "تشغيل بضغطة واحدة وقبضة مريحة",
    ],
    detailsEn: [
      "Cordless handheld with strong suction",
      "Slim nozzle for tight spaces & console",
      "Transparent chamber — easy to empty",
      "Ideal for car interiors and dusty climates",
      "One-press start with a secure grip",
    ],
    priceUSD: 49,
    compareAtUSD: 69,
    marketPrices: { MA: 199, SA: 189, AE: 179, OM: 19.5 },
    marketComparePrices: { MA: 279, SA: 259, AE: 249, OM: 26.9 },
    availableIn: ["MA", "SA", "AE", "OM"],
    images: [
      "/products/car-vacuum-demo.gif",
      "/products/car-vacuum.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 214,
    categoryId: "cat-SA",
    createdAt: "2026-03-10T00:00:00.000Z",
    landing: {
      headlineAr: "سيارة نظيفة في دقائق… بدون أسلاك",
      headlineEn: "A clean car in minutes — no cables",
      introAr:
        "كل يوم يدخل الرمل والغبار لسيارتك. بدل ما تنتظر المغسلة، خلّ عندك أداة سريعة توصل للزوايا الضيقة وتعيد لمعان المقصورة فورًا. هذه المكنسة صُممت خصيصًا لداخل السيارة: خفيفة، قوية، وجاهزة في أي لحظة.",
      introEn:
        "Sand and dust hit your cabin every day. Instead of waiting for a wash, keep a fast tool that reaches tight corners and restores a clean cabin instantly. Built for car interiors: light, powerful, and ready anytime.",
      sections: [
        {
          titleAr: "وصل للأماكن الضيقة بسهولة",
          titleEn: "Reach tight spaces with ease",
          bodyAr:
            "الفوهة الرفيعة تدخل بين المقاعد، حول ناقل الحركة، وداخل فتحات الكونسول لتلتقط الأوساخ التي تفوتها المكنسة العادية. نتيجة أوضح في دقائق — بدون تفكيك أو عناء.",
          bodyEn:
            "The slim nozzle slips between seats, around the gear shift, and into console gaps to pick up dirt regular vacuums miss. Cleaner results in minutes — no hassle.",
          image: "/products/car-vacuum.png",
        },
        {
          titleAr: "لاسلكية… استخدمها في أي مكان",
          titleEn: "Cordless freedom anywhere",
          bodyAr:
            "اشحن البطارية مرة واستخدمها داخل السيارة أو المنزل أو المكتب. قبضة مريحة وتشغيل سريع بضغطة واحدة — كأنك تحمل أداة احترافية خفيفة.",
          bodyEn:
            "Charge once and use it in the car, at home, or in the office. A secure grip and one-press start — like a light pro tool in your hand.",
        },
        {
          titleAr: "شاهد النتيجة وأنت تنظّف",
          titleEn: "See results as you clean",
          bodyAr:
            "الحاوية الشفافة تُظهر الأوساخ أثناء الشفط، فتعرف متى تحتاج التفريغ. مثالية للعائلات والسائقين وكل من يبغى مقصورة نظيفة طول الوقت.",
          bodyEn:
            "The transparent chamber shows dirt as you clean, so you know when to empty it. Perfect for families, drivers, and anyone who wants a spotless cabin.",
        },
      ],
      benefitsAr: [
        "تنظيف سريع للمقاعد والكونسول",
        "بدون أسلاك تعيق الحركة",
        "مناسبة لرمال وغبار الخليج",
        "سهلة الحمل والتخزين في الصندوق",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Fast cleaning for seats and console",
        "No cables in the way",
        "Great for Gulf sand and dust",
        "Easy to store in the trunk",
        "Free delivery and cash on delivery",
      ],
      faq: [
        {
          questionAr: "هل تكفي لتنظيف السيارة بالكامل؟",
          questionEn: "Is it enough for a full car clean?",
          answerAr:
            "نعم للمهام اليومية والزوايا الضيقة والفتات. خلّها دائمًا في السيارة كأداة تنظيف سريعة أساسية.",
          answerEn:
            "Yes for daily messes, crumbs, and tight spots. Keep it in the car as your go-to quick-clean tool.",
        },
        {
          questionAr: "هل تعمل بدون كهرباء السيارة؟",
          questionEn: "Does it work without car power?",
          answerAr:
            "نعم، تعمل بالبطارية القابلة للشحن ولا تحتاج توصيلًا بمقبس السيارة أثناء الاستخدام.",
          answerEn:
            "Yes — it runs on a rechargeable battery and doesn’t need the car socket while cleaning.",
        },
      ],
    },
  },
  {
    id: "prod-baby-washer",
    slug: "portable-baby-washer",
    nameAr: "غسالة ملابس أطفال محمولة",
    nameEn: "Portable Baby Clothes Washer",
    descriptionAr: `
<h3>نظافة ملابس طفلك… بضغطة زر</h3>
<p>ملابس الرضع تحتاج غسيلًا متكررًا وعناية خاصة. هذه الغسالة المحمولة تعطيك <strong>حلًا صحيًا وسريعًا</strong> بدون انتظار الغسالة الكبيرة — وبمساحة صغيرة تناسب أي منزل.</p>
<ul>
<li>دورة سريعة للقطع الصغيرة والحساسة</li>
<li>تصميم شفاف أنيق على الطاولة</li>
<li>فصل ملابس الطفل عن باقي الغسيل لراحة بال أكبر</li>
<li>مثالية للشقق والسفر والإقامة المؤقتة</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Fresh baby clothes — at the press of a button</h3>
<p>Baby clothes need gentle, frequent washing. This portable washer gives you a <strong>hygienic, fast solution</strong> without waiting for the big machine — in a compact footprint for any home.</p>
<ul>
<li>Quick cycles for small and delicate loads</li>
<li>Sleek transparent countertop design</li>
<li>Keep baby laundry separate for peace of mind</li>
<li>Ideal for apartments, travel, and temporary stays</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "حجم مكتبي مدمج يناسب أي مساحة",
      "لوحة تحكم رقمية مع مؤقت",
      "دورة لطيفة للملابس الحساسة",
      "مثالية للأمهات والسفر",
      "موفرة للمياه مقارنة بالغسالة الكبيرة",
    ],
    detailsEn: [
      "Compact countertop size for any space",
      "Digital control panel with timer",
      "Gentle cycles for delicate garments",
      "Great for parents and travel",
      "Saves water vs a full-size washer",
    ],
    priceUSD: 119,
    compareAtUSD: 149,
    marketPrices: { MA: 469, SA: 449, AE: 439, OM: 45.9 },
    marketComparePrices: { MA: 589, SA: 559, AE: 549, OM: 56.9 },
    availableIn: ["MA", "SA", "AE", "OM"],
    images: [
      "/products/baby-washer-demo.gif",
      "/products/baby-washer.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 156,
    categoryId: "cat-SA",
    createdAt: "2026-03-11T00:00:00.000Z",
    landing: {
      headlineAr: "غسيل يومي لملابس طفلك… بدون تعقيد",
      headlineEn: "Daily baby laundry — without the hassle",
      introAr:
        "بدل ما تشغّلين غسالة كاملة على قطعتين، خلّي عندك غسالة صغيرة جاهزة للرضّاعات والجوارب والملابس الداخلية الحساسة. سريعة، صحية، ومريحة لكل أم وأب.",
      introEn:
        "Instead of running a full machine for two pieces, keep a compact washer ready for onesies, socks, and delicate items. Fast, hygienic, and built for busy parents.",
      sections: [
        {
          titleAr: "دورة سريعة تناسب يومك",
          titleEn: "Quick cycles for your day",
          bodyAr:
            "لوحة رقمية تتيح اختيار الوقت المناسب، بما فيها دورات قصيرة مثل 15 دقيقة للقطع الصغيرة — تنظيف عملي وأنتِ مشغولة.",
          bodyEn:
            "The digital panel lets you set the right time, including short cycles like 15 minutes for small loads — practical cleaning on busy days.",
          image: "/products/baby-washer.png",
        },
        {
          titleAr: "تصميم شفاف وأنيق",
          titleEn: "Transparent, elegant design",
          bodyAr:
            "الخزان الشفاف يريك عملية الغسيل بوضوح، والقاعدة الأنيقة تناسب غرفة الطفل أو المطبخ أو السفر.",
          bodyEn:
            "The clear drum shows the wash in progress, while the sleek base fits a nursery, kitchen, or travel stay.",
        },
        {
          titleAr: "فصل ملابس الطفل = راحة بال",
          titleEn: "Separate baby laundry = peace of mind",
          bodyAr:
            "غسيل منفصل يعني عناية أفضل للبشرة الحساسة، واستخدام يومي ذكي بدل هدر ماء وكهرباء على غسالة كبيرة.",
          bodyEn:
            "Separate washing means better care for sensitive skin — and smarter daily use instead of wasting water and power on a large machine.",
        },
      ],
      benefitsAr: [
        "موفرة للمياه والكهرباء",
        "مثالية للمنازل الصغيرة والشقق",
        "سهلة النقل عند السفر",
        "مناسبة للملابس الحساسة",
        "توصيل مجاني واسترداد 30 يومًا",
      ],
      benefitsEn: [
        "Saves water and power",
        "Ideal for small homes and apartments",
        "Easy to move when traveling",
        "Gentle on delicate fabrics",
        "Free delivery and 30-day returns",
      ],
      faq: [
        {
          questionAr: "هل تغسل كميات كبيرة؟",
          questionEn: "Can it wash large loads?",
          answerAr:
            "صُممت للكميات الصغيرة والمتوسطة مثل ملابس الرضع والقطع اليومية — وليست بديلًا كاملًا عن غسالة المنزل الكبيرة.",
          answerEn:
            "Designed for small to medium loads like baby wear and daily pieces — not a full replacement for a large washer.",
        },
        {
          questionAr: "هل تحتاج تركيبًا خاصًا؟",
          questionEn: "Does it need special installation?",
          answerAr:
            "لا، جهاز مكتبي جاهز بعد التوصيل بالكهرباء وتعبئة الماء حسب التعليمات.",
          answerEn:
            "No — countertop appliance ready after power connection and filling water as instructed.",
        },
      ],
    },
  },
  {
    id: "prod-smart-sunglasses",
    slug: "smart-audio-sunglasses",
    nameAr: "نظارات شمسية ذكية",
    nameEn: "Smart Audio Sunglasses",
    descriptionAr: `
<h3>أناقة الشمس… وصوت أوضح دون سماعات</h3>
<p>في أجواء الخليج المشمسة تحتاج حماية عينيك، وفي نفس الوقت مكالمات وموسيقى <strong>بدون سماعات ظاهرة</strong>. النظارة الذكية تجمع الاثنين بإطار خفيف وعصري يناسب يومك كاملًا.</p>
<ul>
<li>حماية UV للقيادة والمشي والجلسات الخارجية</li>
<li>مكالمات صوتية واضحة Hands-free</li>
<li>بطارية تدوم طويلًا للاستخدام اليومي</li>
<li>تصميم أنيق للرجال والنساء</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Sun style with clear audio — no earbuds</h3>
<p>In sunny Gulf weather you need eye protection — and calls or music <strong>without visible earbuds</strong>. These smart sunglasses combine both in a light, modern frame for all-day wear.</p>
<ul>
<li>UV protection for driving, walking, outdoors</li>
<li>Clear hands-free voice calls</li>
<li>Long battery for daily use</li>
<li>Stylish design for everyone</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "حماية من أشعة الشمس UV",
      "مكالمات صوتية واضحة بدون سماعات",
      "بطارية تدوم طويلًا",
      "إطار خفيف ومريح طوال اليوم",
      "اتصال سهل بالجوال",
    ],
    detailsEn: [
      "UV sun protection",
      "Clear voice calls without earbuds",
      "Long-lasting battery",
      "Lightweight all-day comfort",
      "Easy phone pairing",
    ],
    priceUSD: 89,
    compareAtUSD: 119,
    marketPrices: { MA: 359, SA: 339, AE: 329, OM: 34.5 },
    marketComparePrices: { MA: 469, SA: 449, AE: 439, OM: 45.9 },
    availableIn: ["MA", "SA", "AE", "OM"],
    images: [
      "/products/smart-sunglasses-demo.gif",
      "/products/smart-sunglasses.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 98,
    categoryId: "cat-SA",
    createdAt: "2026-03-12T00:00:00.000Z",
    landing: {
      headlineAr: "حماية الشمس + مكالمات… بإطلالة واحدة",
      headlineEn: "Sun protection + calls — one look",
      introAr:
        "ما عاد تحتاج تختار بين الأناقة والعملية. نظارة ذكية تحمي عينيك من الشمس وتخلّيك ترد على المكالمات وأنت مرتاح — بدون إخراج الجوال في كل مرة.",
      introEn:
        "No more choosing between style and practicality. Smart sunglasses protect your eyes and let you take calls comfortably — without pulling out your phone every time.",
      sections: [
        {
          titleAr: "حماية من أشعة الشمس",
          titleEn: "UV sun protection",
          bodyAr:
            "عدسات داكنة أنيقة تحمي عينيك أثناء القيادة أو المشي أو الجلسات الخارجية، مع مظهر فاخر يناسب إطلالتك اليومية.",
          bodyEn:
            "Dark stylish lenses protect your eyes while driving, walking, or outdoors — with a premium look for everyday outfits.",
          image: "/products/smart-sunglasses.png",
        },
        {
          titleAr: "مكالمات أوضح… بدون سماعات ظاهرة",
          titleEn: "Clearer calls — no visible earbuds",
          bodyAr:
            "تحدّث Hands-free أثناء التنقل. مثالية للمكالمات السريعة والاجتماعات الخفيفة وأنت في الطريق.",
          bodyEn:
            "Talk hands-free on the go. Ideal for quick calls and light meetings while moving.",
        },
        {
          titleAr: "خفيف ومريح من الصباح للمساء",
          titleEn: "Light from morning to evening",
          bodyAr:
            "إطار متوازن وبطارية طويلة لتبقى مرتاحًا طوال اليوم دون ثقل أو إزعاج خلف الأذن.",
          bodyEn:
            "A balanced frame and long battery keep you comfortable all day — without heaviness behind the ear.",
        },
      ],
      benefitsAr: [
        "حماية UV للمناخ المشمس",
        "مكالمات بدون سماعات ظاهرة",
        "بطارية طويلة للاستخدام اليومي",
        "تصميم أنيق للجميع",
        "دفع عند الاستلام وتوصيل مجاني",
      ],
      benefitsEn: [
        "UV protection for sunny climates",
        "Calls without visible earbuds",
        "Long battery for daily use",
        "Stylish design for everyone",
        "COD and free delivery",
      ],
      faq: [
        {
          questionAr: "هل تتصل بالجوال عبر البلوتوث؟",
          questionEn: "Do they connect via Bluetooth?",
          answerAr:
            "نعم، تتصل بهاتفك بسهولة لإجراء المكالمات وتشغيل الصوت حسب مواصفات المنتج.",
          answerEn:
            "Yes — they pair with your phone for calls and audio as per product specs.",
        },
        {
          questionAr: "هل مناسبة للقيادة؟",
          questionEn: "Are they suitable for driving?",
          answerAr:
            "نعم كنظارة شمسية، مع إمكانية الرد على المكالمات بأمان أكثر دون البحث عن الهاتف.",
          answerEn:
            "Yes as sunglasses, with safer hands-free answering while driving.",
        },
      ],
    },
  },
  {
    id: "prod-wireless-clock",
    slug: "wireless-charger-alarm-clock",
    nameAr: "ساعة منبه بشاحن لاسلكي 15W",
    nameEn: "15W Wireless Charger Alarm Clock",
    descriptionAr: `
<h3>3 في 1 على طاولة سريرك</h3>
<p>شحن لاسلكي سريع حتى <strong>15 واط</strong> + منبه رقمي + عرض درجة الحرارة. ضع هاتفك فوق الجهاز ليبدأ الشحن فورًا — بدون كابلات تبعثر الطاولة.</p>
<ul>
<li>شحن سريع وآمن للهواتف المتوافقة</li>
<li>شاشة LED مرآوية واضحة ليلًا ونهارًا</li>
<li>يقلل فوضى الأسلاك في غرفة النوم والمكتب</li>
<li>تغذية Type-C وتوافق واسع مع Qi</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>3-in-1 for your nightstand</h3>
<p>Fast wireless charging up to <strong>15W</strong> + digital alarm + temperature display. Place your phone on top to charge instantly — no cable clutter.</p>
<ul>
<li>Fast, safer charging for compatible phones</li>
<li>Clear mirrored LED day and night</li>
<li>Less wire mess in bedroom or office</li>
<li>Type-C power & wide Qi compatibility</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "شحن لاسلكي سريع حتى 15 واط",
      "منبه رقمي + عرض درجة الحرارة",
      "حماية ذكية للجهاز",
      "توافق واسع مع الهواتف (Qi)",
      "منفذ Type-C",
    ],
    detailsEn: [
      "Fast wireless charging up to 15W",
      "Digital alarm + temperature display",
      "Smart device protection",
      "Wide Qi phone compatibility",
      "Type-C power input",
    ],
    priceUSD: 39,
    compareAtUSD: 55,
    marketPrices: { MA: 159, SA: 149, AE: 145, OM: 14.9 },
    marketComparePrices: { MA: 219, SA: 209, AE: 199, OM: 20.9 },
    availableIn: ["MA", "SA", "AE", "OM"],
    images: [
      "/products/wireless-clock-demo.gif",
      "/products/wireless-clock-1.png",
      "/products/wireless-clock-charger.png",
      "/products/wireless-clock-2.png",
      "/products/wireless-clock-3.png",
      "/products/wireless-clock-4.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 267,
    categoryId: "cat-SA",
    createdAt: "2026-03-13T00:00:00.000Z",
    landing: {
      headlineAr: "اشحن… ونَمْ… وصحّ منبهك في جهاز واحد",
      headlineEn: "Charge, sleep, wake — one sleek device",
      introAr:
        "على طاولة السرير أو المكتب: ضع هاتفك فوق الجهاز ليبدأ الشحن فورًا دون كابلات، مع ساعة منبه واضحة ودرجة حرارة الغرفة في نظرة واحدة. جهاز أنيق يختصر الفوضى ويرفع راحة يومك.",
      introEn:
        "On your nightstand or desk: place your phone on top to charge instantly without cables — plus a clear alarm and room temperature at a glance. One sleek device that cuts clutter and upgrades your routine.",
      sections: [
        {
          titleAr: "شحن بلا أسلاك… وبسرعة",
          titleEn: "Cable-free charging — fast",
          bodyAr:
            "تقنية حتى 15 واط تقلل فوضى الطاولة. فقط ضع الهاتف المتوافق واتركه يشحن أثناء نومك أو عملك.",
          bodyEn:
            "Up to 15W wireless charging cuts cable clutter. Drop a compatible phone on top and charge while you sleep or work.",
          image: "/products/wireless-clock-1.png",
        },
        {
          titleAr: "حماية ذكية وتوافق واسع",
          titleEn: "Smart protection & wide compatibility",
          bodyAr:
            "حماية تساعد على شحن أكثر أمانًا، مع توافق واسع للهواتف الداعمة لـ Qi، وتغذية عبر Type-C.",
          bodyEn:
            "Protection supports safer charging, wide Qi phone compatibility, and Type-C power input.",
          image: "/products/wireless-clock-charger.png",
        },
        {
          titleAr: "منبه + حرارة في نظرة واحدة",
          titleEn: "Alarm + temperature at a glance",
          bodyAr:
            "شاشة LED مرآوية تعرض الوقت ودرجة الحرارة بوضوح — بدون ما تضيء الغرفة كلها.",
          bodyEn:
            "A mirrored LED shows time and temperature clearly — without lighting the whole room.",
          image: "/products/wireless-clock-3.png",
        },
      ],
      benefitsAr: [
        "3 في 1: شاحن + منبه + حرارة",
        "يقلل أسلاك الطاولة",
        "مناسب لغرفة النوم والمكتب",
        "شحن سريع حتى 15 واط",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "3-in-1: charger + alarm + temperature",
        "Less cable clutter",
        "Perfect for bedroom or office",
        "Fast charging up to 15W",
        "Free delivery and COD",
      ],
      faq: [
        {
          questionAr: "هل يعمل مع آيفون وأندرويد؟",
          questionEn: "Does it work with iPhone and Android?",
          answerAr:
            "يعمل مع معظم الهواتف الداعمة للشحن اللاسلكي Qi. تأكد أن هاتفك يدعم الشحن اللاسلكي.",
          answerEn:
            "Works with most Qi-compatible phones. Confirm your phone supports wireless charging.",
        },
        {
          questionAr: "ماذا يوجد في العلبة؟",
          questionEn: "What’s in the box?",
          answerAr: "الجهاز مع كابل Type-C وورقة المواصفات — جاهز للتوصيل والاستخدام.",
          answerEn: "The device, a Type-C cable, and a parameters sheet — ready to use.",
        },
      ],
    },
  },
  {
    id: "prod-neck-massager",
    slug: "neck-shoulder-massager",
    nameAr: "جهاز تدليك رقبة والكتف",
    nameEn: "Neck & Shoulder Massager",
    descriptionAr: `
<h3>يعالج توتر العضلات العميقة</h3>
<p>بعد يوم طويل من الجلوس أو القيادة، رقبتك وكتفاك يستحقون راحة حقيقية. جهاز التدليك يمنحك <strong>تدليكًا عميقًا في دقائق</strong> — بدون موعد صالون وبدون خروج من البيت.</p>
<ul>
<li>ضغط يشبه اليدين على نقاط التوتر</li>
<li>أحزمة قابلة للتعديل لتثبيت مريح</li>
<li>خفيف ومحمول للمنزل أو المكتب</li>
<li>استخدام يومي سهل للرجال والنساء</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Relieves deep muscle tension</h3>
<p>After a long day of sitting or driving, your neck and shoulders deserve real relief. This massager delivers <strong>deep massage in minutes</strong> — no spa appointment, no leaving home.</p>
<ul>
<li>Hand-like pressure on tension points</li>
<li>Adjustable straps for a secure fit</li>
<li>Light and portable for home or office</li>
<li>Easy daily use for everyone</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "تدليك عميق للرقبة والكتفين",
      "أحزمة مريحة قابلة للتعديل",
      "خفيف وسهل الاستخدام",
      "مناسب للاستخدام اليومي",
      "راحة سريعة بعد الجلوس الطويل",
    ],
    detailsEn: [
      "Deep massage for neck and shoulders",
      "Comfortable adjustable straps",
      "Lightweight and easy to use",
      "Ideal for daily use",
      "Fast relief after long sitting",
    ],
    priceUSD: 45,
    compareAtUSD: 65,
    marketPrices: { MA: 179, SA: 169, AE: 159, OM: 17.5 },
    marketComparePrices: { MA: 259, SA: 249, AE: 229, OM: 24.9 },
    availableIn: ["MA", "SA", "AE", "OM"],
    images: [
      "/products/neck-massager-demo.gif",
      "/products/neck-massager.webp",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 183,
    categoryId: "cat-OM",
    createdAt: "2026-03-14T00:00:00.000Z",
    landing: {
      headlineAr: "سبا في البيت… لرقبتك وكتفيك",
      headlineEn: "A spa at home — for your neck & shoulders",
      introAr:
        "التوتر المتراكم من الشاشة والقيادة ما يحتاج صبرًا طويلًا. ثبّت الجهاز بأحزمته المريحة، واشعر بتدليك عميق يفك العقد ويهدّي العضلات خلال دقائق.",
      introEn:
        "Screen time and driving tension shouldn’t wait for a spa day. Secure the massager with comfortable straps and feel deep relief that loosens knots in minutes.",
      sections: [
        {
          titleAr: "راحة للرقبة والكتفين",
          titleEn: "Comfort for neck and shoulders",
          bodyAr:
            "تصميم يشبه اليدين يضغط على نقاط التوتر بلطف وفعالية، مع أحزمة تثبت الجهاز بسهولة أثناء الاستخدام.",
          bodyEn:
            "A hand-like design presses tension points gently and effectively, with straps that keep the device secure while you use it.",
          image: "/products/neck-massager.webp",
        },
        {
          titleAr: "استخدمه في البيت أو المكتب",
          titleEn: "Use it at home or at work",
          bodyAr:
            "خفيف ومحمول — خذه معك بعد يوم شاق أو أثناء استراحة قصيرة. راحة فورية بدون مواعيد.",
          bodyEn:
            "Light and portable — take it after a hard day or during a short break. Instant comfort, no appointments.",
        },
        {
          titleAr: "يناسب الجميع",
          titleEn: "Fits everyone",
          bodyAr:
            "أحزمة قابلة للتعديل تناسب معظم البالغين، لتجربة مريحة يوميًا للرجال والنساء.",
          bodyEn:
            "Adjustable straps fit most adults for a comfortable daily experience for everyone.",
        },
      ],
      benefitsAr: [
        "يخفف التوتر بسرعة",
        "استخدام منزلي سهل",
        "خفيف ومحمول",
        "بدون موعد صالون",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Fast tension relief",
        "Easy home use",
        "Light and portable",
        "No spa appointment needed",
        "Free delivery and COD",
      ],
      faq: [
        {
          questionAr: "هل يناسب الجنسين؟",
          questionEn: "Is it unisex?",
          answerAr: "نعم، يناسب الجميع ويمكن تعديل الأحزمة حسب المقاس.",
          answerEn: "Yes — adjustable straps fit most adults.",
        },
        {
          questionAr: "كم مدة الجلسة المقترحة؟",
          questionEn: "How long per session?",
          answerAr: "ابدأ بـ 10–15 دقيقة يوميًا حسب شعورك، وتوقف عند أي انزعاج.",
          answerEn: "Start with 10–15 minutes daily as comfortable, and stop if you feel discomfort.",
        },
      ],
    },
  },
  {
    id: "prod-air-bed",
    slug: "inflatable-air-bed",
    nameAr: "السرير الهوائي",
    nameEn: "Air Bed",
    descriptionAr: `
<h3>راحة فندقية… في دقائق</h3>
<p>ضيف مفاجئ؟ تخييم داخلي؟ أو نوم إضافي مريح؟ السرير الهوائي يمنحك <strong>سطحًا مرتفعًا ومريحًا</strong> بمضخة مدمجة — انفخه بسرعة واطوه عند عدم الحاجة لتوفير المساحة.</p>
<ul>
<li>مضخة هواء مدمجة للنفخ والتفريغ</li>
<li>ارتفاع مريح يشبه السرير الحقيقي</li>
<li>مثالي للضيوف والاستخدام اليومي المؤقت</li>
<li>خفيف وسهل التخزين بعد التفريغ</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Hotel-like comfort — in minutes</h3>
<p>Unexpected guest? Indoor camping? Extra sleep space? This air bed gives you an <strong>elevated, comfortable surface</strong> with a built-in pump — inflate fast, pack away when done.</p>
<ul>
<li>Built-in pump for inflate & deflate</li>
<li>Comfortable height like a real bed</li>
<li>Ideal for guests and temporary daily use</li>
<li>Light and easy to store when deflated</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "مضخة هواء مدمجة",
      "سطح مريح بارتفاع مناسب",
      "مثالي للضيوف والتخييم الداخلي",
      "سهل التخزين بعد التفريغ",
      "نفخ سريع بضغطة زر",
    ],
    detailsEn: [
      "Built-in air pump",
      "Comfortable elevated surface",
      "Ideal for guests or indoor camping",
      "Easy to store when deflated",
      "Fast inflate at the press of a button",
    ],
    priceUSD: 79,
    compareAtUSD: 119,
    marketPrices: { MA: 319, SA: 299, AE: 289, OM: 31 },
    marketComparePrices: { MA: 469, SA: 449, AE: 429, OM: 45 },
    availableIn: ["MA", "SA", "AE", "OM"],
    images: [
      "/products/air-bed-demo.gif",
      "/products/air-bed.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 142,
    categoryId: "cat-AE",
    createdAt: "2026-03-15T00:00:00.000Z",
    landing: {
      headlineAr: "سرير جاهز للضيوف… بدون شراء سرير دائم",
      headlineEn: "Guest-ready sleep — without a permanent bed",
      introAr:
        "حل عملي لنوم مريح دون تكلفة سرير ثابت. انفخه في دقائق بمضخته المدمجة، واستمتع بارتفاع مريح، ثم وفّر المساحة عند التفريغ والتخزين.",
      introEn:
        "A practical way to sleep well without buying a permanent bed. Inflate in minutes with the built-in pump, enjoy elevated comfort, then save space when deflated and stored.",
      sections: [
        {
          titleAr: "مضخة مدمجة وراحة أعلى",
          titleEn: "Built-in pump & elevated comfort",
          bodyAr:
            "لوحة التحكم تتيح النفخ والتفريغ بسهولة، مع ارتفاع مريح وسطح مناسب لنوم الضيوف أو الاستخدام المؤقت.",
          bodyEn:
            "The control panel makes inflate/deflate easy, with a comfortable height and surface for guests or temporary use.",
          image: "/products/air-bed.png",
        },
        {
          titleAr: "يوفر المساحة والمال",
          titleEn: "Saves space and money",
          bodyAr:
            "بدل غرفة ضيوف كاملة، جهاز واحد يُنفخ عند الحاجة ويُطوى عند الانتهاء — ذكي للشقق والمنازل الصغيرة.",
          bodyEn:
            "Instead of a full guest room, one bed inflates when needed and packs away when done — smart for apartments and smaller homes.",
        },
        {
          titleAr: "جاهز للضيوف في لحظات",
          titleEn: "Guest-ready in moments",
          bodyAr:
            "ضيف مفاجئ؟ حضّر مكان نوم مريح بسرعة وامنح ضيوفك شعورًا أفضل من الأرض أو الكنبة الضيقة.",
          bodyEn:
            "Unexpected guest? Set up comfortable sleep fast — better than the floor or a cramped sofa.",
        },
      ],
      benefitsAr: [
        "نفخ سريع بمضخة مدمجة",
        "مريح للضيوف",
        "خفيف وقابل للتخزين",
        "ارتفاع يشبه السرير الحقيقي",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Fast inflate with built-in pump",
        "Comfortable for guests",
        "Light and storable",
        "Height like a real bed",
        "Free delivery and COD",
      ],
      faq: [
        {
          questionAr: "كم يستغرق النفخ؟",
          questionEn: "How long to inflate?",
          answerAr: "عادة دقائق قليلة حسب الحجم ومستوى الصلابة المطلوب.",
          answerEn: "Usually just a few minutes depending on size and firmness.",
        },
        {
          questionAr: "هل يتحمل الاستخدام اليومي؟",
          questionEn: "Can it handle daily use?",
          answerAr:
            "مناسب للاستخدام المنتظم للضيوف أو النوم المؤقت مع العناية بعدم الثقوب والتخزين الجاف.",
          answerEn:
            "Suitable for regular guest or temporary sleep with care to avoid punctures and store dry.",
        },
      ],
    },
  },
];
