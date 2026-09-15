'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Radio, 
  Users, 
  Play, 
  ArrowRight, 
  CircleDot,
  Spade,
  Coins,
  Tv,
  Crown,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { AUTHENTIC_GAMES, AuthenticGame } from '@/lib/authenticGames';
import { soundFX } from '@/lib/audio';
import { useSite } from '@/components/SiteChrome';
import NeonBorder from '@/components/ui/NeonBorder';
import { Rail } from '@/components/ui/Rail';

interface LiveCasinoSectionProps {
  onSelectGame: (game: AuthenticGame) => void;
}

interface LiveTableItem {
  id: string;
  gameId?: string;
  title: string;
  category: 'roulette' | 'blackjack' | 'baccarat' | 'gameshow';
  provider: string;
  dealer: string;
  minBet: string;
  maxBet: string;
  activePlayers: number;
  badge: string;
  image: string;
  accent: string;
}

const LIVE_TABLES: LiveTableItem[] = [
  { 
    id: 'lt-1', 
    gameId: 'lightning-roulette-vip',
    title: 'Lightning Roulette XXXTreme', 
    category: 'roulette', 
    provider: 'Evolution Gaming', 
    dealer: 'Elena K.', 
    minBet: '€0.20', 
    maxBet: '€10,000', 
    activePlayers: 1480, 
    badge: '2000X MULTIS', 
    image: '/images/games/lightning-roulette.jpg',
    accent: '#f59e0b'
  },
  { 
    id: 'lt-2', 
    gameId: 'crazy-time-live',
    title: 'Crazy Time Live 4K', 
    category: 'gameshow', 
    provider: 'Evolution Gaming', 
    dealer: 'Marco D.', 
    minBet: '€0.10', 
    maxBet: '€5,000', 
    activePlayers: 2940, 
    badge: 'TOP SHOW', 
    image: '/images/games/crazy-time.jpg',
    accent: '#f43f5e'
  },
  { 
    id: 'lt-3', 
    gameId: 'speed-blackjack-vip-1x',
    title: '1xExclusive Speed Blackjack', 
    category: 'blackjack', 
    provider: '1xLive Studios', 
    dealer: 'Sarah M.', 
    minBet: '€5.00', 
    maxBet: '€25,000', 
    activePlayers: 420, 
    badge: 'VIP SALON PRIVÉ', 
    image: '/images/games/speed-blackjack.jpg',
    accent: '#007acc'
  },
  { 
    id: 'lt-4', 
    gameId: 'andar-bahar-live-1x',
    title: 'Andar Bahar Live 1xPro', 
    category: 'baccarat', 
    provider: '1xLive & Evolution', 
    dealer: 'Priya S.', 
    minBet: '€0.50', 
    maxBet: '€5,000', 
    activePlayers: 1500, 
    badge: 'INDIAN ROYAL', 
    image: '/images/games/andar-bahar.jpg',
    accent: '#a855f7'
  },
  { 
    id: 'lt-5', 
    gameId: 'monopoly-big-baller',
    title: 'Monopoly Big Baller Live', 
    category: 'gameshow', 
    provider: 'Evolution Gaming', 
    dealer: 'James L.', 
    minBet: '€0.10', 
    maxBet: '€2,000', 
    activePlayers: 1820, 
    badge: '3D BOARD GAME', 
    image: '/images/games/crazy-time.jpg',
    accent: '#10b981'
  },
  { 
    id: 'lt-6', 
    title: 'Speed Baccarat Super 6', 
    category: 'baccarat', 
    provider: 'Evolution Gaming', 
    dealer: 'Mei Lin', 
    minBet: '€1.00', 
    maxBet: '€15,000', 
    activePlayers: 960, 
    badge: 'FAST 15s ROUNDS', 
    image: '/images/games/speed-blackjack.jpg',
    accent: '#ef4444'
  },
  { 
    id: 'lt-7', 
    title: 'Infinite Cyber Blackjack', 
    category: 'blackjack', 
    provider: '1xLive Studios', 
    dealer: 'Alex R.', 
    minBet: '€1.00', 
    maxBet: '€5,000', 
    activePlayers: 1350, 
    badge: 'UNLIMITED SEATS', 
    image: '/images/games/speed-blackjack.jpg',
    accent: '#0284c7'
  },
  { 
    id: 'lt-8', 
    title: 'Mega Roulette 500x', 
    category: 'roulette', 
    provider: 'Pragmatic Play Live', 
    dealer: 'Victoria S.', 
    minBet: '€0.10', 
    maxBet: '€5,000', 
    activePlayers: 890, 
    badge: '500X MULTIS', 
    image: '/images/games/lightning-roulette.jpg',
    accent: '#ec4899'
  }
];

export const LiveCasinoSection: React.FC<LiveCasinoSectionProps> = ({ onSelectGame }) => {
  const { openAuth } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTables = activeCategory === 'all'
    ? LIVE_TABLES
    : LIVE_TABLES.filter((t) => t.category === activeCategory);

  const handleTableClick = (table: LiveTableItem) => {
    soundFX.playClick();
    if (table.gameId) {
      const match = AUTHENTIC_GAMES.find((g) => g.id === table.gameId);
      if (match) {
        onSelectGame(match);
        return;
      }
    }
    openAuth();
  };

  return (
    <section id="live-casino" className="relative border-t border-line bg-canvas py-8 sm:py-9 lg:py-10 overflow-hidden">
      
      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        
        {/* Header Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label label-volt flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-loss-500 animate-pulse" />
                Live Broadcast Center
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-loss-500/30 bg-loss-500/10 px-3 py-1 text-[11px] font-bold text-loss-600">
                <span className="h-2 w-2 rounded-full bg-loss-500 animate-pulse" />
                4K ULTRA HD STREAMS
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-brass-500/40 bg-brass-500/10 px-3 py-1 text-[11px] font-bold text-brass-600 font-mono">
                <Crown className="h-3.5 w-3.5" />
                SALON PRIVÉ VIP TABLES
              </span>
            </div>

            <h2 className="mt-3 text-[clamp(1.85rem,3.8vw,2.85rem)] font-extrabold uppercase tracking-tight text-fg">
              Live Dealer &amp; VIP Casino Lounge
            </h2>
            <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
              Experience genuine casino atmosphere with native professional dealers, 4K multi-camera streaming, chain lightning multipliers, and private VIP tables.
            </p>
          </div>

          {/* Right Action & Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
            <div className="rail flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none [&>*]:shrink-0">
              {[
                { id: 'all', label: 'All Tables', icon: Radio },
                { id: 'roulette', label: 'Roulette', icon: CircleDot },
                { id: 'blackjack', label: 'Blackjack', icon: Spade },
                { id: 'baccarat', label: 'Baccarat', icon: Coins },
                { id: 'gameshow', label: 'Game Shows', icon: Tv },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { soundFX.playClick(); setActiveCategory(cat.id); }}
                  className={`flex min-h-[44px] items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap sm:min-h-0 ${
                    activeCategory === cat.id
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'bg-surface-1 border border-line text-fg-muted hover:border-brand-500/50 hover:text-fg'
                  }`}
                >
                  <cat.icon className="h-3.5 w-3.5" />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            <Link
              href="/casino"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[8px] border border-line-strong bg-canvas px-5 py-2.5 text-[14px] font-bold text-fg transition-all hover:border-brand-500 hover:bg-surface-3 shadow-xs"
            >
              <span>All 195+ Tables</span>
              <ArrowRight className="h-4 w-4 text-brand-600" />
            </Link>
          </div>
        </div>

        {/* Live Casino Tables 8-Grid with Real High-Res Photos (Full Width) */}
        <Rail className="mt-8" grid="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" gap="gap-3 sm:gap-5" label="Live casino tables">
          {filteredTables.map((table) => (
            <NeonBorder
              key={table.id}
              color={table.accent}
              secondaryColor="#007acc"
              borderRadius={16}
              borderWidth={1.5}
              duration={4}
              trailLength={20}
              glowIntensity={0.8}
              trackColor="transparent"
            >
              <div
                onClick={() => handleTableClick(table)}
                className="group relative flex flex-col justify-between rounded-2xl border border-line bg-canvas overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer h-full"
              >
              {/* Card Top Artwork & Live Feed Frame with Real Photos */}
              <div className="relative h-48 w-full overflow-hidden bg-navy-950">
                <img
                  src={table.image}
                  alt={table.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                
                {/* Live Dot & Multiplier Badge */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE 4K</span>
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/40 font-mono">
                    {table.badge}
                  </span>
                </div>

                {/* Hover Play Backdrop Overlay */}
                <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                  <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    Join Live Table
                  </span>
                </div>

                {/* Bottom Dealer & Active Players Bar over image */}
                <div className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center justify-between text-[11px] font-semibold text-white/95 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                  <span>Dealer: <strong className="text-white">{table.dealer}</strong></span>
                  <span className="flex items-center gap-1 text-cyan-300 font-mono">
                    <Users className="w-3.5 h-3.5" />
                    <span>{table.activePlayers.toLocaleString()}</span>
                  </span>
                </div>
              </div>

              {/* Card Bottom Details */}
              <div className="p-4 bg-canvas flex flex-col justify-between flex-1 border-t border-line space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-[15px] text-fg truncate group-hover:text-brand-600 transition-colors">
                    {table.title}
                  </h3>
                  <span className="shrink-0 text-[11px] font-bold text-brand-600 font-mono bg-brand-500/10 px-2 py-0.5 rounded">
                    {table.provider.replace(' Gaming', '').replace(' Live', '')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[12px] pt-2 border-t border-line text-fg-muted font-medium">
                  <span>Limits: <strong className="font-mono text-fg font-bold">{table.minBet} – {table.maxBet}</strong></span>
                  <span className="text-brand-600 font-bold flex items-center gap-1 group-hover:underline">
                    Play Table &rarr;
                  </span>
                </div>
              </div>

              {/* Accent Line on Top */}
              <div 
                className="absolute inset-x-0 top-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: table.accent }}
              />
            </div>
            </NeonBorder>
          ))}
        </Rail>

        {/* Live Casino Statistics Banner */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl border border-line bg-surface-1">
          {[
            { label: 'Live Tables', value: '195+', desc: 'Roulette, Blackjack, Baccarat' },
            { label: 'Active Players', value: '11,480', desc: 'Playing live right now' },
            { label: 'Max VIP Table Limit', value: '€25,000', desc: 'High-roller salon privé' },
            { label: 'Stream Quality', value: '4K Ultra HD', desc: 'Zero-latency multi-angle' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-fg-dim">{stat.label}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-brand-600 mt-1">{stat.value}</span>
              <span className="text-[12px] text-fg-muted mt-0.5">{stat.desc}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
