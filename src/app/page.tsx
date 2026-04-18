import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session && (session.user as any).role === "ADMIN") redirect("/admin/dashboard");

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="px-8 py-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📡</span>
          <span className="font-bold text-gray-900 text-lg">Láminas NFC</span>
        </div>
        <Link
          href="/login"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
        >
          Ingresar →
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-8 py-20">
        <div className="space-y-4 max-w-xl">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Perfiles digitales con NFC
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Tu información,<br />a un toque.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Crea perfiles digitales para mascotas, empresas y emprendedores.
            Vincúlalos a una lámina NFC y comparte todo con solo acercar el teléfono.
          </p>
        </div>

        <Link
          href="/login"
          className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-700 transition"
        >
          Acceder al panel
        </Link>

        {/* Cards de tipos */}
        <div className="grid grid-cols-3 gap-4 mt-6 max-w-lg w-full">
          {[
            { emoji: "🐾", label: "Mascotas" },
            { emoji: "🏢", label: "Empresas" },
            { emoji: "🚀", label: "Emprendedores" },
          ].map((t) => (
            <div key={t.label} className="bg-gray-50 rounded-2xl p-4 text-center space-y-1">
              <span className="text-3xl">{t.emoji}</span>
              <p className="text-xs font-medium text-gray-600">{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
