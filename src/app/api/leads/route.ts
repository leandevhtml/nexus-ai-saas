import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const leadSchema = z.object({
  email: z.string().email("Email inválido").trim().toLowerCase(),
  nome: z.string().min(2, "Nome muito curto").optional(),
});

export async function POST(req: Request) {
  try {
    // Rate Limiting (Proteção contra spam)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const limiter = rateLimit(ip, 15, 60000); // 15 por minuto é mais razoável
    
    if (!limiter.success) {
      return NextResponse.json(
        { message: "Muitas solicitações. Aguarde um pouco antes de tentar novamente." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: result.error.issues[0].message }, { status: 400 });
    }

    const { email, nome } = result.data;

    await dbConnect();

    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return NextResponse.json({ message: "Você já está na lista!" }, { status: 200 });
    }

    const newLead = new Lead({
      email,
      nome,
      data_de_inscricao: new Date(),
      origem_da_campanha: "landing-page"
    });

    await newLead.save();

    return NextResponse.json({ message: "Inscrição realizada com sucesso!" }, { status: 201 });
  } catch (error: any) {
    console.error("Erro no lead:", error.message);
    return NextResponse.json({ message: "Erro ao processar inscrição." }, { status: 500 });
  }
}
