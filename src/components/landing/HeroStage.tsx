'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronRight, 
  Trophy, 
  Radio, 
  Rocket, 
  Gift, 
  Crown, 
  Flame,
  Dices,
  Sparkles
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { AuthenticGame } from '@/lib/authenticGames';
import { LiveTicker } from '@/components/game/LiveTicker';
import { useSite } from '@/components/SiteChrome';
import NeonBorder from '@/components/ui/NeonBorder';

interface HeroStageProps {
  /** Accepted so the page can wire selection uniformly, though the hero itself
      is image-free and doesn't open a game directly. */
  onSelectGame?: (game: AuthenticGame) => void;
}

const CATEGORY_HUBS = [
  { 
    id: 'sports',
    label: 'Sports',
    sub: 'Live & Pre-Match',
    badge: '1,420+ LIVE',
    badgeTone: 'rose',
    href: '/sports',
    icon: Trophy,
    iconColor: 'text-brand-500 bg-brand-500/10',
    neonColor: '#007acc',
  },
  { 
    id: 'live-casino',
    label: 'Live Casino',
    sub: '4K Native Dealers',
    badge: '195+ TABLES',
    badgeTone: 'brand',
    href: '#live-casino',
    icon: Radio,
    iconColor: 'text-rose-500 bg-rose-500/10',
    neonColor: '#f43f5e',
  },
  { 
    id: '1xgames',
    label: '1xGames',
    sub: 'Crash & Multipliers',
    badge: 'HOT 10,000X',
    badgeTone: 'volt',
    href: '#1xgames',
    icon: Rocket,
    iconColor: 'text-cyan-600 bg-cyan-500/10',
    neonColor: '#00e5ff',
  },
  { 
    id: 'tournaments',
    label: 'Tournaments',
    sub: 'Daily Leaderboards',
    badge: '$250K POOL',
    badgeTone: 'amber',
    href: '/promotions',
    icon: Flame,
    iconColor: 'text-amber-500 bg-amber-500/10',
    neonColor: '#f59e0b',
  },
  { 
    id: 'promotions',
    label: 'Promotions',
    sub: '100% Welcome Match',
    badge: 'BONUS + SPINS',
    badgeTone: 'win',
    href: '/promotions',
    icon: Gift,
    iconColor: 'text-emerald-500 bg-emerald-500/10',
    neonColor: '#10b981',
  },
  { 
    id: 'vip',
    label: 'VIP Club',
    sub: 'Tier Perks & Drops',
    badge: 'CASHBACK 15%',
    badgeTone: 'brass',
    href: '/promotions',
    icon: Crown,
    iconColor: 'text-brass-500 bg-brass-500/10',
    neonColor: '#c4a45c',
  },
];

const FACTS = [
  { k: 'Sports', v: 'Live & pre-match' },
  { k: 'Games', v: '1xBet originals' },
  { k: 'Access', v: 'Desktop & mobile' },
  { k: 'Support', v: 'Official channels' },
];


export const HeroStage: React.FC<HeroStageProps> = () => {
  const { openAuth } = useSite();
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    // Backgrounded tab: rAF is suspended, so a .from() would strip the hero to
    // its start state and never play it back in. Leave it painted.
    if (document.visibilityState === 'hidden') return;

    // `gsap.from` writes opacity:0 inline the moment the tween exists, so a
    // timeline that never finishes leaves these invisible for good — that is
    // what hid the Register button. Clearing on every exit path makes the
    // state unreachable.
    const HIDDEN =
      '[data-h="label"],[data-h="title"] > span,[data-h="copy"],[data-h="cta"] > *,' +
      '[data-h="board"],[data-h="fact"],[data-h="rail"] > *';
    const reveal = () => {
      el.querySelectorAll<HTMLElement>(HIDDEN).forEach((n) => {
        n.style.opacity = '';
        n.style.transform = '';
      });
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: reveal,
        onInterrupt: reveal,
      });

      tl.from('[data-h="label"]', { opacity: 0, x: -14, duration: 0.5 })
        .from('[data-h="title"] > span', { opacity: 0, y: 28, duration: 0.7, stagger: 0.07 }, '-=0.25')
        .from('[data-h="copy"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
        .from('[data-h="cta"] > *', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, '-=0.35')
        .from('[data-h="board"]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
        .from('[data-h="fact"]', { opacity: 0, y: 12, duration: 0.45, stagger: 0.05 }, '-=0.45')
        .from('[data-h="rail"] > *', { opacity: 0, y: 10, duration: 0.4, stagger: 0.04 }, '-=0.3');
    }, el);

    // Backstop for the case the callbacks never fire at all.
    const watchdog = window.setTimeout(reveal, 4000);

    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-canvas"
      aria-labelledby="hero-title"
    >
      {/* Structural grid: navy hairlines at ~5%, faded downward. Texture on the
          white field rather than a background colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,47,94,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,47,94,0.055) 1px, transparent 1px)',
          backgroundSize: '68px 68px',
          maskImage: 'linear-gradient(to bottom, #000 0%, transparent 82%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">

          {/* ---------------- Copy ---------------- */}
          <div className="lg:col-span-7">
            <div data-h="label" className="flex items-center gap-2.5">
              <span className="live-dot" />
              <span className="label label-volt">1xBet India</span>
              <span className="h-px w-12 bg-brand-500/40" aria-hidden />
            </div>

            <h1
              id="hero-title"
              data-h="title"
              className="mt-5 text-[clamp(2.6rem,7vw,5.2rem)] uppercase"
            >
              <span className="block">Sports betting,</span>
              <span className="block">games &amp;</span>
              <span className="block text-brand-600">mobile access</span>
            </h1>

            <p
              data-h="copy"
              className="mt-6 max-w-2xl text-[17px] leading-relaxed text-fg-muted"
            >
              1xBet India brings sports betting, online games and account access together on
              one platform. Browse available sports and events, explore 1xBet games, manage
              your account and access supported features from desktop or mobile devices.
            </p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
              Whether you are returning through 1xBet login, creating a new account with 1xBet registration, or looking for the 1xBet app, you can find the relevant options in one place.
            </p>

            <div data-h="cta" className="mt-8 flex flex-nowrap items-center gap-2 sm:flex-wrap sm:gap-3">
              <button
                onClick={openAuth}
                className="group inline-flex min-h-[54px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-[6px]
                           bg-brand-500 px-4 text-[14px] font-semibold text-white sm:gap-2.5 sm:px-8 sm:text-[15px]
                           shadow-[0_8px_24px_rgba(0,122,204,0.28)] transition-all duration-200
                           hover:bg-brand-600 active:translate-y-px
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Register
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>

              <button
                onClick={openAuth}
                className="inline-flex min-h-[54px] cursor-pointer items-center whitespace-nowrap rounded-[6px] border
                           border-line-strong bg-canvas px-4 text-[14px] font-semibold text-fg sm:px-8 sm:text-[15px]
                           transition-colors duration-200 hover:border-brand-500/60 hover:bg-surface-1
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Login
              </button>

              <Link
                href="/casino"
                className="group inline-flex min-h-[54px] items-center gap-1.5 whitespace-nowrap px-1 text-[14px] font-semibold
                           text-fg-muted sm:gap-2 sm:px-2 sm:text-[15px] transition-colors hover:text-fg
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Explore games
                <ChevronRight
                  className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>

            {/* Platform facts — a scoreboard strip, not another card row */}
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-line bg-line sm:grid-cols-4">
              {FACTS.map((f) => (
                <div key={f.k} data-h="fact" className="bg-canvas px-4 py-3.5">
                  <dt className="label text-[10px]">{f.k}</dt>
                  <dd className="mt-1.5 text-[13px] font-semibold leading-tight text-fg">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------------- Live board ---------------- */}
          <div data-h="board" className="lg:col-span-5">
            <LiveTicker />

            <p className="mt-4 border-l-2 border-brand-500 pl-4 text-[13px] leading-relaxed text-fg-muted">
              Availability of services, games and betting markets may vary by location.
              Always check the applicable terms and local regulations before using the
              platform.
            </p>
          </div>
        </div>

        {/* Full-width Category Hub closing the hero */}
        <nav aria-label="Browse categories" className="mt-12 border-t border-line pt-6">
          <div data-h="rail" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
            {CATEGORY_HUBS.map((c) => (
              <NeonBorder
                key={c.id}
                color={c.neonColor}
                secondaryColor="#007acc"
                borderRadius={12}
                borderWidth={1.5}
                duration={4}
                trailLength={22}
                glowIntensity={0.9}
                trackColor="transparent"
                className="h-full"
              >
                <Link
                  href={c.href}
                  className="group relative flex flex-col justify-between rounded-xl border border-line bg-canvas p-3.5 transition-all duration-300 hover:border-brand-500 hover:bg-surface-1 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 overflow-hidden h-full"
                >
                  {/* Top: Icon + Badge */}
                  <div className="flex items-center justify-between gap-1.5">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-xs transition-transform group-hover:scale-110 ${c.iconColor}`}>
                      <c.icon className="h-4 w-4" />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded font-mono ${
                      c.badgeTone === 'rose' ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20' :
                      c.badgeTone === 'brand' ? 'bg-brand-500/10 text-brand-600 border border-brand-500/20' :
                      c.badgeTone === 'volt' ? 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/20' :
                      c.badgeTone === 'amber' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
                      c.badgeTone === 'win' ? 'bg-win-500/10 text-win-600 border border-win-500/20' :
                      'bg-brass-500/10 text-brass-600 border border-brass-500/20'
                    }`}>
                      {c.badge}
                    </span>
                  </div>

                  {/* Bottom: Title + Subtitle */}
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <h3 className="text-[14px] font-bold text-fg group-hover:text-brand-600 transition-colors leading-tight">
                        {c.label}
                      </h3>
                      <p className="text-[11px] text-fg-dim font-medium mt-0.5 truncate">
                        {c.sub}
                      </p>
                    </div>
                    <ChevronRight
                      className="h-4 w-4 text-fg-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-600 shrink-0"
                      aria-hidden
                    />
                  </div>

                  {/* Bottom Accent Line */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </Link>
              </NeonBorder>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
};
