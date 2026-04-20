"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, Book, Code, Terminal, FileJson, CheckCircle2, Server, ShieldCheck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introducao");

  const sections = {
    introducao: {
      title: "Introdução ao NexusAI",
      content: (
        <div className="space-y-6">
          <p className="text-[var(--text-muted)] leading-relaxed">
            O NexusAI Engine é uma plataforma de inteligência artificial de próxima geração, projetada para empresas que não podem ou não querem enviar seus dados para a nuvem pública.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass p-4">
              <h4 className="font-bold flex items-center gap-2 mb-2 text-indigo-400">
                <ShieldCheck size={16} /> 100% Privado
              </h4>
              <p className="text-xs text-[var(--text-dim)]">Seus dados nunca saem da sua infraestrutura local.</p>
            </div>
            <div className="glass p-4">
              <h4 className="font-bold flex items-center gap-2 mb-2 text-blue-400">
                <Server size={16} /> Alta Performance
              </h4>
              <p className="text-xs text-[var(--text-dim)]">Otimizado para rodar em hardware comum com baixa latência.</p>
            </div>
          </div>
        </div>
      ),
    },
    requisitos: {
      title: "Requisitos de Sistema",
      content: (
        <div className="space-y-4">
          <p className="text-[var(--text-muted)]">Para garantir a melhor performance dos modelos LLM, recomendamos o seguinte hardware:</p>
          <ul className="space-y-3">
            {[
              "Mínimo de 16GB RAM (32GB recomendado)",
              "Processador com suporte a AVX2",
              "GPU NVIDIA com 8GB+ VRAM (Opcional, para aceleração)",
              "20GB de espaço em disco para modelos base",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <CheckCircle2 size={16} className="text-emerald-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    docker: {
      title: "Instalação via Docker",
      content: (
        <div className="space-y-6">
          <p className="text-[var(--text-muted)]">A maneira mais rápida de subir o NexusAI é usando o Docker Compose.</p>
          <div className="p-4 rounded-xl bg-[#0d1117] border border-[var(--border-light)] text-sm font-mono text-gray-300 overflow-x-auto">
            <pre>
              <code>
                {`# Baixe o compose
curl -O https://nexusai.io/docker-compose.yml

# Inicie o container
docker-compose up -d`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-[var(--text-dim)] italic">* Certifique-se de ter o Docker Desktop ou Engine instalado na versão 20.10+.</p>
        </div>
      ),
    },
    rag: {
      title: "RAG Pipeline",
      content: (
        <div className="space-y-4">
          <p className="text-[var(--text-muted)]">O Retrieval-Augmented Generation (RAG) permite que a IA consulte seus bancos de dados em tempo real para responder perguntas específicas.</p>
          <div className="p-6 glass border-l-4 border-indigo-500">
            <h4 className="font-bold mb-2">Como configurar:</h4>
            <p className="text-sm text-[var(--text-dim)]">1. Conecte sua fonte de dados no painel.<br/>2. O NexusAI criará índices vetoriais automáticos.<br/>3. A IA usará esses índices para buscar contexto antes de responder.</p>
          </div>
        </div>
      ),
    },
    llms: {
      title: "Configurando LLMs",
      content: (
        <div className="space-y-4">
          <p className="text-[var(--text-muted)]">Suportamos diversos modelos abertos. Você pode alternar entre eles dependendo da tarefa.</p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { name: "Llama 3 (8B)", use: "Geral e Chat" },
              { name: "Mistral v0.3", use: "Raciocínio Lógico" },
              { name: "Codestral", use: "Geração de Código" },
            ].map((m) => (
              <div key={m.name} className="flex justify-between p-3 bg-[var(--surface-hover)] rounded-lg border border-[var(--border-light)]">
                <span className="font-mono text-sm">{m.name}</span>
                <span className="text-xs text-[var(--text-dim)]">{m.use}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  };

  const menu = [
    { id: "introducao", label: "Introdução", group: "Começando" },
    { id: "requisitos", label: "Requisitos de Sistema", group: "Começando" },
    { id: "docker", label: "Instalação via Docker", group: "Começando" },
    { id: "rag", label: "RAG Pipeline", group: "Core Features" },
    { id: "llms", label: "Configurando LLMs", group: "Core Features" },
  ];

  return (
    <>
      <main className="flex-1 max-w-6xl mx-auto px-6 py-20 min-h-screen">
        <div className="mb-12 border-b border-[var(--border-light)] pb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center border border-indigo-500/30">
              <Book size={24} className="text-indigo-400" />
            </div>
            <h1 className="heading-lg">Documentação</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {/* Menu Lateral */}
          <aside className="col-span-1">
            <nav className="sticky top-24 space-y-8">
              {["Começando", "Core Features"].map((group) => (
                <div key={group}>
                  <h4 className="font-black text-[10px] text-[var(--text-dim)] mb-4 uppercase tracking-[0.2em]">{group}</h4>
                  <ul className="space-y-2">
                    {menu
                      .filter((m) => m.group === group)
                      .map((item) => (
                        <li
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all text-sm ${
                            activeSection === item.id
                              ? "bg-[var(--primary)]/10 text-[var(--primary-light)] font-bold border border-[var(--primary)]/20 shadow-lg shadow-primary/5"
                              : "text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
                          }`}
                        >
                          {item.label}
                          {activeSection === item.id && <ChevronRight size={14} />}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Conteúdo Principal */}
          <div className="col-span-1 md:col-span-3 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="glass p-8 md:p-12 rounded-3xl border border-[var(--border-light)]"
              >
                <h2 className="text-3xl font-bold text-[var(--text)] mb-8 tracking-tight">
                  {sections[activeSection as keyof typeof sections].title}
                </h2>
                <div className="prose prose-invert max-w-none">
                  {sections[activeSection as keyof typeof sections].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
