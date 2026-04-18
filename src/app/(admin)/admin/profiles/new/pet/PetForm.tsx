"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserSelect from "@/components/forms/UserSelect";

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
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value;

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la mascota *</label>
          <input name="petName" required className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
          <select name="petType" required className="input">
            <option value="DOG">Perro 🐶</option>
            <option value="CAT">Gato 🐱</option>
            <option value="OTHER">Otro 🐾</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del dueño *</label>
        <input name="ownerName" required className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contacto del dueño *</label>
        <input name="ownerContact" required placeholder="+56 9 1234 5678" className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input name="address" className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Información médica</label>
        <textarea name="medicalInfo" rows={3} placeholder="Alergias, medicamentos, condiciones especiales..." className="input resize-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL foto de la mascota</label>
        <input name="photoUrl" type="url" placeholder="https://..." className="input" />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancelar</button>
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Creando..." : "Crear perfil"}</button>
      </div>
    </form>
  );
}
