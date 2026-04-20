"use client";

import { useState } from "react";
import { CreditCard, QrCode, Building, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  plan: {
    _id: string;
    name: string;
    price: number;
  };
}

export default function CheckoutForm({ plan }: CheckoutFormProps) {
  const [method, setMethod] = useState("credit_card");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout/simulado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan._id, paymentMethod: method }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redireciona para um success genérico
        router.push("/success?session_id=simulado_success&plan=" + plan.name);
      } else {
        alert(data.error || "Erro ao processar pagamento");
      }
    } catch (err) {
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Método de Pagamento</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button 
          onClick={() => setMethod("credit_card")}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${method === 'credit_card' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10 text-indigo-600' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
        >
          <CreditCard className="w-6 h-6 mb-2" />
          <span className="text-sm font-semibold">Cartão</span>
        </button>
        <button 
          onClick={() => setMethod("pix")}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${method === 'pix' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-600' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
        >
          <QrCode className="w-6 h-6 mb-2" />
          <span className="text-sm font-semibold">PIX</span>
        </button>
        <button 
          onClick={() => setMethod("boleto")}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${method === 'boleto' ? 'border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'}`}
        >
          <Building className="w-6 h-6 mb-2" />
          <span className="text-sm font-semibold">Boleto</span>
        </button>
      </div>

      <form onSubmit={handleSimulatePayment} className="space-y-6">
        {method === "credit_card" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Número do Cartão</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Validade</label>
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">CVV</label>
                <input 
                  type="text" 
                  placeholder="123" 
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nome no Cartão</label>
              <input 
                type="text" 
                placeholder="NOME IGUAL AO CARTÃO" 
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        )}

        {method === "pix" && (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-200 dark:border-emerald-800/30 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
            <QrCode className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Pagamento Rápido via PIX</h4>
            <p className="text-sm text-emerald-600 dark:text-emerald-500 mb-6">A liberação do plano é imediata após a confirmação do pagamento.</p>
          </div>
        )}

        {method === "boleto" && (
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Building className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Pagamento via Boleto</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Pode levar até 3 dias úteis para compensar e liberar o plano.</p>
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 mt-8"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
            <>
              <ShieldCheck className="w-5 h-5" />
              Finalizar Pagamento (Simulado)
            </>
          )}
        </button>
      </form>
    </div>
  );
}
