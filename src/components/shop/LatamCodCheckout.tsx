"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { MapPin, Phone, User, ChevronDown } from "lucide-react";
import { selectedQtyTotalLocal } from "@/components/shop/ProductQtyUpsell";
import { currencyForCountry } from "@/lib/countries";
import { formatLocalAmount } from "@/lib/currency";
import { getProductQtyOffers, selectCodQtyPacks } from "@/lib/qty-upsell";
import { codFormLabel, geoTreeForCountry } from "@/lib/latam-geo";
import type { CountryCode, Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  country: CountryCode;
  qty: number;
  onQtyChange: (qty: number) => void;
  customColor: string;
  onCustomColorChange: (value: string) => void;
  formRef: RefObject<HTMLFormElement | null>;
  onPlaceOrder: (payload: {
    name: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
  }) => void;
};

const OFFER_MS = 12 * 60 * 1000; // 12 minutes

function useOfferCountdown(storageKey: string) {
  const [remainingMs, setRemainingMs] = useState(OFFER_MS);

  useEffect(() => {
    const key = `latam-cod-offer:${storageKey}`;
    let endsAt = Number(sessionStorage.getItem(key) || 0);
    const now = Date.now();
    if (!endsAt || endsAt < now) {
      endsAt = now + OFFER_MS;
      sessionStorage.setItem(key, String(endsAt));
    }
    const tick = () => {
      const left = Math.max(0, endsAt - Date.now());
      setRemainingMs(left);
      if (left <= 0) {
        endsAt = Date.now() + OFFER_MS;
        sessionStorage.setItem(key, String(endsAt));
        setRemainingMs(OFFER_MS);
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [storageKey]);

  const totalSec = Math.floor(remainingMs / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function LatamCodCheckout({
  product,
  country,
  qty,
  onQtyChange,
  customColor,
  onCustomColorChange,
  formRef,
  onPlaceOrder,
}: Props) {
  const currency = currencyForCountry(country);
  const tree = geoTreeForCountry(country);
  const countdown = useOfferCountdown(`${country}:${product.id}`);
  const offers = getProductQtyOffers(product, country, "es");
  const { upsellEnabled } = useStore();
  const packs = useMemo(
    () => selectCodQtyPacks(offers, country, upsellEnabled),
    [offers, country, upsellEnabled]
  );

  useEffect(() => {
    if (!upsellEnabled && qty !== 1) onQtyChange(1);
  }, [upsellEnabled, qty, onQtyChange]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [poblado, setPoblado] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");

  const departamentos = useMemo(
    () => (tree ? Object.keys(tree) : []),
    [tree]
  );
  const municipios = useMemo(() => {
    if (!tree || !departamento) return [];
    return Object.keys(tree[departamento] ?? {});
  }, [tree, departamento]);
  const poblados = useMemo(() => {
    if (!tree || !departamento || !municipio) return [];
    return tree[departamento]?.[municipio] ?? [];
  }, [tree, departamento, municipio]);

  useEffect(() => {
    setMunicipio("");
    setPoblado("");
  }, [departamento]);
  useEffect(() => {
    setPoblado("");
  }, [municipio]);

  const totalLocal = selectedQtyTotalLocal(product, country, "es", qty);
  const totalLabel = formatLocalAmount(totalLocal, currency, "es");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    if (product.customColorEnabled && !customColor.trim()) {
      window.alert("Escribe el color que quieres");
      return;
    }
    if (!departamento || !municipio || !poblado) {
      window.alert("Selecciona departamento, municipio y poblado");
      return;
    }
    const notesParts = [
      `Departamento: ${departamento}`,
      `Municipio: ${municipio}`,
      `Poblado: ${poblado}`,
      referencia.trim() ? `Referencia: ${referencia.trim()}` : "",
      customColor.trim() ? `Color: ${customColor.trim()}` : "",
    ].filter(Boolean);

    onPlaceOrder({
      name: name.trim(),
      phone: phone.trim(),
      city: `${departamento} / ${municipio} / ${poblado}`,
      address: direccion.trim(),
      notes: notesParts.join(" · "),
    });
  };

  return (
    <div
      id="order"
      className="mt-10 scroll-mt-28 overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-[0_10px_40px_rgba(18,28,45,0.08)]"
    >
      {/* Offer timer */}
      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff8a1f] to-[#ff6a00] px-3 py-2.5 text-center text-[13px] font-bold tracking-wide text-white sm:text-sm">
        <span>🔥 OFERTA ESPECIAL — TERMINA EN</span>
        <span className="rounded-md bg-[#1a2333] px-2.5 py-0.5 font-mono text-sm tabular-nums">
          {countdown}
        </span>
      </div>

      <form ref={formRef} onSubmit={onSubmit} className="space-y-3 p-4 sm:p-5">
        {/* Qty packs */}
        {upsellEnabled ? (
        <div className="space-y-2.5">
          {packs.map((offer) => {
            const selected = qty === offer.quantity;
            const disc = offer.savePercent ?? 0;
            const label =
              offer.quantity === 1
                ? "Compra 1 unidad"
                : `Compra ${offer.quantity} · ahorra ${disc || 10}%`;

            return (
              <button
                key={offer.quantity}
                type="button"
                onClick={() => onQtyChange(offer.quantity)}
                className={cn(
                  "relative flex w-full items-center justify-between gap-3 rounded-xl border-2 px-3.5 py-3.5 text-start transition",
                  selected
                    ? "border-[#ff7a00] bg-[#fff7f0]"
                    : "border-[#e6e6e6] bg-white hover:border-[#ffb366]"
                )}
              >
                {offer.quantity > 1 && disc > 0 ? (
                  <span className="absolute -top-2 end-3 rounded-full bg-[#ff7a00] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Ahorra {disc}%
                  </span>
                ) : null}
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                      selected
                        ? "border-[#ff7a00] bg-[#ff7a00]"
                        : "border-[#cfcfcf] bg-white"
                    )}
                  >
                    {selected ? (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    ) : null}
                  </span>
                  <span className="text-sm font-semibold text-[#222] sm:text-[15px]">
                    {label}
                  </span>
                </span>
                <span className="shrink-0 text-end">
                  <span className="block text-base font-extrabold text-[#ff7a00] sm:text-lg">
                    {formatLocalAmount(offer.totalLocal, currency, "es")}
                  </span>
                  {offer.fullPriceLocal > offer.totalLocal ? (
                    <span className="text-xs text-[#999] line-through">
                      {formatLocalAmount(offer.fullPriceLocal, currency, "es")}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
        ) : null}

        {product.customColorEnabled ? (
          <IconField
            icon={<span className="text-sm">🎨</span>}
            value={customColor}
            onChange={onCustomColorChange}
            placeholder="Escribe el color que quieres"
            required
          />
        ) : null}

        <IconField
          icon={<User className="h-4 w-4" />}
          value={name}
          onChange={setName}
          placeholder="Nombre y apellidos"
          required
          autoComplete="name"
        />
        <IconField
          icon={<Phone className="h-4 w-4" />}
          value={phone}
          onChange={setPhone}
          placeholder="Teléfono"
          required
          type="tel"
          autoComplete="tel"
        />

        <SelectField
          value={departamento}
          onChange={setDepartamento}
          placeholder="Departamento"
          options={departamentos}
          required
        />
        <SelectField
          value={municipio}
          onChange={setMunicipio}
          placeholder="Municipio"
          options={municipios}
          required
          disabled={!departamento}
        />
        <SelectField
          value={poblado}
          onChange={setPoblado}
          placeholder="Poblado"
          options={poblados}
          required
          disabled={!municipio}
        />

        <IconField
          icon={<MapPin className="h-4 w-4" />}
          value={direccion}
          onChange={setDireccion}
          placeholder="Dirección Completa"
          required
          autoComplete="street-address"
        />
        <IconField
          icon={<MapPin className="h-4 w-4" />}
          value={referencia}
          onChange={setReferencia}
          placeholder="Color casa / Barrio, sector y referencia"
          required
        />

        {/* Total bar */}
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#121c2d] px-4 py-3.5 text-white">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
              Total al recibir
            </p>
            <p className="text-2xl font-extrabold tracking-tight">{totalLabel}</p>
          </div>
          <span className="rounded-full border border-[#ff7a00] px-3 py-1 text-xs font-bold text-[#ff7a00]">
            Envío gratis
          </span>
        </div>

        <button
          type="submit"
          disabled={!product.inStock}
          className="w-full rounded-xl bg-gradient-to-b from-[#ff9a3d] to-[#ff6a00] px-4 py-4 text-center shadow-[0_8px_20px_rgba(255,106,0,0.35)] transition hover:brightness-105 disabled:opacity-50"
        >
          <span className="block text-[15px] font-extrabold text-white sm:text-base">
            {product.inStock
              ? "Comprar ahora — Pago contra entrega"
              : "Agotado"}
          </span>
          {product.inStock ? (
            <span className="mt-0.5 block text-xs font-medium text-white/90">
              Paga al recibir tu pedido 💵
            </span>
          ) : null}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-1 text-[11px] text-[#8a8a8a] sm:text-xs">
          <span>💵 Pagas al recibir</span>
          <span>🚚 Envío rápido</span>
          <span>🔒 Datos protegidos</span>
        </div>

        <div className="flex items-center justify-between border-t border-[#eee] pt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9a9a9a]">
          <span>{codFormLabel(country)}</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a00]" />
            Powered by Fufills
          </span>
        </div>
      </form>
    </div>
  );
}

function IconField({
  icon,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  autoComplete,
}: {
  icon: ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex items-center gap-2.5 rounded-xl border border-transparent bg-[#f3f3f3] px-3 py-3 focus-within:border-[#ff7a00]/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ff7a00]/20">
      <span className="shrink-0 text-[#9a9a9a]">{icon}</span>
      <input
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent text-sm text-[#222] outline-none placeholder:text-[#9a9a9a]"
      />
    </label>
  );
}

function SelectField({
  value,
  onChange,
  placeholder,
  options,
  required,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label
      className={cn(
        "relative flex items-center rounded-xl border border-transparent bg-[#f3f3f3] px-3 py-3 focus-within:border-[#ff7a00]/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ff7a00]/20",
        disabled && "opacity-60"
      )}
    >
      <select
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border-0 bg-transparent pe-7 text-sm text-[#222] outline-none disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-3 h-4 w-4 text-[#9a9a9a]" />
    </label>
  );
}
