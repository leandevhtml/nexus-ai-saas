import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, BookOpen, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | NexusAI",
  description: "Artigos técnicos, tutoriais de IA e novidades da NexusAI.",
};

const posts = [
  {
    title: "Por que IA On-Premise é o futuro do Enterprise?",
    excerpt: "Neste artigo, exploramos os custos escondidos e os riscos de enviar seus dados para APIs de terceiros.",
    date: "15 Abr 2026",
    category: "Visão de Mercado",
    readTime: "5 min",
  },
  {
    title: "Otimizando a inferência de LLMs com vLLM",
    excerpt: "Um guia técnico de como reduzimos o tempo de resposta em 40% usando paralelismo em lote.",
    date: "02 Abr 2026",
    category: "Engenharia",
    readTime: "8 min",
  },
  {
    title: "Lançamento da v0.9 (Beta Fechado)",
    excerpt: "Estamos felizes em anunciar nossa nova versão, com suporte a RAG nativo e conectores unificados.",
    date: "25 Mar 2026",
    category: "Produto",
    readTime: "3 min",
  },
];

export default function BlogPage() {
  return (
    <>
      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 min-h-[70vh]">
        <div className="mb-16">

          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 flex items-center justify-center border border-fuchsia-500/30">
              <BookOpen size={24} className="text-fuchsia-400" />
            </div>
            <h1 className="heading-lg">Blog NexusAI</h1>
          </div>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Mergulhe no universo da inteligência artificial local. Dicas de engenharia, anúncios de produto e visão de futuro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article key={idx} className="glass rounded-2xl flex flex-col overflow-hidden group hover:border-[var(--primary-light)] transition-colors cursor-pointer">
              {/* Imagem Placeholder de Blog */}
              <div className="h-48 w-full bg-[var(--surface-hover)] border-b border-[var(--border-light)] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-violet-600/20 to-blue-600/20 group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-[var(--primary-light)] font-medium mb-3 uppercase tracking-wider">
                  <span>{post.category}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--primary-light)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-[var(--text-dim)] pt-4 border-t border-[var(--border-light)]">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
