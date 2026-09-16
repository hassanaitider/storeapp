import type { CountryCode } from "./types";

/** Cascading location tree: Departamento → Municipio → Poblado[] */
export type LatamGeoTree = Record<string, Record<string, string[]>>;

/**
 * Markets that use the shared Latam COD checkout (GT/CR).
 * MX, AR, DO, and EC each have their own exclusive COD modules.
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

/** Guatemala — departamentos / municipios / poblados. */
export const GEO_GT: LatamGeoTree = {
  "Guatemala": {
    "Guatemala": [
      "Zona 1",
      "Zona 2",
      "Zona 3",
      "Zona 4",
      "Zona 5",
      "Zona 6",
      "Zona 7",
      "Zona 8",
      "Zona 9",
      "Zona 10",
      "Zona 11",
      "Zona 12",
      "Zona 13",
      "Zona 14",
      "Zona 15",
      "Zona 16",
      "Zona 17",
      "Zona 18",
      "Zona 19",
      "Zona 21",
      "Zona 24"
    ],
    "Mixco": [
      "El Milagro",
      "San Cristóbal",
      "Condado Naranjo",
      "Lo de Coy",
      "Centro Mixco",
      "Zone 1 Mixco",
      "Zone 4 Mixco",
      "Zone 8 Mixco",
      "El Naranjo"
    ],
    "Villa Nueva": [
      "Centro Villa Nueva",
      "Bárcenas",
      "El Frutal",
      "Villa Hermosa",
      "Santa Isabel",
      "Ciudad Real"
    ],
    "San José Pinula": [
      "Centro",
      "El Sauce",
      "Santa Catarina Pinula",
      "El Pino"
    ],
    "Chinautla": [
      "Centro",
      "Santa Cruz",
      "Jocotales",
      "San Antonio Las Trojes"
    ],
    "Santa Catarina Pinula": [
      "Centro",
      "El Pueblito",
      "Don Justo"
    ],
    "San Juan Sacatepéquez": [
      "Centro",
      "Cruz Blanca",
      "Sajcavillá"
    ],
    "San Pedro Ayampuc": [
      "Centro",
      "Lo de Reyes"
    ],
    "Amatitlán": [
      "Centro",
      "El Jobo",
      "Mesillas Altas"
    ],
    "Villa Canales": [
      "Centro",
      "Santa Elena Barillas",
      "Boca del Monte"
    ],
    "Palencia": [
      "Centro",
      "El Fiscal"
    ],
    "Fraijanes": [
      "Centro",
      "Lo de Coy",
      "Ciudad San Cristóbal"
    ],
    "San Raymundo": [
      "Centro"
    ],
    "Chuarrancho": [
      "Centro"
    ],
    "San José del Golfo": [
      "Centro"
    ],
    "San Pedro Sacatepéquez": [
      "Centro"
    ]
  },
  "Sacatepéquez": {
    "Antigua Guatemala": [
      "Centro Histórico",
      "San Felipe",
      "San Pedro Las Huertas",
      "San Juan del Obispo",
      "Santa Ana",
      "San Cristóbal El Alto"
    ],
    "Ciudad Vieja": [
      "Centro",
      "San Miguel Escobar"
    ],
    "Jocotenango": [
      "Centro",
      "San Lorenzo El Tejar"
    ],
    "San Lucas Sacatepéquez": [
      "Centro",
      "El Hato"
    ],
    "Sumpango": [
      "Centro",
      "El Tablón"
    ],
    "Santiago Sacatepéquez": [
      "Centro"
    ],
    "Santa María de Jesús": [
      "Centro"
    ],
    "Magdalena Milpas Altas": [
      "Centro"
    ],
    "Santa Lucía Milpas Altas": [
      "Centro"
    ],
    "San Antonio Aguas Calientes": [
      "Centro"
    ],
    "Santa Catarina Barahona": [
      "Centro"
    ],
    "San Bartolomé Milpas Altas": [
      "Centro"
    ],
    "Pastores": [
      "Centro"
    ],
    "San Miguel Dueñas": [
      "Centro"
    ],
    "Alotenango": [
      "Centro"
    ]
  },
  "Chimaltenango": {
    "Chimaltenango": [
      "Centro",
      "El Tejar",
      "San José Poaquil"
    ],
    "Tecpán Guatemala": [
      "Centro",
      "Santa Apolonia"
    ],
    "Patzún": [
      "Centro",
      "Xeatzán Bajo"
    ],
    "San Martín Jilotepeque": [
      "Centro"
    ],
    "Comalapa": [
      "Centro"
    ],
    "Zaragoza": [
      "Centro"
    ],
    "El Tejar": [
      "Centro"
    ],
    "Patzicía": [
      "Centro"
    ],
    "Acatenango": [
      "Centro"
    ],
    "Yepocapa": [
      "Centro"
    ],
    "Pochuta": [
      "Centro"
    ],
    "San Andrés Itzapa": [
      "Centro"
    ],
    "Parramos": [
      "Centro"
    ],
    "Santa Cruz Balanyá": [
      "Centro"
    ]
  },
  "Escuintla": {
    "Escuintla": [
      "Centro",
      "El Cerrito",
      "La Democracia",
      "Cocales"
    ],
    "Santa Lucía Cotzumalguapa": [
      "Centro",
      "Palo Verde"
    ],
    "Palín": [
      "Centro",
      "El Rodeo"
    ],
    "Puerto San José": [
      "Centro",
      "Iztapa"
    ],
    "La Democracia": [
      "Centro"
    ],
    "Siquinalá": [
      "Centro"
    ],
    "Masagua": [
      "Centro"
    ],
    "Tiquisate": [
      "Centro"
    ],
    "La Gomera": [
      "Centro"
    ],
    "Guanagazapa": [
      "Centro"
    ],
    "San Vicente Pacaya": [
      "Centro"
    ],
    "Nueva Concepción": [
      "Centro"
    ],
    "Sipacate": [
      "Centro"
    ]
  },
  "Santa Rosa": {
    "Cuilapa": [
      "Centro",
      "El Barrial"
    ],
    "Barberena": [
      "Centro",
      "El Cerinal"
    ],
    "Chiquimulilla": [
      "Centro",
      "El Jobo"
    ],
    "Guazacapán": [
      "Centro"
    ],
    "Taxisco": [
      "Centro"
    ],
    "Santa Cruz Naranjo": [
      "Centro"
    ],
    "Pueblo Nuevo Viñas": [
      "Centro"
    ],
    "Nueva Santa Rosa": [
      "Centro"
    ],
    "Casillas": [
      "Centro"
    ],
    "San Juan Tecuaco": [
      "Centro"
    ],
    "Oratorio": [
      "Centro"
    ]
  },
  "Sololá": {
    "Sololá": [
      "Centro",
      "El Tablón"
    ],
    "Panajachel": [
      "Centro",
      "Jucanyá"
    ],
    "San Pedro La Laguna": [
      "Centro",
      "Tzanjuyú"
    ],
    "Santiago Atitlán": [
      "Centro"
    ],
    "San Juan La Laguna": [
      "Centro"
    ],
    "San Marcos La Laguna": [
      "Centro"
    ],
    "Santa Cruz La Laguna": [
      "Centro"
    ],
    "San Antonio Palopó": [
      "Centro"
    ],
    "Santa Catarina Palopó": [
      "Centro"
    ],
    "San Lucas Tolimán": [
      "Centro"
    ],
    "Nahualá": [
      "Centro"
    ],
    "Santa Clara La Laguna": [
      "Centro"
    ]
  },
  "Quetzaltenango": {
    "Quetzaltenango": [
      "Zona 1",
      "Zona 2",
      "Zona 3",
      "Las Majadas",
      "La Esperanza",
      "Salcajá"
    ],
    "Coatepeque": [
      "Centro",
      "El Palmar"
    ],
    "Cantel": [
      "Centro",
      "Pasojoc"
    ],
    "Salcajá": [
      "Centro"
    ],
    "Olintepeque": [
      "Centro"
    ],
    "San Mateo": [
      "Centro"
    ],
    "Almolonga": [
      "Centro"
    ],
    "Zunil": [
      "Centro"
    ],
    "El Palmar": [
      "Centro"
    ],
    "Colomba": [
      "Centro"
    ],
    "Génova": [
      "Centro"
    ],
    "Flores Costa Cuca": [
      "Centro"
    ]
  },
  "Suchitepéquez": {
    "Mazatenango": [
      "Centro",
      "San José El Ídolo"
    ],
    "Cuyotenango": [
      "Centro",
      "San Lorenzo"
    ],
    "San Antonio Suchitepéquez": [
      "Centro"
    ],
    "Samayac": [
      "Centro"
    ],
    "San Bernardino": [
      "Centro"
    ],
    "San José El Ídolo": [
      "Centro"
    ],
    "Santo Domingo Suchitepéquez": [
      "Centro"
    ],
    "Chicacao": [
      "Centro"
    ],
    "Patulul": [
      "Centro"
    ],
    "Pueblo Nuevo": [
      "Centro"
    ],
    "Río Bravo": [
      "Centro"
    ]
  },
  "Retalhuleu": {
    "Retalhuleu": [
      "Centro",
      "San Sebastián"
    ],
    "Champerico": [
      "Centro",
      "El Semillero"
    ],
    "San Sebastián": [
      "Centro"
    ],
    "Santa Cruz Muluá": [
      "Centro"
    ],
    "San Martín Zapotitlán": [
      "Centro"
    ],
    "San Felipe": [
      "Centro"
    ],
    "Nuevo San Carlos": [
      "Centro"
    ],
    "El Asintal": [
      "Centro"
    ]
  },
  "San Marcos": {
    "San Marcos": [
      "Centro",
      "San Pedro Sacatepéquez"
    ],
    "Malacatán": [
      "Centro",
      "El Quetzal"
    ],
    "Tecún Umán": [
      "Centro",
      "El Carmen"
    ],
    "San Pedro Sacatepéquez": [
      "Centro"
    ],
    "Ayutla": [
      "Centro"
    ],
    "Catarina": [
      "Centro"
    ],
    "Comitancillo": [
      "Centro"
    ],
    "Concepción Tutuapa": [
      "Centro"
    ],
    "El Quetzal": [
      "Centro"
    ],
    "El Rodeo": [
      "Centro"
    ],
    "El Tumbador": [
      "Centro"
    ],
    "Esquipulas Palo Gordo": [
      "Centro"
    ],
    "Ixchiguán": [
      "Centro"
    ],
    "La Reforma": [
      "Centro"
    ],
    "Nuevo Progreso": [
      "Centro"
    ],
    "Ocós": [
      "Centro"
    ],
    "Pajapita": [
      "Centro"
    ],
    "Río Blanco": [
      "Centro"
    ],
    "San Antonio Sacatepéquez": [
      "Centro"
    ],
    "San José Ojetenam": [
      "Centro"
    ],
    "San Lorenzo": [
      "Centro"
    ],
    "San Miguel Ixtahuacán": [
      "Centro"
    ],
    "San Pablo": [
      "Centro"
    ],
    "San Rafael Pie de la Cuesta": [
      "Centro"
    ],
    "Sibinal": [
      "Centro"
    ],
    "Sipacapa": [
      "Centro"
    ],
    "Tacaná": [
      "Centro"
    ],
    "Tajumulco": [
      "Centro"
    ],
    "Tejutla": [
      "Centro"
    ]
  },
  "Huehuetenango": {
    "Huehuetenango": [
      "Centro",
      "La Democracia"
    ],
    "Chiantla": [
      "Centro",
      "Paquix"
    ],
    "Malacatancito": [
      "Centro"
    ],
    "Cuilco": [
      "Centro"
    ],
    "Nentón": [
      "Centro"
    ],
    "San Pedro Necta": [
      "Centro"
    ],
    "Jacaltenango": [
      "Centro"
    ],
    "Soloma": [
      "Centro"
    ],
    "Ixtahuacán": [
      "Centro"
    ],
    "Santa Bárbara": [
      "Centro"
    ],
    "La Democracia": [
      "Centro"
    ],
    "San Miguel Acatán": [
      "Centro"
    ],
    "San Rafael La Independencia": [
      "Centro"
    ],
    "Todos Santos Cuchumatán": [
      "Centro"
    ],
    "San Juan Atitán": [
      "Centro"
    ],
    "Santa Eulalia": [
      "Centro"
    ],
    "San Mateo Ixtatán": [
      "Centro"
    ],
    "Colotenango": [
      "Centro"
    ],
    "San Sebastián Huehuetenango": [
      "Centro"
    ],
    "Tectitán": [
      "Centro"
    ],
    "Concepción Huista": [
      "Centro"
    ],
    "San Juan Ixcoy": [
      "Centro"
    ],
    "San Antonio Huista": [
      "Centro"
    ],
    "San Sebastián Coatán": [
      "Centro"
    ],
    "Barillas": [
      "Centro"
    ],
    "Aguacatán": [
      "Centro"
    ],
    "San Rafael Petzal": [
      "Centro"
    ],
    "San Gaspar Ixchil": [
      "Centro"
    ],
    "Santiago Chimaltenango": [
      "Centro"
    ],
    "Santa Ana Huista": [
      "Centro"
    ]
  },
  "Quiché": {
    "Santa Cruz del Quiché": [
      "Centro",
      "San Antonio Ilotenango"
    ],
    "Chichicastenango": [
      "Centro",
      "Chugüexá"
    ],
    "Chinique": [
      "Centro"
    ],
    "Zacualpa": [
      "Centro"
    ],
    "Chajul": [
      "Centro"
    ],
    "Chicamán": [
      "Centro"
    ],
    "Ixcan": [
      "Playa Grande",
      "Centro"
    ],
    "Joyabaj": [
      "Centro"
    ],
    "Nebaj": [
      "Centro"
    ],
    "Uspantán": [
      "Centro"
    ],
    "Sacapulas": [
      "Centro"
    ],
    "San Andrés Sajcabajá": [
      "Centro"
    ],
    "San Bartolomé Jocotenango": [
      "Centro"
    ],
    "San Juan Cotzal": [
      "Centro"
    ],
    "San Pedro Jocopilas": [
      "Centro"
    ],
    "Cunén": [
      "Centro"
    ],
    "San Miguel Uspantán": [
      "Centro"
    ]
  },
  "Baja Verapaz": {
    "Salamá": [
      "Centro",
      "San Jerónimo"
    ],
    "Rabinal": [
      "Centro",
      "Xococ"
    ],
    "San Miguel Chicaj": [
      "Centro"
    ],
    "Cubulco": [
      "Centro"
    ],
    "Granados": [
      "Centro"
    ],
    "El Chol": [
      "Centro"
    ],
    "Purulhá": [
      "Centro"
    ],
    "San Jerónimo": [
      "Centro"
    ]
  },
  "Alta Verapaz": {
    "Cobán": [
      "Centro",
      "San Juan Chamelco",
      "San Pedro Carchá"
    ],
    "San Pedro Carchá": [
      "Centro",
      "Chamelco"
    ],
    "San Juan Chamelco": [
      "Centro"
    ],
    "Tactic": [
      "Centro"
    ],
    "Tamahú": [
      "Centro"
    ],
    "Tucurú": [
      "Centro"
    ],
    "Panzós": [
      "Centro"
    ],
    "Senahú": [
      "Centro"
    ],
    "Cahabón": [
      "Centro"
    ],
    "Lanquín": [
      "Centro"
    ],
    "Chisec": [
      "Centro"
    ],
    "Chahal": [
      "Centro"
    ],
    "Fray Bartolomé de las Casas": [
      "Centro"
    ],
    "Santa Cruz Verapaz": [
      "Centro"
    ],
    "San Cristóbal Verapaz": [
      "Centro"
    ],
    "Santa María Cahabón": [
      "Centro"
    ],
    "Raxruhá": [
      "Centro"
    ]
  },
  "Petén": {
    "Flores": [
      "Centro Isla",
      "Santa Elena",
      "San Benito"
    ],
    "San Benito": [
      "Centro",
      "El Remate"
    ],
    "Santa Elena": [
      "Centro",
      "El Caoba"
    ],
    "San Andrés": [
      "Centro"
    ],
    "La Libertad": [
      "Centro"
    ],
    "San Francisco": [
      "Centro"
    ],
    "Santa Ana": [
      "Centro"
    ],
    "Dolores": [
      "Centro"
    ],
    "San Luis": [
      "Centro"
    ],
    "Sayaxché": [
      "Centro"
    ],
    "Melchor de Mencos": [
      "Centro"
    ],
    "Poptún": [
      "Centro"
    ],
    "Las Cruces": [
      "Centro"
    ],
    "El Chal": [
      "Centro"
    ]
  },
  "Izabal": {
    "Puerto Barrios": [
      "Centro",
      "Santo Tomás de Castilla"
    ],
    "Livingston": [
      "Centro",
      "Quehueche"
    ],
    "Morales": [
      "Centro",
      "El Estor"
    ],
    "Los Amates": [
      "Centro"
    ],
    "El Estor": [
      "Centro"
    ]
  },
  "Zacapa": {
    "Zacapa": [
      "Centro",
      "Estanzuela"
    ],
    "Gualán": [
      "Centro",
      "La Reforma"
    ],
    "Estanzuela": [
      "Centro"
    ],
    "Río Hondo": [
      "Centro"
    ],
    "Teculután": [
      "Centro"
    ],
    "Usumatlán": [
      "Centro"
    ],
    "Cabañas": [
      "Centro"
    ],
    "San Diego": [
      "Centro"
    ],
    "La Unión": [
      "Centro"
    ],
    "Huité": [
      "Centro"
    ]
  },
  "Chiquimula": {
    "Chiquimula": [
      "Centro",
      "San José La Arada"
    ],
    "Esquipulas": [
      "Centro",
      "Olopa"
    ],
    "San José La Arada": [
      "Centro"
    ],
    "San Juan Ermita": [
      "Centro"
    ],
    "Jocotán": [
      "Centro"
    ],
    "Camotán": [
      "Centro"
    ],
    "Olopa": [
      "Centro"
    ],
    "Quezaltepeque": [
      "Centro"
    ],
    "Concepción Las Minas": [
      "Centro"
    ],
    "Ipala": [
      "Centro"
    ]
  },
  "Jalapa": {
    "Jalapa": [
      "Centro",
      "San Pedro Pinula"
    ],
    "San Pedro Pinula": [
      "Centro"
    ],
    "San Luis Jilotepeque": [
      "Centro"
    ],
    "San Manuel Chaparrón": [
      "Centro"
    ],
    "San Carlos Alzatate": [
      "Centro"
    ],
    "Monjas": [
      "Centro"
    ],
    "Mataquescuintla": [
      "Centro"
    ]
  },
  "Jutiapa": {
    "Jutiapa": [
      "Centro",
      "El Progreso"
    ],
    "Asunción Mita": [
      "Centro",
      "Yupiltepeque"
    ],
    "El Progreso": [
      "Centro"
    ],
    "Santa Catarina Mita": [
      "Centro"
    ],
    "Agua Blanca": [
      "Centro"
    ],
    "Atescatempa": [
      "Centro"
    ],
    "Jerez": [
      "Centro"
    ],
    "El Adelanto": [
      "Centro"
    ],
    "Zapotitlán": [
      "Centro"
    ],
    "Comapa": [
      "Centro"
    ],
    "Jalpatagua": [
      "Centro"
    ],
    "Conguaco": [
      "Centro"
    ],
    "Moyuta": [
      "Centro"
    ],
    "Pasaco": [
      "Centro"
    ],
    "San José Acatempa": [
      "Centro"
    ],
    "Quesada": [
      "Centro"
    ]
  },
  "El Progreso": {
    "Guastatoya": [
      "Centro",
      "Sanarate"
    ],
    "Sanarate": [
      "Centro",
      "El Jícaro"
    ],
    "Morazán": [
      "Centro"
    ],
    "San Antonio La Paz": [
      "Centro"
    ],
    "El Jícaro": [
      "Centro"
    ],
    "Sansare": [
      "Centro"
    ],
    "San Cristóbal Acasaguastlán": [
      "Centro"
    ],
    "San Agustín Acasaguastlán": [
      "Centro"
    ]
  }
};

/** Costa Rica — Provincia → Cantón → Distrito. */
export const GEO_CR: LatamGeoTree = {
  "San José": {
    "San José": [
      "Carmen",
      "Merced",
      "Hospital",
      "Catedral",
      "Zapote",
      "San Francisco de Dos Ríos",
      "Uruca",
      "Mata Redonda",
      "Pavas",
      "Hatillo",
      "San Sebastián"
    ],
    "Escazú": [
      "Escazú",
      "San Antonio",
      "San Rafael"
    ],
    "Desamparados": [
      "Desamparados",
      "San Miguel",
      "San Juan de Dios",
      "San Rafael Arriba",
      "San Antonio",
      "Frailes",
      "Patarrá",
      "San Cristóbal",
      "Rosario",
      "Damas",
      "San Rafael Abajo",
      "Gravilias",
      "Los Guido"
    ],
    "Puriscal": [
      "Santiago",
      "Mercedes Sur",
      "Barbacoas",
      "Grifo Alto",
      "San Rafael",
      "Candelarita",
      "Desamparaditos",
      "San Antonio",
      "Chires"
    ],
    "Tarrazú": [
      "San Marcos",
      "San Lorenzo",
      "San Carlos"
    ],
    "Aserrí": [
      "Aserrí",
      "Tarbaca",
      "Vuelta de Jorco",
      "San Gabriel",
      "Legua",
      "Monterrey",
      "La Legua"
    ],
    "Mora": [
      "Colón",
      "Guayabo",
      "Tabarcia",
      "Piedras Negras",
      "Jaris",
      "Quitirrisí"
    ],
    "Goicoechea": [
      "Guadalupe",
      "San Francisco",
      "Calle Blancos",
      "Mata de Plátano",
      "Ipís",
      "Rancho Redondo",
      "Purral"
    ],
    "Santa Ana": [
      "Santa Ana",
      "Salitral",
      "Pozos",
      "Uruca",
      "Piedades",
      "Brasil"
    ],
    "Alajuelita": [
      "Alajuelita",
      "San Josecito",
      "San Antonio",
      "Concepción",
      "San Felipe"
    ],
    "Vázquez de Coronado": [
      "San Isidro",
      "San Rafael",
      "Dulce Nombre de Jesús",
      "Patalillo",
      "Cascajal"
    ],
    "Acosta": [
      "San Ignacio",
      "Guaitil",
      "Palmichal",
      "Cangrejal",
      "Sabanillas"
    ],
    "Tibás": [
      "San Juan",
      "Cinco Esquinas",
      "Anselmo Llorente",
      "León XIII",
      "Colima"
    ],
    "Moravia": [
      "San Vicente",
      "San Jerónimo",
      "La Trinidad"
    ],
    "Montes de Oca": [
      "San Pedro",
      "Sabanilla",
      "Mercedes",
      "San Rafael"
    ],
    "Turrubares": [
      "San Pablo",
      "San Pedro",
      "San Juan de Mata",
      "San Luis",
      "Carara"
    ],
    "Dota": [
      "Santa María",
      "Jardín",
      "Copey"
    ],
    "Curridabat": [
      "Curridabat",
      "Granadilla",
      "Sánchez",
      "Tirrases"
    ],
    "Pérez Zeledón": [
      "San Isidro de El General",
      "El General",
      "Daniel Flores",
      "Rivas",
      "San Pedro",
      "Platanares",
      "Pejibaye",
      "Cajón",
      "Barú",
      "Río Naranjo",
      "Páramo",
      "La Amistad"
    ],
    "León Cortés": [
      "San Pablo",
      "San Andrés",
      "Llano Bonito",
      "San Isidro",
      "Santa Cruz",
      "San Antonio"
    ]
  },
  "Alajuela": {
    "Alajuela": [
      "Alajuela",
      "San José",
      "Carrizal",
      "San Antonio",
      "Guácima",
      "San Isidro",
      "Sabanilla",
      "San Rafael",
      "Río Segundo",
      "Desamparados",
      "Turrúcares",
      "Tambor",
      "Garita",
      "Sarapiquí"
    ],
    "San Ramón": [
      "San Ramón",
      "Santiago",
      "San Juan",
      "Piedades Norte",
      "Piedades Sur",
      "San Rafael",
      "San Isidro",
      "Ángeles",
      "Alfaro",
      "Volio",
      "Concepción",
      "Zapotal",
      "Peñas Blancas",
      "San Isidro"
    ],
    "Grecia": [
      "Grecia",
      "San Isidro",
      "San José",
      "San Roque",
      "Tacares",
      "Río Cuarto",
      "Puente de Piedra",
      "Bolívar"
    ],
    "San Mateo": [
      "San Mateo",
      "Desmonte",
      "Jesús María",
      "Labrador"
    ],
    "Atenas": [
      "Atenas",
      "Jesús",
      "Mercedes",
      "San Isidro",
      "Concepción",
      "San José",
      "Santa Eulalia",
      "Escobal"
    ],
    "Naranjo": [
      "Naranjo",
      "San Miguel",
      "San José",
      "Cirrí Sur",
      "San Jerónimo",
      "San Juan",
      "El Rosario",
      "Palmitos"
    ],
    "Palmares": [
      "Palmares",
      "Zaragoza",
      "Buenos Aires",
      "Santiago",
      "Candelaria",
      "Esquipulas",
      "La Granja"
    ],
    "Poás": [
      "San Pedro",
      "San Juan",
      "San Rafael",
      "Carrillos",
      "Sabana Redonda"
    ],
    "Orotina": [
      "Orotina",
      "El Mastate",
      "Hacienda Vieja",
      "Coyolar",
      "La Ceiba"
    ],
    "San Carlos": [
      "Quesada",
      "Florencia",
      "Buenavista",
      "Aguas Zarcas",
      "Venecia",
      "Pital",
      "La Fortuna",
      "La Tigra",
      "La Palmera",
      "Venado",
      "Cutris",
      "Monterrey",
      "Pocosol"
    ],
    "Zarcero": [
      "Zarcero",
      "Laguna",
      "Tapezco",
      "Guadalupe",
      "Palmira",
      "Zapote",
      "Brisas"
    ],
    "Sarchí": [
      "Sarchí Norte",
      "Sarchí Sur",
      "Toro Amarillo",
      "San Pedro",
      "Rodríguez"
    ],
    "Upala": [
      "Upala",
      "Aguas Claras",
      "San José",
      "Bijagua",
      "Delicias",
      "Dos Ríos",
      "Yolillal",
      "Canalete"
    ],
    "Los Chiles": [
      "Los Chiles",
      "Caño Negro",
      "El Amparo",
      "San Jorge"
    ],
    "Guatuso": [
      "San Rafael",
      "Buenavista",
      "Cote",
      "Katira"
    ],
    "Río Cuarto": [
      "Río Cuarto",
      "Santa Rita",
      "Santa Isabel"
    ]
  },
  "Cartago": {
    "Cartago": [
      "Oriental",
      "Occidental",
      "Carmen",
      "San Nicolás",
      "Aguacaliente",
      "Guadalupe",
      "Corralillo",
      "Tierra Blanca",
      "Dulce Nombre",
      "Llano Grande",
      "Quebradilla"
    ],
    "Paraíso": [
      "Paraíso",
      "Santiago",
      "Orosi",
      "Cachí",
      "Llanos de Santa Lucía"
    ],
    "La Unión": [
      "Tres Ríos",
      "San Diego",
      "San Juan",
      "San Rafael",
      "Concepción",
      "Dulce Nombre",
      "San Ramón",
      "Río Azul"
    ],
    "Jiménez": [
      "Juan Viñas",
      "Tucurrique",
      "Pejibaye"
    ],
    "Turrialba": [
      "Turrialba",
      "La Suiza",
      "Peralta",
      "Santa Cruz",
      "Santa Teresita",
      "Pavones",
      "Tuis",
      "Tayutic",
      "Santa Rosa",
      "Tres Equis",
      "La Isabel",
      "Chirripó"
    ],
    "Alvarado": [
      "Pacayas",
      "Cervantes",
      "Capellades"
    ],
    "Oreamuno": [
      "San Rafael",
      "Cot",
      "Potrero Cerrado",
      "Cipreses",
      "Santa Rosa"
    ],
    "El Guarco": [
      "El Tejar",
      "San Isidro",
      "Tobosi",
      "Patio de Agua"
    ]
  },
  "Heredia": {
    "Heredia": [
      "Heredia",
      "Mercedes",
      "San Francisco",
      "Ulloa",
      "Varablanca"
    ],
    "Barva": [
      "Barva",
      "San Pedro",
      "San Pablo",
      "San Roque",
      "Santa Lucía",
      "San José de la Montaña"
    ],
    "Santo Domingo": [
      "Santo Domingo",
      "San Vicente",
      "San Miguel",
      "Paracito",
      "Santo Tomás",
      "Santa Rosa",
      "Tures",
      "Pará"
    ],
    "Santa Bárbara": [
      "Santa Bárbara",
      "San Pedro",
      "San Juan",
      "Jesús",
      "Santo Domingo",
      "Purabá"
    ],
    "San Rafael": [
      "San Rafael",
      "San Josecito",
      "Santiago",
      "Ángeles",
      "Concepción"
    ],
    "San Isidro": [
      "San Isidro",
      "San José",
      "Concepción",
      "San Francisco"
    ],
    "Belén": [
      "San Antonio",
      "La Ribera",
      "La Asunción"
    ],
    "Flores": [
      "San Joaquín",
      "Barrantes",
      "Llorente"
    ],
    "San Pablo": [
      "San Pablo",
      "Rincón de Sabanilla"
    ],
    "Sarapiquí": [
      "Puerto Viejo",
      "La Virgen",
      "Las Horquetas",
      "Llanuras del Gaspar",
      "Cureña"
    ]
  },
  "Guanacaste": {
    "Liberia": [
      "Liberia",
      "Cañas Dulces",
      "Mayorga",
      "Nacascolo",
      "Curubandé"
    ],
    "Nicoya": [
      "Nicoya",
      "Mansión",
      "San Antonio",
      "Quebrada Honda",
      "Sámara",
      "Nosara",
      "Belén de Nosarita"
    ],
    "Santa Cruz": [
      "Santa Cruz",
      "Bolsón",
      "Veintisiete de Abril",
      "Tempate",
      "Cartagena",
      "Cuajiniquil",
      "Diriá",
      "Cabo Velas",
      "Tamarindo"
    ],
    "Bagaces": [
      "Bagaces",
      "La Fortuna",
      "Mogote",
      "Río Naranjo"
    ],
    "Carrillo": [
      "Filadelfia",
      "Palmira",
      "Sardinal",
      "Belén"
    ],
    "Cañas": [
      "Cañas",
      "Palmira",
      "San Miguel",
      "Bebedero",
      "Porozal"
    ],
    "Abangares": [
      "Las Juntas",
      "Sierra",
      "San Juan",
      "Colorado"
    ],
    "Tilarán": [
      "Tilarán",
      "Quebrada Grande",
      "Tronadora",
      "Santa Rosa",
      "Líbano",
      "Tierras Morenas",
      "Arenal"
    ],
    "Nandayure": [
      "Carmona",
      "Santa Rita",
      "Zapotal",
      "San Pablo",
      "Porvenir",
      "Bejuco"
    ],
    "La Cruz": [
      "La Cruz",
      "Santa Cecilia",
      "La Garita",
      "Santa Elena"
    ],
    "Hojancha": [
      "Hojancha",
      "Monte Romo",
      "Puerto Carrillo",
      "Huacas"
    ]
  },
  "Puntarenas": {
    "Puntarenas": [
      "Puntarenas",
      "Pitahaya",
      "Chomes",
      "Lepanto",
      "Paquera",
      "Manzanillo",
      "Guacimal",
      "Barranca",
      "Monte Verde",
      "Isla del Coco",
      "Cóbano",
      "Chacarita",
      "Chira",
      "Acapulco",
      "El Roble",
      "Arancibia"
    ],
    "Esparza": [
      "Espíritu Santo",
      "San Juan Grande",
      "Macacona",
      "San Rafael",
      "San Jerónimo",
      "Caldera"
    ],
    "Buenos Aires": [
      "Buenos Aires",
      "Volcán",
      "Potrero Grande",
      "Boruca",
      "Pilas",
      "Colinas",
      "Chánguena",
      "Biolley",
      "Brunka"
    ],
    "Montes de Oro": [
      "Miramar",
      "La Unión",
      "San Isidro"
    ],
    "Osa": [
      "Puerto Cortés",
      "Palmar",
      "Sierpe",
      "Bahía Ballena",
      "Piedras Blancas",
      "Bahía Drake"
    ],
    "Quepos": [
      "Quepos",
      "Savegre",
      "Naranjito"
    ],
    "Golfito": [
      "Golfito",
      "Puerto Jiménez",
      "Guaycará",
      "Pavón"
    ],
    "Coto Brus": [
      "San Vito",
      "Sabalito",
      "Agua Buena",
      "Limoncito",
      "Pittier",
      "Gutiérrez Braun"
    ],
    "Parrita": [
      "Parrita"
    ],
    "Corredores": [
      "Corredor",
      "La Cuesta",
      "Canoas",
      "Laurel"
    ],
    "Garabito": [
      "Jacó",
      "Tárcoles"
    ]
  },
  "Limón": {
    "Limón": [
      "Limón",
      "Valle La Estrella",
      "Río Blanco",
      "Matama"
    ],
    "Pococí": [
      "Guápiles",
      "Jiménez",
      "Rita",
      "Roxana",
      "Cariari",
      "Colorado",
      "La Colonia"
    ],
    "Siquirres": [
      "Siquirres",
      "Pacuarito",
      "Florida",
      "Germania",
      "Cairo",
      "Alegría"
    ],
    "Talamanca": [
      "Bratsi",
      "Sixaola",
      "Cahuita",
      "Telire"
    ],
    "Matina": [
      "Matina",
      "Batán",
      "Carrandi"
    ],
    "Guácimo": [
      "Guácimo",
      "Mercedes",
      "Pocora",
      "Río Jiménez",
      "Duacarí"
    ]
  }
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
