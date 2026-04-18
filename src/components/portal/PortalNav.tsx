"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function PortalNav({ userName }: { userName?: string | null }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link href="/portal" className="flex items-center gap-2">
          <span className="text-lg">📡</span>
          <span className="font-bold text-gray-900 text-sm">Mi portal NFC</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
              {userName?.charAt(0).toUpperCase() ?? "C"}
            </div>
            <span className="text-sm text-gray-600 hidden sm:block">{userName}</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs text-gray-400 hover:text-gray-700 transition"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
