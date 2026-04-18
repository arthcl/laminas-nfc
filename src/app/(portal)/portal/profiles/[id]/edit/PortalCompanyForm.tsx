"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CompanyData {
  companyName: string; description?: string | null; instagramUrl?: string | null;
  websiteUrl?: string | null; wpsUrl?: string | null; salesContact: string; logoUrl?: string | null;
}

export default function PortalCompanyForm({ profileId, data }: { profileId: string; data: CompanyData }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError(""); setSaved(false);
    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)?.value;

    const res = await fetch(`/api/profiles/${profileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: get("companyName"), description: get("description"),
        instagramUrl: get("instagramUrl"), websiteUrl: get("websiteUrl"),
        wpsUrl: get("wpsUrl"), salesContact: get("salesContact"), logoUrl: get("logoUrl"),
      }),
    });

    if (!res.ok) { setError("No se pudo guardar. Intenta nuevamente."); setLoading(false); return; }
    setSaved(true); setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="card p-5 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mi empresa</h2>
        <div>
          <label className="label">Nombre *</label>
          <input name="companyName" required defaultValue={data.companyName} className="input" />
        </div>
        <div>
          <label className="label">Descripción</label>
          <textarea name="description" rows={3} defaultValue={data.description ?? ""} className="input resize-none" />
        </div>
        <div>
          <label className="label">URL logo</label>
          <input name="logoUrl" type="url" defaultValue={data.logoUrl ?? ""} placeholder="https://..." className="input" />
        </div>
      </div>

      <div className="card p-5 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Redes y contacto</h2>
        <div>
          <label className="label">Instagram</label>
          <input name="instagramUrl" type="url" defaultValue={data.instagramUrl ?? ""} placeholder="https://instagram.com/empresa" className="input" />
        </div>
        <div>
          <label className="label">Página web</label>
          <input name="websiteUrl" type="url" defaultValue={data.websiteUrl ?? ""} placeholder="https://empresa.cl" className="input" />
        </div>
        <div>
          <label className="label">WhatsApp</label>
          <input name="wpsUrl" type="url" defaultValue={data.wpsUrl ?? ""} placeholder="https://wa.me/56912345678" className="input" />
        </div>
        <div>
          <label className="label">Contacto de ventas *</label>
          <input name="salesContact" required defaultValue={data.salesContact} className="input" />
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">{error}</div>}
      {saved && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-2.5">✓ ¡Cambios guardados!</div>}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
