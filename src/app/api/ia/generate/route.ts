import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import History from "@/models/History";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const generateSchema = z.object({
  prompt: z.string().min(3, "Prompt muito curto"),
});

export async function POST(req: Request) {
  try {
    // Proteção de API
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const limiter = rateLimit(ip, 10, 60000); // 10 gerações por min max
    if (!limiter.success) {
      return NextResponse.json({ error: "Muitas requisições. Aguarde." }, { status: 429 });
    }

    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const result = generateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { prompt } = result.data;

    // Determina o tipo com base numa palavra-chave simples
    const isCode = prompt.toLowerCase().includes("código") || prompt.toLowerCase().includes("script");
    const type = isCode ? "Código" : "Texto";

    // Simula tempo de processamento de uma IA
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Banco de respostas fakes baseadas no tipo
    const textResponses = [
      "Baseado no seu prompt, aqui está a estrutura ideal: \n\n1. Introdução\n2. Desenvolvimento\n3. Conclusão e Call to Action.\n\nEssa abordagem aumenta a conversão em 35% de acordo com os padrões NexusAI.",
      "A melhor estratégia de marketing para este nicho envolve criação de comunidade orgânica focada em resolução de dores latentes, combinada com Ads de retargeting de baixo custo.",
      "O e-mail sugerido seria:\n\n'Olá [Nome],\nNotei que você tem interesse em [Tópico]. Nossa ferramenta pode ajudar a resolver isso rapidamente. Responda este e-mail para marcarmos uma call.'"
    ];

    const codeResponses = [
      "Aqui está o código otimizado solicitado:\n\n```javascript\nfunction optimizeData(data) {\n  return data.filter(d => d.active).map(d => d.id);\n}\n```\n\nEssa função reduz o vazamento de memória em grandes aplicações.",
      "Exemplo de script Python:\n\n```python\nimport pandas as pd\ndef clean_data(df):\n    return df.dropna()\n```\n\nUtilize este snippet para limpeza inicial de datasets.",
    ];

    const targetArray = type === "Código" ? codeResponses : textResponses;
    const generatedContent = targetArray[Math.floor(Math.random() * targetArray.length)];

    await dbConnect();

    // Salva no Histórico do MongoDB
    await History.create({
      userId: session.user.id,
      type,
      prompt,
      result: generatedContent,
    });

    return NextResponse.json({ success: true, result: generatedContent });

  } catch (error) {
    console.error("Erro na geração de IA:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
