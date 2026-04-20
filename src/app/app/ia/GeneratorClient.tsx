"use client";

import { useState } from "react";
import { Sparkles, Loader2, Lock, ArrowRight, Copy, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface GeneratorProps {
  isPro: boolean;
  planName: string;
}

export default function GeneratorClient({ isPro, planName }: GeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [generationsCount, setGenerationsCount] = useState(0);
  const [copied, setCopied] = useState(false);

  // Lógica de limite para o plano Free (ex: 3 gerações)
  const MAX_FREE_GENERATIONS = 3;
  const hasReachedLimit = !isPro && generationsCount >= MAX_FREE_GENERATIONS;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || hasReachedLimit) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ia/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();

      if (res.ok) {
        setResult(data.result);
        setGenerationsCount(prev => prev + 1);
      } else {
        alert(data.error || "Erro ao gerar conteúdo.");
      }
    } catch (err) {
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Input Area */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Novo Prompt
            </h3>
            
            {!isPro && (
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                {generationsCount} / {MAX_FREE_GENERATIONS} usos diários
              </span>
            )}
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Seletor de Modelos de IA */}
            <div className="space-y-2 mb-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Selecione a Inteligência Artificial:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-900/20 cursor-pointer">
                  <input type="radio" name="ai-model" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Nexus Fast</p>
                    <p className="text-[10px] text-slate-500">Ideal para textos e ideias</p>
                  </div>
                </label>
                
                <label className={`flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 ${isPro ? 'cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 bg-slate-50 dark:bg-slate-900/50' : 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-950'}`}>
                  <input type="radio" name="ai-model" disabled={!isPro} className="text-indigo-600 focus:ring-indigo-500" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Nexus Advanced</p>
                      {!isPro && <Lock className="w-3 h-3 text-slate-400" />}
                    </div>
                    <p className="text-[10px] text-slate-500">Alta precisão e código</p>
                  </div>
                </label>
              </div>
            </div>

            <textarea
              className="w-full h-32 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none disabled:opacity-50"
              placeholder="Digite o que você quer que a IA crie... (ex: Escreva um e-mail de vendas para um curso de React)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading || hasReachedLimit}
            />

            {hasReachedLimit ? (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-500 font-bold mb-2">
                  <Lock className="w-4 h-4" />
                  Limite Atingido
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">
                  Você atingiu o limite do plano Free. Faça upgrade para gerar textos infinitos.
                </p>
                <Link href="/precos" className="btn-primary w-full py-2 text-sm flex justify-center items-center gap-2">
                  Assinar o Plano Pro <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Gerar com IA"}
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Output Area */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col h-full min-h-[300px] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Resultado</h3>
            {result && (
              <button 
                onClick={copyToClipboard}
                className="text-xs flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar"}
              </button>
            )}
          </div>
          <div className="p-6 flex-1 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                <p>O motor Nexus está processando...</p>
              </div>
            ) : result ? (
              <div className="animate-in fade-in duration-300">
                {result}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2 opacity-50">
                <Sparkles className="w-8 h-8" />
                <p>O resultado aparecerá aqui.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
