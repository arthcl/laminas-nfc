import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PetEditForm from "./PetEditForm";
import CompanyEditForm from "./CompanyEditForm";
import EntrepreneurEditForm from "./EntrepreneurEditForm";

interface Props {
  params: Promise<{ id: string }>;
}

const typeConfig = {
  PET: { emoji: "🐾", label: "Mascota", iconBg: "bg-amber-100" },
  COMPANY: { emoji: "🏢", label: "Empresa", iconBg: "bg-indigo-100" },
  ENTREPRENEUR: { emoji: "🚀", label: "Emprendedor", iconBg: "bg-purple-100" },
};

export default async function EditProfilePage({ params }: Props) {
  const { id } = await params;
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { pet: true, company: true, entrepreneur: true },
  });

  if (!profile) notFound();

  const cfg = typeConfig[profile.type];

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <Link href="/admin/profiles" className="text-gray-400 hover:text-gray-700 transition text-sm">
        ← Perfiles
      </Link>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-2xl ${cfg.iconBg} flex items-center justify-center text-2xl`}>
          {cfg.emoji}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar {cfg.label.toLowerCase()}</h1>
          <p className="text-sm text-gray-500">/{profile.slug}</p>
        </div>
      </div>

      {profile.type === "PET" && profile.pet && (
        <PetEditForm profileId={profile.id} data={profile.pet} />
      )}
      {profile.type === "COMPANY" && profile.company && (
        <CompanyEditForm profileId={profile.id} data={profile.company} />
      )}
      {profile.type === "ENTREPRENEUR" && profile.entrepreneur && (
        <EntrepreneurEditForm profileId={profile.id} data={profile.entrepreneur} />
      )}
    </div>
  );
}
