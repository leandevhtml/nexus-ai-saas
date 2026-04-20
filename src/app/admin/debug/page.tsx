import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";
import User from "@/models/User";
import Link from "next/link";
import { ArrowLeft, Users, Mail, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DebugPage() {
  await dbConnect();

  // Buscar todos os dados diretamente do banco
  const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();

  return (
    <main className="p-8 max-w-6xl mx-auto min-h-screen">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-4">
          <ArrowLeft size={18} /> Voltar para o início
        </Link>
        <h1 className="heading-lg flex items-center gap-3">
          <ShieldCheck className="text-emerald-400" size={32} /> Central de Dados (Debug)
        </h1>
        <p className="text-[var(--text-muted)] mt-2">Visualização em tempo real do seu MongoDB.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Coluna de Usuários (Contas Reais) */}
        <section className="glass p-6 rounded-2xl border-t-4 border-blue-500">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold">Contas de Usuário ({users.length})</h2>
          </div>
          <div className="space-y-4">
            {users.length === 0 ? (
              <p className="text-sm text-[var(--text-dim)]">Nenhum usuário cadastrado.</p>
            ) : (
              users.map((user: any) => (
                <div key={user._id.toString()} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm">
                  <p className="font-bold text-[var(--text)]">{user.name || "Sem nome"}</p>
                  <p className="text-[var(--text-muted)]">{user.email}</p>
                  <div className="mt-2 flex gap-2">
                    {user.password ? (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Senha Definida</span>
                    ) : (
                      <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">Login via Google</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Coluna de Leads (Lista de Espera) */}
        <section className="glass p-6 rounded-2xl border-t-4 border-amber-500">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold">Lista de Espera ({leads.length})</h2>
          </div>
          <div className="space-y-4">
            {leads.length === 0 ? (
              <p className="text-sm text-[var(--text-dim)]">Nenhuma lead capturada.</p>
            ) : (
              leads.map((lead: any) => (
                <div key={lead._id.toString()} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border-light)] text-sm">
                  <p className="font-bold text-[var(--text)]">{lead.nome}</p>
                  <p className="text-[var(--text-muted)]">{lead.email}</p>
                  <p className="text-[10px] text-[var(--text-dim)] mt-2">Inscrito em: {new Date(lead.createdAt).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
