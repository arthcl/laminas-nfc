import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-sm text-gray-500 mt-0.5">{users.length} usuario{users.length !== 1 ? "s" : ""} registrado{users.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/users/new" className="btn-primary">
          <span>+</span> Nuevo usuario
        </Link>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {users.length === 0 ? (
          <div className="p-16 flex flex-col items-center text-center gap-3">
            <span className="text-4xl">👤</span>
            <p className="font-semibold text-gray-900">Sin usuarios aún</p>
            <Link href="/admin/users/new" className="btn-primary mt-1">Crear usuario</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Rol</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Registrado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold shrink-0">
                        {u.name?.charAt(0).toUpperCase() ?? u.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{u.name}</p>
                        <p className="text-xs text-gray-400 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={u.role === "ADMIN" ? "badge-indigo" : "badge-gray"}>
                      {u.role === "ADMIN" ? "Admin" : "Cliente"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-xs hidden md:table-cell">
                    {new Date(u.createdAt).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
