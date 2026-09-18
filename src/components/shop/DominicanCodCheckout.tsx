"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { MapPin, User, ChevronDown, Zap } from "lucide-react";
import { selectedQtyTotalLocal } from "@/components/shop/ProductQtyUpsell";
import { formatDominicanCodPrice } from "@/lib/currency";
import { getProductQtyOffers, selectCodQtyPacks } from "@/lib/qty-upsell";
import { useLiveProduct } from "@/context/StoreContext";
import {
  dominicanCiudades,
  dominicanProvincias,
} from "@/lib/dominican-geo";
import type { CountryCode, Product } from "@/lib/types";
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

const OFFER_MS = 15 * 60 * 1000;

function useOfferCountdown(storageKey: string) {
  const [remainingMs, setRemainingMs] = useState(OFFER_MS);

  useEffect(() => {
    const key = `do-cod-offer:${storageKey}`;
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Dominican Republic-only Fufills-style COD checkout (not used for other markets). */
export function DominicanCodCheckout({
  product,
  country,
  qty,
  onQtyChange,
  customColor,
  onCustomColorChange,
  formRef,
  onPlaceOrder,
}: Props) {
  const countdown = useOfferCountdown(`${country}:${product.id}`);
  const liveProduct = useLiveProduct(product);
  const offers = getProductQtyOffers(liveProduct, country, "es");
  const upsellOn = liveProduct.qtyUpsellEnabled === true;
  const packs = useMemo(
    () => selectCodQtyPacks(offers, country, upsellOn),
    [offers, country, upsellOn]
  );

  useEffect(() => {
    if (!upsellOn && qty !== 1) onQtyChange(1);
  }, [upsellOn, qty, onQtyChange]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [direccion, setDireccion] = useState("");
  const [provincia, setProvincia] = useState("");
  const [ciudad, setCiudad] = useState("");

  const provincias = useMemo(() => dominicanProvincias(), []);
  const ciudades = useMemo(() => dominicanCiudades(provincia), [provincia]);

  useEffect(() => {
    setCiudad("");
  }, [provincia]);

  const totalLocal = selectedQtyTotalLocal(product, country, "es", qty);
  const totalLabel = formatDominicanCodPrice(totalLocal);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    if (product.customColorEnabled && !customColor.trim()) {
      window.alert("Escribe el color que quieres");
      return;
    }
    if (!provincia || !ciudad) {
      window.alert("Selecciona provincia y ciudad");
      return;
    }
    const notesParts = [
      `Provincia: ${provincia}`,
      `Ciudad: ${ciudad}`,
      customColor.trim() ? `Color: ${customColor.trim()}` : "",
    ].filter(Boolean);

    onPlaceOrder({
      name: name.trim(),
      phone: phone.trim(),
      city: `${ciudad}, ${provincia}`,
      address: direccion.trim(),
      notes: notesParts.join(" · "),
    });
  };

  return (
    <div
      id="order"
      className="mt-10 scroll-mt-28 overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-[0_10px_40px_rgba(18,28,45,0.08)]"
    >
      <div className="bg-[#121c2d] px-4 pb-5 pt-5 sm:px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-[#0a101a] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
          <Zap className="h-3.5 w-3.5 fill-[#ffd54a] text-[#ffd54a]" />
          <span aria-hidden>📦</span>
          Contra entrega
        </span>
        <h2 className="mt-3 text-xl font-extrabold leading-snug text-white sm:text-2xl">
          Completa tus datos para ordenar
        </h2>
        <p className="mt-1.5 text-xs font-medium tracking-wide text-white/55 sm:text-[13px]">
          🇩🇴 COD FORM DOMINICAN · Tu producto
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff8a1f] to-[#ff6a00] px-3 py-2.5 text-center text-[13px] font-bold tracking-wide text-white sm:text-sm">
        <span>🔥 OFERTA ESPECIAL — TERMINA EN</span>
        <span className="rounded-md bg-[#1a2333] px-2.5 py-0.5 font-mono text-sm tabular-nums">
          {countdown}
        </span>
      </div>

      <form ref={formRef} onSubmit={onSubmit} className="space-y-3 p-4 sm:p-5">
        {upsellOn ? (
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
                    {formatDominicanCodPrice(offer.totalLocal)}
                  </span>
                  {offer.fullPriceLocal > offer.totalLocal ? (
                    <span className="text-xs text-[#999] line-through">
                      {formatDominicanCodPrice(offer.fullPriceLocal)}
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
          placeholder="Ej: Juan Pablo Duarte"
          required
          autoComplete="name"
        />
        <IconField
          icon={<WhatsAppIcon className="h-4 w-4 text-[#25D366]" />}
          value={phone}
          onChange={setPhone}
          placeholder="Ej: 8095629458"
          required
          type="tel"
          autoComplete="tel"
        />
        <IconField
          icon={<MapPin className="h-4 w-4" />}
          value={direccion}
          onChange={setDireccion}
          placeholder="Ej: Av. Romulo Betancourt # 8"
          required
          autoComplete="street-address"
        />

        <SelectField
          value={provincia}
          onChange={setProvincia}
          placeholder="Provincia"
          options={provincias}
          required
        />
        <SelectField
          value={ciudad}
          onChange={setCiudad}
          placeholder="Ej: Santo Domingo"
          options={ciudades}
          required
          disabled={!provincia}
        />

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
          <span>COD FORM DOMINICAN</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a00]" />
            POWERED BY FUFILLS
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
      <ChevronDown className="pointer-events-none absolute start-3 h-4 w-4 text-[#9a9a9a]" />
      <select
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border-0 bg-transparent pe-7 ps-7 text-sm text-[#222] outline-none disabled:cursor-not-allowed"
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
