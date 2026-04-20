"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, UserPlus, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao criar conta.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          signIn("credentials", { email, password, callbackUrl: "/" });
        }, 1500);
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#0A0A0F] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-10 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao site
        </Link>

        <div className="glass p-8 sm:p-10 rounded-3xl border border-[var(--border-light)] shadow-2xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
              <UserPlus size={28} className="text-white" />
            </div>
            <h1 className="heading-md text-2xl mb-2">Crie sua conta</h1>
            <p className="text-[var(--text-muted)]">
              Comece agora sua jornada com inteligência local.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="animate-spin" size={32} />
              </div>
              <p className="text-emerald-400 font-bold text-lg">Conta criada com sucesso!</p>
              <p className="text-[var(--text-muted)] mt-2">Redirecionando você...</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleRegister} className="space-y-6 mb-10">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-widest mb-3 ml-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input bg-[#11111E] border-[var(--border-light)] focus:border-[var(--primary)] text-white h-14"
                    placeholder="Seu nome"
                  />
                </div>
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
                    placeholder="Mínimo 8 caracteres"
                    minLength={8}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-4 h-14 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 text-lg"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : "Criar Minha Conta"}
                </button>
              </form>

              <div className="relative mb-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border-light)]"></div>
                </div>
                <div className="relative flex justify-center text-[11px] font-black uppercase tracking-[0.2em]">
                  <span className="bg-[#1a1a2e] px-4 text-[var(--text-dim)]">Ou use sua conta</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-4 h-14 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-all shadow-md border border-gray-200"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Registrar com Google
              </button>
            </>
          )}

          <p className="text-center text-sm text-[var(--text-muted)] mt-10">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-[var(--primary-light)] font-bold hover:underline">
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
