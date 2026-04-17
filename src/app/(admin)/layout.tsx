import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if ((session.user as any).role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Panel Admin — NFC</h1>
        <div className="flex gap-4 text-sm">
          <a href="/admin/profiles" className="text-gray-600 hover:text-gray-900">
            Perfiles
          </a>
          <a href="/admin/users" className="text-gray-600 hover:text-gray-900">
            Usuarios
          </a>
          <a href="/admin/new" className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
            + Nuevo
          </a>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
