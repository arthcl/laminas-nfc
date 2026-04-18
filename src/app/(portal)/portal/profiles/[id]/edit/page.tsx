import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PortalPetForm from "./PortalPetForm";
import PortalCompanyForm from "./PortalCompanyForm";
import PortalEntrepreneurForm from "./PortalEntrepreneurForm";

interface Props {
  params: Promise<{ id: string }>;
}

const typeConfig = {
  PET:          { emoji: "🐾", label: "Mascota",     gradient: "from-amber-400 to-orange-500",   iconBg: "bg-amber-100" },
  COMPANY:      { emoji: "🏢", label: "Empresa",     gradient: "from-indigo-500 to-violet-600",  iconBg: "bg-indigo-100" },
  ENTREPRENEUR: { emoji: "🚀", label: "Emprendedor", gradient: "from-purple-500 to-fuchsia-600", iconBg: "bg-purple-100" },
};

export default async function PortalEditPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as any).id;
  const { id } = await params;

  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { pet: true, company: true, entrepreneur: true },
  });

  if (!profile) notFound();
  if (profile.userId !== userId) redirect("/portal");

  const cfg = typeConfig[profile.type];

  return (
    <div className="space-y-5">
      <Link href="/portal" className="text-sm text-gray-400 hover:text-gray-700 transition">
        ← Mis láminas
      </Link>

      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-2xl ${cfg.iconBg} flex items-center justify-center text-2xl`}>
          {cfg.emoji}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Editar mi lámina</h1>
          <p className="text-xs text-gray-400">{cfg.label} · /{profile.slug}</p>
        </div>
      </div>

      {!profile.active && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl px-4 py-3">
          ⚠️ Esta lámina está inactiva. Contacta al administrador para activarla.
        </div>
      )}

      {profile.type === "PET" && profile.pet && (
        <PortalPetForm profileId={id} data={profile.pet} />
      )}
      {profile.type === "COMPANY" && profile.company && (
        <PortalCompanyForm profileId={id} data={profile.company} />
      )}
      {profile.type === "ENTREPRENEUR" && profile.entrepreneur && (
        <PortalEntrepreneurForm profileId={id} data={profile.entrepreneur} />
      )}
    </div>
  );
}
