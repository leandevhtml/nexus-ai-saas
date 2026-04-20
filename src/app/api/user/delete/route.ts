import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await dbConnect();
    
    // Opcional: deletar os pagamentos também ou mantê-los para histórico financeiro. 
    // Vamos manter por motivos de auditoria financeira, apenas deletando o usuário.
    const deletedUser = await User.findByIdAndDelete(session.user.id);

    if (!deletedUser) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Conta excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar conta:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
