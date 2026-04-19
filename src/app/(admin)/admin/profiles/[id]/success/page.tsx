import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SuccessActions from "./SuccessActions";

const typeConfig = {
  PET: { emoji: "🐾", label: "Mascota", gradient: "from-amber-400 to-orange-500" },
  COMPANY: { emoji: "🏢", label: "Empresa", gradient: "from-indigo-500 to-violet-600" },
  ENTREPRENEUR: { emoji: "🚀", label: "Emprendedor", gradient: "from-purple-500 to-fuchsia-600" },
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SuccessPage({ params }: Props) {
  const { id } = await params;
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { pet: true, company: true, entrepreneur: true },
  });

  if (!profile) notFound();

  const cfg = typeConfig[profile.type];
  const name =
    profile.type === "PET" ? profile.pet?.petName :
    profile.type === "COMPANY" ? profile.company?.companyName :
    profile.entrepreneur?.name;

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://nfc-laminas.vercel.app";
  const profileUrl = `${baseUrl}/p/${profile.slug}`;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Éxito */}
      <div className="card p-8 text-center space-y-3">
        <div className="inline-flex w-16 h-16 rounded-full bg-emerald-100 items-center justify-center text-3xl mx-auto">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-gray-900">¡Perfil creado!</h1>
        <p className="text-gray-500 text-sm">
          El perfil <span className="font-semibold text-gray-900">{name}</span> está listo para vincularse a una lámina NFC.
        </p>
      </div>

      {/* URL y QR */}
      <div className="card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center text-lg`}>
            {cfg.emoji}
          </div>
          <div>
            <p className="text-xs text-gray-500">{cfg.label}</p>
            <p className="text-sm font-semibold text-gray-900">{name}</p>
          </div>
        </div>

        <SuccessActions profileUrl={profileUrl} profileId={profile.id} slug={profile.slug} />
      </div>

      {/* Acciones */}
      <div className="flex gap-3">
        <Link href="/admin/profiles" className="btn-secondary flex-1 text-center">
          Ver todos los perfiles
        </Link>
        <Link href={`/admin/profiles/${profile.id}/edit`} className="btn-primary flex-1 text-center">
          Editar perfil
        </Link>
      </div>
    </div>
  );
}
