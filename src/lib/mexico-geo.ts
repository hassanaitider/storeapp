/** Mexico — Estado → Delegación/Municipio → Colonia[] for COD checkout */
export type MexicoGeoTree = Record<string, Record<string, string[]>>;

export const GEO_MX: MexicoGeoTree = {
  "Ciudad de México": {
    "Álvaro Obregón": ["San Ángel", "Florida", "Olivar de los Padres", "Santa Fe"],
    "Benito Juárez": ["Del Valle", "Narvarte", "Nápoles", "Portales"],
    Coyoacán: ["Del Carmen", "Pedregal de Santo Domingo", "Copilco", "Ajusco"],
    Cuauhtémoc: ["Centro", "Roma Norte", "Condesa", "Juárez", "Doctores"],
    "Gustavo A. Madero": [
      "Lindavista",
      "Aragón",
      "Cuautepec",
      "Villa de Aragón",
    ],
    Iztapalapa: [
      "Centro Iztapalapa",
      "Santa Cruz Meyehualco",
      "San Miguel Teotongo",
    ],
    "Miguel Hidalgo": ["Polanco", "Anzures", "Tacuba", "Lomas de Chapultepec"],
    Tlalpan: ["Centro de Tlalpan", "Pedregal de San Ángel", "Coapa"],
  },
  "Estado de México": {
    Ecatepec: [
      "San Cristóbal",
      "Las Américas",
      "Ciudad Azteca",
      "Jardines de Morelos",
    ],
    Nezahualcóyotl: ["Metropolitana", "Benito Juárez", "Estado de México"],
    Toluca: ["Centro", "Universidad", "San Mateo Otzacatipan"],
    Naucalpan: ["Satélite", "Las Águilas", "San Bartolo"],
    Tlalnepantla: ["Centro", "San Javier", "Vallejo"],
  },
  Jalisco: {
    Guadalajara: ["Centro", "Providencia", "Chapultepec", "Americana"],
    Zapopan: ["Centro Zapopan", "Ciudad Granja", "Valle Real", "Puerta de Hierro"],
    Tlaquepaque: ["Centro", "San Pedro", "El Refugio"],
    Tonalá: ["Centro", "Loma Dorada"],
  },
  "Nuevo León": {
    Monterrey: ["Centro", "San Jerónimo", "Cumbres", "Obispado"],
    "San Pedro Garza García": ["Valle Oriente", "Del Valle", "Fuente de Diana"],
    Guadalupe: ["Centro", "Las Quintas"],
    Apodaca: ["Centro", "Huinalá"],
  },
  Puebla: {
    "Puebla Capital": ["Centro Histórico", "La Paz", "Angelópolis", "San Manuel"],
    Cholula: ["San Andrés Cholula", "San Pedro Cholula"],
  },
  Guanajuato: {
    León: ["Centro", "Campestre", "Las Torres"],
    Irapuato: ["Centro", "Las Américas"],
    Celaya: ["Centro", "Las Palmas"],
  },
  Querétaro: {
    Querétaro: ["Centro Histórico", "Juriquilla", "El Refugio", "Milán"],
    "San Juan del Río": ["Centro", "La Estancita"],
  },
  Yucatán: {
    Mérida: ["Centro", "García Ginerés", "Altabrisa", "Montes de Amé"],
  },
  "Quintana Roo": {
    Cancún: ["Centro", "Zona Hotelera", "Sm 15", "Puerto Juárez"],
    "Playa del Carmen": ["Centro", "Playacar", "Ejidal"],
  },
  Veracruz: {
    Veracruz: ["Centro", "Boca del Río", "Costa Verde"],
    Xalapa: ["Centro", "Las Animas"],
  },
  Chihuahua: {
    Chihuahua: ["Centro", "San Felipe", "Nombre de Dios"],
    Juárez: ["Centro", "Pronaf", "Campestre"],
  },
  Sonora: {
    Hermosillo: ["Centro", "Pitic", "Sahuaro"],
    Cajeme: ["Centro Ciudad Obregón", "Villa ITSON"],
  },
  "Baja California": {
    Tijuana: ["Centro", "Zona Río", "Otay", "Playas de Tijuana"],
    Mexicali: ["Centro", "Nueva"],
  },
  Coahuila: {
    Saltillo: ["Centro", "Zona Universitaria"],
    Torreón: ["Centro", "Campestre La Rosita"],
  },
  Sinaloa: {
    Culiacán: ["Centro", "Tres Ríos", "Las Quintas"],
    Mazatlán: ["Centro", "Zona Dorada"],
  },
  Michoacán: {
    Morelia: ["Centro Histórico", "Las Américas", "La Colina"],
  },
  Guerrero: {
    Acapulco: ["Centro", "Diamante", "Costera"],
  },
  Oaxaca: {
    Oaxaca: ["Centro Histórico", "Reforma", "Xochimilco"],
  },
  Tabasco: {
    Villahermosa: ["Centro", "Gaviotas", "Atasta"],
  },
  Chiapas: {
    Tuxtla: ["Centro", "Terán", "San José"],
  },
  Hidalgo: {
    Pachuca: ["Centro", "Periodistas", "La Hacienda"],
  },
  Morelos: {
    Cuernavaca: ["Centro", "Las Palmas", "Vista Hermosa"],
  },
  Aguascalientes: {
    Aguascalientes: ["Centro", "Villasunción", "Ojocaliente"],
  },
  Durango: {
    Durango: ["Centro", "Guadalupe"],
  },
  "San Luis Potosí": {
    "San Luis Potosí": ["Centro", "Tangamanga", "Lomas"],
  },
  Tamaulipas: {
    Tampico: ["Centro", "Altavista"],
    Reynosa: ["Centro", "Las Fuentes"],
  },
  Nayarit: {
    Tepic: ["Centro", "Ciudad del Valle"],
  },
  Colima: {
    Colima: ["Centro", "El Diezmo"],
  },
  Campeche: {
    Campeche: ["Centro Histórico", "Santa Ana"],
  },
  Tlaxcala: {
    Tlaxcala: ["Centro", "Ocotlán"],
  },
  Zacatecas: {
    Zacatecas: ["Centro Histórico", "Lomas de la Soledad"],
  },
};

export function usesMexicoCodCheckout(country: string): boolean {
  return country.toUpperCase() === "MX";
}

export function mexicoEstados(): string[] {
  return Object.keys(GEO_MX).sort((a, b) => a.localeCompare(b, "es"));
}

export function mexicoMunicipios(estado: string): string[] {
  return Object.keys(GEO_MX[estado] ?? {}).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

export function mexicoColonias(estado: string, municipio: string): string[] {
  return GEO_MX[estado]?.[municipio] ?? [];
}
