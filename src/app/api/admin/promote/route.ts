import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email é obrigatório" }, { status: 400 });
    }

    await dbConnect();

    // Check if any admin already exists
    const adminExists = await User.findOne({ role: "admin" });
    
    // For security, if an admin already exists, this route should be disabled 
    // or require existing admin authorization.
    // For initial setup, we allow promoting if no admin exists.
    if (adminExists) {
      return NextResponse.json({ 
        message: "Já existe um administrador. Use o painel para promover outros usuários." 
      }, { status: 403 });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: `Usuário ${email} promovido a administrador com sucesso!`,
      user: { email: user.email, role: user.role }
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
