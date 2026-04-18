import { prisma } from "@/lib/prisma";
import CompanyForm from "./CompanyForm";

export default async function NewCompanyPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Nueva empresa 🏢</h2>
        <p className="text-sm text-gray-500 mt-1">Completa los datos de la empresa.</p>
      </div>
      <CompanyForm users={users} />
    </div>
  );
}
