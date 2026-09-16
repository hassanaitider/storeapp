import { STORE_MARKETS } from "./countries";
import type { Category, Product } from "./types";
import { withSpanishCopy } from "./seed-es";
import { LATAM_ELEVADOR_PRODUCTS } from "./seed-latam-elevador";
import { UNIVERSAL_MARKET_PRODUCTS } from "./seed-universal-products";

/** Consistent per-market category art: country flag only (no product lifestyle) */
const CATEGORY_IMAGES: Record<string, string> = {
  MA: "/categories/flag-ma.png",
  SA: "/categories/flag-sa.png",
  AE: "/categories/flag-ae.png",
  OM: "/categories/flag-om.png",
  IQ: "/categories/flag-iq.png",
  LY: "/categories/flag-ly.png",
  LB: "/categories/flag-lb.png",
  MX: "/categories/flag-mx.png",
  AR: "/categories/flag-ar.png",
  CR: "/categories/flag-cr.png",
  EC: "/categories/flag-ec.png",
  GT: "/categories/flag-gt.png",
  HN: "/categories/flag-hn.png",
  SV: "/categories/flag-sv.png",
  NI: "/categories/flag-ni.png",
  DO: "/categories/flag-do.png",
};

/** One category per open market, generated from STORE_MARKETS */
export const SEED_CATEGORIES: Category[] = STORE_MARKETS.map((c) => ({
  id: `cat-${c.code}`,
  slug: `products-${c.code.toLowerCase()}`,
  nameAr: `منتجات ${c.nameAr}`,
  nameEn: `${c.nameEn} Products`,
  nameEs: `Productos de ${c.nameEs ?? c.nameEn}`,
  descriptionAr: `تشكيلة مختارة لسوق ${c.nameAr}`,
  descriptionEn: `Curated picks for ${c.nameEn}`,
  descriptionEs: `Selección para ${c.nameEs ?? c.nameEn}`,
  image: CATEGORY_IMAGES[c.code] ?? "/categories/flag-ma.png",
  createdAt: "2026-03-01T00:00:00.000Z",
  country: c.code,
  availableIn: [c.code],
}));

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";

const BASE_PRODUCTS: Product[] = [
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
      "/products/fashion-sling-demo.gif",
      "/products/fashion-sling-g1.png",
      "/products/fashion-sling-g2.png",
      "/products/fashion-sling-g3.png",
      "/products/fashion-sling-1.png",
      "/products/fashion-sling-2.png",
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
    id: "prod-corner-shower-caddy",
    slug: "corner-shower-caddy-5-piece",
    nameAr: "منظم دش زاوية معدني أسود — طقم 5 قطع",
    nameEn: "Matte Black Corner Shower Caddy — 5-Piece Set",
    descriptionAr: `
<h3>نظّم الحمّام… واستغل كل زاوية</h3>
<p>طقم <strong>5 قطع</strong> بلون أسود مطفي أنيق: رفّان زاوية كبيران + حامل فرشاة أسنان + رف مناشف + صحن صابون مع خطافات. تركيب <strong>بدون ثقب</strong> بلاصق قوي — مثالي للشقق المغربية والبلاط.</p>
<ul>
<li>رفّان زاوية L يستغلان الزاوية ويصرفان الماء بسرعة</li>
<li>مقاومة للصدأ والرطوبة مع تهوية شبكية</li>
<li>خطافات مدمجة للإسفنجة والموس والمناشف الصغيرة</li>
<li>تركيب لاصق شفاف بدون أدوات — بدون تخريب البلاط</li>
<li>تصميم عصري أسود مطفي يناسب الحمّام العصري</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Organize your shower — maximize every corner</h3>
<p>A sleek <strong>5-piece</strong> matte-black set: two large corner shelves + toothbrush holder + towel shelf + soap dish with hooks. <strong>No-drill</strong> adhesive install — ideal for Moroccan apartments and tile walls.</p>
<ul>
<li>Two L-shaped corner shelves that drain water fast</li>
<li>Rust-resistant open-wire design for humid bathrooms</li>
<li>Built-in hooks for loofahs, razors, and washcloths</li>
<li>Strong transparent adhesive pads — no tools, no tile damage</li>
<li>Modern matte-black finish for a premium bathroom look</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "طقم كامل من 5 قطع بلون أسود مطفي",
      "رفّا زاوية + حامل أسنان + رف مناشف + صحن صابون",
      "تركيب لاصق بدون ثقب أو أدوات",
      "شبكة معدنية لتصريف الماء بسرعة",
      "خطافات مدمجة للإكسسوارات",
      "مقاوم للرطوبة والصدأ في الحمّام",
    ],
    detailsEn: [
      "Complete 5-piece matte-black set",
      "2 corner shelves + toothbrush holder + towel shelf + soap dish",
      "No-drill adhesive installation",
      "Open wire grid for quick drainage",
      "Built-in hooks for accessories",
      "Rust-resistant for humid bathrooms",
    ],
    priceUSD: 19.9,
    compareAtUSD: 29.9,
    marketPrices: { MA: 199 },
    marketComparePrices: { MA: 299 },
    availableIn: ["MA"],
    images: [
      "/products/corner-shower-caddy-1.jpg",
      "/products/corner-shower-caddy-2.jpg",
      "/products/corner-shower-caddy-3.jpg",
      "/products/corner-shower-caddy-4.jpg",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 94,
    categoryId: "cat-MA",
    createdAt: "2026-09-16T00:00:00.000Z",
    landing: {
      headlineAr: "طقم حمّام أسود مطفي… تنظيم كامل بدون ثقب",
      headlineEn: "Matte-black bathroom set — full organization, no drilling",
      introAr:
        "حوّل زاوية الدش إلى مساحة مرتبة وأنيقة. رفّان زاوية كبيران مع حاملات للأسنان والمناشف والصابون — تركيب لاصق قوي بدون تخريب البلاط. اطلب الآن بـ 199 درهم — توصيل مجاني والدفع عند الاستلام في المغرب.",
      introEn:
        "Turn your shower corner into a clean, stylish space. Two large corner shelves plus holders for toothbrushes, towels, and soap — strong adhesive install with no tile damage. Order now for 199 MAD — free delivery and cash on delivery in Morocco.",
      sections: [
        {
          titleAr: "رفّا زاوية يستغلان كل سنتيمتر",
          titleEn: "Corner shelves that use every centimeter",
          bodyAr:
            "تصميم L يناسب زاوية 90° ويحفظ الشامبو والجل والنباتات الصغيرة بثبات. الشبكة المفتوحة تصرف الماء فورًا وتقلل التكدّس والروائح.",
          bodyEn:
            "An L-shape fits a 90° corner and holds shampoo, body wash, and small plants securely. The open grid drains water instantly and reduces buildup.",
          image: "/products/corner-shower-caddy-1.jpg",
        },
        {
          titleAr: "طقم كامل… تغليف جاهز للهديّة",
          titleEn: "Complete set — gift-ready packaging",
          bodyAr:
            "يصل في علبة Corner Shower Caddy أنيقة توضّح الاستخدام: تنظيم الدش، تصريف سريع، ومتانة عالية. كل القطع بلون أسود مطفي متناسق.",
          bodyEn:
            "Arrives in a sleek Corner Shower Caddy box that highlights the benefits: shower organization, quick drain, and sturdy build. Every piece matches in matte black.",
          image: "/products/corner-shower-caddy-2.jpg",
        },
        {
          titleAr: "حاملات متخصصة للأسنان والمناشف والصابون",
          titleEn: "Dedicated holders for brushes, towels, and soap",
          bodyAr:
            "حامل عمودي لمعجون وفرش الأسنان، رف للمناشف المطوية، وصحن صابون مع خطافات للموس — كل شيء في مكانه على الحائط.",
          bodyEn:
            "A vertical holder for toothpaste and brushes, a shelf for folded towels, and a soap dish with hooks for razors — everything has a place on the wall.",
          image: "/products/corner-shower-caddy-3.jpg",
        },
        {
          titleAr: "تركيب لاصق… بدون مثقاب",
          titleEn: "Adhesive install — no drill needed",
          bodyAr:
            "وسائد لاصقة شفافة قوية تثبت على البلاط الرخامي أو السيراميك. مثالي للمستأجرين ولمن لا يريد ثقب الجدران — إزالة أنظف عند الحاجة.",
          bodyEn:
            "Strong transparent adhesive pads grip marble-look or ceramic tile. Perfect for renters and anyone who wants no wall holes — cleaner removal when needed.",
          image: "/products/corner-shower-caddy-4.jpg",
        },
      ],
      benefitsAr: [
        "طقم 5 قطع متكامل",
        "أسود مطفي عصري",
        "بدون ثقب — لاصق قوي",
        "تصريف ماء سريع",
        "مقاوم للرطوبة",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Complete 5-piece set",
        "Modern matte black",
        "No-drill strong adhesive",
        "Quick water drainage",
        "Humidity resistant",
        "Free delivery and COD",
      ],
      faq: [
        {
          questionAr: "هل يتحمل وزن الشامبو الثقيل؟",
          questionEn: "Can it hold heavy shampoo bottles?",
          answerAr:
            "نعم — الرفوف مصممة لتحمل زجاجات الدوش العادية عند تثبيت اللاصق بشكل صحيح على سطح نظيف وجاف.",
          answerEn:
            "Yes — the shelves are made for typical shower bottles when adhesive pads are applied on a clean, dry surface.",
        },
        {
          questionAr: "هل يصدأ في الحمّام؟",
          questionEn: "Will it rust in the bathroom?",
          answerAr:
            "التصميم الشبكي يصرف الماء بسرعة واللمسة السوداء المطفيّة مقاومة للرطوبة مع الاستخدام العادي في الحمّام.",
          answerEn:
            "The open-wire design drains water quickly, and the matte finish resists humidity in normal bathroom use.",
        },
        {
          questionAr: "كم قطعة في الطقم؟",
          questionEn: "How many pieces are in the set?",
          answerAr:
            "5 قطع: رفّا زاوية، حامل فرشاة أسنان، رف مناشف، وصحن صابون مع خطافات.",
          answerEn:
            "5 pieces: two corner shelves, a toothbrush holder, a towel shelf, and a soap dish with hooks.",
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
    marketPrices: { MA: 199, SA: 189, AE: 179, OM: 19.5, IQ: 26000, LY: 110 },
    marketComparePrices: {
      MA: 279,
      SA: 259,
      AE: 249,
      OM: 26.9,
      IQ: 39000,
      LY: 165,
    },
    availableIn: [
      "MA",
      "SA",
      "AE",
      "OM",
      "IQ",
      "LY",
      "MX",
      "AR",
      "CR",
      "EC",
      "GT",
      "HN",
      "SV",
      "NI",
      "DO",
    ],
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
    marketPrices: { MA: 469, SA: 449, AE: 439, OM: 45.9, IQ: 62000, LY: 260 },
    marketComparePrices: {
      MA: 589,
      SA: 559,
      AE: 549,
      OM: 56.9,
      IQ: 78000,
      LY: 330,
    },
    availableIn: [
      "MA",
      "SA",
      "AE",
      "OM",
      "IQ",
      "LY",
      "MX",
      "AR",
      "CR",
      "EC",
      "GT",
      "HN",
      "SV",
      "NI",
      "DO",
    ],
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
    marketPrices: { MA: 359, SA: 339, AE: 329, OM: 34.5, IQ: 47000, LY: 199 },
    marketComparePrices: {
      MA: 469,
      SA: 449,
      AE: 439,
      OM: 45.9,
      IQ: 62000,
      LY: 260,
    },
    availableIn: [
      "MA",
      "SA",
      "AE",
      "OM",
      "IQ",
      "LY",
      "MX",
      "AR",
      "CR",
      "EC",
      "GT",
      "HN",
      "SV",
      "NI",
      "DO",
    ],
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
    marketPrices: { MA: 159, SA: 149, AE: 145, OM: 14.9, IQ: 21000, LY: 89 },
    marketComparePrices: {
      MA: 219,
      SA: 209,
      AE: 199,
      OM: 20.9,
      IQ: 29000,
      LY: 125,
    },
    availableIn: [
      "MA",
      "SA",
      "AE",
      "OM",
      "IQ",
      "LY",
      "MX",
      "AR",
      "CR",
      "EC",
      "GT",
      "HN",
      "SV",
      "NI",
      "DO",
    ],
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
    marketPrices: { MA: 179, SA: 169, AE: 159, OM: 17.5, IQ: 24000, LY: 99 },
    marketComparePrices: {
      MA: 259,
      SA: 249,
      AE: 229,
      OM: 24.9,
      IQ: 34000,
      LY: 145,
    },
    availableIn: [
      "MA",
      "SA",
      "AE",
      "OM",
      "IQ",
      "LY",
      "MX",
      "AR",
      "CR",
      "EC",
      "GT",
      "HN",
      "SV",
      "NI",
      "DO",
    ],
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
    marketPrices: { MA: 319, SA: 299, AE: 289, OM: 31, IQ: 42000, LY: 179 },
    marketComparePrices: {
      MA: 469,
      SA: 449,
      AE: 429,
      OM: 45,
      IQ: 62000,
      LY: 260,
    },
    availableIn: [
      "MA",
      "SA",
      "AE",
      "OM",
      "IQ",
      "LY",
      "MX",
      "AR",
      "CR",
      "EC",
      "GT",
      "HN",
      "SV",
      "NI",
      "DO",
    ],
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
  {
    id: "prod-solar-camera-ae",
    slug: "solar-4g-security-camera",
    nameAr: "كاميرا مراقبة ذكية بالطاقة الشمسية 4G",
    nameEn: "Solar 4G Smart Security Camera",
    descriptionAr: `
<h3>حماية ليك ولأسرتك… بدون أسلاك وبلا انقطاع</h3>
<p>كاميرا خارجية متعددة العدسات مع لوحة طاقة شمسية وبطارية داخلية قوية. راقب منزلك من جوالك بثلاث شاشات، بدقة عالية واتصال 4G — مثالية للفلل والمستودعات والأماكن بدون واي فاي.</p>
<ul>
<li>شحن شمسي مستمر + بطارية 10800mAh</li>
<li>اتصال 4G بدون الاعتماد على الواي فاي</li>
<li>دقة حتى 12MP Ultra HD وعدسات متعددة مع دوران</li>
<li>مراقبة من الموبايل بثلاث شاشات</li>
<li>تركيب خارجي مقاوم للعوامل الجوية</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Protect your home — wireless and always on</h3>
<p>Outdoor multi-lens camera with a solar panel and a strong built-in battery. Watch from your phone with three live views, high resolution, and 4G connectivity — ideal for villas, yards, and places without Wi‑Fi.</p>
<ul>
<li>Continuous solar charging + 10800mAh battery</li>
<li>4G connectivity without relying on Wi‑Fi</li>
<li>Up to 12MP Ultra HD with multi-lens PTZ coverage</li>
<li>Phone monitoring with 3-screen view</li>
<li>Outdoor weather-ready installation</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "لوحة شمسية للشحن المستمر",
      "بطارية داخلية 10800mAh",
      "اتصال 4G",
      "دقة 12MP Ultra HD",
      "عدسات متعددة مع دوران PTZ",
      "مراقبة عبر تطبيق الموبايل",
    ],
    detailsEn: [
      "Solar panel for continuous charging",
      "Built-in 10800mAh battery",
      "4G connectivity",
      "12MP Ultra HD resolution",
      "Multi-lens PTZ coverage",
      "Mobile app monitoring",
    ],
    priceUSD: 42,
    compareAtUSD: 62,
    marketPrices: { AE: 154 },
    marketComparePrices: { AE: 229 },
    availableIn: ["AE"],
    images: [
      "/products/solar-camera-demo.gif",
      "/products/solar-camera-g1.png",
      "/products/solar-camera-g2.png",
      "/products/solar-camera-g3.png",
      "/products/solar-camera-2.png",
      "/products/solar-camera-3.png",
    ],
    colors: [],
    customColorEnabled: false,
    qtyOffers: [
      { quantity: 1, discountPercent: 0 },
      { quantity: 2, discountPercent: 8, popular: true },
      { quantity: 3, discountPercent: 12 },
    ],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 214,
    categoryId: "cat-AE",
    createdAt: "2026-08-21T22:00:00.000Z",
    landing: {
      headlineAr: "حماية ليك ولأسرتك",
      headlineEn: "Protection for you and your family",
      introAr:
        "كاميرا مراقبة ذكية بالطاقة الشمسية: شحن مستمر من الشمس، بطارية قوية، واتصال 4G لتشوف بيتك من جوالك في أي وقت — بدون أسلاك معقدة وبدون الاعتماد على الواي فاي.",
      introEn:
        "A smart solar security camera: continuous sun charging, a strong battery, and 4G so you can watch your home from your phone anytime — no complex wiring and no Wi‑Fi dependency.",
      sections: [
        {
          titleAr: "طاقة شمسية بدون انقطاع",
          titleEn: "Solar power without interruption",
          bodyAr:
            "اربط الكاميرا باللوحة الشمسية لتحصل على طاقة طوال اليوم. مثالية لمناخ الإمارات المشمس ولحماية الفلل والأسوار والمستودعات.",
          bodyEn:
            "Connect the camera to the solar panel for all-day power. Ideal for the UAE sun and for villas, fences, and warehouses.",
          image: "/products/solar-camera-4.png",
        },
        {
          titleAr: "بطارية 10800mAh واستعداد طويل",
          titleEn: "10800mAh battery & long standby",
          bodyAr:
            "بطارية داخلية كبيرة باستهلاك منخفض تبقي الكاميرا جاهزة حتى مع الغيوم أو الليل — طمأنينة أكثر لأسرته.",
          bodyEn:
            "A large built-in battery with low power use keeps the camera ready even through clouds or night — more peace of mind for your family.",
          image: "/products/solar-camera-5.png",
        },
        {
          titleAr: "4G + ثلاث شاشات على جوالك",
          titleEn: "4G + three screens on your phone",
          bodyAr:
            "راقب بعدسات متعددة ودقة عالية، وتابع ثلاث زوايا معًا من التطبيق. تغطية أوسع للحركة حول المنزل.",
          bodyEn:
            "Monitor with multi-lens high resolution and follow three angles together in the app. Wider coverage around the home.",
          image: "/products/solar-camera-3.png",
        },
      ],
      benefitsAr: [
        "شحن شمسي مستمر",
        "اتصال 4G بدون واي فاي",
        "دقة عالية وعدسات متعددة",
        "بطارية قوية للاستخدام الطويل",
        "توصيل مجاني والدفع عند الاستلام في الإمارات",
      ],
      benefitsEn: [
        "Continuous solar charging",
        "4G without Wi‑Fi",
        "High resolution multi-lens coverage",
        "Strong battery for long use",
        "Free delivery and COD in the UAE",
      ],
      faq: [
        {
          questionAr: "هل تحتاج واي فاي؟",
          questionEn: "Does it need Wi‑Fi?",
          answerAr:
            "تعمل باتصال 4G، لذا تناسب الأماكن التي لا يتوفر فيها واي فاي مستقر (يلزم شريحة بيانات حسب الاستخدام).",
          answerEn:
            "It works over 4G, so it suits places without stable Wi‑Fi (a data SIM is required depending on use).",
        },
        {
          questionAr: "هل تناسب التركيب الخارجي؟",
          questionEn: "Is it for outdoor install?",
          answerAr:
            "نعم، مصممة للتركيب الخارجي مع لوحة شمسية وقاعدة تثبيت على الجدار.",
          answerEn:
            "Yes — designed for outdoor mounting with a solar panel and wall bracket.",
        },
      ],
    },
  },
  {
    id: "prod-solar-powerbank-ae",
    slug: "denx-dx421-solar-power-bank",
    nameAr: "باور بانك شمسي DENX DX421",
    nameEn: "DENX DX421 Solar Portable Power Bank",
    descriptionAr: `
<h3>اشحن في أي مكان… حتى تحت الشمس</h3>
<p>باور بانك DENX DX421 بألواح شمسية قابلة للطي، شحن سريع، إضاءة LED قوية، وحماية ذكية للشريحة. مثالي للبر، السفر، والطوارئ في الإمارات.</p>
<ul>
<li>شحن شمسي بألواح قابلة للطي</li>
<li>شحن سريع + مخرج لاسلكي 5V/1A</li>
<li>كابل Lightning مدمج 5V/2.1A</li>
<li>إضاءة LED قوية للطوارئ</li>
<li>شريحة حماية ذكية — Original</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Charge anywhere — even under the sun</h3>
<p>DENX DX421 power bank with foldable solar panels, fast charging, a strong LED lamp, and smart chip protection. Ideal for desert trips, travel, and emergencies in the UAE.</p>
<ul>
<li>Solar charging with foldable panels</li>
<li>Fast charge + wireless output 5V/1A</li>
<li>Built-in Lightning line 5V/2.1A</li>
<li>Bright LED lamp for emergencies</li>
<li>Smart chip protection — Original</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "موديل DENX DX421",
      "ألواح شمسية قابلة للطي",
      "شحن سريع",
      "مخرج لاسلكي 5V/1A",
      "إضاءة LED مزدوجة",
      "حماية شريحة ذكية",
    ],
    detailsEn: [
      "DENX DX421 model",
      "Foldable solar panels",
      "Quick high-speed charge",
      "Wireless output 5V/1A",
      "Dual LED lamp",
      "Smart chip protection",
    ],
    priceUSD: 34,
    compareAtUSD: 52,
    marketPrices: { AE: 125 },
    marketComparePrices: { AE: 189 },
    availableIn: ["AE"],
    images: [
      "/products/solar-powerbank-demo.gif",
      "/products/solar-powerbank-g1.png",
      "/products/solar-powerbank-g2.png",
      "/products/solar-powerbank-g3.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 168,
    categoryId: "cat-AE",
    createdAt: "2026-08-21T22:05:00.000Z",
    landing: {
      headlineAr: "باور بانك يعمل بالطاقة الشمسية",
      headlineEn: "Solar-powered portable power bank",
      introAr:
        "DENX DX421 جهاز واحد للشحن والطوارئ: ألواح شمسية، شحن سريع، إضاءة قوية، وحماية ذكية. اطلب الحين — توصيل مجاني والدفع عند الاستلام في الإمارات.",
      introEn:
        "DENX DX421 is one device for charging and emergencies: solar panels, fast charge, a bright lamp, and smart protection. Order now — free delivery and COD in the UAE.",
      sections: [
        {
          titleAr: "شحن شمسي في البر والسفر",
          titleEn: "Solar charge for desert & travel",
          bodyAr:
            "افتح الألواح تحت الشمس وأعد تعبئة الطاقة وأنت بعيد عن الكهرباء — تصميم متين يناسب الأجواء الخارجية.",
          bodyEn:
            "Open the panels under the sun and top up power away from the grid — a rugged design for outdoor conditions.",
          image: "/products/solar-powerbank-3.png",
        },
        {
          titleAr: "شحن سريع + لاسلكي + كابل مدمج",
          titleEn: "Fast, wireless, and built-in cable",
          bodyAr:
            "مخرج لاسلكي 5V/1A وكابل Lightning 5V/2.1A مع شحن سريع — حلول متعددة في جهاز واحد بدون ما تحمل أسلاك كثيرة.",
          bodyEn:
            "Wireless 5V/1A output and a Lightning line at 5V/2.1A with fast charging — multiple options in one device without carrying many cables.",
          image: "/products/solar-powerbank-2.png",
        },
        {
          titleAr: "إضاءة LED للطوارئ",
          titleEn: "LED lamp for emergencies",
          bodyAr:
            "مصباحان LED قويان يفيدانك في الليل أو انقطاع الكهرباء أو التخييم — أكثر من مجرد شاحن.",
          bodyEn:
            "Two strong LED lamps help at night, during outages, or camping — more than just a charger.",
          image: "/products/solar-powerbank-1.png",
        },
      ],
      benefitsAr: [
        "شحن بالطاقة الشمسية",
        "شحن سريع وحماية ذكية",
        "إضاءة LED قوية",
        "مناسب للبر والسفر",
        "توصيل مجاني والدفع عند الاستلام في الإمارات",
      ],
      benefitsEn: [
        "Solar charging",
        "Fast charge with smart protection",
        "Strong LED lighting",
        "Great for desert trips and travel",
        "Free delivery and COD in the UAE",
      ],
      faq: [
        {
          questionAr: "هل الشحن الشمسي يكفي وحده؟",
          questionEn: "Is solar charging enough alone?",
          answerAr:
            "الشمس ممتازة للشحن التكميلي والطوارئ؛ للشحن الأسرع استخدم الشاحن الكهربائي المعتاد ثم اعتمد على الشمس في الطريق.",
          answerEn:
            "Solar is excellent for top-ups and emergencies; for the fastest charge use a normal wall charger, then rely on the sun on the go.",
        },
        {
          questionAr: "هل الجهاز أصلي DENX؟",
          questionEn: "Is it original DENX?",
          answerAr: "نعم، موديل DENX DX421 مع شارة Original في العرض.",
          answerEn: "Yes — DENX DX421 model with Original badging in the listing.",
        },
      ],
    },
  },
  {
    id: "prod-iphone13-battery-case-sa",
    slug: "iphone-13-pro-battery-case-6800",
    nameAr: "كافر جوال وباوربانك — آيفون 13 برو",
    nameEn: "iPhone 13 Pro Battery Case Power Bank",
    descriptionAr: `
<h3>كافر جوال وباوربانك</h3>
<p>حماية الآيفون وحل مشكلة نفاذ البطارية في قطعة واحدة. كفر شحن لـ <strong>iPhone 13 Pro</strong> ببطارية مدمجة 6800mAh، مؤشرات LED، ومداخل شحن معتمدة.</p>
<ul>
<li>سعة بطارية 6800mAh (25.16Wh)</li>
<li>حماية من الصدمات مع شحن إضافي</li>
<li>مؤشرات LED لمستوى الشحن</li>
<li>إدخال/إخراج DC5V 1–2.0A</li>
<li>شهادات FCC · CE · RoHS</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Phone case + power bank</h3>
<p>iPhone protection and a battery solution in one. A charging case for <strong>iPhone 13 Pro</strong> with a built-in 6800mAh battery, LED indicators, and certified charging ports.</p>
<ul>
<li>6800mAh battery capacity (25.16Wh)</li>
<li>Shock protection plus extra charge</li>
<li>LED charge level indicators</li>
<li>Input/output DC5V 1–2.0A</li>
<li>FCC · CE · RoHS certifications</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "متوافق مع iPhone 13 Pro",
      "بطارية مدمجة 6800mAh",
      "مؤشرات LED لمستوى الشحن",
      "إدخال DC5V 1–2.0A",
      "إخراج DC5V 1–2.0A",
      "شهادات FCC / CE / RoHS",
    ],
    detailsEn: [
      "Compatible with iPhone 13 Pro",
      "Built-in 6800mAh battery",
      "LED charge indicators",
      "Input DC5V 1–2.0A",
      "Output DC5V 1–2.0A",
      "FCC / CE / RoHS certified",
    ],
    priceUSD: 33,
    compareAtUSD: 49,
    marketPrices: { SA: 125 },
    marketComparePrices: { SA: 189 },
    availableIn: ["SA"],
    images: [
      "/products/iphone13-battery-case-demo.gif",
      "/products/iphone13-battery-case-g1.png",
      "/products/iphone13-battery-case-g2.png",
      "/products/iphone13-battery-case-g3.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 128,
    categoryId: "cat-SA",
    createdAt: "2026-08-21T23:50:00.000Z",
    landing: {
      headlineAr: "حماية الآيفون وحل نفاذ البطارية",
      headlineEn: "Protect the iPhone and fix battery drain",
      introAr:
        "كافر وباوربانك معًا لـ iPhone 13 Pro: حماية يومية + شحن إضافي 6800mAh بدون ما تحمل شاحن منفصل. اطلب الآن — توصيل مجاني والدفع عند الاستلام في السعودية.",
      introEn:
        "A case and power bank in one for iPhone 13 Pro: daily protection plus 6800mAh extra charge without carrying a separate charger. Order now — free delivery and COD in Saudi Arabia.",
      sections: [
        {
          titleAr: "كافر + باوربانك في قطعة واحدة",
          titleEn: "Case + power bank in one",
          bodyAr:
            "صُمم لآيفون 13 برو: يحمي الجهاز ويشحنّه في نفس الوقت مع مؤشرات LED واضحة لمستوى الطاقة.",
          bodyEn:
            "Built for iPhone 13 Pro: protects the phone and charges it at the same time with clear LED power indicators.",
          image: "/products/iphone13-battery-case.png",
        },
        {
          titleAr: "سعة 6800mAh لاستخدام أطول",
          titleEn: "6800mAh for longer use",
          bodyAr:
            "بطارية مدمجة قوية تساعدك تكمّل يومك بدون البحث عن فيشة — مثالي للعمل والسفر والتنقل.",
          bodyEn:
            "A strong built-in battery helps you finish the day without hunting for an outlet — ideal for work, travel, and commuting.",
        },
        {
          titleAr: "شحن آمن بمواصفات واضحة",
          titleEn: "Safe charging with clear specs",
          bodyAr:
            "إدخال وإخراج DC5V مع شهادات FCC وCE وRoHS لطمأنينة أكبر أثناء الاستخدام اليومي.",
          bodyEn:
            "DC5V input/output with FCC, CE, and RoHS marks for more confidence in daily use.",
        },
      ],
      benefitsAr: [
        "حماية + شحن في كفر واحد",
        "سعة 6800mAh",
        "مؤشرات LED",
        "مناسب لآيفون 13 برو",
        "توصيل مجاني والدفع عند الاستلام في السعودية",
      ],
      benefitsEn: [
        "Protection + charging in one case",
        "6800mAh capacity",
        "LED indicators",
        "Made for iPhone 13 Pro",
        "Free delivery and COD in Saudi Arabia",
      ],
      faq: [
        {
          questionAr: "هل يناسب آيفون 13 العادي؟",
          questionEn: "Does it fit regular iPhone 13?",
          answerAr:
            "العرض مخصص لـ iPhone 13 Pro حسب فتحة الكاميرات الثلاث. تأكد من موديل جهازك قبل الطلب.",
          answerEn:
            "This listing is for iPhone 13 Pro based on the triple-camera cutout. Confirm your model before ordering.",
        },
        {
          questionAr: "كيف أعرف مستوى الشحن؟",
          questionEn: "How do I know the charge level?",
          answerAr: "عبر مؤشرات LED الأربعة على واجهة الكفر.",
          answerEn: "Via the four LED indicators on the front of the case.",
        },
      ],
    },
  },
  {
    id: "prod-budi-powerbank-sa",
    slug: "budi-power-bank-20000mah",
    nameAr: "باور بانك budi 20000mAh — ضمان عامين",
    nameEn: "budi Power Bank 20000mAh — 2 Year Warranty",
    descriptionAr: `
<h3>budi power bank 20000 mAh</h3>
<p>باور بانك بسعة كبيرة يشحن جوالك أكثر من مرة، مع مؤشرات LED وتصميم متين للسفر والاستخدام اليومي. <strong>ضمان عامين</strong>.</p>
<ul>
<li>سعة 20000 مللي أمبير</li>
<li>ضمان عامين من budi</li>
<li>مؤشرات LED لمستوى الشحن</li>
<li>تصميم مريح بمقبض لمسي</li>
<li>مناسب للجوالات والأجهزة اللوحية</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>budi power bank 20000 mAh</h3>
<p>A high-capacity power bank that can charge your phone multiple times, with LED indicators and a durable design for travel and daily use. <strong>2-year warranty</strong>.</p>
<ul>
<li>20000mAh capacity</li>
<li>2-year budi warranty</li>
<li>LED charge level indicators</li>
<li>Comfortable textured grip design</li>
<li>Suitable for phones and tablets</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "الماركة: budi",
      "السعة: 20000mAh",
      "ضمان عامين",
      "مؤشرات LED",
      "تصميم متين للاستخدام اليومي",
    ],
    detailsEn: [
      "Brand: budi",
      "Capacity: 20000mAh",
      "2-year warranty",
      "LED indicators",
      "Durable design for daily use",
    ],
    priceUSD: 32,
    compareAtUSD: 51,
    marketPrices: { SA: 120 },
    marketComparePrices: { SA: 190 },
    availableIn: ["SA"],
    images: [
      "/products/budi-powerbank-20000-demo.gif",
      "/products/budi-powerbank-20000-g1.png",
      "/products/budi-powerbank-20000-g2.png",
      "/products/budi-powerbank-20000-g3.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 203,
    categoryId: "cat-SA",
    createdAt: "2026-08-21T23:54:00.000Z",
    landing: {
      headlineAr: "باوربانك budi 20000mAh بضمان عامين",
      headlineEn: "budi 20000mAh power bank with 2-year warranty",
      introAr:
        "سعة كبيرة تكفيك تشحن جوالك أكثر من مرة، مع ضمان عامين واطلب الحين — توصيل مجاني والدفع عند الاستلام في السعودية.",
      introEn:
        "High capacity to charge your phone multiple times, with a 2-year warranty. Order now — free delivery and COD in Saudi Arabia.",
      sections: [
        {
          titleAr: "سعة 20000mAh ليوم طويل",
          titleEn: "20000mAh for a long day",
          bodyAr:
            "اشحن أكثر من مرة بدون ما تدور على فيشة — مثالي للعمل، السفر، والطوارئ.",
          bodyEn:
            "Charge more than once without hunting for an outlet — ideal for work, travel, and emergencies.",
          image: "/products/budi-powerbank-20000.png",
        },
        {
          titleAr: "ضمان عامين",
          titleEn: "2-year warranty",
          bodyAr:
            "اطمئن على استثمارك مع ضمان عامين من budi — ثقة أعلى للعميل وتحويل أفضل في الإعلان.",
          bodyEn:
            "Shop with confidence with a 2-year budi warranty — more trust for the customer and better ad conversion.",
        },
        {
          titleAr: "تصميم عملي ومؤشرات واضحة",
          titleEn: "Practical design & clear indicators",
          bodyAr:
            "سطح ملمس مريح ومؤشرات LED لتعرف نسبة الشحن بسرعة قبل ما تطلع من البيت.",
          bodyEn:
            "A comfortable textured surface and LED indicators so you know the charge level before you leave home.",
        },
      ],
      benefitsAr: [
        "سعة 20000mAh",
        "ضمان عامين",
        "مؤشرات LED",
        "ماركة budi",
        "توصيل مجاني والدفع عند الاستلام في السعودية",
      ],
      benefitsEn: [
        "20000mAh capacity",
        "2-year warranty",
        "LED indicators",
        "budi brand",
        "Free delivery and COD in Saudi Arabia",
      ],
      faq: [
        {
          questionAr: "كم مرة يشحن الجوال؟",
          questionEn: "How many phone charges?",
          answerAr:
            "يعتمد على سعة بطارية جوالك واستهلاكك؛ عادة تكفي لشحنات متعددة خلال اليوم.",
          answerEn:
            "Depends on your phone battery and usage; typically enough for multiple charges through the day.",
        },
        {
          questionAr: "هل الضمان حقيقي؟",
          questionEn: "Is the warranty real?",
          answerAr: "نعم، العرض يتضمن ضمان عامين حسب مواصفات منتج budi.",
          answerEn: "Yes — the listing includes a 2-year warranty per budi product terms.",
        },
      ],
    },
  },
  {
    id: "prod-denx-dx648-ae-legacy",
    slug: "denx-dx648-bluetooth-earbuds-legacy",
    nameAr: "سماعة بلوتوث DENX DX648 — ضمان سنة",
    nameEn: "DENX DX648 Bluetooth Earbuds — 1 Year Warranty",
    descriptionAr: `
<h3>سماعة بلوتوث DENX DX648</h3>
<p>سماعة لاسلكية أصلية بصوت ستيريو محيطي، بلوتوث 5.1، واستعداد طويل حتى 30 ساعة مع العلبة. <strong>ضمان سنة</strong>.</p>
<ul>
<li>موديل DENX DX648 Original</li>
<li>بلوتوث متقدم 5.1</li>
<li>صوت ستيريو محيطي</li>
<li>استعداد طويل حتى 30 ساعة</li>
<li>ضمان سنة كاملة</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>DENX DX648 Bluetooth earbuds</h3>
<p>Original wireless earbuds with surround stereo sound, Bluetooth 5.1, and long standby up to 30 hours with the case. <strong>1-year warranty</strong>.</p>
<ul>
<li>DENX DX648 Original model</li>
<li>Advanced Bluetooth 5.1</li>
<li>Audio stereo surround sound</li>
<li>Long standby up to 30 hours</li>
<li>Full 1-year warranty</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "الماركة: DENX",
      "الموديل: DX648",
      "بلوتوث 5.1",
      "استعداد حتى 30 ساعة",
      "لون أبيض",
      "ضمان سنة",
    ],
    detailsEn: [
      "Brand: DENX",
      "Model: DX648",
      "Bluetooth 5.1",
      "Standby up to 30 hours",
      "White color",
      "1-year warranty",
    ],
    priceUSD: 42,
    compareAtUSD: 55,
    marketPrices: { AE: 155 },
    marketComparePrices: { AE: 200 },
    availableIn: [],
    images: [
      "/products/denx-dx648-earbuds-demo.gif",
      "/products/denx-dx648-earbuds-g1.png",
      "/products/denx-dx648-earbuds-g2.png",
      "/products/denx-dx648-earbuds-g3.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 176,
    categoryId: "cat-AE",
    createdAt: "2026-08-22T00:00:00.000Z",
    landing: {
      headlineAr: "سماعة بلوتوث DENX DX648",
      headlineEn: "DENX DX648 Bluetooth earbuds",
      introAr:
        "صوت نقي، توصيل سريع، وضمان سنة. اطلب الحين — توصيل مجاني والدفع عند الاستلام في الإمارات.",
      introEn:
        "Clear sound, fast pairing, and a 1-year warranty. Order now — free delivery and COD in the UAE.",
      sections: [
        {
          titleAr: "صوت ستيريو محيطي",
          titleEn: "Surround stereo sound",
          bodyAr:
            "استمتع بموسيقى ومكالمات أوضح مع تصميم In-Ear مريح للاستخدام اليومي.",
          bodyEn:
            "Enjoy clearer music and calls with a comfortable in-ear design for everyday use.",
          image: "/products/denx-dx648-earbuds.png",
        },
        {
          titleAr: "بلوتوث 5.1 واستعداد طويل",
          titleEn: "Bluetooth 5.1 & long standby",
          bodyAr:
            "توصيل ثابت مع الجوال والتابلت، واستعداد طويل مع العلبة حتى لا ينقطع يومك.",
          bodyEn:
            "Stable pairing with phones and tablets, plus long case standby so your day stays connected.",
        },
        {
          titleAr: "أصلية مع ضمان سنة",
          titleEn: "Original with 1-year warranty",
          bodyAr:
            "شارة Original وضمان سنة كاملة تعطي العميل ثقة أعلى عند الطلب بالدفع عند الاستلام.",
          bodyEn:
            "Original badging and a full-year warranty build more trust for cash-on-delivery orders.",
        },
      ],
      benefitsAr: [
        "DENX DX648 أصلية",
        "بلوتوث 5.1",
        "ضمان سنة",
        "لون أبيض أنيق",
        "توصيل مجاني والدفع عند الاستلام في الإمارات",
      ],
      benefitsEn: [
        "Original DENX DX648",
        "Bluetooth 5.1",
        "1-year warranty",
        "Sleek white finish",
        "Free delivery and COD in the UAE",
      ],
      faq: [
        {
          questionAr: "هل تناسب آيفون وأندرويد؟",
          questionEn: "Do they work with iPhone and Android?",
          answerAr: "نعم، عبر البلوتوث مع معظم الجوالات والأجهزة اللوحية.",
          answerEn: "Yes — via Bluetooth with most phones and tablets.",
        },
        {
          questionAr: "ما مدة الضمان؟",
          questionEn: "How long is the warranty?",
          answerAr: "ضمان سنة كاملة حسب عرض المنتج.",
          answerEn: "A full 1-year warranty as listed.",
        },
      ],
    },
  },
  {
    id: "prod-xiaomi-earbuds-sa",
    slug: "xiaomi-wireless-earbuds-tws",
    nameAr: "سماعة شاومي لاسلكية TWS — 5 ألوان",
    nameEn: "Xiaomi Wireless TWS Earbuds — 5 Colors",
    descriptionAr: `
<h3>سماعة شاومي لاسلكية</h3>
<p>سماعة بلوتوث بتصميم أنيق وعلبة شحن، تحكم باللمس، بلوتوث 5.0، ومتوافقة مع كل الجوالات الذكية. متوفرة بـ <strong>5 ألوان</strong>.</p>
<ul>
<li>ماركة Xiaomi / mi</li>
<li>بلوتوث 5.0</li>
<li>تحكم باللمس Touch control</li>
<li>مناسبة لجميع الجوالات الذكية</li>
<li>ألوان: أخضر · كحلي · ذهبي · أبيض · أسود</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Xiaomi wireless earbuds</h3>
<p>Bluetooth earbuds with a sleek charging case, touch control, Bluetooth 5.0, and compatibility with all smartphones. Available in <strong>5 colors</strong>.</p>
<ul>
<li>Xiaomi / mi brand</li>
<li>Bluetooth 5.0</li>
<li>Touch control</li>
<li>For all smartphones</li>
<li>Colors: Green · Navy · Gold · White · Black</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "ماركة Xiaomi",
      "بلوتوث 5.0",
      "تحكم باللمس",
      "علبة شحن مع مؤشر LED",
      "5 ألوان متاحة",
      "متوافقة مع كل الجوالات الذكية",
    ],
    detailsEn: [
      "Xiaomi brand",
      "Bluetooth 5.0",
      "Touch control",
      "Charging case with LED indicator",
      "5 available colors",
      "Compatible with all smartphones",
    ],
    priceUSD: 26,
    compareAtUSD: 40,
    marketPrices: { SA: 99 },
    marketComparePrices: { SA: 149 },
    availableIn: ["SA"],
    images: [
      "/products/xiaomi-earbuds-tws-demo.gif",
      "/products/xiaomi-earbuds-tws-g1.png",
      "/products/xiaomi-earbuds-tws-g2.png",
      "/products/xiaomi-earbuds-tws-g3.png",
    ],
    colors: [
      { id: "green", nameAr: "أخضر", nameEn: "Green", hex: "#1f4d3a" },
      { id: "navy", nameAr: "كحلي", nameEn: "Navy", hex: "#1e3a5f" },
      { id: "gold", nameAr: "ذهبي شمباني", nameEn: "Champagne Gold", hex: "#c9b896" },
      { id: "white", nameAr: "أبيض", nameEn: "White", hex: "#f4f4f4" },
      { id: "black", nameAr: "أسود", nameEn: "Black", hex: "#1a1a1a" },
    ],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 241,
    categoryId: "cat-SA",
    createdAt: "2026-08-22T00:02:00.000Z",
    landing: {
      headlineAr: "سماعة شاومي لاسلكية بـ 5 ألوان",
      headlineEn: "Xiaomi wireless earbuds in 5 colors",
      introAr:
        "صوت واضح، تحكم باللمس، وبلوتوث 5.0 لكل الجوالات. اختر لونك واطلب الآن — توصيل مجاني والدفع عند الاستلام في السعودية.",
      introEn:
        "Clear sound, touch control, and Bluetooth 5.0 for every phone. Pick your color and order now — free delivery and COD in Saudi Arabia.",
      sections: [
        {
          titleAr: "تصميم Xiaomi أنيق",
          titleEn: "Sleek Xiaomi design",
          bodyAr:
            "علبة شحن بشعار mi ولمسة معدنية ذهبية، مع مؤشر LED واضح ومظهر يناسب الاستخدام اليومي.",
          bodyEn:
            "A charging case with the mi logo and a gold trim, plus a clear LED indicator for everyday style.",
          image: "/products/xiaomi-earbuds-tws.png",
        },
        {
          titleAr: "بلوتوث 5.0 وتحكم باللمس",
          titleEn: "Bluetooth 5.0 & touch control",
          bodyAr:
            "توصيل سريع ومستقر مع الجوال، وتحكم باللمس لتبديل الأغاني والرد على المكالمات بسهولة.",
          bodyEn:
            "Fast stable pairing with your phone, plus touch controls to skip tracks and answer calls easily.",
        },
        {
          titleAr: "5 ألوان تناسب ذوقك",
          titleEn: "5 colors to match your style",
          bodyAr:
            "أخضر، كحلي، ذهبي شمباني، أبيض، وأسود — اختر اللون المفضل عند الطلب.",
          bodyEn:
            "Green, navy, champagne gold, white, and black — pick your favorite color when ordering.",
        },
      ],
      benefitsAr: [
        "ماركة Xiaomi",
        "بلوتوث 5.0",
        "5 ألوان",
        "تحكم باللمس",
        "توصيل مجاني والدفع عند الاستلام في السعودية",
      ],
      benefitsEn: [
        "Xiaomi brand",
        "Bluetooth 5.0",
        "5 colors",
        "Touch control",
        "Free delivery and COD in Saudi Arabia",
      ],
      faq: [
        {
          questionAr: "هل تعمل مع آيفون وأندرويد؟",
          questionEn: "Do they work with iPhone and Android?",
          answerAr: "نعم، متوافقة مع كل الجوالات الذكية عبر البلوتوث.",
          answerEn: "Yes — compatible with all smartphones via Bluetooth.",
        },
        {
          questionAr: "كيف أختار اللون؟",
          questionEn: "How do I choose the color?",
          answerAr: "اختر اللون من خيارات المنتج في صفحة الطلب قبل تأكيد الطلب.",
          answerEn: "Select the color from the product options on the order page before confirming.",
        },
      ],
    },
  },
  {
    id: "prod-car-windshield-umbrella-sa-legacy",
    slug: "car-windshield-sunshade-umbrella-legacy",
    nameAr: "مظلة زجاج للسيارة",
    nameEn: "Car Windshield Sunshade Umbrella",
    descriptionAr: `
<h3>مظلة زجاج للسيارة</h3>
<p>مظلة قابلة للطي تحمي زجاج السيارة الأمامي من الشمس والحرارة، حجمها مناسب ومعك في أي مكان داخل جراب أنيق. تفتح مثل المظلة وتغطي الزجاج بالكامل.</p>
<ul>
<li>تحجب أشعة الشمس وتقلل حرارة المقصورة</li>
<li>قابلة للطي وحملها سهل مع الجراب</li>
<li>تركيب سريع على الزجاج الأمامي</li>
<li>تحمي الطبلون والأجهزة من التلف الحراري</li>
<li>يمكن استخدامها كمظلة خارجية عند الحاجة</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Car windshield sunshade umbrella</h3>
<p>A foldable umbrella-style sunshade that protects the front windshield from sun and heat. Compact size with a carrying sleeve — open it like an umbrella to cover the glass fully.</p>
<ul>
<li>Blocks sunlight and reduces cabin heat</li>
<li>Folds down easily with a storage sleeve</li>
<li>Quick install on the front windshield</li>
<li>Helps protect the dash and electronics from heat damage</li>
<li>Can also be used as an outdoor umbrella when needed</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "مظلة لزجاج السيارة الأمامي",
      "قابلة للطي مع جراب حمل",
      "عزل حراري من أشعة الشمس",
      "تركيب سريع بدون تعقيد",
      "مناسبة لمعظم السيارات",
    ],
    detailsEn: [
      "Front windshield sunshade umbrella",
      "Foldable with carrying sleeve",
      "Thermal sun protection",
      "Quick no-fuss install",
      "Fits most cars",
    ],
    priceUSD: 21,
    compareAtUSD: 32,
    marketPrices: { SA: 79 },
    marketComparePrices: { SA: 119 },
    availableIn: [],
    images: [
      "/products/car-windshield-umbrella-demo.gif",
      "/products/car-windshield-umbrella-g1.png",
      "/products/car-windshield-umbrella-g2.png",
      "/products/car-windshield-umbrella-g3.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 312,
    categoryId: "cat-SA",
    createdAt: "2026-08-22T00:09:00.000Z",
    landing: {
      headlineAr: "مظلة زجاج للسيارة",
      headlineEn: "Car windshield sunshade umbrella",
      introAr:
        "حجمها مناسب ومعك في أي مكان. افتحها على الزجاج الأمامي لتحافظ على برودة السيارة وتحمي الطبلون من الشمس — توصيل مجاني والدفع عند الاستلام في السعودية.",
      introEn:
        "A portable size that goes with you anywhere. Open it on the front glass to keep the cabin cooler and protect the dash from the sun — free delivery and COD in Saudi Arabia.",
      sections: [
        {
          titleAr: "حماية من الشمس والحرارة",
          titleEn: "Sun and heat protection",
          bodyAr:
            "تعكس أشعة الشمس عن الزجاج الأمامي وتساعد على خفض حرارة المقصورة عند الوقوف تحت الشمس.",
          bodyEn:
            "Reflects sunlight off the front windshield and helps lower cabin heat when parked in the sun.",
          image: "/products/car-windshield-umbrella.png",
        },
        {
          titleAr: "طي سهل وحمل خفيف",
          titleEn: "Easy fold & light carry",
          bodyAr:
            "تُطوى داخل جراب أنيق وتبقى جاهزة في الصندوق أو المقعد — بدون شغل مساحة كبيرة.",
          bodyEn:
            "Folds into a neat sleeve and stays ready in the trunk or seat — without taking much space.",
        },
        {
          titleAr: "تركيب في ثوانٍ",
          titleEn: "Install in seconds",
          bodyAr:
            "افتحها مثل المظلة وثبتها على الزجاج من الداخل. سريعة قبل ما تترك السيارة في الحر.",
          bodyEn:
            "Open it like an umbrella and set it against the glass from inside. Fast before you leave the car in the heat.",
        },
      ],
      benefitsAr: [
        "تقليل حرارة السيارة",
        "قابلة للطي مع جراب",
        "تركيب سريع",
        "مناسبة لمناخ السعودية",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Reduces car heat",
        "Foldable with sleeve",
        "Quick install",
        "Ideal for Saudi climate",
        "Free delivery and COD",
      ],
      faq: [
        {
          questionAr: "هل تناسب كل السيارات؟",
          questionEn: "Does it fit all cars?",
          answerAr:
            "مناسبة لمعظم السيارات الصغيرة والمتوسطة. تأكد من مقاس الزجاج الأمامي إن كانت سيارتك كبيرة جدًا.",
          answerEn:
            "Fits most small and mid-size cars. Check windshield size if your vehicle is very large.",
        },
        {
          questionAr: "هل يمكن استخدامها كمظلة مطر؟",
          questionEn: "Can it be used as a rain umbrella?",
          answerAr: "نعم، يمكن استخدامها كمظلة خارجية عند الحاجة حسب العرض.",
          answerEn: "Yes — it can also be used as an outdoor umbrella when needed.",
        },
      ],
    },
  },
  {
    id: "prod-kitchen-3pcs-om",
    slug: "kitchen-3pcs-blender-chopper-juicer",
    nameAr: "عرض 3 قطع: خلاط + مفرمة + عصارة",
    nameEn: "3-Piece Offer: Blender + Chopper + Juicer",
    descriptionAr: `
<h3>عرض 3 قطع بسعر أوفر</h3>
<p>طقم مطبخ متكامل: خلاط قوي SC-1589 مع مطحنة، مفرمة Caseek، وعصارة فواكه — ثلاثة أجهزة أساسية في عرض واحد لتحضير العصائر والسموذي والتقطيع بسرعة.</p>
<ul>
<li>خلاط عالي القوة مع إناء شفاف وملحق طحن</li>
<li>مفرمة Caseek للخضار والفواكه</li>
<li>عصارة لاستخراج عصير فريش بسهولة</li>
<li>تصميم عملي يناسب رخامة المطبخ</li>
<li>عرض 3 قطع بسعر أوفر</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>3-piece offer at a better price</h3>
<p>A complete kitchen set: powerful blender SC-1589 with grinder, Caseek chopper, and a fruit juicer — three essentials in one deal for juices, smoothies, and fast chopping.</p>
<ul>
<li>High-power blender with clear jar and grinder attachment</li>
<li>Caseek chopper for veggies and fruit</li>
<li>Juicer for fresh juice with less effort</li>
<li>Practical design for kitchen counters</li>
<li>3-piece bundle at a better price</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "خلاط SC-1589 مع مطحنة",
      "مفرمة Caseek",
      "عصارة فواكه",
      "عرض 3 قطع",
      "مثالي للاستخدام اليومي في المطبخ",
    ],
    detailsEn: [
      "SC-1589 blender with grinder",
      "Caseek food chopper",
      "Fruit juicer",
      "3-piece offer",
      "Ideal for daily kitchen use",
    ],
    priceUSD: 57,
    compareAtUSD: 83,
    marketPrices: { OM: 22 },
    marketComparePrices: { OM: 32 },
    availableIn: ["OM"],
    images: [
      "/products/kitchen-3pcs-offer-demo.gif",
      "/products/kitchen-3pcs-offer-g1.png",
      "/products/kitchen-3pcs-offer-g2.png",
      "/products/kitchen-3pcs-offer-g3.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 154,
    categoryId: "cat-OM",
    createdAt: "2026-08-22T00:11:00.000Z",
    landing: {
      headlineAr: "عرض 3 قطع بسعر أوفر",
      headlineEn: "3-piece offer at a better price",
      introAr:
        "خلاط + مفرمة + عصارة في طلب واحد لمطبخ أسرع وأوفر. احجز الآن — توصيل مجاني والدفع عند الاستلام في عُمان.",
      introEn:
        "Blender + chopper + juicer in one order for a faster, smarter kitchen. Book now — free delivery and COD in Oman.",
      sections: [
        {
          titleAr: "ثلاثة أجهزة… عرض واحد",
          titleEn: "Three appliances — one offer",
          bodyAr:
            "وفّر على شراء الأجهزة منفصلة واحصل على خلاط ومفرمة وعصارة معًا لتجهيز وصفاتك ومشروباتك يوميًا.",
          bodyEn:
            "Save versus buying separately and get a blender, chopper, and juicer together for daily recipes and drinks.",
          image: "/products/kitchen-3pcs-offer.png",
        },
        {
          titleAr: "خلاط قوي وعصير فريش",
          titleEn: "Powerful blend & fresh juice",
          bodyAr:
            "حضّر السموذي والعصائر الطازجة بسرعة، مع ملحق طحن للتوابل والمكسرات.",
          bodyEn:
            "Make smoothies and fresh juices fast, with a grinder attachment for spices and nuts.",
        },
        {
          titleAr: "مفرمة عملية للتقطيع",
          titleEn: "Practical chopper for prep",
          bodyAr:
            "قطّع الخضار والفواكه في ثوانٍ بدون مجهود كبير — مثالية للتجهيز اليومي.",
          bodyEn:
            "Chop veggies and fruit in seconds with less effort — ideal for daily prep.",
        },
      ],
      benefitsAr: [
        "عرض 3 قطع أوفر",
        "خلاط + مفرمة + عصارة",
        "توفير وقت المطبخ",
        "مناسب للعائلات",
        "توصيل مجاني والدفع عند الاستلام في عُمان",
      ],
      benefitsEn: [
        "Better-priced 3-piece offer",
        "Blender + chopper + juicer",
        "Saves kitchen time",
        "Great for families",
        "Free delivery and COD in Oman",
      ],
      faq: [
        {
          questionAr: "هل الأجهزة الثلاثة ضمن الطلب؟",
          questionEn: "Are all three included?",
          answerAr: "نعم، العرض يشمل الخلاط والمفرمة والعصارة كما في الصورة.",
          answerEn: "Yes — the offer includes the blender, chopper, and juicer as shown.",
        },
        {
          questionAr: "هل الجهد مناسب لعُمان؟",
          questionEn: "Is the voltage suitable for Oman?",
          answerAr:
            "الأجهزة المنزلية المعتادة تعمل على 220–240 فولت. راجع الملصق عند الاستلام للتأكيد.",
          answerEn:
            "Typical home appliances run on 220–240V. Check the label on delivery to confirm.",
        },
      ],
    },
  },
  {
    id: "prod-dish-rack-sink-om",
    slug: "over-sink-dish-drying-rack",
    nameAr: "رف تجفيف صحون فوق الحوض",
    nameEn: "Over-Sink Dish Drying Rack",
    descriptionAr: `
<h3>رف تجفيف صحون فوق الحوض</h3>
<p>رف معدني أسود أنيق يُثبَّت فوق الحوض بأذرع قابلة للتمديد، مع صينية تصريف تصب الماء مباشرة في المغسلة وحامل أدوات مدمج — مساحة أكبر على الرخامة وترتيب أسهل بعد الغسيل.</p>
<ul>
<li>تركيب فوق الحوض بأذرع قابلة للتمديد</li>
<li>صينية تصريف بفوهة تصب في الحوض</li>
<li>حامل معالق وسكاكين مدمج</li>
<li>سعة لصحون وأكواب كبيرة</li>
<li>لون أسود مطفي يناسب المطابخ العصرية</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>Over-sink dish drying rack</h3>
<p>A sleek matte-black metal rack that sits over the sink with extendable arms, a drain tray that pours water into the basin, and a built-in utensil caddy — more counter space and easier drying after washing.</p>
<ul>
<li>Over-sink install with extendable arms</li>
<li>Drain tray with spout into the sink</li>
<li>Built-in utensil holder</li>
<li>Room for plates and cups</li>
<li>Matte black finish for modern kitchens</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "رف فوق الحوض قابل للتمديد",
      "صينية تصريف بفوهة",
      "حامل أدوات مدمج",
      "هيكل معدني متين",
      "لون أسود مطفي",
    ],
    detailsEn: [
      "Extendable over-sink rack",
      "Drain tray with spout",
      "Built-in utensil caddy",
      "Sturdy metal frame",
      "Matte black finish",
    ],
    priceUSD: 26,
    compareAtUSD: 39,
    marketPrices: { OM: 9.9 },
    marketComparePrices: { OM: 14.9 },
    availableIn: ["OM"],
    images: [
      "/products/dish-drying-rack-sink-demo.gif",
      "/products/dish-drying-rack-sink-g1.png",
      "/products/dish-drying-rack-sink-g2.png",
      "/products/dish-drying-rack-sink-g3.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 189,
    categoryId: "cat-OM",
    createdAt: "2026-08-22T00:13:00.000Z",
    landing: {
      headlineAr: "رف تجفيف فوق الحوض… بدون بلّ الرخامة",
      headlineEn: "Over-sink drying — without wet counters",
      introAr:
        "ثبّته فوق المغسلة، خلّ الماء ينزل مباشرة للحوض، ورتّب الصحون والأكواب والأدوات في مكان واحد. اطلب الآن — توصيل مجاني والدفع عند الاستلام في عُمان.",
      introEn:
        "Set it over the sink, let water drain straight into the basin, and organize plates, cups, and utensils in one place. Order now — free delivery and COD in Oman.",
      sections: [
        {
          titleAr: "تصريف مباشر إلى الحوض",
          titleEn: "Direct drain into the sink",
          bodyAr:
            "صينية سفلية بفوهة تصريف توجّه الماء للحوض بدل ما يتجمع على الرخامة.",
          bodyEn:
            "A bottom tray with a spout directs water into the sink instead of pooling on the counter.",
          image: "/products/dish-drying-rack-sink.png",
        },
        {
          titleAr: "أذرع قابلة للتمديد",
          titleEn: "Extendable support arms",
          bodyAr:
            "أذرع جانبية تتمدد لتناسب عرض الحوض مع أقدام مانعة للانزلاق لثبات أفضل.",
          bodyEn:
            "Side arms extend to fit the sink width, with non-slip feet for better stability.",
        },
        {
          titleAr: "ترتيب كامل مع حامل الأدوات",
          titleEn: "Full organize with utensil caddy",
          bodyAr:
            "مساحة للصحون والأكواب + حامل للمعالق والسكاكين — كل شيء يجف في مكان واحد.",
          bodyEn:
            "Space for plates and cups plus a holder for spoons and knives — everything dries in one place.",
        },
      ],
      benefitsAr: [
        "يوفر مساحة الرخامة",
        "تصريف للحوض مباشرة",
        "حامل أدوات مدمج",
        "لون أسود أنيق",
        "توصيل مجاني والدفع عند الاستلام في عُمان",
      ],
      benefitsEn: [
        "Saves counter space",
        "Drains into the sink",
        "Built-in utensil holder",
        "Sleek black look",
        "Free delivery and COD in Oman",
      ],
      faq: [
        {
          questionAr: "هل يناسب كل الأحواض؟",
          questionEn: "Does it fit every sink?",
          answerAr:
            "مناسب لمعظم الأحواض المنزلية بفضل الأذرع القابلة للتمديد. تأكد من عرض حوضك قبل الطلب إن كان ضيقًا جدًا أو واسعًا جدًا.",
          answerEn:
            "Fits most home sinks thanks to extendable arms. Check your sink width before ordering if it is unusually narrow or wide.",
        },
        {
          questionAr: "هل يصدأ؟",
          questionEn: "Will it rust?",
          answerAr:
            "الهيكل مطلي بلون أسود للاستخدام اليومي مع الماء؛ جفّفه بين الفترة والأخرى لعمر أطول.",
          answerEn:
            "The frame has a black finish for daily wet use; wipe it dry occasionally for longer life.",
        },
      ],
    },
  },
  {
    id: "prod-konnect-kn101-sa",
    slug: "konnect-kn101-power-bank-30000",
    nameAr: "باور بانك KONNECT KN101 — 30000mAh",
    nameEn: "KONNECT KN101 Power Bank — 30000mAh",
    descriptionAr: `
<h3>KONNECT POWER BANK 30000mAh</h3>
<p>شاحن متنقل بسعة ضخمة 30000mAh مع كابلات مدمجة وشحن سريع QC 3.0، وشاشة نسبة الشحن — يشحن حتى 4 أجهزة بدون حمل أسلاك إضافية.</p>
<ul>
<li>سعة 30000mAh</li>
<li>موديل KONNECT KN101</li>
<li>كابلات مدمجة: USB-A · Micro · Lightning · USB-C</li>
<li>شحن سريع QC 3.0 (حتى 4 أجهزة)</li>
<li>مؤشر نسبة الشحن 25 / 50 / 75 / 100</li>
</ul>
${COD_AR}
`.trim(),
    descriptionEn: `
<h3>KONNECT POWER BANK 30000mAh</h3>
<p>A high-capacity 30000mAh portable charger with built-in cables and QC 3.0 fast charging, plus a charge-level display — power up to 4 devices without carrying extra cables.</p>
<ul>
<li>30000mAh capacity</li>
<li>KONNECT KN101 model</li>
<li>Built-in cables: USB-A · Micro · Lightning · USB-C</li>
<li>QC 3.0 fast charge (up to 4 devices)</li>
<li>Charge indicators 25 / 50 / 75 / 100</li>
</ul>
${COD_EN}
`.trim(),
    detailsAr: [
      "الماركة: KONNECT",
      "الموديل: KN101",
      "السعة: 30000mAh",
      "كابلات مدمجة متعددة",
      "شحن سريع QC 3.0",
      "شاشة/مؤشر نسبة الشحن",
    ],
    detailsEn: [
      "Brand: KONNECT",
      "Model: KN101",
      "Capacity: 30000mAh",
      "Multiple built-in cables",
      "QC 3.0 fast charging",
      "Charge percentage indicators",
    ],
    priceUSD: 24,
    compareAtUSD: 37,
    marketPrices: { SA: 89 },
    marketComparePrices: { SA: 139 },
    availableIn: ["SA"],
    images: [
      "/products/konnect-kn101-powerbank-demo.gif",
      "/products/konnect-kn101-powerbank-g1.png",
      "/products/konnect-kn101-powerbank-g2.png",
      "/products/konnect-kn101-powerbank-g3.png",
    ],
    colors: [],
    customColorEnabled: false,
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 198,
    categoryId: "cat-SA",
    createdAt: "2026-08-22T00:16:00.000Z",
    landing: {
      headlineAr: "باور بانك 30000mAh بكابلات مدمجة",
      headlineEn: "30000mAh power bank with built-in cables",
      introAr:
        "سعة كبيرة + 4 كابلات مدمجة + شحن سريع. اطلب الآن — توصيل مجاني والدفع عند الاستلام في السعودية.",
      introEn:
        "Huge capacity + 4 built-in cables + fast charging. Order now — free delivery and COD in Saudi Arabia.",
      sections: [
        {
          titleAr: "سعة 30000mAh ليوم طويل",
          titleEn: "30000mAh for long days",
          bodyAr:
            "اشحن جوالك وأكثر من جهاز خلال السفر والعمل والطوارئ بدون ما تدور على فيشة.",
          bodyEn:
            "Charge your phone and more devices during travel, work, and emergencies without hunting for an outlet.",
          image: "/products/konnect-kn101-powerbank.png",
        },
        {
          titleAr: "كابلات مدمجة لكل الأجهزة",
          titleEn: "Built-in cables for every device",
          bodyAr:
            "USB-A وMicro وLightning وUSB-C داخل الجهاز — أقل أسلاك في الحقيبة وأسرع استخدام.",
          bodyEn:
            "USB-A, Micro, Lightning, and USB-C built in — fewer cables in your bag and faster everyday use.",
        },
        {
          titleAr: "شحن سريع QC 3.0",
          titleEn: "QC 3.0 fast charging",
          bodyAr:
            "شحن أسرع مع إمكانية تشغيل عدة أجهزة معًا حسب العرض، ومؤشرات واضحة لنسبة الطاقة المتبقية.",
          bodyEn:
            "Faster charging with multi-device support as listed, plus clear indicators for remaining power.",
        },
      ],
      benefitsAr: [
        "سعة 30000mAh",
        "4 كابلات مدمجة",
        "شحن سريع QC 3.0",
        "ماركة KONNECT KN101",
        "توصيل مجاني والدفع عند الاستلام في السعودية",
      ],
      benefitsEn: [
        "30000mAh capacity",
        "4 built-in cables",
        "QC 3.0 fast charge",
        "KONNECT KN101 brand",
        "Free delivery and COD in Saudi Arabia",
      ],
      faq: [
        {
          questionAr: "هل يناسب آيفون وأندرويد؟",
          questionEn: "Does it work with iPhone and Android?",
          answerAr: "نعم، بفضل الكابلات المدمجة Lightning وUSB-C وMicro.",
          answerEn: "Yes — thanks to built-in Lightning, USB-C, and Micro cables.",
        },
        {
          questionAr: "هل مسموح به في الطائرة؟",
          questionEn: "Is it airline-safe?",
          answerAr:
            "عادة باور بانك بهذه السعة يُحمل في الأمتعة اليدوية حسب أنظمة الطيران. تأكد من سياسة خط الطيران قبل السفر.",
          answerEn:
            "Power banks of this capacity are usually carry-on only per airline rules. Confirm your airline policy before travel.",
        },
      ],
    },
  },
  ...LATAM_ELEVADOR_PRODUCTS,
  ...UNIVERSAL_MARKET_PRODUCTS,
];

export const SEED_PRODUCTS: Product[] = BASE_PRODUCTS.map(withSpanishCopy);
