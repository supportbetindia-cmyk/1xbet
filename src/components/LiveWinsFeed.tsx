'use client';

import React, { useState, useEffect } from 'react';
import { LiveWin } from '@/lib/types';
import { LIVE_WINS_FEED } from '@/lib/gameData';

export const LiveWinsFeed: React.FC = () => {
  const [wins, setWins] = useState<LiveWin[]>(LIVE_WINS_FEED);

  useEffect(() => {
    const games = ['1xCrash Orbit', 'Gates of 1xOlympus', 'Plinko Turbo', 'Cyber Wheel VIP', '1xMines Grid'];
    const avatars = ['⚡', '👑', '🚀', '💎', '🎯', '🍀', '🔥', '🐺'];
    const currencies = ['$', '€', '₮'];

    const interval = setInterval(() => {
      const randomPlayer = `User***${Math.floor(Math.random() * 900 + 100)}`;
      const randomMult = +(Math.random() * 45 + 1.8).toFixed(2);
      const randomBet = Math.floor(Math.random() * 100 + 10);
      const randomPayout = +(randomBet * randomMult).toFixed(2);
      const cur = currencies[Math.floor(Math.random() * currencies.length)];

      const newWin: LiveWin = {
        id: 'w_' + Date.now(),
        player: randomPlayer,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
        game: games[Math.floor(Math.random() * games.length)],
        bet: `${cur}${randomBet}.00`,
        multiplier: `${randomMult}x`,
        payout: `${cur}${randomPayout.toLocaleString()}`,
        time: 'Just now',
        currency: 'USD',
      };

      setWins((prev) => [newWin, ...prev.slice(0, 11)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative border-y border-navy-800 bg-navy-900 py-2.5 overflow-hidden">
      <div className="mx-auto flex max-w-[1440px] items-center gap-5 px-4 sm:px-6 lg:px-8">

        <div className="flex shrink-0 items-center gap-2 pr-5 border-r border-white/10">
          <span className="live-dot" />
          <span className="text-[10px] font-medium uppercase tracking-[0.11em] text-white">
            Live wins
          </span>
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden edge-fade">
          <div className="animate-marquee items-center gap-3">
            {wins.concat(wins).map((win, idx) => (
              <div
                key={`${win.id}_${idx}`}
                className="flex items-center gap-2.5 whitespace-nowrap rounded-lg border border-white/8 bg-white/5 px-3 py-1.5 text-xs"
              >
                <span className="text-sm leading-none">{win.avatar}</span>
                <span className="font-medium text-navy-100">{win.player}</span>
                <span className="font-mono font-semibold text-win-500">{win.payout}</span>
                <span className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[10px] font-medium text-brand-200">
                  {win.multiplier}
                </span>
                <span className="text-[11px] text-navy-300">{win.game}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
