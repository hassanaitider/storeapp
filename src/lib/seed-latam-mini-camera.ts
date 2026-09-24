import { currencyForCountry, getCountry, SPANISH_MARKET_CODES } from "./countries";
import { DEFAULT_CURRENCY_RATES } from "./currency";
import type { CountryCode, Product } from "./types";

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

const CAM_USD = 45;
const CAM_COMPARE_USD = 69;

function usdToLatamLocal(country: CountryCode, usd: number): number {
  const code = currencyForCountry(country);
  if (code === "USD") return usd;
  const raw = usd * DEFAULT_CURRENCY_RATES[code];
  if (raw >= 10000) return Math.round(raw / 10) * 10;
  if (raw >= 1000) return Math.round(raw / 10) * 10;
  if (raw >= 100) return Math.round(raw / 10) * 10 - 1;
  return Math.round(raw);
}

/** $45 USD (and $69 compare) converted for every LATAM store market. */
const CAM_PRICES: Record<CountryCode, LocalPrice> = Object.fromEntries(
  SPANISH_MARKET_CODES.map((country) => [
    country,
    {
      price: usdToLatamLocal(country, CAM_USD),
      compare: usdToLatamLocal(country, CAM_COMPARE_USD),
      priceUSD: CAM_USD,
      compareAtUSD: CAM_COMPARE_USD,
    },
  ])
) as Record<CountryCode, LocalPrice>;

CAM_PRICES.AR = {
  price: 68400,
  compare: 104900,
  priceUSD: CAM_USD,
  compareAtUSD: CAM_COMPARE_USD,
};
CAM_PRICES.CR = {
  price: 20490,
  compare: 31490,
  priceUSD: CAM_USD,
  compareAtUSD: CAM_COMPARE_USD,
};
CAM_PRICES.DO = {
  price: 2640,
  compare: 4040,
  priceUSD: CAM_USD,
  compareAtUSD: CAM_COMPARE_USD,
};
CAM_PRICES.HN = {
  price: 1149,
  compare: 1759,
  priceUSD: CAM_USD,
  compareAtUSD: CAM_COMPARE_USD,
};
CAM_PRICES.MX = {
  price: 829,
  compare: 1269,
  priceUSD: CAM_USD,
  compareAtUSD: CAM_COMPARE_USD,
};

const IMAGES = [
  "/products/mini-camera-2.webp",
  "/products/mini-camera-1.webp",
  "/products/mini-camera-3.webp",
  "/products/mini-camera-4.webp",
  "/products/mini-camera-5.webp",
];

export const MINI_CAMERA_SLUG = "mini-camara-corporal-1080p";

function buildMiniCamera(country: CountryCode): Omit<
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
    nameAr: "كاميرا جسم مصغرة 1080P",
    nameEn: "1080P Mini Body Camera",
    nameEs: "Mini Cámara Corporal HD 1080P",
    descriptionAr: `
<h3>مسجل صوت وكاميرا رياضية في جهاز واحد</h3>
<p>كاميرا صغيرة بمشبك خلفي ثابت، فيديو HD 1080P، عدسة قابلة للدوران حتى 180°، ورؤية ليلية — تشغيل بزر واحد.</p>
<ul>
<li>فيديو HD 1080P مع تقليل الضوضاء</li>
<li>مشبك خلفي مضاد للاهتزاز</li>
<li>عدسة دوّارة 0° · 90° · 180°</li>
<li>رؤية ليلية · بطاقة TF قابلة للتوسيع</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Voice recorder and sports camera in one</h3>
<p>A pocket-size clip-on camera with stable wear, HD 1080P video, a lens that rotates up to 180°, and night vision — one-button start.</p>
<ul>
<li>HD 1080P video with noise reduction</li>
<li>Anti-shake back clip for clearer footage</li>
<li>Rotatable lens: 0° · 90° · 180°</li>
<li>Night vision · expandable TF / microSD</li>
</ul>
${COD_EN}`.trim(),
    descriptionEs: `
<h3>Grabadora de voz y cámara deportiva en un solo aparato</h3>
<p>Mini cámara con clip estable, video HD 1080P, lente giratoria hasta 180° y visión nocturna — se enciende con un botón. Ideal para deporte, trayecto o seguridad personal en ${marketNameEs}.</p>
<ul>
<li>Video HD 1080P con reducción de ruido</li>
<li>Clip antivibración para grabar más nítido</li>
<li>Lente giratoria: 0° · 90° · 180°</li>
<li>Visión nocturna · memoria TF expandible</li>
</ul>
${COD_ES}`.trim(),
    detailsAr: [
      "دقة فيديو HD 1080P",
      "مسجل صوت مع تقليل الضوضاء",
      "مشبك خلفي ثابت مضاد للاهتزاز",
      "عدسة عالية الدقة قابلة للدوران حتى 180°",
      "رؤية ليلية بـ 4 مصابيح IR",
      "تشغيل بزر واحد: صوت / فيديو / ليل",
      "فتحة بطاقة TF (microSD) قابلة للتوسيع",
      "ميكروفون مدمج · منفذ شحن",
    ],
    detailsEn: [
      "HD 1080P video resolution",
      "Voice recording with noise reduction",
      "Stable anti-shake back clip",
      "Rotatable HD lens up to 180°",
      "Night vision with 4 IR LEDs",
      "One-button start: audio / video / night",
      "Expandable TF (microSD) slot",
      "Built-in mic · charging port",
    ],
    detailsEs: [
      "Resolución de video HD 1080P",
      "Grabación de voz con reducción de ruido",
      "Clip trasero estable antivibración",
      "Lente HD giratoria hasta 180°",
      "Visión nocturna con 4 LEDs IR",
      "Inicio con un botón: audio / video / noche",
      "Ranura TF (microSD) expandible",
      "Micrófono integrado · puerto de carga",
    ],
    images: [...IMAGES],
    colors: [],
    customColorEnabled: false,
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
        labelEs: "2 piezas · para ti y la familia",
        labelEn: "2 pcs · for you and family",
        labelAr: "قطعتان · لك وللعائلة",
      },
      {
        quantity: 3,
        discountPercent: 15,
        labelEs: "3 piezas · pack completo",
        labelEn: "3 pcs · full pack",
        labelAr: "3 قطع · باقة كاملة",
      },
    ],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 186,
    createdAt: "2026-09-24T00:00:00.000Z",
    landing: {
      headlineAr: "1080P · مشبك ثابت · عدسة 180°",
      headlineEn: "1080P · stable clip · 180° lens",
      headlineEs: `Video 1080P, clip estable y lente 180° — para ${marketNameEs}`,
      introAr:
        "كاميرا جيب صغيرة: تسجّل صوتًا وفيديوًا، تلتصق بالجيب أو الحزام، والعدسة تدور حسب الزاوية اللي بغيتي. رؤية ليلية وتشغيل بزر واحد.",
      introEn:
        "A pocket mini camera: records audio and video, clips to a pocket or belt, and the lens rotates to the angle you need. Night vision and one-button start.",
      introEs:
        "Mini cámara de bolsillo: graba audio y video, se fija al bolsillo o al cinturón, y la lente gira al ángulo que necesitas. Visión nocturna y arranque con un botón.",
      sections: [
        {
          titleAr: "فيديو HD 1080P في جهاز صغير",
          titleEn: "HD 1080P video in a tiny body",
          titleEs: "Video HD 1080P en un cuerpo mini",
          bodyAr:
            "جودة واضحة للرياضة، الطريق، أو توثيق يومك. تقليل الضوضاء، مشبك ثابت، وتشغيل فيديو بزر واحد — مع إمكانية توسيع الذاكرة ببطاقة TF.",
          bodyEn:
            "Clear quality for sports, commuting, or documenting your day. Noise reduction, a stable clip, and one-button video — plus expandable TF storage.",
          bodyEs:
            "Calidad nítida para deporte, el trayecto o documentar tu día. Reducción de ruido, clip estable y grabación con un botón — más memoria TF expandible.",
          image: "/products/mini-camera-2.webp",
        },
        {
          titleAr: "مشبك خلفي ثابت أوضح",
          titleEn: "A stable back clip for clearer footage",
          titleEs: "Clip trasero estable, grabación más clara",
          bodyAr:
            "ثبّتها على الجيب أو الملابس. المشبك المضاد للاهتزاز يخلي التسجيل أوضح وأنت تمشي أو تركب الدراجة — مسجل صوت وكاميرا رياضية معًا.",
          bodyEn:
            "Clip it to a pocket or clothing. The anti-shake clip keeps recording clearer while you walk or ride — voice recorder and sports camera in one.",
          bodyEs:
            "Engánchala al bolsillo o a la ropa. El clip antivibración mantiene la grabación más clara al caminar o pedalear — grabadora de voz y cámara deportiva a la vez.",
          image: "/products/mini-camera-1.webp",
        },
        {
          titleAr: "عدسة دوّارة حتى 180°",
          titleEn: "Rotatable HD lens up to 180°",
          titleEs: "Lente HD giratoria hasta 180°",
          bodyAr:
            "وجّه العدسة 0° أو 90° أو 180° حسب المشهد. تحت العدسة مصابيح IR للرؤية الليلية — زاوية مناسبة بدون ما تحرّك الجهاز كامل.",
          bodyEn:
            "Aim the lens at 0°, 90°, or 180° for the scene. IR LEDs under the lens handle night vision — the right angle without moving the whole unit.",
          bodyEs:
            "Apunta la lente a 0°, 90° o 180° según la escena. Los LEDs IR bajo la lente dan visión nocturna — el ángulo correcto sin mover todo el aparato.",
          image: "/products/mini-camera-3.webp",
        },
        {
          titleAr: "تشغيل بزر واحد",
          titleEn: "One-click start",
          titleEs: "Inicio con un solo clic",
          bodyAr:
            "صوت، فيديو، ورؤية ليلية — التشغيل بسيط وواضح. أزرار جانبية للتسجيل والحفظ، ومفتاح تشغيل، وفتحة TF وميكروفون جاهزين.",
          bodyEn:
            "Audio, video, and night vision — simple and intuitive. Side buttons for record/save, power switch, plus TF slot and mic ready to go.",
          bodyEs:
            "Audio, video y visión nocturna — simple e intuitivo. Botones laterales para grabar/guardar, interruptor ON/OFF, ranura TF y micrófono listos.",
          image: "/products/mini-camera-4.webp",
        },
        {
          titleAr: "رؤية ليلية ومراقبة من الجوال",
          titleEn: "Night vision and phone monitoring",
          titleEs: "Visión nocturna y monitoreo desde el móvil",
          bodyAr:
            "سجّل في الإضاءة المنخفضة مع IR، وراقب عبر التطبيق عند التوافق. كاميرا مصغرة تناسب الأمن الشخصي أو الاستخدام اليومي.",
          bodyEn:
            "Record in low light with IR, and monitor via the app when supported. A mini camera built for personal security or everyday use.",
          bodyEs:
            "Graba con poca luz gracias a los IR y monitorea desde la app cuando es compatible. Mini cámara pensada para seguridad personal o uso diario.",
          image: "/products/mini-camera-5.webp",
        },
      ],
      benefitsAr: [
        "فيديو HD 1080P مع تقليل الضوضاء",
        "مشبك ثابت وعدسة دوّارة 180°",
        "رؤية ليلية وتشغيل بزر واحد",
        "ذاكرة TF قابلة للتوسيع",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "HD 1080P video with noise reduction",
        "Stable clip and rotatable 180° lens",
        "Night vision and one-button start",
        "Expandable TF memory",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        "Video HD 1080P con reducción de ruido",
        "Clip estable y lente giratoria 180°",
        "Visión nocturna e inicio con un botón",
        "Memoria TF expandible",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
        {
          questionAr: "هل هي كاميرا فقط أم مسجل صوت أيضًا؟",
          questionEn: "Is it only a camera or also a voice recorder?",
          questionEs: "¿Es solo cámara o también grabadora de voz?",
          answerAr: "الاثنين معًا: تسجيل صوت وفيديو، مع تشغيل بزر واحد.",
          answerEn: "Both: audio and video recording, with one-button start.",
          answerEs:
            "Las dos cosas: grabación de audio y video, con inicio de un botón.",
        },
        {
          questionAr: "كم تدور العدسة؟",
          questionEn: "How far does the lens rotate?",
          questionEs: "¿Cuánto gira la lente?",
          answerAr: "حتى 180° — مواضع 0° و90° و180° حسب زاوية التصوير.",
          answerEn: "Up to 180° — 0°, 90°, and 180° positions for the shot.",
          answerEs:
            "Hasta 180° — posiciones 0°, 90° y 180° según el ángulo de la toma.",
        },
        {
          questionAr: "هل تدعم الرؤية الليلية؟",
          questionEn: "Does it support night vision?",
          questionEs: "¿Tiene visión nocturna?",
          answerAr: "نعم، عبر مصابيح IR تحت العدسة مع إمكانية تشغيل/إيقاف.",
          answerEn: "Yes — IR LEDs under the lens with on/off control.",
          answerEs:
            "Sí — LEDs IR bajo la lente con control de encendido/apagado.",
        },
        {
          questionAr: "هل يمكن توسيع الذاكرة؟",
          questionEn: "Can I expand the memory?",
          questionEs: "¿Se puede ampliar la memoria?",
          answerAr: "نعم، عبر فتحة بطاقة TF (microSD).",
          answerEn: "Yes — via the TF (microSD) card slot.",
          answerEs: "Sí — con la ranura para tarjeta TF (microSD).",
        },
      ],
    },
  };
}

/** One listing per Latin American Spanish market only. */
export const LATAM_MINI_CAMERA_PRODUCTS: Product[] = SPANISH_MARKET_CODES.map(
  (country) => {
    const local = CAM_PRICES[country];
    if (!local) {
      throw new Error(`Missing mini camera price for ${country}`);
    }
    return {
      ...buildMiniCamera(country),
      id: `prod-mini-camera-${country.toLowerCase()}`,
      slug: MINI_CAMERA_SLUG,
      categoryId: `cat-${country}`,
      availableIn: [country],
      priceUSD: CAM_USD,
      compareAtUSD: CAM_COMPARE_USD,
      marketPrices: { [country]: local.price },
      marketComparePrices: { [country]: local.compare },
    };
  }
);
