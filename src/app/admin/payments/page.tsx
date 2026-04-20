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
          <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Ver logs do Stripe
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium shadow-sm">
            Configurar Gateway
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Receita Total</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
          </h3>
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">Processado via gateway</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Assinaturas Ativas</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{activeSubscriptions}</h3>
          <p className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">Usuários com planos ativos</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pendentes</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pendingRevenue)}
          </h3>
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium">Aguardando confirmação</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Transações Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-950/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Plano</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              ) : payments.map((tr: any) => (
                <tr key={tr._id.toString()} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900 dark:text-white">{tr.userName || tr.userEmail}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-900 dark:text-white font-semibold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: tr.currency || 'BRL' }).format(tr.amount || 0)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">{tr.plan}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {tr.status === "completed" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {tr.status === "pending" && <Clock className="w-4 h-4 text-amber-500" />}
                      {tr.status === "failed" && <AlertCircle className="w-4 h-4 text-red-500" />}
                      <span className={cn(
                        "text-xs font-medium capitalize",
                        tr.status === "completed" ? "text-emerald-600" : 
                        tr.status === "pending" ? "text-amber-600" : "text-red-600"
                      )}>
                        {tr.status === "completed" ? "Concluído" : tr.status === "pending" ? "Pendente" : "Falhou"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      {new Date(tr.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
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
