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
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-4",
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border-light py-3" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-[110]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <img src="/logo.svg" alt="N" className="w-5 h-5 invert" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-text">NexusAI</span>
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-background/95 backdrop-blur-2xl lg:hidden flex flex-col p-8 pt-32"
          >
            {/* Background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full -z-10" />

            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-black text-text hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-6">
              <hr className="border-border-light" />
              {session ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-4 glass rounded-2xl">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                       <img src={session.user?.image || ""} alt="User" />
                    </div>
                    <div>
                      <p className="font-bold text-text">{session.user?.name}</p>
                      <p className="text-sm text-text-dim">{session.user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/app"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full py-4 text-center"
                  >
                    Acessar Plataforma
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-red-400 font-bold text-center py-2"
                  >
                    Sair da conta
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-center py-4 text-text-muted font-bold hover:text-text transition-colors"
                  >
                    Já tenho uma conta (Login)
                  </Link>
                  <Link 
                    href="/#waitlist" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="btn-primary w-full py-4 text-center text-lg shadow-2xl shadow-primary/40"
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
