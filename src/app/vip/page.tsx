'use client';

import React from 'react';
import { useSite } from '@/components/SiteChrome';
import { soundFX } from '@/lib/audio';
import { 
  Crown, 
  Percent, 
  CheckCircle2,
  Headphones,
  Gem
} from 'lucide-react';

interface VIPTierCard {
  level: number;
  name: string;
  badgeBg: string;
  cashback: string;
  rakeback: string;
  levelGift: string;
  privileges: string[];
}

const TIERS: VIPTierCard[] = [
  { level: 1, name: 'Copper Starter', badgeBg: 'bg-brass-600 text-brass-300', cashback: '5%', rakeback: '2%', levelGift: '€10 Welcome Cash', privileges: ['Daily Lucky Wheel Spin', 'Instant Crypto Payouts', 'Standard 24/7 Live Support'] },
  { level: 2, name: 'Bronze Prodigy', badgeBg: 'bg-brass-600 text-brass-50', cashback: '8%', rakeback: '4%', levelGift: '€50 Cash + 50 FS', privileges: ['2x Daily Wheel Spins', 'Priority Withdrawal Queue', 'Weekly Reload Multiplier'] },
  { level: 3, name: 'Silver High-Roller', badgeBg: 'bg-ink-400 text-navy-950', cashback: '12%', rakeback: '7%', levelGift: '€250 Cash + 100 FS', privileges: ['Personal VIP Host', 'Zero Withdrawal Fees', 'Exclusive High Roller Tournaments'] },
  { level: 4, name: 'Gold Master', badgeBg: 'bg-brass-400 text-navy-950', cashback: '16%', rakeback: '10%', levelGift: '€1,000 Mystery Drop', privileges: ['Dedicated 24/7 Concierge', 'Higher Table Bet Ceilings', 'Custom Birthday Gifts'] },
  { level: 5, name: 'Platinum Sovereign', badgeBg: 'bg-brand-400 text-navy-950', cashback: '20%', rakeback: '13%', levelGift: '€2,500 Direct Cash', privileges: ['Invitations to Global Sporting Events', 'No Max Withdrawal Limits', 'Personalized Bonus Deals'] },
  { level: 6, name: '1xElite Diamond VIP', badgeBg: 'bg-brand-500 text-white', cashback: '25%', rakeback: '16%', levelGift: '€10,000 Luxury Package', privileges: ['All-Inclusive Supercar / Hospitality Trips', 'Highest Rakeback in the World', 'Custom 1-on-1 Table Setup'] },
];

export default function VIPPage() {
  const { openAuth } = useSite();

  return (
    <>
      <main className="flex-1 overflow-x-hidden p-4 sm:p-8 max-w-[1440px] mx-auto w-full space-y-10">
        
        {/* VIP Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-navy-700 to-navy-950 text-white p-6 sm:p-10 shadow-2xl border border-brand-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass-500/20 text-brass-300 border border-brass-400/30 text-[10px] font-medium uppercase tracking-[0.1em]">
              <Crown className="w-4 h-4 text-brass-400 animate-pulse" />
              <span>1XBET ELITE CLUB & LOYALTY PRIVILEGES</span>
            </div>
            <h1 className="text-[30px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.032em] text-white">
              VIP high-roller lounge
            </h1>
            <p className="text-xs sm:text-sm text-navy-100 leading-relaxed">
              Step into an unrivaled realm of elite gaming. Progress through 6 prestigious tiers to unlock weekly rakeback, instant cashback, dedicated account hosts, and luxury international hospitality.
            </p>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              openAuth();
            }}
            className="px-6 py-3.5 rounded-2xl font-semibold text-sm btn-1x-gold flex items-center gap-2 cursor-pointer shadow-xl shrink-0"
          >
            <Crown className="w-4 h-4" />
            <span>JOIN 1XVIP ELITE</span>
          </button>
        </div>

        {/* 3 Key Pillar Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-ink-50 p-6 rounded-3xl border border-ink-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brass-50 text-brass-600 flex items-center justify-center font-bold">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-base text-navy-900">Up to 25% Instant Cashback</h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              Receive weekly refunds calculated from your gameplay with zero wagering requirements on top diamond tiers.
            </p>
          </div>

          <div className="bg-ink-50 p-6 rounded-3xl border border-ink-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-base text-navy-900">Dedicated VIP Concierge</h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              Direct WhatsApp and Telegram access to a personal VIP manager ready to arrange custom limits and bespoke promotions.
            </p>
          </div>

          <div className="bg-ink-50 p-6 rounded-3xl border border-ink-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
              <Gem className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-base text-navy-900">Luxury Event Hospitality</h3>
            <p className="text-xs text-ink-600 leading-relaxed">
              Exclusive VIP tickets to UEFA Champions League, El Clásico, Monaco F1 Grand Prix, and ESL Esports finals.
            </p>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="space-y-4">
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-ink-900">
            Status tiers &amp; rewards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.level}
                className="gaming-card rounded-3xl p-6 border border-ink-200 hover:border-brand-500 space-y-4 shadow-sm hover:shadow-xl transition-all bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.1em] ${tier.badgeBg}`}>
                    LEVEL {tier.level}: {tier.name}
                  </span>
                  <Crown className="w-4 h-4 text-brass-400" />
                </div>

                <div className="grid grid-cols-2 gap-2 bg-ink-50 p-3 rounded-2xl border border-ink-100 text-xs">
                  <div>
                    <span className="text-[10px] text-ink-400 font-bold uppercase block">Cashback</span>
                    <strong className="text-win-600 font-mono text-base">{tier.cashback}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-400 font-bold uppercase block">Rakeback</span>
                    <strong className="text-brand-600 font-mono text-base">{tier.rakeback}</strong>
                  </div>
                </div>

                <div className="text-xs font-bold text-navy-800">
                  Level Up Reward: <span className="text-brass-600 font-mono">{tier.levelGift}</span>
                </div>

                <ul className="space-y-2 text-xs text-ink-600 pt-2 border-t border-ink-100">
                  {tier.privileges.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-win-500 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}
