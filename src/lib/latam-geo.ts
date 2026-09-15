import type { CountryCode } from "./types";

/** Cascading location tree: Departamento → Municipio → Poblado[] */
export type LatamGeoTree = Record<string, Record<string, string[]>>;

/**
 * Markets that use the shared Latam COD checkout (GT/CR).
 * MX, AR, and DO each have their own exclusive COD modules.
 */
export const LATAM_COD_CHECKOUT_MARKETS: CountryCode[] = ["GT", "CR"];

export function usesLatamCodCheckout(country: string): boolean {
  return LATAM_COD_CHECKOUT_MARKETS.includes(
    country.toUpperCase() as CountryCode
  );
}

/** Argentina uses its own COD module — never share with other markets. */
export function usesArgentinaCodCheckout(country: string): boolean {
  return country.toUpperCase() === "AR";
}

/** Guatemala — departamentos / municipios / poblados (núcleos principales). */
export const GEO_GT: LatamGeoTree = {
  "Guatemala": {
    "Guatemala": ["Zona 1", "Zona 7", "Zona 10", "Zona 11", "Zona 12", "Zona 18", "Mixco (límite)", "Villa Nueva (límite)"],
    "Mixco": ["El Milagro", "San Cristóbal", "Condado Naranjo", "Lo de Coy", "Centro Mixco"],
    "Villa Nueva": ["Centro Villa Nueva", "Bárcenas", "El Frutal", "Villa Hermosa"],
    "San José Pinula": ["Centro", "El Sauce", "Santa Catarina Pinula (cerca)"],
    "Chinautla": ["Centro", "Santa Cruz", "Jocotales"],
  },
  "Sacatepéquez": {
    "Antigua Guatemala": ["Centro Histórico", "San Felipe", "San Pedro Las Huertas", "San Juan del Obispo"],
    "Ciudad Vieja": ["Centro", "San Miguel Escobar"],
    "Jocotenango": ["Centro", "San Lorenzo El Tejar"],
    "San Lucas Sacatepéquez": ["Centro", "El Hato"],
  },
  "Chimaltenango": {
    "Chimaltenango": ["Centro", "El Tejar", "San José Poaquil (cerca)"],
    "Tecpán Guatemala": ["Centro", "Santa Apolonia"],
    "Patzún": ["Centro", "Xeatzán Bajo"],
  },
  "Escuintla": {
    "Escuintla": ["Centro", "El Cerrito", "La Democracia"],
    "Santa Lucía Cotzumalguapa": ["Centro", "Palo Verde"],
    "Palín": ["Centro", "El Rodeo"],
    "Puerto San José": ["Centro", "Iztapa"],
  },
  "Santa Rosa": {
    "Cuilapa": ["Centro", "El Barrial"],
    "Barberena": ["Centro", "El Cerinal"],
    "Chiquimulilla": ["Centro", "El Jobo"],
  },
  "Sololá": {
    "Sololá": ["Centro", "El Tablón"],
    "Panajachel": ["Centro", "Jucanyá"],
    "San Pedro La Laguna": ["Centro", "Tzanjuyú"],
  },
  "Quetzaltenango": {
    "Quetzaltenango": ["Zona 1", "Zona 3", "Las Majadas", "La Esperanza"],
    "Coatepeque": ["Centro", "El Palmar"],
    "Cantel": ["Centro", "Pasojoc"],
  },
  "Suchitepéquez": {
    "Mazatenango": ["Centro", "San José El Ídolo"],
    "Cuyotenango": ["Centro", "San Lorenzo"],
  },
  "Retalhuleu": {
    "Retalhuleu": ["Centro", "San Sebastián"],
    "Champerico": ["Centro", "El Semillero"],
  },
  "San Marcos": {
    "San Marcos": ["Centro", "San Pedro Sacatepéquez"],
    "Malacatán": ["Centro", "El Quetzal"],
    "Tecún Umán": ["Centro", "El Carmen"],
  },
  "Huehuetenango": {
    "Huehuetenango": ["Centro", "La Democracia"],
    "Chiantla": ["Centro", "Paquix"],
  },
  "Quiché": {
    "Santa Cruz del Quiché": ["Centro", "San Antonio Ilotenango"],
    "Chichicastenango": ["Centro", "Chugüexá"],
  },
  "Baja Verapaz": {
    "Salamá": ["Centro", "San Jerónimo"],
    "Rabinal": ["Centro", "Xococ"],
  },
  "Alta Verapaz": {
    "Cobán": ["Centro", "San Juan Chamelco", "San Pedro Carchá"],
    "San Pedro Carchá": ["Centro", "Chamelco"],
  },
  "Petén": {
    "Flores": ["Centro Isla", "Santa Elena", "San Benito"],
    "San Benito": ["Centro", "El Remate"],
    "Santa Elena": ["Centro", "El Caoba"],
  },
  "Izabal": {
    "Puerto Barrios": ["Centro", "Santo Tomás de Castilla"],
    "Livingston": ["Centro", "Quehueche"],
    "Morales": ["Centro", "El Estor"],
  },
  "Zacapa": {
    "Zacapa": ["Centro", "Estanzuela"],
    "Gualán": ["Centro", "La Reforma"],
  },
  "Chiquimula": {
    "Chiquimula": ["Centro", "San José La Arada"],
    "Esquipulas": ["Centro", "Olopa"],
  },
  "Jalapa": {
    "Jalapa": ["Centro", "San Pedro Pinula"],
  },
  "Jutiapa": {
    "Jutiapa": ["Centro", "El Progreso"],
    "Asunción Mita": ["Centro", "Yupiltepeque"],
  },
  "El Progreso": {
    "Guastatoya": ["Centro", "Sanarate"],
    "Sanarate": ["Centro", "El Jícaro"],
  },
};

/**
 * Costa Rica — UI keeps Departamento / Municipio / Poblado labels;
 * data maps Provincia → Cantón → Distrito.
 */
export const GEO_CR: LatamGeoTree = {
  "San José": {
    "San José": ["Carmen", "Merced", "Hospital", "Catedral", "Zapote", "San Francisco de Dos Ríos", "Uruca", "Mata Redonda", "Pavas", "Hatillo", "San Sebastián"],
    "Escazú": ["Escazú", "San Antonio", "San Rafael"],
    "Desamparados": ["Desamparados", "San Miguel", "San Juan de Dios", "San Rafael Arriba", "San Antonio", "Frailes", "Patarrá", "San Cristóbal", "Rosario", "Damas", "San Rafael Abajo", "Gravilias", "Los Guido"],
    "Puriscal": ["Santiago", "Mercedes Sur", "Barbacoas", "Grifo Alto", "San Rafael", "Candelarita", "Desamparaditos", "San Antonio", "Chires"],
    "Santa Ana": ["Santa Ana", "Salitral", "Pozos", "Uruca", "Piedades", "Brasil"],
    "Alajuelita": ["Alajuelita", "San Josecito", "San Antonio", "Concepción", "San Felipe"],
    "Vázquez de Coronado": ["San Isidro", "San Rafael", "Dulce Nombre de Jesús", "Patalillo", "Cascajal"],
    "Goicoechea": ["Guadalupe", "San Francisco", "Calle Blancos", "Mata de Plátano", "Ipís", "Rancho Redondo", "Purral"],
    "Tibás": ["San Juan", "Cinco Esquinas", "Anselmo Llorente", "León XIII", "Colima"],
    "Moravia": ["San Vicente", "San Jerónimo", "La Trinidad"],
    "Montes de Oca": ["San Pedro", "Sabanilla", "Mercedes", "San Rafael"],
    "Curridabat": ["Curridabat", "Granadilla", "Sánchez", "Tirrases"],
  },
  "Alajuela": {
    "Alajuela": ["Alajuela", "San José", "Carrizal", "San Antonio", "Guácima", "San Isidro", "Sabanilla", "San Rafael", "Río Segundo", "Desamparados", "Turrúcares", "Tambor", "Garita", "Sarapiquí"],
    "San Ramón": ["San Ramón", "Santiago", "San Juan", "Piedades Norte", "Piedades Sur", "San Rafael", "San Isidro", "Ángeles", "Alfaro", "Volio", "Concepción", "Zapotal", "Peñas Blancas"],
    "Grecia": ["Grecia", "San Isidro", "San José", "San Roque", "Tacares", "Río Cuarto", "Puente de Piedra", "Bolívar"],
    "Atenas": ["Atenas", "Jesús", "Mercedes", "San Isidro", "Concepción", "San José", "Santa Eulalia", "Escobal"],
    "Naranjo": ["Naranjo", "San Miguel", "San José", "Cirrí Sur", "San Jerónimo", "San Juan", "El Rosario", "Palmitos"],
    "Palmares": ["Palmares", "Zaragoza", "Buenos Aires", "Santiago", "Candelaria", "Esquipulas", "La Granja"],
    "Poás": ["San Pedro", "San Juan", "San Rafael", "Carrillos", "Sabana Redonda"],
  },
  "Cartago": {
    "Cartago": ["Oriental", "Occidental", "Carmen", "San Nicolás", "Aguacaliente", "Guadalupe", "Corralillo", "Tierra Blanca", "Dulce Nombre", "Llano Grande", "Quebradilla"],
    "Paraíso": ["Paraíso", "Santiago", "Orosi", "Cachí", "Llanos de Santa Lucía"],
    "La Unión": ["Tres Ríos", "San Diego", "San Juan", "San Rafael", "Concepción", "Dulce Nombre", "San Ramón", "Río Azul"],
    "Oreamuno": ["San Rafael", "Cot", "Potrero Cerrado", "Cipreses", "Santa Rosa"],
    "El Guarco": ["El Tejar", "San Isidro", "Tobosi", "Patio de Agua"],
  },
  "Heredia": {
    "Heredia": ["Heredia", "Mercedes", "San Francisco", "Ulloa", "Varablanca"],
    "Barva": ["Barva", "San Pedro", "San Pablo", "San Roque", "Santa Lucía", "San José de la Montaña"],
    "Santo Domingo": ["Santo Domingo", "San Vicente", "San Miguel", "Paracito", "Santo Tomás", "Santa Rosa", "Tures", "Pará"],
    "Santa Bárbara": ["Santa Bárbara", "San Pedro", "San Juan", "Jesús", "Santo Domingo", "Purabá"],
    "San Rafael": ["San Rafael", "San Josecito", "Santiago", "Ángeles", "Concepción"],
    "San Isidro": ["San Isidro", "San José", "Concepción", "San Francisco"],
    "Belén": ["San Antonio", "La Ribera", "La Asunción"],
    "Flores": ["San Joaquín", "Barrantes", "Llorente"],
    "San Pablo": ["San Pablo", "Rincón de Sabanilla"],
  },
  "Guanacaste": {
    "Liberia": ["Liberia", "Cañas Dulces", "Mayorga", "Nacascolo", "Curubandé"],
    "Nicoya": ["Nicoya", "Mansión", "San Antonio", "Quebrada Honda", "Sámara", "Nosara", "Belén de Nosarita"],
    "Santa Cruz": ["Santa Cruz", "Bolsón", "Veintisiete de Abril", "Tempate", "Cartagena", "Cuajiniquil", "Diriá", "Cabo Velas", "Tamarindo"],
    "Bagaces": ["Bagaces", "La Fortuna", "Mogote", "Río Naranjo"],
    "Carrillo": ["Filadelfia", "Palmira", "Sardinal", "Belén"],
    "Cañas": ["Cañas", "Palmira", "San Miguel", "Bebedero", "Porozal"],
  },
  "Puntarenas": {
    "Puntarenas": ["Puntarenas", "Pitahaya", "Chomes", "Lepanto", "Paquera", "Manzanillo", "Guacimal", "Barranca", "Monte Verde", "Isla del Coco", "Cóbano", "Chacarita", "Chira", "Acapulco", "El Roble", "Arancibia"],
    "Esparza": ["Espíritu Santo", "San Juan Grande", "Macacona", "San Rafael", "San Jerónimo", "Caldera"],
    "Buenos Aires": ["Buenos Aires", "Volcán", "Potrero Grande", "Boruca", "Pilas", "Colinas", "Chánguena", "Biolley", "Brunka"],
    "Osa": ["Puerto Cortés", "Palmar", "Sierpe", "Bahía Ballena", "Piedras Blancas", "Bahía Drake"],
    "Quepos": ["Quepos", "Savegre", "Naranjito"],
    "Golfito": ["Golfito", "Puerto Jiménez", "Guaycará", "Pavón"],
  },
  "Limón": {
    "Limón": ["Limón", "Valle La Estrella", "Río Blanco", "Matama"],
    "Pococí": ["Guápiles", "Jiménez", "Rita", "Roxana", "Cariari", "Colorado", "La Colonia"],
    "Siquirres": ["Siquirres", "Pacuarito", "Florida", "Germania", "Cairo", "Alegría"],
    "Talamanca": ["Bratsi", "Sixaola", "Cahuita", "Telire"],
    "Matina": ["Matina", "Batán", "Carrandi"],
    "Guácimo": ["Guácimo", "Mercedes", "Pocora", "Río Jiménez", "Duacarí"],
  },
};

export function geoTreeForCountry(country: CountryCode): LatamGeoTree | null {
  if (country === "GT") return GEO_GT;
  if (country === "CR") return GEO_CR;
  return null;
}

export function codFormLabel(country: CountryCode): string {
  if (country === "GT") return "COD FORM GUATEMALA";
  if (country === "CR") return "COD FORM COSTA RICA";
  if (country === "AR") return "COD FORM ARGENTINA";
  return "COD FORM";
}
