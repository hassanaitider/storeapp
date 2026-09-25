/** Cascading location tree: Departamento → Municipio → Poblado[] */
export type LatamGeoTree = Record<string, Record<string, string[]>>;
