"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  LogOut, 
  User, 
  ShieldCheck, 
  LayoutDashboard, 
  Package, 
  Info, 
  Mail,
  ChevronRight
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/login" || pathname === "/registro" || pathname.startsWith("/admin") || pathname.startsWith("/app")) return null;

  const navLinks = [
    { name: "Dashboard", href: "/#hero", icon: LayoutDashboard },
    { name: "Planos", href: "/precos", icon: Package },
    { name: "Sobre", href: "/#sobre", icon: Info },
    { name: "Contato", href: "/#contato", icon: Mail },
  ];

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          isScrolled || isMobileMenuOpen 
            ? "bg-white dark:bg-[#0A0A0F] border-b border-slate-200 dark:border-slate-800 py-3 lg:bg-background/80 lg:backdrop-blur-xl lg:border-border-light" 
            : "bg-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Adaptável */}
          <Link href="/" className="flex items-center gap-2 group relative z-[110]">
            <div className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105",
              "bg-indigo-600 shadow-indigo-600/20 lg:bg-gradient-to-br lg:from-primary lg:to-secondary lg:shadow-primary/20"
            )}>
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter dark:text-white uppercase leading-none">
                Nexus<span className="text-indigo-600 lg:text-primary-light">AI</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 hidden lg:block">
                Inteligência Local
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 bg-surface-hover/30 backdrop-blur-md p-1 rounded-full border border-border-light">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium px-4 py-2 rounded-full transition-all hover:text-white",
                  pathname === link.href ? "bg-primary/10 text-primary-light" : "text-text-muted hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {status === "loading" ? (
              <div className="w-24 h-8 bg-surface-hover animate-pulse rounded-full" />
            ) : session ? (
              <div className="flex items-center gap-3 bg-surface-hover/50 p-1 pr-4 rounded-full border border-border-light">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center border border-white/10">
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>
                <Link href="/app" className="text-sm font-bold hover:text-primary-light transition-colors">Dashboard</Link>
                {(session.user as any)?.role === "admin" && (
                   <Link href="/admin" className="text-xs font-black uppercase text-indigo-400 hover:text-indigo-300">Admin</Link>
                )}
                <button onClick={() => signOut()} className="text-text-dim hover:text-red-400 transition-colors ml-2">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/login" className="text-sm font-bold text-text-muted hover:text-text transition-colors">Login</Link>
                <Link href="/#waitlist" className="btn-primary py-2.5 px-6 text-sm shadow-xl shadow-primary/20">
                  Começar Grátis
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-[110] p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Style matched to Reference Image */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[105] bg-[#0A0A0F] lg:hidden flex flex-col p-6 pt-24"
          >
            <nav className="space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300",
                      isActive 
                        ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]" 
                        : "text-slate-400 active:bg-slate-900/50"
                    )}
                  >
                    <link.icon size={22} className={isActive ? "text-white" : "text-slate-500"} />
                    <span className="font-bold text-lg">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-4 pb-10">
              <hr className="border-slate-800" />
              {session ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center">
                       {session.user?.image ? <img src={session.user.image} alt="U" /> : <User size={20} className="text-white" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{session.user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                    </div>
                  </div>

                  {/* Restaurado: Opção de Ir para Admin se for admin */}
                  {(session.user as any)?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between w-full p-5 bg-indigo-600/10 border border-indigo-600/30 text-indigo-400 font-bold rounded-2xl group"
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck size={20} />
                        Painel Admin
                      </div>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}

                  <Link
                    href="/app"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20"
                  >
                    Acessar Plataforma
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-red-500 font-bold text-center py-2 text-sm"
                  >
                    Sair da conta
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="flex items-center justify-center w-full py-4 bg-slate-900 text-slate-300 font-bold rounded-2xl border border-slate-800"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/#waitlist" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="flex items-center justify-center w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20"
                  >
                    Começar Grátis
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
