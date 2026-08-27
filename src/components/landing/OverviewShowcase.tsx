'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Rocket, 
  Radio, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Zap,
  Globe2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useSite } from '@/components/SiteChrome';

export const OverviewShowcase: React.FC = () => {
  const { openAuth } = useSite();

  const ECOSYSTEM_PILLARS = [
    {
      id: 'sports',
      title: 'Sports & In-Play Betting',
      metric: '1,420+ Live Matches',
      desc: 'Top odds on IPL Cricket, Champions League, NBA & Grand Slams with real-time match stats and fast single-tap bet slips.',
      icon: Trophy,
      iconColor: 'text-brand-500 bg-brand-500/10 border-brand-500/20',
      accentColor: '#007acc',
      href: '#sports'
    },
    {
      id: '1xgames',
      title: '1xGames Originals',
      metric: '99.0% RTP · Provably Fair',
      desc: 'Certified cryptographic arcade games including Aviator 1xPro, 1xMines, 1xPlinko, and multipliers up to 100,000x.',
      icon: Rocket,
      iconColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      accentColor: '#06b6d4',
      href: '#1xgames'
    },
    {
      id: 'live-casino',
      title: 'Live Casino & 4K Studios',
      metric: '195+ Native Tables',
      desc: 'Broadcast direct from luxury studio floors with native VIP dealers, 2000x lightning multipliers, and private salons.',
      icon: Radio,
      iconColor: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      accentColor: '#f43f5e',
      href: '#live-casino'
    },
    {
      id: 'mobile-access',
      title: 'Cross-Platform Mobile',
      metric: 'iOS & Android Ready',
      desc: 'Seamless unified account access from desktop web browsers or supported mobile applications without separate logins.',
      icon: Smartphone,
      iconColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      accentColor: '#10b981',
      href: '/app'
    }
  ];

  return (
    <section id="overview" className="relative border-t border-line bg-canvas py-14 sm:py-18 lg:py-22 overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-brand-500/5 blur-[100px]"
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute -bottom-24 right-0 w-[420px] h-[420px] rounded-full bg-volt-500/5 blur-[100px]"
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Core Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="live-dot" />
                <span className="label label-volt">Platform Overview</span>
                <span className="h-px w-10 bg-brand-500/30" aria-hidden />
              </div>

              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase tracking-tight text-fg leading-[1.08]">
                Everything in <span className="text-brand-600">one place</span>
              </h2>
            </div>

            <p className="text-[17px] leading-relaxed text-fg font-medium">
              1xBet is built around a simple idea: give registered users one place to access the sports, games and account features available to them.
            </p>

            <p className="text-[15px] leading-relaxed text-fg-muted">
              From the homepage, users can move between sports and gaming categories, review available events, access their account and find mobile options without having to navigate through multiple services.
            </p>

            <p className="text-[15px] leading-relaxed text-fg-muted">
              For existing users, their 1xBet account provides the central point for accessing supported services. New users can begin with the registration process and explore the platform after completing the required steps.
            </p>

            {/* Value Checkpoints */}
            <div className="space-y-3 pt-2">
              {[
                { label: 'Single Unified Account', desc: 'One login credentials across all sports and casino categories.' },
                { label: 'Real-Time Synchronized Wallet', desc: 'Instant deposits, instant cashouts, and multi-currency support.' },
                { label: 'Desktop & Mobile Parity', desc: 'Full feature access on web, mobile browsers, and dedicated apps.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-fg">{item.label}</h4>
                    <p className="text-[13px] text-fg-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={openAuth}
                className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-[8px] bg-brand-500 px-6 text-[14px] font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 active:scale-[0.98]"
              >
                <span>Register with 1xBet</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={openAuth}
                className="inline-flex min-h-[48px] cursor-pointer items-center rounded-[8px] border border-line-strong bg-surface-1 px-6 text-[14px] font-bold text-fg transition-all hover:border-brand-500 hover:bg-surface-3"
              >
                <span>Account Login</span>
              </button>
            </div>
          </div>

          {/* Right Column: 4-Pillar Interactive Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4.5">
            {ECOSYSTEM_PILLARS.map((pillar) => (
              <Link
                key={pillar.id}
                href={pillar.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-line bg-surface-1 p-6 shadow-xs transition-all duration-300 hover:border-brand-500/70 hover:bg-canvas hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                <div>
                  {/* Top Icon & Metric */}
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 ${pillar.iconColor}`}>
                      <pillar.icon className="h-5 w-5" />
                    </div>

                    <span className="text-[11px] font-mono font-bold text-fg-dim bg-canvas border border-line px-2.5 py-1 rounded-md">
                      {pillar.metric}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 text-[17px] font-bold text-fg group-hover:text-brand-600 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                    {pillar.desc}
                  </p>
                </div>

                {/* Bottom Link Action */}
                <div className="mt-5 pt-3 border-t border-line flex items-center justify-between text-xs font-bold text-brand-600 group-hover:text-brand-700">
                  <span>Explore Section</span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                {/* Hover Accent Line */}
                <div 
                  className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: pillar.accentColor }}
                />
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom Regional & Availability Notice Banner */}
        <div className="mt-10 rounded-xl border border-line bg-surface-1 p-4.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-fg uppercase tracking-wider">Please Note</h4>
              <p className="text-[13px] text-fg-muted mt-0.5">
                The platform&rsquo;s available content can change depending on the event, market, device and location. This means users can see different options at different times.
              </p>
            </div>
          </div>

          <Link
            href="/responsible-gaming"
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>Player Terms &amp; Safety</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
