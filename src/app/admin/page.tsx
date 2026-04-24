import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";
import User from "@/models/User";
import RealTimeDashboard from "@/components/admin/RealTimeDashboard";

async function getStats() {
  await dbConnect();
  
  const totalLeads = await Lead.countDocuments();
  const totalUsers = await User.countDocuments();
  const proUsers = await User.countDocuments({ "subscription.plan": { $regex: /pro/i } });
  
  const conversionRate = totalLeads > 0 ? ((totalLeads / (totalLeads + 100)) * 100).toFixed(1) : 0;

  // Initial growth data
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  lastWeek.setHours(0, 0, 0, 0);
  
  const weeklyLeads = await Lead.aggregate([
    { $match: { data_de_inscricao: { $gte: lastWeek } } },
    { $group: { _id: { $dayOfWeek: "$data_de_inscricao" }, count: { $sum: 1 } } }
  ]);

  const dayOrder = [2, 3, 4, 5, 6, 7, 1];
  const weeklyData = dayOrder.map(day => {
    const found = weeklyLeads.find(l => l._id === day);
    return found ? found.count : 0;
  });

  // Initial origin data
  const originStats = await Lead.aggregate([
    { $group: { _id: "$origem_da_campanha", count: { $sum: 1 } } }
  ]);

  const totalOriginLeads = originStats.reduce((acc, curr) => acc + curr.count, 0);
  const origins = originStats.map(o => ({
    name: o._id || "Direto",
    val: totalOriginLeads > 0 ? Math.round((o.count / totalOriginLeads) * 100) : 0,
    count: o.count
  })).sort((a, b) => b.val - a.val);
  
  return {
    totalLeads,
    totalUsers,
    proUsers,
    conversionRate,
    weeklyData,
    origins
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-10 animate-in fade-in duration-700 px-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Dashboard <span className="text-indigo-600">NexusAI</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Sua central de controle para análise e faturamento.
        </p>
      </div>

      <RealTimeDashboard initialData={JSON.parse(JSON.stringify(stats))} />
    </div>
  );
}
