"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await signIn("credentials", { email, password, redirect: false });

    if (res?.error) {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
    } else {
      router.push("/admin/profiles");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="text-2xl">📡</span>
          <span className="font-bold text-lg">Láminas NFC</span>
        </Link>
        <div className="space-y-4">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Gestiona todos<br />tus perfiles NFC.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-sm">
            Crea, edita y administra perfiles digitales para mascotas, empresas y emprendedores desde un solo lugar.
          </p>
        </div>
        <div className="flex gap-4">
          {["🐾 Mascotas", "🏢 Empresas", "🚀 Emprendedores"].map((t) => (
            <span key={t} className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 bg-white">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo mobile */}
          <Link href="/" className="flex lg:hidden items-center gap-2 text-gray-900">
            <span className="text-2xl">📡</span>
            <span className="font-bold text-lg">Láminas NFC</span>
          </Link>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Bienvenido</h1>
            <p className="text-sm text-gray-500">Ingresa tus credenciales para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@ejemplo.cl"
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition disabled:opacity-50 mt-2"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
