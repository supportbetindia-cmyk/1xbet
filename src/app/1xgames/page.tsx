'use client';

import React, { useState } from 'react';
import { useSite } from '@/components/SiteChrome';
import { CrashGame } from '@/components/CrashGame';
import { GameTheaterModal } from '@/components/GameTheaterModal';
import { GameCard } from '@/components/GameCard';
import { AuthenticGame } from '@/lib/authenticGames';
import { soundFX } from '@/lib/audio';
import { 
  Zap, 
  Play
} from 'lucide-react';

export default function OneXGamesPage() {
  const { openAuth } = useSite();
  const [activeTheaterGame, setActiveTheaterGame] = useState<AuthenticGame | null>(null);

  const arcadeGames: AuthenticGame[] = [
    {
      id: 'aviator-1x',
      title: 'Aviator 1xPro',
      category: 'originals',
      provider: 'Spribe & 1xLab',
      rtp: '99.0%',
      volatility: 'High',
      maxWin: '10,000x',
      minBet: 0.10,
      maxBet: 500,
      badge: 'TOP MULTIPLIER',
      isHot: true,
      playsCount: '1.4M',
      description: 'Cosmic social curve game. Watch the multiplier climb exponentially and cash out in time!',
      posterBg: 'linear-gradient(135deg, #e11d48 0%, #be123c 50%, #881337 100%)',
      iconSymbol: '✈️',
      accentColor: '#e11d48'
    },
    {
      id: '1x-mines',
      title: '1xMines Grid',
      category: 'originals',
      provider: '1xOriginals',
      rtp: '99.0%',
      volatility: 'Very High',
      maxWin: '100,000x',
      minBet: 0.05,
      maxBet: 1000,
      badge: 'CUSTOM MINES',
      isHot: true,
      playsCount: '890K',
      description: 'Dodge the explosive landmines across the 5x5 grid and uncover diamond crystals for compounding payouts.',
      posterBg: 'linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%)',
      iconSymbol: '💎',
      accentColor: '#10b981'
    },
    {
      id: '1x-plinko',
      title: '1xPlinko Ultra',
      category: 'originals',
      provider: '1xOriginals',
      rtp: '99.0%',
      volatility: 'High',
      maxWin: '1,000x',
      minBet: 0.10,
      maxBet: 500,
      badge: '16 ROWS',
      isHot: true,
      playsCount: '750K',
      description: 'Drop peg spheres down the pyramid into extreme edge multiplier pockets.',
      posterBg: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)',
      iconSymbol: '⚪',
      accentColor: '#8b5cf6'
    },
    {
      id: 'apple-of-fortune',
      title: 'Apple of Fortune 1x',
      category: 'originals',
      provider: '1xOriginals',
      rtp: '98.5%',
      volatility: 'Medium',
      maxWin: '350x',
      minBet: 0.20,
      maxBet: 300,
      badge: '10 TIERS',
      isHot: true,
      playsCount: '610K',
      description: 'Climb the 10 apple rows. Pick ripe red apples to multiply your bet or hit a rotten apple core.',
      posterBg: 'linear-gradient(135deg, #ea580c 0%, #c2410c 50%, #7c2d12 100%)',
      iconSymbol: '🍎',
      accentColor: '#ea580c'
    },
    {
      id: 'crystal-1x',
      title: 'Crystal Deluxe Arcade',
      category: 'originals',
      provider: '1xOriginals',
      rtp: '98.8%',
      volatility: 'High',
      maxWin: '500x',
      minBet: 0.10,
      maxBet: 500,
      badge: 'CLUSTER MATCH',
      isNew: true,
      playsCount: '440K',
      description: 'Match 5+ identical colored crystals on the 7x7 grid with cascading multipliers.',
      posterBg: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)',
      iconSymbol: '🔮',
      accentColor: '#0284c7'
    },
    {
      id: 'under-over-7',
      title: 'Under and Over 7',
      category: 'originals',
      provider: '1xOriginals',
      rtp: '98.0%',
      volatility: 'Low',
      maxWin: '6x',
      minBet: 0.50,
      maxBet: 2000,
      badge: 'CLASSIC DICE',
      isNew: false,
      playsCount: '320K',
      description: 'Predict whether two dice will total under 7, over 7, or exactly lucky 7.',
      posterBg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)',
      iconSymbol: '🎲',
      accentColor: '#64748b'
    }
  ];

  return (
    <>
      <main className="flex-1 overflow-x-hidden p-4 sm:p-8 max-w-[1440px] mx-auto w-full space-y-8">
        
        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-700 to-navy-900 text-white p-6 sm:p-10 shadow-xl border border-brand-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-200 border border-brand-400/30 text-[10px] font-medium uppercase tracking-[0.1em]">
              <Zap className="w-3.5 h-3.5 text-brass-400" />
              <span>Exclusive 1xOriginals &amp; fast arcade</span>
            </div>
            <h1 className="text-[30px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.032em] text-white">
              Fast-action games at 99% RTP
            </h1>
            <p className="text-xs sm:text-sm text-navy-100 leading-relaxed">
              Experience supersonic instant-play games designed in-house with certified SHA-256 provably fair mechanics and multipliers up to 100,000x.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="text-center">
              <span className="text-[10px] text-ink-300 font-bold uppercase block">RTP RATE</span>
              <span className="text-2xl font-semibold font-mono text-win-500">99.0%</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="text-[10px] text-ink-300 font-bold uppercase block">MAX MULTIPLIER</span>
              <span className="text-2xl font-semibold font-mono text-brass-300">100,000x</span>
            </div>
          </div>
        </div>

        {/* Interactive Crash Flight Arena */}
        <CrashGame
          balance={1250}
          currency="USD"
          onUpdateBalance={() => {}}
          onOpenDeposit={() => openAuth()}
        />

        {/* 1xGames Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-ink-900">
              All 1xGames originals
            </h2>
            <span className="text-xs font-bold text-ink-500">6 Certified Titles</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {arcadeGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                showDescription
                onSelect={(g) => {
                  soundFX.playClick();
                  setActiveTheaterGame(g);
                }}
              />
            ))}
          </div>
        </div>

      </main>

      <GameTheaterModal
        game={activeTheaterGame}
        isOpen={!!activeTheaterGame}
        onClose={() => setActiveTheaterGame(null)}
        balance={1250}
        currency="USD"
        onUpdateBalance={() => {}}
        onOpenDeposit={() => openAuth()}
      />
    </>
  );
}
