import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const typeConfig = {
  PET:          { emoji: "🐾", label: "Mascota",      gradient: "from-amber-400 to-orange-500",   iconBg: "bg-amber-100" },
  COMPANY:      { emoji: "🏢", label: "Empresa",      gradient: "from-indigo-500 to-violet-600",  iconBg: "bg-indigo-100" },
  ENTREPRENEUR: { emoji: "🚀", label: "Emprendedor",  gradient: "from-purple-500 to-fuchsia-600", iconBg: "bg-purple-100" },
};

export default async function PortalPage() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id;

  const profiles = await prisma.profile.findMany({
    where: { userId },
    include: { pet: true, company: true, entrepreneur: true },
    orderBy: { createdAt: "desc" },
  });

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://nfc-laminas.vercel.app";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Hola, {session!.user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {profiles.length === 0
            ? "Aún no tienes láminas asignadas."
            : `Tienes ${profiles.length} lámina${profiles.length !== 1 ? "s" : ""} NFC activa${profiles.length !== 1 ? "s" : ""}.`}
        </p>
      </div>

      {/* Sin perfiles */}
      {profiles.length === 0 && (
        <div className="card p-14 flex flex-col items-center text-center gap-4">
          <span className="text-5xl">📡</span>
          <div>
            <p className="font-semibold text-gray-900">Sin láminas asignadas</p>
            <p className="text-sm text-gray-500 mt-1">Cuando el administrador te asigne una lámina NFC, aparecerá aquí.</p>
          </div>
        </div>
      )}

      {/* Lista de perfiles */}
      <div className="space-y-4">
        {profiles.map((p) => {
          const cfg = typeConfig[p.type];
          const name =
            p.type === "PET" ? p.pet?.petName :
            p.type === "COMPANY" ? p.company?.companyName :
            p.entrepreneur?.name;
          const profileUrl = `${baseUrl}/p/${p.slug}`;

          return (
            <div key={p.id} className="card overflow-hidden">
              {/* Banda de color */}
              <div className={`h-1.5 bg-gradient-to-r ${cfg.gradient}`} />
              <div className="p-5 space-y-4">
                {/* Top row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl ${cfg.iconBg} flex items-center justify-center text-xl shrink-0`}>
                      {cfg.emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{name}</p>
                      <p className="text-xs text-gray-400">{cfg.label}</p>
                    </div>
                  </div>
                  <span className={p.active ? "badge-green" : "badge-red"}>
                    {p.active ? "● Activa" : "● Inactiva"}
                  </span>
                </div>

                {/* URL */}
                <div className="bg-gray-50 rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono truncate flex-1">{profileUrl}</span>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <Link
                    href={`/p/${p.slug}`}
                    target="_blank"
                    className="flex-1 text-center text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-xl transition"
                  >
                    Ver lámina ↗
                  </Link>
                  <Link
                    href={`/portal/profiles/${p.id}/edit`}
                    className="flex-1 text-center text-sm font-semibold text-white bg-gray-900 hover:bg-gray-700 py-2 rounded-xl transition"
                  >
                    Editar datos
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
