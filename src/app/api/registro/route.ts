import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

// Schema de validação estrita
const registerSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(50, "Nome muito longo"),
  email: z.string().email("Email inválido").trim().toLowerCase(),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export async function POST(req: Request) {
  try {
    // 0. Rate Limiting (Proteção contra brute force)
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const limiter = rateLimit(ip, 5, 60000); // 5 tentativas por minuto
    
    if (!limiter.success) {
      return NextResponse.json(
        { message: "Muitas tentativas. Tente novamente em 1 minuto." },
        { status: 429 }
      );
    }

    const body = await req.json();
    
    // 1. Validação de Schema (Zod) - Bloqueia dados malformados
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    await dbConnect();

    // 2. Prevenção de NoSQL Injection
    // O Mongoose já sanitiza por padrão ao usar objetos de consulta
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Este email já está cadastrado." },
        { status: 400 }
      );
    }

    // 3. Hashing Seguro (Bcrypt com custo 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Usuário registrado com sucesso!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro no registro:", error.message);
    // 4. Tratamento de erro seguro (não expõe stack traces)
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
