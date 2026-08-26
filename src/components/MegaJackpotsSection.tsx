'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Crown, 
  Flame, 
  Play, 
  Coins,
  History,
  ShieldCheck
} from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { useSite } from '@/components/SiteChrome';

interface JackpotGame {
  id: string;
  title: string;
  provider: string;
  currentJackpot: number;
  bgGradient: string;
  icon: string;
}

const JACKPOT_GAMES: JackpotGame[] = [
  {
    id: 'jackpot-1',
    title: '1xGrand Mega Wheel',
    provider: '1xOriginals',
    currentJackpot: 2845190,
    bgGradient: 'from-amber-600 via-amber-700 to-amber-950',
    icon: '👑',
  },
  {
    id: 'jackpot-2',
    title: 'Mega Moolah 1xDeluxe',
    provider: 'Microgaming',
    currentJackpot: 1420800,
    bgGradient: 'from-rose-600 via-rose-700 to-rose-950',
    icon: '🦁',
  },
  {
    id: 'jackpot-3',
    title: 'Divine Fortune Mega VIP',
    provider: 'NetEnt',
    currentJackpot: 685400,
    bgGradient: 'from-blue-600 via-blue-700 to-blue-950',
    icon: '⚡',
  },
  {
    id: 'jackpot-4',
    title: 'Gates of 1xOlympus Jackpot',
    provider: 'Pragmatic & 1xBet',
    currentJackpot: 395200,
    bgGradient: 'from-purple-600 via-purple-700 to-purple-950',
    icon: '🏛️',
  },
];

export const MegaJackpotsSection: React.FC = () => {
  const { openAuth } = useSite();

  // Real-time ticking jackpot amount
  const [megaJackpot, setMegaJackpot] = useState<number>(2845190.45);
  const [majorJackpot, setMajorJackpot] = useState<number>(184920.80);
  const [minorJackpot, setMinorJackpot] = useState<number>(28450.25);

  useEffect(() => {
    const interval = setInterval(() => {
      setMegaJackpot((prev) => +(prev + Math.random() * 0.85 + 0.15).toFixed(2));
      setMajorJackpot((prev) => +(prev + Math.random() * 0.25 + 0.05).toFixed(2));
      setMinorJackpot((prev) => +(prev + Math.random() * 0.08 + 0.02).toFixed(2));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const formatUsd = (num: number) =>
    `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 text-white select-none">
      {/* Background Neon Halo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-brand-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Mega Counter */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <Crown className="h-4 w-4 text-amber-400" />
            <span>PROGRESSIVE MULTI-TIER POOL</span>
          </div>

          <h2 className="mt-4 text-[32px] sm:text-[44px] font-black tracking-[-0.03em] text-white">
            1xMega Progressive Jackpot
          </h2>
          <p className="mt-2 text-sm text-navy-200">
            Every spin across certified network games feeds the mega pool. Can trigger randomly on any stake.
          </p>

          {/* Huge Ticking Jackpot Display */}
          <div className="mt-6 inline-block rounded-3xl border border-amber-400/30 bg-gradient-to-b from-navy-900/90 to-navy-950 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
              LIVE NETWORK POOL
            </span>
            <div className="font-mono text-[42px] sm:text-[68px] font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100 drop-shadow-[0_0_40px_rgba(245,158,11,0.5)]">
              {formatUsd(megaJackpot)}
            </div>
            
            {/* Minor & Major Tiers */}
            <div className="mt-5 flex items-center justify-center gap-6 sm:gap-10 border-t border-white/10 pt-4 text-xs">
              <div>
                <span className="text-ink-400 uppercase text-[10px] block font-semibold">Major Tier</span>
                <span className="font-mono font-bold text-brand-300 text-sm sm:text-base">
                  {formatUsd(majorJackpot)}
                </span>
              </div>
              <div className="h-6 w-px bg-line" />
              <div>
                <span className="text-ink-400 uppercase text-[10px] block font-semibold">Minor Tier</span>
                <span className="font-mono font-bold text-win-400 text-sm sm:text-base">
                  {formatUsd(minorJackpot)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Jackpot Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {JACKPOT_GAMES.map((game) => (
            <div
              key={game.id}
              onClick={() => { soundFX.playClick(); openAuth(); }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-navy-900/60 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-navy-900 cursor-pointer"
            >
              {/* Top info */}
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-line px-2 py-0.5 text-[10px] font-bold text-fg">
                  {game.provider}
                </span>
                <span className="text-2xl">{game.icon}</span>
              </div>

              {/* Game Title & Current Pool */}
              <div className="my-6 space-y-1.5">
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                  {game.title}
                </h3>
                <div className="flex items-center gap-1.5">
                  <Coins className="h-4 w-4 text-amber-400" />
                  <span className="font-mono text-lg font-black text-amber-400">
                    {formatUsd(game.currentJackpot)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-xs text-navy-300 font-medium">Random Drop Eligible</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg transition-transform group-hover:scale-110">
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Jackpot Drops Ticker */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-amber-400" />
            <span className="font-bold text-white">Recent Jackpot Hits:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-navy-200">
            <span>🎉 <strong>Alex***9</strong> won <strong className="text-amber-300 font-mono">$48,200</strong> on Mega Wheel (2m ago)</span>
            <span className="hidden lg:inline">•</span>
            <span>⚡ <strong>CryptoKing</strong> won <strong className="text-amber-300 font-mono">$12,450</strong> on Gates of Olympus (18m ago)</span>
          </div>

          <button
            onClick={() => openAuth()}
            className="font-bold text-amber-400 hover:text-amber-300 underline underline-offset-2 shrink-0 cursor-pointer"
          >
            View All Winners &rarr;
          </button>
        </div>

      </div>
    </section>
  );
};
