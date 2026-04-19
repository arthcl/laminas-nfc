"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  name: string;
  defaultUrl?: string | null;
  label?: string;
  shape?: "circle" | "square";
}

export default function ImageUpload({ name, defaultUrl, label = "Foto", shape = "circle" }: ImageUploadProps) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error ?? "Error al subir imagen");
    } else {
      setUrl(json.url);
    }
    setUploading(false);
  }

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-2xl";

  return (
    <div>
      <label className="label">{label}</label>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        <div className={`w-20 h-20 bg-gray-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center ${shapeClass}`}>
          {url ? (
            <Image src={url} alt="preview" width={80} height={80} className="object-cover w-full h-full" />
          ) : (
            <span className="text-2xl text-gray-300">📷</span>
          )}
        </div>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-secondary text-sm px-4 py-2"
          >
            {uploading ? "Subiendo..." : url ? "Cambiar imagen" : "Subir imagen"}
          </button>
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="block text-xs text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          )}
          <p className="text-xs text-gray-400">JPG, PNG, WEBP — máx. 5MB</p>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFile} />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
