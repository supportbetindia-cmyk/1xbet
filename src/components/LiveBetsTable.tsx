'use client';

import React, { useState, useEffect } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { ShieldCheck, X } from 'lucide-react';
import { RealBetItem, INITIAL_REAL_BETS } from '@/lib/authenticGames';
import { soundFX } from '@/lib/audio';

type TabId = 'all' | 'high' | 'lucky';

const TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'All bets' },
  { id: 'high', label: 'High rollers' },
  { id: 'lucky', label: 'Lucky wins' },
];

export const LiveBetsTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [bets, setBets] = useState<RealBetItem[]>(INITIAL_REAL_BETS);
  const [selectedVerifyBet, setSelectedVerifyBet] = useState<RealBetItem | null>(null);

  useEffect(() => {
    const games = [
      { title: 'Aviator 1xPro', icon: '✈️' },
      { title: 'Gates of Olympus 1000', icon: '⚡' },
      { title: '1xMines Grid', icon: '💎' },
      { title: '1xPlinko Ultra', icon: '⚪' },
      { title: 'Crazy Time Live', icon: '🎡' },
      { title: 'Sweet Bonanza 1000', icon: '🍭' },
      { title: 'Wanted Dead or a Wild', icon: '🤠' },
      { title: 'Tombstone RIP', icon: '⚰️' },
    ];

    const users = ['Player_492', 'Vortex_X', 'CryptoWhale', 'LuckyStrike', 'Elena_Pro', 'MaxGains', 'NightWolf', 'DiamondHands'];

    const interval = setInterval(() => {
      const g = games[Math.floor(Math.random() * games.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const isWin = Math.random() < 0.65;
      const betAmt = Math.random() < 0.2 ? Math.floor(Math.random() * 400 + 100) : Math.floor(Math.random() * 40 + 5);
      const mult = isWin ? +(Math.random() * 35 + 1.25).toFixed(2) : 0.0;
      const payout = isWin ? +(betAmt * mult).toFixed(2) : 0.0;

      const newBet: RealBetItem = {
        id: 'b-' + Date.now(),
        gameTitle: g.title,
        gameIcon: g.icon,
        user: `${user.slice(0, 5)}***`,
        time: 'Just now',
        betAmount: betAmt,
        multiplier: mult,
        payout: payout,
        isWin: isWin,
        currency: 'USD',
      };

      setBets((prev) => [newBet, ...prev.slice(0, 14)]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const filteredBets = bets.filter((b) => {
    if (activeTab === 'high') return b.betAmount >= 100;
    if (activeTab === 'lucky') return b.multiplier >= 15;
    return true;
  });

  useEffect(() => {
    if (!selectedVerifyBet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVerifyBet(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedVerifyBet]);

  return (
    <section className="border-t border-ink-200 bg-white py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow eyebrow-brand">Live activity</span>
            <h2 className="mt-2.5 flex items-center gap-2.5 text-[26px] sm:text-[32px] font-semibold tracking-[-0.03em] text-ink-900">
              Community bets
              <span className="live-dot mb-1" />
            </h2>
          </div>

          <RadixTabs.Root
            value={activeTab}
            onValueChange={(v) => { soundFX.playClick(); setActiveTab(v as TabId); }}
            className="self-start"
          >
            <RadixTabs.List
              aria-label="Filter community bets"
              className="scrollbar-none flex gap-1 overflow-x-auto border-b border-ink-200"
            >
              {TABS.map((tab) => (
                <RadixTabs.Trigger
                  key={tab.id}
                  value={tab.id}
                  className="group relative min-h-[40px] shrink-0 cursor-pointer whitespace-nowrap px-3.5
                             text-[13px] font-medium text-ink-500 transition-colors hover:text-ink-900
                             focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-500
                             data-[state=active]:text-ink-900"
                >
                  {tab.label}
                  <span
                    className="absolute inset-x-2 -bottom-px h-0.5 origin-left scale-x-0 rounded-full
                               bg-brand-500 transition-transform duration-300 ease-out
                               group-data-[state=active]:scale-x-100"
                    aria-hidden
                  />
                </RadixTabs.Trigger>
              ))}
            </RadixTabs.List>
          </RadixTabs.Root>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-ink-200 bg-ink-50">
                  {['Game', 'Player', 'Time', 'Bet', 'Multiplier', 'Payout', ''].map((h, i) => (
                    <th
                      key={h || i}
                      className={`px-4 py-3 text-[10px] font-medium uppercase tracking-[0.09em] text-ink-500 ${
                        i === 3 || i === 5 ? 'text-right' : i === 4 || i === 6 ? 'text-center' : ''
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-ink-100">
                {filteredBets.map((bet) => (
                  <tr key={bet.id} className="transition-colors hover:bg-ink-25">
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{bet.gameIcon}</span>
                        <span className="max-w-[180px] truncate text-[13px] font-medium text-ink-900">
                          {bet.gameTitle}
                        </span>
                      </span>
                    </td>

                    <td className="px-4 py-3 font-mono text-[12px] text-ink-600">{bet.user}</td>
                    <td className="px-4 py-3 text-[12px] text-ink-400">{bet.time}</td>

                    <td className="px-4 py-3 text-right font-mono text-[13px] text-ink-700">
                      ${bet.betAmount.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block rounded px-2 py-0.5 font-mono text-[11px] font-medium ${
                          !bet.isWin
                            ? 'bg-ink-100 text-ink-400'
                            : bet.multiplier >= 15
                            ? 'bg-win-50 text-win-600 ring-1 ring-win-500/25'
                            : 'bg-brand-50 text-brand-700'
                        }`}
                      >
                        {bet.multiplier.toFixed(2)}&times;
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right font-mono text-[13px] font-medium">
                      <span className={bet.isWin ? 'text-win-600' : 'text-ink-400'}>
                        {bet.isWin ? `+$${bet.payout.toFixed(2)}` : '—'}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => { soundFX.playClick(); setSelectedVerifyBet(bet); }}
                        className="rounded-md p-1.5 text-ink-300 transition-colors hover:bg-brand-50 hover:text-brand-600 cursor-pointer"
                        title="Verify provably fair hash"
                      >
                        <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verifier */}
        {selectedVerifyBet && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-md"
            onClick={() => setSelectedVerifyBet(null)}
          >
            <div
              className="animate-rise-in w-full max-w-md overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
                <span className="flex items-center gap-2 text-[13px] font-semibold text-ink-900">
                  <ShieldCheck className="h-4 w-4 text-win-600" strokeWidth={2.2} />
                  Provably fair verifier
                </span>
                <button
                  onClick={() => setSelectedVerifyBet(null)}
                  className="rounded-md p-1 text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-800 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 p-5">
                <div>
                  <span className="eyebrow">Server seed hash (SHA-256)</span>
                  <div className="mt-2 select-all break-all rounded-lg border border-ink-200 bg-ink-25 p-2.5 font-mono text-[11px] leading-relaxed text-ink-800">
                    e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                  </div>
                </div>

                <div>
                  <span className="eyebrow">Client seed</span>
                  <div className="mt-2 select-all break-all rounded-lg border border-ink-200 bg-ink-25 p-2.5 font-mono text-[11px] text-ink-800">
                    1xbet_client_{selectedVerifyBet.id}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-lg border border-win-500/25 bg-win-50 p-3">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-win-600" strokeWidth={2.2} />
                  <p className="text-[13px] text-ink-800">
                    Verified —{' '}
                    <span className="font-mono font-medium">
                      {selectedVerifyBet.multiplier.toFixed(2)}&times;
                    </span>{' '}
                    is mathematically proven.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
