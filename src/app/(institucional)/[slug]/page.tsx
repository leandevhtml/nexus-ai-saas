import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, Construction } from "lucide-react";
import { notFound } from "next/navigation";

// Lista das rotas válidas para evitar criar páginas dinâmicas de URLs inválidas
const validSlugs = [
  "precos",
  "docs",
  "changelog",
  "sobre",
  "blog",
  "carreiras",
  "contato",
  "privacidade",
  "termos",
  "cookies",
];

const titles: Record<string, string> = {
  precos: "Preços",
  docs: "Documentação",
  changelog: "Changelog",
  sobre: "Sobre a Empresa",
  blog: "Blog",
  carreiras: "Carreiras",
  contato: "Contato",
  privacidade: "Política de Privacidade",
  termos: "Termos de Uso",
  cookies: "Política de Cookies",
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function InstitucionalPage({ params }: PageProps) {
  const { slug } = await params;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const title = titles[slug];

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] section">


        <div className="flex flex-col items-center text-center max-w-2xl mt-16">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-8 border border-[var(--border)]">
            <Construction size={40} className="text-[var(--primary-light)]" />
          </div>
          
          <h1 className="heading-lg mb-6">{title}</h1>
          
          <p className="text-body mb-8">
            Nossa página de <strong className="text-[var(--text)]">{title.toLowerCase()}</strong> está atualmente em desenvolvimento profundo. 
            Nossa equipe de engenharia está focada em trazer a melhor experiência possível. 
            Em breve todas as informações estarão disponíveis aqui.
          </p>

          <Link href="/" className="btn-primary">
            Retornar ao NexusAI
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
