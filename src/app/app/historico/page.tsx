import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { History as HistoryIcon, Clock, FileText, Database } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import History from "@/models/History";
import { formatDate } from "@/lib/utils";

export default async function HistoricoPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();

  // Busca o histórico do usuário logado no MongoDB, mais recente primeiro
  const historicoDB = await History.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const historico = historicoDB.map((item: any) => ({
    id: item._id.toString(),
    tipo: item.type,
    prompt: item.prompt,
    data: formatDate(item.createdAt),
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Histórico de Gerações</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Visualize e recupere seus prompts e textos gerados anteriormente.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Prompt
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Data
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {historico.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Database className="w-12 h-12 text-slate-200 dark:text-slate-800" />
                      <p className="text-slate-500 dark:text-slate-400 font-medium">Nenhuma geração ainda.</p>
                      <p className="text-sm text-slate-400 dark:text-slate-500">Vá até as Ferramentas de IA para criar seu primeiro conteúdo.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                historico.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        {item.tipo === "Texto" ? (
                          <FileText className="w-4 h-4 text-indigo-500" />
                        ) : (
                          <FileText className="w-4 h-4 text-emerald-500" />
                        )}
                        {item.tipo}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 dark:text-slate-400 truncate max-w-xs md:max-w-md">
                        {item.prompt}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 text-sm">
                        <Clock className="w-4 h-4 opacity-50" />
                        {item.data}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/30 flex justify-center">
          <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            Carregar mais
          </button>
        </div>
      </div>
    </div>
  );
}
