"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PetType } from "@prisma/client";
import ImageUpload from "@/components/forms/ImageUpload";

interface PetData {
  petName: string; petType: PetType; ownerName: string; ownerContact: string;
  address?: string | null; medicalInfo?: string | null; photoUrl?: string | null;
}

export default function PetEditForm({ profileId, data }: { profileId: string; data: PetData }) {
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

    if (!res.ok) {
      setError("Error al guardar cambios");
      setLoading(false); return;
    }
    setSaved(true); setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Datos de la mascota</h2>
        <div className="grid grid-cols-2 gap-4">
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
        <ImageUpload name="photoUrl" label="Foto de la mascota" defaultUrl={data.photoUrl} shape="circle" />
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Datos del dueño</h2>
        <div>
          <label className="label">Nombre *</label>
          <input name="ownerName" required defaultValue={data.ownerName} className="input" />
        </div>
        <div>
          <label className="label">Contacto *</label>
          <input name="ownerContact" required defaultValue={data.ownerContact} className="input" />
        </div>
        <div>
          <label className="label">Dirección</label>
          <input name="address" defaultValue={data.address ?? ""} className="input" />
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Información médica</h2>
        <textarea name="medicalInfo" rows={4} defaultValue={data.medicalInfo ?? ""} className="input resize-none" />
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-2.5">{error}</div>}
      {saved && <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-2.5">✓ Cambios guardados correctamente</div>}

      <div className="flex gap-3">
        <Link href="/admin/profiles" className="btn-secondary flex-1 text-center">Cancelar</Link>
        <button type="submit" disabled={loading} className="btn-primary flex-1">{loading ? "Guardando..." : "Guardar cambios"}</button>
      </div>
    </form>
  );
}
