import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CopyUrlButton from "@/components/portal/CopyUrlButton";
import { ExternalLink, PenLine } from "lucide-react";

const typeConfig = {
  PET:          { emoji: "🐾", label: "Mascota",      gradient: "from-amber-400 to-orange-500",   iconBg: "bg-amber-50",   badge: "bg-amber-50 text-amber-700 border border-amber-100" },
  COMPANY:      { emoji: "🏢", label: "Empresa",      gradient: "from-indigo-500 to-violet-600",  iconBg: "bg-indigo-50",  badge: "bg-indigo-50 text-indigo-700 border border-indigo-100" },
  ENTREPRENEUR: { emoji: "🚀", label: "Emprendedor",  gradient: "from-purple-500 to-fuchsia-600", iconBg: "bg-purple-50",  badge: "bg-purple-50 text-purple-700 border border-purple-100" },
};

function getProfileDetail(p: any): string | null {
  if (p.type === "PET" && p.pet) {
    const petTypeLabel: Record<string, string> = { DOG: "Perro", CAT: "Gato", OTHER: "Otro" };
    return `${petTypeLabel[p.pet.petType] ?? p.pet.petType} · Dueño: ${p.pet.ownerName}`;
  }
  if (p.type === "COMPANY" && p.company) {
    return p.company.description ?? null;
  }
  if (p.type === "ENTREPRENEUR" && p.entrepreneur) {
    return p.entrepreneur.address ?? null;
  }
  return null;
}

export default async function PortalPage() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id;

  const profiles = await prisma.profile.findMany({
    where: { userId },
    include: { pet: true, company: true, entrepreneur: true },
    orderBy: { createdAt: "desc" },
  });

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://laminas.arturdev.cl";
  const firstName = session!.user?.name?.split(" ")[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Hola, {firstName} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {profiles.length === 0
            ? "Aún no tienes láminas asignadas."
            : `Tienes ${profiles.length} lámina${profiles.length !== 1 ? "s" : ""} NFC.`}
        </p>
      </div>

      {/* Sin perfiles */}
      {profiles.length === 0 && (
        <div className="card p-14 flex flex-col items-center text-center gap-4">
          <span className="text-5xl">📡</span>
          <div>
            <p className="font-semibold text-gray-900">Sin láminas asignadas</p>
            <p className="text-sm text-gray-500 mt-1 max-w-xs">
              Cuando el administrador te asigne una lámina NFC, aparecerá aquí.
            </p>
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
          const detail = getProfileDetail(p);
          const profileUrl = `${baseUrl}/p/${p.slug}`;

          return (
            <div key={p.id} className="card overflow-hidden">
              {/* Banda de color */}
              <div className={`h-1.5 bg-gradient-to-r ${cfg.gradient}`} />
              <div className="p-5 space-y-4">
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-2xl ${cfg.iconBg} flex items-center justify-center text-xl shrink-0`}>
                      {cfg.emoji}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{name}</p>
                      {detail && <p className="text-xs text-gray-400 truncate mt-0.5">{detail}</p>}
                      <span className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.badge}`}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                  <span className={`shrink-0 ${p.active ? "badge-green" : "badge-red"}`}>
                    {p.active ? "● Activa" : "● Inactiva"}
                  </span>
                </div>

                {/* URL */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono truncate flex-1 select-all">{profileUrl}</span>
                  <CopyUrlButton url={profileUrl} />
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <Link
                    href={`/p/${p.slug}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2.5 rounded-xl transition"
                  >
                    <ExternalLink size={14} />
                    Ver lámina
                  </Link>
                  <Link
                    href={`/portal/profiles/${p.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-700 py-2.5 rounded-xl transition"
                  >
                    <PenLine size={14} />
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
