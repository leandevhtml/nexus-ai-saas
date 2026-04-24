"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Hide navbar on auth, admin, and app pages
  if (pathname === "/login" || pathname === "/registro" || pathname.startsWith("/admin") || pathname.startsWith("/app")) return null;

  const navLinks = [
    { name: "Recursos", href: "/recursos" },
    { name: "Planos", href: "/precos" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-4 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" alt="NexusAI Logo" className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-105 transition-transform" />
          <span className="font-bold text-lg md:text-xl tracking-tight text-[var(--text)]">NexusAI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${
                pathname === link.href ? "text-[var(--primary-light)]" : "text-[var(--text-muted)]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth / Action Button (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {status === "loading" ? (
            <div className="w-24 h-8 bg-[var(--surface-hover)] animate-pulse rounded-lg" />
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-3 rounded-full bg-[var(--surface-hover)] border border-[var(--border-light)] hover:border-[var(--primary-light)] transition-all"
              >
                <span className="text-sm font-medium text-[var(--text-muted)]">{session.user?.name?.split(" ")[0]}</span>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--primary)] flex items-center justify-center border border-white/10">
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 glass rounded-2xl shadow-2xl border border-[var(--border-light)] py-2 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--border-light)] mb-1">
                    <p className="text-xs font-bold text-[var(--text)] truncate">{session.user?.name}</p>
                    <p className="text-[10px] text-[var(--text-dim)] truncate mt-0.5">{session.user?.email}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20">
                        Plano {(session.user as any)?.subscription?.plan || "Free"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/app"
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors"
                  >
                    <User size={16} /> Acessar Plataforma
                  </Link>
                  {(session.user as any)?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors"
                    >
                      <User size={16} /> Painel Admin
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <LogOut size={16} /> Sair da conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                Login
              </Link>
              <Link href="/#waitlist" className="btn-primary py-2 px-5 text-sm">
                Começar Grátis
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[var(--surface)] border-b border-[var(--border-light)] px-6 py-4 flex flex-col gap-4 shadow-2xl mt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium transition-colors hover:text-[var(--primary)] ${
                pathname === link.href ? "text-[var(--primary-light)]" : "text-[var(--text-muted)]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-[var(--border-light)] my-2" />
          
          {session ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-light)]">
                   <img src={session.user?.image || ""} alt="User" />
                </div>
                <div>
                  <p className="text-sm font-bold">{session.user?.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{session.user?.email}</p>
                </div>
              </div>
              <Link
                href="/app"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-[var(--text)] font-medium"
              >
                <User size={18} /> Acessar Plataforma
              </Link>
              {(session.user as any)?.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-[var(--text)] font-medium"
                >
                  <User size={18} /> Painel Admin
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-red-400 font-medium"
              >
                <LogOut size={18} /> Sair da conta
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-[var(--text)]">
                Login
              </Link>
              <Link href="/#waitlist" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full py-3 text-center mt-2">
                Começar Grátis
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
