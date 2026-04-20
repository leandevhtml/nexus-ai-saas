import Footer from "@/components/Footer";
import PrecosClient from "@/components/PrecosClient";
import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Preços | NexusAI",
  description: "Escolha o plano ideal para a sua infraestrutura de dados local.",
};

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

export default async function PrecosPage() {
  await dbConnect();

  let plans = await Plan.find({ active: true }).sort({ price: 1 }).lean();

  if (plans.length === 0) {
    await Plan.insertMany(defaultPlans);
    plans = await Plan.find({ active: true }).sort({ price: 1 }).lean();
  }

  // Need to parse string IDs to prevent Next.js serialization warnings
  const serializedPlans = plans.map(p => ({
    ...p,
    _id: p._id.toString()
  }));

  return (
    <>
      <main className="flex-1 max-w-6xl mx-auto px-6 py-20 min-h-[70vh]">
        <div className="mb-16 text-center">
          <h1 className="heading-lg mb-6">Planos e Preços</h1>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Pague pelo que usar sem surpresas. Hospede na sua própria infraestrutura e mantenha total controle sobre seus dados.
          </p>
        </div>

        <PrecosClient plans={serializedPlans as any} />
      </main>
      <Footer />
    </>
  );
}
