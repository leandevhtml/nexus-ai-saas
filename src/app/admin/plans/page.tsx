import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import PlanManager from "@/components/admin/PlanManager";

export const dynamic = "force-dynamic";

const defaultPlans = [
  { 
    name: "Básico", 
    price: 0, 
    period: "", 
    description: "Ideal para testes e projetos pessoais locais.",
    features: ["Inferência Local Básica", "Modelos até 7B parâmetros", "Integração com 1 banco de dados", "Suporte via Comunidade"],
    cta: "Começar Grátis",
    buttonClass: "btn-secondary",
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
    buttonClass: "btn-primary",
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
    buttonClass: "btn-secondary",
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
    <div className="animate-in fade-in duration-700 px-2">
      <PlanManager initialPlans={JSON.parse(JSON.stringify(plans))} />
    </div>
  );
}
