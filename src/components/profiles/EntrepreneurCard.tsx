"use client";

import Image from "next/image";
import { Instagram, Phone, MapPin } from "lucide-react";

interface EntrepreneurData {
  name: string;
  whatsappUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  facebookUrl?: string | null;
  salesContact: string;
  address?: string | null;
  photoUrl?: string | null;
}

export default function EntrepreneurCard({ data }: { data: EntrepreneurData }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
      {data.photoUrl && (
        <div className="flex justify-center">
          <Image
            src={data.photoUrl}
            alt={data.name}
            width={100}
            height={100}
            className="rounded-full object-cover border-4 border-purple-200"
          />
        </div>
      )}
      <div className="text-center">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-purple-500 text-sm font-medium">Emprendedor</p>
      </div>
      <div className="space-y-3">
        {data.whatsappUrl && (
          <a
            href={data.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition"
          >
            <Phone className="text-green-500" size={20} />
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
        )}
        {data.instagramUrl && (
          <a
            href={data.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition"
          >
            <Instagram className="text-pink-500" size={20} />
            <span className="text-sm font-medium">Instagram</span>
          </a>
        )}
        {data.tiktokUrl && (
          <a
            href={data.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
          >
            <span className="text-sm font-medium">🎵 TikTok</span>
          </a>
        )}
        {data.facebookUrl && (
          <a
            href={data.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
          >
            <span className="text-sm font-medium">📘 Facebook</span>
          </a>
        )}
        {data.address && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <MapPin className="text-gray-400" size={20} />
            <span className="text-sm">{data.address}</span>
          </div>
        )}
        <a
          href={`tel:${data.salesContact}`}
          className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-700 transition"
        >
          Contactar
        </a>
      </div>
    </div>
  );
}
