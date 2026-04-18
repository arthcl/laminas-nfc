import { prisma } from "@/lib/prisma";
import EntrepreneurForm from "./EntrepreneurForm";

export default async function NewEntrepreneurPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Nuevo emprendedor 🚀</h2>
        <p className="text-sm text-gray-500 mt-1">Completa los datos del emprendedor.</p>
      </div>
      <EntrepreneurForm users={users} />
    </div>
  );
}
