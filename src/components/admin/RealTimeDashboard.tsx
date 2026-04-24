"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  MousePointer2, 
  Mail,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RealTimeDashboard({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const newData = await res.json();
          setData(newData.stats);
        }
      } catch (err) {
        console.error("Erro ao atualizar dashboard:", err);
      }
    };

    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { 
      label: "Total de Leads", 
      value: data.totalLeads, 
      icon: Mail, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      trend: "+12%" 
    },
    { 
      label: "Usuários Pro", 
      value: data.proUsers, 
      icon: Users, 
      color: "text-purple-500", 
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      trend: data.proUsers > 0 ? "+100%" : "0%" 
    },
    { 
      label: "Conversão", 
      value: `${data.conversionRate}%`, 
      icon: TrendingUp, 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      trend: "+2.4%" 
    },
    { 
      label: "Receita (Est.)", 
      value: `R$ ${(data.proUsers * 499).toLocaleString('pt-BR')}`, 
      icon: MousePointer2, 
      color: "text-amber-500", 
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      trend: "+18%" 
    },
  ];

  // Helper to find max for chart normalization
  const maxWeekly = Math.max(...(data.weeklyData || [40, 65, 45, 90, 55, 75, 85]), 1);

  return (
    <div className="space-y-10">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className={cn(
            "relative overflow-hidden p-6 rounded-[2rem] bg-white dark:bg-[#11111E] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          )}>
            <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20", card.bg)} />
            
            <div className="flex items-start justify-between relative z-10">
              <div className={cn("p-3 rounded-2xl border", card.bg, card.border)}>
                <card.icon className={cn("w-6 h-6", card.color)} />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                {card.trend}
              </span>
            </div>

            <div className="mt-6 relative z-10">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{card.label}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Growth Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#11111E] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Crescimento Semanal</h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
          
          <div className="h-[350px] w-full flex flex-col justify-end gap-4">
            <div className="flex items-end justify-between h-full px-4 gap-2">
              {(data.weeklyData || [0, 0, 0, 0, 0, 0, 0]).map((val: number, i: number) => {
                // Normalize height based on maxWeekly
                const heightPercent = (val / maxWeekly) * 90; // max 90% for top padding
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar">
                    <div 
                      className="w-full max-w-[40px] bg-indigo-500/20 group-hover/bar:bg-indigo-500/40 rounded-t-xl transition-all duration-500 relative"
                      style={{ height: `${Math.max(heightPercent, 5)}%` }}
                    >
                      {val > 0 && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover/bar:opacity-100 transition-opacity">
                          {val}
                        </div>
                      )}
                      <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 rounded-t-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Origins Chart */}
        <div className="bg-white dark:bg-[#11111E] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Conversão por Origem</h3>
          <div className="space-y-8">
             {(data.origins && data.origins.length > 0 ? data.origins : [
               { name: 'Landing Page', val: 65, color: 'bg-indigo-500' },
               { name: 'Social Media', val: 15, color: 'bg-purple-500' },
               { name: 'Ads', val: 12, color: 'bg-blue-500' },
               { name: 'Referral', val: 8, color: 'bg-emerald-500' }
             ]).map((source: any, i: number) => {
               const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500'];
               const colorClass = source.color || colors[i % colors.length];
               
               return (
                 <div key={source.name} className="flex flex-col gap-3">
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest truncate max-w-[150px]">
                       {source.name}
                     </span>
                     <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-medium">{source.count}</span>
                        <span className="text-sm font-black text-slate-900 dark:text-white">{source.val}%</span>
                     </div>
                   </div>
                   <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                     <div 
                       className={cn("h-full rounded-full transition-all duration-1000", colorClass)} 
                       style={{ width: `${source.val}%` }}
                     />
                   </div>
                 </div>
               );
             })}
          </div>
          
          {(!data.origins || data.origins.length === 0) && (
            <p className="mt-8 text-center text-xs text-slate-500">Dados simulados (sem leads ainda)</p>
          )}
        </div>
      </div>
    </div>
  );
}
