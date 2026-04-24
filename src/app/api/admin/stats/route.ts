import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Lead from "@/models/Lead";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "week"; // day, week, month, year

    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await dbConnect();

    // 1. Métricas de Pagamento
    const payments = await Payment.find().sort({ createdAt: -1 }).limit(10).lean();
    
    const totalRevenue = await Payment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]);

    const pendingRevenue = await Payment.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]);

    // 2. Métricas de Usuários e Leads
    const totalLeads = await Lead.countDocuments();
    const totalUsers = await User.countDocuments();
    const proUsers = await User.countDocuments({ "subscription.plan": { $regex: /pro/i } });
    const activeSubscriptions = await User.countDocuments({ "subscription.status": "active" });

    // 3. Dados de Crescimento (Filtrados por Range)
    const now = new Date();
    let startDate = new Date(now);
    let groupBy: any = { $dayOfWeek: "$createdAt" };
    let labels: string[] = [];
    let dayOrder: number[] = [];

    if (range === "day") {
      startDate.setHours(0, 0, 0, 0);
      groupBy = { $hour: "$createdAt" };
      labels = Array.from({ length: 24 }, (_, i) => `${i}h`);
      dayOrder = Array.from({ length: 24 }, (_, i) => i);
    } else if (range === "week") {
      startDate.setDate(now.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      groupBy = { $dayOfWeek: "$createdAt" };
      labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      dayOrder = [1, 2, 3, 4, 5, 6, 7];
    } else if (range === "month") {
      startDate.setMonth(now.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      groupBy = { $dayOfMonth: "$createdAt" };
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
      dayOrder = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    } else if (range === "year") {
      startDate.setFullYear(now.getFullYear() - 1);
      startDate.setHours(0, 0, 0, 0);
      groupBy = { $month: "$createdAt" };
      labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      dayOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    // Growth for Leads (using data_de_inscricao)
    const growthLeads = await Lead.aggregate([
      { $match: { data_de_inscricao: { $gte: startDate } } },
      { $group: { 
          _id: range === "day" ? { $hour: "$data_de_inscricao" } : 
               range === "week" ? { $dayOfWeek: "$data_de_inscricao" } :
               range === "month" ? { $dayOfMonth: "$data_de_inscricao" } :
               { $month: "$data_de_inscricao" }, 
          count: { $sum: 1 } 
        } 
      }
    ]);

    // Growth for Revenue (using Payment createdAt)
    const growthRevenue = await Payment.aggregate([
      { $match: { status: "completed", createdAt: { $gte: startDate } } },
      { $group: { 
          _id: groupBy, 
          total: { $sum: "$amount" } 
        } 
      }
    ]);

    const growthData = dayOrder.map((id, index) => {
      const foundLead = growthLeads.find(l => l._id === id);
      const foundRevenue = growthRevenue.find(r => r._id === id);
      return {
        label: labels[index],
        count: foundLead ? foundLead.count : 0,
        revenue: foundRevenue ? foundRevenue.total : 0
      };
    });

    // 4. Conversão por Origem
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
        completedCount: totalRevenue[0]?.count || 0,
        pendingRevenue: pendingRevenue[0]?.total || 0,
        pendingCount: pendingRevenue[0]?.count || 0,
        activeSubscriptions
      },
      stats: {
        totalLeads,
        totalUsers,
        proUsers,
        conversionRate: totalLeads > 0 ? ((totalLeads / (totalLeads + 100)) * 100).toFixed(1) : 0,
        growthData,
        origins
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
