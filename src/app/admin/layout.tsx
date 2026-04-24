import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC] dark:bg-[#0A0A0F] transition-colors duration-300">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminMobileNav />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
