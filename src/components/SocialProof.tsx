"use client";

import { motion } from "framer-motion";

const logos = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Stark Tech",
  "Cyberdyne",
  "Oscorp",
  "Wayne Co",
];

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-8 py-3 mx-4 opacity-40 hover:opacity-70 transition-opacity duration-300">
      <span className="text-lg font-semibold tracking-wider text-[var(--text-muted)] whitespace-nowrap select-none">
        {name}
      </span>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="relative py-16 border-y border-[var(--border-light)]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <p className="text-sm font-medium text-[var(--text-dim)] uppercase tracking-widest">
          Confiado por empresas inovadoras
        </p>
      </motion.div>

      <div className="overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none" />

        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, i) => (
            <LogoItem key={`${logo}-${i}`} name={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
