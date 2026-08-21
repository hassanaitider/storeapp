"use client";

import Link from "next/link";
import { useT } from "@/hooks/useT";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { SITE_EMAIL, SITE_URL } from "@/lib/site";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-sand-200 bg-brand-950 text-sand-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <BrandLogo variant="dark" size="lg" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-200">
            {t.footer.about}
          </p>
          <a
            href={SITE_URL}
            className="mt-3 inline-block text-sm text-brand-300 hover:text-white"
          >
            www.cargolf.net
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sand-300">
            {t.footer.links}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-100">
            <li>
              <Link href="/shop" className="hover:text-white">
                {t.nav.shop}
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white">
                {t.nav.cart}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sand-300">
            {t.footer.policies}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-100">
            <li>
              {t.footer.shippingPolicy} — {t.trust.freeShipping}
            </li>
            <li>
              {t.footer.returnPolicy} — {t.trust.returns}
            </li>
            <li>{t.trust.cod}</li>
            <li className="pt-2 text-brand-300">
              {t.footer.contact}:{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="hover:text-white">
                {SITE_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-800/80 py-5 text-center text-xs text-brand-300">
        © {year} {t.brand}. {t.footer.rights}. · www.cargolf.net
      </div>
    </footer>
  );
}
