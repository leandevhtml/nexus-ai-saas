import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Não autorizado. Faça login primeiro." }, { status: 401 });
    }

    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "Price ID é obrigatório" }, { status: 400 });
    }

    if (priceId === "price_placeholder_pro" || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ 
        error: "Gateway não configurado. Adicione suas chaves do Stripe no arquivo .env.local e cadastre os IDs dos planos." 
      }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/precos`,
      customer_email: session.user?.email || undefined,
      metadata: {
        userId: session.user?.id || "",
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Erro no checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
