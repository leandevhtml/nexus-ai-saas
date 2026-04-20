"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] animate-pulse-glow"
          style={{
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
            animationDelay: "1.5s",
          }}
        />
      </div>

      <div className="section relative z-10 flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h2 className="heading-lg mb-4">
            Pronto para transformar seus dados em{" "}
            <span className="gradient-text">vantagem competitiva</span>?
          </h2>
          <p className="text-body">
            Garanta sua vaga na lista de espera e seja um dos primeiros a ter
            acesso ao NexusAI. Vagas limitadas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <div className="glass p-8 sm:p-10 w-full max-w-lg">
            <WaitlistForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
