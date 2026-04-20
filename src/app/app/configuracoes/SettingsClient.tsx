"use client";

import { useState } from "react";
import { User, Mail, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SettingsProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  planName: string;
  isPro: boolean;
}

export default function SettingsClient({ user, planName, isPro }: SettingsProps) {
  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { update } = useSession();
  const router = useRouter();

  const handleUpdateProfile = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      
      if (res.ok) {
        await update({ name });
        alert("Perfil atualizado com sucesso!");
        router.refresh();
      } else {
        alert(data.error || "Erro ao atualizar");
      }
    } catch (err) {
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPlan = async () => {
    if (!confirm("Tem certeza que deseja cancelar sua assinatura Pro? Você perderá acesso às ferramentas avançadas ao final do ciclo.")) return;
    
    setCancelLoading(true);
    try {
      const res = await fetch("/api/user/cancel", { method: "POST" });
      const data = await res.json();
      
      if (res.ok) {
        await update({ subscription: { plan: "Free", status: "canceled" } });
        alert("Plano cancelado com sucesso. Você retornou para o plano Free.");
        router.refresh();
      } else {
        alert(data.error || "Erro ao cancelar");
      }
    } catch (err) {
      alert("Erro de conexão");
    } finally {
      setCancelLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("ALERTA: Essa ação é irreversível. Todos os seus dados serão apagados para sempre. Deseja continuar?")) return;
    
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      if (res.ok) {
        alert("Conta deletada. Você será redirecionado.");
        signOut({ callbackUrl: "/" });
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao deletar conta");
        setDeleteLoading(false);
      }
    } catch (err) {
      alert("Erro de conexão");
      setDeleteLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      
      {/* Perfil */}
      <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center overflow-hidden">
            {user.image ? (
              <img src={user.image} alt={user.name || "Foto"} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Perfil Público</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Suas informações de conta.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nome Completo</label>
            <div className="relative">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
              />
              <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">E-mail</label>
            <div className="relative">
              <input 
                type="email" 
                value={user.email}
                disabled
                className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 focus:outline-none pl-10 cursor-not-allowed"
              />
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">O e-mail não pode ser alterado no momento.</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleUpdateProfile}
            disabled={loading || name === user.name}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2 px-6 rounded-lg transition-colors text-sm flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar Alterações"}
          </button>
        </div>
      </div>

      {/* Assinatura */}
      <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Assinatura</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Gerencie seu plano atual.</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-slate-900 dark:text-white">Plano {planName}</span>
              {isPro ? (
                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded uppercase">Ativo</span>
              ) : (
                <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-2 py-0.5 rounded uppercase">Grátis</span>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isPro ? "Você tem acesso ilimitado a todas as ferramentas." : "Seu plano possui limitações diárias."}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {isPro ? (
              <button 
                onClick={handleCancelPlan}
                disabled={cancelLoading}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-4 py-2 border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg flex items-center gap-2"
              >
                {cancelLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cancelar Plano"}
              </button>
            ) : (
              <Link href="/precos" className="btn-primary py-2 px-6 text-sm">
                Fazer Upgrade
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Zona de Perigo */}
      <div className="p-6 md:p-8">
        <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Zona de Perigo</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Ações irreversíveis para a sua conta.</p>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Excluir Conta</p>
            <p className="text-xs text-slate-500 mt-1">Todos os seus dados e históricos serão apagados permanentemente.</p>
          </div>
          <button 
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
            className="text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {deleteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Deletar Conta"}
          </button>
        </div>
      </div>
    </div>
  );
}
