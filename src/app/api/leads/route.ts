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
    // Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const limiter = rateLimit(ip, 3, 60000); // Mais rigoroso para leads (3 por minuto)
    
    if (!limiter.success) {
      return NextResponse.json(
        { message: "Muitas solicitações. Aguarde um pouco." },
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
      origem_da_campanha: "Landing-page"
    });

    await newLead.save();

    return NextResponse.json({ message: "Inscrição realizada com sucesso!" }, { status: 201 });
  } catch (error: any) {
    console.error("Erro no lead:", error.message);
    return NextResponse.json({ message: "Erro ao processar inscrição." }, { status: 500 });
  }
}
