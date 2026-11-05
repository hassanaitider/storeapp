/**
 * Problem → solution copy for the landing template, keyed by product slug.
 * `landing.problem*` / `landing.solution*` on a product take precedence over this table.
 * Keep claims generic (use-case pain points) — no medical or performance promises.
 */
export interface ProblemSolutionCopy {
  problemAr?: string;
  problemEn: string;
  problemEs?: string;
  solutionAr?: string;
  solutionEn: string;
  solutionEs?: string;
}

export const PRODUCT_PROBLEMS: Record<string, ProblemSolutionCopy> = {
  "anti-theft-usb-sling-bag": {
    problemAr: "حقيبتك مفتوحة فالزحام، والتيليفون كيفرغ وانتا برا الدار.",
    problemEn: "Your bag is exposed in crowds and your phone dies while you're out.",
    solutionAr: "حقيبة كتف بقفل برقم سري ومنفذ USB باش تشحن وانتا ماشي.",
    solutionEn: "A sling bag with a combination lock and a USB port to charge on the go.",
  },
  "sacoche-antitheft-usb": {
    problemAr: "حقيبتك مفتوحة فالزحام، والتيليفون كيفرغ وانتا برا الدار.",
    problemEn: "Your bag is exposed in crowds and your phone dies while you're out.",
    solutionAr: "حقيبة كتف بقفل برقم سري ومنفذ USB باش تشحن وانتا ماشي.",
    solutionEn: "A sling bag with a combination lock and a USB port to charge on the go.",
  },
  "3-tier-rolling-storage-cart": {
    problemAr: "الحوايج الصغار مبعثرين فالمطبخ والحمام والبلاصة ضيقة.",
    problemEn: "Small items pile up in the kitchen and bathroom and space is tight.",
    solutionAr: "عربة متحركة بـ 3 طوابق كتجمع كلشي فبلاصة وحدة وكتتحرك فين بغيتي.",
    solutionEn: "A rolling 3-tier cart that keeps everything in one place and moves where you need it.",
  },
  "corner-shower-caddy-5-piece": {
    problemAr: "قوارير الحمام محطوطين فالأرض ومكيلقاوش بلاصة.",
    problemEn: "Bottles crowd the shower floor and there's nowhere to put them.",
    solutionAr: "رفوف ركنية كتستغل الزاوية وكتخلي الحمام مرتب.",
    solutionEn: "Corner shelves that use the empty corner and keep the shower tidy.",
  },
  "dashcam-3-cameras-ecran-4-pouces": {
    problemAr: "فحالة حادث أو خلاف فالطريق، ما كاين حتى دليل على اللي وقع.",
    problemEn: "After an incident on the road, you have no footage of what happened.",
    solutionAr: "كاميرا سيارة بـ 3 عدسات وشاشة 4 بوصات كتسجل الطريق وكتحفظ الفيديو.",
    solutionEn: "A 3-camera dashcam with a 4-inch screen that records the road and saves the footage.",
  },
  "mini-fer-vapeur-portable": {
    problemAr: "الكي الكبير ثقيل وكياخد بلاصة، ومكتبغيش تخرج بحوايج مكرمشين.",
    problemEn: "A full-size iron is bulky, and wrinkled clothes ruin the look.",
    solutionAr: "مكواة بخار صغيرة تدّيها معاك فالسفر وفالدار فدقائق.",
    solutionEn: "A mini steam iron you can take anywhere and use in minutes.",
  },
  "ceinture-lombaire-dos": {
    problemAr: "الوقوف والجلوس والحمل لمدة طويلة كيعيّيو أسفل ظهرك.",
    problemEn: "Long hours of standing, sitting or lifting leave your lower back tired.",
    solutionAr: "حزام دعم بضغط مزدوج قابل للتعديل ودعامات خلفية، خفيف ومريح طول النهار.",
    solutionEn: "A support belt with adjustable double compression and rear stays, light enough to wear all day.",
  },
  "pack-immunite-hiver": {
    problemAr: "فالشتا كتبغي تهتم براسك وبعائلتك وماعندكش وقت تجمع كلشي بوحدو.",
    problemEn: "In winter you want to look after yourself and your family without piecing it all together.",
    solutionAr: "باك واحد كيجمع الحاجيات الشتوية فطلب واحد.",
    solutionEn: "One pack that brings your winter essentials together in a single order.",
  },
  "cordless-car-vacuum": {
    problemAr: "الغبرة والفتات فالسيارة وفين تلقى بلاصة تنظفها.",
    problemEn: "Dust and crumbs build up in the car and cleaning it is a chore.",
    solutionAr: "مكنسة سيارة بلا سلك خفيفة كتنظف بلا شي بلاصة وبلا فيشة.",
    solutionEn: "A light cordless car vacuum — no cable, no outlet, no fuss.",
  },
  "portable-baby-washer": {
    problemAr: "غسل حوايج الرضيع الصغار فاليد كياخد وقت.",
    problemEn: "Hand-washing small baby clothes takes time you don't have.",
    solutionAr: "غسالة صغيرة محمولة للحوايج الصغار وللسفر.",
    solutionEn: "A compact portable washer for small baby items and travel.",
  },
  "smart-audio-sunglasses": {
    problemAr: "السماعات فالودنين كتعيق، وماكتحيدش عينيك من الطريق.",
    problemEn: "Earbuds get in the way and you still want to hear around you.",
    solutionAr: "نظارات شمسية بصوت مدمج: موسيقى ومكالمات بلا سماعات.",
    solutionEn: "Sunglasses with built-in audio: music and calls with no earbuds.",
  },
  "wireless-charger-alarm-clock": {
    problemAr: "فوق الطاولة منبه وشاحن وكابلات وكلشي مشتت.",
    problemEn: "Your nightstand is cluttered with an alarm clock, a charger and cables.",
    solutionAr: "منبه وشاحن لاسلكي فجهاز واحد.",
    solutionEn: "An alarm clock and wireless charger in a single device.",
  },
  "neck-shoulder-massager": {
    problemAr: "الرقبة والكتفين كيتشدو من الجلوس والخدمة.",
    problemEn: "Your neck and shoulders get tight from desk work and long days.",
    solutionAr: "مدلك للرقبة والكتفين تستعملو فالدار فأي وقت.",
    solutionEn: "A neck and shoulder massager you can use at home any time.",
  },
  "inflatable-air-bed": {
    problemAr: "جاو ضياف وماكاين فين ينعسو.",
    problemEn: "Guests arrive and you don't have a spare bed.",
    solutionAr: "فراش هوائي كيتنفخ بسرعة وكيتطوى باش ياخد بلاصة قليلة.",
    solutionEn: "An air bed that inflates fast and folds away small.",
  },
  "solar-4g-security-camera": {
    problemAr: "بلاصة بلا كهرباء ولا واي فاي ماتقدرش تراقبها.",
    problemEn: "A spot without power or Wi-Fi is hard to keep an eye on.",
    solutionAr: "كاميرا مراقبة بالطاقة الشمسية و4G، ماكتحتاج لا كابل ولا واي فاي.",
    solutionEn: "A solar-powered 4G camera that needs no wiring and no Wi-Fi.",
  },
  "denx-dx421-solar-power-bank": {
    problemAr: "البطارية كتسالي فالسفر والخرجات وماكاينش فين تشحن.",
    problemEn: "Your battery dies on trips and outings with no outlet around.",
    solutionAr: "باور بانك بلوحة شمسية كيعاونك تشحن حتى فالطبيعة.",
    solutionEn: "A power bank with a solar panel to help you top up outdoors.",
  },
  "iphone-13-pro-battery-case-6800": {
    problemAr: "الآيفون كيفرغ قبل ما تسالي نهارك.",
    problemEn: "Your iPhone runs out of battery before the day is over.",
    solutionAr: "كوك بطارية 6800 mAh كيحمي التيليفون وكيزيد ليه الشحن.",
    solutionEn: "A 6800 mAh battery case that protects the phone and adds extra charge.",
  },
  "budi-power-bank-20000mah": {
    problemAr: "تيليفون واحد ماكيكفيش، والشحن كيسالي فالطريق.",
    problemEn: "One charge is never enough when you're out all day.",
    solutionAr: "باور بانك 20000 mAh كيشحن أكثر من مرة.",
    solutionEn: "A 20,000 mAh power bank that gives you several charges.",
  },
  "xiaomi-wireless-earbuds-tws": {
    problemAr: "الكابل كيتعطل والسماعات السلكية كتعيق.",
    problemEn: "Cables tangle and wired earphones get in the way.",
    solutionAr: "سماعات بلوتوث لاسلكية مع علبة شحن ومؤشر LED.",
    solutionEn: "Wireless Bluetooth earbuds with a charging case and LED indicator.",
  },
  "kitchen-3pcs-blender-chopper-juicer": {
    problemAr: "تقطيع الخضرة وعصر الفواكه كياخد وقت وجهد.",
    problemEn: "Chopping, blending and juicing by hand takes time and effort.",
    solutionAr: "3 أدوات فجهاز واحد: خلاط ومقطع وعصارة.",
    solutionEn: "Three tools in one: blender, chopper and juicer.",
  },
  "over-sink-dish-drying-rack": {
    problemAr: "الصحون المبللين كيحتلو الكونتوار والبلاصة قليلة.",
    problemEn: "Wet dishes take over the counter in a small kitchen.",
    solutionAr: "رف فوق الحوض كيجفف الصحون وكيوفر ليك بلاصة.",
    solutionEn: "An over-the-sink rack that dries dishes and frees up counter space.",
  },
  "konnect-kn101-power-bank-30000": {
    problemAr: "فالسفر الطويل كتبقى بلا شحن.",
    problemEn: "On long trips you run out of charge.",
    solutionAr: "باور بانك 30000 mAh لعدة شحنات لكل أجهزتك.",
    solutionEn: "A 30,000 mAh power bank for multiple charges across your devices.",
  },
  "coffret-montre-bijoux-femme": {
    problemAr: "كتقلب على هدية أنيقة وجاهزة وماكتلقاهاش.",
    problemEn: "Finding a stylish, ready-to-give present isn't easy.",
    solutionAr: "كوفري ساعة ذكية مع مجوهرات جاهز للإهداء.",
    solutionEn: "A smartwatch and jewelry gift set, ready to give.",
  },
  "ceinture-soutien-maternite": {
    problemAr: "مع الحمل البطن والظهر كيتعبو من الوقوف والمشي.",
    problemEn: "During pregnancy, standing and walking can leave your belly and back tired.",
    solutionAr: "حزام دعم للحمل كيرفع البطن ويريح الظهر.",
    solutionEn: "A maternity belt that lifts the belly and relieves the back.",
  },
  "organisateur-epices-12-pots": {
    problemAr: "التوابل مبعثرة فالمطبخ وكتضيع وقت فالقلب.",
    problemEn: "Spices are scattered around the kitchen and hard to find.",
    solutionAr: "منظم توابل بـ 12 علبة على طابقين، كلشي مرتب وقدام عينيك.",
    solutionEn: "A two-tier rack with 12 jars keeps every spice in sight.",
  },
  "sac-isotherme-insuline": {
    problemAr: "فالسفر خصك تحافظ على البرودة ديال الأدوية اللي كتستعمل.",
    problemEn: "On the move you need to keep your cold-stored items cool.",
    solutionAr: "حقيبة عازلة للحرارة مع شاشة لعرض الحرارة.",
    solutionEn: "An insulated travel bag with a temperature display.",
  },
  "masseur-cou-main-sans-fil": {
    problemAr: "الرقبة كتشد من الشاشات والجلوس الطويل.",
    problemEn: "Screens and long sitting leave your neck stiff.",
    solutionAr: "مدلك رقبة بشكل يد بلا سلك، كتشحنو وتاخدو فين بغيتي.",
    solutionEn: "A cordless hand-shaped neck massager you charge and take anywhere.",
  },
  "chaise-haute-bebe-portable": {
    problemAr: "الكرسي العالي الكبير ثقيل وكياخد بلاصة فالدار.",
    problemEn: "A full-size high chair is heavy and takes up room at home.",
    solutionAr: "كرسي رضيع قابل للطي وخفيف، تدّيه فين بغيتي.",
    solutionEn: "A light, foldable baby chair you can take anywhere.",
  },
  "nettoyeur-pinceaux-maquillage": {
    problemAr: "تنظيف فرشاة المكياج باليد كياخد وقت وكيتنسى.",
    problemEn: "Cleaning makeup brushes by hand takes time and often gets skipped.",
    solutionAr: "منظف كهربائي أوتوماتيكي للفراشي فدقائق.",
    solutionEn: "An automatic electric brush cleaner that does it in minutes.",
  },
  "visseuse-sans-fil-kit": {
    problemAr: "التبرغيل باليد كيعيي، والأدوات مبعثرة.",
    problemEn: "Screwing by hand is tiring and the tools are scattered.",
    solutionAr: "مفك كهربائي بلا سلك مع كوفري كامل.",
    solutionEn: "A cordless electric screwdriver with a complete case.",
  },
  "walkie-talkie-video": {
    problemEn: "Calling out across a distance with no signal is hit or miss.",
    problemEs: "Comunicarte a distancia sin señal de celular no siempre es posible.",
    solutionEn: "A walkie-talkie pair with video, so you can see and talk.",
    solutionEs: "Un par de walkie talkies con video para verse y hablar.",
  },
  "elevador-de-colchon": {
    problemEn: "Making the bed means lifting a heavy mattress every time.",
    problemEs: "Tender la cama implica levantar un colchón pesado cada vez.",
    solutionEn: "A mattress lifter that raises it so you can make the bed with ease.",
    solutionEs: "Un elevador de colchón que lo levanta para que tiendas la cama sin esfuerzo.",
  },
  "fundas-para-sillas-elasticas": {
    problemEn: "Old or stained chairs make the whole room look worn.",
    problemEs: "Las sillas viejas o manchadas hacen que todo el comedor se vea gastado.",
    solutionEn: "Stretch covers that fit and refresh your chairs in seconds.",
    solutionEs: "Fundas elásticas que se ajustan y renuevan tus sillas en segundos.",
  },
  "consola-retrolab": {
    problemEn: "Hunting for classic games across devices is a hassle.",
    problemEs: "Buscar juegos clásicos en distintos dispositivos es una molestia.",
    solutionEn: "A portable console with classic games ready to play.",
    solutionEs: "Una consola portátil con juegos clásicos listos para jugar.",
  },
};
