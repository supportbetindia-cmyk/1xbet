'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Rocket, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Dices,
  Diamond,
  Layers,
  Gamepad2,
  TrendingUp,
  Flame,
  Zap
} from 'lucide-react';
import { AUTHENTIC_GAMES, AuthenticGame } from '@/lib/authenticGames';
import { soundFX } from '@/lib/audio';
import { useSite } from '@/components/SiteChrome';
import NeonBorder from '@/components/ui/NeonBorder';
import { Rail } from '@/components/ui/Rail';

interface OneXGamesSectionProps {
  onSelectGame: (game: AuthenticGame) => void;
}

interface OriginalGameItem {
  id: string;
  title: string;
  category: 'crash' | 'mines' | 'arcade' | 'table';
  tag: string;
  tagColor: string;
  rtp: string;
  maxWin: string;
  plays: string;
  image: string;
  desc: string;
  accent: string;
}

const ORIGINALS_LIST: OriginalGameItem[] = [
  {
    id: 'aviator-1x',
    title: 'Aviator 1xPro',
    category: 'crash',
    tag: 'HOT MULTIPLIER',
    tagColor: 'bg-rose-500/15 text-rose-600 border-rose-500/30',
    rtp: '99.0%',
    maxWin: '10,000x',
    plays: '1.4M',
    image: '/images/games/aviator.jpg',
    desc: 'Social curve crash game. Watch the multiplier climb exponentially and cash out in time.',
    accent: '#f43f5e'
  },
  {
    id: '1x-mines',
    title: '1xMines Grid',
    category: 'mines',
    tag: 'PROVABLY FAIR',
    tagColor: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
    rtp: '99.0%',
    maxWin: '100,000x',
    plays: '890K',
    image: '/images/games/mines.jpg',
    desc: 'Uncover diamond gems across the 5x5 grid while dodging hidden landmines for compounding payouts.',
    accent: '#10b981'
  },
  {
    id: '1x-plinko',
    title: '1xPlinko Ultra',
    category: 'arcade',
    tag: '16 ROWS',
    tagColor: 'bg-purple-500/15 text-purple-600 border-purple-500/30',
    rtp: '99.0%',
    maxWin: '1,000x',
    plays: '750K',
    image: '/images/games/plinko.jpg',
    desc: 'Drop quantum spheres down the pyramid pegs into extreme edge multiplier pockets.',
    accent: '#a855f7'
  },
  {
    id: 'apple-of-fortune',
    title: 'Apple of Fortune',
    category: 'arcade',
    tag: '10 TIERS',
    tagColor: 'bg-amber-500/15 text-amber-600 border-amber-500/30',
    rtp: '98.5%',
    maxWin: '350x',
    plays: '610K',
    image: '/images/games/apple-fortune.jpg',
    desc: 'Climb 10 tiers of mystery cells. Pick sweet golden apples to compound your stake.',
    accent: '#f59e0b'
  },
  {
    id: '1x-dice',
    title: '1xDice Pro',
    category: 'table',
    tag: 'INSTANT WIN',
    tagColor: 'bg-cyan-500/15 text-cyan-600 border-cyan-500/30',
    rtp: '99.0%',
    maxWin: '990x',
    plays: '520K',
    image: '/images/games/crystal-deluxe.jpg',
    desc: 'Set win probabilities from 1% to 98%, roll verifiable cryptographic dice, and take instant returns.',
    accent: '#06b6d4'
  },
  {
    id: 'crystal-1x',
    title: 'Crystal Deluxe',
    category: 'arcade',
    tag: '500X MULTIS',
    tagColor: 'bg-blue-500/15 text-blue-600 border-blue-500/30',
    rtp: '98.8%',
    maxWin: '500x',
    plays: '430K',
    image: '/images/games/crystal-deluxe.jpg',
    desc: 'Match glowing arcane crystals to trigger cascading cluster explosions with compounding multipliers.',
    accent: '#3b82f6'
  }
];

export const OneXGamesSection: React.FC<OneXGamesSectionProps> = ({ onSelectGame }) => {
  const { openAuth, showToast } = useSite();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Live Rocket Multiplier Simulation in the Hero Card
  const [simMultiplier, setSimMultiplier] = useState(1.00);
  const [simCrashed, setSimCrashed] = useState(false);
  const [isSimRunning, setIsSimRunning] = useState(true);

  useEffect(() => {
    if (!isSimRunning) return;
    let current = 1.00;
    const crashAt = 2.45 + Math.random() * 8.5; // Random crash target

    const interval = setInterval(() => {
      current += 0.04 * (1 + (current * 0.15));
      if (current >= crashAt) {
        setSimMultiplier(parseFloat(current.toFixed(2)));
        setSimCrashed(true);
        setIsSimRunning(false);
        setTimeout(() => {
          setSimMultiplier(1.00);
          setSimCrashed(false);
          setIsSimRunning(true);
        }, 2200);
      } else {
        setSimMultiplier(parseFloat(current.toFixed(2)));
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isSimRunning]);

  const handleLaunch = (gameId: string) => {
    soundFX.playClick();
    const fullGame = AUTHENTIC_GAMES.find((g) => g.id === gameId) ?? AUTHENTIC_GAMES[0];
    onSelectGame(fullGame);
  };

  const filteredGames = activeFilter === 'all' 
    ? ORIGINALS_LIST 
    : ORIGINALS_LIST.filter(g => g.category === activeFilter);

  return (
    <section id="1xgames" className="relative border-t border-line bg-surface-1 py-8 sm:py-9 lg:py-10 overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-40 right-0 w-[550px] h-[550px] rounded-full bg-brand-500/8 blur-[120px]"
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute -bottom-30 left-10 w-[450px] h-[450px] rounded-full bg-volt-500/6 blur-[100px]"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        
        {/* Header Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label label-volt flex items-center gap-1.5">
                <Rocket className="h-3.5 w-3.5 text-brand-500" />
                1xGames Originals
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-win-500/30 bg-win-500/10 px-3 py-1 text-[11px] font-bold text-win-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                PROVABLY FAIR 99.0% RTP
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-bold text-brand-600 font-mono">
                <Zap className="h-3 w-3 fill-current" />
                100,000X MAX PAYOUT
              </span>
            </div>

            <h2 className="mt-3 text-[clamp(1.85rem,3.8vw,2.85rem)] font-extrabold uppercase tracking-tight text-fg">
              1xGames &amp; Provably Fair Arcade
            </h2>
            <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
              Built in-house with certified cryptographic randomness, instant cashouts, and high-frequency multipliers. Test real-time odds or launch authentic demos.
            </p>
          </div>

          {/* Right Action & Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
            <div className="rail flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none [&>*]:shrink-0">
              {[
                { id: 'all', label: 'All Originals', icon: Gamepad2 },
                { id: 'crash', label: 'Crash', icon: Rocket },
                { id: 'mines', label: 'Mines', icon: Diamond },
                { id: 'arcade', label: 'Arcade', icon: Layers },
                { id: 'table', label: 'Dice & Cards', icon: Dices },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => { soundFX.playClick(); setActiveFilter(f.id); }}
                  className={`flex min-h-[44px] items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap sm:min-h-0 ${
                    activeFilter === f.id
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'bg-canvas border border-line text-fg-muted hover:border-brand-500/50 hover:text-fg'
                  }`}
                >
                  <f.icon className="h-3.5 w-3.5" />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>

            <Link
              href="/1xgames"
              className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-line-strong bg-canvas px-5 py-2.5 text-[14px] font-bold text-fg transition-all hover:border-brand-500 hover:bg-surface-3 shadow-xs"
            >
              <span>Explore all</span>
              <ArrowRight className="h-4 w-4 text-brand-600" />
            </Link>
          </div>
        </div>

        {/* Main Interactive Showcase Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Featured Aviator / Crash Arena Interactive Spotlight Card (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-line bg-gradient-to-b from-navy-950 via-[#031c36] to-navy-950 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden group">
            
            {/* Top Badge & Status */}
            <div className="flex items-center justify-between relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                SUPERSONIC CRASH ARENA
              </span>
              <span className="text-[12px] font-mono text-cyan-300 font-semibold bg-white/10 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                1xOriginal #01
              </span>
            </div>

            {/* Live Multiplier Display Arena */}
            <div className="my-8 flex flex-col items-center justify-center text-center relative z-10 py-6">
              <div className="relative mb-4 flex items-center justify-center">
                <div className={`text-6xl sm:text-7xl font-mono font-black tracking-tight transition-transform duration-150 ${
                  simCrashed 
                    ? 'text-rose-500 scale-95 animate-shake' 
                    : 'bg-gradient-to-r from-cyan-300 via-white to-volt-400 bg-clip-text text-transparent scale-105'
                }`}>
                  {simMultiplier.toFixed(2)}&times;
                </div>
              </div>

              <p className={`text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                simCrashed ? 'text-rose-400' : 'text-cyan-300 animate-pulse'
              }`}>
                {simCrashed ? 'FLEW AWAY — RESETTING' : 'MULTIPLIER ASCENDING IN REAL-TIME'}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-navy-200">
                <ShieldCheck className="h-4 w-4 text-win-500" />
                <span>SHA-256 Seed Verified · Instant Auto-Cashout</span>
              </div>
            </div>

            {/* Bottom Actions for Featured Game */}
            <div className="relative z-10 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleLaunch('aviator-1x')}
                  className="group/btn flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-400 active:scale-[0.98] transition cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Play Aviator</span>
                </button>
                <button
                  onClick={() => {
                    soundFX.playWin();
                    showToast(`Simulated Cashout at ${simMultiplier.toFixed(2)}x! (+${(50 * simMultiplier).toFixed(2)} USD)`);
                  }}
                  disabled={simCrashed}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold transition cursor-pointer ${
                    simCrashed 
                      ? 'bg-white/10 text-white/40 cursor-not-allowed'
                      : 'bg-win-500 hover:bg-win-600 text-white shadow-lg shadow-win-500/30 active:scale-[0.98]'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Test Cashout</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-navy-200 pt-2 border-t border-white/10">
                <span>Top Multiplier Today: <strong className="text-volt-400 font-mono">1,842.50&times;</strong></span>
                <span>Active Pilots: <strong className="text-white font-mono">14,920</strong></span>
              </div>
            </div>

            {/* Glowing Accent Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,122,204,0.22),transparent_70%)] pointer-events-none" />
          </div>

          {/* 1xGames 6-Card Grid (7 Columns) with Real Image Artwork */}
          <Rail className="lg:col-span-7" grid="sm:grid-cols-2 lg:grid-cols-3" gap="gap-3 sm:gap-4" label="1xGames titles">
            {filteredGames.map((game) => (
              <NeonBorder
                key={game.id}
                color={game.accent}
                secondaryColor="#007acc"
                borderRadius={12}
                borderWidth={1.5}
                duration={4}
                trailLength={20}
                glowIntensity={0.8}
                trackColor="transparent"
              >
                <div
                  onClick={() => handleLaunch(game.id)}
                  className="group relative flex flex-col justify-between rounded-xl border border-line bg-canvas shadow-xs transition-all duration-300 hover:border-brand-500/70 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden h-full"
                >
                {/* Top Image Artwork Banner */}
                <div className="relative h-32 w-full overflow-hidden bg-navy-950">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Top Badges over image */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider backdrop-blur-md ${game.tagColor}`}>
                      {game.tag}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                      {game.plays}
                    </span>
                  </div>

                  {/* Center Play Button Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-xs">
                    <div className="h-10 w-10 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="truncate text-[15px] font-bold text-fg group-hover:text-brand-600 transition-colors">
                        {game.title}
                      </h3>
                    </div>

                    <p className="text-[11px] font-medium text-fg-muted mt-0.5">
                      RTP: <strong className="text-win-600">{game.rtp}</strong> · Max <strong className="text-fg">{game.maxWin}</strong>
                    </p>

                    <p className="mt-2 text-[12px] leading-relaxed text-fg-muted line-clamp-2">
                      {game.desc}
                    </p>
                  </div>

                  {/* Bottom Quick Play Hover Bar */}
                  <div className="pt-2 border-t border-line flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-600 group-hover:text-brand-700 flex items-center gap-1">
                      <Play className="h-3 w-3 fill-current" />
                      Launch Demo
                    </span>
                    <span className="text-fg-dim font-mono text-[11px] font-medium">
                      1xOriginals
                    </span>
                  </div>
                </div>

                {/* Top Border Hover Glow */}
                <div 
                  className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: game.accent }}
                />
              </div>
              </NeonBorder>
            ))}
          </Rail>

        </div>

      </div>
    </section>
  );
};
