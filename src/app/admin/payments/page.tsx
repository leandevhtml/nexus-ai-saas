import { 
  CreditCard, 
  DollarSign, 
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import RealTimePayments from "@/components/admin/RealTimePayments";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  await dbConnect();

  // Fetch metrics
  const payments = await Payment.find().sort({ createdAt: -1 }).lean();
  
  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((acc, p) => acc + (p.amount || 0), 0);

  const pendingRevenue = payments
    .filter((p) => p.status === "pending")
    .reduce((acc, p) => acc + (p.amount || 0), 0);

  const activeSubscriptions = await User.countDocuments({ "subscription.status": "active" });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pagamentos & Faturamento</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gerencie transações, assinaturas e o gateway de pagamento.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <a 
            href="https://dashboard.stripe.com/test/logs" 
            target="_blank" 
            rel="noreferrer"
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            Ver logs do Stripe
          </a>
          <a 
            href="#stripe-config" 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium shadow-sm flex items-center gap-2"
          >
            Configurar Gateway
          </a>
        </div>
      </div>

      <RealTimePayments initialData={JSON.parse(JSON.stringify({
        list: payments,
        totalRevenue,
        pendingRevenue,
        activeSubscriptions
      }))} />

      <div id="stripe-config" className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden scroll-mt-8">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CreditCard size={120} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-2">Configuração do Stripe</h3>
          <p className="text-slate-400 mb-6">
            Conecte sua conta do Stripe configurando as chaves no arquivo `.env.local`.
            Para sincronizar os pagamentos, defina `STRIPE_WEBHOOK_SECRET`.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Stripe Webhook Endpoint</label>
              <input 
                type="text" 
                readOnly
                value="/api/webhooks/stripe" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none text-slate-300"
              />
            </div>
            <div className="flex items-end">
              <a href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noreferrer" className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center">
                Ir para o Stripe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
