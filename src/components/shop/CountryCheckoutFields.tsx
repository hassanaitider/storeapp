"use client";

import { useId, useMemo } from "react";
import { useT } from "@/hooks/useT";
import { getCountry } from "@/lib/countries";
import {
  getCheckoutDivisions,
  getCitiesForState,
  isSingleDivisionCountry,
} from "@/lib/checkout-geo";
import {
  type CheckoutForm,
  getCheckoutSchema,
  pickCheckoutLabel,
} from "@/lib/checkout-schema";
import type { CountryCode, Locale } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  country: CountryCode;
  locale: Locale;
  value: CheckoutForm;
  onChange: (next: CheckoutForm) => void;
  errorField?: string | null;
  compact?: boolean;
};

export function CountryCheckoutFields({
  country,
  locale,
  value,
  onChange,
  errorField,
  compact,
}: Props) {
  const t = useT();
  const schema = getCheckoutSchema(country);
  const info = getCountry(country);
  const cityListId = useId();
  const hideState = isSingleDivisionCountry(country) || !schema.hasState;
  const divisions = getCheckoutDivisions(country);
  const implicitState = hideState ? divisions[0]?.name ?? "" : value.state;
  const cities = useMemo(
    () => getCitiesForState(country, implicitState),
    [country, implicitState]
  );

  const set = <K extends keyof CheckoutForm>(key: K, next: CheckoutForm[K]) => {
    onChange({
      ...value,
      [key]: next,
      ...(key === "state" ? { city: "" } : null),
    });
  };

  const inputClass = compact
    ? "mt-1.5 w-full rounded-xl border border-sand-300 bg-white px-3 py-2.5 text-[length:var(--text-base)] outline-none ring-brand-500/30 focus:border-brand-500 focus:ring-2"
    : "mt-1.5 w-full rounded-xl border border-sand-300 bg-sand-50/50 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-[var(--ring)]";

  const labelClass = compact
    ? "block text-sm"
    : "block text-sm font-medium text-ink-800";

  return (
    <div className="space-y-4">
      <Field
        label={t.checkout.name}
        required
        value={value.name}
        onChange={(v) => set("name", v)}
        error={errorField === "name"}
        className={inputClass}
        labelClass={labelClass}
      />

      <label className={labelClass}>
        <span className={compact ? "product-label text-ink-800" : undefined}>
          {t.checkout.phone}
        </span>
        <div className="mt-1.5 flex overflow-hidden rounded-xl border border-sand-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-[var(--ring)]">
          <span className="inline-flex items-center bg-sand-100 px-3 text-sm font-semibold text-ink-700">
            {info.dial}
          </span>
          <input
            type="tel"
            required
            inputMode="tel"
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder={t.checkout.phoneHint}
            className={cn(
              "min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 outline-none",
              compact ? "bg-white" : "bg-sand-50/50"
            )}
            aria-invalid={errorField === "phone"}
          />
        </div>
        {errorField === "phone" ? (
          <p className="mt-1 text-xs text-red-600">{t.checkout.invalidPhone}</p>
        ) : null}
      </label>

      {schema.hasState && !hideState ? (
        <label className={labelClass}>
          <span className={compact ? "product-label text-ink-800" : undefined}>
            {pickCheckoutLabel(schema.stateLabel, locale)}
          </span>
          <select
            required
            value={value.state}
            onChange={(e) => set("state", e.target.value)}
            className={inputClass}
            aria-invalid={errorField === "state"}
          >
            <option value="">{t.checkout.selectState}</option>
            {divisions.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className={labelClass}>
        <span className={compact ? "product-label text-ink-800" : undefined}>
          {t.checkout.city}
        </span>
        <input
          required
          list={cityListId}
          value={value.city}
          onChange={(e) => set("city", e.target.value)}
          placeholder={t.checkout.selectCity}
          className={inputClass}
          aria-invalid={errorField === "city"}
        />
        <datalist id={cityListId}>
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </label>

      {schema.hasDistrict ? (
        <Field
          label={pickCheckoutLabel(schema.districtLabel, locale)}
          required={schema.districtRequired}
          value={value.district}
          onChange={(v) => set("district", v)}
          error={errorField === "district"}
          className={inputClass}
          labelClass={labelClass}
        />
      ) : null}

      {schema.hasNeighborhood ? (
        <Field
          label={pickCheckoutLabel(schema.neighborhoodLabel, locale)}
          required={schema.neighborhoodRequired}
          value={value.neighborhood}
          onChange={(v) => set("neighborhood", v)}
          error={errorField === "neighborhood"}
          className={inputClass}
          labelClass={labelClass}
        />
      ) : null}

      {schema.hasPostal ? (
        <Field
          label={pickCheckoutLabel(schema.postalLabel, locale)}
          required={schema.postalRequired}
          value={value.postalCode}
          onChange={(v) => set("postalCode", v)}
          error={errorField === "postalCode"}
          className={inputClass}
          labelClass={labelClass}
        />
      ) : null}

      <Field
        label={t.checkout.address}
        required
        value={value.address}
        onChange={(v) => set("address", v)}
        error={errorField === "address"}
        className={inputClass}
        labelClass={labelClass}
      />

      {schema.hasNationalId ? (
        <Field
          label={pickCheckoutLabel(schema.nationalIdLabel, locale)}
          required={schema.nationalIdRequired}
          value={value.nationalId}
          onChange={(v) => set("nationalId", v)}
          error={errorField === "nationalId"}
          className={inputClass}
          labelClass={labelClass}
        />
      ) : null}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  error,
  className,
  labelClass,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: boolean;
  className: string;
  labelClass: string;
}) {
  return (
    <label className={labelClass}>
      <span className={labelClass.includes("product-label") ? "product-label text-ink-800" : undefined}>
        {label}
      </span>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error}
        className={cn(className, error && "border-red-400")}
      />
    </label>
  );
}
