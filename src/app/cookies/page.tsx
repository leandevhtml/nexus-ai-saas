import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, Cookie } from "lucide-react";

export const metadata = {
  title: "Política de Cookies | NexusAI",
  description: "Entenda como e por que utilizamos cookies no nosso site.",
};

export default function CookiesPolicyPage() {
  return (
    <>
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
        <div className="mb-12">

          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
              <Cookie size={24} className="text-amber-400" />
            </div>
            <h1 className="heading-lg">Política de Cookies</h1>
          </div>
          <p className="text-[var(--text-dim)]">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="prose prose-invert max-w-none text-[var(--text-muted)] prose-headings:text-[var(--text)] prose-a:text-[var(--primary)] space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">1. O que são Cookies?</h2>
            <p className="leading-relaxed">
              Cookies são pequenos arquivos de texto que os sites salvam no seu computador ou dispositivo móvel quando você os visita. Eles permitem que o site se lembre das suas ações e preferências (como login, idioma, tamanho da fonte e outras preferências de exibição) ao longo do tempo, para que você não precise reinseri-los sempre que retornar ao site ou navegar de uma página para outra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">2. Como utilizamos os Cookies?</h2>
            <p className="leading-relaxed mb-2">
              No NexusAI, utilizamos cookies com objetivos estritamente focados na sua experiência e segurança. Nossos cookies se dividem nas seguintes categorias:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site. Por exemplo, utilizamos um cookie para lembrar se você já aceitou o nosso banner de privacidade (<code>nexusai_cookie_consent</code>), para não exibi-lo novamente.</li>
              <li><strong>Cookies Analíticos:</strong> Utilizamos ferramentas de analytics para entender de forma anônima como os visitantes interagem com nossa Landing Page. Isso nos ajuda a melhorar nosso produto e a experiência de uso. Nenhuma informação de identificação pessoal é rastreada ou vendida a terceiros.</li>
              <li><strong>Cookies de Segurança:</strong> Auxiliam na proteção do nosso site e da nossa API de submissão de leads contra abusos, como ataques de negação de serviço e SPAM.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">3. Gerenciamento e Preferências</h2>
            <p className="leading-relaxed">
              Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão no seu computador e pode configurar a maioria dos navegadores para evitar que eles sejam colocados. No entanto, se você fizer isso, talvez tenha que ajustar manualmente algumas preferências sempre que visitar o site e alguns serviços e funcionalidades poderão não funcionar corretamente.
            </p>
            <p className="leading-relaxed mt-4">
              Para instruções específicas sobre como gerenciar cookies em seu navegador, você pode acessar os menus de configurações de "Privacidade e Segurança" ou "Histórico" de navegadores populares como Google Chrome, Mozilla Firefox, Apple Safari e Microsoft Edge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">4. Alterações nesta Política</h2>
            <p className="leading-relaxed">
              Reservamo-nos o direito de alterar esta Política de Cookies a qualquer momento. Qualquer alteração entrará em vigor imediatamente após a publicação da política revisada neste site. Recomendamos que você revise esta página periodicamente para se manter informado sobre nosso uso de cookies.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
