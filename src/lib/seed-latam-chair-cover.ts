import { currencyForCountry, getCountry, SPANISH_MARKET_CODES } from "./countries";
import { DEFAULT_CURRENCY_RATES, getCurrency } from "./currency";
import type { CountryCode, Product } from "./types";

export const CHAIR_COVER_SLUG = "fundas-para-sillas-elasticas";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";
const COD_ES =
  "<p><strong>Pide ahora</strong> — envío gratis · pago contra entrega · devoluciones en 30 días.</p>";

/** Price is for the pack of 3 covers */
const PACK_USD = 49;

function usdToLatamLocal(country: CountryCode, usd: number): number {
  const code = currencyForCountry(country);
  if (code === "USD") return usd;
  const raw = usd * DEFAULT_CURRENCY_RATES[code];
  if (raw >= 1000) return Math.round(raw / 10) * 10;
  if (raw >= 100) return Math.round(raw / 10) * 10 - 1;
  return Math.round(raw);
}

// Same $49 local price points as the other LATAM listings
const PRICE_OVERRIDES: Partial<Record<CountryCode, number>> = {
  AR: 74900,
  CR: 22500,
  DO: 2950,
  HN: 1299,
  MX: 899,
};

function packPrice(country: CountryCode): number {
  return PRICE_OVERRIDES[country] ?? usdToLatamLocal(country, PACK_USD);
}

function offerLabel(country: CountryCode, amount: number): string {
  const code = currencyForCountry(country);
  const n = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);
  return code === "USD" ? `$${n}` : `${getCurrency(code).symbol}\u00A0${n}`;
}

/** First image is the storefront cover */
const IMAGES = [
  "/products/chair-cover-main.webp",
  "/products/chair-cover-1.webp",
  "/products/chair-cover-2.webp",
  "/products/chair-cover-3.webp",
  "/products/chair-cover-4.webp",
  "/products/chair-cover-5.webp",
];

function buildChairCover(country: CountryCode): Omit<
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
  const offer = offerLabel(country, packPrice(country));
  return {
    nameAr: "3 أغطية كراسي مرنة · اختر اللون اللي يعجبك",
    nameEn: "3 Stretch Chair Covers · Choose Your Color",
    nameEs: "3 Fundas Elásticas para Sillas · Elige tu color",
    descriptionAr: `
<h3>3 أغطية كراسي بـ ${offer} — باللون اللي تختاره</h3>
<p>أغطية مرنة تلبس الكرسي بسهولة وتحميه من البقع والخدوش، وتعطي لطاولة الأكل شكل جديد في دقائق.</p>
<ul>
<li>عبوة من 3 أغطية بـ ${offer}</li>
<li>قماش مرن يتأقلم مع أغلب كراسي الأكل</li>
<li>مطاط في الأسفل يثبت الغطاء</li>
<li>تختار اللون اللي يعجبك عند الطلب</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>3 chair covers for ${offer} — in the color you choose</h3>
<p>Stretch covers that slip on easily, protect your chairs from stains and scratches, and give your dining table a fresh look in minutes.</p>
<ul>
<li>Pack of 3 covers for ${offer}</li>
<li>Stretch fabric that fits most dining chairs</li>
<li>Elastic hem keeps the cover in place</li>
<li>Pick your color when you order</li>
</ul>
${COD_EN}`.trim(),
    descriptionEs: `
<h3>3 fundas para sillas por ${offer} — del color que tú elijas</h3>
<p>Fundas elásticas que se ponen en segundos, protegen tus sillas de manchas y rayones, y le dan un look nuevo a tu comedor. Envío gratis a todo ${marketNameEs}.</p>
<ul>
<li>Pack de 3 fundas por ${offer}</li>
<li>Tela elástica que se adapta a la mayoría de sillas de comedor</li>
<li>Elástico en la parte de abajo para que no se mueva</li>
<li>Escribes el color que quieres al hacer tu pedido</li>
</ul>
${COD_ES}`.trim(),
    detailsAr: [
      "العبوة: 3 أغطية كراسي",
      "قماش مرن وناعم",
      "مطاط في الأسفل لتثبيت الغطاء",
      "يناسب أغلب كراسي الأكل بظهر مستقيم",
      "سهل التركيب والإزالة",
    ],
    detailsEn: [
      "In the box: 3 chair covers",
      "Soft stretch fabric",
      "Elastic hem to keep it in place",
      "Fits most straight-back dining chairs",
      "Easy to put on and take off",
    ],
    detailsEs: [
      "Incluye: 3 fundas para sillas",
      "Tela elástica y suave al tacto",
      "Elástico inferior para que quede firme",
      "Para la mayoría de sillas de comedor con respaldo recto",
      "Se pone y se quita fácil",
    ],
    images: [...IMAGES],
    colors: [],
    customColorEnabled: true,
    qtyUpsellLocked: true,
    qtyUpsellEnabled: false,
    qtyOffers: [
      {
        quantity: 1,
        discountPercent: 0,
        labelEs: "Pack de 3 fundas",
        labelEn: "Pack of 3 covers",
        labelAr: "عبوة 3 أغطية",
        codLabelEs: "Pack de 3 fundas",
      },
    ],
    inStock: true,
    featured: true,
    rating: 0,
    reviewCount: 0,
    createdAt: "2026-10-11T00:00:00.000Z",
    landing: {
      headlineAr: `3 أغطية كراسي بـ ${offer} · اختر اللون`,
      headlineEn: `3 chair covers for ${offer} · choose your color`,
      headlineEs: `3 fundas para sillas por ${offer} — elige tu color en ${marketNameEs}`,
      introAr:
        "جدّد شكل طاولة الأكل بدون ما تبدّل الكراسي. أغطية مرنة تحمي الكراسي وتلبس في ثواني — واختار اللون اللي يناسب دارك.",
      introEn:
        "Refresh your dining room without buying new chairs. Stretch covers that protect your chairs and go on in seconds — pick the color that suits your home.",
      introEs:
        "Renueva tu comedor sin comprar sillas nuevas. Fundas elásticas que protegen tus sillas y se ponen en segundos — elige el color que va con tu casa.",
      sections: [
        {
          titleAr: "اختر اللون اللي يعجبك",
          titleEn: "Choose the color you like",
          titleEs: "Elige el color que te guste",
          bodyAr:
            "رمادي، بيج، بني، خمري، أخضر مزرق وألوان أخرى — اكتب اللون اللي تبغيه في الطلب.",
          bodyEn:
            "Grey, beige, brown, wine, teal and more — just write the color you want in your order.",
          bodyEs:
            "Gris, beige, café, vino, verde azulado y más — escribe en tu pedido el color que quieres.",
          image: "/products/chair-cover-main.webp",
        },
        {
          titleAr: "قماش مرن يلبس الكرسي",
          titleEn: "Stretch fabric that hugs the chair",
          titleEs: "Tela elástica que se ajusta a la silla",
          bodyAr:
            "يتمدد ويتأقلم مع شكل الكرسي، وما يتكرمش بسهولة.",
          bodyEn:
            "It stretches to the shape of the chair for a neat, snug fit.",
          bodyEs:
            "Se estira y toma la forma de tu silla para que se vea ajustada y ordenada.",
          image: "/products/chair-cover-1.webp",
        },
        {
          titleAr: "طاولة أكل بشكل جديد",
          titleEn: "A brand-new looking dining table",
          titleEs: "Un comedor que se ve como nuevo",
          bodyAr:
            "غطي الكراسي القديمة أو المخدوشة وخلي الدار تبان مرتبة وأنيقة.",
          bodyEn:
            "Cover old or scratched chairs and make your home look neat and elegant.",
          bodyEs:
            "Cubre sillas viejas o rayadas y haz que tu casa se vea ordenada y elegante.",
          image: "/products/chair-cover-2.webp",
        },
        {
          titleAr: "مطاط يثبت الغطاء",
          titleEn: "Elastic hem keeps it in place",
          titleEs: "Elástico que la mantiene en su lugar",
          bodyAr:
            "المطاط في الأسفل يمسك الغطاء على الكرسي حتى ما يتحركش وأنت جالس.",
          bodyEn:
            "The elastic at the bottom grips the chair so the cover stays put while you sit.",
          bodyEs:
            "El elástico de abajo sujeta la funda a la silla para que no se mueva cuando te sientas.",
          image: "/products/chair-cover-3.webp",
        },
        {
          titleAr: "تحمي الكراسي من البقع",
          titleEn: "Protects chairs from stains",
          titleEs: "Protege tus sillas de manchas",
          bodyAr:
            "مثالية للدار مع الأطفال: تحمي الكرسي، وتنحّي الغطاء وتغسله بسهولة.",
          bodyEn:
            "Great for homes with kids: it protects the chair, and you can take the cover off to wash it.",
          bodyEs:
            "Ideal si tienes niños: protege la silla y la funda se quita fácil para lavarla.",
          image: "/products/chair-cover-4.webp",
        },
      ],
      benefitsAr: [
        `3 أغطية بـ ${offer}`,
        "اختر اللون اللي يعجبك",
        "قماش مرن يناسب أغلب الكراسي",
        "سهل التركيب والغسيل",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        `3 covers for ${offer}`,
        "Choose the color you like",
        "Stretch fabric fits most chairs",
        "Easy to fit and to wash",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        `3 fundas por solo ${offer}`,
        "Elige el color que te guste",
        "Tela elástica para la mayoría de sillas",
        "Fácil de poner y de lavar",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
        {
          questionAr: "كيف أختار اللون؟",
          questionEn: "How do I choose the color?",
          questionEs: "¿Cómo elijo el color?",
          answerAr:
            "في نموذج الطلب اكتب اللون اللي تبغيه، ونتأكد معك بالهاتف قبل الإرسال.",
          answerEn:
            "Write the color you want in the order form — we confirm it with you by phone before shipping.",
          answerEs:
            "En el formulario escribe el color que quieres y te lo confirmamos por teléfono antes del envío.",
        },
        {
          questionAr: "كم غطاء في العبوة؟",
          questionEn: "How many covers come in the pack?",
          questionEs: "¿Cuántas fundas trae el pack?",
          answerAr: `العبوة فيها 3 أغطية بـ ${offer}.`,
          answerEn: `The pack has 3 covers for ${offer}.`,
          answerEs: `El pack trae 3 fundas por ${offer}.`,
        },
        {
          questionAr: "هل يناسب الكرسي ديالي؟",
          questionEn: "Will it fit my chair?",
          questionEs: "¿Le queda a mi silla?",
          answerAr:
            "يناسب أغلب كراسي الأكل بظهر مستقيم. لا يناسب الكراسي بذراعين أو الكراسي الدوارة.",
          answerEn:
            "It fits most straight-back dining chairs. It is not made for armchairs or office swivel chairs.",
          answerEs:
            "Le queda a la mayoría de sillas de comedor con respaldo recto. No es para sillas con brazos ni sillas giratorias de oficina.",
        },
      ],
    },
  };
}

/** One listing per Latin American Spanish market only. */
export const LATAM_CHAIR_COVER_PRODUCTS: Product[] = SPANISH_MARKET_CODES.map(
  (country) => {
    const price = packPrice(country);
    return {
      ...buildChairCover(country),
      id: `prod-chair-cover-${country.toLowerCase()}`,
      slug: CHAIR_COVER_SLUG,
      categoryId: `cat-${country}`,
      availableIn: [country],
      priceUSD: PACK_USD,
      compareAtUSD: PACK_USD,
      marketPrices: { [country]: price },
      marketComparePrices: { [country]: price },
    };
  }
);
