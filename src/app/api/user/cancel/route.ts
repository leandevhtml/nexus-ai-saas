import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await dbConnect();
    
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Cancela o plano (volta para o Free)
    user.subscription.plan = "Free";
    user.subscription.status = "canceled";
    await user.save();

    return NextResponse.json({ success: true, message: "Assinatura cancelada com sucesso" });
  } catch (error) {
    console.error("Erro ao cancelar assinatura:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
