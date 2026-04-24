"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Users, 
  Target, 
  BarChart3, 
  Settings,
  CreditCard,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Pagamentos", href: "/admin/payments", icon: CreditCard },
  { name: "Planos", href: "/admin/plans", icon: Target },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
];

export default function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      {/* Top Bar */}
      <div className="bg-white dark:bg-[#0A0A0F] border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-lg tracking-tighter dark:text-white uppercase">Nexus<span className="text-indigo-600">AI</span></span>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-600 dark:text-slate-400"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-[#0A0A0F] pt-20 px-6 animate-in slide-in-from-top duration-300">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all",
                    isActive 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                      : "text-slate-600 dark:text-slate-400 active:bg-slate-100 dark:active:bg-slate-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-bold text-base">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
