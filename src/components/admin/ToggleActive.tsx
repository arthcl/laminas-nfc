"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ToggleActive({ profileId, active }: { profileId: string; active: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(active);

  async function toggle() {
    setLoading(true);
    const res = await fetch(`/api/profiles/${profileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !current }),
    });
    if (res.ok) {
      setCurrent(!current);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={current ? "Desactivar perfil" : "Activar perfil"}
      className={`flex-1 text-center text-xs font-medium py-1.5 rounded-lg transition ${
        current
          ? "text-red-500 hover:bg-red-50 hover:text-red-700"
          : "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-800"
      }`}
    >
      {loading ? "..." : current ? "Desactivar" : "Activar"}
    </button>
  );
}
