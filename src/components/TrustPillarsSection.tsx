'use client';

import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  Headphones, 
  Lock, 
  CheckCircle2 
} from 'lucide-react';

export const TrustPillarsSection: React.FC = () => {
  const pillars = [
    {
      icon: <Zap className="h-6 w-6 text-brand-500" />,
      title: '90-Second Instant Withdrawals',
      description: 'Automated lightning payout processing. Withdraw your crypto or fiat winnings in under 2 minutes with 0% platform fees.',
      stat: '< 90s',
      statLabel: 'Average Payout Speed',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-win-500" />,
      title: '100% Provably Fair & Certified',
      description: 'Every flight, spin, and card deal is mathematically verifiable using open-source SHA-256 cryptographic server and client seeds.',
      stat: '99.0%',
      statLabel: 'Audited Platform RTP',
    },
    {
      icon: <CreditCard className="h-6 w-6 text-amber-500" />,
      title: '50+ Global Payment Gateways',
      description: 'Seamless deposit & payout channels across Bitcoin, USDT, Ethereum, UPI, Paytm, IMPS, Visa, Mastercard, and Apple Pay.',
      stat: '50+',
      statLabel: 'Payment Methods',
    },
    {
      icon: <Headphones className="h-6 w-6 text-rose-500" />,
      title: '24/7 Dedicated VIP Support',
      description: 'Instant live concierge and dedicated VIP hosts ready 24/7 across Live Chat, Telegram, and multilingual phone lines.',
      stat: '24/7',
      statLabel: 'Live Human Support',
    },
  ];

  const paymentMethods = [
    { name: 'Bitcoin', symbol: '₿', type: 'Crypto' },
    { name: 'Tether USDT', symbol: '₮', type: 'TRC20 & ERC20' },
    { name: 'Ethereum', symbol: 'Ξ', type: 'Crypto' },
    { name: 'UPI', symbol: '⚡', type: 'Instant Indian Pay' },
    { name: 'Paytm', symbol: '💳', type: 'Wallet' },
    { name: 'Visa', symbol: 'VISA', type: 'Debit/Credit' },
    { name: 'Mastercard', symbol: 'MC', type: 'Debit/Credit' },
    { name: 'Apple Pay', symbol: '', type: 'Mobile Pay' },
    { name: 'Google Pay', symbol: 'GPay', type: 'Mobile Pay' },
  ];

  return (
    <section className="border-t border-ink-200 bg-white py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1 text-xs font-bold text-brand-700 border border-brand-200">
            <Lock className="h-3.5 w-3.5" />
            <span>GLOBAL SECURITY &amp; SPEED STANDARDS</span>
          </div>
          <h2 className="mt-3 text-[28px] sm:text-[36px] font-bold tracking-[-0.03em] text-ink-900">
            Why High-Rollers Choose 1xBet
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Engineered for high-volume transactions, military-grade cryptographic security, and immediate liquidity.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-3xl border border-ink-200 bg-ink-25/50 p-6 shadow-xs transition hover:border-brand-300 hover:bg-white hover:shadow-lg"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs border border-ink-200 mb-5">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-ink-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-ink-500 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-6 border-t border-ink-100 pt-4">
                <span className="font-mono text-xl font-black text-ink-900 block">
                  {p.stat}
                </span>
                <span className="text-[11px] font-medium text-ink-400">
                  {p.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Gateways Strip */}
        <div className="mt-12 rounded-3xl border border-ink-200 bg-ink-50 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-ink-900">
                Instant Deposit &amp; Withdrawal Gateways
              </h3>
              <p className="text-xs text-ink-500">
                Zero-fee deposits and instant automated payouts processed 24/7/365.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-win-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>100% Zero Operator Fee</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {paymentMethods.map((pm, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-2xl border border-ink-200 bg-white p-3 text-center shadow-2xs transition hover:border-brand-300 hover:shadow-sm"
              >
                <span className="font-mono text-lg font-black text-ink-900 mb-1">
                  {pm.symbol}
                </span>
                <span className="text-[11px] font-bold text-ink-800 truncate w-full">
                  {pm.name}
                </span>
                <span className="text-[9px] text-ink-400 font-medium">
                  {pm.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
