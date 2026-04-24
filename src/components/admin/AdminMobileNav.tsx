"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  Package,
  BarChart3,
  Menu,
  X,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Pagamentos", href: "/admin/payments", icon: CreditCard },
  { name: "Planos", href: "/admin/plans", icon: Package },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
];

export default function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      {/* Top Bar */}
      <div className="bg-[#0A0A0F] border-b border-slate-800 px-4 py-4 flex items-center justify-between sticky top-0 z-[120]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-lg tracking-tighter text-white uppercase">Nexus<span className="text-indigo-600">AI</span></span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Full-Screen Overlay Menu (Style matched to Image) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[110] bg-[#0A0A0F] pt-24 px-6 flex flex-col"
          >
            <nav className="space-y-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300",
                      isActive 
                        ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                    )}
                  >
                    <item.icon size={22} className={cn(isActive ? "text-white" : "text-slate-500")} />
                    <span className="font-bold text-lg">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pb-10">
               <Link 
                 href="/" 
                 className="flex items-center justify-center w-full py-4 text-slate-500 font-medium text-sm border border-slate-800 rounded-2xl hover:bg-slate-900 transition-all"
               >
                 Voltar para o Site
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
