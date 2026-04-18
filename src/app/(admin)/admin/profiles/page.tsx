import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Prisma } from "@prisma/client";

type ProfileWithDetails = Prisma.ProfileGetPayload<{
  include: { pet: true; company: true; entrepreneur: true; user: true };
}>;

export default async function ProfilesPage() {
  const profiles = await prisma.profile.findMany({
    include: { pet: true, company: true, entrepreneur: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Perfiles</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((p: ProfileWithDetails) => {
          const label =
            p.type === "PET"
              ? p.pet?.petName
              : p.type === "COMPANY"
              ? p.company?.companyName
              : p.entrepreneur?.name;

          return (
            <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {p.type}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    p.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.active ? "Activo" : "Inactivo"}
                </span>
              </div>
              <p className="font-semibold">{label}</p>
              <p className="text-xs text-gray-400">/{p.slug}</p>
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/p/${p.slug}`}
                  target="_blank"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Ver perfil
                </Link>
                <Link
                  href={`/admin/profiles/${p.id}/edit`}
                  className="text-xs text-gray-500 hover:underline"
                >
                  Editar
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
