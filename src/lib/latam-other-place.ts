/** Extra select option so any customer can type a colonia/barrio not in the list. */
export const LATAM_OTHER_PLACE = "Otra (escribir)";

export function withOtherPlace(list: string[]): string[] {
  const unique = [...new Set(list.filter(Boolean))];
  const without = unique.filter((name) => name !== LATAM_OTHER_PLACE);
  if (!without.length) return [LATAM_OTHER_PLACE];
  return [...without, LATAM_OTHER_PLACE];
}

export function isOtherPlace(value: string): boolean {
  return value === LATAM_OTHER_PLACE;
}

export function resolvePlace(selected: string, custom: string): string {
  if (!selected) return "";
  if (isOtherPlace(selected)) return custom.trim();
  return selected.trim();
}
