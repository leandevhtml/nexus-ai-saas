"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Shield, Plug, BarChart3, ChevronRight, CheckCircle2,
  Upload, Database, MessageSquare, Lock, Play, RefreshCw,
  Search, Table, PieChart, Terminal, Globe, PlayCircle
} from "lucide-react";

// --- WIDGET COMPONENTS ---

const AnaliseWidget = () => {
  const [status, setStatus] = useState("idle"); // idle, uploading, processing, done
  const [progress, setProgress] = useState(0);

  const startDemo = () => {
    setStatus("uploading");
    setProgress(0);
  };

  useEffect(() => {
    if (status === "uploading") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("processing");
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
    if (status === "processing") {
      setTimeout(() => setStatus("done"), 2000);
    }
  }, [status]);

  return (
    <div className="bg-[#0D0D15] rounded-2xl border border-[var(--border-light)] p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-sm flex items-center gap-2"><Upload size={16} className="text-purple-400" /> Simulador de Análise</h4>
        <span className={`text-[10px] font-bold px-2 py-1 rounded ${status === 'done' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
          {status.toUpperCase()}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6">
        {status === "idle" && (
          <div
            onClick={startDemo}
            className="border-2 border-dashed border-[var(--border-light)] rounded-xl p-8 text-center cursor-pointer hover:border-[var(--primary)] transition-colors group"
          >
            <Upload className="mx-auto mb-4 text-[var(--text-dim)] group-hover:text-[var(--primary)]" size={32} />
            <p className="text-sm text-[var(--text-muted)]">Arraste seu dataset (.csv, .xlsx) aqui para testar</p>
          </div>
        )}

        {(status === "uploading" || status === "processing") && (
          <div className="space-y-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-dim)]">{status === "uploading" ? "Enviando arquivo..." : "IA analisando padrões..."}</span>
              <span className="text-[var(--primary-light)] font-bold">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-[var(--surface)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--primary)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse delay-150" />
            </div>
          </div>
        )}

        {status === "done" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <p className="text-xs text-emerald-400 font-bold mb-2 flex items-center gap-1"><CheckCircle2 size={14} /> Insight Gerado:</p>
              <p className="text-sm text-gray-300">"Detectamos uma correlação de 87% entre o atraso de suporte e o churn de clientes no Setor B. Recomendação: Priorizar tickets de alta criticidade com IA."</p>
            </div>
            <button onClick={() => setStatus("idle")} className="text-xs text-[var(--text-dim)] hover:text-white flex items-center gap-1 underline decoration-dotted">
              <RefreshCw size={12} /> Testar outro arquivo
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const IntegracaoWidget = () => {
  const [dbType, setDbType] = useState("postgres");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1500);
  };

  return (
    <div className="bg-[#0D0D15] rounded-2xl border border-[var(--border-light)] p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-sm flex items-center gap-2"><Database size={16} className="text-emerald-400" /> Conector Local</h4>
        <div className="flex gap-1">
          {["postgres", "mongo", "mysql"].map(db => (
            <button
              key={db}
              onClick={() => { setDbType(db); setIsConnected(false); }}
              className={`text-[10px] px-2 py-1 rounded capitalize ${dbType === db ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] text-[var(--text-dim)]'}`}
            >
              {db}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {!isConnected ? (
          <>
            <div className="space-y-2">
              <label className="text-[10px] text-[var(--text-dim)] uppercase font-bold">Host do Banco</label>
              <div className="p-3 bg-[var(--surface)] border border-[var(--border-light)] rounded-lg text-xs text-gray-400 font-mono">
                localhost:5432
              </div>
            </div>
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full btn-primary !py-3 !text-xs gap-2"
            >
              {isConnecting ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
              {isConnecting ? "Validando Localmente..." : "Testar Conexão"}
            </button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-400 font-bold">Conectado ao {dbType.toUpperCase()}</span>
            </div>
            <div className="text-[10px] text-[var(--text-dim)] font-bold uppercase mb-2">Tabelas Mapeadas:</div>
            <div className="grid grid-cols-2 gap-2">
              {["users", "orders", "logs", "metrics"].map(t => (
                <div key={t} className="p-2 bg-[var(--surface)] border border-[var(--border-light)] rounded text-[10px] flex items-center gap-2">
                  <Table size={12} className="text-blue-400" /> {t}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const InsightsWidget = () => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [response, setResponse] = useState("");

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsTyping(true);
    setResponse("");

    setTimeout(() => {
      setIsTyping(false);
      setResponse("Com base nos dados locais de vendas, a categoria 'Eletrônicos' deve sofrer uma queda de 12% no próximo mês se o estoque não for reposto em 48h. Sugiro realocação de verba de marketing.");
    }, 2000);
  };

  return (
    <div className="bg-[#0D0D15] rounded-2xl border border-[var(--border-light)] p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-sm flex items-center gap-2"><MessageSquare size={16} className="text-amber-400" /> IA Chat de Insights</h4>
        <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2 py-1 rounded">GPT-Nexus-v4</span>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex-1 bg-[var(--surface)]/30 rounded-xl p-4 min-h-[150px] border border-[var(--border-light)]">
          {isTyping ? (
            <div className="flex gap-1 items-center h-full justify-center">
              <span className="w-1.5 h-1.5 bg-[var(--text-dim)] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-[var(--text-dim)] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-[var(--text-dim)] rounded-full animate-bounce" />
            </div>
          ) : response ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-300 leading-relaxed italic">
              "{response}"
            </motion.p>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Search size={24} className="text-[var(--text-dim)] mb-2" />
              <p className="text-xs text-[var(--text-dim)]">Pergunte algo sobre seus dados para a IA</p>
            </div>
          )}
        </div>

        <form onSubmit={handleAsk} className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Qual o churn do último mês?"
            className="w-full bg-[var(--surface)] border border-[var(--border-light)] rounded-full py-3 px-4 pr-12 text-xs focus:border-[var(--primary)] outline-none"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[var(--primary)] rounded-full text-white">
            <ChevronRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

const PrivacidadeWidget = () => {
  const [isLocal, setIsLocal] = useState(true);

  return (
    <div className="bg-[#0D0D15] rounded-2xl border border-[var(--border-light)] p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h4 className="font-bold text-sm flex items-center gap-2"><Lock size={16} className="text-blue-400" /> Painel de Privacidade</h4>
        <div
          onClick={() => setIsLocal(!isLocal)}
          className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isLocal ? 'bg-emerald-500' : 'bg-gray-600'}`}
        >
          <motion.div
            animate={{ x: isLocal ? 24 : 0 }}
            className="w-4 h-4 bg-white rounded-full"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all ${isLocal ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-gray-500/20'}`}>
          {isLocal ? <Shield size={48} className="text-emerald-500" /> : <Globe size={48} className="text-gray-500" />}
        </div>

        <div className="space-y-2">
          <h5 className="font-bold text-lg">{isLocal ? "Modo 100% Local" : "Modo Nuvem Exposto"}</h5>
          <p className="text-xs text-[var(--text-muted)]">
            {isLocal
              ? "Seus dados estão isolados. Sem tráfego de saída detectado."
              : "Atenção: Os dados estão sendo processados via API externa."}
          </p>
        </div>

        <div className="w-full bg-[var(--surface)] rounded-lg p-3 text-left overflow-hidden">
          <div className="flex gap-2 text-[10px] font-mono mb-2">
            <span className="text-emerald-400">[AUDIT]</span>
            <span className="text-gray-500">Localhost Check...</span>
          </div>
          <div className="flex gap-2 text-[10px] font-mono text-gray-300">
            <span>{isLocal ? "> Outbound: BLOCKED" : "> Outbound: REDIRECT TO CLOUD"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PAGE MAIN ---

const recursosData = [
  {
    id: "analise",
    icon: <Zap size={32} />,
    title: "Análise Instantânea",
    gradient: "from-purple-500 to-indigo-600",
    shortDesc: "Processamento de alta velocidade para grandes volumes de dados.",
    widget: <AnaliseWidget />,
    howToUse: [
      "Acesse o painel 'Dataset Upload'.",
      "Arraste seu arquivo CSV, JSON ou Excel.",
      "Selecione as colunas que deseja analisar.",
      "Clique em 'Processar' e veja os padrões em segundos."
    ],
    technical: "Utiliza motores de inferência otimizados (vLLM) para processar tokens localmente com latência < 20ms."
  },
  {
    id: "privacidade",
    icon: <Shield size={32} />,
    title: "Privacidade Total",
    gradient: "from-blue-500 to-cyan-600",
    shortDesc: "Sua IA, seus dados, sua infraestrutura. Nada sai de casa.",
    widget: <PrivacidadeWidget />,
    howToUse: [
      "Vá em 'Configurações de Segurança'.",
      "Ative o 'Modo Air-Gap' para isolamento total.",
      "Configure o firewall para bloquear conexões externas.",
      "Verifique os logs de auditoria local em tempo real."
    ],
    technical: "Implementação de criptografia AES-256 em repouso e TLS 1.3 em trânsito dentro da sua rede interna."
  },
  {
    id: "integracao",
    icon: <Plug size={32} />,
    title: "Integrações Nativas",
    gradient: "from-emerald-500 to-teal-600",
    shortDesc: "Conecte-se a qualquer banco de dados com cliques, não código.",
    widget: <IntegracaoWidget />,
    howToUse: [
      "Navegue até 'Data Connectors'.",
      "Escolha seu banco (PostgreSQL, MongoDB, MySQL, etc.).",
      "Insira as credenciais (armazenadas em cofre seguro local).",
      "O NexusAI mapeará o esquema automaticamente."
    ],
    technical: "Adaptadores ORM dinâmicos que geram consultas otimizadas sem expor credenciais à aplicação."
  },
  {
    id: "insights",
    icon: <BarChart3 size={32} />,
    title: "Insights Acionáveis",
    gradient: "from-amber-500 to-orange-600",
    shortDesc: "De dados brutos a decisões estratégicas automaticamente.",
    widget: <InsightsWidget />,
    howToUse: [
      "Selecione o relatório desejado (Vendas, Churn, Previsão).",
      "Defina o período de análise.",
      "Escolha o formato de saída (PDF, Dashboard, Notificação).",
      "Receba insights interpretados em linguagem natural."
    ],
    technical: "Modelos de raciocínio lógico que cruzam métricas estatísticas com heurísticas de negócio."
  }
];

export default function RecursosPage() {
  const [activeRecurso, setActiveRecurso] = useState(recursosData[0]);

  return (
    <>
      <main className="min-h-screen pt-20 bg-[#050508]">
        <section className="section !pb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="heading-lg mb-6 tracking-tighter">Central de <span className="gradient-text">Recursos Interativos</span></h1>
            <p className="text-lg text-[var(--text-muted)]">
              Não acredite apenas em palavras. Teste agora os recursos funcionais da NexusAI direto no seu navegador.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {recursosData.map((recurso) => (
              <button
                key={recurso.id}
                onClick={() => setActiveRecurso(recurso)}
                className={`p-4 md:p-6 rounded-2xl border transition-all text-left group relative overflow-hidden ${activeRecurso.id === recurso.id
                  ? "bg-[var(--surface-hover)] border-[var(--primary)] shadow-2xl shadow-primary/20 scale-[1.02]"
                  : "bg-[var(--surface)] border-[var(--border-light)] hover:border-[var(--text-dim)]"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${recurso.gradient} text-white flex items-center justify-center mb-4`}>
                  {recurso.icon}
                </div>
                <h3 className="font-bold text-sm md:text-base mb-1">{recurso.title}</h3>
                <div className="flex items-center text-[var(--text-dim)] text-[10px] font-bold uppercase tracking-wider group-hover:text-[var(--primary-light)]">
                  Simular Agora <ChevronRight size={12} />
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRecurso.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="glass p-6 md:p-12 rounded-[2.5rem] border border-[var(--border-light)] shadow-inner"
            >
              <div className="grid lg:grid-cols-5 gap-12">

                {/* Texto e Guia */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${activeRecurso.gradient} text-white shadow-lg shadow-black/20`}>
                        {activeRecurso.icon}
                      </div>
                      <h2 className="text-3xl font-black tracking-tight">{activeRecurso.title}</h2>
                    </div>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed font-medium">
                      {activeRecurso.shortDesc}
                    </p>
                  </div>

                  <div className="p-6 bg-[var(--surface-hover)]/50 rounded-2xl border border-[var(--border-light)]">
                    <h4 className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[var(--text)] mb-6">
                      <PlayCircle className="text-[var(--primary-light)]" size={18} /> Fluxo de Operação
                    </h4>
                    <ul className="space-y-4">
                      {activeRecurso.howToUse.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-[10px] font-bold mt-0.5">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                    <Terminal size={18} className="text-blue-400" />
                    <p className="text-[10px] font-mono text-blue-400 leading-tight">
                      CONFIG: {activeRecurso.technical}
                    </p>
                  </div>
                </div>

                {/* Widget Interativo (Demo Funcional) */}
                <div className="lg:col-span-3">
                  <div className="relative group h-full">
                    {/* Efeito de brilho atrás do widget */}
                    <div className={`absolute -inset-4 bg-gradient-to-br ${activeRecurso.gradient} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity`} />

                    <div className="relative h-full">
                      {activeRecurso.widget}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </>
  );
}
