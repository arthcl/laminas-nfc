"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Layers, Users, Plus, LogOut, Settings } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profiles", label: "Perfiles", icon: Layers },
  { href: "/admin/users", label: "Usuarios", icon: Users },
];

export default function Sidebar({ userName }: { userName?: string | null }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-slate-900 fixed left-0 top-0 z-30">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-800">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <span className="text-xl">📡</span>
            <span className="font-bold text-white text-base">Láminas NFC</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* New profile CTA */}
        <div className="px-3 pb-4">
          <Link
            href="/admin/new"
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-xl transition"
          >
            <Plus size={16} />
            Nuevo perfil
          </Link>
        </div>

        {/* User + logout */}
        <div className="px-4 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {userName?.charAt(0).toUpperCase() ?? "A"}
            </div>
            <span className="text-slate-300 text-xs truncate">{userName ?? "Admin"}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Link
              href="/admin/settings"
              title="Mi cuenta"
              className={`p-1.5 rounded-lg transition ${
                pathname === "/admin/settings"
                  ? "text-white bg-slate-700"
                  : "text-slate-500 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Settings size={14} />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition"
              title="Cerrar sesión"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-slate-900 px-4 py-3 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span>📡</span>
          <span className="font-bold text-white text-sm">Láminas NFC</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/admin/new" className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
            <Plus size={13} /> Nuevo
          </Link>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-slate-400">
            <LogOut size={15} />
          </button>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900 border-t border-slate-800 flex">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition ${
                active ? "text-indigo-400" : "text-slate-500"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
