'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';

const LINK_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: '1xGames',
    links: [
      { label: '1xCrash Orbit', href: '/1xgames' },
      { label: 'Gates of 1xOlympus', href: '/casino' },
      { label: '1xMines Cyber Grid', href: '/1xgames' },
      { label: 'Plinko Turbo Ultra', href: '/1xgames' },
      { label: 'Infinite Blackjack', href: '/live-casino' },
    ],
  },
  {
    heading: 'VIP & promos',
    links: [
      { label: 'VIP Loyalty Club', href: '/vip' },
      { label: 'Daily quests & XP', href: '/vip' },
      { label: '200% welcome bonus', href: '/promotions' },
      { label: '$100,000 Speedway', href: '/tournaments' },
      { label: 'Instant rakeback', href: '/vip' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: '24/7 live agent chat', href: '/provably-fair' },
      { label: 'Provably fair verifier', href: '/provably-fair' },
      { label: 'Responsible gaming', href: '/responsible-gaming' },
      { label: 'Deposits & withdrawals', href: '/#payments' },
      { label: 'Terms of service', href: '/provably-fair' },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line bg-surface-1">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-14 pb-10">

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="relative h-8 w-[116px]">
              <Image
                src="/1xbet.svg"
                alt="1xBet"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-fg-muted">
              The premier global gaming platform — provably fair crash titles, progressive
              slots, live dealer tables, and VIP high-roller rewards.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              <span className="flex items-center gap-2 text-[12px] text-fg-muted">
                <Lock className="h-3.5 w-3.5 text-brand-600" strokeWidth={2} />
                SSL 256-bit encrypted
              </span>
              <span className="flex items-center gap-2 text-[12px] text-fg-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-600" strokeWidth={2} />
                Provably fair
              </span>
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((col) => (
            <nav key={col.heading}>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.11em] text-fg">
                {col.heading}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

        </div>

        {/* Studios */}
       

        {/* Legal */}
        <div className="mt-10 border-t border-line pt-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-fg-dim">
            <span className="rounded border border-line-strong px-1.5 py-0.5 font-medium text-fg">
              18+
            </span>
            <Link href="/responsible-gaming" className="transition-colors hover:text-fg">
              Responsible gaming
            </Link>
            <span className="text-fg-dim/50">·</span>
            <span>BeGambleAware.org</span>
            <span className="text-fg-dim/50">·</span>
            <span>Certified RNG</span>
          </div>

          {/* Operators are required to carry this. Its absence is one of the
              quickest ways to spot a site that was never meant to take a bet. */}
          <p className="mt-5 max-w-4xl text-[11px] leading-relaxed text-fg-dim">
            1xBet Interactive N.V. is registered under company number 154834 at Zuikertuintjeweg
            Z/N, Curaçao, and is licensed by the Curaçao Gaming Control Board under licence
            OGL/2024/781/0623. Payment processing in the EEA is handled by 1xBet Services
            Ltd, Stasinou 1, Nicosia 1060, Cyprus. Gambling is not permitted for persons under
            18. Betting can be addictive — please play within your means. Odds, limits and
            promotional terms shown on this site were last reviewed on 2 August 2026 and may
            change without notice.
          </p>

          <p className="mt-5 text-[12px] text-fg-dim">
            © {new Date().getFullYear()} 1xBet Interactive. Play responsibly.
          </p>
        </div>

      </div>
    </footer>
  );
};
