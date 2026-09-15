/** Dominican Republic — Provincia → Ciudad/Municipio[] for COD checkout */
export type DominicanGeoTree = Record<string, string[]>;

export const GEO_DO: DominicanGeoTree = {
  "Distrito Nacional": [
    "Santo Domingo de Guzmán",
    "Gazcue",
    "Naco",
    "Piantini",
    "Zona Colonial",
  ],
  "Santo Domingo": [
    "Santo Domingo Este",
    "Santo Domingo Norte",
    "Santo Domingo Oeste",
    "Los Alcarrizos",
    "Boca Chica",
    "Pedro Brand",
  ],
  Santiago: [
    "Santiago de los Caballeros",
    "Villa González",
    "Licey al Medio",
    "Tamboril",
  ],
  "La Vega": ["Concepción de La Vega", "Constanza", "Jarabacoa"],
  "Puerto Plata": [
    "San Felipe de Puerto Plata",
    "Sosúa",
    "Cabarete",
    "Imbert",
  ],
  "San Cristóbal": ["San Cristóbal", "Bajos de Haina", "Villa Altagracia"],
  "La Altagracia": ["Higüey", "Punta Cana", "Bávaro", "Verón"],
  Duarte: ["San Francisco de Macorís", "Pimentel", "Castillo"],
  Espaillat: ["Moca", "Gaspar Hernández", "Jamao al Norte"],
  "San Pedro de Macorís": ["San Pedro de Macorís", "Consuelo", "Quisqueya"],
  "La Romana": ["La Romana", "Guaymate", "Villa Hermosa"],
  Barahona: ["Santa Cruz de Barahona", "Cabral", "Enriquillo"],
  Azua: ["Azua de Compostela", "Padre Las Casas", "Peralta"],
  "San Juan": ["San Juan de la Maguana", "Las Matas de Farfán", "El Cercado"],
  Valverde: ["Mao", "Esperanza", "Laguna Salada"],
  "María Trinidad Sánchez": ["Nagua", "Cabrera", "Río San Juan"],
  "Monte Plata": ["Monte Plata", "Bayaguana", "Yamasá"],
  Peravia: ["Baní", "Nizao"],
  "Hermanas Mirabal": ["Salcedo", "Tenares", "Villa Tapia"],
  "Sánchez Ramírez": ["Cotuí", "Cevicos", "Fantino"],
  "Monseñor Nouel": ["Bonao", "Maimón", "Piedra Blanca"],
  "El Seibo": ["Santa Cruz del Seibo", "Miches"],
  "Hato Mayor": ["Hato Mayor del Rey", "Sabana de la Mar"],
  Samaná: ["Santa Bárbara de Samaná", "Las Terrenas", "Sánchez"],
  "Monte Cristi": ["San Fernando de Monte Cristi", "Pepillo Salcedo"],
  Dajabón: ["Dajabón", "Loma de Cabrera"],
  "Elías Piña": ["Comendador", "Banica"],
  Independencia: ["Jimaní", "Duvergé"],
  Pedernales: ["Pedernales", "Oviedo"],
  Baoruco: ["Neiba", "Galván"],
  "Santiago Rodríguez": ["San Ignacio de Sabaneta", "Villa Los Almácigos"],
};

export function usesDominicanCodCheckout(country: string): boolean {
  return country.toUpperCase() === "DO";
}

export function dominicanProvincias(): string[] {
  return Object.keys(GEO_DO).sort((a, b) => a.localeCompare(b, "es"));
}

export function dominicanCiudades(provincia: string): string[] {
  return GEO_DO[provincia] ?? [];
}
