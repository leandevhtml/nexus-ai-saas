"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-2xl max-h-[85vh] flex flex-col glass overflow-hidden rounded-2xl shadow-2xl border border-[var(--primary)]/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-light)] bg-[var(--surface)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FileText size={20} className="text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-[var(--text)]">Termos de Uso</h2>
              </div>
              <button
                onClick={onClose}
                className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar bg-[var(--background)]/50 text-sm text-[var(--text-muted)] space-y-4">
              <p>Ao se inscrever na lista de espera do NexusAI, você concorda com as seguintes condições:</p>
              
              <h3 className="text-[var(--text)] font-semibold mt-4">1. Coleta de Dados</h3>
              <p>Os dados fornecidos (nome e e-mail) serão utilizados unicamente para comunicar você sobre o lançamento e atualizações relacionadas ao nosso produto.</p>

              <h3 className="text-[var(--text)] font-semibold mt-4">2. Segurança e LGPD</h3>
              <p>Nós armazenamos seus dados de forma segura utilizando as melhores práticas (criptografia e proteção DDoS). Em conformidade com a LGPD, você pode pedir a exclusão dos seus dados da nossa lista de espera a qualquer momento.</p>

              <h3 className="text-[var(--text)] font-semibold mt-4">3. Não Garantia de Acesso</h3>
              <p>A entrada na lista de espera demonstra interesse, mas não garante acesso imediato ou licença de uso gratuita da plataforma assim que ela for lançada publicamente.</p>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[var(--border-light)] bg-[var(--surface)] flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onAccept();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all"
              >
                Li e Concordo
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
