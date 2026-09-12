import type { Product } from "./types";

/**
 * Spanish copy for the products sold in every market. Kept apart from seed.ts
 * so the Arabic and English catalog stays readable; landing sections and FAQ
 * entries are matched by position onto the existing arrays.
 */

const COD_ES =
  "<p><strong>Pide ahora</strong> — envío gratis · pago contra entrega · devoluciones en 30 días.</p>";

interface SpanishSection {
  titleEs: string;
  bodyEs: string;
}

interface SpanishFaq {
  questionEs: string;
  answerEs: string;
}

interface SpanishCopy {
  nameEs: string;
  descriptionEs: string;
  detailsEs: string[];
  headlineEs: string;
  introEs: string;
  benefitsEs: string[];
  sections: SpanishSection[];
  faq: SpanishFaq[];
}

const SPANISH_COPY: Record<string, SpanishCopy> = {
  "prod-car-vacuum": {
    nameEs: "Aspiradora de Auto Inalámbrica",
    descriptionEs: `
<h3>La limpieza de tu auto, en tu mano</h3>
<p>¿Arena y migajas entre los asientos? Con esta aspiradora inalámbrica limpias la consola, los asientos y los rincones difíciles en minutos — <strong>sin cables que te estorben</strong> y sin esperar el autolavado.</p>
<ul>
<li>Boquilla delgada que llega donde no llega una aspiradora normal</li>
<li>Depósito transparente: ves la suciedad mientras aspiras</li>
<li>Ligera y portátil, siempre lista en la cajuela</li>
<li>Ideal para el polvo y el uso diario</li>
</ul>
${COD_ES}`.trim(),
    detailsEs: [
      "Diseño inalámbrico de mano con succión potente",
      "Boquilla delgada para espacios estrechos y la consola",
      "Depósito transparente, fácil de vaciar",
      "Ideal para interiores de auto y climas polvorientos",
      "Se enciende con un botón y agarre firme",
    ],
    headlineEs: "Un auto limpio en minutos, sin cables",
    introEs:
      "Cada día entra polvo y tierra a tu auto. En vez de esperar el autolavado, ten a mano una herramienta rápida que llega a los rincones y devuelve el interior limpio al instante. Hecha para interiores de auto: ligera, potente y lista en cualquier momento.",
    benefitsEs: [
      "Limpieza rápida de asientos y consola",
      "Sin cables que estorben",
      "Excelente contra arena y polvo",
      "Fácil de guardar en la cajuela",
      "Envío gratis y pago contra entrega",
    ],
    sections: [
      {
        titleEs: "Llega fácil a los espacios estrechos",
        bodyEs:
          "La boquilla delgada entra entre los asientos, alrededor de la palanca y dentro de la consola para recoger la suciedad que otras aspiradoras dejan. Resultados visibles en minutos, sin desarmar nada.",
      },
      {
        titleEs: "Libertad inalámbrica en cualquier lugar",
        bodyEs:
          "Cárgala una vez y úsala en el auto, en casa o en la oficina. Agarre firme y encendido con un solo botón — como tener una herramienta profesional ligera en la mano.",
      },
      {
        titleEs: "Mira el resultado mientras limpias",
        bodyEs:
          "El depósito transparente muestra la suciedad mientras aspiras, así sabes cuándo vaciarlo. Perfecta para familias, conductores y quien quiera un interior impecable.",
      },
    ],
    faq: [
      {
        questionEs: "¿Alcanza para limpiar todo el auto?",
        answerEs:
          "Sí, para la limpieza diaria, migajas y rincones estrechos. Déjala en el auto como tu herramienta de limpieza rápida.",
      },
      {
        questionEs: "¿Funciona sin conectarla al auto?",
        answerEs:
          "Sí, funciona con batería recargable y no necesita el encendedor del auto mientras la usas.",
      },
    ],
  },

  "prod-baby-washer": {
    nameEs: "Lavadora Portátil para Ropa de Bebé",
    descriptionEs: `
<h3>Ropa de bebé limpia con solo apretar un botón</h3>
<p>La ropa de bebé necesita lavados frecuentes y cuidado especial. Esta lavadora portátil te da una <strong>solución higiénica y rápida</strong> sin esperar la lavadora grande — y ocupa muy poco espacio.</p>
<ul>
<li>Ciclos rápidos para cargas pequeñas y delicadas</li>
<li>Diseño transparente y elegante para la mesa</li>
<li>Separa la ropa del bebé del resto del lavado</li>
<li>Ideal para departamentos, viajes y estancias cortas</li>
</ul>
${COD_ES}`.trim(),
    detailsEs: [
      "Tamaño compacto que cabe en cualquier espacio",
      "Panel digital con temporizador",
      "Ciclo suave para prendas delicadas",
      "Ideal para mamás, papás y viajes",
      "Ahorra agua frente a una lavadora grande",
    ],
    headlineEs: "El lavado diario del bebé, sin complicaciones",
    introEs:
      "En vez de encender la lavadora grande por dos prendas, ten una lavadora pequeña lista para mamelucos, calcetines y ropa delicada. Rápida, higiénica y cómoda para papás ocupados.",
    benefitsEs: [
      "Ahorra agua y electricidad",
      "Ideal para casas pequeñas y departamentos",
      "Fácil de llevar de viaje",
      "Suave con telas delicadas",
      "Envío gratis y devoluciones en 30 días",
    ],
    sections: [
      {
        titleEs: "Ciclos rápidos que se ajustan a tu día",
        bodyEs:
          "El panel digital te deja elegir el tiempo, incluso ciclos cortos de 15 minutos para cargas pequeñas — limpieza práctica en los días ocupados.",
      },
      {
        titleEs: "Diseño transparente y elegante",
        bodyEs:
          "El tambor transparente te deja ver el lavado, y la base elegante queda bien en el cuarto del bebé, la cocina o de viaje.",
      },
      {
        titleEs: "Separar la ropa del bebé da tranquilidad",
        bodyEs:
          "Lavar por separado cuida mejor la piel sensible, y usar la lavadora pequeña a diario evita gastar agua y luz en la grande.",
      },
    ],
    faq: [
      {
        questionEs: "¿Lava cargas grandes?",
        answerEs:
          "Está hecha para cargas pequeñas y medianas como ropa de bebé y prendas del día. No reemplaza por completo a una lavadora grande.",
      },
      {
        questionEs: "¿Necesita instalación especial?",
        answerEs:
          "No. Es un aparato de mesa listo para usar después de conectarlo a la corriente y llenar el agua según las instrucciones.",
      },
    ],
  },

  "prod-smart-sunglasses": {
    nameEs: "Lentes de Sol Inteligentes con Audio",
    descriptionEs: `
<h3>Estilo con sol y audio claro, sin audífonos</h3>
<p>Necesitas proteger tus ojos del sol y, al mismo tiempo, contestar llamadas o escuchar música <strong>sin audífonos a la vista</strong>. Estos lentes inteligentes hacen las dos cosas en un armazón ligero y moderno para todo el día.</p>
<ul>
<li>Protección UV para conducir, caminar y estar al aire libre</li>
<li>Llamadas manos libres con voz clara</li>
<li>Batería de larga duración para el uso diario</li>
<li>Diseño elegante para hombres y mujeres</li>
</ul>
${COD_ES}`.trim(),
    detailsEs: [
      "Protección solar UV",
      "Llamadas con voz clara sin audífonos",
      "Batería de larga duración",
      "Armazón ligero y cómodo todo el día",
      "Emparejamiento sencillo con el celular",
    ],
    headlineEs: "Protección solar y llamadas en un solo look",
    introEs:
      "Ya no tienes que elegir entre estilo y practicidad. Unos lentes inteligentes que protegen tus ojos del sol y te dejan contestar llamadas cómodamente, sin sacar el celular cada vez.",
    benefitsEs: [
      "Protección UV para climas soleados",
      "Llamadas sin audífonos a la vista",
      "Batería de larga duración",
      "Diseño elegante para todos",
      "Pago contra entrega y envío gratis",
    ],
    sections: [
      {
        titleEs: "Protección contra los rayos del sol",
        bodyEs:
          "Lentes oscuros y elegantes que protegen tus ojos al conducir, caminar o estar al aire libre, con un look premium para tu día a día.",
      },
      {
        titleEs: "Llamadas más claras, sin audífonos visibles",
        bodyEs:
          "Habla en manos libres mientras te mueves. Ideales para llamadas rápidas y juntas breves en el camino.",
      },
      {
        titleEs: "Ligeros y cómodos de la mañana a la noche",
        bodyEs:
          "Un armazón equilibrado y una batería duradera te mantienen cómodo todo el día, sin peso ni molestias detrás de la oreja.",
      },
    ],
    faq: [
      {
        questionEs: "¿Se conectan al celular por Bluetooth?",
        answerEs:
          "Sí, se emparejan con tu teléfono para llamadas y audio según las especificaciones del producto.",
      },
      {
        questionEs: "¿Sirven para conducir?",
        answerEs:
          "Sí, como lentes de sol, y además puedes contestar llamadas de forma más segura sin buscar el celular.",
      },
    ],
  },

  "prod-wireless-clock": {
    nameEs: "Reloj Despertador con Cargador Inalámbrico 15W",
    descriptionEs: `
<h3>3 en 1 en tu mesa de noche</h3>
<p>Carga inalámbrica rápida de hasta <strong>15 W</strong> + despertador digital + temperatura. Coloca tu celular encima y empieza a cargar al instante, sin cables desordenando la mesa.</p>
<ul>
<li>Carga rápida y segura para celulares compatibles</li>
<li>Pantalla LED tipo espejo, clara de día y de noche</li>
<li>Menos desorden de cables en la recámara o la oficina</li>
<li>Entrada Type-C y amplia compatibilidad Qi</li>
</ul>
${COD_ES}`.trim(),
    detailsEs: [
      "Carga inalámbrica rápida de hasta 15 W",
      "Despertador digital y temperatura",
      "Protección inteligente del equipo",
      "Amplia compatibilidad con celulares Qi",
      "Entrada de corriente Type-C",
    ],
    headlineEs: "Carga, duerme y despierta con un solo aparato",
    introEs:
      "En tu mesa de noche o escritorio: coloca el celular encima y empieza a cargar al instante sin cables, con un despertador claro y la temperatura del cuarto de un vistazo. Un aparato elegante que reduce el desorden y mejora tu rutina.",
    benefitsEs: [
      "3 en 1: cargador, despertador y temperatura",
      "Menos cables en la mesa",
      "Ideal para la recámara o la oficina",
      "Carga rápida de hasta 15 W",
      "Envío gratis y pago contra entrega",
    ],
    sections: [
      {
        titleEs: "Carga sin cables y rápido",
        bodyEs:
          "La carga inalámbrica de hasta 15 W reduce el desorden. Solo pon encima un celular compatible y déjalo cargar mientras duermes o trabajas.",
      },
      {
        titleEs: "Protección inteligente y amplia compatibilidad",
        bodyEs:
          "La protección ayuda a una carga más segura, con amplia compatibilidad para celulares Qi y entrada de corriente Type-C.",
      },
      {
        titleEs: "Hora y temperatura de un vistazo",
        bodyEs:
          "La pantalla LED tipo espejo muestra la hora y la temperatura con claridad, sin iluminar todo el cuarto.",
      },
    ],
    faq: [
      {
        questionEs: "¿Funciona con iPhone y Android?",
        answerEs:
          "Funciona con la mayoría de celulares compatibles con Qi. Confirma que tu teléfono acepte carga inalámbrica.",
      },
      {
        questionEs: "¿Qué incluye la caja?",
        answerEs:
          "El aparato, un cable Type-C y la hoja de especificaciones — listo para usar.",
      },
    ],
  },

  "prod-neck-massager": {
    nameEs: "Masajeador de Cuello y Hombros",
    descriptionEs: `
<h3>Alivia la tensión muscular profunda</h3>
<p>Después de un día largo sentado o conduciendo, tu cuello y tus hombros merecen un alivio real. Este masajeador te da un <strong>masaje profundo en minutos</strong>, sin cita en el spa y sin salir de casa.</p>
<ul>
<li>Presión parecida a unas manos sobre los puntos de tensión</li>
<li>Correas ajustables para un ajuste cómodo</li>
<li>Ligero y portátil para casa u oficina</li>
<li>Uso diario sencillo para hombres y mujeres</li>
</ul>
${COD_ES}`.trim(),
    detailsEs: [
      "Masaje profundo para cuello y hombros",
      "Correas cómodas y ajustables",
      "Ligero y fácil de usar",
      "Ideal para el uso diario",
      "Alivio rápido después de estar sentado mucho tiempo",
    ],
    headlineEs: "Un spa en casa para tu cuello y hombros",
    introEs:
      "La tensión que acumulas frente a la pantalla y al volante no tiene que esperar. Ajusta el masajeador con sus correas cómodas y siente un masaje profundo que suelta los nudos en minutos.",
    benefitsEs: [
      "Alivia la tensión rápido",
      "Fácil de usar en casa",
      "Ligero y portátil",
      "Sin cita en el spa",
      "Envío gratis y pago contra entrega",
    ],
    sections: [
      {
        titleEs: "Alivio para el cuello y los hombros",
        bodyEs:
          "Un diseño parecido a unas manos presiona los puntos de tensión con suavidad y eficacia, con correas que mantienen el aparato firme mientras lo usas.",
      },
      {
        titleEs: "Úsalo en casa o en el trabajo",
        bodyEs:
          "Ligero y portátil — llévalo después de un día pesado o en una pausa corta. Alivio inmediato, sin citas.",
      },
      {
        titleEs: "Se adapta a todos",
        bodyEs:
          "Las correas ajustables se adaptan a la mayoría de adultos para una experiencia cómoda todos los días.",
      },
    ],
    faq: [
      {
        questionEs: "¿Sirve para hombres y mujeres?",
        answerEs:
          "Sí, es unisex y las correas se ajustan según tu medida.",
      },
      {
        questionEs: "¿Cuánto debe durar cada sesión?",
        answerEs:
          "Empieza con 10 a 15 minutos al día según cómo te sientas, y detente si notas alguna molestia.",
      },
    ],
  },

  "prod-air-bed": {
    nameEs: "Cama Inflable",
    descriptionEs: `
<h3>Comodidad de hotel en minutos</h3>
<p>¿Visita inesperada? ¿Campamento en casa? ¿Un lugar extra para dormir? Esta cama inflable te da una <strong>superficie elevada y cómoda</strong> con bomba integrada: ínflala rápido y guárdala cuando no la uses.</p>
<ul>
<li>Bomba integrada para inflar y desinflar</li>
<li>Altura cómoda, parecida a una cama real</li>
<li>Ideal para visitas y uso temporal</li>
<li>Ligera y fácil de guardar desinflada</li>
</ul>
${COD_ES}`.trim(),
    detailsEs: [
      "Bomba de aire integrada",
      "Superficie elevada y cómoda",
      "Ideal para visitas o campamento en casa",
      "Fácil de guardar desinflada",
      "Se infla rápido con un botón",
    ],
    headlineEs: "Lista para tus visitas, sin comprar una cama fija",
    introEs:
      "Una forma práctica de dormir bien sin gastar en una cama permanente. Ínflala en minutos con la bomba integrada, disfruta la altura cómoda y luego gana espacio al desinflarla y guardarla.",
    benefitsEs: [
      "Se infla rápido con bomba integrada",
      "Cómoda para las visitas",
      "Ligera y fácil de guardar",
      "Altura parecida a una cama real",
      "Envío gratis y pago contra entrega",
    ],
    sections: [
      {
        titleEs: "Bomba integrada y más comodidad",
        bodyEs:
          "El panel de control hace fácil inflar y desinflar, con una altura cómoda y una superficie adecuada para visitas o uso temporal.",
      },
      {
        titleEs: "Ahorra espacio y dinero",
        bodyEs:
          "En lugar de un cuarto de huéspedes completo, una sola cama que se infla cuando hace falta y se guarda al terminar — perfecta para departamentos y casas chicas.",
      },
      {
        titleEs: "Lista para visitas en un momento",
        bodyEs:
          "¿Llegó alguien de improviso? Prepara un lugar cómodo para dormir en minutos, mucho mejor que el piso o un sofá estrecho.",
      },
    ],
    faq: [
      {
        questionEs: "¿Cuánto tarda en inflarse?",
        answerEs:
          "Normalmente unos pocos minutos, según el tamaño y la firmeza que quieras.",
      },
      {
        questionEs: "¿Aguanta el uso diario?",
        answerEs:
          "Sirve para uso regular con visitas o para dormir temporalmente, cuidando de no perforarla y guardándola seca.",
      },
    ],
  },
};

/** Adds Spanish fields to a seed product when copy exists for its id. */
export function withSpanishCopy(product: Product): Product {
  const copy = SPANISH_COPY[product.id];
  if (!copy) return product;

  const landing = product.landing;
  return {
    ...product,
    nameEs: copy.nameEs,
    descriptionEs: copy.descriptionEs,
    detailsEs: copy.detailsEs,
    landing: landing
      ? {
          ...landing,
          headlineEs: copy.headlineEs,
          introEs: copy.introEs,
          benefitsEs: copy.benefitsEs,
          sections: landing.sections.map((section, i) => ({
            ...section,
            ...(copy.sections[i] ?? {}),
          })),
          faq: landing.faq.map((item, i) => ({
            ...item,
            ...(copy.faq[i] ?? {}),
          })),
        }
      : undefined,
  };
}
