"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contato" className="section relative">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-black uppercase tracking-[0.3em] text-indigo-500 mb-4 block">Fale Conosco</span>
          <h2 className="heading-lg">Pronto para <span className="gradient-text">escalar sua operação?</span></h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            Nossa equipe de especialistas está pronta para ajudar você a integrar a IA local no seu fluxo de trabalho.
          </p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="glass p-8 border-border-light rounded-[2.5rem] space-y-8">
            <div className="flex gap-6 items-start">
              <div className="p-4 bg-indigo-600/10 rounded-2xl border border-indigo-600/20">
                <Mail className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">E-mail</h4>
                <p className="text-slate-500">contato@nexusai.com.br</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-600/20">
                <Phone className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">WhatsApp</h4>
                <p className="text-slate-500">+55 (11) 99999-9999</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="p-4 bg-emerald-600/10 rounded-2xl border border-emerald-600/20">
                <MapPin className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Endereço</h4>
                <p className="text-slate-500">Av. Paulista, 1000 - São Paulo, SP</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-2">Suporte 24/7</h3>
              <p className="text-indigo-100 text-sm opacity-80">Garantia de resposta em até 2 horas para clientes Enterprise.</p>
            </div>
            <MessageSquare className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="glass p-8 sm:p-10 border-border-light rounded-[2.5rem] space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome</label>
              <input 
                required 
                type="text" 
                placeholder="Seu nome" 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:border-indigo-500 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
              <input 
                required 
                type="email" 
                placeholder="email@empresa.com" 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:border-indigo-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mensagem</label>
            <textarea 
              required 
              rows={4} 
              placeholder="Como podemos ajudar sua empresa?" 
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:border-indigo-500 transition-all outline-none resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="spinner" />
            ) : (
              <>
                Enviar Mensagem
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
