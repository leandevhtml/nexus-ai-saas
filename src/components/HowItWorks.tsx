"use client";

import { motion } from "framer-motion";
import { Upload, Brain, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: <Upload size={24} />,
    title: "Conecte seus dados",
    description:
      "Importe dados de qualquer fonte — bancos de dados, APIs, planilhas ou arquivos CSV — com um único clique.",
  },
  {
    number: "02",
    icon: <Brain size={24} />,
    title: "IA analisa automaticamente",
    description:
      "Nossos modelos de linguagem identificam padrões, anomalias e tendências nos seus dados de forma autônoma.",
  },
  {
    number: "03",
    icon: <TrendingUp size={24} />,
    title: "Receba insights acionáveis",
    description:
      "Relatórios claros e prontos para decisão, com recomendações baseadas em dados reais do seu negócio.",
  },
];

const stepVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative">
      <div className="section">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-4 block">
            Como Funciona
          </span>
          <h2 className="heading-lg">
            De dados brutos a{" "}
            <span className="gradient-text-accent">insights em 3 passos</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--secondary)] to-transparent hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex gap-6 md:gap-8 items-start relative"
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Number circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[var(--primary)]/20">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="feature-card flex-1 !p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[var(--accent)]">{step.icon}</span>
                    <h3 className="heading-md text-[var(--text)]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
