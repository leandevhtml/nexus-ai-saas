import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Sparkles, 
  History, 
  Settings, 
  LogOut,
  ChevronRight,
  User,
  Globe,
  Database
} from "lucide-react";
import LogoutButton from "./LogoutButton"; // Componente client para logout

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex">
      {/* Sidebar Desktop */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:flex flex-col h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo.svg" alt="NexusAI Logo" className="w-8 h-8 group-hover:scale-105 transition-transform" />
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">NexusAI</span>
          </Link>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-1 overflow-y-auto">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header Mobile (Opcional, pode ser expandido depois) */}
        <div className="md:hidden h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="NexusAI Logo" className="w-8 h-8" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded">
              {planName}
            </span>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
