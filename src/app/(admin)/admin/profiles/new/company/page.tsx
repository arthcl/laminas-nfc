import { prisma } from "@/lib/prisma";
import CompanyForm from "./CompanyForm";
import Link from "next/link";

export default async function NewCompanyPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <Link href="/admin/new" className="text-gray-400 hover:text-gray-700 transition text-sm">← Tipo de perfil</Link>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">🏢</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva empresa</h1>
          <p className="text-sm text-gray-500">Completa los datos para crear el perfil.</p>
        </div>
      </div>
      <CompanyForm users={users} />
    </div>
  );
}
