import { auth } from "@/auth";
import { 
  Sparkles, Zap, Database, ArrowRight, 
  TrendingUp, Clock, Star, Shield,
  ChevronRight, BookOpen, History as HistoryIcon,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import History from "@/models/History";
import mongoose from "mongoose";

export default async function AppPage() {
  const session = await auth();
  const userName = session?.user?.name?.split(" ")[0] || "Usuário";
  const planName = (session?.user as any)?.subscription?.plan || "Free";
  const isPro = planName !== "Free";

  let totalGeractions = 0;
  let todayGenerations = 0;
  let recentActivity: any[] = [];
  
  if (session?.user?.id) {
    try {
      await dbConnect();
      const userId = new mongoose.Types.ObjectId(session.user.id);
      
      // Get total generations
      totalGeractions = await History.countDocuments({ userId });
      
      // Get today's generations
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      todayGenerations = await History.countDocuments({
        userId,
        createdAt: { $gte: startOfDay }
      });
      
      // Get recent activity
      recentActivity = await History.find({ userId })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();
    } catch (e) {
      console.error("Failed to fetch user stats", e);
    }
  }

  // Stats cards data
  const stats = [
    {
      label: "Gerações Hoje",
      value: todayGenerations.toString(),
      icon: Sparkles,
      color: "indigo",
      gradient: "from-indigo-500 to-purple-600",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      trend: "atualizado agora",
    },
    {
      label: "Total de Uso",
      value: totalGeractions.toString(),
      icon: TrendingUp,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      trend: "gerações totais",
    },
    {
      label: "Modelos Treinados",
      value: isPro ? "0" : "—",
      icon: Database,
      color: "blue",
      gradient: "from-blue-500 to-cyan-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      trend: isPro ? "disponível" : "Pro",
    },
    {
      label: "Plano Ativo",
      value: planName,
      icon: Shield,
      color: "violet",
      gradient: "from-violet-500 to-fuchsia-600",
      bg: "bg-violet-50 dark:bg-violet-900/20",
      iconColor: "text-violet-600 dark:text-violet-400",
      trend: isPro ? "✓ Ativo" : "Free tier",
    },
  ];

  // Tools
  const tools = [
    {
      href: "/app/ia",
      icon: Sparkles,
      title: "Gerador Nexus (IA)",
      description: "Crie textos, automações e códigos usando nosso motor avançado.",
      color: "indigo",
      gradient: "from-indigo-500 to-purple-600",
      iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      hoverBorder: "hover:border-indigo-500/50",
      linkColor: "text-indigo-600 dark:text-indigo-400",
      locked: false,
    },
    {
      href: isPro ? "/app/treinamento" : "/precos",
      icon: Database,
      title: "Treinar IA Personalizada",
      description: "Faça upload dos seus dados e treine um modelo exclusivo.",
      color: "emerald",
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      hoverBorder: "hover:border-emerald-500/50",
      linkColor: "text-emerald-600 dark:text-emerald-400",
      locked: !isPro,
    },
    {
      href: "/app/historico",
      icon: HistoryIcon,
      title: "Histórico de Gerações",
      description: "Veja e reutilize todos os seus conteúdos gerados anteriormente.",
      color: "blue",
      gradient: "from-blue-500 to-cyan-600",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      hoverBorder: "hover:border-blue-500/50",
      linkColor: "text-blue-600 dark:text-blue-400",
      locked: false,
    },
  ];

  // Quick links
  const quickLinks = [
    { href: "/app/configuracoes", label: "Configurações da conta", icon: Star },
    { href: "/docs", label: "Documentação e tutoriais", icon: BookOpen },
    { href: "/precos", label: isPro ? "Gerenciar assinatura" : "Fazer upgrade para Pro", icon: Zap },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Bem-vindo de volta, {userName}! 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base">
            Aqui está o resumo da sua área de trabalho hoje.
          </p>
        </div>
        {!isPro && (
          <Link
            href="/precos"
            className="btn-primary py-2.5 px-5 text-sm self-start sm:self-auto whitespace-nowrap"
          >
            <Zap className="w-4 h-4" />
            Upgrade Pro
          </Link>
        )}
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.iconColor}`} />
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5 leading-tight">
              {stat.label}
            </p>
            <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-none">
              {stat.value}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* ===== PLAN BANNER ===== */}
      <div className={`rounded-2xl border p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
        isPro 
          ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800/50" 
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isPro ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-slate-100 dark:bg-slate-800"
          }`}>
            <Shield className={`w-6 h-6 ${isPro ? "text-white" : "text-slate-400"}`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
              Seu Plano Atual
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                {planName}
              </span>
              {isPro ? (
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Ativo
                </span>
              ) : (
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  • Recursos limitados
                </span>
              )}
            </div>
          </div>
        </div>
        {!isPro && (
          <Link href="/precos" className="btn-primary py-2.5 px-5 text-sm w-full sm:w-auto text-center">
            Fazer Upgrade Agora
          </Link>
        )}
      </div>

      {/* ===== TOOLS GRID ===== */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
          Ferramentas Disponíveis
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 hover:shadow-lg ${tool.hoverBorder} transition-all group cursor-pointer relative overflow-hidden`}
            >
              {/* Subtle gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity rounded-2xl`} />
              
              <div className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1.5 text-sm md:text-base">
                {tool.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {tool.description}
              </p>
              {tool.locked ? (
                <div className="flex items-center text-xs md:text-sm font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg w-fit">
                  🔒 Apenas plano Pro
                </div>
              ) : (
                <div className={`flex items-center text-xs md:text-sm font-bold ${tool.linkColor} group-hover:translate-x-1 transition-transform`}>
                  Acessar ferramenta <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* ===== QUICK LINKS ===== */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
          Acesso Rápido
        </h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
          {quickLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between px-4 md:px-6 py-3.5 md:py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0">
                  <link.icon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {link.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* ===== ACTIVITY SECTION ===== */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
          Atividade Recente
        </h2>
        {recentActivity.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentActivity.map((activity) => (
                <div key={activity._id.toString()} className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex flex-shrink-0 items-center justify-center mt-0.5">
                    <MessageSquare className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {activity.type || "Geração de Texto"}
                      </p>
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {new Date(activity.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {activity.prompt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-center">
              <Link href="/app/historico" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors">
                Ver todo o histórico &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <Clock className="w-7 h-7 text-slate-400" />
            </div>
            <p className="font-semibold text-slate-900 dark:text-white mb-1">
              Nenhuma atividade ainda
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs">
              Suas gerações e ações aparecerão aqui. Comece usando uma das ferramentas acima!
            </p>
            <Link href="/app/ia" className="btn-primary py-2.5 px-5 text-sm">
              <Sparkles className="w-4 h-4" />
              Começar agora
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
