"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silently
    }
  }

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copiado" : "Copiar enlace"}
      className={`p-1.5 rounded-lg transition shrink-0 ${
        copied
          ? "text-emerald-600 bg-emerald-50"
          : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
      }`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
