'use client';

import React from 'react';
import { useSite } from '@/components/SiteChrome';
import { soundFX } from '@/lib/audio';
import { 
  Trophy, 
  Clock, 
  Crown
} from 'lucide-react';

interface TournamentItem {
  id: string;
  title: string;
  gameCategory: string;
  prizePool: string;
  timeLeft: string;
  playersCount: number;
  minBet: string;
  topPrize: string;
  bgGradient: string;
  isHot?: boolean;
}

const TOURNAMENTS: TournamentItem[] = [
  { id: 't-1', title: '$100,000 Crash Speedway 2026', gameCategory: '1xCrash & Fast Arcade', prizePool: '$100,000', timeLeft: '3d 14h 20m', playersCount: 1420, minBet: '$0.50', topPrize: '$25,000', bgGradient: 'from-brand-600 via-brand-500 to-navy-950', isHot: true },
  { id: 't-2', title: '€500,000 Pragmatic Drops & Wins', gameCategory: 'All Pragmatic Slots', prizePool: '€500,000', timeLeft: '8d 06h 45m', playersCount: 4890, minBet: '€0.50', topPrize: '€100,000', bgGradient: 'from-brass-600 via-brass-600 to-navy-950', isHot: true },
  { id: 't-3', title: '$50,000 Live Blackjack Masters', gameCategory: 'Evolution Live Tables', prizePool: '$50,000', timeLeft: '1d 08h 12m', playersCount: 680, minBet: '$5.00', topPrize: '$15,000', bgGradient: 'from-brand-700 via-brand-700 to-navy-950' },
  { id: 't-4', title: '$25,000 Weekend Slot Sprint', gameCategory: 'Hacksaw & Nolimit', prizePool: '$25,000', timeLeft: '18h 30m', playersCount: 940, minBet: '$0.20', topPrize: '$7,500', bgGradient: 'from-win-600 via-win-600 to-navy-950' },
];

const LEADERBOARD = [
  { rank: 1, user: 'Pilot_Alex***', points: '148,920 pts', prize: '$25,000 Cash', medal: '🥇' },
  { rank: 2, user: 'CryptoKing***', points: '124,500 pts', prize: '$15,000 Cash', medal: '🥈' },
  { rank: 3, user: 'ZeusWinner***', points: '98,200 pts', prize: '$10,000 Cash', medal: '🥉' },
  { rank: 4, user: 'Elena_Pro***', points: '76,410 pts', prize: '$5,000 Cash', medal: '4' },
  { rank: 5, user: 'Vortex_99***', points: '64,120 pts', prize: '$3,500 Cash', medal: '5' },
  { rank: 6, user: 'MaxMultiplier***', points: '52,800 pts', prize: '$2,000 Cash', medal: '6' },
  { rank: 7, user: 'HighRoller_K***', points: '41,300 pts', prize: '$1,500 Cash', medal: '7' },
];

export default function TournamentsPage() {
  const { openAuth } = useSite();

  return (
    <>
      <main className="flex-1 overflow-x-hidden p-4 sm:p-8 max-w-[1440px] mx-auto w-full space-y-8">
        
        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-700 to-navy-900 text-white p-6 sm:p-10 shadow-xl border border-brand-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass-500/20 text-brass-300 border border-brass-400/30 text-[10px] font-medium uppercase tracking-[0.1em]">
              <Trophy className="w-4 h-4 text-brass-400" />
              <span>High-stakes tournament arena</span>
            </div>
            <h1 className="text-[30px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.032em] text-white">
              Compete for $500,000+ in cash
            </h1>
            <p className="text-xs sm:text-sm text-navy-100 leading-relaxed">
              Climb the real-time multiplier leaderboards on slots, crash, and live tables. Top ranks split massive cash prizes paid out with zero wagering.
            </p>
          </div>
        </div>

        {/* Active Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOURNAMENTS.map((t) => (
            <div
              key={t.id}
              className="gaming-card rounded-3xl overflow-hidden border border-ink-200 hover:border-brand-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between bg-white"
            >
              <div className={`p-6 text-white bg-gradient-to-r ${t.bgGradient} space-y-4`}>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-black/40 backdrop-blur-md border border-white/20">
                    {t.gameCategory}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono font-bold bg-black/50 px-2.5 py-1 rounded-xl text-brass-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.timeLeft}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">{t.title}</h3>
                  <div className="text-2xl font-semibold font-mono text-brass-300 mt-1">
                    Prize Pool: {t.prizePool}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-ink-600 bg-ink-50 p-3 rounded-2xl border border-ink-100">
                  <div>
                    <span className="text-[10px] text-ink-400 uppercase block">1st Prize</span>
                    <strong className="text-win-600 font-mono text-sm">{t.topPrize}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-400 uppercase block">Min Bet</span>
                    <strong className="text-navy-900 font-mono text-sm">{t.minBet}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-400 uppercase block">Pilots</span>
                    <strong className="text-brand-600 font-mono text-sm">{t.playersCount}</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    openAuth();
                  }}
                  className="w-full py-3 rounded-2xl font-semibold text-xs btn-1x-primary flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Trophy className="w-4 h-4" />
                  <span>JOIN TOURNAMENT RACE</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Tournament Leaderboard */}
        <div className="space-y-4 pt-4">
          <h2 className="flex items-center gap-2.5 text-[26px] font-semibold tracking-[-0.03em] text-ink-900">
            <Crown className="w-6 h-6 text-brass-500" />
            <span>Crash Speedway Live Leaderboard</span>
          </h2>

          <div className="bg-ink-50 rounded-3xl border border-ink-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-ink-100/80 text-[11px] font-semibold text-ink-500 uppercase tracking-wider border-b border-ink-200">
                <tr>
                  <th className="py-3.5 px-4">Rank</th>
                  <th className="py-3.5 px-4">Player</th>
                  <th className="py-3.5 px-4 text-center">Score Points</th>
                  <th className="py-3.5 px-4 text-right">Guaranteed Prize</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200/70 font-semibold text-navy-800">
                {LEADERBOARD.map((row) => (
                  <tr key={row.rank} className="hover:bg-white transition">
                    <td className="py-3.5 px-4 font-semibold text-base">{row.medal}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900">{row.user}</td>
                    <td className="py-3.5 px-4 text-center font-mono text-ink-600">{row.points}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-win-600">{row.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </>
  );
}
