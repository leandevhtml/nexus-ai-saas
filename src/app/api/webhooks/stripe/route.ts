import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/Payment";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Stripe webhook secret is not set");
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  await dbConnect();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        const userId = session.metadata?.userId;
        if (!userId) break;

        const user = await User.findById(userId);
        if (user) {
          user.subscription.plan = "Pro"; // Ou mapeie com base no priceId
          user.subscription.status = "active";
          user.subscription.stripeCustomerId = session.customer as string;
          user.subscription.stripeSubscriptionId = session.subscription as string;
          await user.save();
        }

        await Payment.create({
          userId,
          userName: user?.name || session.customer_details?.name || "Desconhecido",
          userEmail: user?.email || session.customer_details?.email || "",
          amount: (session.amount_total || 0) / 100,
          currency: session.currency || "BRL",
          status: "completed",
          plan: "Pro", // Ou extrair dos line_items
          stripeSessionId: session.id,
        });

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const user = await User.findOne({ "subscription.stripeCustomerId": subscription.customer });

        if (user) {
          if (subscription.status === "active" || subscription.status === "trialing") {
            user.subscription.status = "active";
          } else {
            user.subscription.status = "canceled";
            user.subscription.plan = "free";
          }
          await user.save();
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
