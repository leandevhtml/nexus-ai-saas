import { auth } from "@/auth";
import GeneratorClient from "./GeneratorClient";
import { redirect } from "next/navigation";

export default async function IAPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const planName = (session.user as any)?.subscription?.plan || "Free";
  const isPro = planName !== "Free";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gerador Nexus</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Crie textos, automações e códigos usando nossa Inteligência Artificial avançada.
        </p>
      </div>

      <GeneratorClient isPro={isPro} planName={planName} />
    </div>
  );
}
