import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Sparkles, 
  History, 
  Settings, 
  Database,
  Globe,
  User,
  Zap,
  TrendingUp,
  BookOpen,
  Star,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import BottomNav from "./BottomNav";

export const metadata = {
  title: "Painel | NexusAI",
  description: "Área de trabalho do NexusAI",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/app");
  }

  const navItems = [
    { name: "Visão Geral", href: "/app", icon: LayoutDashboard },
    { name: "Gerador de Textos", href: "/app/ia", icon: Sparkles },
    { name: "Treinar IA (Pro)", href: "/app/treinamento", icon: Database },
    { name: "Histórico", href: "/app/historico", icon: History },
    { name: "Configurações", href: "/app/configuracoes", icon: Settings },
  ];

  const planName = (session.user as any).subscription?.plan || "Free";
  const isPro = planName !== "Free";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex">
      {/* ===== SIDEBAR DESKTOP ===== */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:flex flex-col h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo.svg" alt="NexusAI Logo" className="w-8 h-8 group-hover:scale-105 transition-transform" />
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">NexusAI</span>
          </Link>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-1 overflow-y-auto">
          {/* Nav Links */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Quick Links */}
          <div className="mt-2 mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 mb-1">Recursos</p>
            <Link
              href="/docs"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Documentação
            </Link>
            <Link
              href="/changelog"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Star className="w-4 h-4" />
              Novidades
            </Link>
          </div>

          {/* Upgrade Banner (apenas Free) */}
          {!isPro && (
            <Link
              href="/precos"
              className="block mx-1 mb-2 rounded-xl overflow-hidden group"
            >
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 p-4 rounded-xl">
                {/* glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-transparent rounded-xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-white/90 uppercase tracking-wider">Upgrade Pro</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-3">
                    Desbloqueie IA personalizada, histórico ilimitado e muito mais.
                  </p>
                  <div className="flex items-center gap-1 text-xs font-bold text-white group-hover:gap-2 transition-all">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Ver planos
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Pro badge (apenas Pro) */}
          {isPro && (
            <div className="mx-1 mb-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Plano Pro Ativo</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Você tem acesso total a todos os recursos.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center border border-indigo-200 dark:border-indigo-800 overflow-hidden">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name || "Foto"} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Plano {planName}
              </p>
            </div>
          </div>
          
          <div className="space-y-1 mt-4 border-t border-slate-200 dark:border-slate-800 pt-4">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              Site Principal
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        {/* Header Mobile */}
        <div className="md:hidden h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="NexusAI Logo" className="w-8 h-8" />
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">NexusAI</span>
          </Link>
          <div className="flex items-center gap-2">
            {/* Plan badge */}
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
              isPro 
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" 
                : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
            }`}>
              {isPro ? "⚡" : "🆓"} {planName}
            </span>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-700 overflow-hidden">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name || "Foto"} className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {children}
        </div>

        {/* ===== BOTTOM NAV MOBILE ===== */}
        <BottomNav />
      </main>
    </div>
  );
}
