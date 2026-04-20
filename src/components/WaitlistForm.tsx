"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TermsModal from "./TermsModal";

// Create a specific schema for the form (without backend-only fields)
const FormSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome contém caracteres inválidos"),
  email: z
    .string()
    .email("Email inválido")
    .max(254, "Email muito longo"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar os Termos de Uso",
  }),
});

type FormData = z.infer<typeof FormSchema>;

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function WaitlistForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState("");
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields, isValidating },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange", // Enable real-time validation
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    setFormStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome.trim(),
          email: data.email.trim().toLowerCase(),
        }),
      });

      if (res.ok) {
        setFormStatus("success");
        return;
      }

      const responseData = await res.json().catch(() => null);

      if (res.status === 409) {
        setServerError("Este email já está na lista de espera.");
      } else if (res.status === 429) {
        setServerError("Muitas tentativas. Aguarde um momento.");
      } else if (res.status === 400 && responseData?.errors) {
        setServerError("Por favor, corrija os erros no formulário.");
      } else {
        setServerError("Ocorreu um erro. Tente novamente.");
      }
      setFormStatus("error");
    } catch {
      setServerError("Falha de conexão. Verifique sua internet.");
      setFormStatus("error");
    }
  };

  if (formStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 py-8"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <h3 className="heading-md text-center text-emerald-400">Você está na lista! 🎉</h3>
        <p className="text-[var(--text-muted)] text-center max-w-md">
          Obrigado por se inscrever. Vamos notificá-lo assim que o NexusAI
          estiver disponível.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4" noValidate>
      {/* Nome */}
      <div>
        <input
          type="text"
          id="waitlist-nome"
          placeholder="Seu nome"
          {...register("nome")}
          className={`form-input transition-colors ${
            errors.nome ? "error" : dirtyFields.nome && !isValidating ? "success" : ""
          }`}
          disabled={formStatus === "submitting"}
          autoComplete="name"
        />
        <AnimatePresence>
          {errors.nome && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm mt-1 flex items-center gap-1"
            >
              <AlertCircle size={14} /> {errors.nome.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          id="waitlist-email"
          placeholder="Seu melhor email"
          {...register("email")}
          className={`form-input transition-colors ${
            errors.email ? "error" : dirtyFields.email && !isValidating ? "success" : ""
          }`}
          disabled={formStatus === "submitting"}
          autoComplete="email"
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm mt-1 flex items-center gap-1"
            >
              <AlertCircle size={14} /> {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Checkbox Termos de Uso */}
      <div>
        <div className="flex items-start gap-3 group">
          <div className="relative flex items-start mt-1 cursor-pointer">
            <input
              id="terms-checkbox"
              type="checkbox"
              {...register("termsAccepted")}
              className="peer appearance-none w-4 h-4 border border-[var(--border-light)] rounded bg-[var(--surface)] checked:bg-[var(--primary)] checked:border-[var(--primary)] transition-all cursor-pointer"
            />
            <CheckCircle2 size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <span className="text-sm text-[var(--text-muted)] leading-tight">
            <label htmlFor="terms-checkbox" className="cursor-pointer">Eu li e concordo com os </label>
            <button
              type="button"
              onClick={() => setIsTermsModalOpen(true)}
              className="text-[var(--primary-light)] hover:text-[var(--primary)] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>{" "}
            <label htmlFor="terms-checkbox" className="cursor-pointer">e com a Política de Privacidade.</label>
          </span>
        </div>
        <AnimatePresence>
          {errors.termsAccepted && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-sm mt-1 flex items-center gap-1"
            >
              <AlertCircle size={14} /> {errors.termsAccepted.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Server error */}
      <AnimatePresence>
        {serverError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-amber-400 text-sm bg-amber-400/10 px-4 py-3 rounded-xl"
          >
            <AlertCircle size={16} /> {serverError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        id="waitlist-submit"
        disabled={formStatus === "submitting"}
        className="btn-primary w-full !py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none relative"
      >
        {formStatus === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Processando seguro...
          </>
        ) : (
          <>
            <Lock size={16} className="text-emerald-400 mr-1" />
            Garantir minha vaga
            <Send size={16} />
          </>
        )}
      </button>

      {/* Security Microcopy */}
      <p className="text-xs text-center text-[var(--text-dim)] flex items-center justify-center gap-1.5 mt-2">
        <Lock size={12} className="text-emerald-500" />
        Seus dados são criptografados de ponta a ponta. Não compartilhamos suas informações.
      </p>

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => setValue("termsAccepted", true, { shouldValidate: true })}
      />
    </form>
  );
}
