import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, GitCommit, Sparkles, Bug, Wrench } from "lucide-react";

export const metadata = {
  title: "Changelog | NexusAI",
  description: "Acompanhe todas as atualizações e melhorias da nossa plataforma.",
};

const changelog = [
  {
    version: "v0.9.0-beta",
    date: "10 de Abril de 2026",
    title: "Suporte a Modelos de 70B e Nova API RAG",
    items: [
      { type: "feature", icon: <Sparkles size={16} className="text-emerald-400"/>, text: "Lançamento da nova API nativa de RAG (Retrieval-Augmented Generation)." },
      { type: "feature", icon: <Sparkles size={16} className="text-emerald-400"/>, text: "Suporte oficial a modelos grandes (Llama 3 70B) usando quantização AWQ." },
      { type: "fix", icon: <Bug size={16} className="text-amber-400"/>, text: "Correção no vazamento de memória do container Docker durante conexões persistentes." },
    ]
  },
  {
    version: "v0.8.5-beta",
    date: "25 de Março de 2026",
    title: "Otimização de GPU e Novos Conectores",
    items: [
      { type: "feature", icon: <Sparkles size={16} className="text-emerald-400"/>, text: "Adicionado suporte nativo a MongoDB Atlas e AWS DocumentDB." },
      { type: "improvement", icon: <Wrench size={16} className="text-blue-400"/>, text: "Aumento de 40% na velocidade de inferência via vLLM." },
      { type: "fix", icon: <Bug size={16} className="text-amber-400"/>, text: "Tratamento de erro aprimorado para timeouts em bancos de dados de leitura." },
    ]
  },
  {
    version: "v0.8.0-beta",
    date: "05 de Março de 2026",
    title: "Início do Beta Privado",
    items: [
      { type: "feature", icon: <Sparkles size={16} className="text-emerald-400"/>, text: "Release inicial com suporte a PostgreSQL e inferência de modelos locais de até 8B." },
      { type: "feature", icon: <Sparkles size={16} className="text-emerald-400"/>, text: "Dashboard de monitoramento seguro." },
    ]
  }
];

export default function ChangelogPage() {
  return (
    <>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
        <div className="mb-16">

          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center border border-teal-500/30">
              <GitCommit size={24} className="text-teal-400" />
            </div>
            <h1 className="heading-lg">Changelog</h1>
          </div>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Acompanhe o ritmo do nosso desenvolvimento. Novas features, melhorias de performance e correções de bugs.
          </p>
        </div>

        <div className="relative border-l border-[var(--border-light)] ml-4 md:ml-6 pb-4">
          {changelog.map((log, idx) => (
            <div key={idx} className="mb-16 ml-8 relative">
              {/* Dot */}
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-[var(--surface)] border-4 border-[var(--primary)] shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <span className="text-sm font-bold bg-[var(--surface)] px-3 py-1 rounded-md border border-[var(--border-light)] text-[var(--text)] w-max">
                  {log.version}
                </span>
                <span className="text-sm text-[var(--text-muted)]">{log.date}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-[var(--text)] mb-6">{log.title}</h2>
              
              <div className="glass p-6 rounded-2xl space-y-4">
                {log.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 bg-[var(--background)] p-1.5 rounded-md border border-[var(--border-light)]">
                      {item.icon}
                    </div>
                    <p className="text-[var(--text-dim)] leading-relaxed text-sm md:text-base">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
