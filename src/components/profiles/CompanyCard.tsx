"use client";

import Image from "next/image";
import { Globe, Phone } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

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
    <div className="min-h-svh bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-sm w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 px-6 pt-10 pb-14 text-center">
          {data.logoUrl ? (
            <div className="inline-block rounded-2xl border-4 border-white/30 overflow-hidden w-20 h-20 mx-auto shadow-lg">
              <Image src={data.logoUrl} alt={data.companyName} width={80} height={80} className="object-cover w-full h-full" />
            </div>
          ) : (
            <div className="inline-flex w-20 h-20 rounded-2xl bg-white/20 items-center justify-center text-4xl border-4 border-white/30">
              🏢
            </div>
          )}
          <h1 className="text-2xl font-bold text-white mt-3">{data.companyName}</h1>
          {data.description && (
            <p className="text-white/80 text-sm mt-1 leading-relaxed">{data.description}</p>
          )}
        </div>

        {/* Links */}
        <div className="px-6 pb-6 -mt-6 space-y-3">
          {data.instagramUrl && (
            <a
              href={data.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 bg-white border border-gray-100 shadow-sm rounded-2xl px-4 py-3.5 hover:bg-pink-50 hover:border-pink-200 transition"
            >
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shrink-0">
                <InstagramIcon />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">Instagram</p>
                <p className="text-xs text-gray-400">Ver perfil</p>
              </div>
              <span className="ml-auto text-gray-300 text-sm">→</span>
            </a>
          )}

          {data.websiteUrl && (
            <a
              href={data.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 bg-white border border-gray-100 shadow-sm rounded-2xl px-4 py-3.5 hover:bg-blue-50 hover:border-blue-200 transition"
            >
              <span className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                <Globe size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">Página web</p>
                <p className="text-xs text-gray-400">Visitar sitio</p>
              </div>
              <span className="ml-auto text-gray-300 text-sm">→</span>
            </a>
          )}

          {data.wpsUrl && (
            <a
              href={data.wpsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 bg-white border border-gray-100 shadow-sm rounded-2xl px-4 py-3.5 hover:bg-green-50 hover:border-green-200 transition"
            >
              <span className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <Phone size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                <p className="text-xs text-gray-400">Escribir ahora</p>
              </div>
              <span className="ml-auto text-gray-300 text-sm">→</span>
            </a>
          )}

          <a
            href={`tel:${data.salesContact}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm shadow-sm hover:opacity-90 transition mt-2"
          >
            📞 Contacto de ventas
          </a>
        </div>
      </div>
    </div>
  );
}
