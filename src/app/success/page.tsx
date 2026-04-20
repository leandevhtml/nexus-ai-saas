"use client";

import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Pro";
  const router = useRouter();
  const { update, status } = useSession();
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    // Atualiza a sessão local para refletir o novo plano instantaneamente no Navbar
    const updateSession = async () => {
      if (status === "authenticated") {
        await update({ subscription: { plan: plan, status: "active" } });
        setUpdating(false);
      } else if (status === "unauthenticated") {
        setUpdating(false);
      }
    };
    updateSession();
  }, [status, plan, update]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-2xl text-center max-w-2xl mx-auto mt-20 border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
      </div>
      
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Pagamento Aprovado!</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
        Sua assinatura do plano <span className="font-bold text-slate-900 dark:text-white">{plan}</span> foi ativada com sucesso.
      </p>

      <button 
        onClick={() => router.push('/app')}
        disabled={updating}
        className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] w-full md:w-auto min-w-[280px]"
      >
        {updating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Configurando seu ambiente...
          </>
        ) : (
          <>
            Começar a Usar Agora
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] px-6">
      <Suspense fallback={<div className="mt-20 text-center">Carregando...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
