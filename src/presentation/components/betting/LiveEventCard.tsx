'use client';

import React, { useEffect, useState } from 'react';

interface Odd {
  id: string;
  selection: string;
  value: number;
}

interface EventData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  status: 'LIVE' | 'SCHEDULED';
  odds: Odd[];
}

export const LiveEventCard: React.FC<{ initialEvent: EventData }> = ({ initialEvent }) => {
  const [event, setEvent] = useState<EventData>(initialEvent);
  const [flashingOdd, setFlashingOdd] = useState<{ id: string; trend: 'up' | 'down' } | null>(null);

  useEffect(() => {
    // Simulação de WebSocket para demonstração
    const interval = setInterval(() => {
      const randomOddIndex = Math.floor(Math.random() * event.odds.length);
      const currentOdd = event.odds[randomOddIndex];
      const change = (Math.random() - 0.5) * 0.2;
      const newValue = Math.max(1.01, Number((currentOdd.value + change).toFixed(2)));
      
      const trend = newValue > currentOdd.value ? 'up' : 'down';
      
      const newOdds = [...event.odds];
      newOdds[randomOddIndex] = { ...currentOdd, value: newValue };
      
      setEvent(prev => ({ ...prev, odds: newOdds }));
      setFlashingOdd({ id: currentOdd.id, trend });
      
      setTimeout(() => setFlashingOdd(null), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [event.odds]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-white shadow-2xl w-full max-w-sm hover:border-emerald-500/50 transition-all duration-500 group">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {event.status === 'LIVE' && (
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </div>
          )}
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            {event.status === 'LIVE' ? 'Ao Vivo' : 'Pré-jogo'}
          </span>
        </div>
        <div className="text-[10px] font-mono text-zinc-600">ID: {event.id.slice(0, 8)}</div>
      </div>

      {/* Teams */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg group-hover:text-emerald-400 transition-colors">{event.homeTeam}</span>
          <span className="text-zinc-700 text-xs font-black italic">VS</span>
          <span className="font-bold text-lg group-hover:text-emerald-400 transition-colors text-right">{event.awayTeam}</span>
        </div>
      </div>

      {/* Odds Grid */}
      <div className="grid grid-cols-3 gap-3">
        {event.odds.map((odd) => {
          const isFlashing = flashingOdd?.id === odd.id;
          const flashClass = isFlashing 
            ? (flashingOdd.trend === 'up' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-red-500 bg-red-500/10 text-red-400')
            : 'border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300';

          return (
            <button
              key={odd.id}
              className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-300 ${flashClass}`}
            >
              <span className="text-[10px] text-zinc-500 mb-1 font-medium">{odd.selection}</span>
              <span className="font-black text-base tabular-nums tracking-tight">
                {odd.value.toFixed(2)}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Quick Action */}
      <button className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] active:scale-95">
        Apostar Agora
      </button>
    </div>
  );
};
