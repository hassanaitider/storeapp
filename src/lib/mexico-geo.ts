import { mergePlaceOptions } from "./latam-neighborhoods";

/** Mexico — complete Estado → Municipio → Colonia list. */
export type MexicoGeoTree = Record<string, Record<string, string[]>>;

export const GEO_MX: MexicoGeoTree = {
  "Aguascalientes": {
    "Aguascalientes": [
      "Centro"
    ],
    "Asientos": [
      "Centro"
    ],
    "Calvillo": [
      "Centro"
    ],
    "Cosío": [
      "Centro"
    ],
    "El Llano": [
      "Centro"
    ],
    "Jesús María": [
      "Centro"
    ],
    "Pabellón de Arteaga": [
      "Centro"
    ],
    "Rincón de Romos": [
      "Centro"
    ],
    "San Francisco de los Romo": [
      "Centro"
    ],
    "San José de Gracia": [
      "Centro"
    ],
    "Tepezalá": [
      "Centro"
    ]
  },
  "Baja California": {
    "Ensenada": [
      "Centro"
    ],
    "Mexicali": [
      "Centro"
    ],
    "Playas de Rosarito": [
      "Centro"
    ],
    "Tecate": [
      "Centro"
    ],
    "Tijuana": [
      "Centro"
    ]
  },
  "Baja California Sur": {
    "Comondú": [
      "Centro"
    ],
    "La Paz": [
      "Centro"
    ],
    "Loreto": [
      "Centro"
    ],
    "Los Cabos": [
      "Centro"
    ],
    "Mulegé": [
      "Centro"
    ]
  },
  "Campeche": {
    "Calakmul": [
      "Centro"
    ],
    "Calkiní": [
      "Centro"
    ],
    "Campeche": [
      "Centro"
    ],
    "Candelaria": [
      "Centro"
    ],
    "Carmen": [
      "Centro"
    ],
    "Champotón": [
      "Centro"
    ],
    "Escárcega": [
      "Centro"
    ],
    "Hecelchakán": [
      "Centro"
    ],
    "Hopelchén": [
      "Centro"
    ],
    "Palizada": [
      "Centro"
    ],
    "Tenabo": [
      "Centro"
    ]
  },
  "Chiapas": {
    "Acacoyagua": [
      "Centro"
    ],
    "Acala": [
      "Centro"
    ],
    "Acapetahua": [
      "Centro"
    ],
    "Aldama": [
      "Centro"
    ],
    "Altamirano": [
      "Centro"
    ],
    "Amatán": [
      "Centro"
    ],
    "Amatenango de la Frontera": [
      "Centro"
    ],
    "Amatenango del Valle": [
      "Centro"
    ],
    "Angel Albino Corzo": [
      "Centro"
    ],
    "Arriaga": [
      "Centro"
    ],
    "Bejucal de Ocampo": [
      "Centro"
    ],
    "Bella Vista": [
      "Centro"
    ],
    "Benemérito de las Américas": [
      "Centro"
    ],
    "Berriozábal": [
      "Centro"
    ],
    "Bochil": [
      "Centro"
    ],
    "Cacahoatán": [
      "Centro"
    ],
    "Catazajá": [
      "Centro"
    ],
    "Chalchihuitán": [
      "Centro"
    ],
    "Chamula": [
      "Centro"
    ],
    "Chanal": [
      "Centro"
    ],
    "Chapultenango": [
      "Centro"
    ],
    "Chenalhó": [
      "Centro"
    ],
    "Chiapa de Corzo": [
      "Centro"
    ],
    "Chiapilla": [
      "Centro"
    ],
    "Chicoasén": [
      "Centro"
    ],
    "Chicomuselo": [
      "Centro"
    ],
    "Chilón": [
      "Centro"
    ],
    "Cintalapa": [
      "Centro"
    ],
    "Coapilla": [
      "Centro"
    ],
    "Comitán de Domínguez": [
      "Centro"
    ],
    "Copainalá": [
      "Centro"
    ],
    "El Bosque": [
      "Centro"
    ],
    "El Porvenir": [
      "Centro"
    ],
    "Escuintla": [
      "Centro"
    ],
    "Francisco León": [
      "Centro"
    ],
    "Frontera Comalapa": [
      "Centro"
    ],
    "Frontera Hidalgo": [
      "Centro"
    ],
    "Huehuetán": [
      "Centro"
    ],
    "Huitiupán": [
      "Centro"
    ],
    "Huixtán": [
      "Centro"
    ],
    "Huixtla": [
      "Centro"
    ],
    "Ixhuatán": [
      "Centro"
    ],
    "Ixtacomitán": [
      "Centro"
    ],
    "Ixtapa": [
      "Centro"
    ],
    "Ixtapangajoya": [
      "Centro"
    ],
    "Jiquipilas": [
      "Centro"
    ],
    "Jitotol": [
      "Centro"
    ],
    "Juárez": [
      "Centro"
    ],
    "La Concordia": [
      "Centro"
    ],
    "La Grandeza": [
      "Centro"
    ],
    "La Independencia": [
      "Centro"
    ],
    "La Libertad": [
      "Centro"
    ],
    "La Trinitaria": [
      "Centro"
    ],
    "Larráinzar": [
      "Centro"
    ],
    "Las Margaritas": [
      "Centro"
    ],
    "Las Rosas": [
      "Centro"
    ],
    "Mapastepec": [
      "Centro"
    ],
    "Maravilla Tenejapa": [
      "Centro"
    ],
    "Marqués de Comillas": [
      "Centro"
    ],
    "Mazapa de Madero": [
      "Centro"
    ],
    "Mazatán": [
      "Centro"
    ],
    "Metapa": [
      "Centro"
    ],
    "Mitontic": [
      "Centro"
    ],
    "Montecristo de Guerrero": [
      "Centro"
    ],
    "Motozintla": [
      "Centro"
    ],
    "Nicolás Ruíz": [
      "Centro"
    ],
    "Ocosingo": [
      "Centro"
    ],
    "Ocotepec": [
      "Centro"
    ],
    "Ocozocoautla de Espinosa": [
      "Centro"
    ],
    "Ostuacán": [
      "Centro"
    ],
    "Osumacinta": [
      "Centro"
    ],
    "Oxchuc": [
      "Centro"
    ],
    "Palenque": [
      "Centro"
    ],
    "Pantelhó": [
      "Centro"
    ],
    "Pantepec": [
      "Centro"
    ],
    "Pichucalco": [
      "Centro"
    ],
    "Pijijiapan": [
      "Centro"
    ],
    "Pueblo Nuevo Solistahuacán": [
      "Centro"
    ],
    "Rayón": [
      "Centro"
    ],
    "Reforma": [
      "Centro"
    ],
    "Sabanilla": [
      "Centro"
    ],
    "Salto de Agua": [
      "Centro"
    ],
    "San Andrés Duraznal": [
      "Centro"
    ],
    "San Cristóbal de las Casas": [
      "Centro"
    ],
    "San Fernando": [
      "Centro"
    ],
    "San Juan Cancuc": [
      "Centro"
    ],
    "San Lucas": [
      "Centro"
    ],
    "Santiago el Pinar": [
      "Centro"
    ],
    "Siltepec": [
      "Centro"
    ],
    "Simojovel": [
      "Centro"
    ],
    "Sitalá": [
      "Centro"
    ],
    "Socoltenango": [
      "Centro"
    ],
    "Solosuchiapa": [
      "Centro"
    ],
    "Soyaló": [
      "Centro"
    ],
    "Suchiapa": [
      "Centro"
    ],
    "Suchiate": [
      "Centro"
    ],
    "Sunuapa": [
      "Centro"
    ],
    "Tapachula": [
      "Centro"
    ],
    "Tapalapa": [
      "Centro"
    ],
    "Tapilula": [
      "Centro"
    ],
    "Tecpatán": [
      "Centro"
    ],
    "Tenejapa": [
      "Centro"
    ],
    "Teopisca": [
      "Centro"
    ],
    "Tila": [
      "Centro"
    ],
    "Tonalá": [
      "Centro"
    ],
    "Totolapa": [
      "Centro"
    ],
    "Tumbalá": [
      "Centro"
    ],
    "Tuxtla Chico": [
      "Centro"
    ],
    "Tuxtla Gutiérrez": [
      "Centro"
    ],
    "Tuzantán": [
      "Centro"
    ],
    "Tzimol": [
      "Centro"
    ],
    "Unión Juárez": [
      "Centro"
    ],
    "Venustiano Carranza": [
      "Centro"
    ],
    "Villa Comaltitlán": [
      "Centro"
    ],
    "Villa Corzo": [
      "Centro"
    ],
    "Villaflores": [
      "Centro"
    ],
    "Yajalón": [
      "Centro"
    ],
    "Zinacantán": [
      "Centro"
    ]
  },
  "Chihuahua": {
    "Ahumada": [
      "Centro"
    ],
    "Aldama": [
      "Centro"
    ],
    "Allende": [
      "Centro"
    ],
    "Aquiles Serdán": [
      "Centro"
    ],
    "Ascensión": [
      "Centro"
    ],
    "Bachíniva": [
      "Centro"
    ],
    "Balleza": [
      "Centro"
    ],
    "Batopilas": [
      "Centro"
    ],
    "Bocoyna": [
      "Centro"
    ],
    "Buenaventura": [
      "Centro"
    ],
    "Camargo": [
      "Centro"
    ],
    "Carichí": [
      "Centro"
    ],
    "Casas Grandes": [
      "Centro"
    ],
    "Chihuahua": [
      "Centro"
    ],
    "Chínipas": [
      "Centro"
    ],
    "Coronado": [
      "Centro"
    ],
    "Coyame del Sotol": [
      "Centro"
    ],
    "Cuauhtémoc": [
      "Centro"
    ],
    "Cusihuiriachi": [
      "Centro"
    ],
    "Delicias": [
      "Centro"
    ],
    "Dr. Belisario Domínguez": [
      "Centro"
    ],
    "El Tule": [
      "Centro"
    ],
    "Galeana": [
      "Centro"
    ],
    "Gómez Farías": [
      "Centro"
    ],
    "Gran Morelos": [
      "Centro"
    ],
    "Guachochi": [
      "Centro"
    ],
    "Guadalupe": [
      "Centro"
    ],
    "Guadalupe y Calvo": [
      "Centro"
    ],
    "Guazapares": [
      "Centro"
    ],
    "Guerrero": [
      "Centro"
    ],
    "Hidalgo del Parral": [
      "Centro"
    ],
    "Huejotitán": [
      "Centro"
    ],
    "Ignacio Zaragoza": [
      "Centro"
    ],
    "Janos": [
      "Centro"
    ],
    "Jiménez": [
      "Centro"
    ],
    "Juárez": [
      "Centro"
    ],
    "Julimes": [
      "Centro"
    ],
    "La Cruz": [
      "Centro"
    ],
    "López": [
      "Centro"
    ],
    "Madera": [
      "Centro"
    ],
    "Maguarichi": [
      "Centro"
    ],
    "Manuel Benavides": [
      "Centro"
    ],
    "Matachí": [
      "Centro"
    ],
    "Matamoros": [
      "Centro"
    ],
    "Meoqui": [
      "Centro"
    ],
    "Morelos": [
      "Centro"
    ],
    "Moris": [
      "Centro"
    ],
    "Namiquipa": [
      "Centro"
    ],
    "Nonoava": [
      "Centro"
    ],
    "Nuevo Casas Grandes": [
      "Centro"
    ],
    "Ocampo": [
      "Centro"
    ],
    "Ojinaga": [
      "Centro"
    ],
    "Praxedis G. Guerrero": [
      "Centro"
    ],
    "Riva Palacio": [
      "Centro"
    ],
    "Rosales": [
      "Centro"
    ],
    "Rosario": [
      "Centro"
    ],
    "San Francisco de Borja": [
      "Centro"
    ],
    "San Francisco de Conchos": [
      "Centro"
    ],
    "San Francisco del Oro": [
      "Centro"
    ],
    "Santa Bárbara": [
      "Centro"
    ],
    "Santa Isabel": [
      "Centro"
    ],
    "Satevó": [
      "Centro"
    ],
    "Saucillo": [
      "Centro"
    ],
    "Temósachic": [
      "Centro"
    ],
    "Urique": [
      "Centro"
    ],
    "Uruachi": [
      "Centro"
    ],
    "Valle de Zaragoza": [
      "Centro"
    ]
  },
  "Coahuila de Zaragoza": {
    "Abasolo": [
      "Centro"
    ],
    "Acuña": [
      "Centro"
    ],
    "Allende": [
      "Centro"
    ],
    "Arteaga": [
      "Centro"
    ],
    "Candela": [
      "Centro"
    ],
    "Castaños": [
      "Centro"
    ],
    "Cuatro Ciénegas": [
      "Centro"
    ],
    "Escobedo": [
      "Centro"
    ],
    "Francisco I. Madero": [
      "Centro"
    ],
    "Frontera": [
      "Centro"
    ],
    "General Cepeda": [
      "Centro"
    ],
    "Guerrero": [
      "Centro"
    ],
    "Hidalgo": [
      "Centro"
    ],
    "Jiménez": [
      "Centro"
    ],
    "Juárez": [
      "Centro"
    ],
    "Lamadrid": [
      "Centro"
    ],
    "Matamoros": [
      "Centro"
    ],
    "Monclova": [
      "Centro"
    ],
    "Morelos": [
      "Centro"
    ],
    "Múzquiz": [
      "Centro"
    ],
    "Nadadores": [
      "Centro"
    ],
    "Nava": [
      "Centro"
    ],
    "Ocampo": [
      "Centro"
    ],
    "Parras": [
      "Centro"
    ],
    "Piedras Negras": [
      "Centro"
    ],
    "Progreso": [
      "Centro"
    ],
    "Ramos Arizpe": [
      "Centro"
    ],
    "Sabinas": [
      "Centro"
    ],
    "Sacramento": [
      "Centro"
    ],
    "Saltillo": [
      "Centro"
    ],
    "San Buenaventura": [
      "Centro"
    ],
    "San Juan de Sabinas": [
      "Centro"
    ],
    "San Pedro": [
      "Centro"
    ],
    "Sierra Mojada": [
      "Centro"
    ],
    "Torreón": [
      "Centro"
    ],
    "Viesca": [
      "Centro"
    ],
    "Villa Unión": [
      "Centro"
    ],
    "Zaragoza": [
      "Centro"
    ]
  },
  "Colima": {
    "Armería": [
      "Centro"
    ],
    "Colima": [
      "Centro"
    ],
    "Comala": [
      "Centro"
    ],
    "Coquimatlán": [
      "Centro"
    ],
    "Cuauhtémoc": [
      "Centro"
    ],
    "Ixtlahuacán": [
      "Centro"
    ],
    "Manzanillo": [
      "Centro"
    ],
    "Minatitlán": [
      "Centro"
    ],
    "Tecomán": [
      "Centro"
    ],
    "Villa de Álvarez": [
      "Centro"
    ]
  },
  "Distrito Federal": {
    "Álvaro Obregón": [
      "Centro",
      "San Ángel",
      "Florida",
      "Santa Fe",
      "Las Águilas"
    ],
    "Azcapotzalco": [
      "Centro"
    ],
    "Benito Juárez": [
      "Centro",
      "Del Valle",
      "Narvarte",
      "Nápoles",
      "Portales"
    ],
    "Coyoacán": [
      "Centro",
      "Del Carmen",
      "Copilco",
      "Pedregal de Santo Domingo"
    ],
    "Cuajimalpa de Morelos": [
      "Centro"
    ],
    "Cuauhtémoc": [
      "Centro",
      "Roma Norte",
      "Condesa",
      "Juárez",
      "Doctores"
    ],
    "Gustavo A. Madero": [
      "Centro",
      "Lindavista",
      "Aragón",
      "Cuautepec"
    ],
    "Iztacalco": [
      "Centro"
    ],
    "Iztapalapa": [
      "Centro",
      "Santa Cruz Meyehualco",
      "San Miguel Teotongo"
    ],
    "La Magdalena Contreras": [
      "Centro"
    ],
    "Miguel Hidalgo": [
      "Centro",
      "Polanco",
      "Anzures",
      "Lomas de Chapultepec"
    ],
    "Milpa Alta": [
      "Centro"
    ],
    "Tláhuac": [
      "Centro"
    ],
    "Tlalpan": [
      "Centro",
      "Coapa",
      "Pedregal de San Ángel"
    ],
    "Venustiano Carranza": [
      "Centro"
    ],
    "Xochimilco": [
      "Centro"
    ]
  },
  "Durango": {
    "Canatlán": [
      "Centro"
    ],
    "Canelas": [
      "Centro"
    ],
    "Coneto de Comonfort": [
      "Centro"
    ],
    "Cuencamé": [
      "Centro"
    ],
    "Durango": [
      "Centro"
    ],
    "El Oro": [
      "Centro"
    ],
    "General Simón Bolívar": [
      "Centro"
    ],
    "Gómez Palacio": [
      "Centro"
    ],
    "Guadalupe Victoria": [
      "Centro"
    ],
    "Guanaceví": [
      "Centro"
    ],
    "Hidalgo": [
      "Centro"
    ],
    "Indé": [
      "Centro"
    ],
    "Lerdo": [
      "Centro"
    ],
    "Mapimí": [
      "Centro"
    ],
    "Mezquital": [
      "Centro"
    ],
    "Nazas": [
      "Centro"
    ],
    "Nombre de Dios": [
      "Centro"
    ],
    "Nuevo Ideal": [
      "Centro"
    ],
    "Ocampo": [
      "Centro"
    ],
    "Otáez": [
      "Centro"
    ],
    "Pánuco de Coronado": [
      "Centro"
    ],
    "Peñón Blanco": [
      "Centro"
    ],
    "Poanas": [
      "Centro"
    ],
    "Pueblo Nuevo": [
      "Centro"
    ],
    "Rodeo": [
      "Centro"
    ],
    "San Bernardo": [
      "Centro"
    ],
    "San Dimas": [
      "Centro"
    ],
    "San Juan de Guadalupe": [
      "Centro"
    ],
    "San Juan del Río": [
      "Centro"
    ],
    "San Luis del Cordero": [
      "Centro"
    ],
    "San Pedro del Gallo": [
      "Centro"
    ],
    "Santa Clara": [
      "Centro"
    ],
    "Santiago Papasquiaro": [
      "Centro"
    ],
    "Súchil": [
      "Centro"
    ],
    "Tamazula": [
      "Centro"
    ],
    "Tepehuanes": [
      "Centro"
    ],
    "Tlahualilo": [
      "Centro"
    ],
    "Topia": [
      "Centro"
    ],
    "Vicente Guerrero": [
      "Centro"
    ]
  },
  "Guanajuato": {
    "Abasolo": [
      "Centro"
    ],
    "Acámbaro": [
      "Centro"
    ],
    "Apaseo el Alto": [
      "Centro"
    ],
    "Apaseo el Grande": [
      "Centro"
    ],
    "Atarjea": [
      "Centro"
    ],
    "Celaya": [
      "Centro"
    ],
    "Comonfort": [
      "Centro"
    ],
    "Coroneo": [
      "Centro"
    ],
    "Cortazar": [
      "Centro"
    ],
    "Cuerámaro": [
      "Centro"
    ],
    "Doctor Mora": [
      "Centro"
    ],
    "Dolores Hidalgo Cuna de la Independencia Nacional": [
      "Centro"
    ],
    "Guanajuato": [
      "Centro"
    ],
    "Huanímaro": [
      "Centro"
    ],
    "Irapuato": [
      "Centro"
    ],
    "Jaral del Progreso": [
      "Centro"
    ],
    "Jerécuaro": [
      "Centro"
    ],
    "León": [
      "Centro"
    ],
    "Manuel Doblado": [
      "Centro"
    ],
    "Moroleón": [
      "Centro"
    ],
    "Ocampo": [
      "Centro"
    ],
    "Pénjamo": [
      "Centro"
    ],
    "Pueblo Nuevo": [
      "Centro"
    ],
    "Purísima del Rincón": [
      "Centro"
    ],
    "Romita": [
      "Centro"
    ],
    "Salamanca": [
      "Centro"
    ],
    "Salvatierra": [
      "Centro"
    ],
    "San Diego de la Unión": [
      "Centro"
    ],
    "San Felipe": [
      "Centro"
    ],
    "San Francisco del Rincón": [
      "Centro"
    ],
    "San José Iturbide": [
      "Centro"
    ],
    "San Luis de la Paz": [
      "Centro"
    ],
    "San Miguel de Allende": [
      "Centro"
    ],
    "Santa Catarina": [
      "Centro"
    ],
    "Santa Cruz de Juventino Rosas": [
      "Centro"
    ],
    "Santiago Maravatío": [
      "Centro"
    ],
    "Silao de la Victoria": [
      "Centro"
    ],
    "Tarandacuao": [
      "Centro"
    ],
    "Tarimoro": [
      "Centro"
    ],
    "Tierra Blanca": [
      "Centro"
    ],
    "Uriangato": [
      "Centro"
    ],
    "Valle de Santiago": [
      "Centro"
    ],
    "Victoria": [
      "Centro"
    ],
    "Villagrán": [
      "Centro"
    ],
    "Xichú": [
      "Centro"
    ],
    "Yuriria": [
      "Centro"
    ]
  },
  "Guerrero": {
    "Acapulco de Juárez": [
      "Centro"
    ],
    "Acatepec": [
      "Centro"
    ],
    "Ahuacuotzingo": [
      "Centro"
    ],
    "Ajuchitlán del Progreso": [
      "Centro"
    ],
    "Alcozauca de Guerrero": [
      "Centro"
    ],
    "Alpoyeca": [
      "Centro"
    ],
    "Apaxtla": [
      "Centro"
    ],
    "Arcelia": [
      "Centro"
    ],
    "Atenango del Río": [
      "Centro"
    ],
    "Atlamajalcingo del Monte": [
      "Centro"
    ],
    "Atlixtac": [
      "Centro"
    ],
    "Atoyac de Álvarez": [
      "Centro"
    ],
    "Ayutla de los Libres": [
      "Centro"
    ],
    "Azoyú": [
      "Centro"
    ],
    "Benito Juárez": [
      "Centro"
    ],
    "Buenavista de Cuéllar": [
      "Centro"
    ],
    "Chilapa de Álvarez": [
      "Centro"
    ],
    "Chilpancingo de los Bravo": [
      "Centro"
    ],
    "Coahuayutla de José María Izazaga": [
      "Centro"
    ],
    "Cochoapa el Grande": [
      "Centro"
    ],
    "Cocula": [
      "Centro"
    ],
    "Copala": [
      "Centro"
    ],
    "Copalillo": [
      "Centro"
    ],
    "Copanatoyac": [
      "Centro"
    ],
    "Coyuca de Benítez": [
      "Centro"
    ],
    "Coyuca de Catalán": [
      "Centro"
    ],
    "Cuajinicuilapa": [
      "Centro"
    ],
    "Cualác": [
      "Centro"
    ],
    "Cuautepec": [
      "Centro"
    ],
    "Cuetzala del Progreso": [
      "Centro"
    ],
    "Cutzamala de Pinzón": [
      "Centro"
    ],
    "Eduardo Neri": [
      "Centro"
    ],
    "Florencio Villarreal": [
      "Centro"
    ],
    "General Canuto A. Neri": [
      "Centro"
    ],
    "General Heliodoro Castillo": [
      "Centro"
    ],
    "Huamuxtitlán": [
      "Centro"
    ],
    "Huitzuco de los Figueroa": [
      "Centro"
    ],
    "Iguala de la Independencia": [
      "Centro"
    ],
    "Igualapa": [
      "Centro"
    ],
    "Iliatenco": [
      "Centro"
    ],
    "Ixcateopan de Cuauhtémoc": [
      "Centro"
    ],
    "José Joaquín de Herrera": [
      "Centro"
    ],
    "Juan R. Escudero": [
      "Centro"
    ],
    "Juchitán": [
      "Centro"
    ],
    "La Unión de Isidoro Montes de Oca": [
      "Centro"
    ],
    "Leonardo Bravo": [
      "Centro"
    ],
    "Malinaltepec": [
      "Centro"
    ],
    "Marquelia": [
      "Centro"
    ],
    "Mártir de Cuilapan": [
      "Centro"
    ],
    "Metlatónoc": [
      "Centro"
    ],
    "Mochitlán": [
      "Centro"
    ],
    "Olinalá": [
      "Centro"
    ],
    "Ometepec": [
      "Centro"
    ],
    "Pedro Ascencio Alquisiras": [
      "Centro"
    ],
    "Petatlán": [
      "Centro"
    ],
    "Pilcaya": [
      "Centro"
    ],
    "Pungarabato": [
      "Centro"
    ],
    "Quechultenango": [
      "Centro"
    ],
    "San Luis Acatlán": [
      "Centro"
    ],
    "San Marcos": [
      "Centro"
    ],
    "San Miguel Totolapan": [
      "Centro"
    ],
    "Taxco de Alarcón": [
      "Centro"
    ],
    "Tecoanapa": [
      "Centro"
    ],
    "Técpan de Galeana": [
      "Centro"
    ],
    "Teloloapan": [
      "Centro"
    ],
    "Tepecoacuilco de Trujano": [
      "Centro"
    ],
    "Tetipac": [
      "Centro"
    ],
    "Tixtla de Guerrero": [
      "Centro"
    ],
    "Tlacoachistlahuaca": [
      "Centro"
    ],
    "Tlacoapa": [
      "Centro"
    ],
    "Tlalchapa": [
      "Centro"
    ],
    "Tlalixtaquilla de Maldonado": [
      "Centro"
    ],
    "Tlapa de Comonfort": [
      "Centro"
    ],
    "Tlapehuala": [
      "Centro"
    ],
    "Xalpatláhuac": [
      "Centro"
    ],
    "Xochihuehuetlán": [
      "Centro"
    ],
    "Xochistlahuaca": [
      "Centro"
    ],
    "Zapotitlán Tablas": [
      "Centro"
    ],
    "Zihuatanejo de Azueta": [
      "Centro"
    ],
    "Zirándaro": [
      "Centro"
    ],
    "Zitlala": [
      "Centro"
    ]
  },
  "Hidalgo": {
    "Acatlán": [
      "Centro"
    ],
    "Acaxochitlán": [
      "Centro"
    ],
    "Actopan": [
      "Centro"
    ],
    "Agua Blanca de Iturbide": [
      "Centro"
    ],
    "Ajacuba": [
      "Centro"
    ],
    "Alfajayucan": [
      "Centro"
    ],
    "Almoloya": [
      "Centro"
    ],
    "Apan": [
      "Centro"
    ],
    "Atitalaquia": [
      "Centro"
    ],
    "Atlapexco": [
      "Centro"
    ],
    "Atotonilco de Tula": [
      "Centro"
    ],
    "Atotonilco el Grande": [
      "Centro"
    ],
    "Calnali": [
      "Centro"
    ],
    "Cardonal": [
      "Centro"
    ],
    "Chapantongo": [
      "Centro"
    ],
    "Chapulhuacán": [
      "Centro"
    ],
    "Chilcuautla": [
      "Centro"
    ],
    "Cuautepec de Hinojosa": [
      "Centro"
    ],
    "El Arenal": [
      "Centro"
    ],
    "Eloxochitlán": [
      "Centro"
    ],
    "Emiliano Zapata": [
      "Centro"
    ],
    "Epazoyucan": [
      "Centro"
    ],
    "Francisco I. Madero": [
      "Centro"
    ],
    "Huasca de Ocampo": [
      "Centro"
    ],
    "Huautla": [
      "Centro"
    ],
    "Huazalingo": [
      "Centro"
    ],
    "Huehuetla": [
      "Centro"
    ],
    "Huejutla de Reyes": [
      "Centro"
    ],
    "Huichapan": [
      "Centro"
    ],
    "Ixmiquilpan": [
      "Centro"
    ],
    "Jacala de Ledezma": [
      "Centro"
    ],
    "Jaltocán": [
      "Centro"
    ],
    "Juárez Hidalgo": [
      "Centro"
    ],
    "La Misión": [
      "Centro"
    ],
    "Lolotla": [
      "Centro"
    ],
    "Metepec": [
      "Centro"
    ],
    "Metztitlán": [
      "Centro"
    ],
    "Mineral de la Reforma": [
      "Centro"
    ],
    "Mineral del Chico": [
      "Centro"
    ],
    "Mineral del Monte": [
      "Centro"
    ],
    "Mixquiahuala de Juárez": [
      "Centro"
    ],
    "Molango de Escamilla": [
      "Centro"
    ],
    "Nicolás Flores": [
      "Centro"
    ],
    "Nopala de Villagrán": [
      "Centro"
    ],
    "Omitlán de Juárez": [
      "Centro"
    ],
    "Pachuca de Soto": [
      "Centro"
    ],
    "Pacula": [
      "Centro"
    ],
    "Pisaflores": [
      "Centro"
    ],
    "Progreso de Obregón": [
      "Centro"
    ],
    "San Agustín Metzquititlán": [
      "Centro"
    ],
    "San Agustín Tlaxiaca": [
      "Centro"
    ],
    "San Bartolo Tutotepec": [
      "Centro"
    ],
    "San Felipe Orizatlán": [
      "Centro"
    ],
    "San Salvador": [
      "Centro"
    ],
    "Santiago de Anaya": [
      "Centro"
    ],
    "Santiago Tulantepec de Lugo Guerrero": [
      "Centro"
    ],
    "Singuilucan": [
      "Centro"
    ],
    "Tasquillo": [
      "Centro"
    ],
    "Tecozautla": [
      "Centro"
    ],
    "Tenango de Doria": [
      "Centro"
    ],
    "Tepeapulco": [
      "Centro"
    ],
    "Tepehuacán de Guerrero": [
      "Centro"
    ],
    "Tepeji del Río de Ocampo": [
      "Centro"
    ],
    "Tepetitlán": [
      "Centro"
    ],
    "Tetepango": [
      "Centro"
    ],
    "Tezontepec de Aldama": [
      "Centro"
    ],
    "Tianguistengo": [
      "Centro"
    ],
    "Tizayuca": [
      "Centro"
    ],
    "Tlahuelilpan": [
      "Centro"
    ],
    "Tlahuiltepa": [
      "Centro"
    ],
    "Tlanalapa": [
      "Centro"
    ],
    "Tlanchinol": [
      "Centro"
    ],
    "Tlaxcoapan": [
      "Centro"
    ],
    "Tolcayuca": [
      "Centro"
    ],
    "Tula de Allende": [
      "Centro"
    ],
    "Tulancingo de Bravo": [
      "Centro"
    ],
    "Villa de Tezontepec": [
      "Centro"
    ],
    "Xochiatipan": [
      "Centro"
    ],
    "Xochicoatlán": [
      "Centro"
    ],
    "Yahualica": [
      "Centro"
    ],
    "Zacualtipán de Ángeles": [
      "Centro"
    ],
    "Zapotlán de Juárez": [
      "Centro"
    ],
    "Zempoala": [
      "Centro"
    ],
    "Zimapán": [
      "Centro"
    ]
  },
  "Jalisco": {
    "Acatic": [
      "Centro"
    ],
    "Acatlán de Juárez": [
      "Centro"
    ],
    "Ahualulco de Mercado": [
      "Centro"
    ],
    "Amacueca": [
      "Centro"
    ],
    "Amatitán": [
      "Centro"
    ],
    "Ameca": [
      "Centro"
    ],
    "Arandas": [
      "Centro"
    ],
    "Atemajac de Brizuela": [
      "Centro"
    ],
    "Atengo": [
      "Centro"
    ],
    "Atenguillo": [
      "Centro"
    ],
    "Atotonilco el Alto": [
      "Centro"
    ],
    "Atoyac": [
      "Centro"
    ],
    "Autlán de Navarro": [
      "Centro"
    ],
    "Ayotlán": [
      "Centro"
    ],
    "Ayutla": [
      "Centro"
    ],
    "Bolaños": [
      "Centro"
    ],
    "Cabo Corrientes": [
      "Centro"
    ],
    "Cañadas de Obregón": [
      "Centro"
    ],
    "Casimiro Castillo": [
      "Centro"
    ],
    "Chapala": [
      "Centro"
    ],
    "Chimaltitán": [
      "Centro"
    ],
    "Chiquilistlán": [
      "Centro"
    ],
    "Cihuatlán": [
      "Centro"
    ],
    "Cocula": [
      "Centro"
    ],
    "Colotlán": [
      "Centro"
    ],
    "Concepción de Buenos Aires": [
      "Centro"
    ],
    "Cuautitlán de García Barragán": [
      "Centro"
    ],
    "Cuautla": [
      "Centro"
    ],
    "Cuquío": [
      "Centro"
    ],
    "Degollado": [
      "Centro"
    ],
    "Ejutla": [
      "Centro"
    ],
    "El Arenal": [
      "Centro"
    ],
    "El Grullo": [
      "Centro"
    ],
    "El Limón": [
      "Centro"
    ],
    "El Salto": [
      "Centro"
    ],
    "Encarnación de Díaz": [
      "Centro"
    ],
    "Etzatlán": [
      "Centro"
    ],
    "Gómez Farías": [
      "Centro"
    ],
    "Guachinango": [
      "Centro"
    ],
    "Guadalajara": [
      "Centro"
    ],
    "Hostotipaquillo": [
      "Centro"
    ],
    "Huejúcar": [
      "Centro"
    ],
    "Huejuquilla el Alto": [
      "Centro"
    ],
    "Ixtlahuacán de los Membrillos": [
      "Centro"
    ],
    "Ixtlahuacán del Río": [
      "Centro"
    ],
    "Jalostotitlán": [
      "Centro"
    ],
    "Jamay": [
      "Centro"
    ],
    "Jesús María": [
      "Centro"
    ],
    "Jilotlán de los Dolores": [
      "Centro"
    ],
    "Jocotepec": [
      "Centro"
    ],
    "Juanacatlán": [
      "Centro"
    ],
    "Juchitlán": [
      "Centro"
    ],
    "La Barca": [
      "Centro"
    ],
    "La Huerta": [
      "Centro"
    ],
    "La Manzanilla de la Paz": [
      "Centro"
    ],
    "Lagos de Moreno": [
      "Centro"
    ],
    "Magdalena": [
      "Centro"
    ],
    "Mascota": [
      "Centro"
    ],
    "Mazamitla": [
      "Centro"
    ],
    "Mexticacán": [
      "Centro"
    ],
    "Mezquitic": [
      "Centro"
    ],
    "Mixtlán": [
      "Centro"
    ],
    "Ocotlán": [
      "Centro"
    ],
    "Ojuelos de Jalisco": [
      "Centro"
    ],
    "Pihuamo": [
      "Centro"
    ],
    "Poncitlán": [
      "Centro"
    ],
    "Puerto Vallarta": [
      "Centro"
    ],
    "Quitupan": [
      "Centro"
    ],
    "San Cristóbal de la Barranca": [
      "Centro"
    ],
    "San Diego de Alejandría": [
      "Centro"
    ],
    "San Gabriel": [
      "Centro"
    ],
    "San Ignacio Cerro Gordo": [
      "Centro"
    ],
    "San Juan de los Lagos": [
      "Centro"
    ],
    "San Juanito de Escobedo": [
      "Centro"
    ],
    "San Julián": [
      "Centro"
    ],
    "San Marcos": [
      "Centro"
    ],
    "San Martín de Bolaños": [
      "Centro"
    ],
    "San Martín Hidalgo": [
      "Centro"
    ],
    "San Miguel el Alto": [
      "Centro"
    ],
    "San Pedro Tlaquepaque": [
      "Centro"
    ],
    "San Sebastián del Oeste": [
      "Centro"
    ],
    "Santa María de los Ángeles": [
      "Centro"
    ],
    "Santa María del Oro": [
      "Centro"
    ],
    "Sayula": [
      "Centro"
    ],
    "Tala": [
      "Centro"
    ],
    "Talpa de Allende": [
      "Centro"
    ],
    "Tamazula de Gordiano": [
      "Centro"
    ],
    "Tapalpa": [
      "Centro"
    ],
    "Tecalitlán": [
      "Centro"
    ],
    "Techaluta de Montenegro": [
      "Centro"
    ],
    "Tecolotlán": [
      "Centro"
    ],
    "Tenamaxtlán": [
      "Centro"
    ],
    "Teocaltiche": [
      "Centro"
    ],
    "Teocuitatlán de Corona": [
      "Centro"
    ],
    "Tepatitlán de Morelos": [
      "Centro"
    ],
    "Tequila": [
      "Centro"
    ],
    "Teuchitlán": [
      "Centro"
    ],
    "Tizapán el Alto": [
      "Centro"
    ],
    "Tlajomulco de Zúñiga": [
      "Centro"
    ],
    "Tolimán": [
      "Centro"
    ],
    "Tomatlán": [
      "Centro"
    ],
    "Tonalá": [
      "Centro"
    ],
    "Tonaya": [
      "Centro"
    ],
    "Tonila": [
      "Centro"
    ],
    "Totatiche": [
      "Centro"
    ],
    "Tototlán": [
      "Centro"
    ],
    "Tuxcacuesco": [
      "Centro"
    ],
    "Tuxcueca": [
      "Centro"
    ],
    "Tuxpan": [
      "Centro"
    ],
    "Unión de San Antonio": [
      "Centro"
    ],
    "Unión de Tula": [
      "Centro"
    ],
    "Valle de Guadalupe": [
      "Centro"
    ],
    "Valle de Juárez": [
      "Centro"
    ],
    "Villa Corona": [
      "Centro"
    ],
    "Villa Guerrero": [
      "Centro"
    ],
    "Villa Hidalgo": [
      "Centro"
    ],
    "Villa Purificación": [
      "Centro"
    ],
    "Yahualica de González Gallo": [
      "Centro"
    ],
    "Zacoalco de Torres": [
      "Centro"
    ],
    "Zapopan": [
      "Centro"
    ],
    "Zapotiltic": [
      "Centro"
    ],
    "Zapotitlán de Vadillo": [
      "Centro"
    ],
    "Zapotlán del Rey": [
      "Centro"
    ],
    "Zapotlán el Grande": [
      "Centro"
    ],
    "Zapotlanejo": [
      "Centro"
    ]
  },
  "México": {
    "Acambay de Ruíz Castañeda": [
      "Centro"
    ],
    "Acolman": [
      "Centro"
    ],
    "Aculco": [
      "Centro"
    ],
    "Almoloya de Alquisiras": [
      "Centro"
    ],
    "Almoloya de Juárez": [
      "Centro"
    ],
    "Almoloya del Río": [
      "Centro"
    ],
    "Amanalco": [
      "Centro"
    ],
    "Amatepec": [
      "Centro"
    ],
    "Amecameca": [
      "Centro"
    ],
    "Apaxco": [
      "Centro"
    ],
    "Atenco": [
      "Centro"
    ],
    "Atizapán": [
      "Centro"
    ],
    "Atizapán de Zaragoza": [
      "Centro"
    ],
    "Atlacomulco": [
      "Centro"
    ],
    "Atlautla": [
      "Centro"
    ],
    "Axapusco": [
      "Centro"
    ],
    "Ayapango": [
      "Centro"
    ],
    "Calimaya": [
      "Centro"
    ],
    "Capulhuac": [
      "Centro"
    ],
    "Chalco": [
      "Centro"
    ],
    "Chapa de Mota": [
      "Centro"
    ],
    "Chapultepec": [
      "Centro"
    ],
    "Chiautla": [
      "Centro"
    ],
    "Chicoloapan": [
      "Centro"
    ],
    "Chiconcuac": [
      "Centro"
    ],
    "Chimalhuacán": [
      "Centro"
    ],
    "Coacalco de Berriozábal": [
      "Centro"
    ],
    "Coatepec Harinas": [
      "Centro"
    ],
    "Cocotitlán": [
      "Centro"
    ],
    "Coyotepec": [
      "Centro"
    ],
    "Cuautitlán": [
      "Centro"
    ],
    "Cuautitlán Izcalli": [
      "Centro"
    ],
    "Donato Guerra": [
      "Centro"
    ],
    "Ecatepec de Morelos": [
      "Centro"
    ],
    "Ecatzingo": [
      "Centro"
    ],
    "El Oro": [
      "Centro"
    ],
    "Huehuetoca": [
      "Centro"
    ],
    "Hueypoxtla": [
      "Centro"
    ],
    "Huixquilucan": [
      "Centro"
    ],
    "Isidro Fabela": [
      "Centro"
    ],
    "Ixtapaluca": [
      "Centro"
    ],
    "Ixtapan de la Sal": [
      "Centro"
    ],
    "Ixtapan del Oro": [
      "Centro"
    ],
    "Ixtlahuaca": [
      "Centro"
    ],
    "Jaltenco": [
      "Centro"
    ],
    "Jilotepec": [
      "Centro"
    ],
    "Jilotzingo": [
      "Centro"
    ],
    "Jiquipilco": [
      "Centro"
    ],
    "Jocotitlán": [
      "Centro"
    ],
    "Joquicingo": [
      "Centro"
    ],
    "Juchitepec": [
      "Centro"
    ],
    "La Paz": [
      "Centro"
    ],
    "Lerma": [
      "Centro"
    ],
    "Luvianos": [
      "Centro"
    ],
    "Malinalco": [
      "Centro"
    ],
    "Melchor Ocampo": [
      "Centro"
    ],
    "Metepec": [
      "Centro"
    ],
    "Mexicaltzingo": [
      "Centro"
    ],
    "Morelos": [
      "Centro"
    ],
    "Naucalpan de Juárez": [
      "Centro"
    ],
    "Nextlalpan": [
      "Centro"
    ],
    "Nezahualcóyotl": [
      "Centro"
    ],
    "Nicolás Romero": [
      "Centro"
    ],
    "Nopaltepec": [
      "Centro"
    ],
    "Ocoyoacac": [
      "Centro"
    ],
    "Ocuilan": [
      "Centro"
    ],
    "Otumba": [
      "Centro"
    ],
    "Otzoloapan": [
      "Centro"
    ],
    "Otzolotepec": [
      "Centro"
    ],
    "Ozumba": [
      "Centro"
    ],
    "Papalotla": [
      "Centro"
    ],
    "Polotitlán": [
      "Centro"
    ],
    "Rayón": [
      "Centro"
    ],
    "San Antonio la Isla": [
      "Centro"
    ],
    "San Felipe del Progreso": [
      "Centro"
    ],
    "San José del Rincón": [
      "Centro"
    ],
    "San Martín de las Pirámides": [
      "Centro"
    ],
    "San Mateo Atenco": [
      "Centro"
    ],
    "San Simón de Guerrero": [
      "Centro"
    ],
    "Santo Tomás": [
      "Centro"
    ],
    "Soyaniquilpan de Juárez": [
      "Centro"
    ],
    "Sultepec": [
      "Centro"
    ],
    "Tecámac": [
      "Centro"
    ],
    "Tejupilco": [
      "Centro"
    ],
    "Temamatla": [
      "Centro"
    ],
    "Temascalapa": [
      "Centro"
    ],
    "Temascalcingo": [
      "Centro"
    ],
    "Temascaltepec": [
      "Centro"
    ],
    "Temoaya": [
      "Centro"
    ],
    "Tenancingo": [
      "Centro"
    ],
    "Tenango del Aire": [
      "Centro"
    ],
    "Tenango del Valle": [
      "Centro"
    ],
    "Teoloyucan": [
      "Centro"
    ],
    "Teotihuacán": [
      "Centro"
    ],
    "Tepetlaoxtoc": [
      "Centro"
    ],
    "Tepetlixpa": [
      "Centro"
    ],
    "Tepotzotlán": [
      "Centro"
    ],
    "Tequixquiac": [
      "Centro"
    ],
    "Texcaltitlán": [
      "Centro"
    ],
    "Texcalyacac": [
      "Centro"
    ],
    "Texcoco": [
      "Centro"
    ],
    "Tezoyuca": [
      "Centro"
    ],
    "Tianguistenco": [
      "Centro"
    ],
    "Timilpan": [
      "Centro"
    ],
    "Tlalmanalco": [
      "Centro"
    ],
    "Tlalnepantla de Baz": [
      "Centro"
    ],
    "Tlatlaya": [
      "Centro"
    ],
    "Toluca": [
      "Centro"
    ],
    "Tonanitla": [
      "Centro"
    ],
    "Tonatico": [
      "Centro"
    ],
    "Tultepec": [
      "Centro"
    ],
    "Tultitlán": [
      "Centro"
    ],
    "Valle de Bravo": [
      "Centro"
    ],
    "Valle de Chalco Solidaridad": [
      "Centro"
    ],
    "Villa de Allende": [
      "Centro"
    ],
    "Villa del Carbón": [
      "Centro"
    ],
    "Villa Guerrero": [
      "Centro"
    ],
    "Villa Victoria": [
      "Centro"
    ],
    "Xalatlaco": [
      "Centro"
    ],
    "Xonacatlán": [
      "Centro"
    ],
    "Zacazonapan": [
      "Centro"
    ],
    "Zacualpan": [
      "Centro"
    ],
    "Zinacantepec": [
      "Centro"
    ],
    "Zumpahuacán": [
      "Centro"
    ],
    "Zumpango": [
      "Centro"
    ]
  },
  "Michoacán de Ocampo": {
    "Acuitzio": [
      "Centro"
    ],
    "Aguililla": [
      "Centro"
    ],
    "Álvaro Obregón": [
      "Centro"
    ],
    "Angamacutiro": [
      "Centro"
    ],
    "Angangueo": [
      "Centro"
    ],
    "Apatzingán": [
      "Centro"
    ],
    "Aporo": [
      "Centro"
    ],
    "Aquila": [
      "Centro"
    ],
    "Ario": [
      "Centro"
    ],
    "Arteaga": [
      "Centro"
    ],
    "Briseñas": [
      "Centro"
    ],
    "Buenavista": [
      "Centro"
    ],
    "Carácuaro": [
      "Centro"
    ],
    "Charapan": [
      "Centro"
    ],
    "Charo": [
      "Centro"
    ],
    "Chavinda": [
      "Centro"
    ],
    "Cherán": [
      "Centro"
    ],
    "Chilchota": [
      "Centro"
    ],
    "Chinicuila": [
      "Centro"
    ],
    "Chucándiro": [
      "Centro"
    ],
    "Churintzio": [
      "Centro"
    ],
    "Churumuco": [
      "Centro"
    ],
    "Coahuayana": [
      "Centro"
    ],
    "Coalcomán de Vázquez Pallares": [
      "Centro"
    ],
    "Coeneo": [
      "Centro"
    ],
    "Cojumatlán de Régules": [
      "Centro"
    ],
    "Contepec": [
      "Centro"
    ],
    "Copándaro": [
      "Centro"
    ],
    "Cotija": [
      "Centro"
    ],
    "Cuitzeo": [
      "Centro"
    ],
    "Ecuandureo": [
      "Centro"
    ],
    "Epitacio Huerta": [
      "Centro"
    ],
    "Erongarícuaro": [
      "Centro"
    ],
    "Gabriel Zamora": [
      "Centro"
    ],
    "Hidalgo": [
      "Centro"
    ],
    "Huandacareo": [
      "Centro"
    ],
    "Huaniqueo": [
      "Centro"
    ],
    "Huetamo": [
      "Centro"
    ],
    "Huiramba": [
      "Centro"
    ],
    "Indaparapeo": [
      "Centro"
    ],
    "Irimbo": [
      "Centro"
    ],
    "Ixtlán": [
      "Centro"
    ],
    "Jacona": [
      "Centro"
    ],
    "Jiménez": [
      "Centro"
    ],
    "Jiquilpan": [
      "Centro"
    ],
    "José Sixto Verduzco": [
      "Centro"
    ],
    "Juárez": [
      "Centro"
    ],
    "Jungapeo": [
      "Centro"
    ],
    "La Huacana": [
      "Centro"
    ],
    "La Piedad": [
      "Centro"
    ],
    "Lagunillas": [
      "Centro"
    ],
    "Lázaro Cárdenas": [
      "Centro"
    ],
    "Los Reyes": [
      "Centro"
    ],
    "Madero": [
      "Centro"
    ],
    "Maravatío": [
      "Centro"
    ],
    "Marcos Castellanos": [
      "Centro"
    ],
    "Morelia": [
      "Centro"
    ],
    "Morelos": [
      "Centro"
    ],
    "Múgica": [
      "Centro"
    ],
    "Nahuatzen": [
      "Centro"
    ],
    "Nocupétaro": [
      "Centro"
    ],
    "Nuevo Parangaricutiro": [
      "Centro"
    ],
    "Nuevo Urecho": [
      "Centro"
    ],
    "Numarán": [
      "Centro"
    ],
    "Ocampo": [
      "Centro"
    ],
    "Pajacuarán": [
      "Centro"
    ],
    "Panindícuaro": [
      "Centro"
    ],
    "Paracho": [
      "Centro"
    ],
    "Parácuaro": [
      "Centro"
    ],
    "Pátzcuaro": [
      "Centro"
    ],
    "Penjamillo": [
      "Centro"
    ],
    "Peribán": [
      "Centro"
    ],
    "Purépero": [
      "Centro"
    ],
    "Puruándiro": [
      "Centro"
    ],
    "Queréndaro": [
      "Centro"
    ],
    "Quiroga": [
      "Centro"
    ],
    "Sahuayo": [
      "Centro"
    ],
    "Salvador Escalante": [
      "Centro"
    ],
    "San Lucas": [
      "Centro"
    ],
    "Santa Ana Maya": [
      "Centro"
    ],
    "Senguio": [
      "Centro"
    ],
    "Susupuato": [
      "Centro"
    ],
    "Tacámbaro": [
      "Centro"
    ],
    "Tancítaro": [
      "Centro"
    ],
    "Tangamandapio": [
      "Centro"
    ],
    "Tangancícuaro": [
      "Centro"
    ],
    "Tanhuato": [
      "Centro"
    ],
    "Taretan": [
      "Centro"
    ],
    "Tarímbaro": [
      "Centro"
    ],
    "Tepalcatepec": [
      "Centro"
    ],
    "Tingambato": [
      "Centro"
    ],
    "Tingüindín": [
      "Centro"
    ],
    "Tiquicheo de Nicolás Romero": [
      "Centro"
    ],
    "Tlalpujahua": [
      "Centro"
    ],
    "Tlazazalca": [
      "Centro"
    ],
    "Tocumbo": [
      "Centro"
    ],
    "Tumbiscatío": [
      "Centro"
    ],
    "Turicato": [
      "Centro"
    ],
    "Tuxpan": [
      "Centro"
    ],
    "Tuzantla": [
      "Centro"
    ],
    "Tzintzuntzan": [
      "Centro"
    ],
    "Tzitzio": [
      "Centro"
    ],
    "Uruapan": [
      "Centro"
    ],
    "Venustiano Carranza": [
      "Centro"
    ],
    "Villamar": [
      "Centro"
    ],
    "Vista Hermosa": [
      "Centro"
    ],
    "Yurécuaro": [
      "Centro"
    ],
    "Zacapu": [
      "Centro"
    ],
    "Zamora": [
      "Centro"
    ],
    "Zináparo": [
      "Centro"
    ],
    "Zinapécuaro": [
      "Centro"
    ],
    "Ziracuaretiro": [
      "Centro"
    ],
    "Zitácuaro": [
      "Centro"
    ]
  },
  "Morelos": {
    "Amacuzac": [
      "Centro"
    ],
    "Atlatlahucan": [
      "Centro"
    ],
    "Axochiapan": [
      "Centro"
    ],
    "Ayala": [
      "Centro"
    ],
    "Coatlán del Río": [
      "Centro"
    ],
    "Cuautla": [
      "Centro"
    ],
    "Cuernavaca": [
      "Centro"
    ],
    "Emiliano Zapata": [
      "Centro"
    ],
    "Huitzilac": [
      "Centro"
    ],
    "Jantetelco": [
      "Centro"
    ],
    "Jiutepec": [
      "Centro"
    ],
    "Jojutla": [
      "Centro"
    ],
    "Jonacatepec": [
      "Centro"
    ],
    "Mazatepec": [
      "Centro"
    ],
    "Miacatlán": [
      "Centro"
    ],
    "Ocuituco": [
      "Centro"
    ],
    "Puente de Ixtla": [
      "Centro"
    ],
    "Temixco": [
      "Centro"
    ],
    "Temoac": [
      "Centro"
    ],
    "Tepalcingo": [
      "Centro"
    ],
    "Tepoztlán": [
      "Centro"
    ],
    "Tetecala": [
      "Centro"
    ],
    "Tetela del Volcán": [
      "Centro"
    ],
    "Tlalnepantla": [
      "Centro"
    ],
    "Tlaltizapán de Zapata": [
      "Centro"
    ],
    "Tlaquiltenango": [
      "Centro"
    ],
    "Tlayacapan": [
      "Centro"
    ],
    "Totolapan": [
      "Centro"
    ],
    "Xochitepec": [
      "Centro"
    ],
    "Yautepec": [
      "Centro"
    ],
    "Yecapixtla": [
      "Centro"
    ],
    "Zacatepec": [
      "Centro"
    ],
    "Zacualpan": [
      "Centro"
    ]
  },
  "Nayarit": {
    "Acaponeta": [
      "Centro"
    ],
    "Ahuacatlán": [
      "Centro"
    ],
    "Amatlán de Cañas": [
      "Centro"
    ],
    "Bahía de Banderas": [
      "Centro"
    ],
    "Compostela": [
      "Centro"
    ],
    "Del Nayar": [
      "Centro"
    ],
    "Huajicori": [
      "Centro"
    ],
    "Ixtlán del Río": [
      "Centro"
    ],
    "Jala": [
      "Centro"
    ],
    "La Yesca": [
      "Centro"
    ],
    "Rosamorada": [
      "Centro"
    ],
    "Ruíz": [
      "Centro"
    ],
    "San Blas": [
      "Centro"
    ],
    "San Pedro Lagunillas": [
      "Centro"
    ],
    "Santa María del Oro": [
      "Centro"
    ],
    "Santiago Ixcuintla": [
      "Centro"
    ],
    "Tecuala": [
      "Centro"
    ],
    "Tepic": [
      "Centro"
    ],
    "Tuxpan": [
      "Centro"
    ],
    "Xalisco": [
      "Centro"
    ]
  },
  "Nuevo León": {
    "Abasolo": [
      "Centro"
    ],
    "Agualeguas": [
      "Centro"
    ],
    "Allende": [
      "Centro"
    ],
    "Anáhuac": [
      "Centro"
    ],
    "Apodaca": [
      "Centro"
    ],
    "Aramberri": [
      "Centro"
    ],
    "Bustamante": [
      "Centro"
    ],
    "Cadereyta Jiménez": [
      "Centro"
    ],
    "Cerralvo": [
      "Centro"
    ],
    "China": [
      "Centro"
    ],
    "Ciénega de Flores": [
      "Centro"
    ],
    "Doctor Arroyo": [
      "Centro"
    ],
    "Doctor Coss": [
      "Centro"
    ],
    "Doctor González": [
      "Centro"
    ],
    "El Carmen": [
      "Centro"
    ],
    "Galeana": [
      "Centro"
    ],
    "García": [
      "Centro"
    ],
    "General Bravo": [
      "Centro"
    ],
    "General Escobedo": [
      "Centro"
    ],
    "General Terán": [
      "Centro"
    ],
    "General Treviño": [
      "Centro"
    ],
    "General Zaragoza": [
      "Centro"
    ],
    "General Zuazua": [
      "Centro"
    ],
    "Guadalupe": [
      "Centro"
    ],
    "Hidalgo": [
      "Centro"
    ],
    "Higueras": [
      "Centro"
    ],
    "Hualahuises": [
      "Centro"
    ],
    "Iturbide": [
      "Centro"
    ],
    "Juárez": [
      "Centro"
    ],
    "Lampazos de Naranjo": [
      "Centro"
    ],
    "Linares": [
      "Centro"
    ],
    "Los Aldamas": [
      "Centro"
    ],
    "Los Herreras": [
      "Centro"
    ],
    "Los Ramones": [
      "Centro"
    ],
    "Marín": [
      "Centro"
    ],
    "Melchor Ocampo": [
      "Centro"
    ],
    "Mier y Noriega": [
      "Centro"
    ],
    "Mina": [
      "Centro"
    ],
    "Montemorelos": [
      "Centro"
    ],
    "Monterrey": [
      "Centro"
    ],
    "Parás": [
      "Centro"
    ],
    "Pesquería": [
      "Centro"
    ],
    "Rayones": [
      "Centro"
    ],
    "Sabinas Hidalgo": [
      "Centro"
    ],
    "Salinas Victoria": [
      "Centro"
    ],
    "San Nicolás de los Garza": [
      "Centro"
    ],
    "San Pedro Garza García": [
      "Centro"
    ],
    "Santa Catarina": [
      "Centro"
    ],
    "Santiago": [
      "Centro"
    ],
    "Vallecillo": [
      "Centro"
    ],
    "Villaldama": [
      "Centro"
    ]
  },
  "Oaxaca": {
    "Abejones": [
      "Centro"
    ],
    "Acatlán de Pérez Figueroa": [
      "Centro"
    ],
    "Ánimas Trujano": [
      "Centro"
    ],
    "Asunción Cacalotepec": [
      "Centro"
    ],
    "Asunción Cuyotepeji": [
      "Centro"
    ],
    "Asunción Ixtaltepec": [
      "Centro"
    ],
    "Asunción Nochixtlán": [
      "Centro"
    ],
    "Asunción Ocotlán": [
      "Centro"
    ],
    "Asunción Tlacolulita": [
      "Centro"
    ],
    "Ayoquezco de Aldama": [
      "Centro"
    ],
    "Ayotzintepec": [
      "Centro"
    ],
    "Calihualá": [
      "Centro"
    ],
    "Candelaria Loxicha": [
      "Centro"
    ],
    "Capulálpam de Méndez": [
      "Centro"
    ],
    "Chahuites": [
      "Centro"
    ],
    "Chalcatongo de Hidalgo": [
      "Centro"
    ],
    "Chiquihuitlán de Benito Juárez": [
      "Centro"
    ],
    "Ciénega de Zimatlán": [
      "Centro"
    ],
    "Ciudad Ixtepec": [
      "Centro"
    ],
    "Coatecas Altas": [
      "Centro"
    ],
    "Coicoyán de las Flores": [
      "Centro"
    ],
    "Concepción Buenavista": [
      "Centro"
    ],
    "Concepción Pápalo": [
      "Centro"
    ],
    "Constancia del Rosario": [
      "Centro"
    ],
    "Cosolapa": [
      "Centro"
    ],
    "Cosoltepec": [
      "Centro"
    ],
    "Cuilápam de Guerrero": [
      "Centro"
    ],
    "Cuyamecalco Villa de Zaragoza": [
      "Centro"
    ],
    "El Barrio de la Soledad": [
      "Centro"
    ],
    "El Espinal": [
      "Centro"
    ],
    "Eloxochitlán de Flores Magón": [
      "Centro"
    ],
    "Fresnillo de Trujano": [
      "Centro"
    ],
    "Guadalupe de Ramírez": [
      "Centro"
    ],
    "Guadalupe Etla": [
      "Centro"
    ],
    "Guelatao de Juárez": [
      "Centro"
    ],
    "Guevea de Humboldt": [
      "Centro"
    ],
    "Heroica Ciudad de Ejutla de Crespo": [
      "Centro"
    ],
    "Heroica Ciudad de Huajuapan de León": [
      "Centro"
    ],
    "Heroica Ciudad de Juchitán de Zaragoza": [
      "Centro"
    ],
    "Heroica Ciudad de Tlaxiaco": [
      "Centro"
    ],
    "Heroica Villa Tezoatlán de Segura y Luna": [
      "Centro"
    ],
    "Huautepec": [
      "Centro"
    ],
    "Huautla de Jiménez": [
      "Centro"
    ],
    "Ixpantepec Nieves": [
      "Centro"
    ],
    "Ixtlán de Juárez": [
      "Centro"
    ],
    "La Compañía": [
      "Centro"
    ],
    "La Pe": [
      "Centro"
    ],
    "La Reforma": [
      "Centro"
    ],
    "La Trinidad Vista Hermosa": [
      "Centro"
    ],
    "Loma Bonita": [
      "Centro"
    ],
    "Magdalena Apasco": [
      "Centro"
    ],
    "Magdalena Jaltepec": [
      "Centro"
    ],
    "Magdalena Mixtepec": [
      "Centro"
    ],
    "Magdalena Ocotlán": [
      "Centro"
    ],
    "Magdalena Peñasco": [
      "Centro"
    ],
    "Magdalena Teitipac": [
      "Centro"
    ],
    "Magdalena Tequisistlán": [
      "Centro"
    ],
    "Magdalena Tlacotepec": [
      "Centro"
    ],
    "Magdalena Yodocono de Porfirio Díaz": [
      "Centro"
    ],
    "Magdalena Zahuatlán": [
      "Centro"
    ],
    "Mariscala de Juárez": [
      "Centro"
    ],
    "Mártires de Tacubaya": [
      "Centro"
    ],
    "Matías Romero Avendaño": [
      "Centro"
    ],
    "Mazatlán Villa de Flores": [
      "Centro"
    ],
    "Mesones Hidalgo": [
      "Centro"
    ],
    "Miahuatlán de Porfirio Díaz": [
      "Centro"
    ],
    "Mixistlán de la Reforma": [
      "Centro"
    ],
    "Monjas": [
      "Centro"
    ],
    "Natividad": [
      "Centro"
    ],
    "Nazareno Etla": [
      "Centro"
    ],
    "Nejapa de Madero": [
      "Centro"
    ],
    "Nuevo Zoquiápam": [
      "Centro"
    ],
    "Oaxaca de Juárez": [
      "Centro"
    ],
    "Ocotlán de Morelos": [
      "Centro"
    ],
    "Pinotepa de Don Luis": [
      "Centro"
    ],
    "Pluma Hidalgo": [
      "Centro"
    ],
    "Putla Villa de Guerrero": [
      "Centro"
    ],
    "Reforma de Pineda": [
      "Centro"
    ],
    "Reyes Etla": [
      "Centro"
    ],
    "Rojas de Cuauhtémoc": [
      "Centro"
    ],
    "Salina Cruz": [
      "Centro"
    ],
    "San Agustín Amatengo": [
      "Centro"
    ],
    "San Agustín Atenango": [
      "Centro"
    ],
    "San Agustín Chayuco": [
      "Centro"
    ],
    "San Agustín de las Juntas": [
      "Centro"
    ],
    "San Agustín Etla": [
      "Centro"
    ],
    "San Agustín Loxicha": [
      "Centro"
    ],
    "San Agustín Tlacotepec": [
      "Centro"
    ],
    "San Agustín Yatareni": [
      "Centro"
    ],
    "San Andrés Cabecera Nueva": [
      "Centro"
    ],
    "San Andrés Dinicuiti": [
      "Centro"
    ],
    "San Andrés Huaxpaltepec": [
      "Centro"
    ],
    "San Andrés Huayápam": [
      "Centro"
    ],
    "San Andrés Ixtlahuaca": [
      "Centro"
    ],
    "San Andrés Lagunas": [
      "Centro"
    ],
    "San Andrés Nuxiño": [
      "Centro"
    ],
    "San Andrés Paxtlán": [
      "Centro"
    ],
    "San Andrés Sinaxtla": [
      "Centro"
    ],
    "San Andrés Solaga": [
      "Centro"
    ],
    "San Andrés Teotilálpam": [
      "Centro"
    ],
    "San Andrés Tepetlapa": [
      "Centro"
    ],
    "San Andrés Yaá": [
      "Centro"
    ],
    "San Andrés Zabache": [
      "Centro"
    ],
    "San Andrés Zautla": [
      "Centro"
    ],
    "San Antonino Castillo Velasco": [
      "Centro"
    ],
    "San Antonino el Alto": [
      "Centro"
    ],
    "San Antonino Monte Verde": [
      "Centro"
    ],
    "San Antonio Acutla": [
      "Centro"
    ],
    "San Antonio de la Cal": [
      "Centro"
    ],
    "San Antonio Huitepec": [
      "Centro"
    ],
    "San Antonio Nanahuatípam": [
      "Centro"
    ],
    "San Antonio Sinicahua": [
      "Centro"
    ],
    "San Antonio Tepetlapa": [
      "Centro"
    ],
    "San Baltazar Chichicápam": [
      "Centro"
    ],
    "San Baltazar Loxicha": [
      "Centro"
    ],
    "San Baltazar Yatzachi el Bajo": [
      "Centro"
    ],
    "San Bartolo Coyotepec": [
      "Centro"
    ],
    "San Bartolo Soyaltepec": [
      "Centro"
    ],
    "San Bartolo Yautepec": [
      "Centro"
    ],
    "San Bartolomé Ayautla": [
      "Centro"
    ],
    "San Bartolomé Loxicha": [
      "Centro"
    ],
    "San Bartolomé Quialana": [
      "Centro"
    ],
    "San Bartolomé Yucuañe": [
      "Centro"
    ],
    "San Bartolomé Zoogocho": [
      "Centro"
    ],
    "San Bernardo Mixtepec": [
      "Centro"
    ],
    "San Blas Atempa": [
      "Centro"
    ],
    "San Carlos Yautepec": [
      "Centro"
    ],
    "San Cristóbal Amatlán": [
      "Centro"
    ],
    "San Cristóbal Amoltepec": [
      "Centro"
    ],
    "San Cristóbal Lachirioag": [
      "Centro"
    ],
    "San Cristóbal Suchixtlahuaca": [
      "Centro"
    ],
    "San Dionisio del Mar": [
      "Centro"
    ],
    "San Dionisio Ocotepec": [
      "Centro"
    ],
    "San Dionisio Ocotlán": [
      "Centro"
    ],
    "San Esteban Atatlahuca": [
      "Centro"
    ],
    "San Felipe Jalapa de Díaz": [
      "Centro"
    ],
    "San Felipe Tejalápam": [
      "Centro"
    ],
    "San Felipe Usila": [
      "Centro"
    ],
    "San Francisco Cahuacuá": [
      "Centro"
    ],
    "San Francisco Cajonos": [
      "Centro"
    ],
    "San Francisco Chapulapa": [
      "Centro"
    ],
    "San Francisco Chindúa": [
      "Centro"
    ],
    "San Francisco del Mar": [
      "Centro"
    ],
    "San Francisco Huehuetlán": [
      "Centro"
    ],
    "San Francisco Ixhuatán": [
      "Centro"
    ],
    "San Francisco Jaltepetongo": [
      "Centro"
    ],
    "San Francisco Lachigoló": [
      "Centro"
    ],
    "San Francisco Logueche": [
      "Centro"
    ],
    "San Francisco Nuxaño": [
      "Centro"
    ],
    "San Francisco Ozolotepec": [
      "Centro"
    ],
    "San Francisco Sola": [
      "Centro"
    ],
    "San Francisco Telixtlahuaca": [
      "Centro"
    ],
    "San Francisco Teopan": [
      "Centro"
    ],
    "San Francisco Tlapancingo": [
      "Centro"
    ],
    "San Gabriel Mixtepec": [
      "Centro"
    ],
    "San Ildefonso Amatlán": [
      "Centro"
    ],
    "San Ildefonso Sola": [
      "Centro"
    ],
    "San Ildefonso Villa Alta": [
      "Centro"
    ],
    "San Jacinto Amilpas": [
      "Centro"
    ],
    "San Jacinto Tlacotepec": [
      "Centro"
    ],
    "San Jerónimo Coatlán": [
      "Centro"
    ],
    "San Jerónimo Silacayoapilla": [
      "Centro"
    ],
    "San Jerónimo Sosola": [
      "Centro"
    ],
    "San Jerónimo Taviche": [
      "Centro"
    ],
    "San Jerónimo Tecóatl": [
      "Centro"
    ],
    "San Jerónimo Tlacochahuaya": [
      "Centro"
    ],
    "San Jorge Nuchita": [
      "Centro"
    ],
    "San José Ayuquila": [
      "Centro"
    ],
    "San José Chiltepec": [
      "Centro"
    ],
    "San José del Peñasco": [
      "Centro"
    ],
    "San José del Progreso": [
      "Centro"
    ],
    "San José Estancia Grande": [
      "Centro"
    ],
    "San José Independencia": [
      "Centro"
    ],
    "San José Lachiguiri": [
      "Centro"
    ],
    "San José Tenango": [
      "Centro"
    ],
    "San Juan Achiutla": [
      "Centro"
    ],
    "San Juan Atepec": [
      "Centro"
    ],
    "San Juan Bautista Atatlahuca": [
      "Centro"
    ],
    "San Juan Bautista Coixtlahuaca": [
      "Centro"
    ],
    "San Juan Bautista Cuicatlán": [
      "Centro"
    ],
    "San Juan Bautista Guelache": [
      "Centro"
    ],
    "San Juan Bautista Jayacatlán": [
      "Centro"
    ],
    "San Juan Bautista Lo de Soto": [
      "Centro"
    ],
    "San Juan Bautista Suchitepec": [
      "Centro"
    ],
    "San Juan Bautista Tlachichilco": [
      "Centro"
    ],
    "San Juan Bautista Tlacoatzintepec": [
      "Centro"
    ],
    "San Juan Bautista Tuxtepec": [
      "Centro"
    ],
    "San Juan Bautista Valle Nacional": [
      "Centro"
    ],
    "San Juan Cacahuatepec": [
      "Centro"
    ],
    "San Juan Chicomezúchil": [
      "Centro"
    ],
    "San Juan Chilateca": [
      "Centro"
    ],
    "San Juan Cieneguilla": [
      "Centro"
    ],
    "San Juan Coatzóspam": [
      "Centro"
    ],
    "San Juan Colorado": [
      "Centro"
    ],
    "San Juan Comaltepec": [
      "Centro"
    ],
    "San Juan Cotzocón": [
      "Centro"
    ],
    "San Juan de los Cués": [
      "Centro"
    ],
    "San Juan del Estado": [
      "Centro"
    ],
    "San Juan del Río": [
      "Centro"
    ],
    "San Juan Diuxi": [
      "Centro"
    ],
    "San Juan Evangelista Analco": [
      "Centro"
    ],
    "San Juan Guelavía": [
      "Centro"
    ],
    "San Juan Guichicovi": [
      "Centro"
    ],
    "San Juan Ihualtepec": [
      "Centro"
    ],
    "San Juan Juquila Mixes": [
      "Centro"
    ],
    "San Juan Juquila Vijanos": [
      "Centro"
    ],
    "San Juan Lachao": [
      "Centro"
    ],
    "San Juan Lachigalla": [
      "Centro"
    ],
    "San Juan Lajarcia": [
      "Centro"
    ],
    "San Juan Lalana": [
      "Centro"
    ],
    "San Juan Mazatlán": [
      "Centro"
    ],
    "San Juan Mixtepec -Dto. 08 -": [
      "Centro"
    ],
    "San Juan Mixtepec -Dto. 26 -": [
      "Centro"
    ],
    "San Juan Ñumí": [
      "Centro"
    ],
    "San Juan Ozolotepec": [
      "Centro"
    ],
    "San Juan Petlapa": [
      "Centro"
    ],
    "San Juan Quiahije": [
      "Centro"
    ],
    "San Juan Quiotepec": [
      "Centro"
    ],
    "San Juan Sayultepec": [
      "Centro"
    ],
    "San Juan Tabaá": [
      "Centro"
    ],
    "San Juan Tamazola": [
      "Centro"
    ],
    "San Juan Teita": [
      "Centro"
    ],
    "San Juan Teitipac": [
      "Centro"
    ],
    "San Juan Tepeuxila": [
      "Centro"
    ],
    "San Juan Teposcolula": [
      "Centro"
    ],
    "San Juan Yaeé": [
      "Centro"
    ],
    "San Juan Yatzona": [
      "Centro"
    ],
    "San Juan Yucuita": [
      "Centro"
    ],
    "San Lorenzo": [
      "Centro"
    ],
    "San Lorenzo Albarradas": [
      "Centro"
    ],
    "San Lorenzo Cacaotepec": [
      "Centro"
    ],
    "San Lorenzo Cuaunecuiltitla": [
      "Centro"
    ],
    "San Lorenzo Texmelúcan": [
      "Centro"
    ],
    "San Lorenzo Victoria": [
      "Centro"
    ],
    "San Lucas Camotlán": [
      "Centro"
    ],
    "San Lucas Ojitlán": [
      "Centro"
    ],
    "San Lucas Quiaviní": [
      "Centro"
    ],
    "San Lucas Zoquiápam": [
      "Centro"
    ],
    "San Luis Amatlán": [
      "Centro"
    ],
    "San Marcial Ozolotepec": [
      "Centro"
    ],
    "San Marcos Arteaga": [
      "Centro"
    ],
    "San Martín de los Cansecos": [
      "Centro"
    ],
    "San Martín Huamelúlpam": [
      "Centro"
    ],
    "San Martín Itunyoso": [
      "Centro"
    ],
    "San Martín Lachilá": [
      "Centro"
    ],
    "San Martín Peras": [
      "Centro"
    ],
    "San Martín Tilcajete": [
      "Centro"
    ],
    "San Martín Toxpalan": [
      "Centro"
    ],
    "San Martín Zacatepec": [
      "Centro"
    ],
    "San Mateo Cajonos": [
      "Centro"
    ],
    "San Mateo del Mar": [
      "Centro"
    ],
    "San Mateo Etlatongo": [
      "Centro"
    ],
    "San Mateo Nejápam": [
      "Centro"
    ],
    "San Mateo Peñasco": [
      "Centro"
    ],
    "San Mateo Piñas": [
      "Centro"
    ],
    "San Mateo Río Hondo": [
      "Centro"
    ],
    "San Mateo Sindihui": [
      "Centro"
    ],
    "San Mateo Tlapiltepec": [
      "Centro"
    ],
    "San Mateo Yoloxochitlán": [
      "Centro"
    ],
    "San Mateo Yucutindó": [
      "Centro"
    ],
    "San Melchor Betaza": [
      "Centro"
    ],
    "San Miguel Achiutla": [
      "Centro"
    ],
    "San Miguel Ahuehuetitlán": [
      "Centro"
    ],
    "San Miguel Aloápam": [
      "Centro"
    ],
    "San Miguel Amatitlán": [
      "Centro"
    ],
    "San Miguel Amatlán": [
      "Centro"
    ],
    "San Miguel Chicahua": [
      "Centro"
    ],
    "San Miguel Chimalapa": [
      "Centro"
    ],
    "San Miguel Coatlán": [
      "Centro"
    ],
    "San Miguel del Puerto": [
      "Centro"
    ],
    "San Miguel del Río": [
      "Centro"
    ],
    "San Miguel Ejutla": [
      "Centro"
    ],
    "San Miguel el Grande": [
      "Centro"
    ],
    "San Miguel Huautla": [
      "Centro"
    ],
    "San Miguel Mixtepec": [
      "Centro"
    ],
    "San Miguel Panixtlahuaca": [
      "Centro"
    ],
    "San Miguel Peras": [
      "Centro"
    ],
    "San Miguel Piedras": [
      "Centro"
    ],
    "San Miguel Quetzaltepec": [
      "Centro"
    ],
    "San Miguel Santa Flor": [
      "Centro"
    ],
    "San Miguel Soyaltepec": [
      "Centro"
    ],
    "San Miguel Suchixtepec": [
      "Centro"
    ],
    "San Miguel Tecomatlán": [
      "Centro"
    ],
    "San Miguel Tenango": [
      "Centro"
    ],
    "San Miguel Tequixtepec": [
      "Centro"
    ],
    "San Miguel Tilquiápam": [
      "Centro"
    ],
    "San Miguel Tlacamama": [
      "Centro"
    ],
    "San Miguel Tlacotepec": [
      "Centro"
    ],
    "San Miguel Tulancingo": [
      "Centro"
    ],
    "San Miguel Yotao": [
      "Centro"
    ],
    "San Nicolás": [
      "Centro"
    ],
    "San Nicolás Hidalgo": [
      "Centro"
    ],
    "San Pablo Coatlán": [
      "Centro"
    ],
    "San Pablo Cuatro Venados": [
      "Centro"
    ],
    "San Pablo Etla": [
      "Centro"
    ],
    "San Pablo Huitzo": [
      "Centro"
    ],
    "San Pablo Huixtepec": [
      "Centro"
    ],
    "San Pablo Macuiltianguis": [
      "Centro"
    ],
    "San Pablo Tijaltepec": [
      "Centro"
    ],
    "San Pablo Villa de Mitla": [
      "Centro"
    ],
    "San Pablo Yaganiza": [
      "Centro"
    ],
    "San Pedro Amuzgos": [
      "Centro"
    ],
    "San Pedro Apóstol": [
      "Centro"
    ],
    "San Pedro Atoyac": [
      "Centro"
    ],
    "San Pedro Cajonos": [
      "Centro"
    ],
    "San Pedro Comitancillo": [
      "Centro"
    ],
    "San Pedro Coxcaltepec Cántaros": [
      "Centro"
    ],
    "San Pedro el Alto": [
      "Centro"
    ],
    "San Pedro Huamelula": [
      "Centro"
    ],
    "San Pedro Huilotepec": [
      "Centro"
    ],
    "San Pedro Ixcatlán": [
      "Centro"
    ],
    "San Pedro Ixtlahuaca": [
      "Centro"
    ],
    "San Pedro Jaltepetongo": [
      "Centro"
    ],
    "San Pedro Jicayán": [
      "Centro"
    ],
    "San Pedro Jocotipac": [
      "Centro"
    ],
    "San Pedro Juchatengo": [
      "Centro"
    ],
    "San Pedro Mártir": [
      "Centro"
    ],
    "San Pedro Mártir Quiechapa": [
      "Centro"
    ],
    "San Pedro Mártir Yucuxaco": [
      "Centro"
    ],
    "San Pedro Mixtepec -Dto. 22 -": [
      "Centro"
    ],
    "San Pedro Mixtepec -Dto. 26 -": [
      "Centro"
    ],
    "San Pedro Molinos": [
      "Centro"
    ],
    "San Pedro Nopala": [
      "Centro"
    ],
    "San Pedro Ocopetatillo": [
      "Centro"
    ],
    "San Pedro Ocotepec": [
      "Centro"
    ],
    "San Pedro Pochutla": [
      "Centro"
    ],
    "San Pedro Quiatoni": [
      "Centro"
    ],
    "San Pedro Sochiápam": [
      "Centro"
    ],
    "San Pedro Tapanatepec": [
      "Centro"
    ],
    "San Pedro Taviche": [
      "Centro"
    ],
    "San Pedro Teozacoalco": [
      "Centro"
    ],
    "San Pedro Teutila": [
      "Centro"
    ],
    "San Pedro Tidaá": [
      "Centro"
    ],
    "San Pedro Topiltepec": [
      "Centro"
    ],
    "San Pedro Totolápam": [
      "Centro"
    ],
    "San Pedro y San Pablo Ayutla": [
      "Centro"
    ],
    "San Pedro y San Pablo Teposcolula": [
      "Centro"
    ],
    "San Pedro y San Pablo Tequixtepec": [
      "Centro"
    ],
    "San Pedro Yaneri": [
      "Centro"
    ],
    "San Pedro Yólox": [
      "Centro"
    ],
    "San Pedro Yucunama": [
      "Centro"
    ],
    "San Raymundo Jalpan": [
      "Centro"
    ],
    "San Sebastián Abasolo": [
      "Centro"
    ],
    "San Sebastián Coatlán": [
      "Centro"
    ],
    "San Sebastián Ixcapa": [
      "Centro"
    ],
    "San Sebastián Nicananduta": [
      "Centro"
    ],
    "San Sebastián Río Hondo": [
      "Centro"
    ],
    "San Sebastián Tecomaxtlahuaca": [
      "Centro"
    ],
    "San Sebastián Teitipac": [
      "Centro"
    ],
    "San Sebastián Tutla": [
      "Centro"
    ],
    "San Simón Almolongas": [
      "Centro"
    ],
    "San Simón Zahuatlán": [
      "Centro"
    ],
    "San Vicente Coatlán": [
      "Centro"
    ],
    "San Vicente Lachixío": [
      "Centro"
    ],
    "San Vicente Nuñú": [
      "Centro"
    ],
    "Santa Ana": [
      "Centro"
    ],
    "Santa Ana Ateixtlahuaca": [
      "Centro"
    ],
    "Santa Ana Cuauhtémoc": [
      "Centro"
    ],
    "Santa Ana del Valle": [
      "Centro"
    ],
    "Santa Ana Tavela": [
      "Centro"
    ],
    "Santa Ana Tlapacoyan": [
      "Centro"
    ],
    "Santa Ana Yareni": [
      "Centro"
    ],
    "Santa Ana Zegache": [
      "Centro"
    ],
    "Santa Catalina Quierí": [
      "Centro"
    ],
    "Santa Catarina Cuixtla": [
      "Centro"
    ],
    "Santa Catarina Ixtepeji": [
      "Centro"
    ],
    "Santa Catarina Juquila": [
      "Centro"
    ],
    "Santa Catarina Lachatao": [
      "Centro"
    ],
    "Santa Catarina Loxicha": [
      "Centro"
    ],
    "Santa Catarina Mechoacán": [
      "Centro"
    ],
    "Santa Catarina Minas": [
      "Centro"
    ],
    "Santa Catarina Quiané": [
      "Centro"
    ],
    "Santa Catarina Quioquitani": [
      "Centro"
    ],
    "Santa Catarina Tayata": [
      "Centro"
    ],
    "Santa Catarina Ticuá": [
      "Centro"
    ],
    "Santa Catarina Yosonotú": [
      "Centro"
    ],
    "Santa Catarina Zapoquila": [
      "Centro"
    ],
    "Santa Cruz Acatepec": [
      "Centro"
    ],
    "Santa Cruz Amilpas": [
      "Centro"
    ],
    "Santa Cruz de Bravo": [
      "Centro"
    ],
    "Santa Cruz Itundujia": [
      "Centro"
    ],
    "Santa Cruz Mixtepec": [
      "Centro"
    ],
    "Santa Cruz Nundaco": [
      "Centro"
    ],
    "Santa Cruz Papalutla": [
      "Centro"
    ],
    "Santa Cruz Tacache de Mina": [
      "Centro"
    ],
    "Santa Cruz Tacahua": [
      "Centro"
    ],
    "Santa Cruz Tayata": [
      "Centro"
    ],
    "Santa Cruz Xitla": [
      "Centro"
    ],
    "Santa Cruz Xoxocotlán": [
      "Centro"
    ],
    "Santa Cruz Zenzontepec": [
      "Centro"
    ],
    "Santa Gertrudis": [
      "Centro"
    ],
    "Santa Inés de Zaragoza": [
      "Centro"
    ],
    "Santa Inés del Monte": [
      "Centro"
    ],
    "Santa Inés Yatzeche": [
      "Centro"
    ],
    "Santa Lucía del Camino": [
      "Centro"
    ],
    "Santa Lucía Miahuatlán": [
      "Centro"
    ],
    "Santa Lucía Monteverde": [
      "Centro"
    ],
    "Santa Lucía Ocotlán": [
      "Centro"
    ],
    "Santa Magdalena Jicotlán": [
      "Centro"
    ],
    "Santa María Alotepec": [
      "Centro"
    ],
    "Santa María Apazco": [
      "Centro"
    ],
    "Santa María Atzompa": [
      "Centro"
    ],
    "Santa María Camotlán": [
      "Centro"
    ],
    "Santa María Chachoápam": [
      "Centro"
    ],
    "Santa María Chilchotla": [
      "Centro"
    ],
    "Santa María Chimalapa": [
      "Centro"
    ],
    "Santa María Colotepec": [
      "Centro"
    ],
    "Santa María Cortijo": [
      "Centro"
    ],
    "Santa María Coyotepec": [
      "Centro"
    ],
    "Santa María del Rosario": [
      "Centro"
    ],
    "Santa María del Tule": [
      "Centro"
    ],
    "Santa María Ecatepec": [
      "Centro"
    ],
    "Santa María Guelacé": [
      "Centro"
    ],
    "Santa María Guienagati": [
      "Centro"
    ],
    "Santa María Huatulco": [
      "Centro"
    ],
    "Santa María Huazolotitlán": [
      "Centro"
    ],
    "Santa María Ipalapa": [
      "Centro"
    ],
    "Santa María Ixcatlán": [
      "Centro"
    ],
    "Santa María Jacatepec": [
      "Centro"
    ],
    "Santa María Jalapa del Marqués": [
      "Centro"
    ],
    "Santa María Jaltianguis": [
      "Centro"
    ],
    "Santa María la Asunción": [
      "Centro"
    ],
    "Santa María Lachixío": [
      "Centro"
    ],
    "Santa María Mixtequilla": [
      "Centro"
    ],
    "Santa María Nativitas": [
      "Centro"
    ],
    "Santa María Nduayaco": [
      "Centro"
    ],
    "Santa María Ozolotepec": [
      "Centro"
    ],
    "Santa María Pápalo": [
      "Centro"
    ],
    "Santa María Peñoles": [
      "Centro"
    ],
    "Santa María Petapa": [
      "Centro"
    ],
    "Santa María Quiegolani": [
      "Centro"
    ],
    "Santa María Sola": [
      "Centro"
    ],
    "Santa María Tataltepec": [
      "Centro"
    ],
    "Santa María Tecomavaca": [
      "Centro"
    ],
    "Santa María Temaxcalapa": [
      "Centro"
    ],
    "Santa María Temaxcaltepec": [
      "Centro"
    ],
    "Santa María Teopoxco": [
      "Centro"
    ],
    "Santa María Tepantlali": [
      "Centro"
    ],
    "Santa María Texcatitlán": [
      "Centro"
    ],
    "Santa María Tlahuitoltepec": [
      "Centro"
    ],
    "Santa María Tlalixtac": [
      "Centro"
    ],
    "Santa María Tonameca": [
      "Centro"
    ],
    "Santa María Totolapilla": [
      "Centro"
    ],
    "Santa María Xadani": [
      "Centro"
    ],
    "Santa María Yalina": [
      "Centro"
    ],
    "Santa María Yavesía": [
      "Centro"
    ],
    "Santa María Yolotepec": [
      "Centro"
    ],
    "Santa María Yosoyúa": [
      "Centro"
    ],
    "Santa María Yucuhiti": [
      "Centro"
    ],
    "Santa María Zacatepec": [
      "Centro"
    ],
    "Santa María Zaniza": [
      "Centro"
    ],
    "Santa María Zoquitlán": [
      "Centro"
    ],
    "Santiago Amoltepec": [
      "Centro"
    ],
    "Santiago Apoala": [
      "Centro"
    ],
    "Santiago Apóstol": [
      "Centro"
    ],
    "Santiago Astata": [
      "Centro"
    ],
    "Santiago Atitlán": [
      "Centro"
    ],
    "Santiago Ayuquililla": [
      "Centro"
    ],
    "Santiago Cacaloxtepec": [
      "Centro"
    ],
    "Santiago Camotlán": [
      "Centro"
    ],
    "Santiago Chazumba": [
      "Centro"
    ],
    "Santiago Choápam": [
      "Centro"
    ],
    "Santiago Comaltepec": [
      "Centro"
    ],
    "Santiago del Río": [
      "Centro"
    ],
    "Santiago Huajolotitlán": [
      "Centro"
    ],
    "Santiago Huauclilla": [
      "Centro"
    ],
    "Santiago Ihuitlán Plumas": [
      "Centro"
    ],
    "Santiago Ixcuintepec": [
      "Centro"
    ],
    "Santiago Ixtayutla": [
      "Centro"
    ],
    "Santiago Jamiltepec": [
      "Centro"
    ],
    "Santiago Jocotepec": [
      "Centro"
    ],
    "Santiago Juxtlahuaca": [
      "Centro"
    ],
    "Santiago Lachiguiri": [
      "Centro"
    ],
    "Santiago Lalopa": [
      "Centro"
    ],
    "Santiago Laollaga": [
      "Centro"
    ],
    "Santiago Laxopa": [
      "Centro"
    ],
    "Santiago Llano Grande": [
      "Centro"
    ],
    "Santiago Matatlán": [
      "Centro"
    ],
    "Santiago Miltepec": [
      "Centro"
    ],
    "Santiago Minas": [
      "Centro"
    ],
    "Santiago Nacaltepec": [
      "Centro"
    ],
    "Santiago Nejapilla": [
      "Centro"
    ],
    "Santiago Niltepec": [
      "Centro"
    ],
    "Santiago Nundiche": [
      "Centro"
    ],
    "Santiago Nuyoó": [
      "Centro"
    ],
    "Santiago Pinotepa Nacional": [
      "Centro"
    ],
    "Santiago Suchilquitongo": [
      "Centro"
    ],
    "Santiago Tamazola": [
      "Centro"
    ],
    "Santiago Tapextla": [
      "Centro"
    ],
    "Santiago Tenango": [
      "Centro"
    ],
    "Santiago Tepetlapa": [
      "Centro"
    ],
    "Santiago Tetepec": [
      "Centro"
    ],
    "Santiago Texcalcingo": [
      "Centro"
    ],
    "Santiago Textitlán": [
      "Centro"
    ],
    "Santiago Tilantongo": [
      "Centro"
    ],
    "Santiago Tillo": [
      "Centro"
    ],
    "Santiago Tlazoyaltepec": [
      "Centro"
    ],
    "Santiago Xanica": [
      "Centro"
    ],
    "Santiago Xiacuí": [
      "Centro"
    ],
    "Santiago Yaitepec": [
      "Centro"
    ],
    "Santiago Yaveo": [
      "Centro"
    ],
    "Santiago Yolomécatl": [
      "Centro"
    ],
    "Santiago Yosondúa": [
      "Centro"
    ],
    "Santiago Yucuyachi": [
      "Centro"
    ],
    "Santiago Zacatepec": [
      "Centro"
    ],
    "Santiago Zoochila": [
      "Centro"
    ],
    "Santo Domingo Albarradas": [
      "Centro"
    ],
    "Santo Domingo Armenta": [
      "Centro"
    ],
    "Santo Domingo Chihuitán": [
      "Centro"
    ],
    "Santo Domingo de Morelos": [
      "Centro"
    ],
    "Santo Domingo Ingenio": [
      "Centro"
    ],
    "Santo Domingo Ixcatlán": [
      "Centro"
    ],
    "Santo Domingo Nuxaá": [
      "Centro"
    ],
    "Santo Domingo Ozolotepec": [
      "Centro"
    ],
    "Santo Domingo Petapa": [
      "Centro"
    ],
    "Santo Domingo Roayaga": [
      "Centro"
    ],
    "Santo Domingo Tehuantepec": [
      "Centro"
    ],
    "Santo Domingo Teojomulco": [
      "Centro"
    ],
    "Santo Domingo Tepuxtepec": [
      "Centro"
    ],
    "Santo Domingo Tlatayápam": [
      "Centro"
    ],
    "Santo Domingo Tomaltepec": [
      "Centro"
    ],
    "Santo Domingo Tonalá": [
      "Centro"
    ],
    "Santo Domingo Tonaltepec": [
      "Centro"
    ],
    "Santo Domingo Xagacía": [
      "Centro"
    ],
    "Santo Domingo Yanhuitlán": [
      "Centro"
    ],
    "Santo Domingo Yodohino": [
      "Centro"
    ],
    "Santo Domingo Zanatepec": [
      "Centro"
    ],
    "Santo Tomás Jalieza": [
      "Centro"
    ],
    "Santo Tomás Mazaltepec": [
      "Centro"
    ],
    "Santo Tomás Ocotepec": [
      "Centro"
    ],
    "Santo Tomás Tamazulapan": [
      "Centro"
    ],
    "Santos Reyes Nopala": [
      "Centro"
    ],
    "Santos Reyes Pápalo": [
      "Centro"
    ],
    "Santos Reyes Tepejillo": [
      "Centro"
    ],
    "Santos Reyes Yucuná": [
      "Centro"
    ],
    "Silacayoápam": [
      "Centro"
    ],
    "Sitio de Xitlapehua": [
      "Centro"
    ],
    "Soledad Etla": [
      "Centro"
    ],
    "Tamazulápam del Espíritu Santo": [
      "Centro"
    ],
    "Tanetze de Zaragoza": [
      "Centro"
    ],
    "Taniche": [
      "Centro"
    ],
    "Tataltepec de Valdés": [
      "Centro"
    ],
    "Teococuilco de Marcos Pérez": [
      "Centro"
    ],
    "Teotitlán de Flores Magón": [
      "Centro"
    ],
    "Teotitlán del Valle": [
      "Centro"
    ],
    "Teotongo": [
      "Centro"
    ],
    "Tepelmeme Villa de Morelos": [
      "Centro"
    ],
    "Tlacolula de Matamoros": [
      "Centro"
    ],
    "Tlacotepec Plumas": [
      "Centro"
    ],
    "Tlalixtac de Cabrera": [
      "Centro"
    ],
    "Totontepec Villa de Morelos": [
      "Centro"
    ],
    "Trinidad Zaachila": [
      "Centro"
    ],
    "Unión Hidalgo": [
      "Centro"
    ],
    "Valerio Trujano": [
      "Centro"
    ],
    "Villa de Chilapa de Díaz": [
      "Centro"
    ],
    "Villa de Etla": [
      "Centro"
    ],
    "Villa de Tamazulápam del Progreso": [
      "Centro"
    ],
    "Villa de Tututepec de Melchor Ocampo": [
      "Centro"
    ],
    "Villa de Zaachila": [
      "Centro"
    ],
    "Villa Díaz Ordaz": [
      "Centro"
    ],
    "Villa Hidalgo": [
      "Centro"
    ],
    "Villa Sola de Vega": [
      "Centro"
    ],
    "Villa Talea de Castro": [
      "Centro"
    ],
    "Villa Tejúpam de la Unión": [
      "Centro"
    ],
    "Yaxe": [
      "Centro"
    ],
    "Yogana": [
      "Centro"
    ],
    "Yutanduchi de Guerrero": [
      "Centro"
    ],
    "Zapotitlán Lagunas": [
      "Centro"
    ],
    "Zapotitlán Palmas": [
      "Centro"
    ],
    "Zimatlán de Álvarez": [
      "Centro"
    ]
  },
  "Puebla": {
    "Acajete": [
      "Centro"
    ],
    "Acateno": [
      "Centro"
    ],
    "Acatlán": [
      "Centro"
    ],
    "Acatzingo": [
      "Centro"
    ],
    "Acteopan": [
      "Centro"
    ],
    "Ahuacatlán": [
      "Centro"
    ],
    "Ahuatlán": [
      "Centro"
    ],
    "Ahuazotepec": [
      "Centro"
    ],
    "Ahuehuetitla": [
      "Centro"
    ],
    "Ajalpan": [
      "Centro"
    ],
    "Albino Zertuche": [
      "Centro"
    ],
    "Aljojuca": [
      "Centro"
    ],
    "Altepexi": [
      "Centro"
    ],
    "Amixtlán": [
      "Centro"
    ],
    "Amozoc": [
      "Centro"
    ],
    "Aquixtla": [
      "Centro"
    ],
    "Atempan": [
      "Centro"
    ],
    "Atexcal": [
      "Centro"
    ],
    "Atlequizayan": [
      "Centro"
    ],
    "Atlixco": [
      "Centro"
    ],
    "Atoyatempan": [
      "Centro"
    ],
    "Atzala": [
      "Centro"
    ],
    "Atzitzihuacán": [
      "Centro"
    ],
    "Atzitzintla": [
      "Centro"
    ],
    "Axutla": [
      "Centro"
    ],
    "Ayotoxco de Guerrero": [
      "Centro"
    ],
    "Calpan": [
      "Centro"
    ],
    "Caltepec": [
      "Centro"
    ],
    "Camocuautla": [
      "Centro"
    ],
    "Cañada Morelos": [
      "Centro"
    ],
    "Caxhuacan": [
      "Centro"
    ],
    "Chalchicomula de Sesma": [
      "Centro"
    ],
    "Chapulco": [
      "Centro"
    ],
    "Chiautla": [
      "Centro"
    ],
    "Chiautzingo": [
      "Centro"
    ],
    "Chichiquila": [
      "Centro"
    ],
    "Chiconcuautla": [
      "Centro"
    ],
    "Chietla": [
      "Centro"
    ],
    "Chigmecatitlán": [
      "Centro"
    ],
    "Chignahuapan": [
      "Centro"
    ],
    "Chignautla": [
      "Centro"
    ],
    "Chila": [
      "Centro"
    ],
    "Chila de la Sal": [
      "Centro"
    ],
    "Chilchotla": [
      "Centro"
    ],
    "Chinantla": [
      "Centro"
    ],
    "Coatepec": [
      "Centro"
    ],
    "Coatzingo": [
      "Centro"
    ],
    "Cohetzala": [
      "Centro"
    ],
    "Cohuecan": [
      "Centro"
    ],
    "Coronango": [
      "Centro"
    ],
    "Coxcatlán": [
      "Centro"
    ],
    "Coyomeapan": [
      "Centro"
    ],
    "Coyotepec": [
      "Centro"
    ],
    "Cuapiaxtla de Madero": [
      "Centro"
    ],
    "Cuautempan": [
      "Centro"
    ],
    "Cuautinchán": [
      "Centro"
    ],
    "Cuautlancingo": [
      "Centro"
    ],
    "Cuayuca de Andrade": [
      "Centro"
    ],
    "Cuetzalan del Progreso": [
      "Centro"
    ],
    "Cuyoaco": [
      "Centro"
    ],
    "Domingo Arenas": [
      "Centro"
    ],
    "Eloxochitlán": [
      "Centro"
    ],
    "Epatlán": [
      "Centro"
    ],
    "Esperanza": [
      "Centro"
    ],
    "Francisco Z. Mena": [
      "Centro"
    ],
    "General Felipe Ángeles": [
      "Centro"
    ],
    "Guadalupe": [
      "Centro"
    ],
    "Guadalupe Victoria": [
      "Centro"
    ],
    "Hermenegildo Galeana": [
      "Centro"
    ],
    "Honey": [
      "Centro"
    ],
    "Huaquechula": [
      "Centro"
    ],
    "Huatlatlauca": [
      "Centro"
    ],
    "Huauchinango": [
      "Centro"
    ],
    "Huehuetla": [
      "Centro"
    ],
    "Huehuetlán el Chico": [
      "Centro"
    ],
    "Huehuetlán el Grande": [
      "Centro"
    ],
    "Huejotzingo": [
      "Centro"
    ],
    "Hueyapan": [
      "Centro"
    ],
    "Hueytamalco": [
      "Centro"
    ],
    "Hueytlalpan": [
      "Centro"
    ],
    "Huitzilan de Serdán": [
      "Centro"
    ],
    "Huitziltepec": [
      "Centro"
    ],
    "Ixcamilpa de Guerrero": [
      "Centro"
    ],
    "Ixcaquixtla": [
      "Centro"
    ],
    "Ixtacamaxtitlán": [
      "Centro"
    ],
    "Ixtepec": [
      "Centro"
    ],
    "Izúcar de Matamoros": [
      "Centro"
    ],
    "Jalpan": [
      "Centro"
    ],
    "Jolalpan": [
      "Centro"
    ],
    "Jonotla": [
      "Centro"
    ],
    "Jopala": [
      "Centro"
    ],
    "Juan C. Bonilla": [
      "Centro"
    ],
    "Juan Galindo": [
      "Centro"
    ],
    "Juan N. Méndez": [
      "Centro"
    ],
    "La Magdalena Tlatlauquitepec": [
      "Centro"
    ],
    "Lafragua": [
      "Centro"
    ],
    "Libres": [
      "Centro"
    ],
    "Los Reyes de Juárez": [
      "Centro"
    ],
    "Mazapiltepec de Juárez": [
      "Centro"
    ],
    "Mixtla": [
      "Centro"
    ],
    "Molcaxac": [
      "Centro"
    ],
    "Naupan": [
      "Centro"
    ],
    "Nauzontla": [
      "Centro"
    ],
    "Nealtican": [
      "Centro"
    ],
    "Nicolás Bravo": [
      "Centro"
    ],
    "Nopalucan": [
      "Centro"
    ],
    "Ocotepec": [
      "Centro"
    ],
    "Ocoyucan": [
      "Centro"
    ],
    "Olintla": [
      "Centro"
    ],
    "Oriental": [
      "Centro"
    ],
    "Pahuatlán": [
      "Centro"
    ],
    "Palmar de Bravo": [
      "Centro"
    ],
    "Pantepec": [
      "Centro"
    ],
    "Petlalcingo": [
      "Centro"
    ],
    "Piaxtla": [
      "Centro"
    ],
    "Puebla": [
      "Centro"
    ],
    "Quecholac": [
      "Centro"
    ],
    "Quimixtlán": [
      "Centro"
    ],
    "Rafael Lara Grajales": [
      "Centro"
    ],
    "San Andrés Cholula": [
      "Centro"
    ],
    "San Antonio Cañada": [
      "Centro"
    ],
    "San Diego la Mesa Tochimiltzingo": [
      "Centro"
    ],
    "San Felipe Teotlalcingo": [
      "Centro"
    ],
    "San Felipe Tepatlán": [
      "Centro"
    ],
    "San Gabriel Chilac": [
      "Centro"
    ],
    "San Gregorio Atzompa": [
      "Centro"
    ],
    "San Jerónimo Tecuanipan": [
      "Centro"
    ],
    "San Jerónimo Xayacatlán": [
      "Centro"
    ],
    "San José Chiapa": [
      "Centro"
    ],
    "San José Miahuatlán": [
      "Centro"
    ],
    "San Juan Atenco": [
      "Centro"
    ],
    "San Juan Atzompa": [
      "Centro"
    ],
    "San Martín Texmelucan": [
      "Centro"
    ],
    "San Martín Totoltepec": [
      "Centro"
    ],
    "San Matías Tlalancaleca": [
      "Centro"
    ],
    "San Miguel Ixitlán": [
      "Centro"
    ],
    "San Miguel Xoxtla": [
      "Centro"
    ],
    "San Nicolás Buenos Aires": [
      "Centro"
    ],
    "San Nicolás de los Ranchos": [
      "Centro"
    ],
    "San Pablo Anicano": [
      "Centro"
    ],
    "San Pedro Cholula": [
      "Centro"
    ],
    "San Pedro Yeloixtlahuaca": [
      "Centro"
    ],
    "San Salvador el Seco": [
      "Centro"
    ],
    "San Salvador el Verde": [
      "Centro"
    ],
    "San Salvador Huixcolotla": [
      "Centro"
    ],
    "San Sebastián Tlacotepec": [
      "Centro"
    ],
    "Santa Catarina Tlaltempan": [
      "Centro"
    ],
    "Santa Inés Ahuatempan": [
      "Centro"
    ],
    "Santa Isabel Cholula": [
      "Centro"
    ],
    "Santiago Miahuatlán": [
      "Centro"
    ],
    "Santo Tomás Hueyotlipan": [
      "Centro"
    ],
    "Soltepec": [
      "Centro"
    ],
    "Tecali de Herrera": [
      "Centro"
    ],
    "Tecamachalco": [
      "Centro"
    ],
    "Tecomatlán": [
      "Centro"
    ],
    "Tehuacán": [
      "Centro"
    ],
    "Tehuitzingo": [
      "Centro"
    ],
    "Tenampulco": [
      "Centro"
    ],
    "Teopantlán": [
      "Centro"
    ],
    "Teotlalco": [
      "Centro"
    ],
    "Tepanco de López": [
      "Centro"
    ],
    "Tepango de Rodríguez": [
      "Centro"
    ],
    "Tepatlaxco de Hidalgo": [
      "Centro"
    ],
    "Tepeaca": [
      "Centro"
    ],
    "Tepemaxalco": [
      "Centro"
    ],
    "Tepeojuma": [
      "Centro"
    ],
    "Tepetzintla": [
      "Centro"
    ],
    "Tepexco": [
      "Centro"
    ],
    "Tepexi de Rodríguez": [
      "Centro"
    ],
    "Tepeyahualco": [
      "Centro"
    ],
    "Tepeyahualco de Cuauhtémoc": [
      "Centro"
    ],
    "Tetela de Ocampo": [
      "Centro"
    ],
    "Teteles de Avila Castillo": [
      "Centro"
    ],
    "Teziutlán": [
      "Centro"
    ],
    "Tianguismanalco": [
      "Centro"
    ],
    "Tilapa": [
      "Centro"
    ],
    "Tlachichuca": [
      "Centro"
    ],
    "Tlacotepec de Benito Juárez": [
      "Centro"
    ],
    "Tlacuilotepec": [
      "Centro"
    ],
    "Tlahuapan": [
      "Centro"
    ],
    "Tlaltenango": [
      "Centro"
    ],
    "Tlanepantla": [
      "Centro"
    ],
    "Tlaola": [
      "Centro"
    ],
    "Tlapacoya": [
      "Centro"
    ],
    "Tlapanalá": [
      "Centro"
    ],
    "Tlatlauquitepec": [
      "Centro"
    ],
    "Tlaxco": [
      "Centro"
    ],
    "Tochimilco": [
      "Centro"
    ],
    "Tochtepec": [
      "Centro"
    ],
    "Totoltepec de Guerrero": [
      "Centro"
    ],
    "Tulcingo": [
      "Centro"
    ],
    "Tuzamapan de Galeana": [
      "Centro"
    ],
    "Tzicatlacoyan": [
      "Centro"
    ],
    "Venustiano Carranza": [
      "Centro"
    ],
    "Vicente Guerrero": [
      "Centro"
    ],
    "Xayacatlán de Bravo": [
      "Centro"
    ],
    "Xicotepec": [
      "Centro"
    ],
    "Xicotlán": [
      "Centro"
    ],
    "Xiutetelco": [
      "Centro"
    ],
    "Xochiapulco": [
      "Centro"
    ],
    "Xochiltepec": [
      "Centro"
    ],
    "Xochitlán de Vicente Suárez": [
      "Centro"
    ],
    "Xochitlán Todos Santos": [
      "Centro"
    ],
    "Yaonáhuac": [
      "Centro"
    ],
    "Yehualtepec": [
      "Centro"
    ],
    "Zacapala": [
      "Centro"
    ],
    "Zacapoaxtla": [
      "Centro"
    ],
    "Zacatlán": [
      "Centro"
    ],
    "Zapotitlán": [
      "Centro"
    ],
    "Zapotitlán de Méndez": [
      "Centro"
    ],
    "Zaragoza": [
      "Centro"
    ],
    "Zautla": [
      "Centro"
    ],
    "Zihuateutla": [
      "Centro"
    ],
    "Zinacatepec": [
      "Centro"
    ],
    "Zongozotla": [
      "Centro"
    ],
    "Zoquiapan": [
      "Centro"
    ],
    "Zoquitlán": [
      "Centro"
    ]
  },
  "Querétaro de Arteaga": {
    "Amealco de Bonfil": [
      "Centro"
    ],
    "Arroyo Seco": [
      "Centro"
    ],
    "Cadereyta de Montes": [
      "Centro"
    ],
    "Colón": [
      "Centro"
    ],
    "Corregidora": [
      "Centro"
    ],
    "El Marqués": [
      "Centro"
    ],
    "Ezequiel Montes": [
      "Centro"
    ],
    "Huimilpan": [
      "Centro"
    ],
    "Jalpan de Serra": [
      "Centro"
    ],
    "Landa de Matamoros": [
      "Centro"
    ],
    "Pedro Escobedo": [
      "Centro"
    ],
    "Peñamiller": [
      "Centro"
    ],
    "Pinal de Amoles": [
      "Centro"
    ],
    "Querétaro": [
      "Centro"
    ],
    "San Joaquín": [
      "Centro"
    ],
    "San Juan del Río": [
      "Centro"
    ],
    "Tequisquiapan": [
      "Centro"
    ],
    "Tolimán": [
      "Centro"
    ]
  },
  "Quintana Roo": {
    "Bacalar": [
      "Centro"
    ],
    "Benito Juárez": [
      "Centro"
    ],
    "Cozumel": [
      "Centro"
    ],
    "Felipe Carrillo Puerto": [
      "Centro"
    ],
    "Isla Mujeres": [
      "Centro"
    ],
    "José María Morelos": [
      "Centro"
    ],
    "Lázaro Cárdenas": [
      "Centro"
    ],
    "Othón P. Blanco": [
      "Centro"
    ],
    "Solidaridad": [
      "Centro"
    ],
    "Tulum": [
      "Centro"
    ]
  },
  "San Luis Potosí": {
    "Ahualulco": [
      "Centro"
    ],
    "Alaquines": [
      "Centro"
    ],
    "Aquismón": [
      "Centro"
    ],
    "Armadillo de los Infante": [
      "Centro"
    ],
    "Axtla de Terrazas": [
      "Centro"
    ],
    "Cárdenas": [
      "Centro"
    ],
    "Catorce": [
      "Centro"
    ],
    "Cedral": [
      "Centro"
    ],
    "Cerritos": [
      "Centro"
    ],
    "Cerro de San Pedro": [
      "Centro"
    ],
    "Charcas": [
      "Centro"
    ],
    "Ciudad del Maíz": [
      "Centro"
    ],
    "Ciudad Fernández": [
      "Centro"
    ],
    "Ciudad Valles": [
      "Centro"
    ],
    "Coxcatlán": [
      "Centro"
    ],
    "Ebano": [
      "Centro"
    ],
    "El Naranjo": [
      "Centro"
    ],
    "Guadalcázar": [
      "Centro"
    ],
    "Huehuetlán": [
      "Centro"
    ],
    "Lagunillas": [
      "Centro"
    ],
    "Matehuala": [
      "Centro"
    ],
    "Matlapa": [
      "Centro"
    ],
    "Mexquitic de Carmona": [
      "Centro"
    ],
    "Moctezuma": [
      "Centro"
    ],
    "Rayón": [
      "Centro"
    ],
    "Rioverde": [
      "Centro"
    ],
    "Salinas": [
      "Centro"
    ],
    "San Antonio": [
      "Centro"
    ],
    "San Ciro de Acosta": [
      "Centro"
    ],
    "San Luis Potosí": [
      "Centro"
    ],
    "San Martín Chalchicuautla": [
      "Centro"
    ],
    "San Nicolás Tolentino": [
      "Centro"
    ],
    "San Vicente Tancuayalab": [
      "Centro"
    ],
    "Santa Catarina": [
      "Centro"
    ],
    "Santa María del Río": [
      "Centro"
    ],
    "Santo Domingo": [
      "Centro"
    ],
    "Soledad de Graciano Sánchez": [
      "Centro"
    ],
    "Tamasopo": [
      "Centro"
    ],
    "Tamazunchale": [
      "Centro"
    ],
    "Tampacán": [
      "Centro"
    ],
    "Tampamolón Corona": [
      "Centro"
    ],
    "Tamuín": [
      "Centro"
    ],
    "Tancanhuitz": [
      "Centro"
    ],
    "Tanlajás": [
      "Centro"
    ],
    "Tanquián de Escobedo": [
      "Centro"
    ],
    "Tierra Nueva": [
      "Centro"
    ],
    "Vanegas": [
      "Centro"
    ],
    "Venado": [
      "Centro"
    ],
    "Villa de Arista": [
      "Centro"
    ],
    "Villa de Arriaga": [
      "Centro"
    ],
    "Villa de Guadalupe": [
      "Centro"
    ],
    "Villa de la Paz": [
      "Centro"
    ],
    "Villa de Ramos": [
      "Centro"
    ],
    "Villa de Reyes": [
      "Centro"
    ],
    "Villa Hidalgo": [
      "Centro"
    ],
    "Villa Juárez": [
      "Centro"
    ],
    "Xilitla": [
      "Centro"
    ],
    "Zaragoza": [
      "Centro"
    ]
  },
  "Sinaloa": {
    "Ahome": [
      "Centro"
    ],
    "Angostura": [
      "Centro"
    ],
    "Badiraguato": [
      "Centro"
    ],
    "Choix": [
      "Centro"
    ],
    "Concordia": [
      "Centro"
    ],
    "Cosalá": [
      "Centro"
    ],
    "Culiacán": [
      "Centro"
    ],
    "El Fuerte": [
      "Centro"
    ],
    "Elota": [
      "Centro"
    ],
    "Escuinapa": [
      "Centro"
    ],
    "Guasave": [
      "Centro"
    ],
    "Mazatlán": [
      "Centro"
    ],
    "Mocorito": [
      "Centro"
    ],
    "Navolato": [
      "Centro"
    ],
    "Rosario": [
      "Centro"
    ],
    "Salvador Alvarado": [
      "Centro"
    ],
    "San Ignacio": [
      "Centro"
    ],
    "Sinaloa": [
      "Centro"
    ]
  },
  "Sonora": {
    "Aconchi": [
      "Centro"
    ],
    "Agua Prieta": [
      "Centro"
    ],
    "Alamos": [
      "Centro"
    ],
    "Altar": [
      "Centro"
    ],
    "Arivechi": [
      "Centro"
    ],
    "Arizpe": [
      "Centro"
    ],
    "Atil": [
      "Centro"
    ],
    "Bacadéhuachi": [
      "Centro"
    ],
    "Bacanora": [
      "Centro"
    ],
    "Bacerac": [
      "Centro"
    ],
    "Bacoachi": [
      "Centro"
    ],
    "Bácum": [
      "Centro"
    ],
    "Banámichi": [
      "Centro"
    ],
    "Baviácora": [
      "Centro"
    ],
    "Bavispe": [
      "Centro"
    ],
    "Benito Juárez": [
      "Centro"
    ],
    "Benjamín Hill": [
      "Centro"
    ],
    "Caborca": [
      "Centro"
    ],
    "Cajeme": [
      "Centro"
    ],
    "Cananea": [
      "Centro"
    ],
    "Carbó": [
      "Centro"
    ],
    "Cucurpe": [
      "Centro"
    ],
    "Cumpas": [
      "Centro"
    ],
    "Divisaderos": [
      "Centro"
    ],
    "Empalme": [
      "Centro"
    ],
    "Etchojoa": [
      "Centro"
    ],
    "Fronteras": [
      "Centro"
    ],
    "General Plutarco Elías Calles": [
      "Centro"
    ],
    "Granados": [
      "Centro"
    ],
    "Guaymas": [
      "Centro"
    ],
    "Hermosillo": [
      "Centro"
    ],
    "Huachinera": [
      "Centro"
    ],
    "Huásabas": [
      "Centro"
    ],
    "Huatabampo": [
      "Centro"
    ],
    "Huépac": [
      "Centro"
    ],
    "Imuris": [
      "Centro"
    ],
    "La Colorada": [
      "Centro"
    ],
    "Magdalena": [
      "Centro"
    ],
    "Mazatán": [
      "Centro"
    ],
    "Moctezuma": [
      "Centro"
    ],
    "Naco": [
      "Centro"
    ],
    "Nácori Chico": [
      "Centro"
    ],
    "Nacozari de García": [
      "Centro"
    ],
    "Navojoa": [
      "Centro"
    ],
    "Nogales": [
      "Centro"
    ],
    "Onavas": [
      "Centro"
    ],
    "Opodepe": [
      "Centro"
    ],
    "Oquitoa": [
      "Centro"
    ],
    "Pitiquito": [
      "Centro"
    ],
    "Puerto Peñasco": [
      "Centro"
    ],
    "Quiriego": [
      "Centro"
    ],
    "Rayón": [
      "Centro"
    ],
    "Rosario": [
      "Centro"
    ],
    "Sahuaripa": [
      "Centro"
    ],
    "San Felipe de Jesús": [
      "Centro"
    ],
    "San Ignacio Río Muerto": [
      "Centro"
    ],
    "San Javier": [
      "Centro"
    ],
    "San Luis Río Colorado": [
      "Centro"
    ],
    "San Miguel de Horcasitas": [
      "Centro"
    ],
    "San Pedro de la Cueva": [
      "Centro"
    ],
    "Santa Ana": [
      "Centro"
    ],
    "Santa Cruz": [
      "Centro"
    ],
    "Sáric": [
      "Centro"
    ],
    "Soyopa": [
      "Centro"
    ],
    "Suaqui Grande": [
      "Centro"
    ],
    "Tepache": [
      "Centro"
    ],
    "Trincheras": [
      "Centro"
    ],
    "Tubutama": [
      "Centro"
    ],
    "Ures": [
      "Centro"
    ],
    "Villa Hidalgo": [
      "Centro"
    ],
    "Villa Pesqueira": [
      "Centro"
    ],
    "Yécora": [
      "Centro"
    ]
  },
  "Tabasco": {
    "Balancán": [
      "Centro"
    ],
    "Cárdenas": [
      "Centro"
    ],
    "Centla": [
      "Centro"
    ],
    "Centro": [
      "Centro"
    ],
    "Comalcalco": [
      "Centro"
    ],
    "Cunduacán": [
      "Centro"
    ],
    "Emiliano Zapata": [
      "Centro"
    ],
    "Huimanguillo": [
      "Centro"
    ],
    "Jalapa": [
      "Centro"
    ],
    "Jalpa de Méndez": [
      "Centro"
    ],
    "Jonuta": [
      "Centro"
    ],
    "Macuspana": [
      "Centro"
    ],
    "Nacajuca": [
      "Centro"
    ],
    "Paraíso": [
      "Centro"
    ],
    "Tacotalpa": [
      "Centro"
    ],
    "Teapa": [
      "Centro"
    ],
    "Tenosique": [
      "Centro"
    ]
  },
  "Tamaulipas": {
    "Abasolo": [
      "Centro"
    ],
    "Aldama": [
      "Centro"
    ],
    "Altamira": [
      "Centro"
    ],
    "Antiguo Morelos": [
      "Centro"
    ],
    "Burgos": [
      "Centro"
    ],
    "Bustamante": [
      "Centro"
    ],
    "Camargo": [
      "Centro"
    ],
    "Casas": [
      "Centro"
    ],
    "Ciudad Madero": [
      "Centro"
    ],
    "Cruillas": [
      "Centro"
    ],
    "El Mante": [
      "Centro"
    ],
    "Gómez Farías": [
      "Centro"
    ],
    "González": [
      "Centro"
    ],
    "Güémez": [
      "Centro"
    ],
    "Guerrero": [
      "Centro"
    ],
    "Gustavo Díaz Ordaz": [
      "Centro"
    ],
    "Hidalgo": [
      "Centro"
    ],
    "Jaumave": [
      "Centro"
    ],
    "Jiménez": [
      "Centro"
    ],
    "Llera": [
      "Centro"
    ],
    "Mainero": [
      "Centro"
    ],
    "Matamoros": [
      "Centro"
    ],
    "Méndez": [
      "Centro"
    ],
    "Mier": [
      "Centro"
    ],
    "Miguel Alemán": [
      "Centro"
    ],
    "Miquihuana": [
      "Centro"
    ],
    "Nuevo Laredo": [
      "Centro"
    ],
    "Nuevo Morelos": [
      "Centro"
    ],
    "Ocampo": [
      "Centro"
    ],
    "Padilla": [
      "Centro"
    ],
    "Palmillas": [
      "Centro"
    ],
    "Reynosa": [
      "Centro"
    ],
    "Río Bravo": [
      "Centro"
    ],
    "San Carlos": [
      "Centro"
    ],
    "San Fernando": [
      "Centro"
    ],
    "San Nicolás": [
      "Centro"
    ],
    "Soto la Marina": [
      "Centro"
    ],
    "Tampico": [
      "Centro"
    ],
    "Tula": [
      "Centro"
    ],
    "Valle Hermoso": [
      "Centro"
    ],
    "Victoria": [
      "Centro"
    ],
    "Villagrán": [
      "Centro"
    ],
    "Xicoténcatl": [
      "Centro"
    ]
  },
  "Tlaxcala": {
    "Acuamanala de Miguel Hidalgo": [
      "Centro"
    ],
    "Amaxac de Guerrero": [
      "Centro"
    ],
    "Apetatitlán de Antonio Carvajal": [
      "Centro"
    ],
    "Apizaco": [
      "Centro"
    ],
    "Atlangatepec": [
      "Centro"
    ],
    "Atltzayanca": [
      "Centro"
    ],
    "Benito Juárez": [
      "Centro"
    ],
    "Calpulalpan": [
      "Centro"
    ],
    "Chiautempan": [
      "Centro"
    ],
    "Contla de Juan Cuamatzi": [
      "Centro"
    ],
    "Cuapiaxtla": [
      "Centro"
    ],
    "Cuaxomulco": [
      "Centro"
    ],
    "El Carmen Tequexquitla": [
      "Centro"
    ],
    "Emiliano Zapata": [
      "Centro"
    ],
    "Españita": [
      "Centro"
    ],
    "Huamantla": [
      "Centro"
    ],
    "Hueyotlipan": [
      "Centro"
    ],
    "Ixtacuixtla de Mariano Matamoros": [
      "Centro"
    ],
    "Ixtenco": [
      "Centro"
    ],
    "La Magdalena Tlaltelulco": [
      "Centro"
    ],
    "Lázaro Cárdenas": [
      "Centro"
    ],
    "Mazatecochco de José María Morelos": [
      "Centro"
    ],
    "Muñoz de Domingo Arenas": [
      "Centro"
    ],
    "Nanacamilpa de Mariano Arista": [
      "Centro"
    ],
    "Natívitas": [
      "Centro"
    ],
    "Panotla": [
      "Centro"
    ],
    "Papalotla de Xicohténcatl": [
      "Centro"
    ],
    "San Damián Texóloc": [
      "Centro"
    ],
    "San Francisco Tetlanohcan": [
      "Centro"
    ],
    "San Jerónimo Zacualpan": [
      "Centro"
    ],
    "San José Teacalco": [
      "Centro"
    ],
    "San Juan Huactzinco": [
      "Centro"
    ],
    "San Lorenzo Axocomanitla": [
      "Centro"
    ],
    "San Lucas Tecopilco": [
      "Centro"
    ],
    "San Pablo del Monte": [
      "Centro"
    ],
    "Sanctórum de Lázaro Cárdenas": [
      "Centro"
    ],
    "Santa Ana Nopalucan": [
      "Centro"
    ],
    "Santa Apolonia Teacalco": [
      "Centro"
    ],
    "Santa Catarina Ayometla": [
      "Centro"
    ],
    "Santa Cruz Quilehtla": [
      "Centro"
    ],
    "Santa Cruz Tlaxcala": [
      "Centro"
    ],
    "Santa Isabel Xiloxoxtla": [
      "Centro"
    ],
    "Tenancingo": [
      "Centro"
    ],
    "Teolocholco": [
      "Centro"
    ],
    "Tepetitla de Lardizábal": [
      "Centro"
    ],
    "Tepeyanco": [
      "Centro"
    ],
    "Terrenate": [
      "Centro"
    ],
    "Tetla de la Solidaridad": [
      "Centro"
    ],
    "Tetlatlahuca": [
      "Centro"
    ],
    "Tlaxcala": [
      "Centro"
    ],
    "Tlaxco": [
      "Centro"
    ],
    "Tocatlán": [
      "Centro"
    ],
    "Totolac": [
      "Centro"
    ],
    "Tzompantepec": [
      "Centro"
    ],
    "Xaloztoc": [
      "Centro"
    ],
    "Xaltocan": [
      "Centro"
    ],
    "Xicohtzinco": [
      "Centro"
    ],
    "Yauhquemehcan": [
      "Centro"
    ],
    "Zacatelco": [
      "Centro"
    ],
    "Ziltlaltépec de Trinidad Sánchez Santos": [
      "Centro"
    ]
  },
  "Veracruz de Ignacio de la Llave": {
    "Acajete": [
      "Centro"
    ],
    "Acatlán": [
      "Centro"
    ],
    "Acayucan": [
      "Centro"
    ],
    "Actopan": [
      "Centro"
    ],
    "Acula": [
      "Centro"
    ],
    "Acultzingo": [
      "Centro"
    ],
    "Agua Dulce": [
      "Centro"
    ],
    "Álamo Temapache": [
      "Centro"
    ],
    "Alpatláhuac": [
      "Centro"
    ],
    "Alto Lucero de Gutiérrez Barrios": [
      "Centro"
    ],
    "Altotonga": [
      "Centro"
    ],
    "Alvarado": [
      "Centro"
    ],
    "Amatitlán": [
      "Centro"
    ],
    "Amatlán de los Reyes": [
      "Centro"
    ],
    "Angel R. Cabada": [
      "Centro"
    ],
    "Apazapan": [
      "Centro"
    ],
    "Aquila": [
      "Centro"
    ],
    "Astacinga": [
      "Centro"
    ],
    "Atlahuilco": [
      "Centro"
    ],
    "Atoyac": [
      "Centro"
    ],
    "Atzacan": [
      "Centro"
    ],
    "Atzalan": [
      "Centro"
    ],
    "Ayahualulco": [
      "Centro"
    ],
    "Banderilla": [
      "Centro"
    ],
    "Benito Juárez": [
      "Centro"
    ],
    "Boca del Río": [
      "Centro"
    ],
    "Calcahualco": [
      "Centro"
    ],
    "Camarón de Tejeda": [
      "Centro"
    ],
    "Camerino Z. Mendoza": [
      "Centro"
    ],
    "Carlos A. Carrillo": [
      "Centro"
    ],
    "Carrillo Puerto": [
      "Centro"
    ],
    "Castillo de Teayo": [
      "Centro"
    ],
    "Catemaco": [
      "Centro"
    ],
    "Cazones de Herrera": [
      "Centro"
    ],
    "Cerro Azul": [
      "Centro"
    ],
    "Chacaltianguis": [
      "Centro"
    ],
    "Chalma": [
      "Centro"
    ],
    "Chiconamel": [
      "Centro"
    ],
    "Chiconquiaco": [
      "Centro"
    ],
    "Chicontepec": [
      "Centro"
    ],
    "Chinameca": [
      "Centro"
    ],
    "Chinampa de Gorostiza": [
      "Centro"
    ],
    "Chocamán": [
      "Centro"
    ],
    "Chontla": [
      "Centro"
    ],
    "Chumatlán": [
      "Centro"
    ],
    "Citlaltépetl": [
      "Centro"
    ],
    "Coacoatzintla": [
      "Centro"
    ],
    "Coahuitlán": [
      "Centro"
    ],
    "Coatepec": [
      "Centro"
    ],
    "Coatzacoalcos": [
      "Centro"
    ],
    "Coatzintla": [
      "Centro"
    ],
    "Coetzala": [
      "Centro"
    ],
    "Colipa": [
      "Centro"
    ],
    "Comapa": [
      "Centro"
    ],
    "Córdoba": [
      "Centro"
    ],
    "Cosamaloapan de Carpio": [
      "Centro"
    ],
    "Cosautlán de Carvajal": [
      "Centro"
    ],
    "Coscomatepec": [
      "Centro"
    ],
    "Cosoleacaque": [
      "Centro"
    ],
    "Cotaxtla": [
      "Centro"
    ],
    "Coxquihui": [
      "Centro"
    ],
    "Coyutla": [
      "Centro"
    ],
    "Cuichapa": [
      "Centro"
    ],
    "Cuitláhuac": [
      "Centro"
    ],
    "El Higo": [
      "Centro"
    ],
    "Emiliano Zapata": [
      "Centro"
    ],
    "Espinal": [
      "Centro"
    ],
    "Filomeno Mata": [
      "Centro"
    ],
    "Fortín": [
      "Centro"
    ],
    "Gutiérrez Zamora": [
      "Centro"
    ],
    "Hidalgotitlán": [
      "Centro"
    ],
    "Huatusco": [
      "Centro"
    ],
    "Huayacocotla": [
      "Centro"
    ],
    "Hueyapan de Ocampo": [
      "Centro"
    ],
    "Huiloapan de Cuauhtémoc": [
      "Centro"
    ],
    "Ignacio de la Llave": [
      "Centro"
    ],
    "Ilamatlán": [
      "Centro"
    ],
    "Isla": [
      "Centro"
    ],
    "Ixcatepec": [
      "Centro"
    ],
    "Ixhuacán de los Reyes": [
      "Centro"
    ],
    "Ixhuatlán de Madero": [
      "Centro"
    ],
    "Ixhuatlán del Café": [
      "Centro"
    ],
    "Ixhuatlán del Sureste": [
      "Centro"
    ],
    "Ixhuatlancillo": [
      "Centro"
    ],
    "Ixmatlahuacan": [
      "Centro"
    ],
    "Ixtaczoquitlán": [
      "Centro"
    ],
    "Jalacingo": [
      "Centro"
    ],
    "Jalcomulco": [
      "Centro"
    ],
    "Jáltipan": [
      "Centro"
    ],
    "Jamapa": [
      "Centro"
    ],
    "Jesús Carranza": [
      "Centro"
    ],
    "Jilotepec": [
      "Centro"
    ],
    "José Azueta": [
      "Centro"
    ],
    "Juan Rodríguez Clara": [
      "Centro"
    ],
    "Juchique de Ferrer": [
      "Centro"
    ],
    "La Antigua": [
      "Centro"
    ],
    "La Perla": [
      "Centro"
    ],
    "Landero y Coss": [
      "Centro"
    ],
    "Las Choapas": [
      "Centro"
    ],
    "Las Minas": [
      "Centro"
    ],
    "Las Vigas de Ramírez": [
      "Centro"
    ],
    "Lerdo de Tejada": [
      "Centro"
    ],
    "Los Reyes": [
      "Centro"
    ],
    "Magdalena": [
      "Centro"
    ],
    "Maltrata": [
      "Centro"
    ],
    "Manlio Fabio Altamirano": [
      "Centro"
    ],
    "Mariano Escobedo": [
      "Centro"
    ],
    "Martínez de la Torre": [
      "Centro"
    ],
    "Mecatlán": [
      "Centro"
    ],
    "Mecayapan": [
      "Centro"
    ],
    "Medellín": [
      "Centro"
    ],
    "Miahuatlán": [
      "Centro"
    ],
    "Minatitlán": [
      "Centro"
    ],
    "Misantla": [
      "Centro"
    ],
    "Mixtla de Altamirano": [
      "Centro"
    ],
    "Moloacán": [
      "Centro"
    ],
    "Nanchital de Lázaro Cárdenas del Río": [
      "Centro"
    ],
    "Naolinco": [
      "Centro"
    ],
    "Naranjal": [
      "Centro"
    ],
    "Naranjos Amatlán": [
      "Centro"
    ],
    "Nautla": [
      "Centro"
    ],
    "Nogales": [
      "Centro"
    ],
    "Oluta": [
      "Centro"
    ],
    "Omealca": [
      "Centro"
    ],
    "Orizaba": [
      "Centro"
    ],
    "Otatitlán": [
      "Centro"
    ],
    "Oteapan": [
      "Centro"
    ],
    "Ozuluama de Mascareñas": [
      "Centro"
    ],
    "Pajapan": [
      "Centro"
    ],
    "Pánuco": [
      "Centro"
    ],
    "Papantla": [
      "Centro"
    ],
    "Paso de Ovejas": [
      "Centro"
    ],
    "Paso del Macho": [
      "Centro"
    ],
    "Perote": [
      "Centro"
    ],
    "Platón Sánchez": [
      "Centro"
    ],
    "Playa Vicente": [
      "Centro"
    ],
    "Poza Rica de Hidalgo": [
      "Centro"
    ],
    "Pueblo Viejo": [
      "Centro"
    ],
    "Puente Nacional": [
      "Centro"
    ],
    "Rafael Delgado": [
      "Centro"
    ],
    "Rafael Lucio": [
      "Centro"
    ],
    "Río Blanco": [
      "Centro"
    ],
    "Saltabarranca": [
      "Centro"
    ],
    "San Andrés Tenejapan": [
      "Centro"
    ],
    "San Andrés Tuxtla": [
      "Centro"
    ],
    "San Juan Evangelista": [
      "Centro"
    ],
    "San Rafael": [
      "Centro"
    ],
    "Santiago Sochiapan": [
      "Centro"
    ],
    "Santiago Tuxtla": [
      "Centro"
    ],
    "Sayula de Alemán": [
      "Centro"
    ],
    "Sochiapa": [
      "Centro"
    ],
    "Soconusco": [
      "Centro"
    ],
    "Soledad Atzompa": [
      "Centro"
    ],
    "Soledad de Doblado": [
      "Centro"
    ],
    "Soteapan": [
      "Centro"
    ],
    "Tamalín": [
      "Centro"
    ],
    "Tamiahua": [
      "Centro"
    ],
    "Tampico Alto": [
      "Centro"
    ],
    "Tancoco": [
      "Centro"
    ],
    "Tantima": [
      "Centro"
    ],
    "Tantoyuca": [
      "Centro"
    ],
    "Tatahuicapan de Juárez": [
      "Centro"
    ],
    "Tatatila": [
      "Centro"
    ],
    "Tecolutla": [
      "Centro"
    ],
    "Tehuipango": [
      "Centro"
    ],
    "Tempoal": [
      "Centro"
    ],
    "Tenampa": [
      "Centro"
    ],
    "Tenochtitlán": [
      "Centro"
    ],
    "Teocelo": [
      "Centro"
    ],
    "Tepatlaxco": [
      "Centro"
    ],
    "Tepetlán": [
      "Centro"
    ],
    "Tepetzintla": [
      "Centro"
    ],
    "Tequila": [
      "Centro"
    ],
    "Texcatepec": [
      "Centro"
    ],
    "Texhuacán": [
      "Centro"
    ],
    "Texistepec": [
      "Centro"
    ],
    "Tezonapa": [
      "Centro"
    ],
    "Tierra Blanca": [
      "Centro"
    ],
    "Tihuatlán": [
      "Centro"
    ],
    "Tlachichilco": [
      "Centro"
    ],
    "Tlacojalpan": [
      "Centro"
    ],
    "Tlacolulan": [
      "Centro"
    ],
    "Tlacotalpan": [
      "Centro"
    ],
    "Tlacotepec de Mejía": [
      "Centro"
    ],
    "Tlalixcoyan": [
      "Centro"
    ],
    "Tlalnelhuayocan": [
      "Centro"
    ],
    "Tlaltetela": [
      "Centro"
    ],
    "Tlapacoyan": [
      "Centro"
    ],
    "Tlaquilpa": [
      "Centro"
    ],
    "Tlilapan": [
      "Centro"
    ],
    "Tomatlán": [
      "Centro"
    ],
    "Tonayán": [
      "Centro"
    ],
    "Totutla": [
      "Centro"
    ],
    "Tres Valles": [
      "Centro"
    ],
    "Tuxpan": [
      "Centro"
    ],
    "Tuxtilla": [
      "Centro"
    ],
    "Ursulo Galván": [
      "Centro"
    ],
    "Uxpanapa": [
      "Centro"
    ],
    "Vega de Alatorre": [
      "Centro"
    ],
    "Veracruz": [
      "Centro"
    ],
    "Villa Aldama": [
      "Centro"
    ],
    "Xalapa": [
      "Centro"
    ],
    "Xico": [
      "Centro"
    ],
    "Xoxocotla": [
      "Centro"
    ],
    "Yanga": [
      "Centro"
    ],
    "Yecuatla": [
      "Centro"
    ],
    "Zacualpan": [
      "Centro"
    ],
    "Zaragoza": [
      "Centro"
    ],
    "Zentla": [
      "Centro"
    ],
    "Zongolica": [
      "Centro"
    ],
    "Zontecomatlán de López y Fuentes": [
      "Centro"
    ],
    "Zozocolco de Hidalgo": [
      "Centro"
    ]
  },
  "Yucatán": {
    "Abalá": [
      "Centro"
    ],
    "Acanceh": [
      "Centro"
    ],
    "Akil": [
      "Centro"
    ],
    "Baca": [
      "Centro"
    ],
    "Bokobá": [
      "Centro"
    ],
    "Buctzotz": [
      "Centro"
    ],
    "Cacalchén": [
      "Centro"
    ],
    "Calotmul": [
      "Centro"
    ],
    "Cansahcab": [
      "Centro"
    ],
    "Cantamayec": [
      "Centro"
    ],
    "Celestún": [
      "Centro"
    ],
    "Cenotillo": [
      "Centro"
    ],
    "Chacsinkín": [
      "Centro"
    ],
    "Chankom": [
      "Centro"
    ],
    "Chapab": [
      "Centro"
    ],
    "Chemax": [
      "Centro"
    ],
    "Chichimilá": [
      "Centro"
    ],
    "Chicxulub Pueblo": [
      "Centro"
    ],
    "Chikindzonot": [
      "Centro"
    ],
    "Chocholá": [
      "Centro"
    ],
    "Chumayel": [
      "Centro"
    ],
    "Conkal": [
      "Centro"
    ],
    "Cuncunul": [
      "Centro"
    ],
    "Cuzamá": [
      "Centro"
    ],
    "Dzán": [
      "Centro"
    ],
    "Dzemul": [
      "Centro"
    ],
    "Dzidzantún": [
      "Centro"
    ],
    "Dzilam de Bravo": [
      "Centro"
    ],
    "Dzilam González": [
      "Centro"
    ],
    "Dzitás": [
      "Centro"
    ],
    "Dzoncauich": [
      "Centro"
    ],
    "Espita": [
      "Centro"
    ],
    "Halachó": [
      "Centro"
    ],
    "Hocabá": [
      "Centro"
    ],
    "Hoctún": [
      "Centro"
    ],
    "Homún": [
      "Centro"
    ],
    "Huhí": [
      "Centro"
    ],
    "Hunucmá": [
      "Centro"
    ],
    "Ixil": [
      "Centro"
    ],
    "Izamal": [
      "Centro"
    ],
    "Kanasín": [
      "Centro"
    ],
    "Kantunil": [
      "Centro"
    ],
    "Kaua": [
      "Centro"
    ],
    "Kinchil": [
      "Centro"
    ],
    "Kopomá": [
      "Centro"
    ],
    "Mama": [
      "Centro"
    ],
    "Maní": [
      "Centro"
    ],
    "Maxcanú": [
      "Centro"
    ],
    "Mayapán": [
      "Centro"
    ],
    "Mérida": [
      "Centro"
    ],
    "Mocochá": [
      "Centro"
    ],
    "Motul": [
      "Centro"
    ],
    "Muna": [
      "Centro"
    ],
    "Muxupip": [
      "Centro"
    ],
    "Opichén": [
      "Centro"
    ],
    "Oxkutzcab": [
      "Centro"
    ],
    "Panabá": [
      "Centro"
    ],
    "Peto": [
      "Centro"
    ],
    "Progreso": [
      "Centro"
    ],
    "Quintana Roo": [
      "Centro"
    ],
    "Río Lagartos": [
      "Centro"
    ],
    "Sacalum": [
      "Centro"
    ],
    "Samahil": [
      "Centro"
    ],
    "San Felipe": [
      "Centro"
    ],
    "Sanahcat": [
      "Centro"
    ],
    "Santa Elena": [
      "Centro"
    ],
    "Seyé": [
      "Centro"
    ],
    "Sinanché": [
      "Centro"
    ],
    "Sotuta": [
      "Centro"
    ],
    "Sucilá": [
      "Centro"
    ],
    "Sudzal": [
      "Centro"
    ],
    "Suma": [
      "Centro"
    ],
    "Tahdziú": [
      "Centro"
    ],
    "Tahmek": [
      "Centro"
    ],
    "Teabo": [
      "Centro"
    ],
    "Tecoh": [
      "Centro"
    ],
    "Tekal de Venegas": [
      "Centro"
    ],
    "Tekantó": [
      "Centro"
    ],
    "Tekax": [
      "Centro"
    ],
    "Tekit": [
      "Centro"
    ],
    "Tekom": [
      "Centro"
    ],
    "Telchac Pueblo": [
      "Centro"
    ],
    "Telchac Puerto": [
      "Centro"
    ],
    "Temax": [
      "Centro"
    ],
    "Temozón": [
      "Centro"
    ],
    "Tepakán": [
      "Centro"
    ],
    "Tetiz": [
      "Centro"
    ],
    "Teya": [
      "Centro"
    ],
    "Ticul": [
      "Centro"
    ],
    "Timucuy": [
      "Centro"
    ],
    "Tinum": [
      "Centro"
    ],
    "Tixcacalcupul": [
      "Centro"
    ],
    "Tixkokob": [
      "Centro"
    ],
    "Tixmehuac": [
      "Centro"
    ],
    "Tixpéhual": [
      "Centro"
    ],
    "Tizimín": [
      "Centro"
    ],
    "Tunkás": [
      "Centro"
    ],
    "Tzucacab": [
      "Centro"
    ],
    "Uayma": [
      "Centro"
    ],
    "Ucú": [
      "Centro"
    ],
    "Umán": [
      "Centro"
    ],
    "Valladolid": [
      "Centro"
    ],
    "Xocchel": [
      "Centro"
    ],
    "Yaxcabá": [
      "Centro"
    ],
    "Yaxkukul": [
      "Centro"
    ],
    "Yobaín": [
      "Centro"
    ]
  },
  "Zacatecas": {
    "Apozol": [
      "Centro"
    ],
    "Apulco": [
      "Centro"
    ],
    "Atolinga": [
      "Centro"
    ],
    "Benito Juárez": [
      "Centro"
    ],
    "Calera": [
      "Centro"
    ],
    "Cañitas de Felipe Pescador": [
      "Centro"
    ],
    "Chalchihuites": [
      "Centro"
    ],
    "Concepción del Oro": [
      "Centro"
    ],
    "Cuauhtémoc": [
      "Centro"
    ],
    "El Plateado de Joaquín Amaro": [
      "Centro"
    ],
    "El Salvador": [
      "Centro"
    ],
    "Fresnillo": [
      "Centro"
    ],
    "Genaro Codina": [
      "Centro"
    ],
    "General Enrique Estrada": [
      "Centro"
    ],
    "General Francisco R. Murguía": [
      "Centro"
    ],
    "General Pánfilo Natera": [
      "Centro"
    ],
    "Guadalupe": [
      "Centro"
    ],
    "Huanusco": [
      "Centro"
    ],
    "Jalpa": [
      "Centro"
    ],
    "Jerez": [
      "Centro"
    ],
    "Jiménez del Teul": [
      "Centro"
    ],
    "Juan Aldama": [
      "Centro"
    ],
    "Juchipila": [
      "Centro"
    ],
    "Loreto": [
      "Centro"
    ],
    "Luis Moya": [
      "Centro"
    ],
    "Mazapil": [
      "Centro"
    ],
    "Melchor Ocampo": [
      "Centro"
    ],
    "Mezquital del Oro": [
      "Centro"
    ],
    "Miguel Auza": [
      "Centro"
    ],
    "Momax": [
      "Centro"
    ],
    "Monte Escobedo": [
      "Centro"
    ],
    "Morelos": [
      "Centro"
    ],
    "Moyahua de Estrada": [
      "Centro"
    ],
    "Nochistlán de Mejía": [
      "Centro"
    ],
    "Noria de Ángeles": [
      "Centro"
    ],
    "Ojocaliente": [
      "Centro"
    ],
    "Pánuco": [
      "Centro"
    ],
    "Pinos": [
      "Centro"
    ],
    "Río Grande": [
      "Centro"
    ],
    "Sain Alto": [
      "Centro"
    ],
    "Santa María de la Paz": [
      "Centro"
    ],
    "Sombrerete": [
      "Centro"
    ],
    "Susticacán": [
      "Centro"
    ],
    "Tabasco": [
      "Centro"
    ],
    "Tepechitlán": [
      "Centro"
    ],
    "Tepetongo": [
      "Centro"
    ],
    "Teúl de González Ortega": [
      "Centro"
    ],
    "Tlaltenango de Sánchez Román": [
      "Centro"
    ],
    "Trancoso": [
      "Centro"
    ],
    "Trinidad García de la Cadena": [
      "Centro"
    ],
    "Valparaíso": [
      "Centro"
    ],
    "Vetagrande": [
      "Centro"
    ],
    "Villa de Cos": [
      "Centro"
    ],
    "Villa García": [
      "Centro"
    ],
    "Villa González Ortega": [
      "Centro"
    ],
    "Villa Hidalgo": [
      "Centro"
    ],
    "Villanueva": [
      "Centro"
    ],
    "Zacatecas": [
      "Centro"
    ]
  }
};

const MX_MISSING_MUNICIPIOS: Record<string, string[]> = {
  "Baja California": ["San Quintín", "San Felipe"],
  Campeche: ["Seybaplaya", "Dzitbalché"],
  Chiapas: [
    "Capitán Luis Ángel Vidal",
    "Rincón Chamula San Pedro",
    "Mezcalapa",
    "El Parral",
    "Emiliano Zapata",
    "Honduras de la Sierra",
  ],
  Guerrero: ["Ñuu Savi", "Santa Cruz del Rincón", "San Nicolás", "Las Vigas"],
  Morelos: ["Coatetelco", "Xoxocotla", "Hueyapan"],
  "Quintana Roo": ["Puerto Morelos"],
  Sinaloa: ["Eldorado", "Juan José Ríos"],
};

function applyMexicoGeoPatches() {
  if (GEO_MX["Distrito Federal"] && !GEO_MX["Ciudad de México"]) {
    GEO_MX["Ciudad de México"] = GEO_MX["Distrito Federal"];
    delete GEO_MX["Distrito Federal"];
  }
  for (const [estado, munis] of Object.entries(MX_MISSING_MUNICIPIOS)) {
    const bucket = GEO_MX[estado];
    if (!bucket) continue;
    for (const municipio of munis) {
      if (!bucket[municipio]) bucket[municipio] = ["Centro"];
    }
  }
}

applyMexicoGeoPatches();

export function usesMexicoCodCheckout(country: string): boolean {
  return country.toUpperCase() === "MX";
}

function mexicoEstadoKey(estado: string): string {
  if (estado === "Distrito Federal") return "Ciudad de México";
  return estado;
}

export function mexicoEstados(): string[] {
  return Object.keys(GEO_MX).sort((a, b) => a.localeCompare(b, "es"));
}

export function mexicoMunicipios(estado: string): string[] {
  const key = mexicoEstadoKey(estado);
  return Object.keys(GEO_MX[key] ?? GEO_MX[estado] ?? {}).sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

export function mexicoColonias(estado: string, municipio: string): string[] {
  const key = mexicoEstadoKey(estado);
  const base = GEO_MX[key]?.[municipio] ?? GEO_MX[estado]?.[municipio] ?? [];
  return mergePlaceOptions("MX", key, municipio, base);
}
