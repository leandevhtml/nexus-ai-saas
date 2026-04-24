"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  BarChart3,
  ShieldCheck,
  CreditCard,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Pagamentos", href: "/admin/payments", icon: CreditCard },
  { name: "Planos", href: "/admin/plans", icon: Target },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0A0F] hidden lg:flex flex-col h-screen sticky top-0 z-40 transition-all duration-300">
      <div className="p-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tighter dark:text-white uppercase">Nexus<span className="text-indigo-600">Admin</span></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">v1.2.4</span>
        </div>
      </div>

      <nav className="flex-1 px-6 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#11111E] hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-500")} />
              <span className="font-bold text-sm tracking-tight">{item.name}</span>
              {isActive && (
                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="bg-slate-50 dark:bg-[#11111E] p-4 rounded-[2rem] border border-slate-200 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">L</div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold truncate dark:text-white">Admin</span>
              <span className="text-[10px] text-slate-500 truncate">Sessão Ativa</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center justify-center gap-3 w-full px-4 py-3.5 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 bg-transparent hover:bg-red-50 dark:hover:bg-red-500/5 rounded-2xl transition-all duration-300 font-bold text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Encerrar Sessão</span>
        </button>
      </div>
    </aside>
  );
}
