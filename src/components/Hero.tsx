"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToCTA = () => {
    const el = document.getElementById("waitlist");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section relative z-10 flex flex-col items-center text-center gap-8 pt-32 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle text-sm font-medium text-primary-light">
            <Sparkles size={14} className="text-[var(--accent)]" />
            Modelos de IA 100% locais — Privacidade garantida
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="heading-xl max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Transforme dados em{" "}
          <span className="gradient-text">decisões inteligentes</span>{" "}
          com IA local
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-body max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          O NexusAI processa seus dados com modelos de linguagem que rodam
          inteiramente no seu ambiente. Sem enviar dados para nuvem. Sem
          preocupações com privacidade. Insights em segundos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          <button
            onClick={scrollToCTA}
            className="btn-primary text-lg px-8 py-4"
            id="hero-cta-primary"
          >
            Entrar na Lista de Espera
            <ArrowRight size={18} />
          </button>
          <a href="#features" className="btn-secondary text-lg px-8 py-4">
            Saiba Mais
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-[var(--border-light)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { value: "+500", label: "Empresas na fila" },
            { value: "10x", label: "Mais rápido" },
            { value: "100%", label: "Privacidade" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
