/** Mexico — Estado → Delegación/Municipio → Colonia[] for COD checkout */
export type MexicoGeoTree = Record<string, Record<string, string[]>>;

export const GEO_MX: MexicoGeoTree = {
  "Aguascalientes": {
    "Aguascalientes": [
      "Centro",
      "Villasunción",
      "Ojocaliente",
      "Las Américas",
      "San Marcos",
      "Fracc. Jardines"
    ],
    "Jesús María": [
      "Centro",
      "El Llano",
      "Paso Blanco"
    ],
    "Calvillo": [
      "Centro",
      "Ojocaliente"
    ],
    "Rincón de Romos": [
      "Centro"
    ],
    "Pabellón de Arteaga": [
      "Centro"
    ],
    "San Francisco de los Romo": [
      "Centro"
    ],
    "Asientos": [
      "Centro"
    ],
    "Tepezalá": [
      "Centro"
    ],
    "Cosío": [
      "Centro"
    ],
    "El Llano": [
      "Centro"
    ],
    "San José de Gracia": [
      "Centro"
    ]
  },
  "Baja California": {
    "Tijuana": [
      "Centro",
      "Zona Río",
      "Otay",
      "Playas de Tijuana",
      "La Mesa",
      "San Antonio",
      "El Florido",
      "Hipódromo",
      "Libertad",
      "Sánchez Taboada"
    ],
    "Mexicali": [
      "Centro",
      "Nueva",
      "Progreso",
      "Calafia",
      "Villa del Rey",
      "Xochimilco"
    ],
    "Ensenada": [
      "Centro",
      "Chapultepec",
      "Maneadero",
      "El Sauzal",
      "Valle Dorado"
    ],
    "Tecate": [
      "Centro",
      "Lomas de Santa Anita"
    ],
    "Playas de Rosarito": [
      "Centro",
      "Popotla",
      "Plan Libertador"
    ],
    "San Quintín": [
      "Centro",
      "Camalú",
      "El Rosario"
    ]
  },
  "Baja California Sur": {
    "La Paz": [
      "Centro",
      "El Centenario",
      "Chametla",
      "El Zacatal"
    ],
    "Los Cabos": [
      "San José del Cabo",
      "Cabo San Lucas",
      "Colonia del Sol",
      "El Tezal"
    ],
    "Comondú": [
      "Ciudad Constitución",
      "Loreto (cerca)",
      "Villa Insurgentes"
    ],
    "Mulegé": [
      "Santa Rosalía",
      "Guerrero Negro",
      "Mulegé"
    ],
    "Loreto": [
      "Centro",
      "Nopoló"
    ]
  },
  "Campeche": {
    "Campeche": [
      "Centro Histórico",
      "Santa Ana",
      "San Francisco",
      "Hampolol"
    ],
    "Carmen": [
      "Ciudad del Carmen",
      "Petrolera",
      "Justo Sierra"
    ],
    "Champotón": [
      "Centro",
      "Sihochac"
    ],
    "Escárcega": [
      "Centro"
    ],
    "Calkiní": [
      "Centro"
    ],
    "Hecelchakán": [
      "Centro"
    ],
    "Palizada": [
      "Centro"
    ],
    "Tenabo": [
      "Centro"
    ],
    "Candelaria": [
      "Centro"
    ],
    "Calakmul": [
      "Xpujil"
    ],
    "Hopelchén": [
      "Centro"
    ],
    "Seybaplaya": [
      "Centro"
    ]
  },
  "Chiapas": {
    "Tuxtla Gutiérrez": [
      "Centro",
      "Terán",
      "San José",
      "Bienestar Social",
      "Moctezuma"
    ],
    "San Cristóbal de las Casas": [
      "Centro",
      "La Merced",
      "San Antonio"
    ],
    "Tapachula": [
      "Centro",
      "5 de Febrero",
      "Los Cerritos"
    ],
    "Comitán de Domínguez": [
      "Centro",
      "Las Flores"
    ],
    "Chiapa de Corzo": [
      "Centro"
    ],
    "Palenque": [
      "Centro",
      "La Cañada"
    ],
    "Ocosingo": [
      "Centro"
    ],
    "Tonalá": [
      "Centro",
      "Paredón"
    ],
    "Villaflores": [
      "Centro"
    ],
    "Cintalapa": [
      "Centro"
    ],
    "Huixtla": [
      "Centro"
    ],
    "Motozintla": [
      "Centro"
    ],
    "Suchiapa": [
      "Centro"
    ],
    "Berriozábal": [
      "Centro"
    ]
  },
  "Chihuahua": {
    "Chihuahua": [
      "Centro",
      "San Felipe",
      "Nombre de Dios",
      "Universidad",
      "Granjas",
      "Campestre"
    ],
    "Juárez": [
      "Centro",
      "Pronaf",
      "Campestre",
      "Las Torres",
      "El Barreal",
      "Anapra",
      "Riberas del Bravo"
    ],
    "Delicias": [
      "Centro",
      "Norte",
      "Sur"
    ],
    "Cuauhtémoc": [
      "Centro",
      "Obregón"
    ],
    "Parral": [
      "Centro",
      "Villa"
    ],
    "Nuevo Casas Grandes": [
      "Centro"
    ],
    "Camargo": [
      "Centro"
    ],
    "Jiménez": [
      "Centro"
    ],
    "Meoqui": [
      "Centro"
    ],
    "Aldama": [
      "Centro"
    ],
    "Saúz": [
      "Centro"
    ],
    "Guachochi": [
      "Centro"
    ]
  },
  "Ciudad de México": {
    "Álvaro Obregón": [
      "San Ángel",
      "Florida",
      "Olivar de los Padres",
      "Santa Fe",
      "Tlacopac",
      "Mixcoac",
      "Las Águilas",
      "Jardines del Pedregal"
    ],
    "Azcapotzalco": [
      "Centro",
      "Clavería",
      "San Álvaro",
      "Pro-Hogar",
      "Nueva Santa María"
    ],
    "Benito Juárez": [
      "Del Valle",
      "Narvarte",
      "Nápoles",
      "Portales",
      "Mixcoac",
      "Insurgentes Mixcoac",
      "San José Insurgentes"
    ],
    "Coyoacán": [
      "Del Carmen",
      "Pedregal de Santo Domingo",
      "Copilco",
      "Ajusco",
      "Culhuacán",
      "Santa Úrsula",
      "Los Reyes"
    ],
    "Cuajimalpa de Morelos": [
      "Centro",
      "Santa Fe",
      "Contadero",
      "San José de los Cedros"
    ],
    "Cuauhtémoc": [
      "Centro",
      "Roma Norte",
      "Roma Sur",
      "Condesa",
      "Juárez",
      "Doctores",
      "Buenavista",
      "San Rafael",
      "Tabacalera",
      "Hipódromo"
    ],
    "Gustavo A. Madero": [
      "Lindavista",
      "Aragón",
      "Cuautepec",
      "Villa de Aragón",
      "Guadalupe Tepeyac",
      "Progreso Nacional"
    ],
    "Iztacalco": [
      "Agrícola Oriental",
      "Granjas México",
      "Militar Marte",
      "La Cruz"
    ],
    "Iztapalapa": [
      "Centro Iztapalapa",
      "Santa Cruz Meyehualco",
      "San Miguel Teotongo",
      "Ermita Zaragoza",
      "Cabeza de Juárez",
      "Lomas Estrella"
    ],
    "La Magdalena Contreras": [
      "San Jerónimo Lídice",
      "San Nicolás Totolapan",
      "El Ocotal"
    ],
    "Miguel Hidalgo": [
      "Polanco",
      "Anzures",
      "Tacuba",
      "Lomas de Chapultepec",
      "Irrigación",
      "Popotla",
      "San Miguel Chapultepec"
    ],
    "Milpa Alta": [
      "Villa Milpa Alta",
      "San Salvador Cuauhtenco"
    ],
    "Tláhuac": [
      "San Francisco Tlaltenco",
      "Santa Catarina",
      "Zapotitlán"
    ],
    "Tlalpan": [
      "Centro de Tlalpan",
      "Pedregal de San Ángel",
      "Coapa",
      "Ajusco",
      "Fuentes Brotantes",
      "Miguel Hidalgo"
    ],
    "Venustiano Carranza": [
      "Jardín Balbuena",
      "Moctezuma",
      "Ignacio Zaragoza",
      "Morelos"
    ],
    "Xochimilco": [
      "Centro",
      "Santiago Tepalcatlalpan",
      "San Gregorio Atlapulco",
      "Nativitas"
    ]
  },
  "Coahuila": {
    "Saltillo": [
      "Centro",
      "Zona Universitaria",
      "República",
      "La Nogalera",
      "Virreyes"
    ],
    "Torreón": [
      "Centro",
      "Campestre La Rosita",
      "Residencial Campestre",
      "Las Torres",
      "Nazas"
    ],
    "Monclova": [
      "Centro",
      "Lázaro Cárdenas"
    ],
    "Piedras Negras": [
      "Centro",
      "Villa de Fuente"
    ],
    "Acuña": [
      "Centro",
      "Las Villas"
    ],
    "Ramos Arizpe": [
      "Centro"
    ],
    "Frontera": [
      "Centro"
    ],
    "Sabinas": [
      "Centro"
    ],
    "San Pedro": [
      "Centro"
    ],
    "Matamoros": [
      "Centro"
    ],
    "Allende": [
      "Centro"
    ],
    "Nueva Rosita": [
      "Centro"
    ]
  },
  "Colima": {
    "Colima": [
      "Centro",
      "El Diezmo",
      "Lomas de Circunvalación"
    ],
    "Manzanillo": [
      "Centro",
      "Salahua",
      "Santiago",
      "Valle de las Garzas"
    ],
    "Tecomán": [
      "Centro"
    ],
    "Villa de Álvarez": [
      "Centro",
      "Real Vista Hermosa"
    ],
    "Armería": [
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
    "Minatitlán": [
      "Centro"
    ]
  },
  "Durango": {
    "Durango": [
      "Centro",
      "Guadalupe",
      "El Ciprés",
      "Nuevo Durango"
    ],
    "Gómez Palacio": [
      "Centro",
      "Las Torres",
      "Villa de Santiago"
    ],
    "Lerdo": [
      "Centro"
    ],
    "Santiago Papasquiaro": [
      "Centro"
    ],
    "El Salto": [
      "Centro"
    ],
    "Canatlán": [
      "Centro"
    ],
    "Vicente Guerrero": [
      "Centro"
    ],
    "Nombre de Dios": [
      "Centro"
    ],
    "Pueblo Nuevo": [
      "Centro"
    ],
    "Cuencamé": [
      "Centro"
    ]
  },
  "Estado de México": {
    "Ecatepec": [
      "San Cristóbal",
      "Las Américas",
      "Ciudad Azteca",
      "Jardines de Morelos",
      "Ciudad Cuauhtémoc",
      "Laureles"
    ],
    "Nezahualcóyotl": [
      "Metropolitana",
      "Benito Juárez",
      "Estado de México",
      "Vergel",
      "Impulsora"
    ],
    "Toluca": [
      "Centro",
      "Universidad",
      "San Mateo Otzacatipan",
      "San Jorge Pueblo Nuevo",
      "Modernidad"
    ],
    "Naucalpan": [
      "Satélite",
      "Las Águilas",
      "San Bartolo",
      "Lomas Verdes",
      "Ciudad Satélite",
      "Echegaray"
    ],
    "Tlalnepantla": [
      "Centro",
      "San Javier",
      "Vallejo",
      "La Loma",
      "San Juan Ixhuatepec"
    ],
    "Chimalhuacán": [
      "Centro",
      "Acuitlapilco",
      "Xochiaca"
    ],
    "Atizapán de Zaragoza": [
      "Centro",
      "Lomas Lindas",
      "San Mateo Tecoloapan"
    ],
    "Cuautitlán Izcalli": [
      "Centro",
      "Jorge Jiménez Cantú",
      "San Francisco Tepojaco"
    ],
    "Tultitlán": [
      "Centro",
      "San Pablo de las Salinas",
      "Buena Voluntad"
    ],
    "Ixtapaluca": [
      "Centro",
      "Santa Bárbara",
      "Hornos"
    ],
    "Nicolás Romero": [
      "Centro",
      "Transfiguración"
    ],
    "Tecámac": [
      "Centro",
      "Ojo de Agua",
      "Los Héroes Tecámac"
    ],
    "Chalco": [
      "Centro",
      "San Martín Cuautlalpan"
    ],
    "Valle de Chalco": [
      "Centro",
      "Avándaro"
    ],
    "Coacalco": [
      "Centro",
      "Villa de las Flores"
    ],
    "Huixquilucan": [
      "Interlomas",
      "Jesus del Monte",
      "Zacamulpa"
    ],
    "Metepec": [
      "Centro",
      "San Salvador Tizatlalli",
      "Mayorazgo"
    ],
    "Zinacantepec": [
      "Centro"
    ],
    "Lerma": [
      "Centro",
      "San Pedro Tultepec"
    ],
    "Texcoco": [
      "Centro",
      "San Miguel Tlaixpan"
    ],
    "La Paz": [
      "Los Reyes Acaquilpan",
      "San Isidro"
    ],
    "Chicoloapan": [
      "Centro"
    ],
    "Acolman": [
      "Centro",
      "Tepexpan"
    ],
    "Nextlalpan": [
      "Centro"
    ]
  },
  "Guanajuato": {
    "León": [
      "Centro",
      "Campestre",
      "Las Torres",
      "San Miguel",
      "La Martinica",
      "Delta"
    ],
    "Irapuato": [
      "Centro",
      "Las Américas",
      "Villas de Irapuato"
    ],
    "Celaya": [
      "Centro",
      "Las Palmas",
      "Galaxias"
    ],
    "Salamanca": [
      "Centro",
      "Villas de Salamanca"
    ],
    "Silao": [
      "Centro",
      "Puerto Interior"
    ],
    "Guanajuato": [
      "Centro",
      "Marfil",
      "Pastita"
    ],
    "San Miguel de Allende": [
      "Centro",
      "San Antonio",
      "Allende"
    ],
    "Dolores Hidalgo": [
      "Centro"
    ],
    "Valle de Santiago": [
      "Centro"
    ],
    "Pénjamo": [
      "Centro"
    ],
    "Acámbaro": [
      "Centro"
    ],
    "San Francisco del Rincón": [
      "Centro"
    ],
    "Moroleón": [
      "Centro"
    ],
    "Uriangato": [
      "Centro"
    ],
    "Cortazar": [
      "Centro"
    ],
    "Abasolo": [
      "Centro"
    ]
  },
  "Guerrero": {
    "Acapulco": [
      "Centro",
      "Diamante",
      "Costera",
      "Caleta",
      "Renacimiento",
      "Farallón"
    ],
    "Chilpancingo": [
      "Centro",
      "Burócratas"
    ],
    "Iguala": [
      "Centro"
    ],
    "Zihuatanejo": [
      "Centro",
      "La Ropa",
      "Ixtapa"
    ],
    "Taxco": [
      "Centro",
      "Chavarrieta"
    ],
    "Chilapa": [
      "Centro"
    ],
    "Tlapa": [
      "Centro"
    ],
    "Ciudad Altamirano": [
      "Centro"
    ],
    "Tecpan": [
      "Centro"
    ],
    "Atoyac": [
      "Centro"
    ]
  },
  "Hidalgo": {
    "Pachuca": [
      "Centro",
      "Periodistas",
      "La Hacienda",
      "Venta Prieta",
      "Real de Minas"
    ],
    "Tulancingo": [
      "Centro",
      "Jaltocán"
    ],
    "Tula de Allende": [
      "Centro"
    ],
    "Tepeapulco": [
      "Ciudad Sahagún",
      "Centro"
    ],
    "Tizayuca": [
      "Centro",
      "Haciendas de Tizayuca"
    ],
    "Actopan": [
      "Centro"
    ],
    "Ixmiquilpan": [
      "Centro"
    ],
    "Huejutla": [
      "Centro"
    ],
    "Mineral de la Reforma": [
      "La Providencia",
      "Paseo de las Reynas"
    ],
    "Zempoala": [
      "Centro"
    ]
  },
  "Jalisco": {
    "Guadalajara": [
      "Centro",
      "Providencia",
      "Chapultepec",
      "Americana",
      "Lafayette",
      "Oblatos",
      "Atemajac",
      "Huentitán"
    ],
    "Zapopan": [
      "Centro Zapopan",
      "Ciudad Granja",
      "Valle Real",
      "Puerta de Hierro",
      "Tesistán",
      "Nextipac"
    ],
    "Tlaquepaque": [
      "Centro",
      "San Pedro",
      "El Refugio",
      "Las Pintitas"
    ],
    "Tonalá": [
      "Centro",
      "Loma Dorada",
      "Basilio Badillo"
    ],
    "Tlajomulco": [
      "Centro",
      "Santa Cruz de las Flores",
      "San Agustín"
    ],
    "El Salto": [
      "Centro"
    ],
    "Puerto Vallarta": [
      "Centro",
      "Zona Hotelera",
      "Versalles",
      "5 de Diciembre"
    ],
    "Lagos de Moreno": [
      "Centro"
    ],
    "Tepatitlán": [
      "Centro"
    ],
    "Ciudad Guzmán": [
      "Centro"
    ],
    "Ocotlán": [
      "Centro"
    ],
    "Autlán": [
      "Centro"
    ],
    "Arandas": [
      "Centro"
    ],
    "La Barca": [
      "Centro"
    ],
    "San Juan de los Lagos": [
      "Centro"
    ]
  },
  "Michoacán": {
    "Morelia": [
      "Centro Histórico",
      "Las Américas",
      "La Colina",
      "Tres Marías",
      "Camelinas"
    ],
    "Uruapan": [
      "Centro",
      "La Magdalena"
    ],
    "Zamora": [
      "Centro",
      "Jacarandas"
    ],
    "Lázaro Cárdenas": [
      "Centro",
      "La Orilla"
    ],
    "Apatzingán": [
      "Centro"
    ],
    "Zitácuaro": [
      "Centro"
    ],
    "Pátzcuaro": [
      "Centro"
    ],
    "La Piedad": [
      "Centro"
    ],
    "Hidalgo": [
      "Ciudad Hidalgo"
    ],
    "Sahuayo": [
      "Centro"
    ],
    "Los Reyes": [
      "Centro"
    ],
    "Jacona": [
      "Centro"
    ]
  },
  "Morelos": {
    "Cuernavaca": [
      "Centro",
      "Las Palmas",
      "Vista Hermosa",
      "Acapantzingo",
      "Chapultepec",
      "Lomas de Cortés"
    ],
    "Jiutepec": [
      "Centro",
      "Tejalpa",
      "Progreso"
    ],
    "Cuautla": [
      "Centro",
      "Héroe de Nacozari"
    ],
    "Temixco": [
      "Centro",
      "Lomas del Carril"
    ],
    "Yautepec": [
      "Centro"
    ],
    "Emiliano Zapata": [
      "Centro"
    ],
    "Xochitepec": [
      "Centro"
    ],
    "Jojutla": [
      "Centro"
    ],
    "Puente de Ixtla": [
      "Centro"
    ],
    "Tepoztlán": [
      "Centro"
    ]
  },
  "Nayarit": {
    "Tepic": [
      "Centro",
      "Ciudad del Valle",
      "Zitacua",
      "Villas del Parque"
    ],
    "Bahía de Banderas": [
      "Nuevo Vallarta",
      "Bucerías",
      "Mezcales",
      "San José del Valle"
    ],
    "Santiago Ixcuintla": [
      "Centro"
    ],
    "Compostela": [
      "Centro",
      "La Peñita"
    ],
    "Tecuala": [
      "Centro"
    ],
    "Acaponeta": [
      "Centro"
    ],
    "Xalisco": [
      "Centro"
    ],
    "Ixtlán del Río": [
      "Centro"
    ],
    "San Blas": [
      "Centro"
    ]
  },
  "Nuevo León": {
    "Monterrey": [
      "Centro",
      "San Jerónimo",
      "Cumbres",
      "Obispado",
      "Mitras",
      "Tec",
      "Contry",
      "Linda Vista"
    ],
    "San Pedro Garza García": [
      "Valle Oriente",
      "Del Valle",
      "Fuente de Diana",
      "San Agustín",
      "Santa Engracia"
    ],
    "Guadalupe": [
      "Centro",
      "Las Quintas",
      "La Pastora",
      "Villa Las Fuentes"
    ],
    "Apodaca": [
      "Centro",
      "Huinalá",
      "Pueblo Nuevo",
      "Santa Rosa"
    ],
    "General Escobedo": [
      "Centro",
      "Las Palmas"
    ],
    "Santa Catarina": [
      "Centro",
      "La Fama"
    ],
    "San Nicolás de los Garza": [
      "Centro",
      "Anáhuac",
      "Santo Domingo"
    ],
    "Juárez": [
      "Centro",
      "Villa Juárez"
    ],
    "García": [
      "Centro",
      "Valle de Lincoln"
    ],
    "Cadereyta Jiménez": [
      "Centro"
    ],
    "Santiago": [
      "Centro",
      "El Cercado"
    ],
    "Montemorelos": [
      "Centro"
    ],
    "Linares": [
      "Centro"
    ]
  },
  "Oaxaca": {
    "Oaxaca": [
      "Centro Histórico",
      "Reforma",
      "Xochimilco",
      "Donají",
      "Volcanes"
    ],
    "Salina Cruz": [
      "Centro"
    ],
    "Juchitán": [
      "Centro"
    ],
    "Tuxtepec": [
      "Centro"
    ],
    "Huajuapan": [
      "Centro"
    ],
    "Puerto Escondido": [
      "Centro",
      "Zicatela",
      "Bacocho"
    ],
    "Tehuantepec": [
      "Centro"
    ],
    "Pinotepa Nacional": [
      "Centro"
    ],
    "Miahuatlán": [
      "Centro"
    ],
    "Tlaxiaco": [
      "Centro"
    ]
  },
  "Puebla": {
    "Puebla Capital": [
      "Centro Histórico",
      "La Paz",
      "Angelópolis",
      "San Manuel",
      "Los Héroes",
      "La Hacienda"
    ],
    "Cholula": [
      "San Andrés Cholula",
      "San Pedro Cholula",
      "Zavaleta"
    ],
    "Tehuacán": [
      "Centro",
      "San Lorenzo Teotipilco"
    ],
    "Atlixco": [
      "Centro"
    ],
    "San Martín Texmelucan": [
      "Centro"
    ],
    "Huauchinango": [
      "Centro"
    ],
    "Zacatlán": [
      "Centro"
    ],
    "Teziutlán": [
      "Centro"
    ],
    "Amozoc": [
      "Centro"
    ],
    "Cuautlancingo": [
      "Centro",
      "Finsa"
    ]
  },
  "Querétaro": {
    "Querétaro": [
      "Centro Histórico",
      "Juriquilla",
      "El Refugio",
      "Milán",
      "Cimatario",
      "Carretas",
      "Loma Dorada"
    ],
    "San Juan del Río": [
      "Centro",
      "La Estancita",
      "La Llave"
    ],
    "Corregidora": [
      "Centro",
      "Candiles",
      "El Pueblito"
    ],
    "El Marqués": [
      "Zibatá",
      "La Pradera",
      "Amazonas"
    ],
    "Tequisquiapan": [
      "Centro"
    ],
    "Cadereyta": [
      "Centro"
    ],
    "Pedro Escobedo": [
      "Centro"
    ],
    "Amealco": [
      "Centro"
    ]
  },
  "Quintana Roo": {
    "Cancún": [
      "Centro",
      "Zona Hotelera",
      "Sm 15",
      "Puerto Juárez",
      "Región 227",
      "Supermanzana 20"
    ],
    "Playa del Carmen": [
      "Centro",
      "Playacar",
      "Ejidal",
      "Gonzalo Guerrero"
    ],
    "Chetumal": [
      "Centro",
      "Bahía",
      "Payo Obispo"
    ],
    "Cozumel": [
      "Centro",
      "San Miguel"
    ],
    "Tulum": [
      "Centro",
      "Aldea Zama",
      "La Veleta"
    ],
    "Isla Mujeres": [
      "Centro"
    ],
    "Felipe Carrillo Puerto": [
      "Centro"
    ],
    "José María Morelos": [
      "Centro"
    ],
    "Bacalar": [
      "Centro"
    ],
    "Puerto Morelos": [
      "Centro",
      "Joaquín Zetina Gasca"
    ]
  },
  "San Luis Potosí": {
    "San Luis Potosí": [
      "Centro",
      "Tangamanga",
      "Lomas",
      "Morales",
      "Himno Nacional"
    ],
    "Soledad de Graciano Sánchez": [
      "Centro",
      "Villa de Pozos"
    ],
    "Ciudad Valles": [
      "Centro"
    ],
    "Matehuala": [
      "Centro"
    ],
    "Rioverde": [
      "Centro"
    ],
    "Tamazunchale": [
      "Centro"
    ],
    "Ebano": [
      "Centro"
    ],
    "Cárdenas": [
      "Centro"
    ]
  },
  "Sinaloa": {
    "Culiacán": [
      "Centro",
      "Tres Ríos",
      "Las Quintas",
      "Humaya",
      "Guadalupe"
    ],
    "Mazatlán": [
      "Centro",
      "Zona Dorada",
      "Cerritos",
      "El Venadillo"
    ],
    "Los Mochis": [
      "Centro",
      "Jiquilpan"
    ],
    "Guasave": [
      "Centro"
    ],
    "Navolato": [
      "Centro"
    ],
    "El Fuerte": [
      "Centro"
    ],
    "Escuinapa": [
      "Centro"
    ],
    "Guamúchil": [
      "Centro"
    ]
  },
  "Sonora": {
    "Hermosillo": [
      "Centro",
      "Pitic",
      "Sahuaro",
      "Villa de Seris",
      "La Manga"
    ],
    "Cajeme": [
      "Centro Ciudad Obregón",
      "Villa ITSON",
      "Modelo"
    ],
    "Nogales": [
      "Centro",
      "Buenos Aires"
    ],
    "San Luis Río Colorado": [
      "Centro"
    ],
    "Navojoa": [
      "Centro"
    ],
    "Guaymas": [
      "Centro",
      "San Carlos"
    ],
    "Agua Prieta": [
      "Centro"
    ],
    "Caborca": [
      "Centro"
    ],
    "Puerto Peñasco": [
      "Centro",
      "Las Conchas"
    ],
    "Cananea": [
      "Centro"
    ]
  },
  "Tabasco": {
    "Villahermosa": [
      "Centro",
      "Gaviotas",
      "Atasta",
      "Primero de Mayo",
      "Carrizal"
    ],
    "Cárdenas": [
      "Centro"
    ],
    "Comalcalco": [
      "Centro"
    ],
    "Huimanguillo": [
      "Centro"
    ],
    "Macuspana": [
      "Centro"
    ],
    "Paraíso": [
      "Centro"
    ],
    "Centla": [
      "Frontera"
    ],
    "Teapa": [
      "Centro"
    ],
    "Tenosique": [
      "Centro"
    ]
  },
  "Tamaulipas": {
    "Tampico": [
      "Centro",
      "Altavista",
      "Lomas de Rosales"
    ],
    "Reynosa": [
      "Centro",
      "Las Fuentes",
      "Longoria"
    ],
    "Matamoros": [
      "Centro",
      "Moderno"
    ],
    "Nuevo Laredo": [
      "Centro",
      "Viveros"
    ],
    "Ciudad Victoria": [
      "Centro",
      "Atanacio Garza"
    ],
    "Ciudad Madero": [
      "Centro",
      "Ampliación"
    ],
    "Altamira": [
      "Centro"
    ],
    "Río Bravo": [
      "Centro"
    ],
    "Valle Hermoso": [
      "Centro"
    ],
    "Mante": [
      "Centro"
    ]
  },
  "Tlaxcala": {
    "Tlaxcala": [
      "Centro",
      "Ocotlán",
      "La Loma Xicohténcatl"
    ],
    "Apizaco": [
      "Centro"
    ],
    "Huamantla": [
      "Centro"
    ],
    "Chiautempan": [
      "Centro"
    ],
    "Calpulalpan": [
      "Centro"
    ],
    "Zacatelco": [
      "Centro"
    ],
    "Contla": [
      "Centro"
    ],
    "San Pablo del Monte": [
      "Centro"
    ]
  },
  "Veracruz": {
    "Veracruz": [
      "Centro",
      "Boca del Río",
      "Costa Verde",
      "Floresta",
      "Reforma"
    ],
    "Xalapa": [
      "Centro",
      "Las Animas",
      "Sumidero",
      "Ánimas"
    ],
    "Coatzacoalcos": [
      "Centro",
      "Puerto México"
    ],
    "Córdoba": [
      "Centro"
    ],
    "Orizaba": [
      "Centro"
    ],
    "Poza Rica": [
      "Centro"
    ],
    "Minatitlán": [
      "Centro"
    ],
    "Tuxpan": [
      "Centro"
    ],
    "Papantla": [
      "Centro"
    ],
    "Boca del Río": [
      "Centro",
      "Costa de Oro"
    ],
    "Martínez de la Torre": [
      "Centro"
    ],
    "San Andrés Tuxtla": [
      "Centro"
    ]
  },
  "Yucatán": {
    "Mérida": [
      "Centro",
      "García Ginerés",
      "Altabrisa",
      "Montes de Amé",
      "Francisco de Montejo",
      "Chuburná"
    ],
    "Valladolid": [
      "Centro"
    ],
    "Progreso": [
      "Centro",
      "Chelem"
    ],
    "Tizimín": [
      "Centro"
    ],
    "Kanasín": [
      "Centro"
    ],
    "Umán": [
      "Centro"
    ],
    "Tekax": [
      "Centro"
    ],
    "Motul": [
      "Centro"
    ],
    "Izamal": [
      "Centro"
    ]
  },
  "Zacatecas": {
    "Zacatecas": [
      "Centro Histórico",
      "Lomas de la Soledad",
      "Lomas del Calvario"
    ],
    "Fresnillo": [
      "Centro",
      "Del Valle"
    ],
    "Guadalupe": [
      "Centro",
      "La Escondida"
    ],
    "Jerez": [
      "Centro"
    ],
    "Río Grande": [
      "Centro"
    ],
    "Sombrerete": [
      "Centro"
    ],
    "Ojocaliente": [
      "Centro"
    ],
    "Calera": [
      "Centro"
    ]
  }
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
