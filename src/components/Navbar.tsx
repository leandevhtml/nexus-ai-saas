"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, User, ArrowRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on auth and admin pages
  if (pathname === "/login" || pathname === "/registro" || pathname.startsWith("/admin") || pathname.startsWith("/app")) return null;

  const navLinks = [
    { name: "Recursos", href: "/#features" },
    { name: "Planos", href: "/precos" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Contato", href: "/#contato" },
  ];

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          isScrolled || isMobileMenuOpen 
            ? "bg-white dark:bg-[#0A0A0F] border-b border-slate-200 dark:border-slate-800 py-3" 
            : "bg-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo - Estilo Admin */}
          <Link href="/" className="flex items-center gap-2 group relative z-[110]">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <img src="/logo.svg" alt="N" className="w-5 h-5 invert" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter dark:text-white uppercase leading-none">Nexus<span className="text-indigo-600">AI</span></span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 hidden sm:block">Inteligência Local</span>
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

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {status === "loading" ? (
              <div className="w-24 h-8 bg-surface-hover animate-pulse rounded-full" />
            ) : session ? (
              <div className="flex items-center gap-3 bg-surface-hover/50 p-1 pr-4 rounded-full border border-border-light">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-primary flex items-center justify-center border border-white/10">
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>
                <Link href="/app" className="text-sm font-bold hover:text-primary-light transition-colors">Dashboard</Link>
                <button onClick={() => signOut()} className="text-text-dim hover:text-red-400 transition-colors">
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
            className="lg:hidden relative z-[110] p-2 text-text-muted hover:text-text transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Estilo Admin */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[105] bg-white dark:bg-[#0A0A0F] lg:hidden flex flex-col p-6 pt-24"
          >
            <nav className="space-y-2">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all",
                    pathname === link.href 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                      : "text-slate-600 dark:text-slate-400 active:bg-slate-100 dark:active:bg-slate-900"
                  )}
                >
                  <span className="font-bold text-lg">{link.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4">
              <hr className="border-slate-100 dark:border-slate-800" />
              {session ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                       <img src={session.user?.image || ""} alt="User" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{session.user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/app"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20"
                  >
                    Acessar Plataforma
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-red-500 font-bold text-center py-2"
                  >
                    Sair da conta
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="flex items-center justify-center w-full py-4 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold rounded-2xl"
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
