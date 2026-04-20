import Link from "next/link";
import Footer from "@/components/Footer";
import { ArrowLeft, Mail, PhoneCall, MapPin, Send } from "lucide-react";

export const metadata = {
  title: "Contato | NexusAI",
  description: "Fale com o nosso time de especialistas.",
};

export default function ContatoPage() {
  return (
    <>
      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 min-h-[70vh]">
        <div className="mb-16">

          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
              <PhoneCall size={24} className="text-cyan-400" />
            </div>
            <h1 className="heading-lg">Fale Conosco</h1>
          </div>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Dúvidas sobre o lançamento? Quer conversar sobre integrações complexas? Nossa equipe técnica está pronta para ajudar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Informações */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-[var(--text)]">Nossos Canais</h2>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[var(--surface)] border border-[var(--border-light)] rounded-xl mt-1">
                <Mail size={20} className="text-[var(--primary-light)]" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text)] mb-1">Suporte e Vendas</h4>
                <p className="text-sm text-[var(--text-muted)] mb-2">Respondemos em até 24 horas úteis.</p>
                <a href="mailto:hello@nexusai.com" className="text-sm font-medium text-[var(--primary-light)] hover:underline">hello@nexusai.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[var(--surface)] border border-[var(--border-light)] rounded-xl mt-1">
                <MapPin size={20} className="text-[var(--primary-light)]" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text)] mb-1">Sede (Hub)</h4>
                <p className="text-sm text-[var(--text-muted)]">São Paulo, SP - Brasil<br/>Av. Paulista, 1000 - Bela Vista</p>
              </div>
            </div>
          </div>

          {/* Formulário (UI Mock) */}
          <div className="glass p-8 rounded-2xl relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-6">Envie uma Mensagem</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Nome</label>
                  <input type="text" className="form-input bg-[var(--background)]/50 border-[var(--border-light)]" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Email</label>
                  <input type="email" className="form-input bg-[var(--background)]/50 border-[var(--border-light)]" placeholder="você@empresa.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Mensagem</label>
                <textarea className="form-input bg-[var(--background)]/50 border-[var(--border-light)] min-h-[120px] resize-none" placeholder="Como podemos te ajudar?"></textarea>
              </div>
              <button type="button" className="btn-primary w-full mt-2">
                Enviar Mensagem <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
