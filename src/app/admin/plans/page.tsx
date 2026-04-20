import { Plus, Edit2, Trash2, Check, Target } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";

export const dynamic = "force-dynamic";

const defaultPlans = [
  { 
    name: "Básico", 
    price: 0, 
    period: "", 
    description: "Ideal para testes e projetos pessoais locais.",
    features: ["Inferência Local Básica", "Modelos até 7B parâmetros", "Integração com 1 banco de dados", "Suporte via Comunidade"],
    cta: "Começar Grátis",
    buttonClass: "btn-secondary text-[var(--text)] border-[var(--border)]",
    popular: false,
    active: true,
    iconType: "zap"
  },
  { 
    name: "Pro", 
    price: 499.00, 
    period: "/mês", 
    description: "Para times e startups que buscam performance e privacidade.",
    features: ["Inferência Otimizada (GPU/TPU)", "Modelos até 70B parâmetros", "Bancos de dados ilimitados", "API de RAG Nativa", "Suporte por Email Prioritário"],
    cta: "Assinar o Pro",
    buttonClass: "btn-primary shadow-[0_0_15px_rgba(37,99,235,0.3)]",
    popular: true,
    priceId: "price_placeholder_pro",
    active: true,
    iconType: "rocket"
  },
  { 
    name: "Expert", 
    price: 1500.00, 
    period: "", 
    description: "Para grandes corporações com rígidas regras de compliance.",
    features: ["Deploy em Cluster Air-Gapped", "Fine-Tuning e Treinamento Customizado", "SLA de 99.9% de Uptime", "Gerente de Conta Dedicado", "Auditoria LGPD/GDPR"],
    cta: "Falar com Vendas",
    buttonClass: "btn-secondary text-[var(--text)] border-[var(--border)]",
    popular: false,
    active: true,
    iconType: "shield"
  },
];

export default async function PlansPage() {
  await dbConnect();
  
  let plans = await Plan.find().sort({ price: 1 }).lean();
  
  // Auto-seed se vazio
  if (plans.length === 0) {
    await Plan.insertMany(defaultPlans);
    plans = await Plan.find().sort({ price: 1 }).lean();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciar Planos</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Configure os preços e as funcionalidades dos seus planos de assinatura.</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium shadow-sm">
          <Plus className="w-4 h-4" />
          Novo Plano
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan: any) => (
          <div key={plan._id.toString()} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden group">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                  <Target className="w-5 h-5 text-indigo-600" />
                </div>
                {plan.active ? (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">Ativo</span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Inativo</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {plan.price === 0 ? "Grátis" : plan.price === 1500 ? "Sob Consulta" : `R$ ${plan.price.toFixed(2)}`}
                </span>
                {plan.period && <span className="text-sm text-slate-500 dark:text-slate-400">{plan.period}</span>}
              </div>
            </div>

            <div className="p-6 flex-1 space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Funcionalidades</p>
              <ul className="space-y-3">
                {plan.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all">
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50/10 transition-all group">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/20 transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium">Adicionar novo plano</span>
        </button>
      </div>
    </div>
  );
}
