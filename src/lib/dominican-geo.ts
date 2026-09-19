/** Dominican Republic — Provincia → Municipio from Fufills COD coverage. */
export type DominicanGeoTree = Record<string, string[]>;
export const GEO_DO: DominicanGeoTree = {
  "AZUA": [
    "AZUA (AZUA DE COMPOSTELA)",
    "DOÑA EMMA BALAGUER VIUDA VALLEJO",
    "ESTEBANÍA",
    "LAS BARÍAS-LA ESTANCIA",
    "LAS CLAVELLINA",
    "LOS JOVILLOS",
    "SABANA YEGUA"
  ],
  "BAHORUCO": [
    "EL PALMAR",
    "GALVÁN",
    "NEIBA",
    "VILLA JARAGUA"
  ],
  "BARAHONA": [
    "BARAHONA (SANTA CRUZ DE BARAHONA)",
    "CABRAL",
    "EL CACHON",
    "EL PEÑÓN",
    "FUNDACION",
    "JAQUIMEYES",
    "LA GUÁZARA",
    "PESCADERÍA",
    "VILLA CENTRAL"
  ],
  "DAJABÓN": [
    "CAÑONGO",
    "DAJABÓN",
    "LOMA DE CABRERA",
    "SANTIAGO DE LA CRUZ"
  ],
  "DISTRITO NACIONAL": [
    "SANTO DOMINGO"
  ],
  "DUARTE": [
    "JAYA",
    "LA PEÑA",
    "PRESIDENTE DON ANTONIO GUZMÁN FERNÁNDEZ",
    "SAN FRANCISCO DE MACORÍS"
  ],
  "EL SEIBO": [
    "EL SEIBO (SANTA CRUZ DEL SEIBO)",
    "SANTA LUCIA"
  ],
  "ELÍAS PIÑA": [
    "COMENDADOR"
  ],
  "ESPAILLAT": [
    "CANCA LA REINA",
    "CAYETANO GERMOSÉN",
    "EL HIGUERITO",
    "JUAN LÓPEZ",
    "LA ORTEGA",
    "LAS LAGUNAS",
    "MOCA",
    "MONTE DE LA JAGUA",
    "SAN VICTOR"
  ],
  "HATO MAYOR": [
    "GUAYABO DULCE",
    "HATO MAYOR (HATO MAYOR DEL REY)",
    "MATA PALACIO",
    "YERBA BUENA"
  ],
  "HERMANAS MIRABAL (SALCEDO)": [
    "SALCEDO (JUANA NÚÑEZ)",
    "TENARES"
  ],
  "INDEPENDENCIA": [
    "BOCA DE CACHÓN",
    "EL LIMÓN",
    "JIMANÍ"
  ],
  "LA ALTAGRACIA": [
    "BÁVARO",
    "HIGUEY (SALVALEÓN DE HIGUEY)",
    "LA OTRA BANDA (HIGUEY)",
    "PUNTA CANA",
    "VERÓN"
  ],
  "LA ROMANA": [
    "CALETA",
    "LA ROMANA",
    "VILLA HERMOSA"
  ],
  "LA VEGA": [
    "BUENA VISTA",
    "CONSTANZA",
    "JARABACOA",
    "LA VEGA (CONCEPCIÓN DE LA VEGA)",
    "RÍO VERDE ARRIBA"
  ],
  "MARÍA TRINIDAD SÁNCHEZ": [
    "ARROYO AL MEDIO",
    "EL FACTOR",
    "NAGUA",
    "NAGUA (SAN JOSE DE MATANZAS)"
  ],
  "MONSEÑOR NOUEL": [
    "ARROYO TORO-MASIPEDRO",
    "BONAO",
    "JAYACO",
    "JUMA BEJUCAL",
    "LA SALVIA-LOS QUEMADOS",
    "PIEDRA BLANCA",
    "SABANA DEL PUERTO",
    "VILLA SONADOR"
  ],
  "MONTE CRISTI": [
    "MONTE CRISTI (SAN FERNANDO DE MONTE CRISTI)",
    "VILLA VÁSQUEZ (SANTA ANA, VILLA ISABEL)"
  ],
  "MONTE PLATA": [
    "MONTE PLATA",
    "SABANA GRANDE DE BOYÁ"
  ],
  "PEDERNALES": [
    "JOSÉ FRANCISCO PEÑA GÓMEZ",
    "PEDERNALES"
  ],
  "PERAVIA": [
    "BANÍ",
    "CATALINA",
    "MATANZAS",
    "PAYA",
    "VILLA SOMBRERO"
  ],
  "PUERTO PLATA": [
    "PUERTO PLATA (SAN FELIPE DE PUERTO PLATA)",
    "SOSÚA",
    "VILLA MONTELLANO"
  ],
  "SAMANÁ": [
    "LAS TERRENAS",
    "SAMANÁ (SANTA BÁRBARA DE SAMANÁ)",
    "SÁNCHEZ"
  ],
  "SAN CRISTOBAL": [
    "EL CARRIL",
    "HAINA (BAJOS DE HAINA)",
    "HATO DAMAS",
    "NIGUA (SAN GREGORIO DE NIGUA)",
    "SAN CRISTOBAL",
    "VILLA ALTAGRACIA"
  ],
  "SAN JOSÉ DE OCOA": [
    "EL NARANJAL",
    "SABANA LARGA",
    "SAN JOSÉ DE OCOA"
  ],
  "SAN JUAN": [
    "EL ROSARIO",
    "HATO DEL PADRE",
    "JUAN DE HERRERA",
    "SAN JUAN"
  ],
  "SAN PEDRO DE MACORÍS": [
    "CONSUELO",
    "SAN PEDRO DE MACORÍS"
  ],
  "SANTIAGO": [
    "CANABACOA",
    "CANCA DE LA PIEDRA",
    "GUAYABAL",
    "LAS PALOMAS",
    "LICEY AL MEDIO",
    "PUÑAL",
    "SANTIAGO DE LOS CABALLEROS",
    "TAMBORIL (PEÑA)",
    "VILLA GONZÁLEZ"
  ],
  "SANTIAGO RODRÍGUEZ": [
    "SABANETA (SAN IGNACIO DE SABANETA)",
    "VILLA LOS ALMÁCIGOS"
  ],
  "SANTO DOMINGO": [
    "BOCA CHICA",
    "LA CALETA",
    "LA GUÁYIGA",
    "LA VICTORIA",
    "LOS ALCARRIZOS",
    "PALMAREJO-VILLA LINDA",
    "PANTOJA",
    "PEDRO BRAND",
    "SAN LUIS",
    "SANTO DOMINGO ESTE",
    "SANTO DOMINGO NORTE",
    "SANTO DOMINGO OESTE"
  ],
  "SÁNCHEZ RAMÍREZ": [
    "COTUÍ",
    "LA BIJA",
    "LA MATA",
    "QUITA SUEÑO"
  ],
  "VALVERDE": [
    "BOCA DE MAO",
    "ESPERANZA",
    "JAIBÓN (PUEBLO NUEVO)",
    "MAO (SANTA CRUZ DE MAO)",
    "ÁNIMA"
  ]
};



export function usesDominicanCodCheckout(country: string): boolean {
  return country.toUpperCase() === "DO";
}

export function dominicanProvincias(): string[] {
  return Object.keys(GEO_DO).sort((a, b) => a.localeCompare(b, "es"));
}

export function dominicanCiudades(provincia: string): string[] {
  return GEO_DO[provincia] ?? [];
}
