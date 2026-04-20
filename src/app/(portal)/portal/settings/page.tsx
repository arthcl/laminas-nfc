import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { KeyRound, User } from "lucide-react";
import ChangePasswordForm from "@/components/portal/ChangePasswordForm";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = session.user as any;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi cuenta</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gestiona tus datos y seguridad.</p>
      </div>

      {/* Profile info */}
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg shrink-0">
            {user.name?.charAt(0).toUpperCase() ?? "C"}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="ml-auto">
            <span className="badge-gray capitalize">{user.role === "ADMIN" ? "Admin" : "Cliente"}</span>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center gap-2.5 border-b border-gray-50 pb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <KeyRound size={16} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Cambiar contraseña</p>
            <p className="text-xs text-gray-400">Elige una contraseña segura que no uses en otros sitios.</p>
          </div>
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
