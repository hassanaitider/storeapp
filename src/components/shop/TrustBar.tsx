"use client";

import { Truck, HandCoins, RotateCcw, Languages } from "lucide-react";
import { useT } from "@/hooks/useT";

export function TrustBar() {
  const t = useT();
  const items = [
    {
      icon: Truck,
      title: t.trust.freeShipping,
      desc: t.trust.freeShippingDesc,
    },
    {
      icon: HandCoins,
      title: t.trust.cod,
      desc: t.trust.codDesc,
    },
    {
      icon: RotateCcw,
      title: t.trust.returns,
      desc: t.trust.returnsDesc,
    },
    {
      icon: Languages,
      title: t.trust.support,
      desc: t.trust.supportDesc,
    },
  ];

  return (
    <section className="border-y border-sand-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item, i) => (
          <div
            key={item.title}
            className="flex gap-4 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
