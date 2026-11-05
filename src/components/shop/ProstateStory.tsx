"use client";

import {
  Award,
  BadgeCheck,
  CalendarCheck,
  Check,
  ChevronDown,
  Droplets,
  Flame,
  FlaskConical,
  HandCoins,
  Headphones,
  HeartPulse,
  Leaf,
  Moon,
  Pill,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp,
  Trophy,
  Truck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { pickText } from "@/lib/localized";
import { CTA_BUTTON_CLASS, scrollToOrder } from "@/components/shop/CodLanding";
import { ProductImage } from "@/components/shop/ProductImage";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/lib/types";

function loc(locale: Locale, ar: string, en: string, es?: string) {
  if (locale === "ar") return ar;
  if (locale === "es") return es ?? en;
  return en;
}

const DARK_CARD =
  "rounded-[1.25rem] bg-gradient-to-br from-[#0a1830] to-[#0e2a52] text-white shadow-[0_20px_60px_rgba(10,24,48,0.35)]";
const GREEN = "text-[#4ade80]";

const SMART_BADGES = [
  { icon: Leaf, ar: "مكونات طبيعية 100%", en: "100% natural ingredients", es: "Ingredientes 100% naturales" },
  { icon: Award, ar: "مصنع وفق أعلى معايير الجودة GMP", en: "Made to GMP quality standards", es: "Fabricado con estándares GMP" },
  { icon: ShieldCheck, ar: "آمن وفعال للاستخدام اليومي", en: "Safe and effective for daily use", es: "Seguro y eficaz para uso diario" },
];

const BEFORE = [
  { ar: "كثرة الاستيقاظ ليلاً", en: "Frequent night waking", es: "Despertares nocturnos frecuentes" },
  { ar: "ضعف تدفق البول", en: "Weak urine flow", es: "Flujo urinario débil" },
  { ar: "شعور بعدم الراحة", en: "Feeling of discomfort", es: "Sensación de incomodidad" },
  { ar: "تعب وإرهاق مستمر", en: "Constant tiredness and fatigue", es: "Cansancio y fatiga constantes" },
  { ar: "قلق بشأن صحة البروستاتا", en: "Worry about prostate health", es: "Preocupación por la salud de la próstata" },
];

const AFTER = [
  { ar: "تدفق بول طبيعي وسليم", en: "Natural, healthy urine flow", es: "Flujo urinario natural y saludable" },
  { ar: "راحة مثالية وثقة أكبر", en: "Perfect comfort and greater confidence", es: "Comodidad perfecta y mayor confianza" },
  { ar: "نوم هادئ طوال الليل", en: "Calm sleep all night", es: "Sueño tranquilo toda la noche" },
  { ar: "نشاط وحيوية يومية", en: "Daily energy and vitality", es: "Energía y vitalidad diarias" },
  { ar: "دعم شامل لصحة البروستاتا", en: "Complete prostate health support", es: "Apoyo completo a la próstata" },
];

const STEPS = [
  {
    icon: Pill,
    num: "01",
    titleAr: "تناول كبسولتين يومياً",
    titleEn: "Take two capsules daily",
    titleEs: "Toma dos cápsulas al día",
    bodyAr: "خذ كبسولتين مع كوب من الماء، ويفضل مع الوجبة لتحقيق أفضل امتصاص وفعالية.",
    bodyEn: "Take two capsules with a glass of water, preferably with a meal for best absorption and effectiveness.",
    bodyEs: "Toma dos cápsulas con un vaso de agua, preferiblemente con una comida para una mejor absorción.",
  },
  {
    icon: CalendarCheck,
    num: "02",
    titleAr: "الاستمرار يومياً",
    titleEn: "Stay consistent daily",
    titleEs: "Sé constante cada día",
    bodyAr: "الالتزام بالجرعة اليومية لمدة لا تقل عن 30 يوماً لتحقيق أفضل النتائج.",
    bodyEn: "Stick to the daily dose for at least 30 days to achieve the best results.",
    bodyEs: "Mantén la dosis diaria durante al menos 30 días para lograr los mejores resultados.",
  },
  {
    icon: Trophy,
    num: "03",
    titleAr: "استمتع بالنتائج",
    titleEn: "Enjoy the results",
    titleEs: "Disfruta los resultados",
    bodyAr: "ابدأ في ملاحظة تحسن الصحة العامة، والنشاط، والراحة مع الاستمرار.",
    bodyEn: "Start noticing better overall health, energy, and comfort as you continue.",
    bodyEs: "Empieza a notar mejor salud general, energía y comodidad con la constancia.",
  },
];

const FORMULA = [
  {
    icon: Leaf,
    titleAr: "مزيج فطر طبيعي",
    titleEn: "Natural mushroom blend",
    titleEs: "Mezcla natural de hongos",
    bodyAr: "مكونات فطرية مختارة لدعم المناعة والصحة العامة للرجال.",
    bodyEn: "Selected mushroom ingredients to support immunity and men's overall health.",
    bodyEs: "Hongos seleccionados para apoyar la inmunidad y la salud del hombre.",
  },
  {
    icon: FlaskConical,
    titleAr: "تركيبة طبيعية متقدمة",
    titleEn: "Advanced natural formula",
    titleEs: "Fórmula natural avanzada",
    bodyAr: "مزيج من 10 نباتات وفيتامينات أساسية مدروسة بعناية.",
    bodyEn: "A blend of 10 carefully studied essential plants and vitamins.",
    bodyEs: "Una mezcla de 10 plantas y vitaminas esenciales estudiadas con cuidado.",
  },
  {
    icon: HeartPulse,
    titleAr: "دعم صحي للبروستاتا",
    titleEn: "Healthy prostate support",
    titleEs: "Apoyo saludable a la próstata",
    bodyAr: "يساعد في الحفاظ على صحة البروستاتا والوظائف الطبيعية.",
    bodyEn: "Helps maintain prostate health and normal functions.",
    bodyEs: "Ayuda a mantener la salud de la próstata y sus funciones normales.",
  },
  {
    icon: Droplets,
    titleAr: "ساو بالميتو",
    titleEn: "Saw palmetto",
    titleEs: "Saw palmetto",
    bodyAr: "يُساعد في دعم تدفق البول وصحة الجهاز البولي للرجال.",
    bodyEn: "Helps support urine flow and men's urinary tract health.",
    bodyEs: "Ayuda a apoyar el flujo urinario y la salud urinaria del hombre.",
  },
  {
    icon: ShieldCheck,
    titleAr: "دعم المثانة",
    titleEn: "Bladder support",
    titleEs: "Apoyo a la vejiga",
    bodyAr: "يساعد على تحسين وظيفة المثانة وتقليل مشاعر الانزعاج.",
    bodyEn: "Helps improve bladder function and reduce discomfort.",
    bodyEs: "Ayuda a mejorar la función de la vejiga y reducir las molestias.",
  },
  {
    icon: Zap,
    titleAr: "دعم مضاد للالتهابات",
    titleEn: "Anti-inflammation support",
    titleEs: "Apoyo antiinflamatorio",
    bodyAr: "مكونات طبيعية تساعد في تقليل الالتهابات ودعم الراحة اليومية.",
    bodyEn: "Natural ingredients that help reduce inflammation and support daily comfort.",
    bodyEs: "Ingredientes naturales que ayudan a reducir la inflamación y apoyan el bienestar diario.",
  },
];

const QUALITY = [
  {
    icon: Leaf,
    titleAr: "مكونات طبيعية",
    titleEn: "Natural ingredients",
    titleEs: "Ingredientes naturales",
    bodyAr: "100% طبيعية وخالية من المواد الصناعية الضارة.",
    bodyEn: "100% natural and free of harmful artificial substances.",
    bodyEs: "100% naturales y libres de sustancias artificiales dañinas.",
  },
  {
    icon: Award,
    titleAr: "معايير الجودة العالمية GMP",
    titleEn: "GMP world quality standards",
    titleEs: "Estándares mundiales de calidad GMP",
    bodyAr: "مصنع وفق أعلى معايير الجودة العالمية.",
    bodyEn: "Manufactured to the highest world quality standards.",
    bodyEs: "Fabricado con los más altos estándares de calidad.",
  },
  {
    icon: FlaskConical,
    titleAr: "مختبر ومعتمد",
    titleEn: "Lab tested and certified",
    titleEs: "Probado y certificado",
    bodyAr: "مختبر ومعتمد لضمان الفحص والجودة في كل دفعة.",
    bodyEn: "Lab tested and certified to guarantee inspection and quality in every batch.",
    bodyEs: "Probado y certificado para garantizar la calidad en cada lote.",
  },
  {
    icon: Pill,
    titleAr: "كبسولات عالية الجودة",
    titleEn: "High-quality capsules",
    titleEs: "Cápsulas de alta calidad",
    bodyAr: "كبسولات نباتية سهلة البلع ومريحة للمعدة.",
    bodyEn: "Easy-to-swallow vegetable capsules, gentle on the stomach.",
    bodyEs: "Cápsulas vegetales fáciles de tragar y suaves con el estómago.",
  },
  {
    icon: ShieldCheck,
    titleAr: "تركيبة آمنة",
    titleEn: "Safe formula",
    titleEs: "Fórmula segura",
    bodyAr: "تركيبة متوازنة وآمنة للاستخدام اليومي وطويل الأمد.",
    bodyEn: "A balanced formula, safe for daily and long-term use.",
    bodyEs: "Una fórmula equilibrada y segura para uso diario y prolongado.",
  },
];

const REVIEW_BADGES = [
  { icon: Users, ar: "موثوق من آلاف العملاء", en: "Trusted by thousands of customers", es: "Miles de clientes confían" },
  { icon: BadgeCheck, ar: "تقييمات حقيقية", en: "Real reviews", es: "Reseñas reales" },
  { icon: TrendingUp, ar: "مجتمع متنامي", en: "Growing community", es: "Comunidad creciente" },
  { icon: ThumbsUp, ar: "نتائج حقيقية", en: "Real results", es: "Resultados reales" },
];

const REVIEWS = [
  {
    img: "/products/prostate-snap-review-1.webp",
    nameAr: "أحمد الشامي",
    nameEn: "Ahmed Al-Shami",
    metaAr: "54 سنة - الرياض",
    metaEn: "54 years old — Riyadh",
    metaEs: "54 años — Riad",
    textAr:
      "من أفضل المنتجات التي استخدمتها لدعم صحة البروستاتا. لاحظت تحسناً كبيراً في الراحة النومية والنشاط اليومي خلال أسابيع قليلة. أنصح به لكل رجل يهتم بصحته.",
    textEn:
      "One of the best products I have used to support prostate health. I noticed a big improvement in sleep comfort and daily energy within a few weeks. I recommend it to every man who cares about his health.",
    textEs:
      "Uno de los mejores productos que he usado para la salud de la próstata. Noté una gran mejora en el descanso nocturno y la energía diaria en pocas semanas. Lo recomiendo a todo hombre que cuide su salud.",
  },
  {
    img: "/products/prostate-snap-review-2.webp",
    nameAr: "سامي العتيبي",
    nameEn: "Sami Al-Otaibi",
    metaAr: "48 سنة - جدة",
    metaEn: "48 years old — Jeddah",
    metaEs: "48 años — Yeda",
    textAr:
      "كنت أعاني من التبول المتكرر وعدم الراحة، لكن بعد استخدام هذا المنتج أصبحت حياتي أفضل بكثير. نومي أعمق وطاقة جسمي ارتفعت. منتج رائع ويستحق كل ريال.",
    textEn:
      "I used to suffer from frequent urination and discomfort, but after using this product my life became much better. My sleep is deeper and my energy is up. A great product, worth every riyal.",
    textEs:
      "Sufría de micción frecuente e incomodidad, pero después de usar este producto mi vida mejoró mucho. Duermo más profundo y tengo más energía. Un gran producto que vale cada centavo.",
  },
  {
    img: "/products/prostate-snap-review-3.webp",
    nameAr: "فهد الحربي",
    nameEn: "Fahd Al-Harbi",
    metaAr: "60 سنة - الدمام",
    metaEn: "60 years old — Dammam",
    metaEs: "60 años — Dammam",
    textAr:
      "جودة ممتازة ومكونات طبيعية تمنح شعوراً بالراحة من أول أسبوع. أصبح جزءاً أساسياً من روتيني اليومي وأشعر بفارق واضح في صحتي العامة. شكراً لصناع هذا المنتج بهذه الجودة.",
    textEn:
      "Excellent quality and natural ingredients that bring comfort from the first week. It became an essential part of my daily routine and I feel a clear difference in my overall health. Thanks to the makers for this quality.",
    textEs:
      "Excelente calidad e ingredientes naturales que dan bienestar desde la primera semana. Se volvió parte esencial de mi rutina diaria y siento una clara diferencia en mi salud general.",
  },
  {
    img: "/products/prostate-snap-review-4.webp",
    nameAr: "ماجد السبيعي",
    nameEn: "Majed Al-Subaie",
    metaAr: "41 سنة - الكويت",
    metaEn: "41 years old — Kuwait",
    metaEs: "41 años — Kuwait",
    textAr:
      "التصميم والمكونات مذهلة. لاحظت تحسناً في التركيز والطاقة والراحة اليومية. المنتج طبيعي وآمن وسهل الاستخدام. أوصي به بنسبة 100%.",
    textEn:
      "The design and ingredients are amazing. I noticed an improvement in focus, energy, and daily comfort. The product is natural, safe, and easy to use. I recommend it 100%.",
    textEs:
      "El diseño y los ingredientes son increíbles. Noté mejora en la concentración, la energía y el bienestar diario. El producto es natural, seguro y fácil de usar. Lo recomiendo al 100%.",
  },
];

const TRUST = [
  {
    icon: ShieldCheck,
    titleAr: "ضمان الجودة",
    titleEn: "Quality guarantee",
    titleEs: "Garantía de calidad",
    bodyAr: "منتج أصلي 100%",
    bodyEn: "100% original product",
    bodyEs: "Producto 100% original",
  },
  {
    icon: Truck,
    titleAr: "شحن سريع وآمن",
    titleEn: "Fast, safe shipping",
    titleEs: "Envío rápido y seguro",
    bodyAr: "يوصل لباب بيتك",
    bodyEn: "Delivered to your door",
    bodyEs: "Entrega a tu puerta",
  },
  {
    icon: HandCoins,
    titleAr: "الدفع عند الاستلام",
    titleEn: "Cash on delivery",
    titleEs: "Pago contra entrega",
    bodyAr: "ادفع عند وصول الطلب",
    bodyEn: "Pay when your order arrives",
    bodyEs: "Paga cuando llegue tu pedido",
  },
  {
    icon: Headphones,
    titleAr: "خدمة عملاء متميزة",
    titleEn: "Outstanding support",
    titleEs: "Atención al cliente",
    bodyAr: "دعم سريع وفعال",
    bodyEn: "Fast, effective support",
    bodyEs: "Soporte rápido y eficaz",
  },
];

function StarRow({ className }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4 fill-current", className)} />
      ))}
    </span>
  );
}

export function ProstateStory({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const landing = product.landing;
  if (!landing) return null;

  const faq = landing.faq ?? [];

  return (
    <div className="mt-14 space-y-14 sm:space-y-16" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* Smart choice + glow bottle */}
      <section className={cn(DARK_CARD, "mx-auto max-w-4xl overflow-hidden px-5 py-8 sm:px-10")}>
        <div className="grid items-center gap-6 sm:grid-cols-2">
          <div className="text-center sm:text-start">
            <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", GREEN)}>
              {loc(locale, "اختيار الرجل الذكي", "The smart man's choice", "La elección del hombre inteligente")}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold leading-snug sm:text-3xl">
              {loc(locale, "لصحة تدوم وجودة حياة أفضل", "For lasting health and a better quality of life", "Para una salud duradera y mejor calidad de vida")}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {SMART_BADGES.map(({ icon: Icon, ar, en, es }) => (
                <li key={en} className="flex items-center justify-center gap-2.5 sm:justify-start">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4ade80]/15">
                    <Icon className={cn("h-4 w-4", GREEN)} />
                  </span>
                  <span className="text-sm font-bold text-white/90">{loc(locale, ar, en, es)}</span>
                </li>
              ))}
            </ul>
          </div>
          <ProductImage
            src="/products/prostate-snap-glow.webp"
            alt={pickText(product, "name", locale)}
            width={390}
            height={460}
            className="mx-auto w-full max-w-[16rem] rounded-2xl sm:max-w-none"
          />
        </div>
      </section>

      {/* Before / After */}
      <section className="mx-auto max-w-4xl">
        <h2 className="product-section-title text-center text-ink-900">
          {loc(locale, "من مشاكل البروستاتا", "From prostate troubles", "De los problemas de próstata")}{" "}
          <span className="text-brand-700">
            {loc(locale, "إلى راحة وثقة كل يوم", "to comfort and confidence every day", "a comodidad y confianza cada día")}
          </span>
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.25rem] border border-red-200 bg-red-50/60 p-5 sm:p-6">
            <p className="flex items-center gap-2 text-lg font-extrabold text-red-600">
              <X className="h-5 w-5" />
              {loc(locale, "قبل", "Before", "Antes")}
            </p>
            <ul className="mt-4 space-y-3">
              {BEFORE.map((item) => (
                <li key={item.en} className="flex items-start gap-2.5 text-sm font-semibold text-ink-800">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  {loc(locale, item.ar, item.en, item.es)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-emerald-200 bg-emerald-50/70 p-5 sm:p-6">
            <p className="flex items-center gap-2 text-lg font-extrabold text-emerald-600">
              <Check className="h-5 w-5" />
              {loc(locale, "بعد", "After", "Después")}
            </p>
            <ul className="mt-4 space-y-3">
              {AFTER.map((item) => (
                <li key={item.en} className="flex items-start gap-2.5 text-sm font-semibold text-ink-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {loc(locale, item.ar, item.en, item.es)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How to use — 3 steps */}
      <section className={cn(DARK_CARD, "mx-auto max-w-4xl px-5 py-8 sm:px-10")}>
        <p className={cn("text-center text-xs font-bold uppercase tracking-[0.2em]", GREEN)}>
          {loc(locale, "طريقة الاستخدام", "How to use", "Modo de uso")}
        </p>
        <h2 className="mt-2 text-center text-2xl font-extrabold sm:text-3xl">
          {loc(locale, "في 3 خطوات بسيطة", "In 3 simple steps", "En 3 simples pasos")}
        </h2>
        <ol className="mt-7 grid gap-4 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, num, titleAr, titleEn, titleEs, bodyAr, bodyEn, bodyEs }) => (
            <li key={num} className="rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10">
              <span className={cn("text-3xl font-black", GREEN)} dir="ltr">{num}</span>
              <span className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#4ade80]/15">
                <Icon className={cn("h-6 w-6", GREEN)} />
              </span>
              <p className="mt-3 font-bold">{loc(locale, titleAr, titleEn, titleEs)}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{loc(locale, bodyAr, bodyEn, bodyEs)}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-center justify-center gap-2.5 rounded-2xl bg-[#4ade80]/10 px-4 py-3.5 text-center ring-1 ring-[#4ade80]/25">
          <Moon className={cn("h-5 w-5 shrink-0", GREEN)} />
          <p className="text-sm font-bold text-white">
            {loc(locale, "الانتظام هو المفتاح", "Consistency is the key", "La constancia es la clave")}
            <span className="mt-0.5 block text-xs font-semibold text-white/70">
              {loc(locale, "كلما كنت ملتزماً، كلما كانت النتائج أفضل وأسرع", "The more consistent you are, the better and faster the results", "Cuanto más constante seas, mejores y más rápidos serán los resultados")}
            </span>
          </p>
        </div>
      </section>

      {/* Formula callouts around the bottle */}
      <section className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
          {loc(locale, "هندسة متطورة", "Advanced engineering", "Ingeniería avanzada")}
        </p>
        <h2 className="product-section-title mt-1 text-center text-ink-900">
          {loc(locale, "لصحة البروستاتا المثلى", "For optimal prostate health", "Para una salud óptima de la próstata")}
        </h2>
        <div className="mt-8 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div className="order-2 grid gap-4 sm:order-1">
            {FORMULA.slice(0, 3).map(({ icon: Icon, titleAr, titleEn, titleEs, bodyAr, bodyEn, bodyEs }) => (
              <div key={titleEn} className="rounded-2xl border border-sand-200 bg-white p-4 shadow-[0_6px_20px_rgba(14,34,29,0.05)]">
                <p className="flex items-center gap-2 font-bold text-ink-900">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <Icon className="h-4 w-4 text-brand-700" />
                  </span>
                  {loc(locale, titleAr, titleEn, titleEs)}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{loc(locale, bodyAr, bodyEn, bodyEs)}</p>
              </div>
            ))}
          </div>
          <div className="order-1 sm:order-2">
            <ProductImage
              src="/products/prostate-snap-main.webp"
              alt={pickText(product, "name", locale)}
              width={799}
              height={799}
              className="mx-auto w-full max-w-[15rem] rounded-2xl sm:max-w-[17rem]"
            />
          </div>
          <div className="order-3 grid gap-4">
            {FORMULA.slice(3).map(({ icon: Icon, titleAr, titleEn, titleEs, bodyAr, bodyEn, bodyEs }) => (
              <div key={titleEn} className="rounded-2xl border border-sand-200 bg-white p-4 shadow-[0_6px_20px_rgba(14,34,29,0.05)]">
                <p className="flex items-center gap-2 font-bold text-ink-900">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <Icon className="h-4 w-4 text-brand-700" />
                  </span>
                  {loc(locale, titleAr, titleEn, titleEs)}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{loc(locale, bodyAr, bodyEn, bodyEs)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & manufacturing */}
      <section className={cn(DARK_CARD, "mx-auto max-w-4xl px-5 py-8 sm:px-10")}>
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
          {loc(locale, "تقنيات الجودة والتصنيع", "Quality & manufacturing standards", "Calidad y fabricación")}
        </h2>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {QUALITY.map(({ icon: Icon, titleAr, titleEn, titleEs, bodyAr, bodyEn, bodyEs }) => (
            <li key={titleEn} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4ade80]/15">
                <Icon className={cn("h-5 w-5", GREEN)} />
              </span>
              <div>
                <p className="text-sm font-bold">{loc(locale, titleAr, titleEn, titleEs)}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/70">{loc(locale, bodyAr, bodyEn, bodyEs)}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-2xl bg-[#4ade80]/10 px-4 py-4 text-center ring-1 ring-[#4ade80]/25">
          <p className="font-extrabold">
            {loc(locale, "مصمم خصيصاً لدعم صحة البروستاتا والجهاز البولي للرجال", "Designed specifically to support men's prostate and urinary health", "Diseñado específicamente para apoyar la salud prostática y urinaria del hombre")}
          </p>
          <p className={cn("mt-1 text-sm font-bold", GREEN)}>
            {loc(locale, "تركيبة متكاملة تمنحك الثقة والراحة كل يوم", "A complete formula that gives you confidence and comfort every day", "Una fórmula completa que te da confianza y bienestar cada día")}
          </p>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-4xl">
        <h2 className="product-section-title text-center text-ink-900">
          {loc(locale, "قصص نجاح حقيقية من عملائنا السعداء", "Real success stories from our happy customers", "Historias reales de nuestros clientes felices")}
        </h2>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {REVIEW_BADGES.map(({ icon: Icon, ar, en, es }) => (
            <li key={en} className="inline-flex items-center gap-1.5 rounded-full border border-sand-200 bg-white px-3 py-1.5 text-xs font-bold text-ink-800 shadow-sm">
              <Icon className="h-3.5 w-3.5 text-brand-700" />
              {loc(locale, ar, en, es)}
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {REVIEWS.map((review) => (
            <li key={review.nameEn} className="overflow-hidden rounded-[1.25rem] border border-sand-200 bg-white shadow-[0_6px_20px_rgba(14,34,29,0.05)]">
              <ProductImage
                src={review.img}
                alt={loc(locale, review.nameAr, review.nameEn)}
                width={330}
                height={260}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-ink-900">
                    {loc(locale, review.nameAr, review.nameEn)}
                    <span className="mt-0.5 block text-xs font-semibold text-[var(--muted)]">
                      {loc(locale, review.metaAr, review.metaEn, review.metaEs)}
                    </span>
                  </p>
                  <Quote className="h-5 w-5 shrink-0 text-brand-200" />
                </div>
                <div className="mt-2">
                  <StarRow />
                </div>
                <p className="product-body mt-2 text-sm text-ink-800">
                  {loc(locale, review.textAr, review.textEn, review.textEs)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className={cn(DARK_CARD, "mt-6 grid grid-cols-3 divide-x divide-white/10 px-2 py-5 text-center rtl:divide-x-reverse")}>
          <div>
            <p className={cn("text-xl font-black sm:text-2xl", GREEN)} dir="ltr">50,000+</p>
            <p className="mt-1 text-xs font-bold text-white/80">{loc(locale, "عميل راضي", "Happy customers", "Clientes satisfechos")}</p>
          </div>
          <div>
            <p className={cn("text-xl font-black sm:text-2xl", GREEN)} dir="ltr">4.9/5</p>
            <p className="mt-1 text-xs font-bold text-white/80">{loc(locale, "متوسط التقييم", "Average rating", "Valoración media")}</p>
          </div>
          <div>
            <p className={cn("text-xl font-black sm:text-2xl", GREEN)} dir="ltr">99%</p>
            <p className="mt-1 text-xs font-bold text-white/80">{loc(locale, "ينصحون به", "Recommend it", "Lo recomiendan")}</p>
          </div>
        </div>
      </section>

      {/* Urgency + CTA */}
      <section className={cn(DARK_CARD, "mx-auto max-w-4xl px-5 py-8 text-center sm:px-10")}>
        <p className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-4 py-1.5 text-sm font-extrabold text-red-400 ring-1 ring-red-500/30">
          <Flame className="h-4 w-4" />
          {loc(locale, "عرض محدود لفترة قصيرة!", "Limited offer for a short time!", "¡Oferta limitada por poco tiempo!")}
        </p>
        <h2 className="mt-4 text-2xl font-extrabold leading-snug sm:text-3xl">
          {loc(locale, "لا تفوّت الفرصة الأخيرة قبل نفاد الكمية!", "Don't miss the last chance before stock runs out!", "¡No pierdas la última oportunidad antes de que se agote!")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/75">
          {loc(locale, "ابدأ اليوم رحلتك نحو صحة البروستاتا وحياة أكثر نشاطاً وراحة.", "Start today your journey toward prostate health and a more active, comfortable life.", "Empieza hoy tu camino hacia la salud de la próstata y una vida más activa y cómoda.")}
        </p>
        <ProductImage
          src="/products/prostate-snap-bottle.webp"
          alt={pickText(product, "name", locale)}
          width={941}
          height={480}
          className="mx-auto mt-6 w-full max-w-xl rounded-2xl"
        />
        <button
          type="button"
          onClick={scrollToOrder}
          className={cn(CTA_BUTTON_CLASS, "mt-7 inline-flex w-full items-center justify-center rounded-2xl px-6 py-4 text-lg font-extrabold sm:w-auto sm:min-w-[20rem]")}
        >
          {loc(locale, "اطلب الآن قبل نفاد الكمية", "Order now before stock runs out", "Pide ahora antes de que se agote")}
        </button>
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TRUST.map(({ icon: Icon, titleAr, titleEn, titleEs, bodyAr, bodyEn, bodyEs }) => (
            <li key={titleEn} className="rounded-2xl bg-white/5 p-3.5 ring-1 ring-white/10">
              <Icon className={cn("mx-auto h-6 w-6", GREEN)} />
              <p className="mt-2 text-xs font-extrabold">{loc(locale, titleAr, titleEn, titleEs)}</p>
              <p className="mt-0.5 text-[0.65rem] font-semibold text-white/65">{loc(locale, bodyAr, bodyEn, bodyEs)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ (hidden from SocialProof for story slugs, so rendered here) */}
      {faq.length > 0 ? (
        <section className="mx-auto max-w-3xl">
          <h2 className="product-section-title text-center text-ink-900">
            {loc(locale, "أسئلة شائعة", "Frequently asked questions", "Preguntas frecuentes")}
          </h2>
          <ul className="mt-6 space-y-3">
            {faq.map((item) => {
              const question = pickText(item, "question", locale);
              const answer = pickText(item, "answer", locale);
              return (
                <li key={question}>
                  <details className="group rounded-2xl border border-sand-200 bg-white px-5 py-4 shadow-[0_6px_20px_rgba(14,34,29,0.05)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                      {question}
                      <ChevronDown className="h-4 w-4 shrink-0 text-brand-700 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="product-body mt-3 text-sm text-ink-800">{answer}</p>
                  </details>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
