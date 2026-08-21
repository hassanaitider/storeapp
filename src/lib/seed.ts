import { STORE_MARKETS } from "./countries";
import type { Category, Product } from "./types";

const CATEGORY_IMAGES: Record<string, string> = {
  SA: "/products/car-vacuum.png",
  AE: "/products/air-bed.png",
  OM: "/products/neck-massager.webp",
};

/** Only Saudi Arabia, UAE, and Oman */
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
    marketPrices: { SA: 189, AE: 179, OM: 19.5 },
    marketComparePrices: { SA: 259, AE: 249, OM: 26.9 },
    availableIn: ["SA", "AE", "OM"],
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
    marketPrices: { SA: 449, AE: 439, OM: 45.9 },
    marketComparePrices: { SA: 559, AE: 549, OM: 56.9 },
    availableIn: ["SA", "AE", "OM"],
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
    marketPrices: { SA: 339, AE: 329, OM: 34.5 },
    marketComparePrices: { SA: 449, AE: 439, OM: 45.9 },
    availableIn: ["SA", "AE", "OM"],
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
    marketPrices: { SA: 149, AE: 145, OM: 14.9 },
    marketComparePrices: { SA: 209, AE: 199, OM: 20.9 },
    availableIn: ["SA", "AE", "OM"],
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
    marketPrices: { SA: 169, AE: 159, OM: 17.5 },
    marketComparePrices: { SA: 249, AE: 229, OM: 24.9 },
    availableIn: ["SA", "AE", "OM"],
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
    marketPrices: { SA: 299, AE: 289, OM: 31 },
    marketComparePrices: { SA: 449, AE: 429, OM: 45 },
    availableIn: ["SA", "AE", "OM"],
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
