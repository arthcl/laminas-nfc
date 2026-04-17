"use client";

import Image from "next/image";
import { Globe, Instagram, Phone } from "lucide-react";

interface CompanyData {
  companyName: string;
  description?: string | null;
  instagramUrl?: string | null;
  websiteUrl?: string | null;
  wpsUrl?: string | null;
  salesContact: string;
  logoUrl?: string | null;
}

export default function CompanyCard({ data }: { data: CompanyData }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 space-y-4">
      {data.logoUrl && (
        <div className="flex justify-center">
          <Image
            src={data.logoUrl}
            alt={data.companyName}
            width={100}
            height={100}
            className="rounded-xl object-cover"
          />
        </div>
      )}
      <div className="text-center">
        <h1 className="text-2xl font-bold">{data.companyName}</h1>
        {data.description && (
          <p className="text-gray-500 text-sm mt-1">{data.description}</p>
        )}
      </div>
      <div className="space-y-3">
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
        {data.websiteUrl && (
          <a
            href={data.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
          >
            <Globe className="text-blue-500" size={20} />
            <span className="text-sm font-medium">Página Web</span>
          </a>
        )}
        {data.wpsUrl && (
          <a
            href={data.wpsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition"
          >
            <Phone className="text-green-500" size={20} />
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
        )}
        <a
          href={`tel:${data.salesContact}`}
          className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-700 transition"
        >
          Contacto de Ventas
        </a>
      </div>
    </div>
  );
}
