import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";
import Plan from "@/models/Plan";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

// Validação estrita de Input (Prevenção de Injeções)
const checkoutSchema = z.object({
  planId: z.string().min(5, "ID Inválido"),
  paymentMethod: z.enum(["credit_card", "pix", "boleto"]),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (DDoS e Brute Force Protection)
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const limiter = rateLimit(ip, 5, 60000); // 5 requisições por minuto
    
    if (!limiter.success) {
      return NextResponse.json({ error: "Muitas tentativas. Aguarde um momento." }, { status: 429 });
    }

    // 2. Autenticação e Autorização Seguras
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    
    // 3. Validação Zod (Sanitização)
    const result = checkoutSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { planId, paymentMethod } = result.data;

    // 4. Conexão Segura com DB
    await dbConnect();

    // 5. Consultas tipadas para evitar NoSQL Injection
    const plan = await Plan.findById(planId);
    if (!plan) {
      return NextResponse.json({ error: "Plano não encontrado" }, { status: 404 });
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Simulando delay de processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Atualiza o plano do usuário
    user.subscription.plan = plan.name;
    user.subscription.status = "active";
    await user.save();

    // Cria o registro de pagamento
    await Payment.create({
      userId: user._id,
      userName: user.name || "Desconhecido",
      userEmail: user.email || "",
      amount: plan.price,
      currency: "BRL",
      status: "completed",
      plan: plan.name,
      stripeSessionId: `simulado_${Math.random().toString(36).substring(7)}`,
    });

    return NextResponse.json({ success: true, message: "Pagamento aprovado com sucesso!" });
  } catch (error: any) {
    console.error("Erro no checkout simulado:", error.message);
    // 6. Tratamento Genérico de Erros (não expor stack trace)
    return NextResponse.json({ error: "Erro interno ao processar pagamento" }, { status: 500 });
  }
}
