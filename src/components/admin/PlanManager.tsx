"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Check, Target, X, Loader2, Rocket, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPlan, updatePlan, deletePlan, togglePlanStatus } from "@/app/admin/plans/actions";

export default function PlanManager({ initialPlans }: { initialPlans: any[] }) {
  const router = useRouter();
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    period: "/mês",
    description: "",
    features: [""],
    cta: "Começar Agora",
    buttonClass: "btn-primary",
    popular: false,
    active: true,
    iconType: "zap"
  });

  const openAddModal = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      price: 0,
      period: "/mês",
      description: "",
      features: [""],
      cta: "Começar Agora",
      buttonClass: "btn-primary",
      popular: false,
      active: true,
      iconType: "zap"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (plan: any) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      period: plan.period || "",
      description: plan.description,
      features: plan.features.length > 0 ? plan.features : [""],
      cta: plan.cta,
      buttonClass: plan.buttonClass,
      popular: plan.popular,
      active: plan.active,
      iconType: plan.iconType || "zap"
    });
    setIsModalOpen(true);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== "")
    };

    try {
      let res;
      if (editingPlan) {
        res = await updatePlan(editingPlan._id, cleanedData);
      } else {
        res = await createPlan(cleanedData);
      }

      if (res.success) {
        setIsModalOpen(false);
        router.refresh(); // Atualiza os dados sem recarregar a página toda
      } else {
        alert("Erro ao salvar: " + res.error);
      }
    } catch (err) {
      alert("Erro crítico ao salvar o plano");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este plano?")) return;
    
    setLoading(true);
    try {
      const res = await deletePlan(id);
      if (res.success) {
        router.refresh();
      } else {
        alert("Erro ao excluir: " + res.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, current: boolean) => {
    const res = await togglePlanStatus(id, current);
    if (res.success) {
      router.refresh();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerenciar Planos</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Configure os preços e as funcionalidades dos seus planos de assinatura.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all font-medium shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Novo Plano
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan: any) => (
          <div key={plan._id.toString()} className={cn(
            "bg-white dark:bg-[#11111E] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
            plan.popular && "ring-2 ring-indigo-500 ring-offset-4 dark:ring-offset-slate-950"
          )}>
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  plan.iconType === "rocket" ? "bg-purple-100 dark:bg-purple-900/20 text-purple-600" :
                  plan.iconType === "shield" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600" :
                  "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600"
                )}>
                  {plan.iconType === "rocket" ? <Rocket className="w-5 h-5" /> :
                   plan.iconType === "shield" ? <Shield className="w-5 h-5" /> :
                   <Zap className="w-5 h-5" />}
                </div>
                <button 
                  onClick={() => handleToggleStatus(plan._id, plan.active)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded transition-colors",
                    plan.active ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" : "text-slate-400 bg-slate-100 dark:bg-slate-800"
                  )}
                >
                  {plan.active ? "Ativo" : "Inativo"}
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {plan.price === 0 ? "Grátis" : `R$ ${plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
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
              <button 
                onClick={() => openEditModal(plan)}
                className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDelete(plan._id)}
                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={openAddModal}
          className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50/10 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/20 transition-colors">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium">Adicionar novo plano</span>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#11111E] w-full max-w-2xl rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {editingPlan ? "Editar Plano" : "Novo Plano"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nome do Plano</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Ex: Pro, Enterprise"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Preço (R$)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Período</label>
                  <input 
                    type="text" 
                    value={formData.period}
                    onChange={(e) => setFormData({...formData, period: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Ex: /mês, /ano"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tipo de Ícone</label>
                  <select 
                    value={formData.iconType}
                    onChange={(e) => setFormData({...formData, iconType: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="zap">Raio (Básico)</option>
                    <option value="rocket">Foguete (Pro)</option>
                    <option value="shield">Escudo (Expert)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Descrição</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none h-20 resize-none"
                  placeholder="Curta descrição do plano"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Funcionalidades</label>
                {formData.features.map((feature, i) => (
                  <div key={i} className="flex gap-2">
                    <input 
                      type="text" 
                      value={feature}
                      onChange={(e) => handleFeatureChange(i, e.target.value)}
                      className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      placeholder="Funcionalidade..."
                    />
                    <button type="button" onClick={() => removeFeature(i)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addFeature}
                  className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-1"
                >
                  <Plus className="w-4 h-4" /> Adicionar funcionalidade
                </button>
              </div>

              <div className="flex items-center gap-6 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.popular}
                    onChange={(e) => setFormData({...formData, popular: e.target.checked})}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Marcar como Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ativar Plano</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Salvar Plano"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
