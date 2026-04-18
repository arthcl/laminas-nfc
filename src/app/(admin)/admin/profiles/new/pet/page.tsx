import { prisma } from "@/lib/prisma";
import PetForm from "./PetForm";

export default async function NewPetPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Nueva mascota 🐾</h2>
        <p className="text-sm text-gray-500 mt-1">Completa los datos de la mascota y su dueño.</p>
      </div>
      <PetForm users={users} />
    </div>
  );
}
