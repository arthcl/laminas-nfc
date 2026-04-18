"use client";

import Image from "next/image";
import { PetType } from "@prisma/client";

interface PetData {
  petName: string;
  petType: PetType;
  ownerName: string;
  ownerContact: string;
  address?: string | null;
  medicalInfo?: string | null;
  photoUrl?: string | null;
}

const petConfig = {
  DOG: { emoji: "🐶", label: "Perro", gradient: "from-amber-400 to-orange-500" },
  CAT: { emoji: "🐱", label: "Gato", gradient: "from-sky-400 to-blue-500" },
  OTHER: { emoji: "🐾", label: "Mascota", gradient: "from-emerald-400 to-teal-500" },
};

export default function PetCard({ data }: { data: PetData }) {
  const cfg = petConfig[data.petType];

  return (
    <div className="min-h-svh bg-gray-50 flex items-start justify-center p-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl max-w-sm w-full overflow-hidden">
        {/* Header con gradiente */}
        <div className={`bg-gradient-to-br ${cfg.gradient} px-6 pt-10 pb-8 text-center`}>
          {data.photoUrl ? (
            <div className="inline-block rounded-full border-4 border-white shadow-lg overflow-hidden w-24 h-24 mx-auto">
              <Image src={data.photoUrl} alt={data.petName} width={96} height={96} className="object-cover w-full h-full" />
            </div>
          ) : (
            <div className="inline-flex w-24 h-24 rounded-full bg-white/20 items-center justify-center text-5xl border-4 border-white/40">
              {cfg.emoji}
            </div>
          )}
          <h1 className="text-2xl font-bold text-white mt-3">{data.petName}</h1>
          <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mt-1">
            {cfg.label}
          </span>
        </div>

        {/* Contenido */}
        <div className="px-6 pb-6 pt-4">
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs text-gray-500 font-medium">Dueño</span>
              <span className="text-sm font-semibold text-gray-900">{data.ownerName}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs text-gray-500 font-medium">Contacto</span>
              <a href={`tel:${data.ownerContact}`} className="text-sm font-semibold text-indigo-600 hover:underline">
                {data.ownerContact}
              </a>
            </div>
            {data.address && (
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-gray-500 font-medium">Dirección</span>
                <span className="text-sm font-semibold text-gray-900 text-right max-w-[60%]">{data.address}</span>
              </div>
            )}
          </div>

          {data.medicalInfo && (
            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <p className="text-xs font-semibold text-amber-700 mb-1.5">⚕️ Información médica</p>
              <p className="text-sm text-amber-900 leading-relaxed">{data.medicalInfo}</p>
            </div>
          )}

          <a
            href={`tel:${data.ownerContact}`}
            className={`mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r ${cfg.gradient} text-white font-semibold text-sm shadow-sm hover:opacity-90 transition`}
          >
            📞 Llamar al dueño
          </a>
        </div>
      </div>
    </div>
  );
}
