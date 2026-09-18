import { getCountry, SPANISH_MARKET_CODES } from "./countries";
import type { CountryCode, Product } from "./types";

const COD_AR =
  "<p><strong>اطلب الآن</strong> — توصيل مجاني · الدفع عند الاستلام · استرداد خلال 30 يومًا.</p>";
const COD_EN =
  "<p><strong>Order now</strong> — free delivery · cash on delivery · 30-day returns.</p>";
const COD_ES =
  "<p><strong>Pide ahora</strong> — envío gratis · pago contra entrega · devoluciones en 30 días.</p>";

type LocalPrice = { price: number; compare: number; priceUSD: number; compareAtUSD: number };

/** Local retail prices for Elevador de Colchón in every Spanish LATAM market. */
const ELEVADOR_PRICES: Partial<Record<CountryCode, LocalPrice>> = {
  MX: { price: 349, compare: 549, priceUSD: 19, compareAtUSD: 29 },
  AR: { price: 19990, compare: 29990, priceUSD: 19, compareAtUSD: 29 },
  CR: { price: 9690, compare: 14790, priceUSD: 19, compareAtUSD: 29 },
  EC: { price: 19, compare: 29, priceUSD: 19, compareAtUSD: 29 },
  GT: { price: 149, compare: 229, priceUSD: 19, compareAtUSD: 29 },
  HN: { price: 489, compare: 749, priceUSD: 19, compareAtUSD: 29 },
  SV: { price: 19, compare: 29, priceUSD: 19, compareAtUSD: 29 },
  NI: { price: 699, compare: 1069, priceUSD: 19, compareAtUSD: 29 },
  DO: { price: 1149, compare: 1749, priceUSD: 19, compareAtUSD: 29 },
};

const IMAGES = [
  "/products/mattress-lifter-1.png",
  "/products/mattress-lifter-2.png",
  "/products/mattress-lifter-3.png",
  "/products/mattress-lifter-4.jpg",
  "/products/mattress-lifter-5.jpg",
];

function buildElevador(country: CountryCode): Omit<
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
    nameAr: "رافع فرشة / مرتبة",
    nameEn: "Mattress Lifter",
    nameEs: "Elevador de Colchón",
    descriptionAr: `
<h3>رتّب سريرك بدون رفع ثقيل</h3>
<p>أداة إسفينية بمقبض مريح تنزلق بين المرتبة والإطار وترفعها برفق — عشان تثبّت الشراشف بسهولة وتحمي ظهرك ورقبتك.</p>
<ul>
<li>مقبض مريح يقلل الإجهاد</li>
<li>سطح أملس لا يمزّق الأقمشة</li>
<li>يناسب معظم الأسرّة والمراتب</li>
<li>ألوان أنيقة: بنفسجي · أخضر · وردي</li>
</ul>
${COD_AR}`.trim(),
    descriptionEn: `
<h3>Make the bed without heavy lifting</h3>
<p>An ergonomic wedge that slides between mattress and frame to lift gently — tuck sheets faster and spare your back and neck.</p>
<ul>
<li>Comfort grip that reduces strain</li>
<li>Smooth surface that won’t snag linens</li>
<li>Fits most beds and mattresses</li>
<li>Stylish colors: purple · green · rose</li>
</ul>
${COD_EN}`.trim(),
    descriptionEs: `
<h3>Haz la cama sin levantar el colchón a mano</h3>
<p>Herramienta ergonómica en forma de cuña que se desliza entre el colchón y la base, lo eleva con suavidad y te deja meter las sábanas fácil — <strong>sin forzar la espalda ni el cuello</strong>.</p>
<ul>
<li>Asa cómoda que reduce el esfuerzo</li>
<li>Superficie lisa: no engancha ni daña las telas</li>
<li>Compatible con la mayoría de camas y colchones</li>
<li>Colores elegantes: morado · verde · rosa</li>
</ul>
${COD_ES}`.trim(),
    detailsAr: [
      "تصميم إسفين مع مقبض بيضاوي مريح",
      "بلاستيك متين وأملس للانزلاق السهل",
      "يرفع المرتبة لإنزال الشراشف بسرعة",
      "يقلل إجهاد أسفل الظهر والرقبة",
      "ألوان: بنفسجي، أخضر، وردي",
    ],
    detailsEn: [
      "Wedge design with an ergonomic oval handle",
      "Durable smooth plastic for easy sliding",
      "Lifts the mattress to tuck sheets quickly",
      "Helps reduce lower-back and neck strain",
      "Colors: purple, green, rose",
    ],
    detailsEs: [
      "Diseño en cuña con asa ergonómica ovalada",
      "Plástico resistente y liso para deslizar fácil",
      "Eleva el colchón para meter las sábanas rápido",
      "Ayuda a evitar tension lumbar y cervical",
      "Colores: morado, verde y rosa",
    ],
    images: IMAGES,
    colors: [],
    customColorEnabled: true,
    qtyUpsellEnabled: true,
    qtyOffers: [
      { quantity: 1, discountPercent: 0, labelEs: "1 pieza" },
      {
        quantity: 2,
        discountPercent: 10,
        popular: true,
        labelEs: "2 piezas · ideal para las esquinas",
      },
      {
        quantity: 3,
        discountPercent: 15,
        labelEs: "3 piezas · pack familiar",
      },
    ],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 167,
    createdAt: "2026-09-14T00:00:00.000Z",
    landing: {
      headlineAr: "سرير مرتّب… بدون ألم في الظهر",
      headlineEn: "A neatly made bed — without back pain",
      headlineEs: "Cama perfecta… sin dolor de espalda",
      introAr: `بدل ما ترفع المرتبة بيد واحدة، مرّر الرافع تحتها واترك مساحة كافية لإنزال الشراشف بسرعة وبشكل فندقي. مثالي لكبار السن ولمن يعاني من آلام الظهر أو الرقبة. توصيل مجاني والدفع عند الاستلام في ${getCountry(country).nameAr}.`,
      introEn: `Instead of lifting the mattress with one hand, slide the lifter underneath and create space to tuck sheets fast with a hotel-neat finish. Ideal for seniors and anyone with back or neck pain. Free delivery and cash on delivery in ${getCountry(country).nameEn}.`,
      introEs: `En lugar de levantar el colchón con una sola mano, desliza el elevador debajo y crea el espacio para meter las sábanas rápido, con acabado tipo hotel. Ideal para adultos mayores y para quien sufre de espalda o cuello. Envío gratis y pago contra entrega en ${marketNameEs}.`,
      sections: [
        {
          titleAr: "ارفع المرتبة في ثوانٍ",
          titleEn: "Lift the mattress in seconds",
          titleEs: "Eleva el colchón en segundos",
          bodyAr:
            "الطرف الرفيع ينزلق بين المرتبة والإطار. بالضغط على المقبض ترتفع المرتبة بضعة سنتيمترات — مساحة كافية لإنزال الشيت بدون مجهود.",
          bodyEn:
            "The thin tip slides between mattress and frame. Press the handle and the mattress rises a few centimeters — enough space to tuck the sheet without strain.",
          bodyEs:
            "La punta delgada se desliza entre el colchón y la base. Al apoyar el asa, el colchón sube unos centímetros: espacio suficiente para meter la sábana sin esfuerzo.",
          image: "/products/mattress-lifter-4.jpg",
        },
        {
          titleAr: "حماية أسفل الظهر والرقبة",
          titleEn: "Protect your lower back and neck",
          titleEs: "Cuida tu zona lumbar y cervical",
          bodyAr:
            "الرفع اليدوي المتكرر يرهق العمود الفقري. هذه الأداة تنقل الجهد إلى الرافعة — أقل توترًا وأكثر راحة في روتين ترتيب السرير اليومي.",
          bodyEn:
            "Repeated manual lifting strains the spine. This tool shifts the effort to the wedge — less tension and more comfort in your daily bed-making routine.",
          bodyEs:
            "Levantar a mano una y otra vez carga la columna. Esta herramienta traslada el esfuerzo a la cuña: menos tensión y más comodidad en la rutina diaria de hacer la cama.",
          image: "/products/mattress-lifter-3.png",
        },
        {
          titleAr: "يناسب معظم أنواع الأسرّة",
          titleEn: "Works with most bed types",
          titleEs: "Sirve para casi todo tipo de cama",
          bodyAr:
            "إطارات خشبية، قواعد منجدة، مراتب سميكة أو عادية — التصميم العالمي ينزلق بسلاسة دون خدش الأثاث أو تمزيق الأقمشة.",
          bodyEn:
            "Wood frames, upholstered bases, thick or standard mattresses — the universal design slides smoothly without scratching furniture or tearing fabric.",
          bodyEs:
            "Bases de madera, camas tapizadas, colchones gruesos o estándar: el diseño universal se desliza con suavidad sin rayar el mueble ni dañar las telas.",
          image: "/products/mattress-lifter-2.png",
        },
        {
          titleAr: "أنيق وعملي في غرفة النوم",
          titleEn: "Stylish and practical in the bedroom",
          titleEs: "Bonito y práctico en tu habitación",
          bodyAr:
            "بلاستيك شفاف بألوان عصرية ولمسة ذهبية على المقبض. يبدو كإكسسوار منزلي أنيق — وليس أداة صيانة تقليدية.",
          bodyEn:
            "Translucent plastic in modern colors with a gold-tone handle accent. Looks like a stylish home accessory — not a bulky utility tool.",
          bodyEs:
            "Plástico translúcido en colores modernos con detalle dorado en el asa. Se ve como un accesorio elegante del hogar, no como una herramienta tosca.",
          image: "/products/mattress-lifter-1.png",
        },
      ],
      benefitsAr: [
        "ترتيب أسرع للشراشف",
        "يحمي الظهر والرقبة",
        "مقبض مريح وتصميم متين",
        "يناسب معظم الأسرّة",
        "توصيل مجاني والدفع عند الاستلام",
      ],
      benefitsEn: [
        "Faster sheet tucking",
        "Protects back and neck",
        "Comfort grip, durable build",
        "Fits most beds",
        "Free delivery and cash on delivery",
      ],
      benefitsEs: [
        "Meter sábanas más rápido",
        "Protege espalda y cuello",
        "Asa cómoda y construcción resistente",
        "Compatible con la mayoría de camas",
        "Envío gratis y pago contra entrega",
      ],
      faq: [
        {
          questionAr: "هل يكفي قطعة واحدة؟",
          questionEn: "Is one piece enough?",
          questionEs: "¿Basta con una sola pieza?",
          answerAr:
            "قطعة واحدة تكفي لزاوية واحدة. كثير يطلبون قطعتين لتثبيت زاويتين في الوقت نفسه وسرعة أكبر.",
          answerEn:
            "One piece works for one corner. Many shoppers order two so they can hold two corners at once and finish faster.",
          answerEs:
            "Una pieza alcanza para una esquina. Muchos piden dos para sujetar dos esquinas a la vez y terminar más rápido.",
        },
        {
          questionAr: "هل يخدش الإطار أو يمزّق الشيت؟",
          questionEn: "Will it scratch the frame or tear sheets?",
          questionEs: "¿Rayará la base o romperá las sábanas?",
          answerAr:
            "السطح أملس والحواف مدورة للاستخدام الآمن على الخشب والقماش والمراتب.",
          answerEn:
            "The smooth surface and rounded edges are designed for safe use on wood, fabric, and mattresses.",
          answerEs:
            "La superficie lisa y los bordes redondeados están pensados para un uso seguro sobre madera, tela y colchones.",
        },
        {
          questionAr: "ما الألوان المتوفرة؟",
          questionEn: "What colors are available?",
          questionEs: "¿Qué colores hay?",
          answerAr:
            "بنفسجي، أخضر، ووردي. اكتب اللون المفضل في صفحة المنتج قبل الطلب.",
          answerEn:
            "Purple, green, and rose. Type your preferred color on the product page before ordering.",
          answerEs:
            "Morado, verde y rosa. Escribe el color que prefieres en la página del producto antes de pedir.",
        },
      ],
    },
  };
}

/** One Elevador listing per Latin American market (Spanish storefronts only). */
export const LATAM_ELEVADOR_PRODUCTS: Product[] = SPANISH_MARKET_CODES.map(
  (country) => {
    const local = ELEVADOR_PRICES[country];
    if (!local) {
      throw new Error(`Missing Elevador price for ${country}`);
    }
    return {
      ...buildElevador(country),
      id: `prod-mattress-lifter-${country.toLowerCase()}`,
      slug: "elevador-de-colchon",
      categoryId: `cat-${country}`,
      availableIn: [country],
      priceUSD: local.priceUSD,
      compareAtUSD: local.compareAtUSD,
      marketPrices: { [country]: local.price },
      marketComparePrices: { [country]: local.compare },
    };
  }
);
