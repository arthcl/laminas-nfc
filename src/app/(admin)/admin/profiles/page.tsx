import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ToggleActive from "@/components/admin/ToggleActive";

const typeConfig = {
  PET: { label: "Mascota", emoji: "🐾", badge: "badge-gray" },
  COMPANY: { label: "Empresa", emoji: "🏢", badge: "badge-indigo" },
  ENTREPRENEUR: { label: "Emprendedor", emoji: "🚀", badge: "badge-gray" },
};

export default async function ProfilesPage() {
  const profiles = await prisma.profile.findMany({
    include: { pet: true, company: true, entrepreneur: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Perfiles</h1>
          <p className="text-sm text-gray-500 mt-0.5">{profiles.length} perfil{profiles.length !== 1 ? "es" : ""} registrado{profiles.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/new" className="btn-primary">
          <span>+</span> Nuevo perfil
        </Link>
      </div>

      {/* Empty state */}
      {profiles.length === 0 && (
        <div className="card p-16 flex flex-col items-center justify-center text-center gap-4">
          <span className="text-5xl">📡</span>
          <div>
            <p className="font-semibold text-gray-900">Sin perfiles aún</p>
            <p className="text-sm text-gray-500 mt-1">Crea tu primer perfil para vincularlo a una lámina NFC.</p>
          </div>
          <Link href="/admin/new" className="btn-primary mt-2">
            Crear primer perfil
          </Link>
        </div>
      )}

      {/* Grid */}
      {profiles.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {profiles.map((p) => {
            const cfg = typeConfig[p.type];
            const name =
              p.type === "PET" ? p.pet?.petName :
              p.type === "COMPANY" ? p.company?.companyName :
              p.entrepreneur?.name;
            const owner = p.user?.name ?? p.user?.email;

            return (
              <div key={p.id} className="card p-5 flex flex-col gap-4 hover:shadow-md transition">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl shrink-0">
                      {cfg.emoji}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{name}</p>
                      <p className="text-xs text-gray-400 truncate">/{p.slug}</p>
                    </div>
                  </div>
                  <span className={p.active ? "badge-green" : "badge-red"}>
                    {p.active ? "● Activo" : "● Inactivo"}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2">
                  <span className={cfg.badge}>{cfg.label}</span>
                  {owner && <span className="text-xs text-gray-400 truncate">— {owner}</span>}
                </div>

                {/* Actions */}
                <div className="flex gap-1 pt-1 border-t border-gray-50">
                  <Link
                    href={`/p/${p.slug}`}
                    target="_blank"
                    className="flex-1 text-center text-xs font-medium text-indigo-600 hover:text-indigo-800 py-1.5 rounded-lg hover:bg-indigo-50 transition"
                  >
                    Ver ↗
                  </Link>
                  <Link
                    href={`/admin/profiles/${p.id}/edit`}
                    className="flex-1 text-center text-xs font-medium text-gray-600 hover:text-gray-900 py-1.5 rounded-lg hover:bg-gray-50 transition"
                  >
                    Editar
                  </Link>
                  <ToggleActive profileId={p.id} active={p.active} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
