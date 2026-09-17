import snap from "../prompts/checkout-geo-snapshot.json";

function norm(s: string) {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const official: Record<string, string[]> = {
  MX: [
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
  ],
  AR: [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Ciudad Autónoma de Buenos Aires",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán",
  ],
  GT: [
    "Alta Verapaz",
    "Baja Verapaz",
    "Chimaltenango",
    "Chiquimula",
    "El Progreso",
    "Escuintla",
    "Guatemala",
    "Huehuetenango",
    "Izabal",
    "Jalapa",
    "Jutiapa",
    "Petén",
    "Quetzaltenango",
    "Quiché",
    "Retalhuleu",
    "Sacatepéquez",
    "San Marcos",
    "Santa Rosa",
    "Sololá",
    "Suchitepéquez",
    "Totonicapán",
    "Zacapa",
  ],
  CR: [
    "San José",
    "Alajuela",
    "Cartago",
    "Heredia",
    "Guanacaste",
    "Puntarenas",
    "Limón",
  ],
  HN: [
    "Atlántida",
    "Choluteca",
    "Colón",
    "Comayagua",
    "Copán",
    "Cortés",
    "El Paraíso",
    "Francisco Morazán",
    "Gracias a Dios",
    "Intibucá",
    "Islas de la Bahía",
    "La Paz",
    "Lempira",
    "Ocotepeque",
    "Olancho",
    "Santa Bárbara",
    "Valle",
    "Yoro",
  ],
  SV: [
    "Ahuachapán",
    "Cabañas",
    "Chalatenango",
    "Cuscatlán",
    "La Libertad",
    "La Paz",
    "La Unión",
    "Morazán",
    "San Miguel",
    "San Salvador",
    "San Vicente",
    "Santa Ana",
    "Sonsonate",
    "Usulután",
  ],
  NI: [
    "Boaco",
    "Carazo",
    "Chinandega",
    "Chontales",
    "Estelí",
    "Granada",
    "Jinotega",
    "León",
    "Madriz",
    "Managua",
    "Masaya",
    "Matagalpa",
    "Nueva Segovia",
    "Río San Juan",
    "Rivas",
    "Región Autónoma de la Costa Caribe Norte",
    "Región Autónoma de la Costa Caribe Sur",
  ],
  DO: [
    "Distrito Nacional",
    "Azua",
    "Baoruco",
    "Barahona",
    "Dajabón",
    "Duarte",
    "El Seibo",
    "Elías Piña",
    "Espaillat",
    "Hato Mayor",
    "Hermanas Mirabal",
    "Independencia",
    "La Altagracia",
    "La Romana",
    "La Vega",
    "María Trinidad Sánchez",
    "Monseñor Nouel",
    "Monte Cristi",
    "Monte Plata",
    "Pedernales",
    "Peravia",
    "Puerto Plata",
    "Samaná",
    "San Cristóbal",
    "San José de Ocoa",
    "San Juan",
    "San Pedro de Macorís",
    "Sánchez Ramírez",
    "Santiago",
    "Santiago Rodríguez",
    "Santo Domingo",
    "Valverde",
  ],
  EC: [
    "Azuay",
    "Bolívar",
    "Cañar",
    "Carchi",
    "Chimborazo",
    "Cotopaxi",
    "El Oro",
    "Esmeraldas",
    "Galápagos",
    "Guayas",
    "Imbabura",
    "Loja",
    "Los Ríos",
    "Manabí",
    "Morona Santiago",
    "Napo",
    "Orellana",
    "Pastaza",
    "Pichincha",
    "Santa Elena",
    "Santo Domingo de los Tsáchilas",
    "Sucumbíos",
    "Tungurahua",
    "Zamora Chinchipe",
  ],
};

function match(officialList: string[], checkoutList: string[]) {
  const missing: string[] = [];
  for (const o of officialList) {
    const on = norm(o);
    const hit = checkoutList.some((x) => {
      const xn = norm(x);
      return xn === on || xn.includes(on) || on.includes(xn);
    });
    if (!hit) missing.push(o);
  }
  const extra: string[] = [];
  for (const x of checkoutList) {
    const xn = norm(x);
    const hit = officialList.some((o) => {
      const on = norm(o);
      return xn === on || xn.includes(on) || on.includes(xn);
    });
    if (!hit) extra.push(x);
  }
  return { missing, extra };
}

for (const code of Object.keys(official)) {
  const m = (snap as { markets: Record<string, { level1: string[]; counts: { stubCentroOnly: number; level2: number } }> }).markets[code];
  const { missing, extra } = match(official[code], m.level1);
  console.log(
    `${code}: L1 checkout=${m.level1.length} official=${official[code].length} L2=${m.counts.level2} stubCentro=${m.counts.stubCentroOnly}`
  );
  console.log(`  missing: ${missing.length ? missing.join("; ") : "—"}`);
  console.log(`  extra: ${extra.length ? extra.join("; ") : "—"}`);
}
