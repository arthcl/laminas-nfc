"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewUserPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(typeof json.error === "string" ? json.error : "Error al crear usuario");
      setLoading(false);
      return;
    }

    router.push("/admin/users");
    router.refresh();
  }

  return (
    <div className="space-y-6 max-w-lg">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/users" className="text-gray-400 hover:text-gray-700 transition text-sm">← Usuarios</Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nuevo usuario</h1>
        <p className="text-sm text-gray-500 mt-0.5">Completa los datos para crear la cuenta.</p>
      </div>

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Nombre completo</label>
            <input name="name" type="text" required placeholder="Juan Pérez" className="input" />
          </div>

          <div>
            <label className="label">Email</label>
            <input name="email" type="email" required placeholder="juan@ejemplo.cl" className="input" />
          </div>

          <div>
            <label className="label">Contraseña</label>
            <input name="password" type="password" required minLength={8} placeholder="Mínimo 8 caracteres" className="input" />
          </div>

          <div>
            <label className="label">Rol</label>
            <select name="role" className="input">
              <option value="CLIENT">Cliente — acceso solo a su perfil</option>
              <option value="ADMIN">Admin — acceso completo al panel</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Link href="/admin/users" className="btn-secondary flex-1 text-center">Cancelar</Link>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? "Creando..." : "Crear usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
