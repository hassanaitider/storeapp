/** Browser-side Mexico geo: estados are inline, municipios/colonias load per estado from /api/geo/mx. */
export type MexicoEstadoTree = Record<string, string[]>;

export const MEXICO_ESTADOS: string[] = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila de Zaragoza",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "México",
  "Michoacán de Ocampo",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz de Ignacio de la Llave",
  "Yucatán",
  "Zacatecas",
];

const cache = new Map<string, Promise<MexicoEstadoTree>>();

export function loadMexicoEstado(estado: string): Promise<MexicoEstadoTree> {
  let pending = cache.get(estado);
  if (!pending) {
    pending = fetch(`/api/geo/mx?estado=${encodeURIComponent(estado)}`).then(
      (res) => {
        if (!res.ok) throw new Error(`geo ${res.status}`);
        return res.json() as Promise<MexicoEstadoTree>;
      }
    );
    pending.catch(() => cache.delete(estado));
    cache.set(estado, pending);
  }
  return pending;
}
