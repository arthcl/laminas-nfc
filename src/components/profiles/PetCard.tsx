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

export default function PetCard({ data }: { data: PetData }) {
  const emoji = data.petType === "CAT" ? "🐱" : data.petType === "DOG" ? "🐶" : "🐾";

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
      {data.photoUrl && (
        <div className="flex justify-center">
          <Image
            src={data.photoUrl}
            alt={data.petName}
            width={120}
            height={120}
            className="rounded-full object-cover border-4 border-blue-200"
          />
        </div>
      )}
      <div className="text-center">
        <span className="text-4xl">{emoji}</span>
        <h1 className="text-2xl font-bold mt-1">{data.petName}</h1>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Dueño</span>
          <span className="font-medium">{data.ownerName}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Contacto</span>
          <a href={`tel:${data.ownerContact}`} className="font-medium text-blue-600">
            {data.ownerContact}
          </a>
        </div>
        {data.address && (
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Dirección</span>
            <span className="font-medium">{data.address}</span>
          </div>
        )}
        {data.medicalInfo && (
          <div className="pt-2">
            <p className="text-gray-500 text-xs mb-1">Información Médica</p>
            <p className="bg-yellow-50 rounded-lg p-3 text-sm">{data.medicalInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}
