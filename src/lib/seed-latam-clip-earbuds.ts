import { currencyForCountry, getCountry, SPANISH_MARKET_CODES } from "./countries";
import { DEFAULT_CURRENCY_RATES } from "./currency";
import { CLIP_EARBUDS_SLUG } from "./product-slugs";
import type { CountryCode, Product } from "./types";

export { CLIP_EARBUDS_SLUG } from "./product-slugs";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";
const COD_ES =
  "<p><strong>Pide ahora</strong> — envío gratis · pago contra entrega · devoluciones en 30 días.</p>";

type LocalPrice = {
  price: number;
  compare: number;
  priceUSD: number;
  compareAtUSD: number;
};

const EAR_USD = 45;
const EAR_COMPARE_USD = 69;

function usdToLatamLocal(country: CountryCode, usd: number): number {
  const code = currencyForCountry(country);
  if (code === "USD") return usd;
  const raw = usd * DEFAULT_CURRENCY_RATES[code];
  if (raw >= 10000) return Math.round(raw / 10) * 10;
  if (raw >= 1000) return Math.round(raw / 10) * 10;
  if (raw >= 100) return Math.round(raw / 10) * 10 - 1;
  return Math.round(raw);
}

const EAR_PRICES: Record<CountryCode, LocalPrice> = Object.fromEntries(
  SPANISH_MARKET_CODES.map((country) => [
    country,
    {
      price: usdToLatamLocal(country, EAR_USD),
      compare: usdToLatamLocal(country, EAR_COMPARE_USD),
      priceUSD: EAR_USD,
      compareAtUSD: EAR_COMPARE_USD,
    },
  ])
) as Record<CountryCode, LocalPrice>;

EAR_PRICES.AR = {
  price: 68400,
  compare: 104900,
  priceUSD: EAR_USD,
  compareAtUSD: EAR_COMPARE_USD,
};
EAR_PRICES.CR = {
  price: 20490,
  compare: 31490,
  priceUSD: EAR_USD,
  compareAtUSD: EAR_COMPARE_USD,
};
EAR_PRICES.DO = {
  price: 2640,
  compare: 4040,
  priceUSD: EAR_USD,
  compareAtUSD: EAR_COMPARE_USD,
};
EAR_PRICES.HN = {
  price: 1149,
  compare: 1759,
  priceUSD: EAR_USD,
  compareAtUSD: EAR_COMPARE_USD,
};
EAR_PRICES.MX = {
  price: 829,
  compare: 1269,
  priceUSD: EAR_USD,
  compareAtUSD: EAR_COMPARE_USD,
};

const IMAGES = [
  "/products/clip-earbuds-1.webp",
  "/products/clip-earbuds-3.webp",
  "/products/clip-earbuds-5.webp",
  "/products/clip-earbuds-4.webp",
  "/products/clip-earbuds-2.webp",
];

function buildClipEarbuds(country: CountryCode): Omit<
  Product,
  | "id"
  | "slug"
  | "categoryId"
  | "availableIn"
  | "marketPrices"
  | "marketComparePrices"
  | "priceUSD"
  | "compareAtUSD"
> {
  const marketNameEs = getCountry(country).nameEs ?? getCountry(country).nameEn;
  return {
    nameAr: "سماعات كليب لاسلكية صوت 9D",
    nameEn: "Clip-On Wireless Earbuds 9D Sound",
    nameEs: "Audífonos Clip Inalámbricos Sonido 9D",
    descriptionAr: `
<h3>صوت 9D مذهل · ستيريو لاسلكي</h3>
<p>سماعات بمقطع على الأذن (أذن مفتوحة)، بلوتوث 5.3، بطارية قوية، وشاشة رقمية تعرض شحن العلبة واليسار واليمين — راحة للرياضة ومكالمات صوت HD.</p>
<ul>
<li>صوت 9D · ستيريو لاسلكي</li>
<li>بلوتوث 5.3 · راحة رياضية</li>
<li>شاشة عرض الطاقة · بطارية قوية</li>
<li>مكالمات صوت HD بجودة HIFI</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Shocking 9D sound · wireless stereo</h3>
<p>Open-ear clip earbuds with Bluetooth 5.3, strong battery life, and a digital power display for the case plus left and right buds — sports comfort and HIFI HD voice calls.</p>
<ul>
<li>Shocking 9D sound · wireless stereo</li>
<li>Wireless 5.3 core · sports comfort</li>
<li>Power display screen · strong battery life</li>
<li>HIFI high-quality HD voice calls</li>
</ul>
${COD_EN}`.trim(),
    descriptionEs: `
<h3>Sonido 9D impresionante · estéreo inalámbrico</h3>
<p>Audífonos de clip de oído abierto con Bluetooth 5.3, batería de larga duración y pantalla digital que muestra la carga del estuche y de cada auricular — comodidad deportiva y llamadas de voz HD HIFI. Pensados para el día a día en ${marketNameEs}.</p>
<ul>
<li>Sonido 9D impresionante · estéreo inalámbrico</li>
<li>Núcleo inalámbrico 5.3 · comodidad deportiva</li>
<li>Pantalla de visualización de carga · batería de larga duración</li>
<li>Llamadas de voz HD de alta calidad HIFI</li>
</ul>
${COD_ES}`.trim(),
    detailsAr: [
      "صوت 9D مذهل · ستيريو لاسلكي",
      "نواة لاسلكية Bluetooth 5.3",
      "راحة رياضية — تصميم كليب بدون إدخال في القناة",
      "بطارية قوية مع شاشة عرض الطاقة",
      "عرض بطارية العلبة + اليسار (L) + اليمين (R) لحظيًا",
      "نقل صوتي اتجاهي يحمي الخصوصية",
      "مكالمات صوت HD بجودة HIFI",
    ],
    detailsEn: [
      "Shocking 9D sound · wireless stereo",
      "Wireless Bluetooth 5.3 core",
      "Sports comfort — open-ear clip, not in-canal",
      "Strong battery life with power display screen",
      "Real-time case + left (L) + right (R) battery display",
      "Directional transmission that protects privacy",
      "HIFI high-quality HD voice calls",
    ],
    detailsEs: [
      "Sonido 9D impresionante · estéreo inalámbrico",
      "Núcleo inalámbrico Bluetooth 5.3",
      "Comodidad deportiva — clip de oído abierto, no entra al canal",
      "Batería de larga duración con pantalla de carga",
      "Visualización en tiempo real: estuche + izquierdo (L) + derecho (R)",
      "Transmisión direccional que protege la privacidad",
      "Llamadas de voz HD de alta calidad HIFI",
    ],
    images: [...IMAGES],
    colors: [],
    customColorEnabled: true,
    qtyUpsellEnabled: true,
    qtyOffers: [
      {
        quantity: 1,
        discountPercent: 0,
        labelEs: "1 pieza",
        labelEn: "1 pc",
        labelAr: "قطعة واحدة",
      },
      {
        quantity: 2,
        discountPercent: 10,
        popular: true,
        labelEs: "2 piezas · para ti y pareja",
        labelEn: "2 pcs · for you and partner",
        labelAr: "قطعتان · لك ولشريكك",
      },
      {
        quantity: 3,
        discountPercent: 15,
        labelEs: "3 piezas · pack familiar",
        labelEn: "3 pcs · family pack",
        labelAr: "3 قطع · باقة عائلية",
      },
    ],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 241,
    createdAt: "2026-09-24T22:00:00.000Z",
    landing: {
      headlineAr: "صوت 9D · ستيريو لاسلكي · شاشة شحن",
      headlineEn: "9D sound · wireless stereo · power display",
      headlineEs: `Sonido 9D impresionante y estéreo inalámbrico — para ${marketNameEs}`,
      introAr:
        "سماعات كليب مفتوحة الأذن: بلوتوث 5.3، راحة للرياضة، بطارية قوية، وشاشة رقمية تبين شحن العلبة واليسار واليمين. مكالمات صوت HD بجودة HIFI.",
      introEn:
        "Open-ear clip earbuds: Bluetooth 5.3, sports comfort, strong battery, and a digital screen that shows case plus left and right charge. HIFI HD voice calls.",
      introEs:
        "Audífonos de clip de oído abierto: Bluetooth 5.3, comodidad deportiva, batería de larga duración y pantalla digital que muestra la carga del estuche y de cada auricular. Llamadas de voz HD HIFI.",
      sections: [
        {
          titleAr: "صوت 9D مذهل · ستيريو لاسلكي",
          titleEn: "Shocking 9D sound · wireless stereo",
          titleEs: "Sonido 9D impresionante · estéreo inalámbrico",
          bodyAr:
            "نواة لاسلكية 5.3، راحة رياضية، وبطارية قوية. شاشة عرض الطاقة على العلبة، ومكالمات صوت HD بجودة HIFI.",
          bodyEn:
            "Wireless 5.3 core, sports comfort, and strong battery life. Power display screen on the case, plus HIFI high-quality HD voice calls.",
          bodyEs:
            "Núcleo inalámbrico 5.3, comodidad deportiva y batería de larga duración. Pantalla de visualización de carga en el estuche y llamadas de voz HD de alta calidad HIFI.",
          image: "/products/clip-earbuds-1.webp",
        },
        {
          titleAr: "تصميم كليب مريح — لون لؤلؤي",
          titleEn: "Comfort clip design — pearl finish",
          titleEs: "Diseño de clip cómodo — acabado perlado",
          bodyAr:
            "تلتصق بالأذن الخارجية من غير ما تدخل القناة. العلبة تعرض 100% وشحن اليسار واليمين — مناسبة للرياضة والاستخدام اليومي.",
          bodyEn:
            "Clips onto the outer ear without entering the canal. The case shows 100% plus left and right charge — made for sports and everyday use.",
          bodyEs:
            "Se engancha en el oído externo sin entrar al canal. El estuche muestra 100% y la carga izquierda y derecha — ideal para deporte y el día a día.",
          image: "/products/clip-earbuds-3.webp",
        },
        {
          titleAr: "شاشة رقمية HD · شحن لحظي",
          titleEn: "HD digital display · real-time battery",
          titleEs: "Pantalla digital HD · batería en tiempo real",
          bodyAr:
            "شاشة رقمية HD: بطارية السماعة اليسرى، بطارية علبة الشحن، وبطارية السماعة اليمنى — تعرف النسبة وأنت خارج البيت.",
          bodyEn:
            "HD digital display: left earphone battery, charging box battery, and right earphone battery — see the percent while you are out.",
          bodyEs:
            "Pantalla digital HD: batería del auricular izquierdo, batería del estuche de carga y batería del auricular derecho — ves el porcentaje mientras sales.",
          image: "/products/clip-earbuds-5.webp",
        },
        {
          titleAr: "نقل اتجاهي يحمي الخصوصية",
          titleEn: "Directional transmission · privacy",
          titleEs: "Transmisión direccional · protección de privacidad",
          bodyAr:
            "يضبط زاوية شعاع الصوت (+25°) لنقل فعّال نحو قناة الأذن — صوت أوضح مع حماية أفضل للخصوصية.",
          bodyEn:
            "Automatically adjusts the integrated sound beam angle (+25°) for efficient transmission into the ear canal — clearer audio with better privacy.",
          bodyEs:
            "Ajusta automáticamente el ángulo del haz de sonido integrado (+25°) para una transmisión eficiente hacia el canal auditivo — audio más claro y mejor privacidad.",
          image: "/products/clip-earbuds-4.webp",
        },
        {
          titleAr: "ستيريو لاسلكي للعمل والرياضة",
          titleEn: "Wireless stereo for work and sport",
          titleEs: "Estéreo inalámbrico para trabajo y deporte",
          bodyAr:
            "نفس الصوت 9D، البلوتوث 5.3، والشاشة الرقمية — جاهزة مع اللابتوب والجوال في المكتب أو في الطريق.",
          bodyEn:
            "The same 9D sound, Bluetooth 5.3, and digital screen — ready with a laptop and phone at the desk or on the go.",
          bodyEs:
            "El mismo sonido 9D, Bluetooth 5.3 y pantalla digital — listos con la laptop y el móvil en la oficina o de camino.",
          image: "/products/clip-earbuds-2.webp",
        },
      ],
      benefitsAr: [
        "صوت 9D مذهل · ستيريو لاسلكي",
        "بلوتوث 5.3 · راحة رياضية",
        "شاشة شحن لحظية للعلبة واليسار واليمين",
        "نقل اتجاهي ومكالمات صوت HD HIFI",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Shocking 9D sound · wireless stereo",
        "Bluetooth 5.3 · sports comfort",
        "Real-time power display for case, L and R",
        "Directional audio and HIFI HD voice calls",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        "Sonido 9D impresionante · estéreo inalámbrico",
        "Bluetooth 5.3 · comodidad deportiva",
        "Pantalla de carga en tiempo real: estuche, L y R",
        "Audio direccional y llamadas de voz HD HIFI",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
        {
          questionAr: "هل تدخل داخل الأذن؟",
          questionEn: "Do they go inside the ear canal?",
          questionEs: "¿Entran dentro del oído?",
          answerAr:
            "لا. تصميم كليب على الأذن الخارجية (أذن مفتوحة) — راحة رياضية وتبقى واعيًا بما حولك.",
          answerEn:
            "No. Open-ear clip on the outer ear — sports comfort while you stay aware of your surroundings.",
          answerEs:
            "No. Clip de oído abierto en el oído externo — comodidad deportiva y sigues escuchando tu entorno.",
        },
        {
          questionAr: "ماذا تعرض الشاشة؟",
          questionEn: "What does the screen show?",
          questionEs: "¿Qué muestra la pantalla?",
          answerAr:
            "شاشة رقمية HD: نسبة علبة الشحن، وبطارية السماعة اليسرى (L) واليمنى (R) لحظيًا.",
          answerEn:
            "An HD digital display: charging case percent plus left (L) and right (R) earbud battery in real time.",
          answerEs:
            "Pantalla digital HD: porcentaje del estuche de carga y batería del auricular izquierdo (L) y derecho (R) en tiempo real.",
        },
        {
          questionAr: "ما إصدار البلوتوث؟",
          questionEn: "What Bluetooth version is it?",
          questionEs: "¿Qué versión de Bluetooth trae?",
          answerAr: "نواة لاسلكية Bluetooth 5.3 لاتصال مستقر.",
          answerEn: "Wireless Bluetooth 5.3 core for a stable connection.",
          answerEs: "Núcleo inalámbrico Bluetooth 5.3 para una conexión estable.",
        },
        {
          questionAr: "كيف أختار اللون؟",
          questionEn: "How do I choose a color?",
          questionEs: "¿Cómo elijo el color?",
          answerAr: "اكتب اللون المفضل (أسود أو أزرق لؤلؤي) قبل تأكيد الطلب.",
          answerEn:
            "Type your preferred color (black or pearl blue) before you confirm the order.",
          answerEs:
            "Escribe el color que prefieres (negro o azul perlado) antes de confirmar el pedido.",
        },
      ],
    },
  };
}

/** One listing per Latin American Spanish market only. */
export const LATAM_CLIP_EARBUDS_PRODUCTS: Product[] = SPANISH_MARKET_CODES.map(
  (country) => {
    const local = EAR_PRICES[country];
    if (!local) {
      throw new Error(`Missing clip earbuds price for ${country}`);
    }
    return {
      ...buildClipEarbuds(country),
      id: `prod-clip-earbuds-${country.toLowerCase()}`,
      slug: CLIP_EARBUDS_SLUG,
      categoryId: `cat-${country}`,
      availableIn: [country],
      priceUSD: EAR_USD,
      compareAtUSD: EAR_COMPARE_USD,
      marketPrices: { [country]: local.price },
      marketComparePrices: { [country]: local.compare },
    };
  }
);
