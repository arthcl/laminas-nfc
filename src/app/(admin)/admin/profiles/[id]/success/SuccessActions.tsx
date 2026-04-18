"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  profileUrl: string;
  profileId: string;
  slug: string;
}

export default function SuccessActions({ profileUrl, slug }: Props) {
  const [copied, setCopied] = useState(false);

  function copyUrl() {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* URL */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">URL del perfil NFC</p>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
          <span className="text-sm text-gray-700 truncate flex-1 font-mono">{profileUrl}</span>
          <button
            onClick={copyUrl}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
              copied
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {copied ? "✓ Copiado" : "Copiar"}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">Graba esta URL en la lámina NFC.</p>
      </div>

      {/* QR */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Código QR</p>
        <div className="flex items-center justify-center bg-white border border-gray-200 rounded-2xl p-5">
          <QRCodeSVG
            value={profileUrl}
            size={180}
            level="M"
            includeMargin={false}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">Slug: <span className="font-mono">/{slug}</span></p>
      </div>
    </div>
  );
}
