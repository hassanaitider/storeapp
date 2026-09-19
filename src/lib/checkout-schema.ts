import { getCountry } from "./countries";
import type { CountryCode, Locale, Order } from "./types";

export type CheckoutForm = {
  name: string;
  phone: string;
  state: string;
  city: string;
  neighborhood: string;
  district: string;
  postalCode: string;
  address: string;
  nationalId: string;
  notes: string;
};

export function emptyCheckoutForm(): CheckoutForm {
  return {
    name: "",
    phone: "",
    state: "",
    city: "",
    neighborhood: "",
    district: "",
    postalCode: "",
    address: "",
    nationalId: "",
    notes: "",
  };
}

type Localized = { ar: string; en: string; es: string };

export type CheckoutSchema = {
  hasState: boolean;
  stateLabel: Localized;
  hasNeighborhood: boolean;
  neighborhoodLabel: Localized;
  neighborhoodRequired: boolean;
  hasDistrict: boolean;
  districtLabel: Localized;
  districtRequired: boolean;
  hasPostal: boolean;
  postalRequired: boolean;
  postalLabel: Localized;
  postalPattern?: RegExp;
  hasNationalId: boolean;
  nationalIdRequired: boolean;
  nationalIdLabel: Localized;
  phoneMin: number;
  phoneMax: number;
};

const L = {
  state: { ar: "الولاية", en: "State", es: "Estado" },
  province: { ar: "المحافظة", en: "Province", es: "Provincia" },
  department: { ar: "القسم", en: "Department", es: "Departamento" },
  region: { ar: "المنطقة", en: "Region", es: "Región" },
  municipality: { ar: "البلدية", en: "Municipality", es: "Municipio" },
  colonia: { ar: "الحي / المستعمرة", en: "Neighborhood / colonia", es: "Colonia" },
  barrio: { ar: "الحي", en: "Neighborhood", es: "Barrio" },
  zona: { ar: "المنطقة", en: "Zone", es: "Zona" },
  district: { ar: "المقاطعة", en: "District", es: "Distrito" },
  canton: { ar: "الكانتون", en: "Canton", es: "Cantón" },
  sector: { ar: "القطاع", en: "Sector", es: "Sector" },
  urbanization: { ar: "التجمّع السكني", en: "Urbanization", es: "Urbanización" },
  postal: { ar: "الرمز البريدي", en: "Postal code", es: "Código postal" },
  cep: { ar: "الرمز البريدي (CEP)", en: "ZIP code (CEP)", es: "CEP" },
  zip: { ar: "الرمز البريدي", en: "ZIP code", es: "Código ZIP" },
  cpf: { ar: "رقم CPF", en: "CPF", es: "CPF" },
  rut: { ar: "رقم RUT", en: "RUT", es: "RUT" },
  cedula: { ar: "رقم الهوية", en: "National ID", es: "Cédula" },
  dni: { ar: "رقم الهوية", en: "National ID", es: "DNI" },
} satisfies Record<string, Localized>;

const MENA: CheckoutSchema = {
  hasState: false,
  stateLabel: L.province,
  hasNeighborhood: false,
  neighborhoodLabel: L.barrio,
  neighborhoodRequired: false,
  hasDistrict: false,
  districtLabel: L.district,
  districtRequired: false,
  hasPostal: false,
  postalRequired: false,
  postalLabel: L.postal,
  hasNationalId: false,
  nationalIdRequired: false,
  nationalIdLabel: L.cedula,
  phoneMin: 8,
  phoneMax: 10,
};

function latamBase(overrides: Partial<CheckoutSchema>): CheckoutSchema {
  return {
    hasState: true,
    stateLabel: L.department,
    hasNeighborhood: false,
    neighborhoodLabel: L.barrio,
    neighborhoodRequired: false,
    hasDistrict: false,
    districtLabel: L.district,
    districtRequired: false,
    hasPostal: false,
    postalRequired: false,
    postalLabel: L.postal,
    hasNationalId: false,
    nationalIdRequired: false,
    nationalIdLabel: L.cedula,
    phoneMin: 8,
    phoneMax: 10,
    ...overrides,
  };
}

/** Fufills-style COD checkout fields per covered market */
const SCHEMAS: Record<CountryCode, CheckoutSchema> = {
  MA: { ...MENA, phoneMin: 9, phoneMax: 10 },
  SA: { ...MENA, phoneMin: 9, phoneMax: 9 },
  AE: { ...MENA, phoneMin: 9, phoneMax: 9 },
  OM: { ...MENA, phoneMin: 8, phoneMax: 8 },
  IQ: { ...MENA, phoneMin: 10, phoneMax: 10 },
  LY: { ...MENA, phoneMin: 9, phoneMax: 10 },
  LB: { ...MENA, phoneMin: 8, phoneMax: 8 },
  KW: { ...MENA, phoneMin: 8, phoneMax: 8 },
  BH: { ...MENA, phoneMin: 8, phoneMax: 8 },
  QA: { ...MENA, phoneMin: 8, phoneMax: 8 },
  EG: { ...MENA, phoneMin: 10, phoneMax: 11 },
  US: {
    ...MENA,
    hasState: true,
    stateLabel: L.state,
    hasPostal: true,
    postalRequired: true,
    postalLabel: L.zip,
    postalPattern: /^\d{5}(-\d{4})?$/,
    phoneMin: 10,
    phoneMax: 10,
  },
  MX: latamBase({
    stateLabel: L.state,
    hasNeighborhood: true,
    neighborhoodRequired: true,
    neighborhoodLabel: L.colonia,
    hasPostal: true,
    postalRequired: true,
    postalLabel: L.postal,
    postalPattern: /^\d{5}$/,
    phoneMin: 10,
    phoneMax: 10,
  }),
  GT: latamBase({
    hasNeighborhood: true,
    neighborhoodLabel: L.zona,
    phoneMin: 8,
    phoneMax: 8,
  }),
  HN: latamBase({ phoneMin: 8, phoneMax: 8 }),
  SV: latamBase({ phoneMin: 8, phoneMax: 8 }),
  NI: latamBase({ phoneMin: 8, phoneMax: 8 }),
  CR: latamBase({
    stateLabel: L.province,
    hasDistrict: true,
    districtRequired: true,
    districtLabel: L.canton,
    phoneMin: 8,
    phoneMax: 8,
  }),
  PA: latamBase({
    stateLabel: L.province,
    phoneMin: 7,
    phoneMax: 8,
  }),
  CO: latamBase({
    hasNeighborhood: true,
    neighborhoodLabel: L.barrio,
    hasNationalId: true,
    nationalIdLabel: L.cedula,
    phoneMin: 10,
    phoneMax: 10,
  }),
  BR: latamBase({
    stateLabel: L.state,
    hasNeighborhood: true,
    neighborhoodRequired: true,
    neighborhoodLabel: L.barrio,
    hasPostal: true,
    postalRequired: true,
    postalLabel: L.cep,
    postalPattern: /^\d{5}-?\d{3}$/,
    hasNationalId: true,
    nationalIdRequired: true,
    nationalIdLabel: L.cpf,
    phoneMin: 10,
    phoneMax: 11,
  }),
  AR: latamBase({
    stateLabel: L.province,
    hasPostal: true,
    postalRequired: true,
    postalLabel: L.postal,
    postalPattern: /^[A-Za-z]?\d{4}[A-Za-z]{0,3}$/,
    hasNationalId: true,
    nationalIdLabel: L.dni,
    phoneMin: 10,
    phoneMax: 10,
  }),
  PE: latamBase({
    hasDistrict: true,
    districtRequired: true,
    districtLabel: L.district,
    hasNationalId: true,
    nationalIdLabel: L.dni,
    phoneMin: 9,
    phoneMax: 9,
  }),
  CL: latamBase({
    stateLabel: L.region,
    hasNationalId: true,
    nationalIdLabel: L.rut,
    phoneMin: 9,
    phoneMax: 9,
  }),
  EC: latamBase({
    stateLabel: L.province,
    hasNationalId: true,
    nationalIdLabel: L.cedula,
    phoneMin: 9,
    phoneMax: 10,
  }),
  BO: latamBase({ phoneMin: 8, phoneMax: 8 }),
  DO: latamBase({
    stateLabel: L.province,
    hasNeighborhood: true,
    neighborhoodLabel: L.sector,
    phoneMin: 10,
    phoneMax: 10,
  }),
  PR: latamBase({
    stateLabel: L.municipality,
    hasNeighborhood: true,
    neighborhoodLabel: L.urbanization,
    hasPostal: true,
    postalRequired: true,
    postalLabel: L.zip,
    postalPattern: /^\d{5}(-\d{4})?$/,
    phoneMin: 10,
    phoneMax: 10,
  }),
};

export function getCheckoutSchema(country: CountryCode): CheckoutSchema {
  return SCHEMAS[country] ?? MENA;
}

export function pickCheckoutLabel(label: Localized, locale: Locale): string {
  return label[locale] || label.en;
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function normalizeCheckoutPhone(phone: string, country: CountryCode): string {
  const info = getCountry(country);
  const digits = digitsOnly(phone);
  const dialDigits = digitsOnly(info.dial);
  if (digits.startsWith(dialDigits)) return `+${digits}`;
  if (digits.startsWith("00" + dialDigits)) return `+${digits.slice(2)}`;
  return `${info.dial}${digits}`;
}

export function validateCheckoutForm(
  form: CheckoutForm,
  country: CountryCode
): string | null {
  const schema = getCheckoutSchema(country);
  if (!form.name.trim()) return "name";
  const phone = digitsOnly(form.phone);
  if (phone.length < schema.phoneMin || phone.length > schema.phoneMax) {
    return "phone";
  }
  if (schema.hasState && !form.state.trim()) return "state";
  if (!form.city.trim()) return "city";
  if (schema.hasDistrict && schema.districtRequired && !form.district.trim()) {
    return "district";
  }
  if (
    schema.hasNeighborhood &&
    schema.neighborhoodRequired &&
    !form.neighborhood.trim()
  ) {
    return "neighborhood";
  }
  if (schema.hasPostal && schema.postalRequired) {
    const postal = form.postalCode.trim();
    if (!postal) return "postalCode";
    if (schema.postalPattern && !schema.postalPattern.test(postal)) {
      return "postalCode";
    }
  }
  if (!form.address.trim()) return "address";
  if (schema.hasNationalId && schema.nationalIdRequired && !form.nationalId.trim()) {
    return "nationalId";
  }
  return null;
}

export function checkoutFormToCustomer(
  form: CheckoutForm,
  country: CountryCode
): Order["customer"] {
  const city = form.state.trim()
    ? `${form.city.trim()}, ${form.state.trim()}`
    : form.city.trim();

  const addressParts = [
    form.address.trim(),
    form.neighborhood.trim(),
    form.district.trim(),
    form.postalCode.trim(),
  ].filter(Boolean);

  return {
    name: form.name.trim(),
    phone: normalizeCheckoutPhone(form.phone, country),
    city,
    address: addressParts.join(" · "),
    notes: form.notes.trim() || undefined,
    state: form.state.trim() || undefined,
    neighborhood: form.neighborhood.trim() || undefined,
    district: form.district.trim() || undefined,
    postalCode: form.postalCode.trim() || undefined,
    nationalId: form.nationalId.trim() || undefined,
  };
}
