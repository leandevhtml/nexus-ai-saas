"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("nexusai_cookie_consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("nexusai_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handlePreferences = () => {
    // In a real scenario, this would open a modal with detailed cookie settings
    localStorage.setItem("nexusai_cookie_consent", "preferences_set");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto glass shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-2xl border border-[var(--primary)]/20 bg-[var(--surface)]/95">
            
            <div className="flex items-start md:items-center gap-4 flex-1">
              <div className="hidden md:flex p-3 bg-emerald-500/10 rounded-full">
                <ShieldAlert size={24} className="text-emerald-500" />
              </div>
              <div>
                <h4 className="text-[var(--text)] font-semibold text-sm md:text-base mb-1">
                  Sua privacidade é nossa prioridade
                </h4>
                <p className="text-[var(--text-dim)] text-xs md:text-sm leading-relaxed">
                  Utilizamos cookies essenciais para garantir que você tenha a melhor experiência em nossa plataforma, além de cookies analíticos para entender como você interage com nosso site. Seus dados estão protegidos sob a LGPD.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
              <button
                onClick={handlePreferences}
                className="flex-1 md:flex-none text-xs md:text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] px-4 py-2.5 rounded-xl border border-[var(--border-light)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                Preferências
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none text-xs md:text-sm font-semibold text-[var(--background)] bg-emerald-500 hover:bg-emerald-400 px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
              >
                Aceitar e Continuar
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text)]"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
