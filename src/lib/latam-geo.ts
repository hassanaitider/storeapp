import type { CountryCode } from "./types";

/** Cascading location tree: Departamento → Municipio → Poblado[] */
export type LatamGeoTree = Record<string, Record<string, string[]>>;

/**
 * Markets that use the shared Latam COD checkout.
 * MX, AR, DO, EC, SV, HN, and NI each have their own exclusive COD modules.
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

/** Guatemala — departamentos / municipios / poblados from Fufills COD coverage. */
export const GEO_GT: LatamGeoTree = {
  "Alta Verapaz": {
    "Chahal": [
      "Chahal"
    ],
    "Chisec": [
      "Chisec"
    ],
    "Coban": [
      "Coban"
    ],
    "Fray Bartolome De Las Casas": [
      "Fray Bartolome De Las Casas"
    ],
    "Lanquin": [
      "Lanquin"
    ],
    "Panzos": [
      "Panzos"
    ],
    "Raxruha": [
      "Raxruha"
    ],
    "San Cristobal Verapaz": [
      "San Cristobal Verapaz"
    ],
    "San Juan Chamelco": [
      "San Juan Chamelco"
    ],
    "San Pedro Carcha": [
      "San Pedro Carcha"
    ],
    "Santa Catalina La Tinta": [
      "Santa Catalina La Tinta"
    ],
    "Santa Cruz Verapaz": [
      "Santa Cruz Verapaz"
    ],
    "Santa Maria Cahabon": [
      "Santa Maria Cahabon"
    ],
    "Senahu": [
      "Senahu"
    ],
    "Tactic": [
      "Tactic"
    ],
    "Tamahu": [
      "Tamahu"
    ],
    "Tucuru": [
      "Tucuru"
    ]
  },
  "Baja Verapaz": {
    "Cubulco": [
      "Cubulco"
    ],
    "Granados": [
      "Granados"
    ],
    "Purulha": [
      "Purulha"
    ],
    "Rabinal": [
      "Rabinal"
    ],
    "Salama": [
      "Salama"
    ],
    "San Jeronimo": [
      "San Jeronimo"
    ],
    "San Miguel Chicaj": [
      "San Miguel Chicaj"
    ],
    "Santa Cruz El Chol": [
      "Santa Cruz El Chol"
    ]
  },
  "Chimaltenango": {
    "Acatenango": [
      "Acatenango"
    ],
    "Chimaltenango": [
      "Chimaltenango"
    ],
    "El Tejar": [
      "El Tejar"
    ],
    "Parramos": [
      "Parramos"
    ],
    "Patzicia": [
      "Patzicia"
    ],
    "Patzun": [
      "Patzun"
    ],
    "Pochuta": [
      "Pochuta"
    ],
    "San Andres Itzapa": [
      "San Andres Itzapa"
    ],
    "San Jose Poaquil": [
      "San Jose Poaquil"
    ],
    "San Juan Comalapa": [
      "San Juan Comalapa"
    ],
    "San Martin Jilotepeque": [
      "San Martin Jilotepeque"
    ],
    "San Pedro Yepocapa": [
      "San Pedro Yepocapa"
    ],
    "Santa Apolonia": [
      "Santa Apolonia"
    ],
    "Santa Cruz Balanya": [
      "Santa Cruz Balanya"
    ],
    "Tecpan": [
      "Tecpan"
    ],
    "Zaragoza": [
      "Zaragoza"
    ]
  },
  "Chiquimula": {
    "Camotan": [
      "Camotan"
    ],
    "Chiquimula": [
      "Chiquimula"
    ],
    "Concepcion Las Minas": [
      "Concepcion Las Minas"
    ],
    "Esquipulas": [
      "Esquipulas"
    ],
    "Ipala": [
      "Ipala"
    ],
    "Jocotan": [
      "Jocotan"
    ],
    "Olopa": [
      "Olopa"
    ],
    "Quezaltepeque": [
      "Quezaltepeque"
    ],
    "San Jacinto": [
      "San Jacinto"
    ],
    "San Jose La Arada": [
      "San Jose La Arada"
    ],
    "San Juan Ermita": [
      "San Juan Ermita"
    ]
  },
  "El Progreso": {
    "El Jicaro": [
      "El Jicaro"
    ],
    "Guastatoya": [
      "Guastatoya"
    ],
    "Morazan": [
      "Morazan"
    ],
    "San Agustin Acasaguastlan": [
      "San Agustin Acasaguastlan"
    ],
    "San Antonio La Paz": [
      "San Antonio La Paz"
    ],
    "San Cristobal Acasaguastlan": [
      "San Cristobal Acasaguastlan"
    ],
    "Sanarate": [
      "Sanarate"
    ],
    "Sansare": [
      "Sansare"
    ]
  },
  "Escuintla": {
    "Escuintla": [
      "Escuintla"
    ],
    "Guanagazapa": [
      "Guanagazapa"
    ],
    "Iztapa": [
      "Iztapa"
    ],
    "La Democracia": [
      "La Democracia"
    ],
    "La Gomera": [
      "La Gomera"
    ],
    "Masagua": [
      "Masagua"
    ],
    "Nueva Concepcion": [
      "Nueva Concepcion"
    ],
    "Palin": [
      "Palin"
    ],
    "Puerto San Jose": [
      "Puerto San Jose"
    ],
    "San Vicente Pacaya": [
      "San Vicente Pacaya"
    ],
    "Santa Lucia Cotzumalguapa": [
      "Santa Lucia Cotzumalguapa"
    ],
    "Sipacate": [
      "Sipacate"
    ],
    "Siquinala": [
      "Siquinala"
    ],
    "Tiquisate": [
      "Tiquisate"
    ]
  },
  "Guatemala": {
    "Amatitlan": [
      "Amatitlan"
    ],
    "Chinautla": [
      "Chinautla"
    ],
    "Chuarrancho": [
      "Chuarrancho"
    ],
    "Fraijanes": [
      "Fraijanes"
    ],
    "Guatemala": [
      "Guatemala"
    ],
    "Mixco": [
      "Mixco"
    ],
    "Palencia": [
      "Palencia"
    ],
    "San Jose Del Golfo": [
      "San Jose Del Golfo"
    ],
    "San Jose Pinula": [
      "San Jose Pinula"
    ],
    "San Juan Sacatepequez": [
      "San Juan Sacatepequez"
    ],
    "San Miguel Petapa": [
      "San Miguel Petapa"
    ],
    "San Pedro Ayampuc": [
      "San Pedro Ayampuc"
    ],
    "San Pedro Sacatepequez": [
      "San Pedro Sacatepequez"
    ],
    "San Raymundo": [
      "San Raymundo"
    ],
    "Santa Catarina Pinula": [
      "Santa Catarina Pinula"
    ],
    "Villa Canales": [
      "Villa Canales"
    ],
    "Villa Nueva": [
      "Villa Nueva"
    ]
  },
  "Huehuetenango": {
    "Aguacatan": [
      "Aguacatan"
    ],
    "Chiantla": [
      "Chiantla"
    ],
    "Colotenango": [
      "Colotenango"
    ],
    "Concepcion Huista": [
      "Concepcion Huista"
    ],
    "Cuilco": [
      "Cuilco"
    ],
    "Huehuetenango": [
      "Huehuetenango"
    ],
    "Jacaltenango": [
      "Jacaltenango"
    ],
    "La Democracia": [
      "La Democracia"
    ],
    "La Libertad": [
      "La Libertad"
    ],
    "Malacatancito": [
      "Malacatancito"
    ],
    "Nenton": [
      "Nenton"
    ],
    "Petetan": [
      "Petetan"
    ],
    "San Antonio Huista": [
      "San Antonio Huista"
    ],
    "San Gaspar Ixchil": [
      "San Gaspar Ixchil"
    ],
    "San Ildefonso Ixtahuacan": [
      "San Ildefonso Ixtahuacan"
    ],
    "San Juan Atitan": [
      "San Juan Atitan"
    ],
    "San Juan Ixcoy": [
      "San Juan Ixcoy"
    ],
    "San Mateo Ixtatan": [
      "San Mateo Ixtatan"
    ],
    "San Miguel Acatan": [
      "San Miguel Acatan"
    ],
    "San Pedro Necta": [
      "San Pedro Necta"
    ],
    "San Pedro Soloma": [
      "San Pedro Soloma"
    ],
    "San Rafael La Independencia": [
      "San Rafael La Independencia"
    ],
    "San Rafael Petzal": [
      "San Rafael Petzal"
    ],
    "San Sebastian Coatan": [
      "San Sebastian Coatan"
    ],
    "San Sebastian Huehuetenango": [
      "San Sebastian Huehuetenango"
    ],
    "Santa Ana Huista": [
      "Santa Ana Huista"
    ],
    "Santa Barbara": [
      "Santa Barbara"
    ],
    "Santa Cruz Barillas": [
      "Santa Cruz Barillas"
    ],
    "Santa Eulalia": [
      "Santa Eulalia"
    ],
    "Santiago Chimaltenango": [
      "Santiago Chimaltenango"
    ],
    "Soloma": [
      "Soloma"
    ],
    "Tectitan": [
      "Tectitan"
    ],
    "Todos Santos Cuchumatan": [
      "Todos Santos Cuchumatan"
    ],
    "Union Cantinil": [
      "Union Cantinil"
    ]
  },
  "Izabal": {
    "El Estor": [
      "El Estor"
    ],
    "Livingston": [
      "Livingston"
    ],
    "Los Amates": [
      "Los Amates"
    ],
    "Morales": [
      "Morales"
    ],
    "Puerto Barrios": [
      "Puerto Barrios"
    ]
  },
  "Jalapa": {
    "Jalapa": [
      "Jalapa"
    ],
    "Mataquescuintla": [
      "Mataquescuintla"
    ],
    "Monjas": [
      "Monjas"
    ],
    "San Carlos Alzatate": [
      "San Carlos Alzatate"
    ],
    "San Luis Jilotepeque": [
      "San Luis Jilotepeque"
    ],
    "San Manuel Chaparron": [
      "San Manuel Chaparron"
    ],
    "San Pedro Pinula": [
      "San Pedro Pinula"
    ]
  },
  "Jutiapa": {
    "Agua Blanca": [
      "Agua Blanca"
    ],
    "Asuncion Mita": [
      "Asuncion Mita"
    ],
    "Atescatempa": [
      "Atescatempa"
    ],
    "Comapa": [
      "Comapa"
    ],
    "Conguaco": [
      "Conguaco"
    ],
    "El Adelanto": [
      "El Adelanto"
    ],
    "El Progreso": [
      "El Progreso"
    ],
    "Jalpatagua": [
      "Jalpatagua"
    ],
    "Jerez": [
      "Jerez"
    ],
    "Jutiapa": [
      "Jutiapa"
    ],
    "Moyuta": [
      "Moyuta"
    ],
    "Pasaco": [
      "Pasaco"
    ],
    "Quesada": [
      "Quesada"
    ],
    "San Jose Acatempa": [
      "San Jose Acatempa"
    ],
    "Santa Catarina Mita": [
      "Santa Catarina Mita"
    ],
    "Yupiltepeque": [
      "Yupiltepeque"
    ],
    "Zapotitlan": [
      "Zapotitlan"
    ]
  },
  "Petén": {
    "Dolores": [
      "Dolores"
    ],
    "El Chal": [
      "El Chal"
    ],
    "Flores": [
      "Flores"
    ],
    "La Libertad": [
      "La Libertad"
    ],
    "Las Cruces": [
      "Las Cruces"
    ],
    "Melchor De Mencos": [
      "Melchor De Mencos"
    ],
    "Poptun": [
      "Poptun"
    ],
    "San Andres": [
      "San Andres"
    ],
    "San Benito": [
      "San Benito"
    ],
    "San Francisco": [
      "San Francisco"
    ],
    "San Jose": [
      "San Jose"
    ],
    "San Luis": [
      "San Luis"
    ],
    "Santa Ana": [
      "Santa Ana"
    ],
    "Sayaxche": [
      "Sayaxche"
    ]
  },
  "Quetzaltenango": {
    "Almolonga": [
      "Almolonga"
    ],
    "Cabrican": [
      "Cabrican"
    ],
    "Cajola": [
      "Cajola"
    ],
    "Cantel": [
      "Cantel"
    ],
    "Coatepeque": [
      "Coatepeque"
    ],
    "Colomba": [
      "Colomba"
    ],
    "Concepcion Chiquirichapa": [
      "Concepcion Chiquirichapa"
    ],
    "El Palmar": [
      "El Palmar"
    ],
    "Flores Costa Cuca": [
      "Flores Costa Cuca"
    ],
    "Genova": [
      "Genova"
    ],
    "Huitan": [
      "Huitan"
    ],
    "La Esperanza": [
      "La Esperanza"
    ],
    "Olintepeque": [
      "Olintepeque"
    ],
    "Palestina De Los Altos": [
      "Palestina De Los Altos"
    ],
    "Quetzaltenango": [
      "Quetzaltenango"
    ],
    "Salcaja": [
      "Salcaja"
    ],
    "San Carlos Sija": [
      "San Carlos Sija"
    ],
    "San Francisco La Union": [
      "San Francisco La Union"
    ],
    "San Juan Ostuncalco": [
      "San Juan Ostuncalco"
    ],
    "San Martin Sacatepequez": [
      "San Martin Sacatepequez"
    ],
    "San Mateo": [
      "San Mateo"
    ],
    "San Miguel Sigueila": [
      "San Miguel Sigueila"
    ],
    "Sibilia": [
      "Sibilia"
    ],
    "Zunil": [
      "Zunil"
    ]
  },
  "Quiché": {
    "Canilla": [
      "Canilla"
    ],
    "Chajul": [
      "Chajul"
    ],
    "Chicaman": [
      "Chicaman"
    ],
    "Chiche": [
      "Chiche"
    ],
    "Chichicastenango": [
      "Chichicastenango"
    ],
    "Chinique": [
      "Chinique"
    ],
    "Cunen": [
      "Cunen"
    ],
    "Ixcan": [
      "Ixcan"
    ],
    "Joyabaj": [
      "Joyabaj"
    ],
    "Nebaj": [
      "Nebaj"
    ],
    "Pachalum": [
      "Pachalum"
    ],
    "Patzite": [
      "Patzite"
    ],
    "Sacapulas": [
      "Sacapulas"
    ],
    "San Andres Sajcabaja": [
      "San Andres Sajcabaja"
    ],
    "San Antonio Ilotenango": [
      "San Antonio Ilotenango"
    ],
    "San Bartolome Jocotenango": [
      "San Bartolome Jocotenango"
    ],
    "San Juan Cotzal": [
      "San Juan Cotzal"
    ],
    "San Pedro Jocopilas": [
      "San Pedro Jocopilas"
    ],
    "Santa Cruz Del Quiche": [
      "Santa Cruz Del Quiche"
    ],
    "Santa Maria Nebaj": [
      "Santa Maria Nebaj"
    ],
    "Uspantan": [
      "Uspantan"
    ],
    "Zacualpa": [
      "Zacualpa"
    ]
  },
  "Retalhuleu": {
    "Champerico": [
      "Champerico"
    ],
    "El Asintal": [
      "El Asintal"
    ],
    "Nuevo San Carlos": [
      "Nuevo San Carlos"
    ],
    "Retalhuleu": [
      "Retalhuleu"
    ],
    "San Andres Villa Seca": [
      "San Andres Villa Seca"
    ],
    "San Felipe": [
      "San Felipe"
    ],
    "San Martin Zapotitlan": [
      "San Martin Zapotitlan"
    ],
    "San Sebastian": [
      "San Sebastian"
    ],
    "Santa Cruz Mulua": [
      "Santa Cruz Mulua"
    ]
  },
  "Sacatepéquez": {
    "Alotenango": [
      "Alotenango"
    ],
    "Antigua Guatemala": [
      "Antigua Guatemala"
    ],
    "Ciudad Vieja": [
      "Ciudad Vieja"
    ],
    "Jocotenango": [
      "Jocotenango"
    ],
    "Magdalena Milpas Altas": [
      "Magdalena Milpas Altas"
    ],
    "Pastores": [
      "Pastores"
    ],
    "San Antonio Aguas Calientes": [
      "San Antonio Aguas Calientes"
    ],
    "San Bartolome Milpas Altas": [
      "San Bartolome Milpas Altas"
    ],
    "San Juan Alotenango": [
      "San Juan Alotenango"
    ],
    "San Lucas Sacatepequez": [
      "San Lucas Sacatepequez"
    ],
    "San Miguel Duenas": [
      "San Miguel Duenas"
    ],
    "Santa Catarina Barahona": [
      "Santa Catarina Barahona"
    ],
    "Santa Lucia Milpas Altas": [
      "Santa Lucia Milpas Altas"
    ],
    "Santa Maria De Jesus": [
      "Santa Maria De Jesus"
    ],
    "Santiago Sacatepequez": [
      "Santiago Sacatepequez"
    ],
    "Santo Domingo Xenacoj": [
      "Santo Domingo Xenacoj"
    ],
    "Sumpango": [
      "Sumpango"
    ]
  },
  "San Marcos": {
    "Ayutla": [
      "Ayutla"
    ],
    "Catarina": [
      "Catarina"
    ],
    "Comitancillo": [
      "Comitancillo"
    ],
    "Concepcion Tutuapa": [
      "Concepcion Tutuapa"
    ],
    "El Quetzal": [
      "El Quetzal"
    ],
    "El Rodeo": [
      "El Rodeo"
    ],
    "El Tumbador": [
      "El Tumbador"
    ],
    "Esquipulas Palo Gordo": [
      "Esquipulas Palo Gordo"
    ],
    "Ixchiguan": [
      "Ixchiguan"
    ],
    "La Blanca": [
      "La Blanca"
    ],
    "La Reforma": [
      "La Reforma"
    ],
    "Malacatan": [
      "Malacatan"
    ],
    "Nuevo Progreso": [
      "Nuevo Progreso"
    ],
    "Ocos": [
      "Ocos"
    ],
    "Pajapita": [
      "Pajapita"
    ],
    "Rio Blanco": [
      "Rio Blanco"
    ],
    "San Antonio Sacatepequez": [
      "San Antonio Sacatepequez"
    ],
    "San Cristobal Cucho": [
      "San Cristobal Cucho"
    ],
    "San Jose Ojetenam": [
      "San Jose Ojetenam"
    ],
    "San Lorenzo": [
      "San Lorenzo"
    ],
    "San Marcos": [
      "San Marcos"
    ],
    "San Miguel Ixtahuacan": [
      "San Miguel Ixtahuacan"
    ],
    "San Pablo": [
      "San Pablo"
    ],
    "San Pedro Sacatepequez": [
      "San Pedro Sacatepequez"
    ],
    "San Rafael Pie De La Cuesta": [
      "San Rafael Pie De La Cuesta"
    ],
    "Sibinal": [
      "Sibinal"
    ],
    "Sipacapa": [
      "Sipacapa"
    ],
    "Tacana": [
      "Tacana"
    ],
    "Tajumulco": [
      "Tajumulco"
    ],
    "Tejutla": [
      "Tejutla"
    ]
  },
  "Santa Rosa": {
    "Barberena": [
      "Barberena"
    ],
    "Casillas": [
      "Casillas"
    ],
    "Chiquimulilla": [
      "Chiquimulilla"
    ],
    "Cuilapa": [
      "Cuilapa"
    ],
    "Guazacapan": [
      "Guazacapan"
    ],
    "Nueva Santa Rosa": [
      "Nueva Santa Rosa"
    ],
    "Oratorio": [
      "Oratorio"
    ],
    "Pueblo Nuevo Vinas": [
      "Pueblo Nuevo Vinas"
    ],
    "San Juan Tecuaco": [
      "San Juan Tecuaco"
    ],
    "San Rafael Las Flores": [
      "San Rafael Las Flores"
    ],
    "Santa Cruz Naranjo": [
      "Santa Cruz Naranjo"
    ],
    "Santa Maria Ixhuatan": [
      "Santa Maria Ixhuatan"
    ],
    "Santa Rosa De Lima": [
      "Santa Rosa De Lima"
    ],
    "Taxisco": [
      "Taxisco"
    ]
  },
  "Solola": {
    "Concepcion": [
      "Concepcion"
    ],
    "Nahuala": [
      "Nahuala"
    ],
    "Panajachel": [
      "Panajachel"
    ],
    "San Andres Semetabaj": [
      "San Andres Semetabaj"
    ],
    "San Antonio Palopo": [
      "San Antonio Palopo"
    ],
    "San Jose Chacaya": [
      "San Jose Chacaya"
    ],
    "San Juan La Laguna": [
      "San Juan La Laguna"
    ],
    "San Lucas Toliman": [
      "San Lucas Toliman"
    ],
    "San Marcos La Laguna": [
      "San Marcos La Laguna"
    ],
    "San Pablo La Laguna": [
      "San Pablo La Laguna"
    ],
    "San Pedro La Laguna": [
      "San Pedro La Laguna"
    ],
    "Santa Catarina Ixtahuacan": [
      "Santa Catarina Ixtahuacan"
    ],
    "Santa Catarina Palopo": [
      "Santa Catarina Palopo"
    ],
    "Santa Clara La Laguna": [
      "Santa Clara La Laguna"
    ],
    "Santa Cruz La Laguna": [
      "Santa Cruz La Laguna"
    ],
    "Santa Lucia Utatlan": [
      "Santa Lucia Utatlan"
    ],
    "Santa Maria Visitacion": [
      "Santa Maria Visitacion"
    ],
    "Santiago Atitlan": [
      "Santiago Atitlan"
    ],
    "Solola": [
      "Solola"
    ]
  },
  "Suchitepéquez": {
    "Chicacao": [
      "Chicacao"
    ],
    "Cuyotenango": [
      "Cuyotenango"
    ],
    "Mazatenango": [
      "Mazatenango"
    ],
    "Patulul": [
      "Patulul"
    ],
    "Pueblo Nuevo": [
      "Pueblo Nuevo"
    ],
    "Rio Bravo": [
      "Rio Bravo"
    ],
    "Samayac": [
      "Samayac"
    ],
    "San Antonio Suchitepequez": [
      "San Antonio Suchitepequez"
    ],
    "San Bernardino": [
      "San Bernardino"
    ],
    "San Francisco Zapotitlan": [
      "San Francisco Zapotitlan"
    ],
    "San Gabriel": [
      "San Gabriel"
    ],
    "San Jose El Idolo": [
      "San Jose El Idolo"
    ],
    "San Jose La Maquina": [
      "San Jose La Maquina"
    ],
    "San Juan Bautista": [
      "San Juan Bautista"
    ],
    "San Lorenzo Suchitepequez": [
      "San Lorenzo Suchitepequez"
    ],
    "San Miguel Panan": [
      "San Miguel Panan"
    ],
    "San Pablo Jocopilas": [
      "San Pablo Jocopilas"
    ],
    "Santa Barbara": [
      "Santa Barbara"
    ],
    "Santo Domingo Suchitepequez": [
      "Santo Domingo Suchitepequez"
    ],
    "Santo Tomas La Union": [
      "Santo Tomas La Union"
    ],
    "Zunilito": [
      "Zunilito"
    ]
  },
  "Totonicapán": {
    "Momostenango": [
      "Momostenango"
    ],
    "San Andres Xecul": [
      "San Andres Xecul"
    ],
    "San Bartolo": [
      "San Bartolo"
    ],
    "San Cristobal Totonicapan": [
      "San Cristobal Totonicapan"
    ],
    "San Francisco El Alto": [
      "San Francisco El Alto"
    ],
    "Santa Lucia La Reforma": [
      "Santa Lucia La Reforma"
    ],
    "Santa Maria Chiquimula": [
      "Santa Maria Chiquimula"
    ],
    "Totonicapan": [
      "Totonicapan"
    ]
  },
  "Zacapa": {
    "Cabanas": [
      "Cabanas"
    ],
    "Estanzuela": [
      "Estanzuela"
    ],
    "Gualan": [
      "Gualan"
    ],
    "Huite": [
      "Huite"
    ],
    "La Union": [
      "La Union"
    ],
    "Rio Hondo": [
      "Rio Hondo"
    ],
    "San Diego": [
      "San Diego"
    ],
    "San Jorge": [
      "San Jorge"
    ],
    "Teculutan": [
      "Teculutan"
    ],
    "Usumatlan": [
      "Usumatlan"
    ],
    "Zacapa": [
      "Zacapa"
    ]
  }
};


/** Costa Rica — departamentos / municipios / ciudades from Fufills COD coverage. */
export const GEO_CR: LatamGeoTree = {
  "Alajuela": {
    "Alajuela": [
      "Alajuela",
      "Carrizal",
      "Desamparados",
      "Garita",
      "Guácima",
      "Río Segundo",
      "Sabanilla",
      "San Antonio",
      "San Isidro",
      "San José",
      "San Rafael",
      "Tambor",
      "Turrúcares"
    ],
    "Atenas": [
      "Atenas",
      "Concepción",
      "Escobal",
      "Jesús",
      "Mercedes",
      "San Isidro",
      "San José",
      "Santa Eulalia"
    ],
    "Grecia": [
      "Bolivar",
      "Grecia",
      "Puente De Piedra",
      "San Isidro",
      "San José",
      "San Roque",
      "Tacares"
    ],
    "Naranjo": [
      "Cirrí Sur",
      "El Rosario",
      "Naranjo",
      "Palmitos",
      "San Jerónimo",
      "San José",
      "San Juan",
      "San Miguel"
    ],
    "Orotina": [
      "Coyolar",
      "El Mastate",
      "Hacienda Vieja",
      "La Ceiba",
      "Orotina"
    ],
    "Palmares": [
      "Buenos Aires",
      "Candelaria",
      "Esquipulas",
      "La Granja",
      "Palmares",
      "Santiago",
      "Zaragoza"
    ],
    "Poás": [
      "Carrillos",
      "Sabana Redonda",
      "San Juan",
      "San Pedro",
      "San Rafael"
    ],
    "San Carlos": [
      "Florencia",
      "La Fortuna",
      "Quesada"
    ],
    "San Mateo": [
      "Desmonte",
      "Jesús María",
      "Labrador",
      "San Mateo"
    ],
    "San Ramón": [
      "Alfaro",
      "Ángeles",
      "Concepción",
      "Piedades Norte",
      "Piedades Sur",
      "San Isidro",
      "San Juan",
      "San Rafael",
      "San Ramón",
      "Santiago",
      "Volio"
    ],
    "Sarchí": [
      "Rodríguez",
      "San Pedro",
      "Sarchí Norte",
      "Sarchí Sur"
    ],
    "Zarcero": [
      "Guadalupe",
      "Zarcero"
    ]
  },
  "Cartago": {
    "Alvarado": [
      "Capellades",
      "Cervantes",
      "Pacayas"
    ],
    "Cartago": [
      "Aguacaliente o San Francisco",
      "Carmen",
      "Corralillo",
      "Dulce Nombre",
      "Guadalupe o Arenilla",
      "Llano Grande",
      "Occidental",
      "Oriental",
      "Quebradilla",
      "San Nicolás",
      "Tierra Blanca"
    ],
    "El Guarco": [
      "El Tejar",
      "San Isidro",
      "Tobosi"
    ],
    "Jiménez": [
      "Juan Viñas",
      "La Victoria",
      "Pejibaye",
      "Tucurrique"
    ],
    "La Unión": [
      "Concepción",
      "Dulce Nombre",
      "Río Azul",
      "San Diego",
      "San Juan",
      "San Rafael",
      "San Ramón",
      "Tres Ríos"
    ],
    "Oreamuno": [
      "Cipreses",
      "Cot",
      "Potrero Cerrado",
      "San Rafael",
      "Santa Rosa"
    ],
    "Paraíso": [
      "Birrisito",
      "Cachí",
      "Llanos De Santa Lucía",
      "Orosi",
      "Paraíso",
      "Santiago"
    ],
    "Turrialba": [
      "La Isabel",
      "La Suiza",
      "Pavones",
      "Peralta",
      "Santa Cruz",
      "Santa Rosa",
      "Santa Teresita",
      "Tayutic",
      "Tres Equis",
      "Tuis",
      "Turrialba"
    ]
  },
  "Guanacaste": {
    "Bagaces": [
      "Bagaces",
      "La Fortuna",
      "Mogote"
    ],
    "Carrillo": [
      "Belén",
      "Filadelfia",
      "Palmira",
      "Sardinal"
    ],
    "La Cruz": [
      "La Cruz",
      "Santa Elena"
    ],
    "Liberia": [
      "Cañas Dulces",
      "Curubandé",
      "Liberia",
      "Mayorga",
      "Nacascolo"
    ],
    "Santa Cruz": [
      "Cartagena"
    ]
  },
  "Heredia": {
    "Barva": [
      "Barva",
      "Puente Salas",
      "San José De La Montaña",
      "San Pablo",
      "San Pedro",
      "San Roque",
      "Santa Lucía"
    ],
    "Belén": [
      "La Asunción",
      "La Ribera",
      "San Antonio"
    ],
    "Flores": [
      "Barrantes",
      "Llorente",
      "San Joaquín"
    ],
    "Heredia": [
      "Heredia",
      "Mercedes",
      "San Francisco",
      "Ulloa"
    ],
    "San Isidro": [
      "Concepción",
      "San Francisco",
      "San Isidro",
      "San José"
    ],
    "San Pablo": [
      "Rincón de Sabanilla",
      "San Pablo"
    ],
    "San Rafael": [
      "Ángeles",
      "Concepción",
      "San Josecito",
      "San Rafael",
      "Santiago"
    ],
    "Santa Bárbara": [
      "Jesús",
      "Purabá",
      "San Juan",
      "San Pedro",
      "Santa Bárbara",
      "Santo Domingo"
    ],
    "Santo Domingo": [
      "Pará",
      "Paracito",
      "San Miguel",
      "San Vicente",
      "Santa Rosa",
      "Santo Domingo",
      "Santo Tomás",
      "Tures"
    ]
  },
  "Limón": {
    "Guácimo": [
      "Guácimo",
      "Mercedes",
      "Pocora"
    ],
    "Limón": [
      "Limón"
    ],
    "Pococí": [
      "Guápiles",
      "Jiménez",
      "La Colonia"
    ]
  },
  "Puntarenas": {
    "Esparza": [
      "Caldera",
      "Espíritu Santo",
      "Macacona",
      "San Jerónimo",
      "San Juan Grande",
      "San Rafael"
    ],
    "Montes De Oro": [
      "La Unión",
      "Miramar",
      "San Isidro"
    ],
    "Puntarenas": [
      "Acapulco",
      "Barranca",
      "Chacarita",
      "Chomes",
      "El Roble",
      "Guacimal",
      "Pitahaya",
      "Puntarenas"
    ]
  },
  "San José": {
    "Acosta": [
      "Guaitil",
      "Palmichal",
      "San Ignacio"
    ],
    "Alajuelita": [
      "Alajuelita",
      "Concepción",
      "San Antonio",
      "San Felipe",
      "San Josecito"
    ],
    "Aserrí": [
      "Aserrí",
      "Salitrillos",
      "San Gabriel",
      "Tarbaca",
      "Vuelta De Jorco"
    ],
    "Curridabat": [
      "Curridabat",
      "Granadilla",
      "Sánchez",
      "Tirrases"
    ],
    "Desamparados": [
      "Damas",
      "Desamparados",
      "Frailes",
      "Gravilias",
      "Los Guido",
      "Patarrá",
      "Rosario",
      "San Antonio",
      "San Juan De Dios",
      "San Miguel",
      "San Rafael Abajo",
      "San Rafael Arriba"
    ],
    "Escazú": [
      "Escazú",
      "San Antonio",
      "San Rafael"
    ],
    "Goicoechea": [
      "Calle Blancos",
      "Guadalupe",
      "Ipís",
      "Mata De Plátano",
      "Purral",
      "Rancho Redondo",
      "San Francisco"
    ],
    "Montes De Oca": [
      "Mercedes",
      "Sabanilla",
      "San Pedro",
      "San Rafael"
    ],
    "Mora": [
      "Colón",
      "Guayabo",
      "Jaris",
      "Quitirrisí",
      "Tabarcia"
    ],
    "Moravia": [
      "La Trinidad",
      "San Jerónimo",
      "San Vicente"
    ],
    "Puriscal": [
      "Barbacoas",
      "Candelarita",
      "Desamparaditos",
      "San Antonio",
      "San Rafael",
      "Santiago"
    ],
    "Pérez Zeledón": [
      "Cajón",
      "Daniel Flores",
      "El General",
      "Páramo",
      "Platanares",
      "Rivas",
      "San Isidro De El General"
    ],
    "San José": [
      "Carmen",
      "Catedral",
      "Hatillo",
      "Hospital",
      "Mata Redonda",
      "Merced",
      "Pavas",
      "San Francisco De Dos Ríos",
      "San Sebastián",
      "Uruca",
      "Zapote"
    ],
    "Santa Ana": [
      "Brasil",
      "Piedades",
      "Pozos",
      "Salitral",
      "Santa Ana",
      "Uruca"
    ],
    "Tibás": [
      "Anselmo Llorente",
      "Cinco Esquinas",
      "Colima",
      "León XIII",
      "San Juan"
    ],
    "Turrubares": [
      "San Juan De Mata",
      "San Luis"
    ],
    "Vázquez De Coronado": [
      "Cascajal",
      "Dulce Nombre De Jesús",
      "Patalillo",
      "San Isidro",
      "San Rafael"
    ]
  }
};


/** Honduras — departamentos / municipios from Fufills COD coverage. */
export const GEO_HN: LatamGeoTree = {
  "Atlántida": {
    "Arizona": [
      "Arizona"
    ],
    "El Porvenir": [
      "El Porvenir"
    ],
    "Esparta": [
      "Esparta"
    ],
    "Jutiapa": [
      "Jutiapa"
    ],
    "La Ceiba": [
      "La Ceiba"
    ],
    "La Masica": [
      "La Masica"
    ],
    "San Francisco": [
      "San Francisco"
    ],
    "Tela": [
      "Tela"
    ]
  },
  "Choluteca": {
    "Apacilagua": [
      "Apacilagua"
    ],
    "Choluteca": [
      "Choluteca"
    ],
    "Concepcion De Maria": [
      "Concepcion De Maria"
    ],
    "Duyure": [
      "Duyure"
    ],
    "El Corpus": [
      "El Corpus"
    ],
    "El Triunfo": [
      "El Triunfo"
    ],
    "Marcovia": [
      "Marcovia"
    ],
    "Morolica": [
      "Morolica"
    ],
    "Namasiguee": [
      "Namasiguee"
    ],
    "Orocuina": [
      "Orocuina"
    ],
    "Pespire": [
      "Pespire"
    ],
    "San Antonio De Flores": [
      "San Antonio De Flores"
    ],
    "San Isidro": [
      "San Isidro"
    ],
    "San Jose": [
      "San Jose"
    ],
    "San Marcos De Colon": [
      "San Marcos De Colon"
    ],
    "Santa Ana De Yusguare": [
      "Santa Ana De Yusguare"
    ]
  },
  "Colón": {
    "Balfate": [
      "Balfate"
    ],
    "Bonito Oriental": [
      "Bonito Oriental"
    ],
    "Iriona": [
      "Iriona"
    ],
    "Limon": [
      "Limon"
    ],
    "Saba": [
      "Saba"
    ],
    "Santa Fe": [
      "Santa Fe"
    ],
    "Santa Rosa De Aguan": [
      "Santa Rosa De Aguan"
    ],
    "Sonaguera": [
      "Sonaguera"
    ],
    "Tocoa": [
      "Tocoa"
    ],
    "Trujillo": [
      "Trujillo"
    ]
  },
  "Comayagua": {
    "Ajuterique": [
      "Ajuterique"
    ],
    "Comayagua": [
      "Comayagua"
    ],
    "El Rosario": [
      "El Rosario"
    ],
    "Esquias": [
      "Esquias"
    ],
    "Humuya": [
      "Humuya"
    ],
    "La Libertad": [
      "La Libertad"
    ],
    "La Trinidad": [
      "La Trinidad"
    ],
    "Lamani": [
      "Lamani"
    ],
    "Las Lajas": [
      "Las Lajas"
    ],
    "Lejamani": [
      "Lejamani"
    ],
    "Meambar": [
      "Meambar"
    ],
    "Minas De Oro": [
      "Minas De Oro"
    ],
    "Ojos De Agua": [
      "Ojos De Agua"
    ],
    "San Jeronimo": [
      "San Jeronimo"
    ],
    "San Jose De Comayagua": [
      "San Jose De Comayagua"
    ],
    "San Jose Del Potrero": [
      "San Jose Del Potrero"
    ],
    "San Luis": [
      "San Luis"
    ],
    "San Sebastian": [
      "San Sebastian"
    ],
    "Siguatepeque": [
      "Siguatepeque"
    ],
    "Taulabe": [
      "Taulabe"
    ],
    "Villa De San Antonio": [
      "Villa De San Antonio"
    ]
  },
  "Copán": {
    "Cabanas": [
      "Cabanas"
    ],
    "Concepcion": [
      "Concepcion"
    ],
    "Copan Ruinas": [
      "Copan Ruinas"
    ],
    "Corquin": [
      "Corquin"
    ],
    "Cucuyagua": [
      "Cucuyagua"
    ],
    "Dolores": [
      "Dolores"
    ],
    "Dulce Nombre": [
      "Dulce Nombre"
    ],
    "El Paraiso": [
      "El Paraiso"
    ],
    "Florida": [
      "Florida"
    ],
    "La Jigua": [
      "La Jigua"
    ],
    "La Union": [
      "La Union"
    ],
    "Nueva Arcadia": [
      "Nueva Arcadia"
    ],
    "San Agustin": [
      "San Agustin"
    ],
    "San Antonio": [
      "San Antonio"
    ],
    "San Jeronimo": [
      "San Jeronimo"
    ],
    "San Jose": [
      "San Jose"
    ],
    "San Juan De Opoa": [
      "San Juan De Opoa"
    ],
    "San Nicolas": [
      "San Nicolas"
    ],
    "San Pedro De Copan": [
      "San Pedro De Copan"
    ],
    "Santa Rita": [
      "Santa Rita"
    ],
    "Santa Rosa De Copan": [
      "Santa Rosa De Copan"
    ],
    "Trinidad De Copan": [
      "Trinidad De Copan"
    ],
    "Veracruz": [
      "Veracruz"
    ]
  },
  "Cortés": {
    "Choloma": [
      "Choloma"
    ],
    "La Lima": [
      "La Lima"
    ],
    "Omoa": [
      "Omoa"
    ],
    "Pimienta": [
      "Pimienta"
    ],
    "Potrerillos": [
      "Potrerillos"
    ],
    "Puerto Cortes": [
      "Puerto Cortes"
    ],
    "San Antonio De Cortes": [
      "San Antonio De Cortes"
    ],
    "San Francisco De Yojoa": [
      "San Francisco De Yojoa"
    ],
    "San Manuel": [
      "San Manuel"
    ],
    "San Pedro Sula": [
      "San Pedro Sula"
    ],
    "Santa Cruz De Yojoa": [
      "Santa Cruz De Yojoa"
    ],
    "Villanueva": [
      "Villanueva"
    ]
  },
  "El Paraíso": {
    "Alauca": [
      "Alauca"
    ],
    "Danli": [
      "Danli"
    ],
    "El Paraiso": [
      "El Paraiso"
    ],
    "Gueinope": [
      "Gueinope"
    ],
    "Jacaleapa": [
      "Jacaleapa"
    ],
    "Liure": [
      "Liure"
    ],
    "Moroceli": [
      "Moroceli"
    ],
    "Oropoli": [
      "Oropoli"
    ],
    "Potrerillos": [
      "Potrerillos"
    ],
    "San Antonio De Flores": [
      "San Antonio De Flores"
    ],
    "San Lucas": [
      "San Lucas"
    ],
    "San Matias": [
      "San Matias"
    ],
    "Soledad": [
      "Soledad"
    ],
    "Teupasenti": [
      "Teupasenti"
    ],
    "Texiguat": [
      "Texiguat"
    ],
    "Trojes": [
      "Trojes"
    ],
    "Vado Ancho": [
      "Vado Ancho"
    ],
    "Yauyupe": [
      "Yauyupe"
    ],
    "Yuscaran": [
      "Yuscaran"
    ]
  },
  "Francisco Morazán": {
    "Alubaren": [
      "Alubaren"
    ],
    "Cedros": [
      "Cedros"
    ],
    "Curaren": [
      "Curaren"
    ],
    "El Porvenir": [
      "El Porvenir"
    ],
    "Guaimaca": [
      "Guaimaca"
    ],
    "La Libertad": [
      "La Libertad"
    ],
    "La Venta": [
      "La Venta"
    ],
    "Lepaterique": [
      "Lepaterique"
    ],
    "Maraita": [
      "Maraita"
    ],
    "Marale": [
      "Marale"
    ],
    "Nueva Armenia": [
      "Nueva Armenia"
    ],
    "Ojojona": [
      "Ojojona"
    ],
    "Orica": [
      "Orica"
    ],
    "Reitoca": [
      "Reitoca"
    ],
    "Sabanagrande": [
      "Sabanagrande"
    ],
    "San Antonio De Oriente": [
      "San Antonio De Oriente"
    ],
    "San Buenaventura": [
      "San Buenaventura"
    ],
    "San Ignacio": [
      "San Ignacio"
    ],
    "San Juan De Flores": [
      "San Juan De Flores"
    ],
    "San Miguelito": [
      "San Miguelito"
    ],
    "Santa Ana": [
      "Santa Ana"
    ],
    "Santa Lucia": [
      "Santa Lucia"
    ],
    "Talanga": [
      "Talanga"
    ],
    "Tatumbla": [
      "Tatumbla"
    ],
    "Tegucigalpa": [
      "Tegucigalpa"
    ],
    "Valle De Angeles": [
      "Valle De Angeles"
    ],
    "Vallecillo": [
      "Vallecillo"
    ],
    "Villa De San Francisco": [
      "Villa De San Francisco"
    ]
  },
  "Gracias a Dios": {
    "Ahuas": [
      "Ahuas"
    ],
    "Brus Laguna": [
      "Brus Laguna"
    ],
    "Juan Francisco Bulnes": [
      "Juan Francisco Bulnes"
    ],
    "Puerto Lempira": [
      "Puerto Lempira"
    ],
    "Villeda Morales": [
      "Villeda Morales"
    ],
    "Wampusirpe": [
      "Wampusirpe"
    ]
  },
  "Intibucá": {
    "Camasca": [
      "Camasca"
    ],
    "Colomoncagua": [
      "Colomoncagua"
    ],
    "Concepcion": [
      "Concepcion"
    ],
    "Dolores": [
      "Dolores"
    ],
    "Intibuca": [
      "Intibuca"
    ],
    "Jesus De Otoro": [
      "Jesus De Otoro"
    ],
    "La Esperanza": [
      "La Esperanza"
    ],
    "Magdalena": [
      "Magdalena"
    ],
    "Masaguara": [
      "Masaguara"
    ],
    "San Antonio": [
      "San Antonio"
    ],
    "San Francisco De Opalaca": [
      "San Francisco De Opalaca"
    ],
    "San Isidro": [
      "San Isidro"
    ],
    "San Juan": [
      "San Juan"
    ],
    "San Marcos De La Sierra": [
      "San Marcos De La Sierra"
    ],
    "San Miguelito": [
      "San Miguelito"
    ],
    "Santa Lucia": [
      "Santa Lucia"
    ],
    "Yamaranguila": [
      "Yamaranguila"
    ]
  },
  "Islas de la Bahía": {
    "Guanaja": [
      "Guanaja"
    ],
    "Jose Santos Guardiola": [
      "Jose Santos Guardiola"
    ],
    "Roatan": [
      "Roatan"
    ],
    "Utila": [
      "Utila"
    ]
  },
  "La Paz": {
    "Aguanqueterique": [
      "Aguanqueterique"
    ],
    "Cabanas": [
      "Cabanas"
    ],
    "Cane": [
      "Cane"
    ],
    "Chinacla": [
      "Chinacla"
    ],
    "Guajiquiro": [
      "Guajiquiro"
    ],
    "La Paz": [
      "La Paz"
    ],
    "Lauterique": [
      "Lauterique"
    ],
    "Marcala": [
      "Marcala"
    ],
    "Mercedes De Oriente": [
      "Mercedes De Oriente"
    ],
    "Opatoro": [
      "Opatoro"
    ],
    "San Antonio Del Norte": [
      "San Antonio Del Norte"
    ],
    "San Jose": [
      "San Jose"
    ],
    "San Juan": [
      "San Juan"
    ],
    "San Pedro De Tutule": [
      "San Pedro De Tutule"
    ],
    "Santa Ana": [
      "Santa Ana"
    ],
    "Santa Elena": [
      "Santa Elena"
    ],
    "Santa Maria": [
      "Santa Maria"
    ],
    "Santiago De Puringla": [
      "Santiago De Puringla"
    ],
    "Yarula": [
      "Yarula"
    ]
  },
  "Lempira": {
    "Belen": [
      "Belen"
    ],
    "Candelaria": [
      "Candelaria"
    ],
    "Cololaca": [
      "Cololaca"
    ],
    "Erandique": [
      "Erandique"
    ],
    "Gracias": [
      "Gracias"
    ],
    "Gualcince": [
      "Gualcince"
    ],
    "Guarita": [
      "Guarita"
    ],
    "La Campa": [
      "La Campa"
    ],
    "La Iguala": [
      "La Iguala"
    ],
    "La Union": [
      "La Union"
    ],
    "La Virtud": [
      "La Virtud"
    ],
    "Las Flores": [
      "Las Flores"
    ],
    "Lepaera": [
      "Lepaera"
    ],
    "Mapulaca": [
      "Mapulaca"
    ],
    "Piraera": [
      "Piraera"
    ],
    "San Andres": [
      "San Andres"
    ],
    "San Francisco": [
      "San Francisco"
    ],
    "San Juan Guarita": [
      "San Juan Guarita"
    ],
    "San Manuel Colohete": [
      "San Manuel Colohete"
    ],
    "San Marcos De Caiquin": [
      "San Marcos De Caiquin"
    ],
    "San Rafael": [
      "San Rafael"
    ],
    "San Sebastian": [
      "San Sebastian"
    ],
    "Santa Cruz": [
      "Santa Cruz"
    ],
    "Talgua": [
      "Talgua"
    ],
    "Tambla": [
      "Tambla"
    ],
    "Tomala": [
      "Tomala"
    ],
    "Valladolid": [
      "Valladolid"
    ],
    "Virginia": [
      "Virginia"
    ]
  },
  "Ocotepeque": {
    "Belen Gualcho": [
      "Belen Gualcho"
    ],
    "Concepcion": [
      "Concepcion"
    ],
    "Dolores Merendon": [
      "Dolores Merendon"
    ],
    "Fraternidad": [
      "Fraternidad"
    ],
    "La Encarnacion": [
      "La Encarnacion"
    ],
    "La Labor": [
      "La Labor"
    ],
    "Lucerna": [
      "Lucerna"
    ],
    "Mercedes": [
      "Mercedes"
    ],
    "Ocotepeque": [
      "Ocotepeque"
    ],
    "San Fernando": [
      "San Fernando"
    ],
    "San Francisco Del Valle": [
      "San Francisco Del Valle"
    ],
    "San Jorge": [
      "San Jorge"
    ],
    "San Marcos": [
      "San Marcos"
    ],
    "Santa Fe": [
      "Santa Fe"
    ],
    "Sensenti": [
      "Sensenti"
    ],
    "Sinuapa": [
      "Sinuapa"
    ]
  },
  "Olancho": {
    "Campamento": [
      "Campamento"
    ],
    "Catacamas": [
      "Catacamas"
    ],
    "Concordia": [
      "Concordia"
    ],
    "Dulce Nombre De Culmi": [
      "Dulce Nombre De Culmi"
    ],
    "El Rosario": [
      "El Rosario"
    ],
    "Esquipulas Del Norte": [
      "Esquipulas Del Norte"
    ],
    "Gualaco": [
      "Gualaco"
    ],
    "Guarizama": [
      "Guarizama"
    ],
    "Guata": [
      "Guata"
    ],
    "Guayape": [
      "Guayape"
    ],
    "Jano": [
      "Jano"
    ],
    "Juticalpa": [
      "Juticalpa"
    ],
    "La Union": [
      "La Union"
    ],
    "Mangulile": [
      "Mangulile"
    ],
    "Manto": [
      "Manto"
    ],
    "Patuca": [
      "Patuca"
    ],
    "Salama": [
      "Salama"
    ],
    "San Esteban": [
      "San Esteban"
    ],
    "San Francisco De Becerra": [
      "San Francisco De Becerra"
    ],
    "San Francisco De La Paz": [
      "San Francisco De La Paz"
    ],
    "Santa Maria Del Real": [
      "Santa Maria Del Real"
    ],
    "Silca": [
      "Silca"
    ],
    "Yocon": [
      "Yocon"
    ]
  },
  "Santa Bárbara": {
    "Arada": [
      "Arada"
    ],
    "Atima": [
      "Atima"
    ],
    "Azacualpa": [
      "Azacualpa"
    ],
    "Ceguaca": [
      "Ceguaca"
    ],
    "Chinda": [
      "Chinda"
    ],
    "Concepcion Del Norte": [
      "Concepcion Del Norte"
    ],
    "Concepcion Del Sur": [
      "Concepcion Del Sur"
    ],
    "El Nispero": [
      "El Nispero"
    ],
    "Gualala": [
      "Gualala"
    ],
    "Ilama": [
      "Ilama"
    ],
    "Las Vegas": [
      "Las Vegas"
    ],
    "Macuelizo": [
      "Macuelizo"
    ],
    "Naranjito": [
      "Naranjito"
    ],
    "Nueva Frontera": [
      "Nueva Frontera"
    ],
    "Nuevo Celilac": [
      "Nuevo Celilac"
    ],
    "Petoa": [
      "Petoa"
    ],
    "Proteccion": [
      "Proteccion"
    ],
    "Quimistan": [
      "Quimistan"
    ],
    "San Francisco De Ojuera": [
      "San Francisco De Ojuera"
    ],
    "San Jose De Las Colinas": [
      "San Jose De Las Colinas"
    ],
    "San Luis": [
      "San Luis"
    ],
    "San Marcos": [
      "San Marcos"
    ],
    "San Nicolas": [
      "San Nicolas"
    ],
    "San Pedro Zacapa": [
      "San Pedro Zacapa"
    ],
    "San Vicente Centenario": [
      "San Vicente Centenario"
    ],
    "Santa Barbara": [
      "Santa Barbara"
    ],
    "Santa Rita": [
      "Santa Rita"
    ],
    "Trinidad": [
      "Trinidad"
    ]
  },
  "Valle": {
    "Alianza": [
      "Alianza"
    ],
    "Amapala": [
      "Amapala"
    ],
    "Aramecina": [
      "Aramecina"
    ],
    "Caridad": [
      "Caridad"
    ],
    "Goascoran": [
      "Goascoran"
    ],
    "Langue": [
      "Langue"
    ],
    "Nacaome": [
      "Nacaome"
    ],
    "San Francisco De Coray": [
      "San Francisco De Coray"
    ],
    "San Lorenzo": [
      "San Lorenzo"
    ]
  },
  "Yoro": {
    "Arenal": [
      "Arenal"
    ],
    "El Negrito": [
      "El Negrito"
    ],
    "El Progreso": [
      "El Progreso"
    ],
    "Jocon": [
      "Jocon"
    ],
    "Morazan": [
      "Morazan"
    ],
    "Olanchito": [
      "Olanchito"
    ],
    "Santa Rita": [
      "Santa Rita"
    ],
    "Sulaco": [
      "Sulaco"
    ],
    "Victoria": [
      "Victoria"
    ],
    "Yorito": [
      "Yorito"
    ],
    "Yoro": [
      "Yoro"
    ]
  }
};


/** El Salvador — departamentos / municipios from Fufills COD coverage. */
export const GEO_SV: LatamGeoTree = {
  "Ahuachapán": {
    "Ahuachapán": [
      "Ahuachapán"
    ],
    "Apaneca": [
      "Apaneca"
    ],
    "Atiquizaya": [
      "Atiquizaya"
    ],
    "Concepción de Ataco": [
      "Concepción de Ataco"
    ],
    "El Refugio": [
      "El Refugio"
    ],
    "Guaymango": [
      "Guaymango"
    ],
    "Jujutla": [
      "Jujutla"
    ],
    "San Francisco Menéndez": [
      "San Francisco Menéndez"
    ],
    "San Lorenzo": [
      "San Lorenzo"
    ],
    "San Pedro Puxtla": [
      "San Pedro Puxtla"
    ],
    "Tacuba": [
      "Tacuba"
    ],
    "Turín": [
      "Turín"
    ]
  },
  "Cabañas": {
    "Cinquera": [
      "Cinquera"
    ],
    "Dolores": [
      "Dolores"
    ],
    "Guacotecti": [
      "Guacotecti"
    ],
    "Ilobasco": [
      "Ilobasco"
    ],
    "Jutiapa": [
      "Jutiapa"
    ],
    "San Isidro": [
      "San Isidro"
    ],
    "Sensuntepeque": [
      "Sensuntepeque"
    ],
    "Tejutepeque": [
      "Tejutepeque"
    ],
    "Victoria": [
      "Victoria"
    ]
  },
  "Chalatenango": {
    "Agua Caliente": [
      "Agua Caliente"
    ],
    "Arcatao": [
      "Arcatao"
    ],
    "Azacualpa": [
      "Azacualpa"
    ],
    "Cancasque": [
      "Cancasque"
    ],
    "Chalatenango": [
      "Chalatenango"
    ],
    "Citalá": [
      "Citalá"
    ],
    "Comalapa": [
      "Comalapa"
    ],
    "Concepción Quezaltepeque": [
      "Concepción Quezaltepeque"
    ],
    "Dulce Nombre de María": [
      "Dulce Nombre de María"
    ],
    "El Carrizal": [
      "El Carrizal"
    ],
    "El Paraíso": [
      "El Paraíso"
    ],
    "La Laguna": [
      "La Laguna"
    ],
    "La Palma": [
      "La Palma"
    ],
    "La Reina": [
      "La Reina"
    ],
    "Las Flores": [
      "Las Flores"
    ],
    "Las Vueltas": [
      "Las Vueltas"
    ],
    "Nombre de Jesús": [
      "Nombre de Jesús"
    ],
    "Nueva Concepción": [
      "Nueva Concepción"
    ],
    "Nueva Trinidad": [
      "Nueva Trinidad"
    ],
    "Ojos de Agua": [
      "Ojos de Agua"
    ],
    "Potonico": [
      "Potonico"
    ],
    "San Antonio Los Ranchos": [
      "San Antonio Los Ranchos"
    ],
    "San Antonio de la Cruz": [
      "San Antonio de la Cruz"
    ],
    "San Fernando": [
      "San Fernando"
    ],
    "San Francisco Lempa": [
      "San Francisco Lempa"
    ],
    "San Francisco Morazán": [
      "San Francisco Morazán"
    ],
    "San Ignacio": [
      "San Ignacio"
    ],
    "San Isidro Labrador": [
      "San Isidro Labrador"
    ],
    "San Luis del Carmen": [
      "San Luis del Carmen"
    ],
    "San Miguel de Mercedes": [
      "San Miguel de Mercedes"
    ],
    "San Rafael": [
      "San Rafael"
    ],
    "Santa Rita": [
      "Santa Rita"
    ],
    "Tejutla": [
      "Tejutla"
    ]
  },
  "Cuscatlán": {
    "Candelaria": [
      "Candelaria"
    ],
    "Cojutepeque": [
      "Cojutepeque"
    ],
    "El Carmen": [
      "El Carmen"
    ],
    "El Rosario": [
      "El Rosario"
    ],
    "Monte San Juan": [
      "Monte San Juan"
    ],
    "Oratorio de Concepción": [
      "Oratorio de Concepción"
    ],
    "San Bartolomé Perulapía": [
      "San Bartolomé Perulapía"
    ],
    "San Cristóbal": [
      "San Cristóbal"
    ],
    "San José Guayabal": [
      "San José Guayabal"
    ],
    "San Pedro Perulapán": [
      "San Pedro Perulapán"
    ],
    "San Rafael Cedros": [
      "San Rafael Cedros"
    ],
    "San Ramón": [
      "San Ramón"
    ],
    "Santa Cruz Analquito": [
      "Santa Cruz Analquito"
    ],
    "Santa Cruz Michapa": [
      "Santa Cruz Michapa"
    ],
    "Suchitoto": [
      "Suchitoto"
    ],
    "Tenancingo": [
      "Tenancingo"
    ]
  },
  "La Libertad": {
    "Antiguo Cuscatlán": [
      "Antiguo Cuscatlán"
    ],
    "Chiltiupán": [
      "Chiltiupán"
    ],
    "Ciudad Arce": [
      "Ciudad Arce"
    ],
    "Colón": [
      "Colón"
    ],
    "Comasagua": [
      "Comasagua"
    ],
    "Huizúcar": [
      "Huizúcar"
    ],
    "Jayaque": [
      "Jayaque"
    ],
    "Jicalapa": [
      "Jicalapa"
    ],
    "La Libertad": [
      "La Libertad"
    ],
    "Nuevo Cuscatlán": [
      "Nuevo Cuscatlán"
    ],
    "Puerto La Libertad": [
      "Puerto La Libertad"
    ],
    "Quezaltepeque": [
      "Quezaltepeque"
    ],
    "Sacacoyo": [
      "Sacacoyo"
    ],
    "San José Villanueva": [
      "San José Villanueva"
    ],
    "San Juan Opico": [
      "San Juan Opico"
    ],
    "San Matías": [
      "San Matías"
    ],
    "San Pablo Tacachico": [
      "San Pablo Tacachico"
    ],
    "Santa Tecla": [
      "Santa Tecla"
    ],
    "Talnique": [
      "Talnique"
    ],
    "Tamanique": [
      "Tamanique"
    ],
    "Teotepeque": [
      "Teotepeque"
    ],
    "Tepecoyo": [
      "Tepecoyo"
    ],
    "Zaragoza": [
      "Zaragoza"
    ]
  },
  "La Paz": {
    "Cuyultitán": [
      "Cuyultitán"
    ],
    "El Rosario": [
      "El Rosario"
    ],
    "Jerusalén": [
      "Jerusalén"
    ],
    "Mercedes La Ceiba": [
      "Mercedes La Ceiba"
    ],
    "Olocuilta": [
      "Olocuilta"
    ],
    "Paraíso de Osorio": [
      "Paraíso de Osorio"
    ],
    "San Antonio Masahuat": [
      "San Antonio Masahuat"
    ],
    "San Emigdio": [
      "San Emigdio"
    ],
    "San Francisco Chinameca": [
      "San Francisco Chinameca"
    ],
    "San Juan Nonualco": [
      "San Juan Nonualco"
    ],
    "San Juan Talpa": [
      "San Juan Talpa"
    ],
    "San Juan Tepezontes": [
      "San Juan Tepezontes"
    ],
    "San Luis La Herradura": [
      "San Luis La Herradura"
    ],
    "San Luis Talpa": [
      "San Luis Talpa"
    ],
    "San Miguel Tepezontes": [
      "San Miguel Tepezontes"
    ],
    "San Pedro Masahuat": [
      "San Pedro Masahuat"
    ],
    "San Pedro Nonualco": [
      "San Pedro Nonualco"
    ],
    "San Rafael Obrajuelo": [
      "San Rafael Obrajuelo"
    ],
    "Santa María Ostuma": [
      "Santa María Ostuma"
    ],
    "Santiago Nonualco": [
      "Santiago Nonualco"
    ],
    "Tapalhuaca": [
      "Tapalhuaca"
    ],
    "Zacatecoluca": [
      "Zacatecoluca"
    ]
  },
  "La Unión": {
    "Anamorós": [
      "Anamorós"
    ],
    "Bolívar": [
      "Bolívar"
    ],
    "Concepción de Oriente": [
      "Concepción de Oriente"
    ],
    "Conchagua": [
      "Conchagua"
    ],
    "El Carmen": [
      "El Carmen"
    ],
    "El Sauce": [
      "El Sauce"
    ],
    "Intipucá": [
      "Intipucá"
    ],
    "La Unión": [
      "La Unión"
    ],
    "Lislique": [
      "Lislique"
    ],
    "Meanguera Del Golfo": [
      "Meanguera Del Golfo"
    ],
    "Nueva Esparta": [
      "Nueva Esparta"
    ],
    "Pasaquina": [
      "Pasaquina"
    ],
    "Polorós": [
      "Polorós"
    ],
    "San Alejo": [
      "San Alejo"
    ],
    "San José": [
      "San José"
    ],
    "Santa Rosa de Lima": [
      "Santa Rosa de Lima"
    ],
    "Yayantique": [
      "Yayantique"
    ],
    "Yucuaiquín": [
      "Yucuaiquín"
    ]
  },
  "Morazán": {
    "Arambala": [
      "Arambala"
    ],
    "Cacaopera": [
      "Cacaopera"
    ],
    "Chilanga": [
      "Chilanga"
    ],
    "Corinto": [
      "Corinto"
    ],
    "Delicias de Concepción": [
      "Delicias de Concepción"
    ],
    "El Divisadero": [
      "El Divisadero"
    ],
    "El Rosario": [
      "El Rosario"
    ],
    "Gualococti": [
      "Gualococti"
    ],
    "Guatajiagua": [
      "Guatajiagua"
    ],
    "Joateca": [
      "Joateca"
    ],
    "Jocoaitique": [
      "Jocoaitique"
    ],
    "Jocoro": [
      "Jocoro"
    ],
    "Lolotiquillo": [
      "Lolotiquillo"
    ],
    "Meanguera": [
      "Meanguera"
    ],
    "Osicala": [
      "Osicala"
    ],
    "Perquín": [
      "Perquín"
    ],
    "San Carlos": [
      "San Carlos"
    ],
    "San Fernando": [
      "San Fernando"
    ],
    "San Francisco Gotera": [
      "San Francisco Gotera"
    ],
    "San Isidro": [
      "San Isidro"
    ],
    "San Simón": [
      "San Simón"
    ],
    "Sensembra": [
      "Sensembra"
    ],
    "Sociedad": [
      "Sociedad"
    ],
    "Torola": [
      "Torola"
    ],
    "Yamabal": [
      "Yamabal"
    ],
    "Yoloaiquín": [
      "Yoloaiquín"
    ]
  },
  "San Miguel": {
    "Carolina": [
      "Carolina"
    ],
    "Chapeltique": [
      "Chapeltique"
    ],
    "Chinameca": [
      "Chinameca"
    ],
    "Chirilagua": [
      "Chirilagua"
    ],
    "Ciudad Barrios": [
      "Ciudad Barrios"
    ],
    "Comacarán": [
      "Comacarán"
    ],
    "El Tránsito": [
      "El Tránsito"
    ],
    "Lolotique": [
      "Lolotique"
    ],
    "Moncagua": [
      "Moncagua"
    ],
    "Nueva Guadalupe": [
      "Nueva Guadalupe"
    ],
    "Nuevo Edén de San Juan": [
      "Nuevo Edén de San Juan"
    ],
    "Quelepa": [
      "Quelepa"
    ],
    "San Antonio del Mosco": [
      "San Antonio del Mosco"
    ],
    "San Gerardo": [
      "San Gerardo"
    ],
    "San Jorge": [
      "San Jorge"
    ],
    "San Luis de La Reina": [
      "San Luis de La Reina"
    ],
    "San Miguel": [
      "San Miguel"
    ],
    "San Rafael Oriente": [
      "San Rafael Oriente"
    ],
    "Sesori": [
      "Sesori"
    ],
    "Uluazapa": [
      "Uluazapa"
    ]
  },
  "San Salvador": {
    "Aguilares": [
      "Aguilares"
    ],
    "Apopa": [
      "Apopa"
    ],
    "Ayutuxtepeque": [
      "Ayutuxtepeque"
    ],
    "Cuscatancingo": [
      "Cuscatancingo"
    ],
    "Delgado": [
      "Delgado"
    ],
    "El Paisnal": [
      "El Paisnal"
    ],
    "Guazapa": [
      "Guazapa"
    ],
    "Ilopango": [
      "Ilopango"
    ],
    "Mejicanos": [
      "Mejicanos"
    ],
    "Nejapa": [
      "Nejapa"
    ],
    "Panchimalco": [
      "Panchimalco"
    ],
    "Rosario de Mora": [
      "Rosario de Mora"
    ],
    "San Marcos": [
      "San Marcos"
    ],
    "San Martín": [
      "San Martín"
    ],
    "San Salvador": [
      "San Salvador"
    ],
    "Santiago Texacuangos": [
      "Santiago Texacuangos"
    ],
    "Santo Tomás": [
      "Santo Tomás"
    ],
    "Soyapango": [
      "Soyapango"
    ],
    "Tonacatepeque": [
      "Tonacatepeque"
    ]
  },
  "San Vicente": {
    "Apastepeque": [
      "Apastepeque"
    ],
    "Guadalupe": [
      "Guadalupe"
    ],
    "San Cayetano Istepeque": [
      "San Cayetano Istepeque"
    ],
    "San Esteban Catarina": [
      "San Esteban Catarina"
    ],
    "San Idelfonso": [
      "San Idelfonso"
    ],
    "San Lorenzo": [
      "San Lorenzo"
    ],
    "San Sebastián": [
      "San Sebastián"
    ],
    "San Vicente": [
      "San Vicente"
    ],
    "Santa Clara": [
      "Santa Clara"
    ],
    "Santo Domingo": [
      "Santo Domingo"
    ],
    "Tecoluca": [
      "Tecoluca"
    ],
    "Tepetitán": [
      "Tepetitán"
    ],
    "Verapaz": [
      "Verapaz"
    ]
  },
  "Santa Ana": {
    "Candelaria De La Frontera": [
      "Candelaria De La Frontera"
    ],
    "Chalchuapa": [
      "Chalchuapa"
    ],
    "Coatepeque": [
      "Coatepeque"
    ],
    "El Congo": [
      "El Congo"
    ],
    "El Porvenir": [
      "El Porvenir"
    ],
    "Masahuat": [
      "Masahuat"
    ],
    "Metapán": [
      "Metapán"
    ],
    "San Antonio Pajonal": [
      "San Antonio Pajonal"
    ],
    "San Sebastián Salitrillo": [
      "San Sebastián Salitrillo"
    ],
    "Santa Ana": [
      "Santa Ana"
    ],
    "Santa Rosa Guachipilín": [
      "Santa Rosa Guachipilín"
    ],
    "Santiago de la Frontera": [
      "Santiago de la Frontera"
    ],
    "Texistepeque": [
      "Texistepeque"
    ]
  },
  "Sonsonate": {
    "Acajutla": [
      "Acajutla"
    ],
    "Armenia": [
      "Armenia"
    ],
    "Caluco": [
      "Caluco"
    ],
    "Cuisnahuat": [
      "Cuisnahuat"
    ],
    "Izalco": [
      "Izalco"
    ],
    "Juayúa": [
      "Juayúa"
    ],
    "Nahuizalco": [
      "Nahuizalco"
    ],
    "Nahulingo": [
      "Nahulingo"
    ],
    "Salcoatitán": [
      "Salcoatitán"
    ],
    "San Antonio del Monte": [
      "San Antonio del Monte"
    ],
    "San Julián": [
      "San Julián"
    ],
    "Santa Catarina Masahuat": [
      "Santa Catarina Masahuat"
    ],
    "Santa Isabel Ishuatán": [
      "Santa Isabel Ishuatán"
    ],
    "Santo Domingo de Guzmán": [
      "Santo Domingo de Guzmán"
    ],
    "Sonsonate": [
      "Sonsonate"
    ],
    "Sonzacate": [
      "Sonzacate"
    ]
  },
  "Usulután": {
    "Alegría": [
      "Alegría"
    ],
    "Berlín": [
      "Berlín"
    ],
    "California": [
      "California"
    ],
    "Concepción Batres": [
      "Concepción Batres"
    ],
    "El Triunfo": [
      "El Triunfo"
    ],
    "Ereguayquín": [
      "Ereguayquín"
    ],
    "Estanzuelas": [
      "Estanzuelas"
    ],
    "Jiquilisco": [
      "Jiquilisco"
    ],
    "Jucuapa": [
      "Jucuapa"
    ],
    "Jucuarán": [
      "Jucuarán"
    ],
    "Mercedes Umaña": [
      "Mercedes Umaña"
    ],
    "Nueva Granada": [
      "Nueva Granada"
    ],
    "Ozatlán": [
      "Ozatlán"
    ],
    "Puerto El Triunfo": [
      "Puerto El Triunfo"
    ],
    "San Agustín": [
      "San Agustín"
    ],
    "San Buenaventura": [
      "San Buenaventura"
    ],
    "San Dionisio": [
      "San Dionisio"
    ],
    "San Francisco Javier": [
      "San Francisco Javier"
    ],
    "Santa Elena": [
      "Santa Elena"
    ],
    "Santa María": [
      "Santa María"
    ],
    "Santiago de María": [
      "Santiago de María"
    ],
    "Tecapán": [
      "Tecapán"
    ],
    "Usulután": [
      "Usulután"
    ]
  }
};


/** Nicaragua — complete departamentos / municipios. */
export const GEO_NI: LatamGeoTree = {
  "Boaco": {
    "Boaco": [
      "Centro"
    ],
    "Camoapa": [
      "Centro"
    ],
    "San José de Los Remates": [
      "Centro"
    ],
    "San Lorenzo": [
      "Centro"
    ],
    "Santa Lucía": [
      "Centro"
    ],
    "Teustepe": [
      "Centro"
    ]
  },
  "Carazo": {
    "Diriamba": [
      "Centro"
    ],
    "Dolores": [
      "Centro"
    ],
    "El Rosario": [
      "Centro"
    ],
    "Jinotepe": [
      "Centro"
    ],
    "La Conquista": [
      "Centro"
    ],
    "La Paz de Carazo": [
      "Centro"
    ],
    "San Marcos": [
      "Centro"
    ],
    "Santa Teresa": [
      "Centro"
    ]
  },
  "Chinandega": {
    "Chichigalpa": [
      "Centro"
    ],
    "Chinandega": [
      "Centro"
    ],
    "Cinco Pinos": [
      "Centro"
    ],
    "Corinto": [
      "Centro"
    ],
    "El Realejo": [
      "Centro"
    ],
    "El Viejo": [
      "Centro"
    ],
    "Posoltega": [
      "Centro"
    ],
    "Puerto Morazán": [
      "Centro"
    ],
    "San Francisco del Norte": [
      "Centro"
    ],
    "San Pedro del Norte": [
      "Centro"
    ],
    "Santo Tomás del Norte": [
      "Centro"
    ],
    "Somotillo": [
      "Centro"
    ],
    "Villanueva": [
      "Centro"
    ]
  },
  "Chontales": {
    "Acoyapa": [
      "Centro"
    ],
    "Comalapa": [
      "Centro"
    ],
    "El Coral": [
      "Centro"
    ],
    "Juigalpa": [
      "Centro"
    ],
    "La Libertad": [
      "Centro"
    ],
    "San Francisco de Cuapa": [
      "Centro"
    ],
    "San Pedro de Lóvago": [
      "Centro"
    ],
    "Santo Domingo": [
      "Centro"
    ],
    "Santo Tomás": [
      "Centro"
    ],
    "Villa Sandino": [
      "Centro"
    ]
  },
  "Estelí": {
    "Condega": [
      "Centro"
    ],
    "Estelí": [
      "Centro"
    ],
    "La Trinidad": [
      "Centro"
    ],
    "Pueblo Nuevo": [
      "Centro"
    ],
    "San Juan de Limay": [
      "Centro"
    ],
    "San Nicolás": [
      "Centro"
    ]
  },
  "Granada": {
    "Diriá": [
      "Centro"
    ],
    "Diriomo": [
      "Centro"
    ],
    "Granada": [
      "Centro"
    ],
    "Nandaime": [
      "Centro"
    ]
  },
  "Jinotega": {
    "El Cuá": [
      "Centro"
    ],
    "Jinotega": [
      "Centro"
    ],
    "La Concordia": [
      "Centro"
    ],
    "San José de Bocay": [
      "Centro"
    ],
    "San Rafael del Norte": [
      "Centro"
    ],
    "San Sebastián de Yalí": [
      "Centro"
    ],
    "Santa María de Pantasma": [
      "Centro"
    ],
    "Wiwilí de Jinotega": [
      "Centro"
    ]
  },
  "León": {
    "Achuapa": [
      "Centro"
    ],
    "El Jicaral": [
      "Centro"
    ],
    "El Sauce": [
      "Centro"
    ],
    "La Paz Centro": [
      "Centro"
    ],
    "Larreynaga": [
      "Centro"
    ],
    "León": [
      "Centro"
    ],
    "Nagarote": [
      "Centro"
    ],
    "Quezalguaque": [
      "Centro"
    ],
    "Santa Rosa del Peñón": [
      "Centro"
    ],
    "Telica": [
      "Centro"
    ]
  },
  "Madriz": {
    "Las Sabanas": [
      "Centro"
    ],
    "Palacagüina": [
      "Centro"
    ],
    "San José de Cusmapa": [
      "Centro"
    ],
    "San Juan del Río Coco": [
      "Centro"
    ],
    "San Lucas": [
      "Centro"
    ],
    "Somoto": [
      "Centro"
    ],
    "Telpaneca": [
      "Centro"
    ],
    "Totogalpa": [
      "Centro"
    ],
    "Yalagüina": [
      "Centro"
    ]
  },
  "Managua": {
    "Ciudad Sandino": [
      "Centro"
    ],
    "El Crucero": [
      "Centro"
    ],
    "Managua": [
      "Centro"
    ],
    "Mateare": [
      "Centro"
    ],
    "San Francisco Libre": [
      "Centro"
    ],
    "San Rafael del Sur": [
      "Centro"
    ],
    "Ticuantepe": [
      "Centro"
    ],
    "Tipitapa": [
      "Centro"
    ],
    "Villa El Carmen": [
      "Centro"
    ]
  },
  "Masaya": {
    "Catarina": [
      "Centro"
    ],
    "La Concepción": [
      "Centro"
    ],
    "Masatepe": [
      "Centro"
    ],
    "Masaya": [
      "Centro"
    ],
    "Nandasmo": [
      "Centro"
    ],
    "Nindirí": [
      "Centro"
    ],
    "Niquinohomo": [
      "Centro"
    ],
    "San Juan de Oriente": [
      "Centro"
    ],
    "Tisma": [
      "Centro"
    ]
  },
  "Matagalpa": {
    "Ciudad Darío": [
      "Centro"
    ],
    "El Tuma - La Dalia": [
      "Centro"
    ],
    "Esquipulas": [
      "Centro"
    ],
    "Matagalpa": [
      "Centro"
    ],
    "Matiguás": [
      "Centro"
    ],
    "Muy Muy": [
      "Centro"
    ],
    "Rancho Grande": [
      "Centro"
    ],
    "Río Blanco": [
      "Centro"
    ],
    "San Dionisio": [
      "Centro"
    ],
    "San Isidro": [
      "Centro"
    ],
    "San Ramón": [
      "Centro"
    ],
    "Sébaco": [
      "Centro"
    ],
    "Terrabona": [
      "Centro"
    ]
  },
  "Nueva Segovia": {
    "Ciudad Antigua": [
      "Centro"
    ],
    "Dipilto": [
      "Centro"
    ],
    "Jalapa": [
      "Centro"
    ],
    "Jícaro": [
      "Centro"
    ],
    "Macuelizo": [
      "Centro"
    ],
    "Mozonte": [
      "Centro"
    ],
    "Murra": [
      "Centro"
    ],
    "Ocotal": [
      "Centro"
    ],
    "Quilalí": [
      "Centro"
    ],
    "San Fernando": [
      "Centro"
    ],
    "Santa María": [
      "Centro"
    ],
    "Wiwilí de Nueva Segovia": [
      "Centro"
    ]
  },
  "Región Autónoma Costa Caribe Norte": {
    "Bonanza": [
      "Centro"
    ],
    "Mulukukú": [
      "Centro"
    ],
    "Prinzapolka": [
      "Centro"
    ],
    "Puerto Cabezas": [
      "Centro"
    ],
    "Rosita": [
      "Centro"
    ],
    "Siuna": [
      "Centro"
    ],
    "Waslala": [
      "Centro"
    ],
    "Waspam": [
      "Centro"
    ]
  },
  "Región Autónoma de la Costa Caribe Sur": {
    "Bluefields": [
      "Centro"
    ],
    "Corn Island": [
      "Centro"
    ],
    "Desembocadura de Río Grande": [
      "Centro"
    ],
    "El Ayote": [
      "Centro"
    ],
    "El Rama": [
      "Centro"
    ],
    "El Tortuguero": [
      "Centro"
    ],
    "Kukrahill": [
      "Centro"
    ],
    "La Cruz de Río Grande": [
      "Centro"
    ],
    "Laguna de Perlas": [
      "Centro"
    ],
    "Muelle de Los Bueyes": [
      "Centro"
    ],
    "Nueva Guinea": [
      "Centro"
    ],
    "Paiwas": [
      "Centro"
    ]
  },
  "Río San Juan": {
    "El Almendro": [
      "Centro"
    ],
    "El Castillo": [
      "Centro"
    ],
    "Morrito": [
      "Centro"
    ],
    "San Carlos": [
      "Centro"
    ],
    "San Juan de Nicaragua": [
      "Centro"
    ],
    "San Miguelito": [
      "Centro"
    ]
  },
  "Rivas": {
    "Altagracia": [
      "Centro"
    ],
    "Belén": [
      "Centro"
    ],
    "Buenos Aires": [
      "Centro"
    ],
    "Cárdenas": [
      "Centro"
    ],
    "Moyogalpa": [
      "Centro"
    ],
    "Potosí": [
      "Centro"
    ],
    "Rivas": [
      "Centro"
    ],
    "San Jorge": [
      "Centro"
    ],
    "San Juan del Sur": [
      "Centro"
    ],
    "Tola": [
      "Centro"
    ]
  }
};

const NI_FUFILLS: LatamGeoTree = {
  "Chinandega": {
    "Chinandega": [
      "Chinandega"
    ]
  },
  "León": {
    "León": [
      "León"
    ]
  },
  "Managua": {
    "Ciudad Sandino": [
      "Ciudad Sandino"
    ],
    "El Crucero": [
      "El Crucero"
    ],
    "Managua": [
      "10 De Enero",
      "10 De Junio",
      "11 De Mayo",
      "12 De Octubre",
      "13 De Mayo",
      "14 De Junio",
      "14 De Septiembre",
      "15 De Mayo Una",
      "16 De Marzo",
      "18 De Agosto",
      "18 De Mayo",
      "19 De Febrero",
      "19 De Julio",
      "22 De Enero",
      "25 Aniversario",
      "25 De Febrero",
      "28 De Mayo",
      "30 De Mayo",
      "31 De Diciembre",
      "4 De Noviembre",
      "8 De Marzo",
      "9 De Junio",
      "Acahualinca",
      "Acoma",
      "Acrópolis",
      "Adolfo Reyes",
      "Alamedas Km 8 Carretera Masaya",
      "Alamedas Santo Domingo",
      "Aldo Chavarría",
      "Alemania Democrática",
      "Alexis Arguello",
      "Alfredo Nobel",
      "Altagracia Norte",
      "Altagracia Sur",
      "Altamira Este",
      "Altamonte",
      "Altos De La Sabana",
      "Altos De Las Colinas",
      "Altos De Las Cumbres",
      "Altos De Santo Domingo",
      "Altos De Ticomo",
      "Amanda Aguilar",
      "Américas 1",
      "Américas 2",
      "Américas 3",
      "Américas 4",
      "Andrés Castro",
      "Anexo 1 Unidad De Propósito",
      "Anexo 18 De Mayo",
      "Anexo 2 Unidad De Propósito",
      "Anexo Américas 2",
      "Anexo Batahola Sur",
      "Anexo Camilo Ortega",
      "Anexo Colonia Primero De Mayo",
      "Anexo Georgino Andrade",
      "Anexo Jardines De Veracruz",
      "Anexo La Primavera",
      "Anexo Las Sierritas Santo Domingo",
      "Anexo Reparto San Juan",
      "Anexo Villa Fraternidad",
      "Anexo Villa Libertad",
      "Anexo Villa Roma",
      "Anexo Villa Venezuela",
      "Anexo Waspán Sur",
      "Arges Sequeira",
      "Ariel Darce",
      "Arlen Siu",
      "Arnoldo Alemán",
      "Augusto Cesar Sandino",
      "B15",
      "Balcones De Santo Domingo 1",
      "Balcones De Santo Domingo 2",
      "Bariloche",
      "Barricada",
      "Barrio Cuba",
      "Barrio México",
      "Barrio Nuevo",
      "Barrio Primero De Mayo",
      "Barrio Venezuela",
      "Batahola Norte",
      "Batahola Sur",
      "Bell Air",
      "Bello Horizonte Etapa 1",
      "Bello Horizonte Etapa 2",
      "Bello Horizonte Etapa 3",
      "Bello Horizonte Etapa 4",
      "Bello Horizonte Etapa 5",
      "Bello Horizonte Etapa 6",
      "Belmonte",
      "Benedicto Valverde",
      "Berlín",
      "Bertha Calderon",
      "Bertha Díaz",
      "Bertilda Olegaria",
      "Betancur",
      "Blanca Arauz",
      "Blanca Segovia",
      "Blas Real Espinales",
      "Bolonia",
      "Bosque Norte Y Sur",
      "Bosques De Altamira",
      "Bosques De Bolonia",
      "Bosques De Miraflores",
      "Bosques De Nejapa",
      "Bosques De San Isidro",
      "Bosques De Santa María",
      "Bosques De Santo Domingo",
      "Bosques Del Prado",
      "Bosques Del Recreo",
      "Bosques Del Terraza",
      "Buena Vista",
      "Buenos Aires",
      "Callejón Zelaya",
      "Camilo Chamorro",
      "Camilo Ortega",
      "Camino Del Río",
      "Campo Bello",
      "Campo Bruce",
      "Canadá Sureste",
      "Candelaria",
      "Carlos Aguirre",
      "Carlos Fonseca",
      "Carlos Marx",
      "Carlos Núñez",
      "Carlos Núñez 380",
      "Carlos Núñez Américas 4",
      "Carlos Núñez Los Martinez",
      "Carlos Reina",
      "Casa Blanca",
      "Casa Fontana",
      "Casa Real Etapa 1",
      "Casa Real Etapa 2",
      "Casa Real Etapa 3",
      "Casimiro Sotelo",
      "Castellana",
      "Catalina",
      "Cedros De Las Colinas",
      "Centro Cívico",
      "Centro Histórico Cultural",
      "Che Guevara",
      "Ciudad Jardín",
      "Ciudad San Sebastián",
      "Ciudad Xolotlán",
      "Ciudadela Nicaragua",
      "Colinas De Santa Cruz",
      "Colinas De Verona",
      "Colinas Sur",
      "Colonia Centroamérica",
      "Colonia Del Periodista",
      "Colonia Edgard Lang",
      "Colonia Independencia",
      "Colonia Managua",
      "Colonia Mantica",
      "Colonia Miguel Bonilla",
      "Colonia Nicarao",
      "Colonia Oscar Perez Cassar",
      "Colonia Primero De Mayo",
      "Colonial Los Robles 1",
      "Colonial Los Robles 2",
      "Colonial Los Robles 3",
      "Colonial Los Robles 4",
      "Colonial Los Robles 5",
      "Colonial Los Robles 6",
      "Colonial Los Robles 7",
      "Colonial Los Robles 8",
      "Comandante Aureleano",
      "Combatiente Desconocido",
      "Concepción De Maria",
      "Condesa 1 Y 2",
      "Condominio Roma",
      "Cortijo De La Sabana",
      "Costa Rica",
      "Cristian Perez",
      "Cristo Del Rosario",
      "Cuatro Esquinas De Las Enramadas",
      "Cumbres De Las Colinas",
      "Daniel Chavarría",
      "David Tejada",
      "Delagneau",
      "Dignidad 4 De Mayo",
      "Dinamarca",
      "Divino Niño",
      "Domitila Lugo",
      "Don Bosco",
      "Ducuali",
      "Eddy Mayorga",
      "Edgard Lang",
      "Edgard Munguía",
      "Edmundo Matamoros",
      "Eduardo Contreras",
      "El Boquete Sector Norte Santo Domingo",
      "El Bóer",
      "El Carmen",
      "El Cenicero",
      "El Cortijo",
      "El Dorado",
      "El Edén",
      "El Encanto 1 Y 2",
      "El Paraisito",
      "El Pedernal",
      "El Pilar",
      "El Progreso",
      "El Rodeito",
      "El Rodeo",
      "El Rodeo Santo Domingo",
      "El Rosal",
      "El Seminario",
      "El Sosiego",
      "Embusa 1 Y 2",
      "Enrique Bermudez 380",
      "Enrique Gutiérrez",
      "Enrique Lorente",
      "Enrique Schmidt Nejapa",
      "Enrique Schmidt Villa Flor",
      "Enrique Schmitd Rotonda de Cristo",
      "Entreverde",
      "Ermitas De Esquipulas",
      "Escuela Quemada",
      "Estancia Santo Domingo",
      "Estefanía",
      "Farabundo Martí",
      "Finlandia Rubén Darío Las Colinas",
      "Flor De Las Colinas",
      "Francisco Aguilar",
      "Francisco Meza Rojas",
      "Francisco Morazán",
      "Francisco Salazar",
      "Frascati",
      "Georgino Andrade",
      "German Pomares Américas 2",
      "German Pomares- Nejapa",
      "Germán Pomares",
      "Germán Pomares -Ticomo",
      "Germán Silva",
      "Gertrudis Áreas",
      "Goenz",
      "Golfo Pérsico",
      "Grenada",
      "Habana 1 - Rotonda De Cristo",
      "Habana 2 Maria",
      "Hadas Villas",
      "Haras De La Hoyada",
      "Herlinda López",
      "Hialeah 1 Y 2",
      "Hialeah 3",
      "Hialeah 4",
      "Hilario Sánchez 1",
      "Hilario Sánchez 2",
      "Hilario Sánchez Sur",
      "Hogar Propio",
      "Hugo Chávez",
      "Héroes Y Mártires De Ayapal",
      "Héroes Y Mártires Del Bocay",
      "Inmaculada Villa Fontana",
      "Intermezzo Del Bosque",
      "Isabel Urbina",
      "Isaías Gómez",
      "Israel Galeano",
      "Jacarandas",
      "Jardines De Las Colinas",
      "Jardines De Managua",
      "Jardines De Santa Clara",
      "Jardines De Santo Domingo 1",
      "Jardines De Santo Domingo 2",
      "Jardines De Veracruz",
      "Javier Cuadra",
      "Jericob",
      "Jonathan Gonzalez",
      "Jorge Cassaly",
      "Jorge Dimitrov",
      "Jorge Salazar",
      "Jose Benito Escobar",
      "Jose Dolores Estrada",
      "Juan Emilio Menocal",
      "Julio Buitrago",
      "Kilocho",
      "La Arboleda Santo Domingo",
      "La Chureca",
      "La Curva Sabana Grande",
      "La Esperanza",
      "La Esperanza Jocote Dulce",
      "La Florida",
      "La Fuente",
      "La Luz",
      "La Maravilla",
      "La Morita",
      "La Primavera",
      "La Quinta",
      "La Reforma",
      "La Rioja",
      "La Veranera",
      "La Zacatera",
      "Largaespada",
      "Larreynaga",
      "Las Alemanias",
      "Las Brisas",
      "Las Carolinas",
      "Las Colinas",
      "Las Cuarezmas",
      "Las Cumbres",
      "Las Delicias",
      "Las Flores",
      "Las Jinotepes",
      "Las Lomas Camino Viejo",
      "Las Lomitas Centroamérica",
      "Las Mercedes",
      "Las Palmas",
      "Las Palmeras",
      "Las Piedrecitas",
      "Las Praderas",
      "Las Torres",
      "Las Veraneras",
      "Laureano Mairena",
      "Laureles Norte",
      "Laureles Sur",
      "Leningrado",
      "Leonel Rugama",
      "Liberia",
      "Linda Vista Norte",
      "Linda Vista Sur",
      "Llamas Del Bosque",
      "Loma De Tiscapa",
      "Loma Linda",
      "Loma Verde",
      "Lomas De Buenos Aires",
      "Lomas De Guadalupe",
      "Lomas De Las Colinas",
      "Lomas De Maromo",
      "Lomas De Monserrat",
      "Lomas De Notredame",
      "Lomas De San Juan",
      "Lomas De San Ángel",
      "Lomas De Santo Domingo",
      "Lomas De Ticomo",
      "Lomas Del Consuelo",
      "Lomas Del Sur",
      "Lomas Del Valle",
      "Los Andes",
      "Los Angeles",
      "Los Angeles Jocote Dulce",
      "Los Arcos",
      "Los Cocos",
      "Los Cocos Sabana Grande",
      "Los Corteses",
      "Los Geranios",
      "Los Ingenieros",
      "Los Laureles- Camilo Ortega",
      "Los Madroños",
      "Los Martínez San Judas",
      "Los Membreños",
      "Los Palmares",
      "Los Pescadores",
      "Los Vanegas",
      "Luis Alfonso Velásquez 1",
      "Luis Alfonso Velásquez 2",
      "Macaraly",
      "Madroños Villa Fontana",
      "Maestro Gabriel",
      "Magnolia",
      "Managua",
      "Manchester",
      "Manolo Morales",
      "Manuel Fernández",
      "Manuel Olivares",
      "Marcell Pallais",
      "Maria Auxiliadora",
      "Maria Dolores Alemán",
      "Martha Quezada",
      "Martin Luter King",
      "Marvin Marín",
      "Mayales",
      "Memorial Sandino",
      "Mercado Ivan Montenegro",
      "Michelangelo",
      "Milagro De Dios",
      "Mirador La Sabana",
      "Mirador Las Cumbres",
      "Mirador Norte Santo Domingo",
      "Mirador Sur Santo Domingo",
      "Miraflores 1",
      "Miraflores 2",
      "Miralagos",
      "Mirasol",
      "Mirna Ugarte",
      "Mombacho",
      "Monseñor Lezcano Este",
      "Monseñor Lezcano Oeste",
      "Monte Carlos",
      "Monte Fresco",
      "Monte Verde",
      "Montecristi",
      "Motastepe",
      "Mártires De Ayapal",
      "Máximo Jeréz",
      "Naciones Unidas",
      "Nejapa",
      "Nicarao Sector Sur",
      "Nora Astorga",
      "Nueva Libia",
      "Nueva Nicaragua",
      "Nueva Sabana",
      "Nuevo Horizonte",
      "Omar Torrijos",
      "Omar Torrijos - Loma Linda",
      "Oscar Lino Paz Cubas",
      "Oscar Turcios Rotonda de Cristo",
      "Oswaldo Manzanares",
      "Pablo Úbeda",
      "Palermo",
      "Palestina",
      "Palma Real",
      "Pantasma",
      "Paseo Del Prado",
      "Paseo Del Valle",
      "Paseo Las Colinas",
      "Paula Corea",
      "Pedregal",
      "Pedro Arauz Palacios",
      "Pedro Joaquín Chamorro",
      "Piquín Guerrero",
      "Planes De Altamira 1",
      "Planes De Altamira 2",
      "Planes De Altamira 3",
      "Planes De Puntaldía",
      "Planes Del Doral",
      "Planetarium",
      "Plaza España Costado Sur",
      "Portal Del Bosque",
      "Portal Del Carmen",
      "Portezuelo Parque Industrial",
      "Praderas Del Doral",
      "Proyecto Piloto",
      "Puertas Del Sol",
      "Quinta Nina",
      "Quintas Del Valle",
      "Rafael Ríos",
      "Rafaela Herrera",
      "Recreo Norte",
      "Recreo Sur",
      "Rene Cisneros",
      "Rene Polanco",
      "Reparto Colombia",
      "Reparto Cuadra",
      "Reparto España",
      "Reparto Lomas De Guadalupe",
      "Reparto Lopez",
      "Reparto Los Robles",
      "Reparto San Juan",
      "Reparto Segovia",
      "Reparto Serrano",
      "Reparto Shick 1",
      "Reparto Shick 2",
      "Reparto Shick 3",
      "Reparto Shick 4",
      "Reparto Simón Bolívar",
      "Reparto Tiscapa",
      "Reparto Walter Ferretí",
      "Revolución",
      "Riguero",
      "Riguero Norte",
      "Romin Manrique",
      "Rubenia",
      "Rubén Darío",
      "Rubén Darío - Candelaria",
      "Ríos De Agua Viva",
      "Sabana Grande",
      "Sabanas",
      "Sacuanjoche",
      "Sajonia",
      "Salomón Moreno",
      "Salvadorita",
      "Samarkanda",
      "San Antonio",
      "San Antonio Sur",
      "San Cristóbal",
      "San Francisco De Asís",
      "San Ignacio Waslala",
      "San Jose",
      "San Jose Oriental",
      "San Judas",
      "San Lucas",
      "San Luis Norte",
      "San Luis Sur",
      "San Martin",
      "San Pablo",
      "San Patricio",
      "San Pedro",
      "San Pedro San Judas",
      "San Sebastián",
      "San Sebastián Sur",
      "Santa Ana Nicalit",
      "Santa Ana Norte",
      "Santa Ana Sur",
      "Santa Anita",
      "Santa Anita 2",
      "Santa Bárbara",
      "Santa Elena",
      "Santa Emilia",
      "Santa Isabel",
      "Santa Julia",
      "Santa Lucia",
      "Santa Margarita",
      "Santa Maria De Las Victorias",
      "Santa María De Los Lagos",
      "Santa Mónica",
      "Santa Mónica Cruz Del Paraíso",
      "Santa Rosa",
      "Santo Domingo",
      "Santos López",
      "Sector Aeropuerto Internacional De Managua",
      "Sector Banco Central",
      "Sector Camino De Oriente",
      "Sector Catedral Metropolitana",
      "Sector Central Comarca Cedro Galán",
      "Sector Central Comarca Chiquilistagua",
      "Sector Centro Comercial Managua",
      "Sector Centro Comercial Nejapa",
      "Sector Cerro Los Martinez",
      "Sector Cerro Tabuya",
      "Sector Colegio Americano",
      "Sector Colegio Centroamérica",
      "Sector Comarca Jocote Dulce",
      "Sector Conchita Palacios",
      "Sector Corte Suprema De Justicia",
      "Sector Cuatro Esquinas De Esquipulas",
      "Sector Cuesta Del Plomo",
      "Sector El Retiro",
      "Sector El Seminario",
      "Sector Enel Central",
      "Sector Esquipulas",
      "Sector Este 1 Comarca Sabana Grande Sur",
      "Sector Este 2 Comarca Sabana Grande Sur",
      "Sector Este América 2",
      "Sector Este Comarca Candelaria Sur",
      "Sector Este Comarca Las Enramadas",
      "Sector Este Comarca Monte Tabor",
      "Sector Este Comarca San Jose De La Cañada",
      "Sector Este La Primavera",
      "Sector Este Laguna De Asososca",
      "Sector Este Las Colinas",
      "Sector Este Las Cuarezma",
      "Sector Este Laureles Sur",
      "Sector Este Planes De Altamira 3",
      "Sector Este Portezuelo",
      "Sector Este Sabana Grande",
      "Sector Este San Judas",
      "Sector Este Vallarta",
      "Sector Este Villa Venezuela",
      "Sector Este Waspán Sur",
      "Sector Este Zona Franca Industrial",
      "Sector Gobierno",
      "Sector Hogar Zacarías Guerra",
      "Sector Holiday Inn",
      "Sector Hospital Bertha Calderón",
      "Sector Hospital Manolo Morales",
      "Sector Hotel Camino Real",
      "Sector Hotel Las Colinas",
      "Sector Hotel Las Mercedes",
      "Sector Industrial La Refinería",
      "Sector Instituto Salomón De La Selva",
      "Sector La Kativo",
      "Sector La Piñata",
      "Sector La Salle",
      "Sector Laguna De Asososca",
      "Sector Laguna De Tiscapa",
      "Sector Mercado Israel Lewites",
      "Sector Mercado Mayoreo",
      "Sector Mercado Oriental",
      "Sector Mercado Roberto Huembes",
      "Sector Metrocentro",
      "Sector Milagro De Dios",
      "Sector Mokorón",
      "Sector Noreste Camilo Chamorro",
      "Sector Noreste Comarca Pochocuape",
      "Sector Noreste Comarca San Cristóbal",
      "Sector Noreste Las Colinas",
      "Sector Noreste Los Vanegas",
      "Sector Noreste Valle De Ticomo",
      "Sector Noroeste Altos De Ticomo",
      "Sector Noroeste Comarca San Isidro Libertador",
      "Sector Noroeste Las Colinas",
      "Sector Noroeste Paso Desnivel Centroamérica",
      "Sector Noroeste Rotonda Jean Paul Genie",
      "Sector Noroeste Rotonda Rubén Darío",
      "Sector Noroeste Rotonda Universitaria",
      "Sector Norte Aeropuerto Internacional De Managua",
      "Sector Norte Cedro Galán",
      "Sector Norte Ciudad Industrial Xolotlán",
      "Sector Norte Colinas De Santa Cruz",
      "Sector Norte Comarca Chiquilistagua",
      "Sector Norte Comarca Esquipulas",
      "Sector Norte Comarca Las Viudas",
      "Sector Norte Comarca Los Ladinos",
      "Sector Norte Comarca Nejapa",
      "Sector Norte Comarca San Antonio Sur",
      "Sector Norte Comarca San Cristóbal",
      "Sector Norte Comarca San Isidro Libertador",
      "Sector Norte Cruz Del Paraíso",
      "Sector Norte De Waspán Norte",
      "Sector Norte El Mirador",
      "Sector Norte Estancia De Santo Domingo",
      "Sector Norte Jocote Dulce",
      "Sector Norte Las Brisas",
      "Sector Norte Las Colinas",
      "Sector Norte Las Jaguitas",
      "Sector Norte Laureles Norte",
      "Sector Norte Laureles Sur",
      "Sector Norte Linda Vista",
      "Sector Norte Montecristi",
      "Sector Norte Sabana Grande",
      "Sector Norte San Isidro De La Cruz Verde",
      "Sector Norte Sierritas De Santo Domingo",
      "Sector Occidental Lago De Managua",
      "Sector Oeste Américas 2",
      "Sector Oeste Avenida Naciones Unidas",
      "Sector Oeste Avenida Universitaria",
      "Sector Oeste Colinas De Santa Cruz",
      "Sector Oeste Comarca Candelaria Sur",
      "Sector Oeste Comarca Chiquilistagua",
      "Sector Oeste Comarca Esquipulas",
      "Sector Oeste Comarca Las Enramadas",
      "Sector Oeste Comarca Nejapa",
      "Sector Oeste Comarca Sabana Grande Sur",
      "Sector Oeste Comarca Santo Domingo",
      "Sector Oeste Lomas De San Ángel",
      "Sector Oeste Monte Tabor",
      "Sector Oeste Portezuelo",
      "Sector Oeste San Isidro De La Cruz Verde",
      "Sector Ofiplaza",
      "Sector Pali Zumen",
      "Sector Parque Las Piedrecitas",
      "Sector Paseo Las Brisa",
      "Sector Plaza España",
      "Sector Radio Nicaragua",
      "Sector Rio Borbollón",
      "Sector Rio Lodoso",
      "Sector Rio Santa Elena",
      "Sector San Isidro De La Cruz Verde",
      "Sector Sur 1 Mercado Mayoreo",
      "Sector Sur 2 Mercado Mayoreo",
      "Sector Sur Altos De Santo Domingo",
      "Sector Sur Anexo Villa Libertad",
      "Sector Sur Centro Histórico",
      "Sector Sur Club Terraza",
      "Sector Sur Comarca Las Enramadas",
      "Sector Sur Comarca Las Jaguitas",
      "Sector Sur Comarca Las Viudas",
      "Sector Sur Comarca Los Ladinos",
      "Sector Sur Comarca Nejapa",
      "Sector Sur Comarca Pochocuape",
      "Sector Sur Comarca San Antonio Sur",
      "Sector Sur Comarca San Cristóbal",
      "Sector Sur Comarca San Isidro Libertador",
      "Sector Sur Comarca Ticomo",
      "Sector Sur Cruz Del Paraíso",
      "Sector Sur Esquipulas",
      "Sector Sur Jocote Dulce",
      "Sector Sur Laguna Nejapa",
      "Sector Sur Laguna Tiscapa",
      "Sector Sur Loma Linda",
      "Sector Sur Lomas De Guadalupe",
      "Sector Sur Memorial Sandino",
      "Sector Sur Montecristi",
      "Sector Sur Pista Jean Paul Genie",
      "Sector Sur Rotonda Jean Paul Genie",
      "Sector Sur Sabana Grande",
      "Sector Sur San Isidro De La Cruz Verde",
      "Sector Sur San Juan",
      "Sector Sur Sierritas De Santo Domingo",
      "Sector Sur Valle Ticomo",
      "Sector Sur Villa Reconciliación",
      "Sector Sureste Comarca Las Enramadas",
      "Sector Sureste Comarca San Jose La Cañada",
      "Sector Sureste San Isidro De La Cruz Verde",
      "Sector Sureste San Juan",
      "Sector Sureste Santa Isabel",
      "Sector Sureste Valle Ticomo",
      "Sector Suroeste Camino De Oriente",
      "Sector Suroeste Colonia El Periodista",
      "Sector Suroeste Comarca San Jose La Cañada",
      "Sector Suroeste Pista Suburbana",
      "Sector Suroeste Rotonda Universitaria",
      "Sector Suroeste Santa Anita",
      "Sector Unan Managua",
      "Sector Valle De Ticomo",
      "Sector Zona Franca Industrial",
      "Serranías",
      "Shelim Shible",
      "Sierra Maestra",
      "Sierritas De Santo Domingo",
      "Sol De Libertad",
      "Sócrates Sandino",
      "Tenderí",
      "Terracota 1 Y 2",
      "Tierra Prometida",
      "Torres Molina",
      "Ulsa",
      "Unidad De Propósito",
      "Unión Soviética",
      "Urbanización Gloria",
      "Urbanización Madrid",
      "Urbanización Ticomo Sur",
      "Vallarta",
      "Valle Azul",
      "Valle Blanco",
      "Valle Del Prado",
      "Valle Dorado",
      "Villa Argentina",
      "Villa Austria",
      "Villa Bellini",
      "Villa Bulgaria",
      "Villa Canadá",
      "Villa Cuba Libre",
      "Villa De Andalucía",
      "Villa Del Rosario",
      "Villa Dignidad",
      "Villa Feliz",
      "Villa Flor Norte",
      "Villa Flor Sur",
      "Villa Florencia",
      "Villa Fontana Este",
      "Villa Fontana Norte",
      "Villa Fontana Sur",
      "Villa Fraternidad",
      "Villa Galicia",
      "Villa Israel",
      "Villa Jacinto",
      "Villa Japón",
      "Villa La Sabana",
      "Villa Libertad",
      "Villa Loreto",
      "Villa Miguel Gutiérrez",
      "Villa Nueva",
      "Villa Pedro Joaquín Chamorro",
      "Villa Progreso",
      "Villa Reconciliación",
      "Villa Revolución",
      "Villa Roma",
      "Villa Rubén Darío",
      "Villa San Jacinto",
      "Villa San Ángel",
      "Villa Santa Fe",
      "Villa Sol",
      "Villa Tiscapa",
      "Villa Valencia",
      "Villa Venezuela",
      "Villanova",
      "Villas Gaudi",
      "Villas Italianas",
      "Vincent Poujardeu",
      "Virgen De Guadalupe",
      "Vista Al Xolotlán",
      "Vista Esmeralda",
      "Vista Hermosa",
      "Vistas De Esquipulas",
      "Vittoria",
      "Walter Ferreti",
      "Waspan Sur",
      "Waspán Norte",
      "William Diaz",
      "William Galeano",
      "Ángel Valentín Barrios"
    ],
    "Mateare": [
      "Mateare"
    ],
    "San Rafael Del Sur": [
      "San Rafael Del Sur"
    ],
    "Ticuantepe": [
      "Ticuantepe"
    ],
    "Tipitapa": [
      "Tipitapa"
    ],
    "Villa El Carmen": [
      "Villa El Carmen"
    ]
  }
};

function applyNicaraguaFufills() {
  for (const [dept, munis] of Object.entries(NI_FUFILLS)) {
    if (!GEO_NI[dept]) GEO_NI[dept] = {};
    for (const [muni, villages] of Object.entries(munis)) {
      GEO_NI[dept][muni] = villages;
    }
  }
}

applyNicaraguaFufills();

export function geoTreeForCountry(country: CountryCode): LatamGeoTree | null {
  if (country === "GT") return GEO_GT;
  if (country === "CR") return GEO_CR;
  if (country === "HN") return GEO_HN;
  if (country === "SV") return GEO_SV;
  if (country === "NI") return GEO_NI;
  return null;
}

export function codFormLabel(country: CountryCode): string {
  if (country === "GT") return "COD FORM GUATEMALA";
  if (country === "CR") return "COD FORM COSTA RICA";
  if (country === "HN") return "COD FORM HONDURAS";
  if (country === "SV") return "COD FORM SALVADOR";
  if (country === "NI") return "COD FORM NICARAGUA";
  if (country === "AR") return "COD FORM ARGENTINA";
  return "COD FORM";
}
