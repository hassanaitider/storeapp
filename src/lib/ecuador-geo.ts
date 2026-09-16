/** Ecuador — Provincia → Ciudad[] for COD checkout */
export type EcuadorGeoTree = Record<string, string[]>;

export const GEO_EC: EcuadorGeoTree = {
  Pichincha: ["Quito", "Cayambe", "Rumiñahui", "Mejía", "Pedro Moncayo"],
  Guayas: ["Guayaquil", "Durán", "Samborondón", "Daule", "Milagro", "Playas"],
  Azuay: ["Cuenca", "Gualaceo", "Paute", "Sigsig"],
  Manabí: ["Portoviejo", "Manta", "Chone", "Bahía de Caráquez", "Jipijapa"],
  Tungurahua: ["Ambato", "Baños", "Pelileo", "Píllaro"],
  "El Oro": ["Machala", "Pasaje", "Santa Rosa", "Huaquillas"],
  Loja: ["Loja", "Catamayo", "Macará", "Vilcabamba"],
  Imbabura: ["Ibarra", "Otavalo", "Cotacachi", "Atuntaqui"],
  Chimborazo: ["Riobamba", "Alausí", "Guano"],
  Cotopaxi: ["Latacunga", "Salcedo", "Pujilí"],
  "Los Ríos": ["Babahoyo", "Quevedo", "Ventanas", "Vinces"],
  Esmeraldas: ["Esmeraldas", "Atacames", "Quinindé", "Muisne"],
  "Santa Elena": ["Santa Elena", "La Libertad", "Salinas"],
  "Santo Domingo de los Tsáchilas": ["Santo Domingo", "La Concordia"],
  Sucumbíos: ["Nueva Loja", "Shushufindi"],
  Orellana: ["Francisco de Orellana", "La Joya de los Sachas"],
  Napo: ["Tena", "Archidona", "El Chaco"],
  Pastaza: ["Puyo", "Mera"],
  "Morona Santiago": ["Macas", "Gualaquiza", "Sucúa"],
  "Zamora Chinchipe": ["Zamora", "Yantzaza"],
  Bolívar: ["Guaranda", "San Miguel", "Chillanes"],
  Cañar: ["Azogues", "Cañar", "La Troncal"],
  Carchi: ["Tulcán", "San Gabriel", "El Ángel"],
  Galápagos: ["Puerto Ayora", "Puerto Baquerizo Moreno", "Puerto Villamil"],
};

export function usesEcuadorCodCheckout(country: string): boolean {
  return country.toUpperCase() === "EC";
}

export function ecuadorProvincias(): string[] {
  return Object.keys(GEO_EC).sort((a, b) => a.localeCompare(b, "es"));
}

export function ecuadorCiudades(provincia: string): string[] {
  return GEO_EC[provincia] ?? [];
}
