'use client';

import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  Copy, 
  Check, 
  Percent, 
  Trophy, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { useSite } from '@/components/SiteChrome';

interface PromoCard {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  reward: string;
  code?: string;
  bgGradient: string;
  icon: React.ReactNode;
}

export const PromotionsSection: React.FC = () => {
  const { openAuth, showToast } = useSite();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const promos: PromoCard[] = [
    {
      id: 'p1',
      badge: 'WELCOME BONUS',
      badgeColor: 'bg-brand-500 text-white',
      title: '200% First Deposit Match',
      description: 'Double your initial bankroll up to $1,500 plus get 150 Free Spins on top slot games.',
      reward: 'Up to $1,500 + 150 FS',
      code: '1XBONUS',
      bgGradient: 'from-navy-900 to-navy-800',
      icon: <Gift className="h-6 w-6 text-brand-400" />,
    },
    {
      id: 'p2',
      badge: 'VIP CASHBACK',
      badgeColor: 'bg-amber-500 text-navy-950 font-bold',
      title: '15% Weekly Zero-Wager Cashback',
      description: 'Get up to 15% real money returned to your balance every Monday with zero rollover requirements.',
      reward: '15% Real Money Back',
      bgGradient: 'from-navy-900 to-navy-800',
      icon: <Percent className="h-6 w-6 text-amber-400" />,
    },
    {
      id: 'p3',
      badge: 'NETWORK EVENT',
      badgeColor: 'bg-purple-600 text-white',
      title: 'Drops & Wins: $2,000,000 Pool',
      description: 'Compete on Pragmatic Play slots & live tables for random daily cash drops and weekly tournaments.',
      reward: '$2M Monthly Pool',
      bgGradient: 'from-navy-900 to-navy-800',
      icon: <Trophy className="h-6 w-6 text-purple-400" />,
    },
    {
      id: 'p4',
      badge: 'CRYPTO EXCLUSIVE',
      badgeColor: 'bg-emerald-500 text-white',
      title: '10% Crypto Deposit Booster',
      description: 'Deposit with Bitcoin, Ethereum, or USDT to receive an instant 10% wager-free reload boost.',
      reward: '+10% Extra on Every Deposit',
      code: 'CRYPTO10',
      bgGradient: 'from-navy-900 to-navy-800',
      icon: <Zap className="h-6 w-6 text-emerald-400" />,
    },
  ];

  const handleCopyCode = (code: string) => {
    soundFX.playClick();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Promo code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="promotions" className="border-t border-ink-200 bg-ink-50 py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <span className="eyebrow eyebrow-brand flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              High-Roller Perks &amp; Rewards
            </span>
            <h2 className="mt-2 text-[28px] sm:text-[36px] font-bold tracking-[-0.03em] text-ink-900">
              Exclusive Promotions &amp; Bonuses
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Claim welcome bonuses, weekly zero-wager cashback, and massive tournament cash drops.
            </p>
          </div>

          <button
            onClick={() => openAuth()}
            className="mt-4 md:mt-0 font-bold text-brand-600 hover:text-brand-700 text-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All 12 Active Offers</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-ink-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
            >
              {/* Top Tag & Icon */}
              <div>
                <div className="flex items-center justify-between">
                  <span className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${promo.badgeColor}`}>
                    {promo.badge}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-50 group-hover:bg-brand-50 transition">
                    {promo.icon}
                  </div>
                </div>

                {/* Title & Reward */}
                <div className="mt-5 space-y-2">
                  <span className="font-mono text-xs font-black uppercase text-brand-600 tracking-wide block">
                    {promo.reward}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-ink-900 group-hover:text-brand-600 transition">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-ink-500 leading-relaxed">
                    {promo.description}
                  </p>
                </div>
              </div>

              {/* Bottom: Code copy or Claim button */}
              <div className="mt-6 border-t border-ink-100 pt-4 space-y-2.5">
                {promo.code && (
                  <div className="flex items-center justify-between rounded-xl bg-ink-50 p-2 border border-ink-200">
                    <span className="text-[11px] font-medium text-ink-500 pl-1">Code:</span>
                    <div className="flex items-center gap-1.5">
                      <code className="font-mono text-xs font-bold text-ink-900 bg-white px-2 py-0.5 rounded border border-ink-200">
                        {promo.code}
                      </code>
                      <button
                        onClick={() => handleCopyCode(promo.code!)}
                        className="rounded-lg p-1.5 text-ink-500 hover:bg-white hover:text-brand-600 transition cursor-pointer"
                        title="Copy promo code"
                      >
                        {copiedCode === promo.code ? (
                          <Check className="h-3.5 w-3.5 text-win-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => openAuth()}
                  className="btn-1x-primary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
                >
                  Claim Bonus Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
