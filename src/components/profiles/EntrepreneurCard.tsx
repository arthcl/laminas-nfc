"use client";

import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

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
    <div className="min-h-svh bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-sm w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 px-6 pt-10 pb-8 text-center">
          {data.photoUrl ? (
            <div className="inline-block rounded-full border-4 border-white/30 overflow-hidden w-24 h-24 mx-auto shadow-lg">
              <Image src={data.photoUrl} alt={data.name} width={96} height={96} className="object-cover w-full h-full" />
            </div>
          ) : (
            <div className="inline-flex w-24 h-24 rounded-full bg-white/20 items-center justify-center text-5xl border-4 border-white/30">
              🚀
            </div>
          )}
          <h1 className="text-2xl font-bold text-white mt-3">{data.name}</h1>
          <span className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mt-1">
            Emprendedor
          </span>
        </div>

        {/* Links */}
        <div className="px-6 pb-6 pt-4 space-y-3">
          {data.whatsappUrl && (
            <a
              href={data.whatsappUrl}
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

          {data.tiktokUrl && (
            <a
              href={data.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 bg-white border border-gray-100 shadow-sm rounded-2xl px-4 py-3.5 hover:bg-gray-50 transition"
            >
              <span className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center text-white text-base shrink-0">
                🎵
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">TikTok</p>
                <p className="text-xs text-gray-400">Ver videos</p>
              </div>
              <span className="ml-auto text-gray-300 text-sm">→</span>
            </a>
          )}

          {data.facebookUrl && (
            <a
              href={data.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 bg-white border border-gray-100 shadow-sm rounded-2xl px-4 py-3.5 hover:bg-blue-50 hover:border-blue-200 transition"
            >
              <span className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-base shrink-0">
                f
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">Facebook</p>
                <p className="text-xs text-gray-400">Ver página</p>
              </div>
              <span className="ml-auto text-gray-300 text-sm">→</span>
            </a>
          )}

          {data.address && (
            <div className="flex items-center gap-3.5 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5">
              <span className="w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center text-gray-600 shrink-0">
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-xs text-gray-500">Ubicación</p>
                <p className="text-sm font-medium text-gray-900">{data.address}</p>
              </div>
            </div>
          )}

          <a
            href={`tel:${data.salesContact}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold text-sm shadow-sm hover:opacity-90 transition mt-2"
          >
            📞 Contactar
          </a>
        </div>
      </div>
    </div>
  );
}
