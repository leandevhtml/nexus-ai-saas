import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";
import CheckoutForm from "./CheckoutForm";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import Payment from "@/models/Payment";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  
  if (!session) {
    redirect("/login?callbackUrl=/precos");
  }

  const { id } = await params;

  await dbConnect();
  
  let plan;
  try {
    plan = await Plan.findById(id).lean();
  } catch (e) {
    notFound();
  }

  if (!plan) {
    notFound();
  }

  // Convert to plain object for client component
  const planData = {
    _id: plan._id.toString(),
    name: plan.name,
    price: plan.price,
    period: plan.period,
    features: plan.features,
  };

  // Criar ou atualizar registro de pagamento pendente para aparecer no Admin
  // Isso permite que o administrador veja a intenção de compra em tempo real
  await Payment.findOneAndUpdate(
    { 
      userId: session.user.id, 
      status: "pending", 
      plan: plan.name,
      createdAt: { $gt: new Date(Date.now() - 1000 * 60 * 60) } // Verifica se já existe um nos últimos 60 min
    },
    {
      userId: session.user.id,
      userName: session.user.name || "Desconhecido",
      userEmail: session.user.email || "",
      amount: plan.price,
      currency: "BRL",
      status: "pending",
      plan: plan.name,
    },
    { upsert: true, returnDocument: 'after' }
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex flex-col pt-24 pb-12">
      <div className="max-w-5xl mx-auto w-full px-6 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Finalizar Assinatura</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Você está a um passo de turbinar sua infraestrutura.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <CheckoutForm plan={planData} />
          </div>
          
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sticky top-24 shadow-xl shadow-slate-200/20 dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Resumo do Pedido</h3>
              
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Plano {planData.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Faturamento {planData.period === "/mês" ? "Mensal" : "Anual"}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(planData.price)}
                  </p>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {planData.features.slice(0, 4).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">Total a pagar</span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(planData.price)}
                  </span>
                </div>
                <p className="text-xs text-center text-slate-400 mt-4">
                  Pagamento 100% seguro processado via NexusAI Payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
