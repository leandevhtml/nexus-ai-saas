import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Política de Privacidade | NexusAI",
  description: "Entenda como protegemos seus dados e sua privacidade.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
        <div className="mb-12">

          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30">
              <Shield size={24} className="text-emerald-400" />
            </div>
            <h1 className="heading-lg">Política de Privacidade</h1>
          </div>
          <p className="text-[var(--text-dim)]">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="prose prose-invert max-w-none text-[var(--text-muted)] prose-headings:text-[var(--text)] prose-a:text-[var(--primary)] space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">1. Introdução</h2>
            <p className="leading-relaxed">
              No NexusAI, a sua privacidade e a segurança dos seus dados são a nossa maior prioridade. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos as suas informações quando você utiliza nosso site e entra em nossa lista de espera.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">2. Coleta de Dados</h2>
            <p className="leading-relaxed mb-2">Para a nossa lista de espera (Waitlist), coletamos os seguintes dados essenciais:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nome:</strong> Para podermos nos referir a você de forma personalizada.</li>
              <li><strong>Endereço de E-mail:</strong> Para enviar notificações sobre o lançamento e atualizações do NexusAI.</li>
              <li><strong>Dados de Navegação:</strong> Informações anônimas de Analytics para melhorar a experiência do nosso site, utilizando cookies essenciais.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">3. Como Usamos Seus Dados</h2>
            <p className="leading-relaxed">
              O NexusAI não vende, aluga ou comercializa seus dados pessoais. Utilizamos seu e-mail exclusivamente para comunicá-lo sobre o produto e fornecer acesso antecipado. Nossos formulários utilizam criptografia de ponta a ponta, e os dados são armazenados de forma segura utilizando as melhores práticas do mercado no MongoDB Atlas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">4. Em Conformidade com a LGPD</h2>
            <p className="leading-relaxed">
              Nossa operação está integralmente adequada à Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018). Você tem o direito de:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Solicitar a exclusão total do seu e-mail de nossa base de dados a qualquer momento.</li>
              <li>Saber exatamente quais dados temos armazenados sobre você.</li>
              <li>Corrigir dados que estejam incorretos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">5. Contato</h2>
            <p className="leading-relaxed">
              Se você tiver dúvidas sobre nossa Política de Privacidade ou deseja exercer os seus direitos sob a LGPD, entre em contato conosco através do nosso e-mail de suporte.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
