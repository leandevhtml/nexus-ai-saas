"use client";

import { useState, useEffect } from "react";
import { 
  CreditCard, 
  DollarSign, 
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RealTimePayments({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const newData = await res.json();
          setData(newData.payments);
        }
      } catch (err) {
        console.error("Erro ao atualizar dados:", err);
      }
    };

    const interval = setInterval(fetchStats, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Receita Total */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Receita Total</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.totalRevenue)}
          </h3>
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Processado via gateway</p>
        </div>

        {/* Assinaturas Ativas */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Assinaturas Ativas</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{data.activeSubscriptions}</h3>
          <p className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">Usuários com planos ativos</p>
        </div>

        {/* Pendentes */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          {data.pendingRevenue > 0 && (
            <div className="absolute top-0 right-0 p-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pendentes</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.pendingRevenue)}
          </h3>
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium">Aguardando confirmação</p>
        </div>
      </div>

      {/* Tabela de Transações */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Transações Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-950/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Plano</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.list.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              ) : data.list.map((tr: any) => (
                <tr key={tr._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900 dark:text-white">{tr.userName || tr.userEmail}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-900 dark:text-white font-semibold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: tr.currency || 'BRL' }).format(tr.amount || 0)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">{tr.plan}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {tr.status === "completed" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {tr.status === "pending" && <Clock className="w-4 h-4 text-amber-500" />}
                      {tr.status === "failed" && <AlertCircle className="w-4 h-4 text-red-500" />}
                      <span className={cn(
                        "text-xs font-medium capitalize",
                        tr.status === "completed" ? "text-emerald-600" : 
                        tr.status === "pending" ? "text-amber-600" : "text-red-600"
                      )}>
                        {tr.status === "completed" ? "Concluído" : tr.status === "pending" ? "Pendente" : "Falhou"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      {new Date(tr.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
