/** Argentina — Provincia → Localidad[] for COD checkout */
export type ArgentinaGeoTree = Record<string, string[]>;

export const GEO_AR: ArgentinaGeoTree = {
  "Buenos Aires": [
    "La Plata",
    "Mar del Plata",
    "Bahía Blanca",
    "Tigre",
    "San Isidro",
    "Quilmes",
    "Lomas de Zamora",
    "Lanús",
    "Morón",
    "Pilar",
  ],
  CABA: [
    "Palermo",
    "Recoleta",
    "Belgrano",
    "Caballito",
    "Flores",
    "Villa Urquiza",
    "Almagro",
    "San Telmo",
    "Puerto Madero",
    "Núñez",
  ],
  "Córdoba": ["Córdoba Capital", "Villa Carlos Paz", "Río Cuarto", "Villa María"],
  "Santa Fe": ["Rosario", "Santa Fe Capital", "Rafaela", "Venado Tuerto"],
  Mendoza: ["Mendoza Capital", "Godoy Cruz", "Maipú", "San Rafael", "Luján de Cuyo"],
  "Tucumán": ["San Miguel de Tucumán", "Yerba Buena", "Tafí Viejo"],
  Salta: ["Salta Capital", "San Lorenzo", "Orán"],
  "Entre Ríos": ["Paraná", "Concordia", "Gualeguaychú"],
  Misiones: ["Posadas", "Oberá", "Eldorado"],
  Corrientes: ["Corrientes Capital", "Goya", "Paso de los Libres"],
  Chaco: ["Resistencia", "Presidencia Roque Sáenz Peña"],
  Formosa: ["Formosa Capital", "Clorinda"],
  Jujuy: ["San Salvador de Jujuy", "Palpalá"],
  "Santiago del Estero": [
    "Santiago del Estero",
    "La Banda",
    "Termas de Río Hondo",
  ],
  Catamarca: ["San Fernando del Valle de Catamarca"],
  "La Rioja": ["La Rioja Capital", "Chilecito"],
  "San Juan": ["San Juan Capital", "Rawson", "Rivadavia"],
  "San Luis": ["San Luis Capital", "Villa Mercedes"],
  "Neuquén": ["Neuquén Capital", "Cutral Có", "Plottier"],
  "Río Negro": ["Bariloche", "Viedma", "Cipolletti", "General Roca"],
  Chubut: ["Comodoro Rivadavia", "Trelew", "Puerto Madryn"],
  "Santa Cruz": ["Río Gallegos", "Caleta Olivia", "El Calafate"],
  "Tierra del Fuego": ["Ushuaia", "Río Grande"],
  "La Pampa": ["Santa Rosa", "General Pico"],
};

export function argentinaProvincias(): string[] {
  return Object.keys(GEO_AR);
}

export function argentinaLocalidades(provincia: string): string[] {
  return GEO_AR[provincia] ?? [];
}
