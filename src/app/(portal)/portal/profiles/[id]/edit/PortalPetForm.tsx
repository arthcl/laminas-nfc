"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PetType } from "@prisma/client";

interface PetData {
  petName: string; petType: PetType; ownerName: string; ownerContact: string;
  address?: string | null; medicalInfo?: string | null; photoUrl?: string | null;
}

export default function PortalPetForm({ profileId, data }: { profileId: string; data: PetData }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError(""); setSaved(false);
    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value;

    const res = await fetch(`/api/profiles/${profileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        petName: get("petName"), petType: get("petType"),
        ownerName: get("ownerName"), ownerContact: get("ownerContact"),
        address: get("address"), medicalInfo: get("medicalInfo"), photoUrl: get("photoUrl"),
      }),
    });

    if (!res.ok) { setError("No se pudo guardar. Intenta nuevamente."); setLoading(false); return; }
    setSaved(true); setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="card p-5 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mascota</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Nombre *</label>
            <input name="petName" required defaultValue={data.petName} className="input" />
          </div>
          <div>
            <label className="label">Tipo *</label>
            <select name="petType" required defaultValue={data.petType} className="input">
              <option value="DOG">🐶 Perro</option>
              <option value="CAT">🐱 Gato</option>
              <option value="OTHER">🐾 Otro</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">URL foto</label>
          <input name="photoUrl" type="url" defaultValue={data.photoUrl ?? ""} placeholder="https://..." className="input" />
        </div>
      </div>

      <div className="card p-5 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mis datos</h2>
        <div>
          <label className="label">Mi nombre *</label>
          <input name="ownerName" required defaultValue={data.ownerName} className="input" />
        </div>
        <div>
          <label className="label">Mi contacto *</label>
          <input name="ownerContact" required defaultValue={data.ownerContact} className="input" />
        </div>
        <div>
          <label className="label">Dirección</label>
          <input name="address" defaultValue={data.address ?? ""} className="input" />
        </div>
      </div>

      <div className="card p-5 space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Info médica</h2>
        <textarea name="medicalInfo" rows={3} defaultValue={data.medicalInfo ?? ""} placeholder="Alergias, medicamentos, veterinario..." className="input resize-none" />
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">{error}</div>}
      {saved && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-2.5">✓ ¡Cambios guardados!</div>}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
