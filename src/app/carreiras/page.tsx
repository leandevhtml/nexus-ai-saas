import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, Rocket, MapPin, Laptop, MoveRight } from "lucide-react";

export const metadata = {
  title: "Carreiras | NexusAI",
  description: "Junte-se à revolução da IA local. Vagas abertas.",
};

const jobs = [
  { role: "Senior Machine Learning Engineer", type: "Tempo Integral", location: "Remoto (Brasil)" },
  { role: "Fullstack Developer (Next.js)", type: "Tempo Integral", location: "Remoto (Brasil)" },
  { role: "Product Designer", type: "Tempo Integral", location: "Híbrido (São Paulo)" },
];

export default function CarreirasPage() {
  return (
    <>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
        <div className="mb-16">

          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
              <Rocket size={24} className="text-amber-400" />
            </div>
            <h1 className="heading-lg">Carreiras</h1>
          </div>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed mb-8">
            Estamos sempre em busca de pessoas obcecadas por dados, design e inteligência artificial. Venha construir o futuro conosco.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-[var(--text)]">Por que trabalhar aqui?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-2xl">
              <Laptop size={20} className="text-[var(--primary-light)] mb-4" />
              <h3 className="font-semibold text-lg mb-2">Remote-First</h3>
              <p className="text-sm text-[var(--text-muted)]">Nossa equipe está espalhada, mas super conectada. Trabalhe de onde quiser, com auxílio home-office completo.</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <MapPin size={20} className="text-emerald-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Impacto Real</h3>
              <p className="text-sm text-[var(--text-muted)]">Nada de burocracia corporativa. Aqui você propõe uma ideia hoje e ela está em produção na semana seguinte.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-8 text-[var(--text)]">Vagas Abertas</h2>
          <div className="flex flex-col gap-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[var(--primary-light)] transition-colors cursor-pointer">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--primary-light)] transition-colors mb-2">{job.role}</h3>
                  <div className="flex items-center gap-3 text-sm text-[var(--text-dim)]">
                    <span className="bg-[var(--surface-hover)] px-2.5 py-1 rounded-md">{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm font-medium text-[var(--text)] bg-[var(--surface-hover)] hover:bg-[var(--primary)] px-4 py-2.5 rounded-xl transition-colors">
                  Candidatar-se <MoveRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
