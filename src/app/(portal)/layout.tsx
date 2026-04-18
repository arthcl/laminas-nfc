import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import PortalNav from "@/components/portal/PortalNav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if ((session.user as any).role === "ADMIN") redirect("/admin/dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalNav userName={session.user?.name} />
      <main className="max-w-2xl mx-auto px-4 pt-20 pb-10">
        {children}
      </main>
    </div>
  );
}
