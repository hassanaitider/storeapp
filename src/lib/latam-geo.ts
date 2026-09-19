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


/** Costa Rica — complete Provincia → Cantón → Distrito. */
export const GEO_CR: LatamGeoTree = {
  "San José": {
    "Acosta": [
      "Cangrejal",
      "Guaitil",
      "Palmichal",
      "Sabanillas",
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
      "Legua",
      "Monterrey",
      "Salitrillos",
      "San Gabriel",
      "Tarbaca",
      "Vuelta de Jorco"
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
      "San Cristobal",
      "San Juan de Dios",
      "San Miguel",
      "San Rafael Abajo",
      "San Rafael Arriba"
    ],
    "Dota": [
      "Copey",
      "Jardín",
      "Santa María"
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
      "Mata de Plátano",
      "Purral",
      "Rancho Redondo",
      "San Francisco"
    ],
    "León Cortés Castro": [
      "Llano Bonito",
      "San Andrés",
      "San Antonio",
      "San Isidro",
      "San Pablo",
      "Santa Cruz"
    ],
    "Montes de Oca": [
      "Mercedes",
      "Sabanilla",
      "San Pedro",
      "San Rafael"
    ],
    "Mora": [
      "Colón",
      "Guayabo",
      "Jaris",
      "Picagres",
      "Piedras Negras",
      "Quitirrisí",
      "Tabarcia"
    ],
    "Moravia": [
      "La Trinidad",
      "San Jerónimo",
      "San Vicente"
    ],
    "Pérez Zeledón": [
      "Barú",
      "Cajón",
      "Daniel Flores",
      "El General",
      "La Amistad",
      "Páramo",
      "Pejibaye",
      "Platanares",
      "Río Nuevo",
      "Rivas",
      "San Isidro de El General",
      "San Pedro"
    ],
    "Puriscal": [
      "Barbacoas",
      "Candelarita",
      "Chires",
      "Desamparaditos",
      "Grifo Alto",
      "Mercedes Sur",
      "San Antonio",
      "San Rafael",
      "Santiago"
    ],
    "San José": [
      "Carmen",
      "Catedral",
      "Hatillo",
      "Hospital",
      "Mata Redonda",
      "Merced",
      "Pavas",
      "San Francisco de Dos Ríos",
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
    "Tarrazú": [
      "San Carlos",
      "San Lorenzo",
      "San Marcos"
    ],
    "Tibás": [
      "Anselmo Llorente",
      "Cinco Esquinas",
      "Colima",
      "León XIII",
      "San Juan"
    ],
    "Turrubares": [
      "Carara",
      "San Juan de Mata",
      "San Luis",
      "San Pablo",
      "San Pedro"
    ],
    "Vázquez de Coronado": [
      "Cascajal",
      "Dulce Nombre de Jesús",
      "Patalillo",
      "San Isidro",
      "San Rafael"
    ]
  },
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
      "Sarapiquí",
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
      "Puente de Piedra",
      "San Isidro",
      "San José",
      "San Roque",
      "Tacares"
    ],
    "Guatuso": [
      "Buenavista",
      "Cote",
      "Katira",
      "San Rafael"
    ],
    "Los Chiles": [
      "Caño Negro",
      "El Amparo",
      "Los Chiles",
      "San Jorge"
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
    "Río Cuarto": [
      "Río Cuarto",
      "Santa Isabel",
      "Santa Rita"
    ],
    "San Carlos": [
      "Aguas Zarcas",
      "Buenavista",
      "Cutris",
      "Florencia",
      "La Fortuna",
      "La Palmera",
      "La Tigra",
      "Monterrey",
      "Pital",
      "Pocosol",
      "Quesada",
      "Venado",
      "Venecia"
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
      "Peñas Blancas",
      "Piedades Norte",
      "Piedades Sur",
      "San Isidro",
      "San Juan",
      "San Lorenzo",
      "San Rafael",
      "San Ramón",
      "Santiago",
      "Volio",
      "Zapotal"
    ],
    "Sarchí": [
      "Rodríguez",
      "San Pedro",
      "Sarchí Norte",
      "Sarchí Sur",
      "Toro Amarillo"
    ],
    "Upala": [
      "Aguas Claras",
      "Bijagua",
      "Canalete",
      "Delicias",
      "Dos Ríos",
      "San José O Pizote",
      "Upala",
      "Yolillal"
    ],
    "Zarcero": [
      "Brisas",
      "Guadalupe",
      "Laguna",
      "Palmira",
      "Tapesco",
      "Zapote",
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
      "Patio de Agua",
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
      "Llanos de Santa Lucía",
      "Orosi",
      "Paraíso",
      "Santiago"
    ],
    "Turrialba": [
      "Chirripó",
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
  "Heredia": {
    "Barva": [
      "Barva",
      "Puente Salas",
      "San José de la Montaña",
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
      "Ulloa",
      "Varablanca"
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
    ],
    "Sarapiquí": [
      "Cureña",
      "La Virgen",
      "Las Horquetas",
      "Llanuras del Gaspar",
      "Puerto Viejo"
    ]
  },
  "Guanacaste": {
    "Abangares": [
      "Colorado",
      "Las Juntas",
      "San Juan",
      "Sierra"
    ],
    "Bagaces": [
      "Bagaces",
      "La Fortuna",
      "Mogote",
      "Río Naranjo"
    ],
    "Cañas": [
      "Bebedero",
      "Cañas",
      "Palmira",
      "Porozal",
      "San Miguel"
    ],
    "Carrillo": [
      "Belén",
      "Filadelfia",
      "Palmira",
      "Sardinal"
    ],
    "Hojancha": [
      "Hojancha",
      "Huacas",
      "Matambú",
      "Monte Romo",
      "Puerto Carrillo"
    ],
    "La Cruz": [
      "La Cruz",
      "La Garita",
      "Santa Cecilia",
      "Santa Elena"
    ],
    "Liberia": [
      "Cañas Dulces",
      "Curubandé",
      "Liberia",
      "Mayorga",
      "Nacascolo"
    ],
    "Nandayure": [
      "Bejuco",
      "Carmona",
      "Porvenir",
      "San Pablo",
      "Santa Rita",
      "Zapotal"
    ],
    "Nicoya": [
      "Belén de Nosarita",
      "Mansión",
      "Nicoya",
      "Nosara",
      "Quebrada Honda",
      "Sámara",
      "San Antonio"
    ],
    "Santa Cruz": [
      "Bolsón",
      "Cabo Velas",
      "Cartagena",
      "Cuajiniquil",
      "Diriá",
      "Santa Cruz",
      "Tamarindo",
      "Tempate",
      "Veintisiete de Abril"
    ],
    "Tilarán": [
      "Arenal",
      "Cabeceras",
      "Líbano",
      "Quebrada Grande",
      "Santa Rosa",
      "Tierras Morenas",
      "Tilarán",
      "Tronadora"
    ]
  },
  "Puntarenas": {
    "Buenos Aires": [
      "Biolley",
      "Boruca",
      "Brunka",
      "Buenos Aires",
      "Chánguena",
      "Colinas",
      "Pilas",
      "Potrero Grande",
      "Volcán"
    ],
    "Corredores": [
      "Canoas",
      "Corredor",
      "La Cuesta",
      "Laurel"
    ],
    "Coto Brus": [
      "Aguabuena",
      "Gutiérrez Braun",
      "Limoncito",
      "Pittier",
      "Sabalito",
      "San Vito"
    ],
    "Esparza": [
      "Caldera",
      "Espíritu Santo",
      "Macacona",
      "San Jerónimo",
      "San Juan Grande",
      "San Rafael"
    ],
    "Garabito": [
      "Jacó",
      "Lagunillas",
      "Tárcoles"
    ],
    "Golfito": [
      "Golfito",
      "Guaycará",
      "Pavón"
    ],
    "Montes de Oro": [
      "La Unión",
      "Miramar",
      "San Isidro"
    ],
    "Monteverde": [
      "Monteverde"
    ],
    "Osa": [
      "Bahía Ballena",
      "Bahía Drake",
      "Palmar",
      "Piedras Blancas",
      "Puerto Cortés",
      "Sierpe"
    ],
    "Parrita": [
      "Parrita"
    ],
    "Puerto Jiménez": [
      "Puerto Jiménez"
    ],
    "Puntarenas": [
      "Acapulco",
      "Arancibia",
      "Barranca",
      "Chacarita",
      "Chira",
      "Chomes",
      "Cóbano",
      "El Roble",
      "Guacimal",
      "Isla del Coco",
      "Lepanto",
      "Manzanillo",
      "Paquera",
      "Pitahaya",
      "Puntarenas"
    ],
    "Quepos": [
      "Naranjito",
      "Quepos",
      "Savegre"
    ]
  },
  "Limón": {
    "Guácimo": [
      "Duacarí",
      "Guácimo",
      "Mercedes",
      "Pocora",
      "Río Jiménez"
    ],
    "Limón": [
      "Limón",
      "Matama",
      "Río Blanco",
      "Valle La Estrella"
    ],
    "Matina": [
      "Batán",
      "Carrandí",
      "Matina"
    ],
    "Pococí": [
      "Cariari",
      "Colorado",
      "Guápiles",
      "Jiménez",
      "La Colonia",
      "Rita",
      "Roxana"
    ],
    "Siquirres": [
      "Alegría",
      "El Cairo",
      "Florida",
      "Germania",
      "Pacuarito",
      "Reventazón",
      "Siquirres"
    ],
    "Talamanca": [
      "Bratsi",
      "Cahuita",
      "Sixaola",
      "Telire"
    ]
  }
};

/** Honduras — complete departamentos / municipios. */
export const GEO_HN: LatamGeoTree = {
  "Islas de La Bahia": {
    "Guanaja": [
      "Centro"
    ],
    "Jose Santos Guardiola": [
      "Centro"
    ],
    "Roatan": [
      "Centro"
    ],
    "Utila": [
      "Centro"
    ]
  },
  "Colon": {
    "Balfate": [
      "Centro"
    ],
    "Bonito Oriental": [
      "Centro"
    ],
    "Iriona": [
      "Centro"
    ],
    "Limon": [
      "Centro"
    ],
    "Saba": [
      "Centro"
    ],
    "Santa Fe": [
      "Centro"
    ],
    "Santa Rosa de Aguan": [
      "Centro"
    ],
    "Sonaguera": [
      "Centro"
    ],
    "Tocoa": [
      "Centro"
    ],
    "Trujillo": [
      "Centro"
    ]
  },
  "Atlantida": {
    "Arizona": [
      "Centro"
    ],
    "El Porvenir": [
      "Centro"
    ],
    "Esparta": [
      "Centro"
    ],
    "Jutiapa": [
      "Centro"
    ],
    "La Ceiba": [
      "Centro"
    ],
    "La Masica": [
      "Centro"
    ],
    "San Francisco": [
      "Centro"
    ],
    "Tela": [
      "Centro"
    ]
  },
  "Cortes": {
    "Choloma": [
      "Centro"
    ],
    "La Lima": [
      "Centro"
    ],
    "Omoa": [
      "Centro"
    ],
    "Pimienta": [
      "Centro"
    ],
    "Potrerillos": [
      "Centro"
    ],
    "Puerto Cortes": [
      "Centro"
    ],
    "San Antonio de Cortes": [
      "Centro"
    ],
    "San Francisco de Yojoa": [
      "Centro"
    ],
    "San Manuel": [
      "Centro"
    ],
    "San Pedro Sula": [
      "Centro"
    ],
    "Santa Cruz de Yojoa": [
      "Centro"
    ],
    "Villanueva": [
      "Centro"
    ]
  },
  "Yoro": {
    "Arenal": [
      "Centro"
    ],
    "El Negrito": [
      "Centro"
    ],
    "El Progreso": [
      "Centro"
    ],
    "Jocon": [
      "Centro"
    ],
    "Morazan": [
      "Centro"
    ],
    "Olanchito": [
      "Centro"
    ],
    "Santa Rita": [
      "Centro"
    ],
    "Sulaco": [
      "Centro"
    ],
    "Victoria": [
      "Centro"
    ],
    "Yorito": [
      "Centro"
    ],
    "Yoro": [
      "Centro"
    ]
  },
  "Olancho": {
    "Campamento": [
      "Centro"
    ],
    "Catacamas": [
      "Centro"
    ],
    "Concordia": [
      "Centro"
    ],
    "Dulce Nombre de Culmi": [
      "Centro"
    ],
    "El Rosario": [
      "Centro"
    ],
    "Esquipulas del Norte": [
      "Centro"
    ],
    "Gualaco": [
      "Centro"
    ],
    "Guarizama": [
      "Centro"
    ],
    "Guata": [
      "Centro"
    ],
    "Guayape": [
      "Centro"
    ],
    "Jano": [
      "Centro"
    ],
    "Juticalpa": [
      "Centro"
    ],
    "La Union": [
      "Centro"
    ],
    "Mangulile": [
      "Centro"
    ],
    "Manto": [
      "Centro"
    ],
    "Patuca": [
      "Centro"
    ],
    "Salama": [
      "Centro"
    ],
    "San Esteban": [
      "Centro"
    ],
    "San Francisco de Becerra": [
      "Centro"
    ],
    "San Francisco de La Paz": [
      "Centro"
    ],
    "Santa Maria del Real": [
      "Centro"
    ],
    "Silca": [
      "Centro"
    ],
    "Yocon": [
      "Centro"
    ]
  },
  "Santa Barbara": {
    "Arada": [
      "Centro"
    ],
    "Atima": [
      "Centro"
    ],
    "Azacualpa": [
      "Centro"
    ],
    "Ceguaca": [
      "Centro"
    ],
    "Chinda": [
      "Centro"
    ],
    "Concepcion del Norte": [
      "Centro"
    ],
    "Concepcion del Sur": [
      "Centro"
    ],
    "El Nispero": [
      "Centro"
    ],
    "Gualala": [
      "Centro"
    ],
    "Ilama": [
      "Centro"
    ],
    "Las Vegas": [
      "Centro"
    ],
    "Macuelizo": [
      "Centro"
    ],
    "Naranjito": [
      "Centro"
    ],
    "Nueva Frontera": [
      "Centro"
    ],
    "Nuevo Celilac": [
      "Centro"
    ],
    "Petoa": [
      "Centro"
    ],
    "Proteccion": [
      "Centro"
    ],
    "Quimistan": [
      "Centro"
    ],
    "San Francisco de Ojuera": [
      "Centro"
    ],
    "San Jose de Colinas": [
      "Centro"
    ],
    "San Luis": [
      "Centro"
    ],
    "San Marcos": [
      "Centro"
    ],
    "San Nicolas": [
      "Centro"
    ],
    "San Pedro Zacapa": [
      "Centro"
    ],
    "San Vicente Centenario": [
      "Centro"
    ],
    "Santa Barbara": [
      "Centro"
    ],
    "Santa Rita": [
      "Centro"
    ],
    "Trinidad": [
      "Centro"
    ]
  },
  "Copan": {
    "Cabana": [
      "Centro"
    ],
    "Concepción": [
      "Centro"
    ],
    "Copan Ruinas": [
      "Centro"
    ],
    "Corquin": [
      "Centro"
    ],
    "Cucuyagua": [
      "Centro"
    ],
    "Dolores": [
      "Centro"
    ],
    "Dulce Nombre": [
      "Centro"
    ],
    "El Paraiso": [
      "Centro"
    ],
    "Florida": [
      "Centro"
    ],
    "La Jigua": [
      "Centro"
    ],
    "La Union": [
      "Centro"
    ],
    "Nueva Arcadia": [
      "Centro"
    ],
    "San Agustin": [
      "Centro"
    ],
    "San Antonio": [
      "Centro"
    ],
    "San Jeronimo": [
      "Centro"
    ],
    "San Jose": [
      "Centro"
    ],
    "San Juan de Opoa": [
      "Centro"
    ],
    "San Nicolas": [
      "Centro"
    ],
    "San Pedro": [
      "Centro"
    ],
    "Santa Rita": [
      "Centro"
    ],
    "Santa Rosa de Copan": [
      "Centro"
    ],
    "Trinidad de Copan": [
      "Centro"
    ],
    "Veracruz": [
      "Centro"
    ]
  },
  "Lempira": {
    "Belen": [
      "Centro"
    ],
    "Candelaria": [
      "Centro"
    ],
    "Cololaca": [
      "Centro"
    ],
    "Erandique": [
      "Centro"
    ],
    "Gracias": [
      "Centro"
    ],
    "Gualcince": [
      "Centro"
    ],
    "Guarita": [
      "Centro"
    ],
    "La Campa": [
      "Centro"
    ],
    "La Iguala": [
      "Centro"
    ],
    "La Union": [
      "Centro"
    ],
    "La Virtud": [
      "Centro"
    ],
    "Las Flores": [
      "Centro"
    ],
    "Lepaera": [
      "Centro"
    ],
    "Mapulaca": [
      "Centro"
    ],
    "Piraera": [
      "Centro"
    ],
    "San Andres": [
      "Centro"
    ],
    "San Francisco": [
      "Centro"
    ],
    "San Juan Guarita": [
      "Centro"
    ],
    "San Manuel Colohete": [
      "Centro"
    ],
    "San Marcos de Caiquin": [
      "Centro"
    ],
    "San Rafael": [
      "Centro"
    ],
    "San Sebastian": [
      "Centro"
    ],
    "Santa Cruz": [
      "Centro"
    ],
    "Talgua": [
      "Centro"
    ],
    "Tambla": [
      "Centro"
    ],
    "Tomala": [
      "Centro"
    ],
    "Valladolid": [
      "Centro"
    ],
    "Virginia": [
      "Centro"
    ]
  },
  "Comayagua": {
    "Ajuterique": [
      "Centro"
    ],
    "Comayagua": [
      "Centro"
    ],
    "El Rosario": [
      "Centro"
    ],
    "Esquias": [
      "Centro"
    ],
    "Humuya": [
      "Centro"
    ],
    "La Libertad": [
      "Centro"
    ],
    "La Trinidad": [
      "Centro"
    ],
    "Lamani": [
      "Centro"
    ],
    "Las Lajas": [
      "Centro"
    ],
    "Lejamani": [
      "Centro"
    ],
    "Meambar": [
      "Centro"
    ],
    "Minas de Oro": [
      "Centro"
    ],
    "Ojos de Agua": [
      "Centro"
    ],
    "San Jerónimo": [
      "Centro"
    ],
    "San Jose de Comayagua": [
      "Centro"
    ],
    "San Jose del Potrero": [
      "Centro"
    ],
    "San Luis": [
      "Centro"
    ],
    "San Sebastian": [
      "Centro"
    ],
    "Siguatepeque": [
      "Centro"
    ],
    "Taulabe": [
      "Centro"
    ],
    "Villa de San Antonio": [
      "Centro"
    ]
  },
  "Intibuca": {
    "Camasca": [
      "Centro"
    ],
    "Colomoncagua": [
      "Centro"
    ],
    "Concepcion": [
      "Centro"
    ],
    "Dolores": [
      "Centro"
    ],
    "Intibuca": [
      "Centro"
    ],
    "Jesus de Otoro": [
      "Centro"
    ],
    "La Esperanza": [
      "Centro"
    ],
    "Magdalena": [
      "Centro"
    ],
    "Masaguara": [
      "Centro"
    ],
    "San Antonio": [
      "Centro"
    ],
    "San Francisco de Opalaca": [
      "Centro"
    ],
    "San Isidro": [
      "Centro"
    ],
    "San Juan": [
      "Centro"
    ],
    "San Marcos de Sierra": [
      "Centro"
    ],
    "San Miguelito": [
      "Centro"
    ],
    "Santa Lucia": [
      "Centro"
    ],
    "Yamaranguila": [
      "Centro"
    ]
  },
  "Francisco Morazan": {
    "Alubaren": [
      "Centro"
    ],
    "Cedros": [
      "Centro"
    ],
    "Curaren": [
      "Centro"
    ],
    "Distrito Central": [
      "Centro"
    ],
    "El Porvenir": [
      "Centro"
    ],
    "Guaimaca": [
      "Centro"
    ],
    "La Libertad": [
      "Centro"
    ],
    "La Venta": [
      "Centro"
    ],
    "Lepaterique": [
      "Centro"
    ],
    "Maraita": [
      "Centro"
    ],
    "Marale": [
      "Centro"
    ],
    "Nueva Armenia": [
      "Centro"
    ],
    "Ojojona": [
      "Centro"
    ],
    "Orica": [
      "Centro"
    ],
    "Reitoca": [
      "Centro"
    ],
    "Sabanagrande": [
      "Centro"
    ],
    "San Antonio de Oriente": [
      "Centro"
    ],
    "San Buenaventura": [
      "Centro"
    ],
    "San Ignacio": [
      "Centro"
    ],
    "San Juan de Flores": [
      "Centro"
    ],
    "San Miguelito": [
      "Centro"
    ],
    "Santa Ana": [
      "Centro"
    ],
    "Santa Lucia": [
      "Centro"
    ],
    "Talanga": [
      "Centro"
    ],
    "Tatumbla": [
      "Centro"
    ],
    "Valle de Angeles": [
      "Centro"
    ],
    "Vallecillo": [
      "Centro"
    ],
    "Villa de San Francisco": [
      "Centro"
    ]
  },
  "Ocotepeque": {
    "Belen Gualcho": [
      "Centro"
    ],
    "Concepcion": [
      "Centro"
    ],
    "Dolores Merendon": [
      "Centro"
    ],
    "Fraternidad": [
      "Centro"
    ],
    "La Encarnacion": [
      "Centro"
    ],
    "La Labor": [
      "Centro"
    ],
    "Lucerna": [
      "Centro"
    ],
    "Mercedes": [
      "Centro"
    ],
    "Ocotepeque": [
      "Centro"
    ],
    "San Fernando": [
      "Centro"
    ],
    "San Francisco del Valle": [
      "Centro"
    ],
    "San Jorge": [
      "Centro"
    ],
    "San Marcos": [
      "Centro"
    ],
    "Santa Fe": [
      "Centro"
    ],
    "Sensenti": [
      "Centro"
    ],
    "Sinuapa": [
      "Centro"
    ]
  },
  "La Paz": {
    "Aguanqueterique": [
      "Centro"
    ],
    "Cabanas": [
      "Centro"
    ],
    "Cane": [
      "Centro"
    ],
    "Chinacla": [
      "Centro"
    ],
    "Guajiquiro": [
      "Centro"
    ],
    "La Paz": [
      "Centro"
    ],
    "Lauterique": [
      "Centro"
    ],
    "Marcala": [
      "Centro"
    ],
    "Mercedes de Oriente": [
      "Centro"
    ],
    "Opatoro": [
      "Centro"
    ],
    "San Antonio del Norte": [
      "Centro"
    ],
    "San Jose": [
      "Centro"
    ],
    "San Juan": [
      "Centro"
    ],
    "San Pedro de Tutule": [
      "Centro"
    ],
    "Santa Ana": [
      "Centro"
    ],
    "Santa Elena": [
      "Centro"
    ],
    "Santa Maria": [
      "Centro"
    ],
    "Santiago de Puringla": [
      "Centro"
    ],
    "Yarula": [
      "Centro"
    ]
  },
  "El Paraiso": {
    "Alauca": [
      "Centro"
    ],
    "Danli": [
      "Centro"
    ],
    "El Paraiso": [
      "Centro"
    ],
    "Guinope": [
      "Centro"
    ],
    "Jacaleapa": [
      "Centro"
    ],
    "Liure": [
      "Centro"
    ],
    "Moroceli": [
      "Centro"
    ],
    "Oropoli": [
      "Centro"
    ],
    "Potrerillos": [
      "Centro"
    ],
    "San Antonio de Flores": [
      "Centro"
    ],
    "San Lucas": [
      "Centro"
    ],
    "San Matias": [
      "Centro"
    ],
    "Soledad": [
      "Centro"
    ],
    "Teupasenti": [
      "Centro"
    ],
    "Texiguat": [
      "Centro"
    ],
    "Trojes": [
      "Centro"
    ],
    "Vado Ancho": [
      "Centro"
    ],
    "Yauyupe": [
      "Centro"
    ],
    "Yuscaran": [
      "Centro"
    ]
  },
  "Valle": {
    "Alianza": [
      "Centro"
    ],
    "Amapala": [
      "Centro"
    ],
    "Aramecina": [
      "Centro"
    ],
    "Caridad": [
      "Centro"
    ],
    "Goascoran": [
      "Centro"
    ],
    "Langue": [
      "Centro"
    ],
    "Nacaome": [
      "Centro"
    ],
    "San Francisco de Coray": [
      "Centro"
    ],
    "San Lorenzo": [
      "Centro"
    ]
  },
  "Choluteca": {
    "Apacilagua": [
      "Centro"
    ],
    "Choluteca": [
      "Centro"
    ],
    "Concepcion de Maria": [
      "Centro"
    ],
    "Duyure": [
      "Centro"
    ],
    "El Corpus": [
      "Centro"
    ],
    "El Triunfo": [
      "Centro"
    ],
    "Marcovia": [
      "Centro"
    ],
    "Morolica": [
      "Centro"
    ],
    "Namasigue": [
      "Centro"
    ],
    "Orocuina": [
      "Centro"
    ],
    "Pespire": [
      "Centro"
    ],
    "San Antonio de Flores": [
      "Centro"
    ],
    "San Isidro": [
      "Centro"
    ],
    "San Jose": [
      "Centro"
    ],
    "San Marcos de Colon": [
      "Centro"
    ],
    "Santa Ana de Yusguare": [
      "Centro"
    ]
  },
  "Gracias a Dios": {
    "Ahuas": [
      "Centro"
    ],
    "Brus Laguna": [
      "Centro"
    ],
    "Juan Francisco Bulnes": [
      "Centro"
    ],
    "Puerto Lempira": [
      "Centro"
    ],
    "Ramón Villeda Morales": [
      "Centro"
    ],
    "Wampusirpi": [
      "Centro"
    ]
  }
};

/** El Salvador — complete departamentos / municipios. */
export const GEO_SV: LatamGeoTree = {
  "Ahuachapán": {
    "Ahuachapán": [
      "Centro"
    ],
    "Apaneca": [
      "Centro"
    ],
    "Concepción de Ataco": [
      "Centro"
    ],
    "Tacuba": [
      "Centro"
    ],
    "Atiquizaya": [
      "Centro"
    ],
    "El Refugio": [
      "Centro"
    ],
    "San Lorenzo": [
      "Centro"
    ],
    "Turín": [
      "Centro"
    ],
    "Guaymango": [
      "Centro"
    ],
    "Jujutla": [
      "Centro"
    ],
    "San Francisco Menéndez": [
      "Centro"
    ],
    "San Pedro Puxtla": [
      "Centro"
    ]
  },
  "Cabañas": {
    "Dolores": [
      "Centro"
    ],
    "Guacotecti": [
      "Centro"
    ],
    "San Isidro": [
      "Centro"
    ],
    "Sensuntepeque": [
      "Centro"
    ],
    "Victoria": [
      "Centro"
    ],
    "Cinquera": [
      "Centro"
    ],
    "Ilobasco": [
      "Centro"
    ],
    "Jutiapa": [
      "Centro"
    ],
    "Tejutepeque": [
      "Centro"
    ]
  },
  "Chalatenango": {
    "Agua Caliente": [
      "Centro"
    ],
    "Dulce Nombre de María": [
      "Centro"
    ],
    "El Paraíso": [
      "Centro"
    ],
    "La Reina": [
      "Centro"
    ],
    "Nueva Concepción": [
      "Centro"
    ],
    "San Fernando": [
      "Centro"
    ],
    "San Francisco Morazán": [
      "Centro"
    ],
    "San Rafael": [
      "Centro"
    ],
    "Santa Rita": [
      "Centro"
    ],
    "Tejutla": [
      "Centro"
    ],
    "Citalá": [
      "Centro"
    ],
    "La Palma": [
      "Centro"
    ],
    "San Ignacio": [
      "Centro"
    ],
    "Arcatao": [
      "Centro"
    ],
    "Azacualpa": [
      "Centro"
    ],
    "San José Cancasque": [
      "Centro"
    ],
    "Chalatenango": [
      "Centro"
    ],
    "Comalapa": [
      "Centro"
    ],
    "Concepción Quezaltepeque": [
      "Centro"
    ],
    "El Carrizal": [
      "Centro"
    ],
    "La Laguna": [
      "Centro"
    ],
    "San José Las Flores": [
      "Centro"
    ],
    "Las Vueltas": [
      "Centro"
    ],
    "Nombre de Jesús": [
      "Centro"
    ],
    "Nueva Trinidad": [
      "Centro"
    ],
    "Ojos de Agua": [
      "Centro"
    ],
    "Potonico": [
      "Centro"
    ],
    "San Antonio de la Cruz": [
      "Centro"
    ],
    "San Antonio Los Ranchos": [
      "Centro"
    ],
    "San Francisco Lempa": [
      "Centro"
    ],
    "San Isidro Labrador": [
      "Centro"
    ],
    "San Luis del Carmen": [
      "Centro"
    ],
    "San Miguel de Mercedes": [
      "Centro"
    ],
    "Embalse Cerron Grande": [
      "Centro"
    ]
  },
  "Cuscatlán": {
    "Oratorio de Concepción": [
      "Centro"
    ],
    "San Bartolomé Perulapía": [
      "Centro"
    ],
    "San José Guayabal": [
      "Centro"
    ],
    "San Pedro Perulapán": [
      "Centro"
    ],
    "Suchitoto": [
      "Centro"
    ],
    "Candelaria": [
      "Centro"
    ],
    "Cojutepeque": [
      "Centro"
    ],
    "El Carmen": [
      "Centro"
    ],
    "El Rosario": [
      "Centro"
    ],
    "Monte San Juan": [
      "Centro"
    ],
    "San Cristóbal": [
      "Centro"
    ],
    "San Rafael Cedros": [
      "Centro"
    ],
    "San Ramón": [
      "Centro"
    ],
    "Santa Cruz Analquito": [
      "Centro"
    ],
    "Santa Cruz Michapa": [
      "Centro"
    ],
    "Tenancingo": [
      "Centro"
    ]
  },
  "La Libertad": {
    "Ciudad Arce": [
      "Centro"
    ],
    "San Juan Opico": [
      "Centro"
    ],
    "Chiltiupán": [
      "Centro"
    ],
    "Jicalapa": [
      "Centro"
    ],
    "La Libertad": [
      "Centro"
    ],
    "Tamanique": [
      "Centro"
    ],
    "Teotepeque": [
      "Centro"
    ],
    "Antiguo Cuscatlán": [
      "Centro"
    ],
    "Huizúcar": [
      "Centro"
    ],
    "Nuevo Cuscatlán": [
      "Centro"
    ],
    "San José Villanueva": [
      "Centro"
    ],
    "Zaragoza": [
      "Centro"
    ],
    "Quezaltepeque": [
      "Centro"
    ],
    "San Matías": [
      "Centro"
    ],
    "San Pablo Tacachico": [
      "Centro"
    ],
    "Colón": [
      "Centro"
    ],
    "Jayaque": [
      "Centro"
    ],
    "Sacacoyo": [
      "Centro"
    ],
    "Talnique": [
      "Centro"
    ],
    "Tepecoyo": [
      "Centro"
    ],
    "Comasagua": [
      "Centro"
    ],
    "Santa Tecla": [
      "Centro"
    ]
  },
  "La Paz": {
    "El Rosario": [
      "Centro"
    ],
    "Jerusalén": [
      "Centro"
    ],
    "Mercedes La Ceiba": [
      "Centro"
    ],
    "Paraíso de Osorio": [
      "Centro"
    ],
    "San Antonio Masahuat": [
      "Centro"
    ],
    "San Emigdio": [
      "Centro"
    ],
    "San Juan Tepezontes": [
      "Centro"
    ],
    "San Luis La Herradura": [
      "Centro"
    ],
    "San Miguel Tepezontes": [
      "Centro"
    ],
    "San Pedro Nonualco": [
      "Centro"
    ],
    "Santa María Ostuma": [
      "Centro"
    ],
    "Santiago Nonualco": [
      "Centro"
    ],
    "San Juan Nonualco": [
      "Centro"
    ],
    "San Rafael Obrajuelo": [
      "Centro"
    ],
    "Zacatecoluca": [
      "Centro"
    ],
    "Cuyultitán": [
      "Centro"
    ],
    "Olocuilta": [
      "Centro"
    ],
    "San Francisco Chinameca": [
      "Centro"
    ],
    "San Juan Talpa": [
      "Centro"
    ],
    "San Luis Talpa": [
      "Centro"
    ],
    "San Pedro Masahuat": [
      "Centro"
    ],
    "Tapalhuaca": [
      "Centro"
    ]
  },
  "La Unión": {
    "Anamorós": [
      "Centro"
    ],
    "Bolívar": [
      "Centro"
    ],
    "Concepción de Oriente": [
      "Centro"
    ],
    "El Sauce": [
      "Centro"
    ],
    "Lislique": [
      "Centro"
    ],
    "Nueva Esparta": [
      "Centro"
    ],
    "Pasaquina": [
      "Centro"
    ],
    "Polorós": [
      "Centro"
    ],
    "San José": [
      "Centro"
    ],
    "Santa Rosa de Lima": [
      "Centro"
    ],
    "Conchagua": [
      "Centro"
    ],
    "El Carmen": [
      "Centro"
    ],
    "Intipucá": [
      "Centro"
    ],
    "La Unión": [
      "Centro"
    ],
    "Meanguera del Golfo": [
      "Centro"
    ],
    "San Alejo": [
      "Centro"
    ],
    "Yayantique": [
      "Centro"
    ],
    "Yucuaiquín": [
      "Centro"
    ]
  },
  "Morazán": {
    "Arambala": [
      "Centro"
    ],
    "Cacaopera": [
      "Centro"
    ],
    "Corinto": [
      "Centro"
    ],
    "El Rosario": [
      "Centro"
    ],
    "Joateca": [
      "Centro"
    ],
    "Jocoaitique": [
      "Centro"
    ],
    "Meanguera": [
      "Centro"
    ],
    "Perquín": [
      "Centro"
    ],
    "San Fernando": [
      "Centro"
    ],
    "San Isidro": [
      "Centro"
    ],
    "Torola": [
      "Centro"
    ],
    "Chilanga": [
      "Centro"
    ],
    "Delicias de Concepción": [
      "Centro"
    ],
    "El Divisadero": [
      "Centro"
    ],
    "Gualococti": [
      "Centro"
    ],
    "Guatajiagua": [
      "Centro"
    ],
    "Jocoro": [
      "Centro"
    ],
    "Lolotiquillo": [
      "Centro"
    ],
    "Osicala": [
      "Centro"
    ],
    "San Carlos": [
      "Centro"
    ],
    "San Francisco Gotera": [
      "Centro"
    ],
    "San Simón": [
      "Centro"
    ],
    "Sensembra": [
      "Centro"
    ],
    "Sociedad": [
      "Centro"
    ],
    "Yamabal": [
      "Centro"
    ],
    "Yoloaiquín": [
      "Centro"
    ]
  },
  "San Miguel": {
    "Chirilagua": [
      "Centro"
    ],
    "Comacarán": [
      "Centro"
    ],
    "Moncagua": [
      "Centro"
    ],
    "Quelepa": [
      "Centro"
    ],
    "San Miguel": [
      "Centro"
    ],
    "Uluazapa": [
      "Centro"
    ],
    "Carolina": [
      "Centro"
    ],
    "Chapeltique": [
      "Centro"
    ],
    "Ciudad Barrios": [
      "Centro"
    ],
    "Nuevo Edén de San Juan": [
      "Centro"
    ],
    "San Antonio": [
      "Centro"
    ],
    "San Gerardo": [
      "Centro"
    ],
    "San Luis de la Reina": [
      "Centro"
    ],
    "Sesori": [
      "Centro"
    ],
    "Chinameca": [
      "Centro"
    ],
    "El Tránsito": [
      "Centro"
    ],
    "Lolotique": [
      "Centro"
    ],
    "Nueva Guadalupe": [
      "Centro"
    ],
    "San Jorge": [
      "Centro"
    ],
    "San Rafael": [
      "Centro"
    ]
  },
  "San Salvador": {
    "Ayutuxtepeque": [
      "Centro"
    ],
    "Cuscatancingo": [
      "Centro"
    ],
    "Delgado": [
      "Centro"
    ],
    "Mejicanos": [
      "Centro"
    ],
    "San Salvador": [
      "Centro"
    ],
    "Ilopango": [
      "Centro"
    ],
    "San Martín": [
      "Centro"
    ],
    "Soyapango": [
      "Centro"
    ],
    "Tonacatepeque": [
      "Centro"
    ],
    "Aguilares": [
      "Centro"
    ],
    "El Paisnal": [
      "Centro"
    ],
    "Guazapa": [
      "Centro"
    ],
    "Apopa": [
      "Centro"
    ],
    "Nejapa": [
      "Centro"
    ],
    "Panchimalco": [
      "Centro"
    ],
    "Rosario de Mora": [
      "Centro"
    ],
    "San Marcos": [
      "Centro"
    ],
    "Santiago Texacuangos": [
      "Centro"
    ],
    "Santo Tomás": [
      "Centro"
    ],
    "Lago de Llopango": [
      "Centro"
    ]
  },
  "San Vicente": {
    "Apastepeque": [
      "Centro"
    ],
    "San Esteban Catarina": [
      "Centro"
    ],
    "San Ildefonso": [
      "Centro"
    ],
    "San Lorenzo": [
      "Centro"
    ],
    "San Sebastián": [
      "Centro"
    ],
    "Santa Clara": [
      "Centro"
    ],
    "Santo Domingo": [
      "Centro"
    ],
    "Guadalupe": [
      "Centro"
    ],
    "San Cayetano Istepeque": [
      "Centro"
    ],
    "San Vicente": [
      "Centro"
    ],
    "Tecoluca": [
      "Centro"
    ],
    "Tepetitán": [
      "Centro"
    ],
    "Verapaz": [
      "Centro"
    ]
  },
  "Santa Ana": {
    "Santa Ana": [
      "Centro"
    ],
    "Coatepeque": [
      "Centro"
    ],
    "El Congo": [
      "Centro"
    ],
    "Masahuat": [
      "Centro"
    ],
    "Metapán": [
      "Centro"
    ],
    "Santa Rosa Guachipilín": [
      "Centro"
    ],
    "Texistepeque": [
      "Centro"
    ],
    "Candelaria de la Frontera": [
      "Centro"
    ],
    "Chalchuapa": [
      "Centro"
    ],
    "El Porvenir": [
      "Centro"
    ],
    "San Antonio Pajonal": [
      "Centro"
    ],
    "San Sebastián Salitrillo": [
      "Centro"
    ],
    "Santiago de la Frontera": [
      "Centro"
    ],
    "Lago de Guija": [
      "Centro"
    ],
    "Lago de Coatepeque": [
      "Centro"
    ]
  },
  "Sonsonate": {
    "Nahulingo": [
      "Centro"
    ],
    "San Antonio del Monte": [
      "Centro"
    ],
    "Santo Domingo": [
      "Centro"
    ],
    "Sonsonate": [
      "Centro"
    ],
    "Sonzacate": [
      "Centro"
    ],
    "Armenia": [
      "Centro"
    ],
    "Caluco": [
      "Centro"
    ],
    "Cuisnahuat": [
      "Centro"
    ],
    "Izalco": [
      "Centro"
    ],
    "San Julián": [
      "Centro"
    ],
    "Santa Isabel Ishuatán": [
      "Centro"
    ],
    "Juayúa": [
      "Centro"
    ],
    "Nahuizalco": [
      "Centro"
    ],
    "Salcoatitán": [
      "Centro"
    ],
    "Santa Catarina Masahuat": [
      "Centro"
    ],
    "Acajutla": [
      "Centro"
    ]
  },
  "Usulután": {
    "California": [
      "Centro"
    ],
    "Concepción Batres": [
      "Centro"
    ],
    "Ereguayquín": [
      "Centro"
    ],
    "Jucuarán": [
      "Centro"
    ],
    "Ozatlán": [
      "Centro"
    ],
    "San Dionisio": [
      "Centro"
    ],
    "Santa Elena": [
      "Centro"
    ],
    "Santa María": [
      "Centro"
    ],
    "Tecapán": [
      "Centro"
    ],
    "Usulután": [
      "Centro"
    ],
    "Alegría": [
      "Centro"
    ],
    "Berlín": [
      "Centro"
    ],
    "El Triunfo": [
      "Centro"
    ],
    "Estanzuelas": [
      "Centro"
    ],
    "Jucuapa": [
      "Centro"
    ],
    "Mercedes Umaña": [
      "Centro"
    ],
    "Nueva Granada": [
      "Centro"
    ],
    "San Buenaventura": [
      "Centro"
    ],
    "Santiago de María": [
      "Centro"
    ],
    "Jiquilisco": [
      "Centro"
    ],
    "Puerto El Triunfo": [
      "Centro"
    ],
    "San Agustín": [
      "Centro"
    ],
    "San Francisco Javier": [
      "Centro"
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
