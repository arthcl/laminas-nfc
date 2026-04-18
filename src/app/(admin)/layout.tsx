import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if ((session.user as any).role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userName={session.user?.name} />
      {/* Desktop offset */}
      <div className="lg:pl-60">
        {/* Mobile top/bottom bar offsets */}
        <div className="pt-14 pb-20 lg:pt-0 lg:pb-0">
          <main className="p-6 max-w-6xl">{children}</main>
        </div>
      </div>
    </div>
  );
}
