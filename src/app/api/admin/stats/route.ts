import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Lead from "@/models/Lead";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    // Proteção: Apenas admins podem ver os stats em tempo real
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await dbConnect();

    // 1. Métricas de Pagamento
    const payments = await Payment.find().sort({ createdAt: -1 }).limit(10).lean();
    
    const totalRevenue = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const pendingRevenue = await Payment.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // 2. Métricas de Usuários e Leads
    const totalLeads = await Lead.countDocuments();
    const totalUsers = await User.countDocuments();
    const proUsers = await User.countDocuments({ "subscription.plan": { $regex: /pro/i } });
    const activeSubscriptions = await User.countDocuments({ "subscription.status": "active" });

    // 3. Dados para os Gráficos
    // Crescimento semanal (últimos 7 dias, começando de segunda)
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    lastWeek.setHours(0, 0, 0, 0);
    
    const weeklyLeads = await Lead.aggregate([
      { $match: { data_de_inscricao: { $gte: lastWeek } } },
      { $group: { 
          _id: { $dayOfWeek: "$data_de_inscricao" }, 
          count: { $sum: 1 } 
        } 
      }
    ]);

    // Mapeamento: MongoDB 1(Dom) -> 7(Sáb)
    // Queremos: [Seg(2), Ter(3), Qua(4), Qui(5), Sex(6), Sáb(7), Dom(1)]
    const dayOrder = [2, 3, 4, 5, 6, 7, 1];
    const weeklyData = dayOrder.map(day => {
      const found = weeklyLeads.find(l => l._id === day);
      return found ? found.count : 0;
    });

    // Conversão por Origem
    const originStats = await Lead.aggregate([
      { $group: { _id: "$origem_da_campanha", count: { $sum: 1 } } }
    ]);

    const totalOriginLeads = originStats.reduce((acc, curr) => acc + curr.count, 0);
    const origins = originStats.map(o => ({
      name: o._id || "Direto",
      val: totalOriginLeads > 0 ? Math.round((o.count / totalOriginLeads) * 100) : 0,
      count: o.count
    })).sort((a, b) => b.val - a.val);

    return NextResponse.json({
      payments: {
        list: payments,
        totalRevenue: totalRevenue[0]?.total || 0,
        pendingRevenue: pendingRevenue[0]?.total || 0,
        activeSubscriptions
      },
      stats: {
        totalLeads,
        totalUsers,
        proUsers,
        conversionRate: totalLeads > 0 ? ((totalLeads / (totalLeads + 100)) * 100).toFixed(1) : 0,
        weeklyData,
        origins
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
