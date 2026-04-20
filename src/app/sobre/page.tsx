import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, Building2, Target, Eye, Heart } from "lucide-react";

export const metadata = {
  title: "Sobre a Empresa | NexusAI",
  description: "Conheça a missão e a equipe por trás da plataforma que está revolucionando a análise de dados local.",
};

export default function SobrePage() {
  return (
    <>
      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 min-h-[70vh]">
        <div className="mb-16">

          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center border border-indigo-500/30">
              <Building2 size={24} className="text-indigo-400" />
            </div>
            <h1 className="heading-lg">Sobre a NexusAI</h1>
          </div>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Estamos construindo a próxima geração de inteligência artificial corporativa: rápida, inteligente e 100% focada na privacidade dos seus dados.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="glass p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
              <Target size={24} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text)]">Nossa Missão</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Democratizar o acesso a modelos de IA de alta capacidade sem que as empresas precisem comprometer a segurança ou a privacidade dos seus dados sensíveis.
            </p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
              <Eye size={24} className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text)]">Nossa Visão</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Um mundo onde toda infraestrutura de dados possui uma camada analítica inteligente nativa, operando na borda (edge) e com custo previsível.
            </p>
          </div>
          <div className="glass p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
              <Heart size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--text)]">Nossos Valores</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Transparência radical em nosso código, obsessão por performance, e respeito absoluto pela infraestrutura do cliente.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="heading-md mb-6">A Jornada</h2>
          <div className="prose prose-invert max-w-none text-[var(--text-muted)] leading-relaxed space-y-6">
            <p>
              A NexusAI nasceu da frustração coletiva de engenheiros e cientistas de dados ao lidarem com APIs lentas e termos de privacidade abusivos. Sabíamos que, com os avanços recentes em compressão de modelos e otimização de inferência, seria possível levar a inteligência para onde os dados já moram.
            </p>
            <p>
              Hoje, operamos de forma distribuída, com talentos espalhados pelo Brasil e pelo mundo, focados em um único objetivo: devolver o poder da Inteligência Artificial às próprias empresas, cortando o intermediário e blindando vazamentos de informações.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
