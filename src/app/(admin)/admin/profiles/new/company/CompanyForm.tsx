"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserSelect from "@/components/forms/UserSelect";

interface User { id: string; name: string | null; email: string; }

export default function CompanyForm({ users }: { users: User[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value;

    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "COMPANY",
        userId: get("userId"),
        companyName: get("companyName"),
        description: get("description"),
        instagramUrl: get("instagramUrl"),
        websiteUrl: get("websiteUrl"),
        wpsUrl: get("wpsUrl"),
        salesContact: get("salesContact"),
        logoUrl: get("logoUrl"),
      }),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(json.error ?? "Error al crear perfil");
      setLoading(false);
      return;
    }

    router.push("/admin/profiles");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <UserSelect users={users} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa *</label>
        <input name="companyName" required className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea name="description" rows={3} className="input resize-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
        <input name="instagramUrl" type="url" placeholder="https://instagram.com/empresa" className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Página web</label>
        <input name="websiteUrl" type="url" placeholder="https://empresa.cl" className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Link WhatsApp</label>
        <input name="wpsUrl" type="url" placeholder="https://wa.me/56912345678" className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contacto de ventas *</label>
        <input name="salesContact" required placeholder="+56 9 1234 5678" className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL logo</label>
        <input name="logoUrl" type="url" placeholder="https://..." className="input" />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Creando..." : "Crear perfil"}</button>
      </div>
    </form>
  );
}
