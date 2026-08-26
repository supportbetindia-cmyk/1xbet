'use client';

import React, { useState } from 'react';
import { useSite } from '@/components/SiteChrome';
import { BonusTerms } from '@/components/sections/BonusTerms';
import { soundFX } from '@/lib/audio';
import { 
  Gift, 
  Clock, 
  ArrowRight
} from 'lucide-react';

interface PromoCard {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  amount: string;
  description: string;
  code: string;
  minDeposit: string;
  wagering: string;
  expiry: string;
}

const PROMOS: PromoCard[] = [
  {
    id: 'p-welcome',
    tag: 'NEW PLAYER PACKAGE',
    tagColor: 'bg-brass-500',
    title: 'Casino Welcome Package',
    amount: '100% UP TO €1,500 + 150 FS',
    description: 'Triple your first deposits across your first 4 payments. Includes 150 Free Spins on Pragmatic Play Gates of Olympus and Sweet Bonanza.',
    code: '1XBONUS',
    minDeposit: '€10',
    wagering: '35x Bonus',
    expiry: '30 Days'
  },
  {
    id: 'p-drops',
    tag: 'GLOBAL NETWORK PROMO',
    tagColor: 'bg-brand-600',
    title: 'Pragmatic Play Drops & Wins',
    amount: '€2,000,000 MONTHLY POOL',
    description: 'Daily prize drops and weekly tournaments across iconic qualifying slots. Random multiplier drops up to 2,500x your stake anytime.',
    code: 'AUTO-OPT IN',
    minDeposit: '€0.50 per spin',
    wagering: '0x Wagering (Cash)',
    expiry: 'Ongoing 2026'
  },
  {
    id: 'p-cashback',
    tag: 'VIP LOYALTY PERK',
    tagColor: 'bg-win-600',
    title: 'Weekly Unlimited Cashback',
    amount: 'UP TO 25% WEEKLY CASHBACK',
    description: 'Get rewarded on every single bet regardless of whether you win or lose. Higher VIP tiers unlock instant zero-wager weekly cash refunds.',
    code: 'VIP_CASHBACK',
    minDeposit: 'Automatic',
    wagering: '1x Wagering',
    expiry: 'Every Monday'
  },
  {
    id: 'p-reload',
    tag: 'WEEKEND SPECIAL',
    tagColor: 'bg-brand-600',
    title: 'Sunday High-Roller Reload',
    amount: '50% BONUS UP TO €500',
    description: 'Power up your weekend with extra betting ammunition on all 1xOriginals, Live Casino tables, and classic roulette games.',
    code: 'RELOAD500',
    minDeposit: '€25',
    wagering: '25x Bonus',
    expiry: 'Sundays Only'
  }
];

export default function PromotionsPage() {
  const { openAuth } = useSite();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    soundFX.playClick();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <>
      <main className="flex-1 overflow-x-hidden p-4 sm:p-8 max-w-[1440px] mx-auto w-full space-y-8">
        
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-700 to-navy-900 text-white p-6 sm:p-10 shadow-xl border border-brand-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass-500/20 text-brass-300 border border-brass-400/30 text-[10px] font-medium uppercase tracking-[0.1em]">
              <Gift className="w-3.5 h-3.5 text-brass-400" />
              <span>OFFICIAL 1XBET PROMOTION PACKAGES</span>
            </div>
            <h1 className="text-[30px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.032em] text-white">
              Bonuses, cashback &amp; promos
            </h1>
            <p className="text-xs sm:text-sm text-navy-100 leading-relaxed">
              Maximize your potential with welcome bonuses, weekly reload credits, VIP cashback, and prize pools exceeding millions in cash drops.
            </p>
          </div>
        </div>

        {/* Promotions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROMOS.map((promo) => (
            <div
              key={promo.id}
              className="gaming-card rounded-3xl p-6 border border-ink-200 hover:border-brand-500 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all bg-white"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-white text-[10px] font-semibold uppercase tracking-wider ${promo.tagColor}`}>
                    {promo.tag}
                  </span>
                  <span className="text-xs font-semibold text-ink-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{promo.expiry}</span>
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-ink-500 uppercase">{promo.title}</span>
                  <h3 className="text-2xl font-semibold text-navy-900 mt-0.5">
                    {promo.amount}
                  </h3>
                </div>

                <p className="text-xs text-ink-600 leading-relaxed">
                  {promo.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink-100 text-xs font-semibold text-ink-600">
                  <div>Min Deposit: <strong className="text-navy-900">{promo.minDeposit}</strong></div>
                  <div>Wagering: <strong className="text-navy-900">{promo.wagering}</strong></div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1 flex items-center justify-between bg-ink-50 border border-ink-200 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold text-navy-800">
                  <span>Code: <strong>{promo.code}</strong></span>
                  <button
                    onClick={() => handleCopyCode(promo.code)}
                    className="text-brand-600 hover:underline cursor-pointer text-[11px]"
                  >
                    {copiedCode === promo.code ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    openAuth();
                  }}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs btn-1x-primary flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Claim</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <BonusTerms />

      </main>
    </>
  );
}
