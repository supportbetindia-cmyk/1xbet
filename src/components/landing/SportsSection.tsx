'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Flame, 
  Tv, 
  ArrowRight, 
  TrendingUp, 
  Activity, 
  Gamepad2,
  Zap,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { useSite } from '@/components/SiteChrome';

interface SportMatch {
  id: string;
  sport: 'cricket' | 'football' | 'basketball' | 'tennis' | 'esports';
  league: string;
  isLive: boolean;
  time: string;
  team1: { name: string; score: string; code: string; bg: string; text: string };
  team2: { name: string; score: string; code: string; bg: string; text: string };
  odds: {
    home: number;
    draw?: number;
    away: number;
  };
  momentum?: number; // 0-100% home advantage
  marketsCount: number;
}

const SPORTS_MATCHES: SportMatch[] = [
  {
    id: 'm1',
    sport: 'cricket',
    league: 'Indian Premier League (IPL) • Live In-Play',
    isLive: true,
    time: '16.4 Ov · 1st Inn',
    team1: { name: 'Mumbai Indians', score: '178/4', code: 'MI', bg: 'bg-[#004ba0]', text: 'text-white' },
    team2: { name: 'Chennai Super Kings', score: '142/3', code: 'CSK', bg: 'bg-[#fdb913]', text: 'text-[#002f5e]' },
    odds: { home: 1.62, away: 2.35 },
    momentum: 62,
    marketsCount: 165
  },
  {
    id: 'm2',
    sport: 'football',
    league: 'UEFA Champions League • 2nd Half',
    isLive: true,
    time: "74' Live",
    team1: { name: 'Real Madrid', score: '2', code: 'RMA', bg: 'bg-[#002f5e]', text: 'text-white' },
    team2: { name: 'Manchester City', score: '2', code: 'MCI', bg: 'bg-[#6cabdd]', text: 'text-white' },
    odds: { home: 2.80, draw: 3.10, away: 2.45 },
    momentum: 50,
    marketsCount: 240
  },
  {
    id: 'm3',
    sport: 'football',
    league: 'Premier League • 1st Half',
    isLive: true,
    time: "38' Live",
    team1: { name: 'Arsenal', score: '1', code: 'ARS', bg: 'bg-[#db0007]', text: 'text-white' },
    team2: { name: 'Liverpool', score: '0', code: 'LIV', bg: 'bg-[#c8102e]', text: 'text-white' },
    odds: { home: 1.95, draw: 3.40, away: 3.80 },
    momentum: 68,
    marketsCount: 195
  },
  {
    id: 'm4',
    sport: 'basketball',
    league: 'NBA Regular Season • Q4',
    isLive: true,
    time: '3:45 Q4',
    team1: { name: 'LA Lakers', score: '104', code: 'LAL', bg: 'bg-[#552583]', text: 'text-[#fdb927]' },
    team2: { name: 'Golden State Warriors', score: '102', code: 'GSW', bg: 'bg-[#1d428a]', text: 'text-[#ffc72c]' },
    odds: { home: 1.74, away: 2.15 },
    momentum: 55,
    marketsCount: 130
  },
  {
    id: 'm5',
    sport: 'esports',
    league: 'CS2 Major Championship • Map 3 Decider',
    isLive: true,
    time: 'Round 24 (13-11)',
    team1: { name: 'Natus Vincere', score: '13', code: 'NAVI', bg: 'bg-[#fff200]', text: 'text-black font-black' },
    team2: { name: 'FaZe Clan', score: '11', code: 'FAZE', bg: 'bg-[#e41e2b]', text: 'text-white' },
    odds: { home: 1.55, away: 2.40 },
    momentum: 60,
    marketsCount: 95
  },
  {
    id: 'm6',
    sport: 'tennis',
    league: "Wimbledon Men's Singles • Set 4",
    isLive: true,
    time: 'Set 4 (4-3)',
    team1: { name: 'Carlos Alcaraz', score: '2 Sets', code: 'ALC', bg: 'bg-[#00703c]', text: 'text-white' },
    team2: { name: 'Novak Djokovic', score: '1 Set', code: 'DJO', bg: 'bg-[#0c2340]', text: 'text-white' },
    odds: { home: 1.48, away: 2.65 },
    momentum: 58,
    marketsCount: 88
  },
];

export const SportsSection: React.FC = () => {
  const { openAuth, showToast } = useSite();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedOdd, setSelectedOdd] = useState<{ matchId: string; type: string } | null>(null);

  const filteredMatches = activeTab === 'all'
    ? SPORTS_MATCHES
    : SPORTS_MATCHES.filter((m) => m.sport === activeTab);

  const handlePlaceBet = (match: SportMatch, type: string, oddsValue: number) => {
    soundFX.playClick();
    setSelectedOdd({ matchId: match.id, type });
    showToast(`Quick Bet Selected: ${match.team1.name} vs ${match.team2.name} [${type} @ ${oddsValue.toFixed(2)}]`);
  };

  return (
    <section id="sports" className="relative border-t border-line bg-surface-1 py-14 sm:py-18 lg:py-22 overflow-hidden">
      
      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        
        {/* Header Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label label-volt flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-rose-500 fill-current animate-pulse" />
                1xSports In-Play Center
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-[11px] font-bold text-rose-600">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                1,420+ LIVE MATCHES IN PLAY
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-bold text-brand-600 font-mono">
                <Zap className="h-3 w-3 fill-current" />
                HIGHEST MARKET ODDS
              </span>
            </div>

            <h2 className="mt-3 text-[clamp(1.85rem,3.8vw,2.85rem)] font-extrabold uppercase tracking-tight text-fg">
              Sports Betting &amp; In-Play Live Match Odds
            </h2>
            <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
              Live odds on IPL Cricket, UEFA Champions League, NBA, Tennis Grand Slams and Esports. Click any odd to activate fast single-tap betting.
            </p>
          </div>

          {/* Right Action & Sport Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All Live', icon: Flame },
                { id: 'cricket', label: 'Cricket IPL', icon: Trophy },
                { id: 'football', label: 'Football', icon: Activity },
                { id: 'basketball', label: 'Basketball', icon: Trophy },
                { id: 'tennis', label: 'Tennis', icon: Activity },
                { id: 'esports', label: 'Esports', icon: Gamepad2 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { soundFX.playClick(); setActiveTab(tab.id); }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'bg-canvas border border-line text-fg-muted hover:border-brand-500/50 hover:text-fg'
                  }`}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <Link
              href="/lobby"
              className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-line-strong bg-canvas px-5 py-2.5 text-[14px] font-bold text-fg transition-all hover:border-brand-500 hover:bg-surface-3 shadow-xs"
            >
              <span>Full Sportsbook</span>
              <ArrowRight className="h-4 w-4 text-brand-600" />
            </Link>
          </div>
        </div>

        {/* Live Match Cards Grid (Full Width) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-line bg-canvas p-5 shadow-xs transition-all duration-300 hover:border-brand-500/70 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Card Top: League & Live Clock */}
              <div className="flex items-center justify-between border-b border-line pb-3 text-xs">
                <span className="font-bold text-fg-muted truncate max-w-[220px]">
                  {match.league}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 px-2.5 py-0.5 font-mono text-[11px] font-bold text-rose-600">
                  <Tv className="h-3 w-3 animate-pulse" />
                  {match.time}
                </span>
              </div>

              {/* Match Teams & Live Score with Clean Team Badges */}
              <div className="my-4 space-y-3">
                {/* Team 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-black shadow-xs ${match.team1.bg} ${match.team1.text}`}>
                      {match.team1.code}
                    </div>
                    <span className="truncate text-[15px] font-bold text-fg group-hover:text-brand-600 transition-colors">
                      {match.team1.name}
                    </span>
                  </div>
                  <span className="font-mono text-base font-black text-brand-600">
                    {match.team1.score}
                  </span>
                </div>

                {/* Team 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-black shadow-xs ${match.team2.bg} ${match.team2.text}`}>
                      {match.team2.code}
                    </div>
                    <span className="truncate text-[15px] font-bold text-fg group-hover:text-brand-600 transition-colors">
                      {match.team2.name}
                    </span>
                  </div>
                  <span className="font-mono text-base font-black text-brand-600">
                    {match.team2.score}
                  </span>
                </div>

                {/* Momentum Visualizer Bar */}
                {match.momentum && (
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-[10px] text-fg-dim font-semibold mb-1">
                      <span>Match Pressure</span>
                      <span className="font-mono">{match.momentum}% / {100 - match.momentum}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-line overflow-hidden flex">
                      <div 
                        className="h-full bg-brand-500 transition-all duration-500"
                        style={{ width: `${match.momentum}%` }}
                      />
                      <div 
                        className="h-full bg-brand-200 transition-all duration-500"
                        style={{ width: `${100 - match.momentum}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 1X2 Interactive Quick Odds Row */}
              <div className="mt-2 grid grid-cols-3 gap-2">
                <button
                  onClick={() => handlePlaceBet(match, '1 (Home)', match.odds.home)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2.5 transition-all cursor-pointer ${
                    selectedOdd?.matchId === match.id && selectedOdd?.type === '1 (Home)'
                      ? 'border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'border-line bg-surface-1 hover:border-brand-400 hover:bg-brand-50/50'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${
                    selectedOdd?.matchId === match.id && selectedOdd?.type === '1 (Home)' ? 'text-white/80' : 'text-fg-dim'
                  }`}>
                    1 (Home)
                  </span>
                  <span className={`font-mono text-xs sm:text-sm font-black ${
                    selectedOdd?.matchId === match.id && selectedOdd?.type === '1 (Home)' ? 'text-white' : 'text-fg'
                  }`}>
                    {match.odds.home.toFixed(2)}
                  </span>
                </button>

                {match.odds.draw ? (
                  <button
                    onClick={() => handlePlaceBet(match, 'X (Draw)', match.odds.draw!)}
                    className={`flex flex-col items-center justify-center rounded-xl border p-2.5 transition-all cursor-pointer ${
                      selectedOdd?.matchId === match.id && selectedOdd?.type === 'X (Draw)'
                        ? 'border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/20'
                        : 'border-line bg-surface-1 hover:border-brand-400 hover:bg-brand-50/50'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${
                      selectedOdd?.matchId === match.id && selectedOdd?.type === 'X (Draw)' ? 'text-white/80' : 'text-fg-dim'
                    }`}>
                      X (Draw)
                    </span>
                    <span className={`font-mono text-xs sm:text-sm font-black ${
                      selectedOdd?.matchId === match.id && selectedOdd?.type === 'X (Draw)' ? 'text-white' : 'text-fg'
                    }`}>
                      {match.odds.draw.toFixed(2)}
                    </span>
                  </button>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface-1 text-[10px] font-bold text-fg-dim/60">
                    <span>Draw</span>
                    <span className="font-mono text-xs">--</span>
                  </div>
                )}

                <button
                  onClick={() => handlePlaceBet(match, '2 (Away)', match.odds.away)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2.5 transition-all cursor-pointer ${
                    selectedOdd?.matchId === match.id && selectedOdd?.type === '2 (Away)'
                      ? 'border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'border-line bg-surface-1 hover:border-brand-400 hover:bg-brand-50/50'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${
                    selectedOdd?.matchId === match.id && selectedOdd?.type === '2 (Away)' ? 'text-white/80' : 'text-fg-dim'
                  }`}>
                    2 (Away)
                  </span>
                  <span className={`font-mono text-xs sm:text-sm font-black ${
                    selectedOdd?.matchId === match.id && selectedOdd?.type === '2 (Away)' ? 'text-white' : 'text-fg'
                  }`}>
                    {match.odds.away.toFixed(2)}
                  </span>
                </button>
              </div>

              {/* Bottom Quick Action Bar */}
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[12px]">
                <span className="flex items-center gap-1.5 text-fg-muted font-medium">
                  <TrendingUp className="h-3.5 w-3.5 text-win-600" />
                  +{match.marketsCount} Markets
                </span>
                <button
                  onClick={() => openAuth()}
                  className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Place Bet</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Sports Features Strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl border border-line bg-canvas">
          {[
            { label: 'Daily Matches', value: '1,420+', desc: 'Cricket, Football & Tennis' },
            { label: 'Live Odds Payout', value: '97.6%', desc: 'Industry-leading margins' },
            { label: 'Instant Cashout', value: 'Zero Delay', desc: 'Lock profits in real-time' },
            { label: 'Multi-Bet Boost', value: 'Up to +25%', desc: 'Accumulator bonus odds' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-fg-dim">{item.label}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-brand-600 mt-1">{item.value}</span>
              <span className="text-[12px] text-fg-muted mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
