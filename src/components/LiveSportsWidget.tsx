'use client';

import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Tv, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { useSite } from '@/components/SiteChrome';

interface SportMatch {
  id: string;
  sport: 'cricket' | 'football' | 'basketball' | 'tennis' | 'esports';
  league: string;
  isLive: boolean;
  time: string;
  team1: { name: string; score: string; flag: string };
  team2: { name: string; score: string; flag: string };
  odds: {
    home: number;
    draw?: number;
    away: number;
  };
}

const SPORTS_MATCHES: SportMatch[] = [
  {
    id: 'm1',
    sport: 'cricket',
    league: 'Indian Premier League (IPL) • Live',
    isLive: true,
    time: '16.4 Ov',
    team1: { name: 'Mumbai Indians', score: '178/4', flag: '🏏' },
    team2: { name: 'Chennai Super Kings', score: '142/3', flag: '🦁' },
    odds: { home: 1.62, away: 2.35 },
  },
  {
    id: 'm2',
    sport: 'football',
    league: 'UEFA Champions League • 2nd Half',
    isLive: true,
    time: "74'",
    team1: { name: 'Real Madrid', score: '2', flag: '👑' },
    team2: { name: 'Manchester City', score: '2', flag: '🦅' },
    odds: { home: 2.80, draw: 3.10, away: 2.45 },
  },
  {
    id: 'm3',
    sport: 'football',
    league: 'Premier League • 1st Half',
    isLive: true,
    time: "38'",
    team1: { name: 'Arsenal', score: '1', flag: '🔴' },
    team2: { name: 'Liverpool', score: '0', flag: '⚔️' },
    odds: { home: 1.95, draw: 3.40, away: 3.80 },
  },
  {
    id: 'm4',
    sport: 'basketball',
    league: 'NBA Regular Season • Q4',
    isLive: true,
    time: '3:45 Q4',
    team1: { name: 'LA Lakers', score: '104', flag: '🏀' },
    team2: { name: 'Golden State Warriors', score: '102', flag: '🌉' },
    odds: { home: 1.74, away: 2.15 },
  },
  {
    id: 'm5',
    sport: 'esports',
    league: 'CS2 Major Championship • Map 3',
    isLive: true,
    time: 'Round 24',
    team1: { name: 'Natus Vincere', score: '13', flag: '⚡' },
    team2: { name: 'FaZe Clan', score: '11', flag: '🎯' },
    odds: { home: 1.55, away: 2.40 },
  },
  {
    id: 'm6',
    sport: 'tennis',
    league: 'Wimbledon Men\'s Singles • Set 4',
    isLive: true,
    time: 'Set 4 (4-3)',
    team1: { name: 'C. Alcaraz', score: '2 Sets', flag: '🎾' },
    team2: { name: 'N. Djokovic', score: '1 Set', flag: '🏆' },
    odds: { home: 1.48, away: 2.65 },
  },
];

export const LiveSportsWidget: React.FC = () => {
  const { openAuth, showToast } = useSite();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedOdd, setSelectedOdd] = useState<{ matchId: string; type: string } | null>(null);

  const filteredMatches = activeTab === 'all'
    ? SPORTS_MATCHES
    : SPORTS_MATCHES.filter((m) => m.sport === activeTab);

  const handlePlaceBet = (match: SportMatch, type: string, oddsValue: number) => {
    soundFX.playClick();
    setSelectedOdd({ matchId: match.id, type });
    showToast(`Quick Bet Added: ${type} @ ${oddsValue.toFixed(2)} — Click to confirm`);
  };

  return (
    <section className="border-t border-ink-200 bg-white py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow eyebrow-brand flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-rose-500 fill-current" />
                1xSports In-Play Hub
              </span>
              <span className="flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                1,420+ LIVE MATCHES
              </span>
            </div>
            <h2 className="mt-2 text-[26px] sm:text-[32px] font-bold tracking-[-0.03em] text-ink-900">
              Live Sports &amp; In-Play Betting
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Highest betting odds on IPL Cricket, UEFA Champions League, NBA, Tennis &amp; Esports with instant cashouts.
            </p>
          </div>

          {/* Sport Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: '🔥 All Live', count: 6 },
              { id: 'cricket', label: '🏏 Cricket', count: 1 },
              { id: 'football', label: '⚽ Football', count: 2 },
              { id: 'basketball', label: '🏀 Basketball', count: 1 },
              { id: 'tennis', label: '🎾 Tennis', count: 1 },
              { id: 'esports', label: '🎮 Esports', count: 1 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { soundFX.playClick(); setActiveTab(tab.id); }}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'bg-ink-50 text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Match Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-ink-200 bg-ink-25/60 p-5 shadow-xs transition-all duration-200 hover:border-brand-300 hover:bg-white hover:shadow-lg"
            >
              {/* Card Top: League & Live Clock */}
              <div className="flex items-center justify-between border-b border-ink-100 pb-3 text-xs">
                <span className="font-semibold text-ink-600 truncate max-w-[200px]">
                  {match.league}
                </span>
                <span className="flex items-center gap-1.5 rounded-md bg-rose-50 px-2 py-0.5 font-mono text-[11px] font-bold text-rose-600 border border-rose-200/60">
                  <Tv className="h-3 w-3 animate-pulse" />
                  {match.time}
                </span>
              </div>

              {/* Match Teams & Live Score */}
              <div className="my-4 space-y-2.5">
                {/* Team 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl leading-none">{match.team1.flag}</span>
                    <span className="truncate text-sm font-bold text-ink-900 group-hover:text-brand-600 transition">
                      {match.team1.name}
                    </span>
                  </div>
                  <span className="font-mono text-base font-black text-ink-900">
                    {match.team1.score}
                  </span>
                </div>

                {/* Team 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl leading-none">{match.team2.flag}</span>
                    <span className="truncate text-sm font-bold text-ink-900 group-hover:text-brand-600 transition">
                      {match.team2.name}
                    </span>
                  </div>
                  <span className="font-mono text-base font-black text-ink-900">
                    {match.team2.score}
                  </span>
                </div>
              </div>

              {/* 1X2 Quick Odds Row */}
              <div className="mt-2 grid grid-cols-3 gap-2">
                <button
                  onClick={() => handlePlaceBet(match, '1 (Home)', match.odds.home)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2 transition-all cursor-pointer ${
                    selectedOdd?.matchId === match.id && selectedOdd?.type === '1 (Home)'
                      ? 'border-brand-500 bg-brand-500 text-white shadow-md'
                      : 'border-ink-200 bg-white hover:border-brand-400 hover:bg-brand-50/50'
                  }`}
                >
                  <span className="text-[10px] font-bold text-ink-400">1</span>
                  <span className="font-mono text-xs font-black text-ink-900 group-hover:text-brand-700">
                    {match.odds.home.toFixed(2)}
                  </span>
                </button>

                {match.odds.draw ? (
                  <button
                    onClick={() => handlePlaceBet(match, 'X (Draw)', match.odds.draw!)}
                    className={`flex flex-col items-center justify-center rounded-xl border p-2 transition-all cursor-pointer ${
                      selectedOdd?.matchId === match.id && selectedOdd?.type === 'X (Draw)'
                        ? 'border-brand-500 bg-brand-500 text-white shadow-md'
                        : 'border-ink-200 bg-white hover:border-brand-400 hover:bg-brand-50/50'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-ink-400">X</span>
                    <span className="font-mono text-xs font-black text-ink-900 group-hover:text-brand-700">
                      {match.odds.draw.toFixed(2)}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center rounded-xl border border-dashed border-ink-200 bg-ink-50 text-[10px] font-bold text-ink-400">
                    N/A
                  </div>
                )}

                <button
                  onClick={() => handlePlaceBet(match, '2 (Away)', match.odds.away)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2 transition-all cursor-pointer ${
                    selectedOdd?.matchId === match.id && selectedOdd?.type === '2 (Away)'
                      ? 'border-brand-500 bg-brand-500 text-white shadow-md'
                      : 'border-ink-200 bg-white hover:border-brand-400 hover:bg-brand-50/50'
                  }`}
                >
                  <span className="text-[10px] font-bold text-ink-400">2</span>
                  <span className="font-mono text-xs font-black text-ink-900 group-hover:text-brand-700">
                    {match.odds.away.toFixed(2)}
                  </span>
                </button>
              </div>

              {/* Bottom Quick Bet Slip Bar */}
              <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-2.5 text-[11px]">
                <span className="flex items-center gap-1 text-ink-400">
                  <TrendingUp className="h-3.5 w-3.5 text-win-500" />
                  +120 Markets
                </span>
                <button
                  onClick={() => openAuth()}
                  className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
                >
                  Bet Now <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Sports Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => openAuth()}
            className="btn-1x-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold shadow-lg shadow-brand-500/20 cursor-pointer"
          >
            <Trophy className="h-4 w-4" />
            <span>Open Full Sportsbook &amp; Live Streams</span>
          </button>
        </div>

      </div>
    </section>
  );
};
