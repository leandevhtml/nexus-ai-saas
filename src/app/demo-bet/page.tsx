import { LiveEventCard } from '@/presentation/components/betting/LiveEventCard';

export default function DemoBetPage() {
  const sampleEvents = [
    {
      id: 'evt_123456',
      homeTeam: 'Real Madrid',
      awayTeam: 'Manchester City',
      status: 'LIVE' as const,
      odds: [
        { id: 'o1', selection: '1', value: 2.45 },
        { id: 'o2', selection: 'X', value: 3.40 },
        { id: 'o3', selection: '2', value: 2.80 },
      ]
    },
    {
      id: 'evt_789012',
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      status: 'SCHEDULED' as const,
      odds: [
        { id: 'o4', selection: '1', value: 1.90 },
        { id: 'o5', selection: 'X', value: 15.00 },
        { id: 'o6', selection: '2', value: 1.90 },
      ]
    },
    {
      id: 'evt_345678',
      homeTeam: 'Brasil',
      awayTeam: 'Argentina',
      status: 'LIVE' as const,
      odds: [
        { id: 'o7', selection: '1', value: 2.10 },
        { id: 'o8', selection: 'X', value: 3.10 },
        { id: 'o9', selection: '2', value: 3.50 },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Betting Dashboard
          </h1>
          <p className="text-zinc-500">Live Odds & Real-time Markets</p>
        </header>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xl font-bold">Eventos em Destaque</h2>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleEvents.map((event) => (
              <LiveEventCard key={event.id} initialEvent={event} />
            ))}
          </div>
        </section>

        <section className="mt-20 p-8 border border-zinc-800 rounded-3xl bg-zinc-900/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-emerald-500 font-bold text-3xl mb-2">1ms</div>
              <div className="text-zinc-500 text-sm">Latência WebSocket</div>
            </div>
            <div>
              <div className="text-blue-500 font-bold text-3xl mb-2">+10k</div>
              <div className="text-zinc-500 text-sm">Eventos Diários</div>
            </div>
            <div>
              <div className="text-purple-500 font-bold text-3xl mb-2">Secure</div>
              <div className="text-zinc-500 text-sm">2FA & JWT Auth</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
