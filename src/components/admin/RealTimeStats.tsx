"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  MousePointer2, 
  Mail 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RealTimeStats({ initialStats }: { initialStats: any }) {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const newData = await res.json();
          setStats(newData.stats);
        }
      } catch (err) {
        console.error("Erro ao atualizar stats:", err);
      }
    };

    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { 
      label: "Total de Leads", 
      value: stats.totalLeads, 
      icon: Mail, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      trend: "+12%" 
    },
    { 
      label: "Usuários Pro", 
      value: stats.proUsers, 
      icon: Users, 
      color: "text-purple-500", 
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      trend: stats.proUsers > 0 ? "+100%" : "0%" 
    },
    { 
      label: "Conversão", 
      value: `${stats.conversionRate}%`, 
      icon: TrendingUp, 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      trend: "+2.4%" 
    },
    { 
      label: "Receita (Est.)", 
      value: `R$ ${(stats.proUsers * 499).toLocaleString('pt-BR')}`, 
      icon: MousePointer2, 
      color: "text-amber-500", 
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      trend: "+18%" 
    },
  ];

  return (
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
  );
}
