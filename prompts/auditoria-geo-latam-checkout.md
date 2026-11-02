# Prompt de auditoría geo — 9 mercados LATAM vs checkout

Copia y pega el bloque siguiente a una IA (con acceso al repo). Incluye la base oficial de divisiones políticas (nivel 1 completo + conteos oficiales esperados) y el mapeo del checkout actual.

---

## ROL

Eres un auditor de datos geográficos para un ecommerce COD en LATAM. Debes **comparar la jerarquía política oficial** de cada país con los árboles geo del checkout y **reportar cualquier omisión** (departamento/estado/provincia, municipio/cantón/ciudad, poblado/distrito/parroquia/colonia/localidad según aplique). No inventes municipios: si falta una fuente L2/L3 completa en el prompt, usa las fuentes oficiales citadas y el código del repo.

## PAÍSES (9)

`MX`, `AR`, `GT`, `CR`, `HN`, `SV`, `NI`, `DO`, `EC`

## ARCHIVOS DEL CHECKOUT A AUDITAR

| Código | Árbol geo | Componente checkout | Jerarquía UI |
|--------|-----------|---------------------|--------------|
| MX | `src/lib/mexico-geo.ts` → `GEO_MX` | `MexicoCodCheckout` | Estado → Delegación/Municipio → Colonia |
| AR | `src/lib/argentina-geo.ts` → `GEO_AR` | `ArgentinaCodCheckout` | Provincia → localidad |
| DO | `src/lib/dominican-geo.ts` → `GEO_DO` | `DominicanCodCheckout` | Provincia → Municipio/Ciudad |
| EC | `src/lib/ecuador-geo.ts` → `GEO_EC` | `EcuadorCodCheckout` | Provincia → Ciudad (parroquias) |
| GT | `src/lib/latam-geo.ts` → `GEO_GT` | `LatamCodCheckout` | Departamento → Municipio → Poblado |
| CR | `src/lib/latam-geo.ts` → `GEO_CR` | `LatamCodCheckout` | Provincia → Cantón → Distrito/Poblado |
| HN | `src/lib/latam-geo.ts` → `GEO_HN` | `HondurasCodCheckout` | Departamento → Ciudad/Municipio |
| SV | `src/lib/latam-geo.ts` → `GEO_SV` | `SalvadorCodCheckout` | Provincia(=Depto) → Ciudad/Municipio |
| NI | `src/lib/latam-geo.ts` → `GEO_NI` | `NicaraguaCodCheckout` | Departamento → Municipio → Barrio/Sector |

También lee `prompts/checkout-geo-snapshot.json` (snapshot del árbol actual: conteos + lista level1).

## BASE OFICIAL — JERARQUÍA Y LISTAS NIVEL 1

Normaliza acentos/mayúsculas al comparar (`Atlántida` ≡ `Atlantida`). Reporta alias y typos.

### 1) México (MX)
- **Jerarquía oficial:** Entidad federativa → Municipio (o alcaldía CDMX) → (colonia/asentamiento, opcional en checkout)
- **Fuente:** INEGI / Catálogo Único de Claves de Áreas Geoestadísticas
- **Conteo esperado:** 32 entidades; ~2 469 municipios/alcaldías
- **Nivel 1 oficial (32):**
  Aguascalientes; Baja California; Baja California Sur; Campeche; Chiapas; Chihuahua; Ciudad de México (a menudo catalogada como Distrito Federal / CDMX); Coahuila de Zaragoza; Colima; Durango; Guanajuato; Guerrero; Hidalgo; Jalisco; México; Michoacán de Ocampo; Morelos; Nayarit; Nuevo León; Oaxaca; Puebla; Querétaro; Quintana Roo; San Luis Potosí; Sinaloa; Sonora; Tabasco; Tamaulipas; Tlaxcala; Veracruz de Ignacio de la Llave; Yucatán; Zacatecas

### 2) Argentina (AR)
- **Jerarquía oficial:** Provincia / CABA → Departamento/Partido (interno) → Localidad
- **Checkout:** Provincia → localidad (sin exponer departamento)
- **Fuente:** INDEC / códigos postales oficiales
- **Conteo esperado:** 23 provincias + CABA = 24
- **Nivel 1 oficial (24):**
  Buenos Aires; Catamarca; Chaco; Chubut; Ciudad Autónoma de Buenos Aires; Córdoba; Corrientes; Entre Ríos; Formosa; Jujuy; La Pampa; La Rioja; Mendoza; Misiones; Neuquén; Río Negro; Salta; San Juan; San Luis; Santa Cruz; Santa Fe; Santiago del Estero; Tierra del Fuego, Antártida e Islas del Atlántico Sur; Tucumán

### 3) Guatemala (GT)
- **Jerarquía oficial:** Departamento → Municipio → (aldeas/caseríos = poblado)
- **Fuente:** INE Guatemala / SEGEPLAN
- **Conteo esperado:** 22 departamentos; 340 municipios
- **Nivel 1 oficial (22):**
  Alta Verapaz; Baja Verapaz; Chimaltenango; Chiquimula; El Progreso; Escuintla; Guatemala; Huehuetenango; Izabal; Jalapa; Jutiapa; Petén; Quetzaltenango; Quiché; Retalhuleu; Sacatepéquez; San Marcos; Santa Rosa; Sololá; Suchitepéquez; Totonicapán; Zacapa

### 4) Costa Rica (CR)
- **Jerarquía oficial:** Provincia → Cantón → Distrito
- **Fuente:** INEC / División Territorial Administrativa
- **Conteo esperado:** 7 provincias; 84 cantones; ~490 distritos
- **Nivel 1 oficial (7):**
  San José; Alajuela; Cartago; Heredia; Guanacaste; Puntarenas; Limón

### 5) Honduras (HN)
- **Jerarquía oficial:** Departamento → Municipio → (aldea)
- **Fuente:** INE Honduras
- **Conteo esperado:** 18 departamentos; 298 municipios
- **Nivel 1 oficial (18):**
  Atlántida; Choluteca; Colón; Comayagua; Copán; Cortés; El Paraíso; Francisco Morazán; Gracias a Dios; Intibucá; Islas de la Bahía; La Paz; Lempira; Ocotepeque; Olancho; Santa Bárbara; Valle; Yoro

### 6) El Salvador (SV)
- **Jerarquía oficial (histórica usada en COD):** Departamento → Municipio
- **Nota 2024:** reforma territorial a 44 municipios nuevos — el checkout puede aún usar el catálogo histórico (~262). Audita **ambos**: (A) catálogo histórico 14×municipios, (B) si el producto debe migrar a 44.
- **Fuente:** DIGESTYC / reformas 2023–2024
- **Nivel 1 oficial (14 departamentos):**
  Ahuachapán; Cabañas; Chalatenango; Cuscatlán; La Libertad; La Paz; La Unión; Morazán; San Miguel; San Salvador; San Vicente; Santa Ana; Sonsonate; Usulután

### 7) Nicaragua (NI)
- **Jerarquía oficial:** Departamento / Región Autónoma → Municipio → (barrio/comarca)
- **Fuente:** INIDE / Ley de División Política Administrativa
- **Conteo esperado:** 15 departamentos + 2 regiones autónomas = 17; ~153 municipios
- **Nivel 1 oficial (17):**
  Boaco; Carazo; Chinandega; Chontales; Estelí; Granada; Jinotega; León; Madriz; Managua; Masaya; Matagalpa; Nueva Segovia; Río San Juan; Rivas; Región Autónoma de la Costa Caribe Norte (RACCN / Costa Caribe Norte); Región Autónoma de la Costa Caribe Sur (RACCS / Costa Caribe Sur)

### 8) República Dominicana (DO)
- **Jerarquía oficial:** Provincia / Distrito Nacional → Municipio → (distrito municipal / sección)
- **Fuente:** ONE República Dominicana
- **Conteo esperado:** 31 provincias + Distrito Nacional = 32; ~158 municipios
- **Nivel 1 oficial (32):**
  Distrito Nacional; Azua; Baoruco; Barahona; Dajabón; Duarte; El Seibo; Elías Piña; Espaillat; Hato Mayor; Hermanas Mirabal; Independencia; La Altagracia; La Romana; La Vega; María Trinidad Sánchez; Monseñor Nouel; Monte Cristi; Monte Plata; Pedernales; Peravia; Puerto Plata; Samaná; San Cristóbal; San José de Ocoa; San Juan; San Pedro de Macorís; Sánchez Ramírez; Santiago; Santiago Rodríguez; Santo Domingo; Valverde

### 9) Ecuador (EC)
- **Jerarquía oficial:** Provincia → Cantón → Parroquia (urbana/rural)
- **Checkout:** Provincia → Ciudad (lista de parroquias/ciudades)
- **Fuente:** INEC / DPA
- **Conteo esperado:** 24 provincias; ~221 cantones; ~1000+ parroquias
- **Nivel 1 oficial (24):**
  Azuay; Bolívar; Cañar; Carchi; Chimborazo; Cotopaxi; El Oro; Esmeraldas; Galápagos; Guayas; Imbabura; Loja; Los Ríos; Manabí; Morona Santiago; Napo; Orellana; Pastaza; Pichincha; Santa Elena; Santo Domingo de los Tsáchilas; Sucumbíos; Tungurahua; Zamora Chinchipe

## REGLAS DE COMPARACIÓN

1. **Nivel 1 (obligatorio):** diff exacto entre lista oficial arriba y `Object.keys(GEO_*)` del checkout. Reporta `missing_in_checkout`, `extra_in_checkout`, `rename_needed`.
2. **Nivel 2 (obligatorio):** para cada L1, verifica que no falte ningún municipio/cantón/ciudad oficial. Si el archivo del repo es enorme, audita por país y lista omisiones con nombre oficial.
3. **Nivel 3:**
   - GT/CR/HN/SV/NI: si el tercer nivel es solo `["Centro"]` en casi todos, márcalo como **stub incompleto** (poblado/distrito/barrio no real).
   - CR: distritos deben ser reales, no stubs.
   - MX colonias / AR localidades / EC parroquias / DO municipios: no omitir entradas oficiales presentes en fuente.
4. **Checkout UI:** confirma que el componente de cada país expone la jerarquía correcta (tabla arriba) y que no mezcla labels de otro país (ej. Poblado en HN, Color casa en NI).
5. **No borres datos** en el informe: solo auditoría + plan de parche priorizado.

## FORMATO DE SALIDA (obligatorio)

```md
# Auditoría geo LATAM vs checkout

## Resumen ejecutivo
- Países OK / parcial / crítico
- Riesgo COD (envíos mal ruteados) por país

## Por país (MX…EC)
### {CODE}
- Jerarquía oficial vs UI checkout
- Conteos: oficial vs checkout (L1/L2/L3)
- Missing L1: [...]
- Extra L1: [...]
- Missing L2 (muestra o lista completa si < 50): [...]
- Stubs L3 / calidad: ...
- Severidad: OK | WARN | CRITICAL
- Parche sugerido (archivos + método)

## Plan de remediación ordenado
1. ...
```

## TAREA

1. Lee los `GEO_*` y `prompts/checkout-geo-snapshot.json`.
2. Compara contra la base oficial de este prompt.
3. Entrega el informe en el formato anterior.
4. Si encuentras omisiones CRITICAL en L1 o L2, propone el diff mínimo para completarlas (sin tocar mercados no LATAM).

---

## Notas para quien ejecuta el prompt

- Adjunta o asegura acceso a: `src/lib/latam-geo.ts`, `mexico-geo.ts`, `argentina-geo.ts`, `dominican-geo.ts`, `ecuador-geo.ts`, componentes `*CodCheckout.tsx`, y `prompts/checkout-geo-snapshot.json`.
- Fuentes L2/L3 oficiales (para completar auditoría profunda): INEGI (MX), INDEC (AR), INE-GT, INEC-CR, INE-HN, DIGESTYC/SV, INIDE-NI, ONE-DO, INEC-EC.
