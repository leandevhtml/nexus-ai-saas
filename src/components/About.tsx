"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Shield } from "lucide-react";

const pillars = [
  {
    icon: <Target className="w-8 h-8 text-indigo-500" />,
    title: "Nossa Missão",
    description: "Democratizar o acesso a modelos de inteligência artificial avançados, garantindo que empresas de todos os tamanhos possam inovar com total privacidade e controle sobre seus dados."
  },
  {
    icon: <Eye className="w-8 h-8 text-blue-500" />,
    title: "Nossa Visão",
    description: "Ser a principal infraestrutura de IA local do Brasil, tornando o processamento on-premise o padrão de segurança e performance para o mercado corporativo."
  },
  {
    icon: <Heart className="w-8 h-8 text-rose-500" />,
    title: "Nossos Valores",
    description: "Privacidade em primeiro lugar, transparência total nos modelos e excelência técnica. Acreditamos que a tecnologia deve servir ao usuário, e não o contrário."
  }
];

export default function About() {
  return (
    <section id="sobre" className="section relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
      
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Text Content */}
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-black uppercase tracking-[0.3em] text-indigo-500 mb-4 block">Sobre a NexusAI</span>
            <h2 className="heading-lg mb-6">Inovação com <span className="gradient-text">Privacidade Absoluta</span></h2>
            <p className="text-body text-slate-400">
              A NexusAI nasceu da necessidade de unir o poder transformador das IAs Generativas com a segurança rigorosa que o mercado brasileiro exige. 
              Diferente de soluções em nuvem, nossa tecnologia permite que sua empresa utilize o que há de mais moderno em LLMs sem nunca expor um único byte de informação sensível.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 glass border-border-light rounded-3xl">
              <h4 className="text-2xl font-bold text-white mb-2">100%</h4>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Execução Local</p>
            </div>
            <div className="p-6 glass border-border-light rounded-3xl">
              <h4 className="text-2xl font-bold text-white mb-2">Zero</h4>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Vazamento de Dados</p>
            </div>
          </div>
        </div>

        {/* Pillars Cards */}
        <div className="flex-1 grid gap-6 w-full">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 glass-subtle border-border-light rounded-[2.5rem] flex gap-6 hover:border-indigo-500/30 transition-all group"
            >
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform h-fit">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
