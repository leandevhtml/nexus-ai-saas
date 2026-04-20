import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Database, Upload, Lock, FileText, Settings2 } from "lucide-react";
import Link from "next/link";

export default async function TreinamentoPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const planName = (session.user as any)?.subscription?.plan || "Free";
  const isPro = planName !== "Free";

  // Se o usuário não for Pro, não deveria estar aqui, redirecionar para upgrade
  if (!isPro) {
    redirect("/precos");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Database className="w-8 h-8 text-emerald-500" />
          Treinar IA Personalizada
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Faça upload de documentos em PDF ou TXT para treinar um modelo Nexus exclusivo com os seus próprios dados. Exclusivo para membros Pro.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Upload Area */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Base de Conhecimento</h2>
          
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-950/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer group">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Clique para enviar arquivos</h3>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">ou arraste e solte seus PDFs, DOCX ou TXT aqui</p>
            <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800">
              Máximo 50MB por arquivo
            </span>
          </div>

          <div className="mt-8 flex justify-end">
            <button disabled className="bg-emerald-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2">
              <Settings2 className="w-5 h-5" />
              Iniciar Treinamento
            </button>
          </div>
        </div>

        {/* Models list */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Seus Modelos</h2>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm opacity-60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Nexus Base</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Modelo padrão treinado até 2026.</p>
            <div className="mt-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Padrão do Sistema</div>
          </div>

          <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center">
            <Database className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Nenhum modelo personalizado treinado ainda.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
