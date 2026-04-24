"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Plug, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: <Zap size={28} />,
    title: "Análise Instantânea",
    description:
      "Nossa IA processa grandes volumes de dados em segundos, identificando padrões que levariam horas para encontrar manualmente.",
    gradient: "from-[#7C3AED] to-[#A78BFA]",
  },
  {
    icon: <Shield size={28} />,
    title: "Privacidade Total",
    description:
      "Modelos LLM rodam 100% no seu ambiente. Seus dados nunca saem da sua infraestrutura. Zero envio para nuvem.",
    gradient: "from-[#3B82F6] to-[#60A5FA]",
  },
  {
    icon: <Plug size={28} />,
    title: "Integrações Nativas",
    description:
      "Conecte qualquer fonte de dados — SQL, NoSQL, APIs, planilhas — com conectores prontos e configuração em minutos.",
    gradient: "from-[#06B6D4] to-[#22D3EE]",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Insights Acionáveis",
    description:
      "Relatórios gerados por IA com recomendações claras e prontas para decisão. De dados brutos a ação em poucos cliques.",
    gradient: "from-[#8B5CF6] to-[#C084FC]",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function Features() {
  return (
    <section id="features" className="relative ambient-glow">
      <div className="section">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-4 block">
            Recursos
          </span>
          <h2 className="heading-lg">
            Tudo que você precisa para{" "}
            <span className="gradient-text">dominar seus dados</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            Uma plataforma completa que combina o poder de modelos de IA
            avançados com a segurança de execução local.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid-universal"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="feature-card group"
              variants={cardVariants}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              <h3 className="heading-md text-[var(--text)] mb-3">
                {feature.title}
              </h3>

              <p className="text-[var(--text-muted)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
