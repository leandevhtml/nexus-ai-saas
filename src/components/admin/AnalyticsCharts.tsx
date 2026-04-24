"use client";

import { useMemo } from "react";
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsData {
  stats: {
    totalLeads: number;
    totalUsers: number;
    proUsers: number;
    conversionRate: number;
    growthData: Array<{ label: string; count: number; revenue: number }>;
    origins: Array<{ name: string; val: number; count: number }>;
  };
  payments: {
    totalRevenue: number;
    completedCount: number;
    pendingRevenue: number;
    pendingCount: number;
    activeSubscriptions: number;
  };
}

export default function AnalyticsCharts({ data }: { data: AnalyticsData }) {
  // Dados reais vindos da API
  const revenueHistory = useMemo(() => {
    return data.stats.growthData.map(d => d.revenue);
  }, [data.stats.growthData]);

  const maxRevenue = Math.max(...revenueHistory, 1);
  
  // Pontos para o gráfico de área (SVG)
  const points = revenueHistory.map((val, i) => {
    const x = (i / (revenueHistory.length - 1)) * 100;
    const y = 100 - (val / maxRevenue) * 80; // 80% height scale
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Grid de Métricas Secundárias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="ARPU" 
          subtitle="Receita média por usuário"
          value={`R$ ${(data.payments.totalRevenue / (data.stats.totalUsers || 1)).toFixed(2)}`}
          icon={DollarSign}
          trend="+5.2%"
          trendUp={true}
        />
        <MetricCard 
          title="Taxa de Retenção" 
          subtitle="Usuários ativos mensalmente"
          value="94.2%"
          icon={Users}
          trend="+1.2%"
          trendUp={true}
        />
        <MetricCard 
          title="Custo p/ Lead" 
          subtitle="Média de investimento"
          value="R$ 12.40"
          icon={Target}
          trend="-15%"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Receita (Área SVG) */}
        <div className="bg-white dark:bg-[#0B0B14] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fluxo de Caixa</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Receita total acumulada no período</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                R$ {revenueHistory.reduce((a, b) => a + b, 0).toLocaleString('pt-BR')}
              </span>
              <div className="flex items-center justify-end text-emerald-500 text-xs font-bold mt-1">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +24.5%
              </div>
            </div>
          </div>

          <div className="h-64 w-full relative mt-4">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                fill="url(#areaGradient)"
                points={areaPoints}
              />
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
              />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex justify-between px-2 pointer-events-none">
              {data.stats.growthData.filter((_, i) => {
                // Reduce number of labels if there are too many (e.g. Month)
                if (data.stats.growthData.length > 12) return i % 5 === 0;
                if (data.stats.growthData.length > 7) return i % 2 === 0;
                return true;
              }).map(item => (
                <span key={item.label} className="text-[9px] font-bold text-slate-400 uppercase">{item.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Funil de Conversão */}
        <div className="bg-white dark:bg-[#0B0B14] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Funil de Conversão</h3>
          <div className="space-y-6">
            <FunnelStep 
              label="Visitantes Totais" 
              value={data.stats.totalLeads * 5} 
              percentage={100} 
              color="bg-slate-400" 
            />
            <FunnelStep 
              label="Leads Gerados" 
              value={data.stats.totalLeads} 
              percentage={20} 
              color="bg-indigo-500" 
            />
            <FunnelStep 
              label="Checkout Iniciado" 
              value={data.payments.pendingCount + data.payments.completedCount} 
              percentage={data.stats.totalLeads > 0 ? Math.round(((data.payments.pendingCount + data.payments.completedCount) / data.stats.totalLeads) * 100) : 0} 
              color="bg-purple-500" 
            />
            <FunnelStep 
              label="Assinaturas Pagas" 
              value={data.payments.completedCount} 
              percentage={data.stats.totalLeads > 0 ? Math.round((data.payments.completedCount / data.stats.totalLeads) * 100) : 0} 
              color="bg-emerald-500" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, subtitle, value, icon: Icon, trend, trendUp }: any) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0B14] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-indigo-500/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-colors">
          <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </div>
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded-lg",
          trendUp ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
        )}>
          {trend}
        </span>
      </div>
      <div>
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{title}</h4>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-black text-slate-900 dark:text-white">{value}</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function FunnelStep({ label, value, percentage, color, substep }: any) {
  return (
    <div className={cn("relative", substep && "ml-8")}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-slate-900 dark:text-white">{value.toLocaleString()}</span>
          <span className="text-xs font-bold text-slate-400">{percentage}%</span>
        </div>
      </div>
      <div className="w-full h-4 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
