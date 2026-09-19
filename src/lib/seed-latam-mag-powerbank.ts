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
  price: 219,
  compare: 349,
  priceUSD: MAG_USD,
  compareAtUSD: MAG_COMPARE_USD,
};

MAG_BANK_PRICES.DO = {
  price: 2880,
  compare: 4640,
  priceUSD: MAG_USD,
  compareAtUSD: MAG_COMPARE_USD,
};

const MAG_MARKET_PRICES: Partial<Record<CountryCode, number>> =
  Object.fromEntries(
    SPANISH_MARKET_CODES.map((country) => [
      country,
      MAG_BANK_PRICES[country].price,
    ])
  );

const MAG_MARKET_COMPARE: Partial<Record<CountryCode, number>> =
  Object.fromEntries(
    SPANISH_MARKET_CODES.map((country) => [
      country,
      MAG_BANK_PRICES[country].compare,
    ])
  );

const IMAGES = [
  "/products/mag-powerbank-1.jpg",
  "/products/mag-powerbank-2.jpg",
  "/products/mag-powerbank-3.jpg",
  "/products/mag-powerbank-4.jpg",
];

export const MAG_POWERBANK_SLUG = "bateria-portatil-magnetica-7en1";

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
<h3>شحن مغناطيسي + 4 كابلات في جهاز واحد</h3>
<p>سعة 10.000 mAh، شحن لاسلكي 15W، شحن سلكي 22.5W، وأربعة كابلات مدمجة — بدون ما تدور على الشاحن المناسب.</p>
<ul>
<li>شحن حتى خمسة أجهزة في نفس الوقت</li>
<li>كابلات USB-C وLightning وMicro-USB وUSB-A مدمجة</li>
<li>قاعدة مغناطيسية للساعة والجوال</li>
<li>خفيف للسفر والاستخدام اليومي</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Magnetic charging + 4 built-in cables, one device</h3>
<p>10,000 mAh, 15W wireless, 22.5W wired, and four cables already on the pack — no extra charger hunt.</p>
<ul>
<li>Charge up to five devices at once</li>
<li>Built-in USB-C, Lightning, Micro-USB, and USB-A</li>
<li>Magnetic pad for watch and phone</li>
<li>Light enough for daily carry and travel</li>
</ul>
${COD_EN}`.trim(),
    descriptionEs: `
<h3>Carga magnética y 4 cables, en un solo aparato</h3>
<p>10.000 mAh, carga inalámbrica de 15W, carga por cable de 22.5W y cuatro cables integrados — <strong>sin buscar el cargador correcto</strong> cada vez que sales.</p>
<ul>
<li>Hasta cinco dispositivos al mismo tiempo</li>
<li>USB-C, Lightning, Micro-USB y USB-A ya en la batería</li>
<li>Base magnética para reloj y móvil</li>
<li>Compacta para el bolso, el trabajo y el viaje</li>
</ul>
${COD_ES}`.trim(),
    detailsAr: [
      "سعة 10.000 mAh للاستخدام اليومي",
      "شحن لاسلكي مغناطيسي حتى 15W",
      "شحن سريع بالكابل حتى 22.5W",
      "4 كابلات مدمجة: USB-C · Lightning · Micro-USB · USB-A",
      "شحن الساعة والجوال والسماعات معًا",
      "إعادة شحن البطارية عبر USB-C",
    ],
    detailsEn: [
      "10,000 mAh for daily use",
      "Magnetic wireless charging up to 15W",
      "Wired fast charging up to 22.5W",
      "4 built-in cables: USB-C · Lightning · Micro-USB · USB-A",
      "Charge a watch, phone, and earbuds together",
      "Recharge the pack over USB-C",
    ],
    detailsEs: [
      "10.000 mAh para el día a día",
      "Carga inalámbrica magnética de hasta 15W",
      "Carga rápida por cable de hasta 22.5W",
      "4 cables integrados: USB-C · Lightning · Micro-USB · USB-A",
      "Carga reloj, móvil y auriculares a la vez",
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
      headlineAr: "بطارية واحدة بدل كابل وشاحن ومنصة",
      headlineEn: "One pack instead of cables, a charger, and a stand",
      headlineEs: `Una sola batería para el día a día en ${marketNameEs}`,
      introAr:
        "المشكلة ليست فقط نفاد الشحن. المشكلة أن البطارية العادية تحتاج كابل ومنصة وشاحن إضافي. هذا الجهاز يجمع الشحن المغناطيسي والكابلات المدمجة والشحن السريع في قطعة واحدة خفيفة.",
      introEn:
        "The hassle is not only a dead battery. A typical power bank still needs the right cable and a place to rest the phone. This pack adds magnetic wireless charging, built-in cables, and fast wired output in one light piece.",
      introEs:
        "El problema no es solo quedarte sin batería. Es depender de una power bank que también necesita cables y un sitio donde apoyar el móvil. Esta pieza junta carga magnética, cables integrados y carga rápida en un formato de bolsillo.",
      sections: [
        {
          titleAr: "حتى خمسة أجهزة في نفس الوقت",
          titleEn: "Up to five devices at the same time",
          titleEs: "Hasta cinco dispositivos al mismo tiempo",
          bodyAr:
            "كابل للجوال، كابل للجهاز اللوحي، قاعدة مغناطيسية للساعة، ومنفذ للسماعات. تخرج من البيت بشاحن واحد بدل حقيبة أسلاك.",
          bodyEn:
            "A cable for the phone, another for a tablet, a magnetic pad for the watch, and a port for earbuds. Leave home with one charger instead of a bag of cords.",
          bodyEs:
            "Un cable para el móvil, otro para la tablet, la base magnética para el reloj y un puerto para los auriculares. Sales de casa con un solo cargador, no con un lío de cables.",
          image: "/products/mag-powerbank-1.jpg",
        },
        {
          titleAr: "أربعة كابلات جاهزة من الخلف",
          titleEn: "Four cables ready on the back",
          titleEs: "Cuatro cables listos en la parte de atrás",
          bodyAr:
            "USB-C وLightning وMicro-USB وUSB-A مدمجة. ما تحتاجش تدور على الكابل الصحيح وأنت مستعجل. الشحن السلكي حتى 22.5W، والمغناطيسي حتى 15W.",
          bodyEn:
            "USB-C, Lightning, Micro-USB, and USB-A are built in. You do not hunt for the right cable when you are in a hurry. Wired charging up to 22.5W, magnetic wireless up to 15W.",
          bodyEs:
            "Trae USB-C, Lightning, Micro-USB y USB-A integrados. No buscas el cable correcto cuando tienes prisa. Carga por cable de hasta 22.5W y magnética inalámbrica de hasta 15W.",
          image: "/products/mag-powerbank-2.jpg",
        },
        {
          titleAr: "شحن لاسلكي مغناطيسي للساعة والجوال",
          titleEn: "Magnetic wireless charging for watch and phone",
          titleEs: "Carga inalámbrica magnética para reloj y móvil",
          bodyAr:
            "ضع الساعة أو الجوال المتوافق على القاعدة المغناطيسية. يثبت الجهاز وهو يشحن — مفيد على المكتب أو في الطريق.",
          bodyEn:
            "Set a compatible watch or phone on the magnetic pad. It stays in place while it charges — useful at a desk or on the go.",
          bodyEs:
            "Apoya el reloj o un móvil compatible sobre la base magnética. Queda sujeto mientras carga — útil en el escritorio o de camino.",
          image: "/products/mag-powerbank-3.jpg",
        },
        {
          titleAr: "تعيد شحن نفسها بكابل USB-C",
          titleEn: "It recharges itself with USB-C",
          titleEs: "Se recarga sola con cable USB-C",
          bodyAr:
            "وصّل USB-C بالمقبس. الشحن السريع يملأ البطارية أسرع من باور بانك عادي، ثم ترجع تخدمك طوال اليوم.",
          bodyEn:
            "Plug USB-C into the wall adapter. Fast input fills the pack quicker than a typical brick, then it is ready for the rest of the day.",
          bodyEs:
            "Conecta el USB-C al enchufe. La recarga rápida llena la batería antes que un power bank clásico, y vuelve a estar lista para el día.",
          image: "/products/mag-powerbank-4.jpg",
        },
      ],
      benefitsAr: [
        "10.000 mAh بدون وزن زايد",
        "4 كابلات مدمجة لكل الأجهزة الشائعة",
        "شحن مغناطيسي 15W وشحن سلكي 22.5W",
        "حتى 5 أجهزة معًا",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "10,000 mAh without extra bulk",
        "4 built-in cables for common phones",
        "15W magnetic wireless and 22.5W wired",
        "Up to 5 devices at once",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        "10.000 mAh sin cargar un ladrillo",
        "4 cables integrados para iPhone y Android",
        "15W magnética y 22.5W por cable",
        "Hasta 5 dispositivos a la vez",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
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
          answerAr: "حتى خمسة: كابلات مدمجة بالإضافة إلى الشحن اللاسلكي المغناطيسي.",
          answerEn: "Up to five: the built-in cables plus magnetic wireless charging.",
          answerEs:
            "Hasta cinco: los cables integrados más la carga inalámbrica magnética.",
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
      marketPrices: { ...MAG_MARKET_PRICES },
      marketComparePrices: { ...MAG_MARKET_COMPARE },
    };
  }
);
