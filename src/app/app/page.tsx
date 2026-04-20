import { auth } from "@/auth";
import { Sparkles, Zap, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AppPage() {
  const session = await auth();
  const userName = session?.user?.name?.split(" ")[0] || "Usuário";
  const planName = (session?.user as any)?.subscription?.plan || "Free";

  const isPro = planName !== "Free";

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Bem-vindo de volta, {userName}! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Aqui está o resumo da sua área de trabalho hoje.
        </p>
      </div>

      {/* Plan Status Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Seu Plano Atual
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {planName}
            </span>
            {isPro && (
              <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Ativo
              </span>
            )}
          </div>
        </div>

        {!isPro && (
          <Link 
            href="/precos"
            className="btn-primary py-2 px-6 text-sm"
          >
            Fazer Upgrade Agora
          </Link>
        )}
      </div>

      {/* Quick Actions / Tools Preview */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Ferramentas Disponíveis</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <Link href="/app/ia" className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-500/50 transition-all group cursor-pointer relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Gerador Nexus (IA)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Crie textos, automações e códigos usando nosso motor avançado.
            </p>
            <div className="flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
              Acessar ferramenta <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link 
            href={isPro ? "/app/treinamento" : "/precos"} 
            className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-500/50 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Treinar IA Personalizada</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Faça upload dos seus dados e treine um modelo exclusivo.
            </p>
            {isPro ? (
              <div className="flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                Acessar ferramenta <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            ) : (
              <div className="flex items-center text-sm font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg w-fit">
                🔒 Apenas plano Pro
              </div>
            )}
          </Link>

        </div>
      </div>
    </div>
  );
}
