import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const [profiles, users] = await Promise.all([
    prisma.profile.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { pet: true, company: true, entrepreneur: true } }),
    prisma.user.count(),
  ]);

  const total = await prisma.profile.count();
  const active = await prisma.profile.count({ where: { active: true } });
  const byType = await prisma.profile.groupBy({ by: ["type"], _count: true });

  const counts = Object.fromEntries(byType.map((b) => [b.type, b._count]));

  const stats = [
    { label: "Perfiles totales", value: total, icon: "◈", color: "bg-indigo-50 text-indigo-600" },
    { label: "Activos", value: active, icon: "●", color: "bg-emerald-50 text-emerald-600" },
    { label: "Usuarios", value: users, icon: "◉", color: "bg-purple-50 text-purple-600" },
    { label: "Inactivos", value: total - active, icon: "○", color: "bg-gray-50 text-gray-500" },
  ];

  const typeStats = [
    { type: "PET", label: "Mascotas", emoji: "🐾", count: counts["PET"] ?? 0, bg: "bg-amber-50", text: "text-amber-700" },
    { type: "COMPANY", label: "Empresas", emoji: "🏢", count: counts["COMPANY"] ?? 0, bg: "bg-indigo-50", text: "text-indigo-700" },
    { type: "ENTREPRENEUR", label: "Emprendedores", emoji: "🚀", count: counts["ENTREPRENEUR"] ?? 0, bg: "bg-purple-50", text: "text-purple-700" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Resumen de la plataforma.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl font-bold shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Por tipo */}
      <div className="grid grid-cols-3 gap-4">
        {typeStats.map((t) => (
          <div key={t.type} className={`rounded-2xl border border-gray-100 p-5 ${t.bg}`}>
            <span className="text-3xl">{t.emoji}</span>
            <p className={`text-2xl font-bold mt-2 ${t.text}`}>{t.count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.label}</p>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/new" className="card p-5 flex items-center gap-4 hover:shadow-md transition group">
          <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center text-xl shrink-0 group-hover:bg-indigo-600 transition">
            +
          </div>
          <div>
            <p className="font-semibold text-gray-900">Nuevo perfil</p>
            <p className="text-xs text-gray-400">Mascotas, empresas, emprendedores</p>
          </div>
        </Link>
        <Link href="/admin/users/new" className="card p-5 flex items-center gap-4 hover:shadow-md transition group">
          <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center text-xl shrink-0 group-hover:bg-purple-100 group-hover:text-purple-600 transition">
            ◉
          </div>
          <div>
            <p className="font-semibold text-gray-900">Nuevo usuario</p>
            <p className="text-xs text-gray-400">Admin o cliente</p>
          </div>
        </Link>
      </div>

      {/* Últimos perfiles */}
      {profiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Últimos perfiles</h2>
            <Link href="/admin/profiles" className="text-xs text-indigo-600 hover:underline">Ver todos →</Link>
          </div>
          <div className="card overflow-hidden divide-y divide-gray-50">
            {profiles.map((p) => {
              const name = p.type === "PET" ? p.pet?.petName : p.type === "COMPANY" ? p.company?.companyName : p.entrepreneur?.name;
              const emoji = p.type === "PET" ? "🐾" : p.type === "COMPANY" ? "🏢" : "🚀";
              return (
                <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{name}</p>
                      <p className="text-xs text-gray-400">/{p.slug}</p>
                    </div>
                  </div>
                  <span className={p.active ? "badge-green" : "badge-red"}>
                    {p.active ? "Activo" : "Inactivo"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
