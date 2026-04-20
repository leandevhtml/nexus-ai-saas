import Link from "next/link";
import { Globe, MessageCircle, Users, ShieldCheck, Database, Server, Lock } from "lucide-react";

const footerLinks = {
  Produto: [
    { name: "Recursos", href: "/recursos" },
    { name: "Preços", href: "/precos" },
    { name: "Documentação", href: "/docs" },
    { name: "Changelog", href: "/changelog" },
  ],
  Empresa: [
    { name: "Sobre", href: "/sobre" },
    { name: "Blog", href: "/blog" },
    { name: "Carreiras", href: "/carreiras" },
    { name: "Contato", href: "/contato" },
  ],
  Legal: [
    { name: "Política de Privacidade", href: "/privacidade" },
    { name: "Termos de Uso", href: "/termos" },
    { name: "Cookies", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: <Globe size={18} />, href: "/", label: "Website", external: false },
  { icon: <MessageCircle size={18} />, href: "https://discord.com", label: "Community", external: true },
  { icon: <Users size={18} />, href: "https://github.com", label: "Team", external: true },
];

const techBadges = [
  { icon: <Server size={14} />, name: "Powered by Next.js & Vercel" },
  { icon: <Database size={14} />, name: "MongoDB Atlas" },
  { icon: <Lock size={14} />, name: "Conexão Criptografada SSL" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--surface)]">
      <div className="section !py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-xl font-bold gradient-text mb-3">NexusAI</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              Análise de dados inteligente com IA local. Privacidade e performance em primeiro lugar.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-[10px] text-[var(--text)] mb-3 uppercase tracking-[0.1em]">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-[var(--text-dim)] hover:text-[var(--primary-light)] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Social, Seals, Copyright */}
        <div className="pt-6 border-t border-[var(--border-light)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <p className="text-[10px] text-[var(--text-dim)] whitespace-nowrap">
              © {new Date().getFullYear()} NexusAI
            </p>
            <div className="h-4 w-px bg-[var(--border-light)] hidden sm:block" />
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-[var(--text-dim)] hover:text-[var(--primary-light)] transition-colors"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Compact Seals */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: <ShieldCheck size={12} />, name: "LGPD" },
              { icon: <Lock size={12} />, name: "SSL" },
              { icon: <Server size={12} />, name: "LOCAL" },
              { icon: <Globe size={12} />, name: "GDPR" },
            ].map((seal) => (
              <div key={seal.name} className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--background)]/50 border border-[var(--border-light)] text-[9px] font-bold text-[var(--text-dim)]">
                {seal.icon}
                {seal.name}
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[var(--text-dim)] font-medium">
            🔒 Dados 100% Protegidos
          </p>
        </div>
      </div>
    </footer>
  );
}
