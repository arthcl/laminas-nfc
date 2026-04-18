import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session && (session.user as any).role === "ADMIN") {
    redirect("/admin/profiles");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Láminas NFC</h1>
        <p className="text-gray-500">Perfiles digitales para mascotas, empresas y emprendedores.</p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Ingresar al panel
        </a>
      </div>
    </main>
  );
}
