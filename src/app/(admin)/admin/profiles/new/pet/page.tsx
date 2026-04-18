import { prisma } from "@/lib/prisma";
import PetForm from "./PetForm";
import Link from "next/link";

export default async function NewPetPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/new" className="text-gray-400 hover:text-gray-700 transition text-sm">← Tipo de perfil</Link>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">🐾</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva mascota</h1>
          <p className="text-sm text-gray-500">Completa los datos para crear el perfil.</p>
        </div>
      </div>
      <PetForm users={users} />
    </div>
  );
}
