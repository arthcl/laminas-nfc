"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserSelect from "@/components/forms/UserSelect";
import ImageUpload from "@/components/forms/ImageUpload";

interface User { id: string; name: string | null; email: string; }

export default function PetForm({ users }: { users: User[] }) {
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
        type: "PET",
        userId: get("userId"),
        petName: get("petName"),
        petType: get("petType"),
        ownerName: get("ownerName"),
        ownerContact: get("ownerContact"),
        address: get("address"),
        medicalInfo: get("medicalInfo"),
        photoUrl: get("photoUrl"),
      }),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(typeof json.error === "string" ? json.error : "Error al crear perfil");
      setLoading(false);
      return;
    }

    const profile = await res.json();
    router.push(`/admin/profiles/${profile.id}/success`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sección: asignación */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Asignación</h2>
        <UserSelect users={users} />
      </div>

      {/* Sección: mascota */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Datos de la mascota</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Nombre *</label>
            <input name="petName" required placeholder="Firulais" className="input" />
          </div>
          <div>
            <label className="label">Tipo *</label>
            <select name="petType" required className="input">
              <option value="DOG">🐶 Perro</option>
              <option value="CAT">🐱 Gato</option>
              <option value="OTHER">🐾 Otro</option>
            </select>
          </div>
        </div>
        <ImageUpload name="photoUrl" label="Foto de la mascota" shape="circle" />
      </div>

      {/* Sección: dueño */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Datos del dueño</h2>
        <div>
          <label className="label">Nombre del dueño *</label>
          <input name="ownerName" required placeholder="Juan Pérez" className="input" />
        </div>
        <div>
          <label className="label">Contacto *</label>
          <input name="ownerContact" required placeholder="+56 9 1234 5678" className="input" />
        </div>
        <div>
          <label className="label">Dirección</label>
          <input name="address" placeholder="Av. Ejemplo 123, Santiago" className="input" />
        </div>
      </div>

      {/* Sección: médica */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Información médica</h2>
        <div>
          <label className="label">Notas médicas</label>
          <textarea
            name="medicalInfo"
            rows={4}
            placeholder="Alergias, medicamentos, condiciones especiales, veterinario..."
            className="input resize-none"
          />
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
