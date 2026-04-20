import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Termos de Uso | NexusAI",
  description: "Regras e condições para utilização do nosso site e serviços.",
};

export default function TermsOfUsePage() {
  return (
    <>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
        <div className="mb-12">

          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-500/30">
              <FileText size={24} className="text-blue-400" />
            </div>
            <h1 className="heading-lg">Termos de Uso</h1>
          </div>
          <p className="text-[var(--text-dim)]">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="prose prose-invert max-w-none text-[var(--text-muted)] prose-headings:text-[var(--text)] prose-a:text-[var(--primary)] space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">1. Aceitação dos Termos</h2>
            <p className="leading-relaxed">
              Ao acessar o site do NexusAI e ao se inscrever na nossa lista de espera (Waitlist), você concorda integralmente com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, você não deverá utilizar nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">2. Uso do Serviço (Waitlist)</h2>
            <p className="leading-relaxed mb-2">
              A nossa lista de espera é um mecanismo para conceder acesso antecipado ao produto quando este for lançado. Ao se cadastrar, você entende que:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>O cadastro não garante o acesso imediato à plataforma NexusAI.</li>
              <li>O NexusAI reserva-se o direito de convidar usuários gradualmente para garantir a estabilidade do serviço.</li>
              <li>As informações fornecidas no cadastro devem ser precisas, corretas e verdadeiras.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">3. Propriedade Intelectual</h2>
            <p className="leading-relaxed">
              Todo o conteúdo presente no site do NexusAI, incluindo mas não se limitando a textos, gráficos, logotipos, imagens, clipes de áudio, downloads digitais e compilações de dados, é de propriedade do NexusAI e protegido pelas leis de direitos autorais internacionais e brasileiras.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">4. Limitação de Responsabilidade</h2>
            <p className="leading-relaxed">
              O site é fornecido no estado em que se encontra ("as is"). O NexusAI não garante que o site estará livre de interrupções ou erros, e não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequentes que resultem do uso ou da incapacidade de uso do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">5. Modificações dos Termos</h2>
            <p className="leading-relaxed">
              Podemos revisar estes Termos de Uso a qualquer momento sem aviso prévio. Ao utilizar este site após quaisquer alterações, você concorda em ficar vinculado à versão atual desses Termos de Uso.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
