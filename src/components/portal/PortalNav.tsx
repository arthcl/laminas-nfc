"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, LogOut } from "lucide-react";

export default function PortalNav({ userName }: { userName?: string | null }) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/portal" className="flex items-center gap-2">
          <span className="text-lg">📡</span>
          <span className="font-bold text-gray-900 text-sm">Mi portal NFC</span>
        </Link>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2 mr-2">
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
              {userName?.charAt(0).toUpperCase() ?? "C"}
            </div>
            <span className="text-sm text-gray-600 hidden sm:block">{userName}</span>
          </div>
          <Link
            href="/portal/settings"
            title="Mi cuenta"
            className={`p-1.5 rounded-lg transition ${
              pathname === "/portal/settings"
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Settings size={16} />
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Cerrar sesión"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
