import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Layers, CheckCircle, XCircle, Users, Plus, UserPlus, ArrowRight, TrendingUp } from "lucide-react";

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Ahora mismo";
  if (mins < 60) return `Hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

export default async function DashboardPage() {
  const [recentProfiles, users, total, active, byType, usersWithProfiles] = await Promise.all([
    prisma.profile.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { pet: true, company: true, entrepreneur: true, user: { select: { name: true } } },
    }),
    prisma.user.count(),
    prisma.profile.count(),
    prisma.profile.count({ where: { active: true } }),
    prisma.profile.groupBy({ by: ["type"], _count: true }),
    prisma.user.count({ where: { profiles: { some: {} } } }),
  ]);

  const inactive = total - active;
  const activeRate = total > 0 ? Math.round((active / total) * 100) : 0;
  const counts = Object.fromEntries(byType.map((b) => [b.type, b._count]));

  const stats = [
    {
      label: "Perfiles totales",
      value: total,
      sub: `${activeRate}% activos`,
      Icon: Layers,
      color: "bg-indigo-50 text-indigo-600",
      href: "/admin/profiles",
    },
    {
      label: "Activos",
      value: active,
      sub: inactive > 0 ? `${inactive} inactivo${inactive !== 1 ? "s" : ""}` : "Todos activos",
      Icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-600",
      href: "/admin/profiles",
    },
    {
      label: "Usuarios",
      value: users,
      sub: `${usersWithProfiles} con láminas`,
      Icon: Users,
      color: "bg-purple-50 text-purple-600",
      href: "/admin/users",
    },
    {
      label: "Inactivos",
      value: inactive,
      sub: inactive === 0 ? "Sin láminas inactivas" : "Requieren atención",
      Icon: XCircle,
      color: inactive > 0 ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400",
      href: "/admin/profiles",
    },
  ];

  const typeStats = [
    { type: "PET", label: "Mascotas", emoji: "🐾", count: counts["PET"] ?? 0, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100" },
    { type: "COMPANY", label: "Empresas", emoji: "🏢", count: counts["COMPANY"] ?? 0, bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100" },
    { type: "ENTREPRENEUR", label: "Emprendedores", emoji: "🚀", count: counts["ENTREPRENEUR"] ?? 0, bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {total === 0
              ? "Bienvenido — comienza creando tu primer perfil."
              : `${total} perfil${total !== 1 ? "es" : ""} en la plataforma.`}
          </p>
        </div>
        {total > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full font-medium">
            <TrendingUp size={12} />
            {activeRate}% activos
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 flex items-center gap-4 hover:shadow-md transition group">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shrink-0`}>
              <s.Icon size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 font-medium leading-tight">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{s.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Por tipo */}
      <div className="grid grid-cols-3 gap-4">
        {typeStats.map((t) => (
          <Link
            key={t.type}
            href={`/admin/profiles`}
            className={`rounded-2xl border ${t.border} p-5 ${t.bg} hover:shadow-sm transition`}
          >
            <span className="text-3xl">{t.emoji}</span>
            <p className={`text-2xl font-bold mt-2 ${t.text}`}>{t.count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{t.label}</p>
            {total > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {t.count > 0 ? `${Math.round((t.count / total) * 100)}% del total` : "Sin registros"}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/new" className="card p-5 flex items-center gap-4 hover:shadow-md transition group">
          <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition">
            <Plus size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Nuevo perfil</p>
            <p className="text-xs text-gray-400">Mascotas, empresas, emprendedores</p>
          </div>
        </Link>
        <Link href="/admin/users/new" className="card p-5 flex items-center gap-4 hover:shadow-md transition group">
          <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 group-hover:bg-purple-100 group-hover:text-purple-600 transition">
            <UserPlus size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Nuevo usuario</p>
            <p className="text-xs text-gray-400">Admin o cliente</p>
          </div>
        </Link>
      </div>

      {/* Últimos perfiles */}
      {recentProfiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Actividad reciente</h2>
            <Link href="/admin/profiles" className="flex items-center gap-1 text-xs text-indigo-600 hover:underline">
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <div className="card overflow-hidden divide-y divide-gray-50">
            {recentProfiles.map((p) => {
              const name =
                p.type === "PET" ? p.pet?.petName :
                p.type === "COMPANY" ? p.company?.companyName :
                p.entrepreneur?.name;
              const emoji = p.type === "PET" ? "🐾" : p.type === "COMPANY" ? "🏢" : "🚀";
              const typeLabel = p.type === "PET" ? "Mascota" : p.type === "COMPANY" ? "Empresa" : "Emprendedor";

              return (
                <div key={p.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition group">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-base shrink-0">{emoji}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                      <p className="text-xs text-gray-400 truncate">
                        {typeLabel} · {p.user?.name ?? "Sin asignar"} · {timeAgo(p.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className={p.active ? "badge-green" : "badge-red"}>
                      {p.active ? "Activo" : "Inactivo"}
                    </span>
                    <Link
                      href={`/admin/profiles/${p.id}/edit`}
                      className="text-xs text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
