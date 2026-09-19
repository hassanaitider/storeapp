import { mergePlaceOptions } from "./latam-neighborhoods";
import { withOtherPlace } from "./latam-other-place";

/** Dominican Republic — complete Provincia → Municipio list. */
export type DominicanGeoTree = Record<string, string[]>;

export const GEO_DO: DominicanGeoTree = {
  "Provincia Duarte": [
    "Municipio Arenoso",
    "Municipio Castillo",
    "Municipio Eugenio María de Hostos",
    "Municipio Las Guáranas",
    "Municipio Pimentel",
    "Municipio San Francisco de Macorís",
    "Municipio Villa Riva"
  ],
  "Provincia Hermanas Mirabal": [
    "Municipio Salcedo",
    "Municipio Tenares",
    "Municipio Villa Tapia"
  ],
  "Provincia María Trinidad Sánchez": [
    "Municipio Cabrera",
    "Municipio El Factor",
    "Municipio Nagua",
    "Municipio Río San Juan"
  ],
  "Provincia Samaná": [
    "Municipio Las Terrenas",
    "Municipio Samaná",
    "Municipio Sánchez"
  ],
  "Provincia Dajabón": [
    "Municipio Dajabón",
    "Municipio El Pino",
    "Municipio Loma de Cabrera",
    "Municipio Partido",
    "Municipio Restauración"
  ],
  "Provincia Monte Cristi": [
    "Municipio Castañuelas",
    "Municipio Guayubín",
    "Municipio Las Matas de Santa Cruz",
    "Municipio Monte Cristi",
    "Municipio Pepillo Salcedo",
    "Municipio Villa Vásquez"
  ],
  "Provincia Santiago Rodríguez": [
    "Municipio Monción",
    "Municipio San Ignacio de Sabaneta",
    "Municipio Villa Los Almácigos"
  ],
  "Provincia Valverde": [
    "Municipio Esperanza",
    "Municipio Laguna Salada",
    "Municipio Mao"
  ],
  "Provincia Espaillat": [
    "Municipio Cayetano Germosén",
    "Municipio Gaspar Hernández",
    "Municipio Jamao al Norte",
    "Municipio Moca"
  ],
  "Provincia Puerto Plata": [
    "Municipio Altamira",
    "Municipio Guananico",
    "Municipio Imbert",
    "Municipio Los Hidalgos",
    "Municipio Luperón",
    "Municipio Puerto Plata",
    "Municipio Sosúa",
    "Municipio Villa Isabela",
    "Municipio Villa Montellano"
  ],
  "Provincia Santiago": [
    "Municipio Bisonó",
    "Municipio Jánico",
    "Municipio Licey al Medio",
    "Municipio Puñal",
    "Municipio Sabana Iglesia",
    "Municipio San José de las Matas",
    "Municipio Santiago",
    "Municipio Tamboril",
    "Municipio Villa González"
  ],
  "Provincia La Vega": [
    "Municipio Constanza",
    "Municipio Jarabacoa",
    "Municipio Jima Abajo",
    "Municipio La Vega"
  ],
  "Provincia Monseñor Nouel": [
    "Municipio Bonao",
    "Municipio Maimón",
    "Municipio Piedra Blanca"
  ],
  "Provincia Sánchez Ramírez": [
    "Municipio Cevicos",
    "Municipio Cotuí",
    "Municipio Fantino",
    "Municipio La Mata"
  ],
  "Provincia Elías Piña": [
    "Municipio Bánica",
    "Municipio Comendador",
    "Municipio El Llano",
    "Municipio Hondo Valle",
    "Municipio Juan Santiago",
    "Municipio Pedro Santana"
  ],
  "Provincia San Juan": [
    "Municipio Bohechío",
    "Municipio El Cercado",
    "Municipio Juan de Herrera",
    "Municipio Las Matas de Farfán",
    "Municipio San Juan",
    "Municipio Vallejuelo"
  ],
  "Provincia Baoruco": [
    "Municipio Galván",
    "Municipio Los Ríos",
    "Municipio Neiba",
    "Municipio Tamayo",
    "Municipio Villa Jaragua"
  ],
  "Provincia Barahona": [
    "Municipio Barahona",
    "Municipio Cabral",
    "Municipio El Peñón",
    "Municipio Enriquillo",
    "Municipio Fundación",
    "Municipio Jaquimeyes",
    "Municipio La Ciénaga",
    "Municipio Las Salinas",
    "Municipio Paraíso",
    "Municipio Polo",
    "Municipio Vicente Noble"
  ],
  "Provincia Independencia": [
    "Municipio Cristóbal",
    "Municipio Duvergé",
    "Municipio Jimaní",
    "Municipio La Descubierta",
    "Municipio Mella",
    "Municipio Postrer Río"
  ],
  "Provincia Pedernales": [
    "Municipio Oviedo",
    "Municipio Pedernales"
  ],
  "Provincia Hato Mayor": [
    "Municipio El Valle",
    "Municipio Hato Mayor",
    "Municipio Sabana de la Mar"
  ],
  "Provincia Monte Plata": [
    "Municipio Bayaguana",
    "Municipio Monte Plata",
    "Municipio Peralvillo",
    "Municipio Sabana Grande de Boyá",
    "Municipio Yamasá"
  ],
  "Provincia San Pedro de Macorís": [
    "Municipio Consuelo",
    "Municipio Guayacanes",
    "Municipio Los Llanos",
    "Municipio Quisqueya",
    "Municipio Ramón Santana",
    "Municipio San Pedro de Macorís"
  ],
  "Distrito Nacional": [
    "Municipio Santo Domingo de Guzmán"
  ],
  "Provincia Santo Domingo": [
    "Municipio Boca Chica",
    "Municipio Los Alcarrizos",
    "Municipio Pedro Brand",
    "Municipio San Antonio de Guerra",
    "Municipio Santo Domingo Este",
    "Municipio Santo Domingo Norte",
    "Municipio Santo Domingo Oeste"
  ],
  "Provincia Azua": [
    "Municipio Azua",
    "Municipio Estebanía",
    "Municipio Guayabal",
    "Municipio Las Charcas",
    "Municipio Las Yayas de Viajama",
    "Municipio Padre Las Casas",
    "Municipio Peralta",
    "Municipio Pueblo Viejo",
    "Municipio Sabana Yegua",
    "Municipio Tábara Arriba"
  ],
  "Provincia Peravia": [
    "Municipio Baní",
    "Municipio Nizao"
  ],
  "Provincia San Cristóbal": [
    "Municipio Bajos de Haina",
    "Municipio Cambita Garabitos",
    "Municipio Los Cacaos",
    "Municipio Sabana Grande de Palenque",
    "Municipio San Cristóbal",
    "Municipio San Gregorio de Nigua",
    "Municipio Villa Altagracia",
    "Municipio Yaguate"
  ],
  "Provincia San José de Ocoa": [
    "Municipio Rancho Arriba",
    "Municipio Sabana Larga",
    "Municipio San José de Ocoa"
  ],
  "Provincia El Seibo": [
    "Municipio El Seibo",
    "Municipio Miches"
  ],
  "Provincia La Altagracia": [
    "Municipio Higüey",
    "Municipio San Rafael del Yuma"
  ],
  "Provincia La Romana": [
    "Municipio Guaymate",
    "Municipio La Romana",
    "Municipio Villa Hermosa"
  ]
};

function cleanDoLabel(name: string): string {
  return name.replace(/^Provincia\s+/i, "").replace(/^Municipio\s+/i, "").trim();
}

function normalizeDominicanGeo() {
  const next: DominicanGeoTree = {};
  for (const [rawKey, rawCities] of Object.entries(GEO_DO)) {
    const key = cleanDoLabel(rawKey);
    const cities = rawCities.map(cleanDoLabel);
    next[key] = [...new Set([...(next[key] ?? []), ...cities])];
  }
  const extras: Record<string, string[]> = {
    "La Altagracia": ["Verón-Punta Cana", "Punta Cana", "Bávaro"],
    "Puerto Plata": ["Cabarete"],
    Samaná: ["Las Galeras", "El Limón"],
    "Santo Domingo": ["La Victoria"],
    Espaillat: ["San Víctor"],
  };
  for (const [provincia, cities] of Object.entries(extras)) {
    next[provincia] = [...new Set([...(next[provincia] ?? []), ...cities])];
  }
  for (const key of Object.keys(GEO_DO)) delete GEO_DO[key];
  Object.assign(GEO_DO, next);
}

normalizeDominicanGeo();

export function usesDominicanCodCheckout(country: string): boolean {
  return country.toUpperCase() === "DO";
}

export function dominicanProvincias(): string[] {
  return Object.keys(GEO_DO).sort((a, b) => a.localeCompare(b, "es"));
}

export function dominicanCiudades(provincia: string): string[] {
  const list = [
    ...(GEO_DO[provincia] ?? GEO_DO[`Provincia ${provincia}`] ?? []),
  ].sort((a, b) => a.localeCompare(b, "es"));
  return withOtherPlace(list);
}

export function dominicanSectores(provincia: string, municipio: string): string[] {
  return mergePlaceOptions("DO", provincia, municipio, []);
}
