"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EntrepreneurData {
  name: string; whatsappUrl?: string | null; instagramUrl?: string | null;
  tiktokUrl?: string | null; facebookUrl?: string | null;
  salesContact: string; address?: string | null; photoUrl?: string | null;
}

export default function PortalEntrepreneurForm({ profileId, data }: { profileId: string; data: EntrepreneurData }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError(""); setSaved(false);
    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement)?.value;

    const res = await fetch(`/api/profiles/${profileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: get("name"), whatsappUrl: get("whatsappUrl"), instagramUrl: get("instagramUrl"),
        tiktokUrl: get("tiktokUrl"), facebookUrl: get("facebookUrl"),
        salesContact: get("salesContact"), address: get("address"), photoUrl: get("photoUrl"),
      }),
    });

    if (!res.ok) { setError("No se pudo guardar. Intenta nuevamente."); setLoading(false); return; }
    setSaved(true); setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="card p-5 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mi información</h2>
        <div>
          <label className="label">Nombre *</label>
          <input name="name" required defaultValue={data.name} className="input" />
        </div>
        <div>
          <label className="label">Foto de perfil (URL)</label>
          <input name="photoUrl" type="url" defaultValue={data.photoUrl ?? ""} placeholder="https://..." className="input" />
        </div>
        <div>
          <label className="label">Dirección</label>
          <input name="address" defaultValue={data.address ?? ""} className="input" />
        </div>
      </div>

      <div className="card p-5 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Redes y contacto</h2>
        <div>
          <label className="label">WhatsApp</label>
          <input name="whatsappUrl" type="url" defaultValue={data.whatsappUrl ?? ""} placeholder="https://wa.me/56912345678" className="input" />
        </div>
        <div>
          <label className="label">Instagram</label>
          <input name="instagramUrl" type="url" defaultValue={data.instagramUrl ?? ""} placeholder="https://instagram.com/usuario" className="input" />
        </div>
        <div>
          <label className="label">TikTok</label>
          <input name="tiktokUrl" type="url" defaultValue={data.tiktokUrl ?? ""} placeholder="https://tiktok.com/@usuario" className="input" />
        </div>
        <div>
          <label className="label">Facebook</label>
          <input name="facebookUrl" type="url" defaultValue={data.facebookUrl ?? ""} placeholder="https://facebook.com/usuario" className="input" />
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
