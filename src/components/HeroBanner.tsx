'use client';

import React, { useState, useEffect } from 'react';
import {
  Rocket,
  Crown,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Zap,
  Gift,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface HeroBannerProps {
  onPlayCrash: () => void;
  onOpenSpinWheel: () => void;
  onClaimBonus: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onPlayCrash,
  onOpenSpinWheel,
  onClaimBonus,
}) => {
  const [jackpot, setJackpot] = useState(4129582.35);

  useEffect(() => {
    const timer = setInterval(() => {
      setJackpot((prev) => prev + (Math.random() * 0.45 + 0.05));
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const [dollars, cents] = jackpot
    .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .split('.');

  return (
    <section id="hero" className="bg-white pt-5 pb-14 sm:pt-7 sm:pb-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        <div className="panel-navy panel-navy-hairline relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 p-6 sm:p-10 lg:p-14">

            {/* ---------- Left ---------- */}
            <div className="lg:col-span-7 flex flex-col justify-center">

              <div className="inline-flex self-start items-center gap-2.5 rounded-full border border-white/12 bg-white/6 backdrop-blur-md pl-2.5 pr-3.5 py-1.5">
                <span className="live-dot" />
                <span className="text-[10px] font-medium uppercase tracking-[0.11em] text-navy-100">
                  Official 1xBet · Provably fair gaming
                </span>
              </div>

              <h1 className="mt-6 text-[34px] leading-[1.06] sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.035em] text-white">
                Next-generation{' '}
                <span className="bg-gradient-to-r from-brand-300 via-brand-200 to-white bg-clip-text text-transparent">
                  1xGaming
                </span>
                ,
                <br className="hidden sm:block" /> built for high stakes.
              </h1>

              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-navy-100">
                Supersonic multipliers up to{' '}
                <strong className="font-semibold text-white">10,000&times;</strong> on 1xCrash,
                daily VIP drop wheels, and instant zero-fee withdrawals.
              </p>

              {/* Jackpot — the single loudest element on the page, by design */}
              <div className="mt-8 max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.11em] text-navy-200">
                    1xMega progressive jackpot
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.09em] text-brand-200">
                    <span className="live-dot" />
                    Growing
                  </span>
                </div>

                <div className="mt-2.5 flex items-baseline font-mono tracking-tight text-white">
                  <span className="text-2xl sm:text-[28px] font-medium text-navy-200 mr-0.5">$</span>
                  <span className="text-[34px] sm:text-[44px] leading-none font-semibold">
                    {dollars}
                  </span>
                  <span className="text-xl sm:text-2xl font-medium text-navy-200">.{cents}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => { soundFX.playClick(); onPlayCrash(); }}
                  className="group flex items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-navy-800 shadow-lg transition-all duration-300 hover:bg-brand-50 hover:shadow-xl active:scale-[0.98] cursor-pointer"
                >
                  <Rocket className="w-[18px] h-[18px] text-brand-600" strokeWidth={2.2} />
                  <span>Play 1xCrash</span>
                  <ArrowRight className="w-4 h-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>

                <button
                  onClick={() => { soundFX.playClick(); onOpenSpinWheel(); }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/18 bg-white/8 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/14 hover:border-white/30 active:scale-[0.98] cursor-pointer"
                >
                  <Gift className="w-[18px] h-[18px] text-brand-200" strokeWidth={2} />
                  <span>Daily Lucky Wheel</span>
                </button>
              </div>

              {/* Trust row */}
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-6">
                {[
                  { icon: ShieldCheck, label: 'Licensed & regulated' },
                  { icon: Zap, label: 'Instant 60s withdrawals' },
                  { icon: TrendingUp, label: '99.2% average RTP' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-[13px] text-navy-200">
                    <Icon className="w-4 h-4 text-brand-300 shrink-0" strokeWidth={2} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- Right: promo cards ---------- */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:self-center">

              <button
                onClick={() => { soundFX.playClick(); onClaimBonus(); }}
                className="glass-tile group p-5 text-left cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-200">
                      New player offer
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-white">
                      200% up to $1,500
                      <span className="block text-navy-200 font-normal">+ 150 free spins</span>
                    </h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-brand-200 transition-colors group-hover:bg-white/14">
                    <Gift className="w-[18px] h-[18px]" strokeWidth={2} />
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs">
                  <span className="text-navy-200">
                    Code{' '}
                    <code className="ml-1 rounded bg-line px-1.5 py-0.5 font-mono text-[11px] font-medium text-white">
                      1XBONUS
                    </code>
                  </span>
                  <span className="flex items-center gap-1 font-medium text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    Claim <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>

              <button
                onClick={() => { soundFX.playClick(); onPlayCrash(); }}
                className="glass-tile group p-5 text-left cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-brand-200">
                      Weekly tournament
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-white">
                      Crash Speedway
                      <span className="block font-mono font-medium text-navy-200">
                        $100,000 pool
                      </span>
                    </h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-brand-200 transition-colors group-hover:bg-white/14">
                    <Crown className="w-[18px] h-[18px]" strokeWidth={2} />
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs">
                  <span className="text-navy-200">Top 50 pilots split the pool</span>
                  <span className="flex items-center gap-1 font-medium text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    Join <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
