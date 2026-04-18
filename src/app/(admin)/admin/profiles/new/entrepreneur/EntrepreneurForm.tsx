"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserSelect from "@/components/forms/UserSelect";

interface User { id: string; name: string | null; email: string; }

export default function EntrepreneurForm({ users }: { users: User[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value;

    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "ENTREPRENEUR",
        userId: get("userId"),
        name: get("name"),
        whatsappUrl: get("whatsappUrl"),
        instagramUrl: get("instagramUrl"),
        tiktokUrl: get("tiktokUrl"),
        facebookUrl: get("facebookUrl"),
        salesContact: get("salesContact"),
        address: get("address"),
        photoUrl: get("photoUrl"),
      }),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(typeof json.error === "string" ? json.error : "Error al crear perfil");
      setLoading(false);
      return;
    }

    router.push("/admin/profiles");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Asignación</h2>
        <UserSelect users={users} />
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Identidad</h2>
        <div>
          <label className="label">Nombre *</label>
          <input name="name" required placeholder="María González" className="input" />
        </div>
        <div>
          <label className="label">URL foto de perfil</label>
          <input name="photoUrl" type="url" placeholder="https://..." className="input" />
        </div>
        <div>
          <label className="label">Dirección física</label>
          <input name="address" placeholder="Av. Ejemplo 123, Santiago" className="input" />
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Redes y contacto</h2>
        <div>
          <label className="label">WhatsApp</label>
          <input name="whatsappUrl" type="url" placeholder="https://wa.me/56912345678" className="input" />
        </div>
        <div>
          <label className="label">Instagram</label>
          <input name="instagramUrl" type="url" placeholder="https://instagram.com/usuario" className="input" />
        </div>
        <div>
          <label className="label">TikTok</label>
          <input name="tiktokUrl" type="url" placeholder="https://tiktok.com/@usuario" className="input" />
        </div>
        <div>
          <label className="label">Facebook</label>
          <input name="facebookUrl" type="url" placeholder="https://facebook.com/usuario" className="input" />
        </div>
        <div>
          <label className="label">Contacto de ventas *</label>
          <input name="salesContact" required placeholder="+56 9 1234 5678" className="input" />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Link href="/admin/new" className="btn-secondary flex-1 text-center">Cancelar</Link>
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? "Creando..." : "Crear perfil"}
        </button>
      </div>
    </form>
  );
}
