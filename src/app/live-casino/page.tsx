'use client';

import React, { useState } from 'react';
import { useSite } from '@/components/SiteChrome';
import { soundFX } from '@/lib/audio';
import { 
  Radio, 
  Users, 
  Play
} from 'lucide-react';

interface LiveTable {
  id: string;
  title: string;
  category: 'roulette' | 'blackjack' | 'baccarat' | 'gameshow';
  provider: string;
  dealer: string;
  minBet: string;
  maxBet: string;
  activePlayers: number;
  badge: string;
  symbol: string;
  bgGradient: string;
}

const LIVE_TABLES: LiveTable[] = [
  { id: 'lt-1', title: 'Lightning Roulette XXXTreme', category: 'roulette', provider: 'Evolution Gaming', dealer: 'Elena K.', minBet: '€0.20', maxBet: '€10,000', activePlayers: 1480, badge: '2000X MULTIS', symbol: '⚡', bgGradient: 'from-brass-600 to-brass-600' },
  { id: 'lt-2', title: 'Crazy Time Live 4K', category: 'gameshow', provider: 'Evolution Gaming', dealer: 'Marco D.', minBet: '€0.10', maxBet: '€5,000', activePlayers: 2940, badge: 'TOP SHOW', symbol: '🎡', bgGradient: 'from-loss-600 to-loss-600' },
  { id: 'lt-3', title: '1xExclusive Speed Blackjack VIP', category: 'blackjack', provider: '1xLive Studios', dealer: 'Sarah M.', minBet: '€5.00', maxBet: '€25,000', activePlayers: 420, badge: 'VIP SALON', symbol: '♠️', bgGradient: 'from-brand-700 to-navy-950' },
  { id: 'lt-4', title: 'Monopoly Big Baller Live', category: 'gameshow', provider: 'Evolution Gaming', dealer: 'James L.', minBet: '€0.10', maxBet: '€2,000', activePlayers: 1820, badge: '3D BOARD', symbol: '🎩', bgGradient: 'from-win-600 to-win-600' },
  { id: 'lt-5', title: 'Speed Baccarat Super 6', category: 'baccarat', provider: 'Evolution Gaming', dealer: 'Mei Lin', minBet: '€1.00', maxBet: '€15,000', activePlayers: 960, badge: 'FAST 15s', symbol: '🐉', bgGradient: 'from-brand-700 to-brand-900' },
  { id: 'lt-6', title: 'Mega Roulette 500x', category: 'roulette', provider: 'Pragmatic Play Live', dealer: 'Victoria S.', minBet: '€0.10', maxBet: '€5,000', activePlayers: 890, badge: '500X MULTIS', symbol: '🔴', bgGradient: 'from-loss-600 to-navy-950' },
  { id: 'lt-7', title: 'Infinite Cyber Blackjack', category: 'blackjack', provider: '1xLive Studios', dealer: 'Alex R.', minBet: '€1.00', maxBet: '€5,000', activePlayers: 1350, badge: 'UNLIMITED SEATS', symbol: '♣️', bgGradient: 'from-brand-700 to-navy-950' },
  { id: 'lt-8', title: 'Sweet Bonanza Candyland', category: 'gameshow', provider: 'Pragmatic Play Live', dealer: 'Anna P.', minBet: '€0.20', maxBet: '€3,000', activePlayers: 1670, badge: 'SWEET SPINS', symbol: '🍭', bgGradient: 'from-brand-600 to-brand-900' },
];

export default function LiveCasinoPage() {
  const { openAuth } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTables = LIVE_TABLES.filter((t) => activeCategory === 'all' || t.category === activeCategory);

  return (
    <>
      <main className="flex-1 overflow-x-hidden p-4 sm:p-8 max-w-[1440px] mx-auto w-full space-y-8">
        
        {/* Live Casino Hero Header */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white p-6 sm:p-10 shadow-xl border border-brand-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-loss-500/20 text-loss-500 border border-loss-500/30 text-[10px] font-medium uppercase tracking-[0.1em]">
              <Radio className="w-3.5 h-3.5 text-loss-500" />
              <span>4K ULTRA HD LIVE DEALER BROADCAST</span>
            </div>
            <h1 className="text-[30px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.032em] text-white">
              Live dealer &amp; VIP tables
            </h1>
            <p className="text-xs sm:text-sm text-navy-100 leading-relaxed">
              Immerse in genuine casino atmosphere with professional native dealers, high-speed multi-angle 4K streaming, lightning multipliers, and private VIP Salon Privé tables.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-center">
              <span className="text-[10px] text-ink-300 font-bold uppercase block">LIVE TABLES</span>
              <span className="text-2xl font-semibold font-mono text-win-500">195+</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="text-[10px] text-ink-300 font-bold uppercase block">ACTIVE PLAYERS</span>
              <span className="text-2xl font-semibold font-mono text-brand-400">11,480</span>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Live Tables' },
            { id: 'roulette', label: '🔴 Live Roulette' },
            { id: 'blackjack', label: '♠️ Live Blackjack' },
            { id: 'baccarat', label: '🐉 Live Baccarat' },
            { id: 'gameshow', label: '🎡 Game Shows' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => { soundFX.playClick(); setActiveCategory(cat.id); }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-500 text-white shadow-md font-semibold'
                  : 'bg-ink-50 hover:bg-ink-100 text-ink-700 border border-ink-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Tables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              onClick={() => {
                soundFX.playClick();
                openAuth();
              }}
              className="gaming-card rounded-3xl overflow-hidden group flex flex-col justify-between relative cursor-pointer border border-ink-200 hover:border-brand-500 shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`h-48 relative p-4 flex flex-col justify-between text-white bg-gradient-to-br ${table.bgGradient} overflow-hidden`}>
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-black/50 backdrop-blur-md text-win-500 border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-win-500"></span>
                    <span>LIVE 4K</span>
                  </span>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-black/40 backdrop-blur-md text-brass-300">
                    {table.badge}
                  </span>
                </div>

                <div className="my-auto text-center transform group-hover:scale-115 transition-transform duration-300">
                  <span className="text-5xl drop-shadow-lg">{table.symbol}</span>
                </div>

                <div className="absolute inset-0 bg-navy-950/75 backdrop-blur-xs flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                  <button className="w-12 h-12 rounded-full bg-loss-600 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    JOIN LIVE TABLE
                  </span>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold text-white/90">
                  <span>Dealer: <strong className="text-white">{table.dealer}</strong></span>
                  <span className="flex items-center gap-1 text-brand-300 font-mono">
                    <Users className="w-3.5 h-3.5" />
                    <span>{table.activePlayers}</span>
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white space-y-2">
                <h3 className="font-semibold text-sm text-navy-900 truncate group-hover:text-brand-600 transition">
                  {table.title}
                </h3>
                <div className="flex items-center justify-between text-xs font-semibold text-ink-600">
                  <span>Limits: <strong className="font-mono text-navy-800">{table.minBet} - {table.maxBet}</strong></span>
                  <span className="text-brand-600 text-[11px] font-bold">{table.provider}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </>
  );
}
