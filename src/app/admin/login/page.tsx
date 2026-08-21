"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useT } from "@/hooks/useT";
import { useStore } from "@/context/StoreContext";
import { Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const t = useT();
  const { locale } = useStore();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(
          locale === "ar"
            ? "اسم المستخدم أو كلمة المرور غير صحيحة"
            : "Invalid username or password"
        );
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError(
        locale === "ar" ? "تعذر تسجيل الدخول" : "Could not sign in"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-[1.5rem] border border-sand-200 bg-white p-7 shadow-[0_16px_50px_rgba(14,34,29,0.08)] sm:p-9">
        <div className="mb-8 text-center">
          <BrandLogo size="md" className="justify-center" />
          <h1 className="mt-5 font-display text-3xl font-semibold text-ink-900">
            {t.admin.loginTitle}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {t.admin.loginHint}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold text-ink-800">
              {t.admin.username}
            </span>
            <div className="relative">
              <User className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <input
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-sand-300 bg-white py-3 pe-3 ps-10 text-sm outline-none ring-brand-600/25 focus:ring-2"
              />
            </div>
          </label>

          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold text-ink-800">
              {t.admin.password}
            </span>
            <div className="relative">
              <Lock className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-sand-300 bg-white py-3 pe-3 ps-10 text-sm outline-none ring-brand-600/25 focus:ring-2"
              />
            </div>
          </label>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brand-700 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {loading ? t.common.loading : t.admin.login}
          </button>
        </form>
      </div>
    </div>
  );
}
