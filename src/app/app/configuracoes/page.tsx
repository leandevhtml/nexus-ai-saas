import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";

export default async function ConfiguracoesPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const planName = (session.user as any)?.subscription?.plan || "Free";
  const isPro = planName !== "Free";

  const userData = {
    name: session.user.name || "",
    email: session.user.email || "",
    image: session.user.image || undefined,
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Configurações da Conta</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Gerencie seus dados pessoais, segurança e assinatura de forma rápida e segura.
        </p>
      </div>

      <SettingsClient user={userData} planName={planName} isPro={isPro} />
    </div>
  );
}
