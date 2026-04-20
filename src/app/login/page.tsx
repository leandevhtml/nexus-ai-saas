"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Lock, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha inválidos.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Ocorreu um erro ao entrar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#0A0A0F] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-10 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao site
        </Link>

        <div className="glass p-8 sm:p-10 rounded-3xl border border-[var(--border-light)] shadow-2xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-blue-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
              <Lock size={28} className="text-white" />
            </div>
            <h1 className="heading-md text-2xl mb-2">Bem-vindo de volta</h1>
            <p className="text-[var(--text-muted)]">
              Acesse sua conta para gerenciar seus dados.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleCredentialsLogin} className="space-y-6 mb-10">
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-widest mb-3 ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input bg-[#11111E] border-[var(--border-light)] focus:border-[var(--primary)] text-white h-14"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-widest mb-3 ml-1">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input bg-[#11111E] border-[var(--border-light)] focus:border-[var(--primary)] text-white h-14"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 h-14 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 text-lg"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Entrar com Email"}
            </button>
          </form>

          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-light)]"></div>
            </div>
            <div className="relative flex justify-center text-[11px] font-black uppercase tracking-[0.2em]">
              <span className="bg-[#1a1a2e] px-4 text-[var(--text-dim)]">Ou continue com</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 h-14 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-all shadow-md border border-gray-200"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Fazer login com Google
          </button>

          <p className="text-center text-sm text-[var(--text-muted)] mt-10">
            Não tem uma conta?{" "}
            <Link href="/registro" className="text-[var(--primary-light)] font-bold hover:underline">
              Registre-se grátis
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
