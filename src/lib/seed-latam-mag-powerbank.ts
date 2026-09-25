import { currencyForCountry, getCountry, SPANISH_MARKET_CODES } from "./countries";
import { DEFAULT_CURRENCY_RATES } from "./currency";
import { MAG_POWERBANK_SLUG } from "./product-slugs";
import type { CountryCode, Product } from "./types";

export { MAG_POWERBANK_SLUG } from "./product-slugs";

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

const MAG_USD = 49;
const MAG_COMPARE_USD = 79;

function usdToLatamLocal(country: CountryCode, usd: number): number {
  const code = currencyForCountry(country);
  if (code === "USD") return usd;
  const raw = usd * DEFAULT_CURRENCY_RATES[code];
  if (raw >= 10000) return Math.round(raw / 10) * 10;
  if (raw >= 1000) return Math.round(raw / 10) * 10;
  if (raw >= 100) return Math.round(raw / 10) * 10 - 1;
  return Math.round(raw);
}

/** $49 USD (and $79 compare) converted for every LATAM store market. */
const MAG_BANK_PRICES: Record<CountryCode, LocalPrice> = Object.fromEntries(
  SPANISH_MARKET_CODES.map((country) => [
    country,
    {
      price: usdToLatamLocal(country, MAG_USD),
      compare: usdToLatamLocal(country, MAG_COMPARE_USD),
      priceUSD: MAG_USD,
      compareAtUSD: MAG_COMPARE_USD,
    },
  ])
) as Record<CountryCode, LocalPrice>;

MAG_BANK_PRICES.AR = {
  price: 74400,
  compare: 119900,
  priceUSD: MAG_USD,
  compareAtUSD: MAG_COMPARE_USD,
};

MAG_BANK_PRICES.CR = {
  price: 22000,
  compare: 35490,
  priceUSD: MAG_USD,
  compareAtUSD: MAG_COMPARE_USD,
};

MAG_BANK_PRICES.DO = {
  price: 2880,
  compare: 4640,
  priceUSD: MAG_USD,
  compareAtUSD: MAG_COMPARE_USD,
};

MAG_BANK_PRICES.HN = {
  price: 1299,
  compare: 2090,
  priceUSD: MAG_USD,
  compareAtUSD: MAG_COMPARE_USD,
};

MAG_BANK_PRICES.MX = {
  price: 899,
  compare: 1449,
  priceUSD: MAG_USD,
  compareAtUSD: MAG_COMPARE_USD,
};

const IMAGES = [
  "/products/mag-powerbank-1.webp",
  "/products/mag-powerbank-2.webp",
  "/products/mag-powerbank-3.webp",
  "/products/mag-powerbank-4.webp",
  "/products/mag-powerbank-5.webp",
  "/products/mag-powerbank-6.webp",
];

function buildMagPowerBank(country: CountryCode): Omit<
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
    nameAr: "باور بانك مغناطيسي 7 في 1",
    nameEn: "7-in-1 Magnetic Power Bank",
    nameEs: "Batería Portátil Magnética 7 en 1",
    descriptionAr: `
<h3>شاشة رقمية + 4 كابلات مدمجة + شحن مغناطيسي</h3>
<p>الموديل الجديد يبيّن نسبة الشحن على الشاشة، يلتصق بالمغناطيس حتى 15W، ويشحن بالكابل حتى 22.5W — وأربعة كابلات جاهزة من غير ما تدور على الشاحن.</p>
<ul>
<li>شاشة رقمية تعرض نسبة البطارية</li>
<li>4 كابلات مدمجة: USB-C وLightning وMicro-USB وUSB-A</li>
<li>شحن مغناطيسي لاسلكي حتى 15W</li>
<li>شحن سريع سلكي حتى 22.5W لآيفون وأندرويد</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Digital screen + 4 built-in cables + magnetic charge</h3>
<p>The new model shows remaining charge on the screen, snaps on magnetically at up to 15W, and outputs up to 22.5W by cable — with four cables already on the pack.</p>
<ul>
<li>Digital screen that shows battery percent</li>
<li>4 built-in cables: USB-C, Lightning, Micro-USB, and USB-A</li>
<li>Magnetic wireless charging up to 15W</li>
<li>Wired fast charging up to 22.5W for iPhone and Android</li>
</ul>
${COD_EN}`.trim(),
    descriptionEs: `
<h3>Pantalla digital + 4 cables integrados + carga magnética</h3>
<p>El modelo nuevo muestra el porcentaje en pantalla, se fija al móvil con imán hasta 15W y carga por cable hasta 22.5W — con cuatro cables ya listos, sin buscar el cargador.</p>
<ul>
<li>Pantalla digital con el porcentaje de batería</li>
<li>4 cables integrados: USB-C, Lightning, Micro-USB y USB-A</li>
<li>Carga inalámbrica magnética de hasta 15W</li>
<li>Carga rápida por cable de hasta 22.5W para iPhone y Android</li>
</ul>
${COD_ES}`.trim(),
    detailsAr: [
      "شاشة رقمية تعرض نسبة الشحن",
      "سعة 10.000 mAh للاستخدام اليومي",
      "شحن لاسلكي مغناطيسي حتى 15W",
      "شحن سريع بالكابل حتى 22.5W",
      "4 كابلات مدمجة: USB-C · Lightning · Micro-USB · USB-A",
      "مناسب لآيفون وأندرويد",
      "إعادة شحن البطارية عبر USB-C",
    ],
    detailsEn: [
      "Digital screen shows remaining charge",
      "10,000 mAh for daily use",
      "Magnetic wireless charging up to 15W",
      "Wired fast charging up to 22.5W",
      "4 built-in cables: USB-C · Lightning · Micro-USB · USB-A",
      "Works with iPhone and Android",
      "Recharge the pack over USB-C",
    ],
    detailsEs: [
      "Pantalla digital con el porcentaje de carga",
      "10.000 mAh para el día a día",
      "Carga inalámbrica magnética de hasta 15W",
      "Carga rápida por cable de hasta 22.5W",
      "4 cables integrados: USB-C · Lightning · Micro-USB · USB-A",
      "Sirve para iPhone y Android",
      "Se recarga a sí misma por USB-C",
    ],
    images: IMAGES,
    colors: [],
    customColorEnabled: true,
    qtyUpsellEnabled: true,
    qtyOffers: [
      { quantity: 1, discountPercent: 0, labelEs: "1 pieza", labelEn: "1 pc", labelAr: "قطعة واحدة" },
      {
        quantity: 2,
        discountPercent: 10,
        popular: true,
        labelEs: "2 piezas · para casa y bolso",
        labelEn: "2 pcs · home and bag",
        labelAr: "قطعتان · للبيت والحقيبة",
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
    reviewCount: 214,
    createdAt: "2026-09-19T18:00:00.000Z",
    landing: {
      headlineAr: "شاشة رقمية وكابلات جاهزة في بطارية واحدة",
      headlineEn: "A digital screen and ready cables in one pack",
      headlineEs: `Pantalla digital y cables listos, en una sola batería para ${marketNameEs}`,
      introAr:
        "الموديل الجديد يبيّن النسبة على الشاشة، يلتصق بالمغناطيس، ويطلع بأربعة كابلات مدمجة. تشحن الجوال وهو ثابت على الظهر، أو توصل أي جهاز بالكابل الصحيح من غير ما تدور عليه.",
      introEn:
        "The new model shows remaining charge on the screen, snaps on magnetically, and carries four built-in cables. Charge the phone on the back, or plug any device without hunting for the right cord.",
      introEs:
        "El modelo nuevo muestra el porcentaje en pantalla, se pega al móvil con imán y trae cuatro cables integrados. Cargas el teléfono fijo en la parte de atrás, o conectas cualquier aparato sin buscar el cable correcto.",
      sections: [
        {
          titleAr: "شاشة رقمية تبين النسبة",
          titleEn: "A digital screen that shows the percent",
          titleEs: "Pantalla digital con el porcentaje",
          bodyAr:
            "ما تقدّرش على التخمين. الشاشة تعرض مستوى الشحن وأنت في الطريق — تعرف واش باقي يكفي لباقي اليوم.",
          bodyEn:
            "No guessing. The screen shows remaining charge while you are out — you know if it still covers the rest of the day.",
          bodyEs:
            "Sin adivinar. La pantalla muestra la carga que queda mientras sales — sabes si te alcanza para el resto del día.",
          image: "/products/mag-powerbank-1.webp",
        },
        {
          titleAr: "مغناطيس للجوال وكابلات للجهاز الثاني",
          titleEn: "Magnetic for the phone, cables for the rest",
          titleEs: "Imán para el móvil y cables para lo demás",
          bodyAr:
            "قطعة تلتصق بظهر الجوال المتوافق، والقطعة الثانية فيها أربعة كابلات مدمجة. تختار حسب الجهاز اللي معاك.",
          bodyEn:
            "One piece snaps onto a compatible phone; the other carries four built-in cables. Use whichever matches the device in your hand.",
          bodyEs:
            "Una pieza se fija al móvil compatible; la otra trae cuatro cables integrados. Usas la que corresponde al aparato que llevas.",
          image: "/products/mag-powerbank-2.webp",
        },
        {
          titleAr: "شحن مغناطيسي حتى 15W",
          titleEn: "Magnetic charging up to 15W",
          titleEs: "Carga magnética de hasta 15W",
          bodyAr:
            "حط الجوال المتوافق على القاعدة. يثبت وهو يشحن حتى 15W — على المكتب أو في الطريق، من غير كابل ظاهر.",
          bodyEn:
            "Set a compatible phone on the pad. It stays put while it charges at up to 15W — at a desk or on the go, with no loose cable.",
          bodyEs:
            "Apoya el móvil compatible. Queda sujeto mientras carga hasta 15W — en el escritorio o de camino, sin un cable suelto.",
          image: "/products/mag-powerbank-3.webp",
        },
        {
          titleAr: "ألوان متعددة، نفس القوة",
          titleEn: "Several colors, the same power",
          titleEs: "Varios colores, la misma potencia",
          bodyAr:
            "أبيض، أزرق، بنفسجي أو برتقالي. الشحن السلكي حتى 22.5W، والمغناطيسي حتى 15W — تكتب اللون اللي بغيتي قبل تأكيد الطلب.",
          bodyEn:
            "White, blue, purple, or orange. Wired charging up to 22.5W and magnetic wireless up to 15W — type the color you want before you confirm.",
          bodyEs:
            "Blanco, azul, lila o naranja. Carga por cable de hasta 22.5W y magnética de hasta 15W — escribe el color que quieres antes de confirmar.",
          image: "/products/mag-powerbank-4.webp",
        },
        {
          titleAr: "أربعة كابلات مدمجة من الخلف",
          titleEn: "Four cables built into the back",
          titleEs: "Cuatro cables integrados atrás",
          bodyAr:
            "USB-C وLightning وMicro-USB وUSB-A جاهزين. الشحن السلكي حتى 22.5W. ما تحتاجش كابل زيادة في الحقيبة.",
          bodyEn:
            "USB-C, Lightning, Micro-USB, and USB-A are already there. Wired output up to 22.5W. You do not pack a spare cable.",
          bodyEs:
            "USB-C, Lightning, Micro-USB y USB-A ya van en la batería. Salida por cable de hasta 22.5W. No llevas un cable extra en el bolso.",
          image: "/products/mag-powerbank-5.webp",
        },
        {
          titleAr: "آيفون وأندرويد في نفس الجهاز",
          titleEn: "iPhone and Android on the same pack",
          titleEs: "iPhone y Android en la misma batería",
          bodyAr:
            "مغناطيس للجوال المتوافق، وكابلات لباقي الأجهزة. تخرج بشاحن واحد بدل ثلاثة.",
          bodyEn:
            "Magnetic hold for a compatible phone, plus cables for everything else. Leave with one charger instead of three.",
          bodyEs:
            "Sujeción magnética para el móvil compatible y cables para el resto. Sales con un solo cargador, no con tres.",
          image: "/products/mag-powerbank-6.webp",
        },
      ],
      benefitsAr: [
        "شاشة رقمية تعرض نسبة الشحن",
        "4 كابلات مدمجة لآيفون وأندرويد",
        "شحن مغناطيسي 15W وشحن سلكي 22.5W",
        "10.000 mAh بدون وزن زايد",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Digital screen shows remaining charge",
        "4 built-in cables for iPhone and Android",
        "15W magnetic wireless and 22.5W wired",
        "10,000 mAh without extra bulk",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        "Pantalla digital con el porcentaje de carga",
        "4 cables integrados para iPhone y Android",
        "15W magnética y 22.5W por cable",
        "10.000 mAh sin cargar un ladrillo",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
        {
          questionAr: "واش كاين شاشة؟",
          questionEn: "Does it have a screen?",
          questionEs: "¿Trae pantalla?",
          answerAr:
            "نعم. الموديل الجديد فيه شاشة رقمية تبين نسبة الشحن المتبقية.",
          answerEn:
            "Yes. The new model has a digital screen that shows remaining charge.",
          answerEs:
            "Sí. El modelo nuevo tiene una pantalla digital que muestra el porcentaje que queda.",
        },
        {
          questionAr: "هل يناسب آيفون وأندرويد؟",
          questionEn: "Does it work with iPhone and Android?",
          questionEs: "¿Sirve para iPhone y Android?",
          answerAr:
            "نعم. الكابلات المدمجة تشمل Lightning وUSB-C وMicro-USB، والشحن المغناطيسي للأجهزة المتوافقة.",
          answerEn:
            "Yes. Built-in cables cover Lightning, USB-C, and Micro-USB, plus magnetic charging for compatible devices.",
          answerEs:
            "Sí. Los cables integrados cubren Lightning, USB-C y Micro-USB, y la carga magnética funciona con dispositivos compatibles.",
        },
        {
          questionAr: "كم جهاز يشحن في نفس الوقت؟",
          questionEn: "How many devices can it charge at once?",
          questionEs: "¿Cuántos dispositivos carga a la vez?",
          answerAr: "حتى خمسة: الكابلات المدمجة بالإضافة إلى الشحن المغناطيسي.",
          answerEn: "Up to five: the built-in cables plus magnetic wireless charging.",
          answerEs:
            "Hasta cinco: los cables integrados más la carga magnética inalámbrica.",
        },
        {
          questionAr: "كيف أختار اللون؟",
          questionEn: "How do I pick a color?",
          questionEs: "¿Cómo elijo el color?",
          answerAr: "اكتب اللون المفضل في صفحة المنتج قبل تأكيد الطلب.",
          answerEn: "Type your preferred color on the product page before you confirm the order.",
          answerEs:
            "Escribe el color que prefieres en la página del producto antes de confirmar el pedido.",
        },
      ],
    },
  };
}

/** One listing per Latin American Spanish market only. */
export const LATAM_MAG_POWERBANK_PRODUCTS: Product[] = SPANISH_MARKET_CODES.map(
  (country) => {
    const local = MAG_BANK_PRICES[country];
    if (!local) {
      throw new Error(`Missing mag power bank price for ${country}`);
    }
    return {
      ...buildMagPowerBank(country),
      id: `prod-mag-powerbank-${country.toLowerCase()}`,
      slug: MAG_POWERBANK_SLUG,
      categoryId: `cat-${country}`,
      availableIn: [country],
      priceUSD: MAG_USD,
      compareAtUSD: MAG_COMPARE_USD,
      marketPrices: { [country]: local.price },
      marketComparePrices: { [country]: local.compare },
    };
  }
);
