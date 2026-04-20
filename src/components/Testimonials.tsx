"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Marina Silva",
    role: "Head de Data Science",
    company: "TechVentures",
    avatar: "MS",
    quote:
      "O NexusAI reduziu nosso tempo de análise de dados de horas para minutos. E o melhor: sem precisar enviar dados sensíveis para fora da empresa.",
    rating: 5,
  },
  {
    name: "Carlos Mendes",
    role: "CTO",
    company: "DataFlow Startup",
    avatar: "CM",
    quote:
      "Finalmente uma plataforma de IA que leva privacidade a sério. Nossos clientes confiam mais em nós desde que adotamos o NexusAI.",
    rating: 5,
  },
  {
    name: "Ana Rodrigues",
    role: "Product Manager",
    company: "InnovateLab",
    avatar: "AR",
    quote:
      "A integração foi surpreendentemente simples. Em menos de um dia já tínhamos insights acionáveis do nosso banco de dados principal.",
    rating: 5,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative">
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
            Depoimentos
          </span>
          <h2 className="heading-lg">
            O que dizem sobre o{" "}
            <span className="gradient-text">NexusAI</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="testimonial-card flex flex-col justify-between hover:border-[rgba(124,58,237,0.3)] transition-all duration-400"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Quote icon */}
              <div>
                <Quote
                  size={28}
                  className="text-[var(--primary)] opacity-40 mb-4"
                />
                <p className="text-[var(--text)] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-light)]">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--text)] truncate">
                    {t.name}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] truncate">
                    {t.role}, {t.company}
                  </p>
                </div>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
