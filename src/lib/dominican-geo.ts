/** Dominican Republic — Provincia → Municipio/Ciudad[] for COD checkout */
export type DominicanGeoTree = Record<string, string[]>;

export const GEO_DO: DominicanGeoTree = {
  "Azua": [
    "Azua de Compostela",
    "Estebanía",
    "Guayabal",
    "Las Charcas",
    "Las Yayas de Viajama",
    "Padre Las Casas",
    "Peralta",
    "Pueblo Viejo",
    "Sabana Yegua",
    "Tábara Arriba"
  ],
  "Baoruco": [
    "Galván",
    "Los Ríos",
    "Neiba",
    "Tamayo",
    "Villa Jaragua"
  ],
  "Barahona": [
    "Cabral",
    "El Peñón",
    "Enriquillo",
    "Fundación",
    "Jaquimeyes",
    "La Ciénaga",
    "Las Salinas",
    "Paraíso",
    "Polo",
    "Santa Cruz de Barahona",
    "Vicente Noble"
  ],
  "Dajabón": [
    "Dajabón",
    "El Pino",
    "Loma de Cabrera",
    "Partido",
    "Restauración"
  ],
  "Distrito Nacional": [
    "Bella Vista",
    "Ensanche Naco",
    "Gazcue",
    "La Esperilla",
    "Los Prados",
    "Mirador Sur",
    "Naco",
    "Piantini",
    "Santo Domingo de Guzmán",
    "Zona Colonial"
  ],
  "Duarte": [
    "Arenoso",
    "Castillo",
    "Eugenio María de Hostos",
    "Las Guáranas",
    "Pimentel",
    "San Francisco de Macorís",
    "Villa Riva"
  ],
  "El Seibo": [
    "Miches",
    "Santa Cruz del Seibo"
  ],
  "Elías Piña": [
    "Bánica",
    "Comendador",
    "El Llano",
    "Hondo Valle",
    "Juan Santiago",
    "Pedro Santana"
  ],
  "Espaillat": [
    "Cayetano Germosén",
    "Gaspar Hernández",
    "Jamao al Norte",
    "Moca"
  ],
  "Hato Mayor": [
    "El Valle",
    "Hato Mayor del Rey",
    "Sabana de la Mar"
  ],
  "Hermanas Mirabal": [
    "Salcedo",
    "Tenares",
    "Villa Tapia"
  ],
  "Independencia": [
    "Cristóbal",
    "Duvergé",
    "Jimaní",
    "La Descubierta",
    "Mella",
    "Postrer Río"
  ],
  "La Altagracia": [
    "Bávaro",
    "Punta Cana",
    "Salvaleón de Higüey",
    "San Rafael del Yuma",
    "Verón"
  ],
  "La Romana": [
    "Guaymate",
    "La Romana",
    "Villa Hermosa"
  ],
  "La Vega": [
    "Concepción de La Vega",
    "Constanza",
    "Jarabacoa",
    "Jima Abajo"
  ],
  "María Trinidad Sánchez": [
    "Cabrera",
    "El Factor",
    "Nagua",
    "Río San Juan"
  ],
  "Monseñor Nouel": [
    "Bonao",
    "Maimón",
    "Piedra Blanca"
  ],
  "Monte Cristi": [
    "Castañuelas",
    "Guayubín",
    "Las Matas de Santa Cruz",
    "Pepillo Salcedo",
    "San Fernando de Monte Cristi",
    "Villa Vásquez"
  ],
  "Monte Plata": [
    "Bayaguana",
    "Monte Plata",
    "Peralvillo",
    "Sabana Grande de Boyá",
    "Yamasá"
  ],
  "Pedernales": [
    "Oviedo",
    "Pedernales"
  ],
  "Peravia": [
    "Baní",
    "Nizao"
  ],
  "Puerto Plata": [
    "Altamira",
    "Cabarete",
    "Guananico",
    "Imbert",
    "Los Hidalgos",
    "Luperón",
    "San Felipe de Puerto Plata",
    "Sosúa",
    "Villa Isabela",
    "Villa Montellano"
  ],
  "Samaná": [
    "Las Terrenas",
    "Sánchez",
    "Santa Bárbara de Samaná"
  ],
  "San Cristóbal": [
    "Bajos de Haina",
    "Cambita Garabitos",
    "Los Cacaos",
    "Sabana Grande de Palenque",
    "San Cristóbal",
    "San Gregorio de Nigua",
    "Villa Altagracia",
    "Yaguate"
  ],
  "San José de Ocoa": [
    "Rancho Arriba",
    "Sabana Larga",
    "San José de Ocoa"
  ],
  "San Juan": [
    "Bohechío",
    "El Cercado",
    "Juan de Herrera",
    "Las Matas de Farfán",
    "San Juan de la Maguana",
    "Vallejuelo"
  ],
  "San Pedro de Macorís": [
    "Consuelo",
    "Guayacanes",
    "Quisqueya",
    "Ramón Santana",
    "San Pedro de Macorís"
  ],
  "Sánchez Ramírez": [
    "Cevicos",
    "Cotuí",
    "Fantino",
    "La Mata"
  ],
  "Santiago": [
    "Bisonó",
    "Jánico",
    "Licey al Medio",
    "Puñal",
    "Sabana Iglesia",
    "San José de las Matas",
    "Santiago de los Caballeros",
    "Tamboril",
    "Villa Bisonó",
    "Villa González"
  ],
  "Santiago Rodríguez": [
    "Monción",
    "San Ignacio de Sabaneta",
    "Villa Los Almácigos"
  ],
  "Santo Domingo": [
    "Boca Chica",
    "Los Alcarrizos",
    "Pedro Brand",
    "San Antonio de Guerra",
    "San Luis",
    "Santo Domingo Este",
    "Santo Domingo Norte",
    "Santo Domingo Oeste"
  ],
  "Valverde": [
    "Esperanza",
    "Laguna Salada",
    "Mao"
  ]
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
