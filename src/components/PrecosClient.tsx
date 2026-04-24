"use client";

import { Check, Zap, Rocket, Shield, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface PlanData {
  _id?: string;
  name: string;
  price: number;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  buttonClass: string;
  popular: boolean;
  priceId?: string;
  iconType?: string;
}

export default function PrecosClient({ plans }: { plans: PlanData[] }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const getIcon = (type?: string) => {
    switch(type) {
      case "rocket": return <Rocket size={24} className="text-[var(--primary-light)]" />;
      case "shield": return <Shield size={24} className="text-purple-400" />;
      case "zap":
      default:
        return <Zap size={24} className="text-emerald-400" />;
    }
  };

  const handleSubscription = async (plan: PlanData) => {
    if (!session) {
      router.push("/login?callbackUrl=/precos");
      return;
    }

    if (plan.price === 0) {
      router.push("/registro");
      return;
    }

    // Redireciona para o Checkout Simulado customizado
    setLoadingPriceId(plan.priceId || "loading");
    router.push(`/checkout/${plan._id}`);
  };

  return (
    <div className="grid-universal">
      {plans.map((plan, idx) => (
        <div 
          key={plan._id || idx} 
          className={`glass rounded-3xl p-6 sm:p-8 flex flex-col relative ${plan.popular ? 'border-[var(--primary-light)] shadow-[0_0_30px_rgba(37,99,235,0.15)] transform md:-translate-y-4' : 'border-[var(--border-light)]'}`}
        >
          {plan.popular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--primary)] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Mais Escolhido
            </div>
          )}
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--surface-hover)] border border-[var(--border-light)]`}>
              {getIcon(plan.iconType)}
            </div>
            <h3 className="text-2xl font-bold text-[var(--text)]">{plan.name}</h3>
          </div>
          
          <div className="mb-4">
            <span className="text-4xl font-extrabold text-[var(--text)]">
              {plan.price === 0 ? "Grátis" : `R$ ${plan.price}`}
            </span>
            {plan.period && <span className="text-[var(--text-muted)] font-medium">{plan.period}</span>}
          </div>
          
          <p className="text-sm text-[var(--text-muted)] mb-8 min-h-[40px]">
            {plan.description}
          </p>

          <button 
            onClick={() => handleSubscription(plan)}
            disabled={loadingPriceId !== null}
            className={`w-full py-3.5 rounded-xl font-semibold mb-8 transition-all flex items-center justify-center gap-2 ${plan.buttonClass}`}
          >
            {loadingPriceId === plan.priceId ? <Loader2 className="animate-spin" size={20} /> : plan.cta}
          </button>

          <ul className="space-y-4 flex-1">
            {plan.features.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-start gap-3">
                <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--text-muted)] leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
