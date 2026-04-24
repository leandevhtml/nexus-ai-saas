"use client";

import { useState, useEffect } from "react";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";
import { Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminAnalytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [range, setRange] = useState("week");

  const fetchAnalytics = async (selectedRange = range) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/stats?range=${selectedRange}`, {
        cache: 'no-store'
      });
      if (!res.ok) throw new Error("Falha ao carregar dados de analytics");
      const result = await res.json();
      setData(result);
      setLastUpdated(new Date());
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(range);
  }, [range]);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-slate-500 font-medium">Carregando métricas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/20 p-6 rounded-2xl text-center">
        <p className="text-rose-600 dark:text-rose-400 font-bold mb-4">{error}</p>
        <button 
          onClick={fetchAnalytics}
          className="px-6 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Analytics <span className="text-indigo-500">Hub</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
            Métricas detalhadas de performance, conversão e receita.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-2xl shadow-sm">
            {[
              { label: 'Dia', val: 'day' },
              { label: 'Semana', val: 'week' },
              { label: 'Mês', val: 'month' },
              { label: 'Ano', val: 'year' }
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setRange(f.val)}
                className={cn(
                  "px-6 py-2 text-sm font-bold rounded-xl transition-all",
                  range === f.val 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-end gap-1">
            <button 
              onClick={fetchAnalytics}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={loading ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
              {loading ? "Sincronizando..." : "Sincronizar"}
            </button>
            {lastUpdated && !loading && (
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Sinc: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <AnalyticsCharts data={data} />
      
      {/* Rodapé informativo */}
      <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">Pronto para escalar?</h2>
            <p className="text-indigo-100 opacity-90 leading-relaxed">
              Baseado nos dados atuais, sua taxa de conversão está acima da média do mercado. 
              Considere aumentar o tráfego pago para as fontes de <strong>Landing Page</strong> e <strong>Ads</strong> para maximizar o ROI.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl text-center min-w-[140px]">
              <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Score de Saúde</div>
              <div className="text-4xl font-black italic">92</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

