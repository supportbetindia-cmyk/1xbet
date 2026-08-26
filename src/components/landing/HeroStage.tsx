'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { AuthenticGame } from '@/lib/authenticGames';
import { LiveTicker } from '@/components/game/LiveTicker';
import { useSite } from '@/components/SiteChrome';

interface HeroStageProps {
  /** Accepted so the page can wire selection uniformly, though the hero itself
      is image-free and doesn't open a game directly. */
  onSelectGame?: (game: AuthenticGame) => void;
}

const CATEGORY_LINKS = [
  { label: 'Sports', href: '/lobby' },
  { label: 'Live Casino', href: '/live-casino' },
  { label: '1xGames', href: '/1xgames' },
  { label: 'Tournaments', href: '/tournaments' },
  { label: 'Promotions', href: '/promotions' },
  { label: 'VIP Club', href: '/vip' },
];

const FACTS = [
  { k: 'Sports', v: 'Live & pre-match' },
  { k: 'Games', v: '1xBet originals' },
  { k: 'Access', v: 'Desktop & mobile' },
  { k: 'Support', v: 'Official channels' },
];

/**
 * Hero.
 *
 * Deliberately image-free on a white field: the energy comes from the heavy
 * display type, the live multiplier board and the category rail. A fine
 * navy-tinted grid gives the white some structure without tinting it.
 */
export const HeroStage: React.FC<HeroStageProps> = () => {
  const { openAuth } = useSite();
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('[data-h="label"]', { opacity: 0, x: -14, duration: 0.5 })
        .from('[data-h="title"] > span', { opacity: 0, y: 28, duration: 0.7, stagger: 0.07 }, '-=0.25')
        .from('[data-h="copy"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
        .from('[data-h="cta"] > *', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, '-=0.35')
        .from('[data-h="board"]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
        .from('[data-h="fact"]', { opacity: 0, y: 12, duration: 0.45, stagger: 0.05 }, '-=0.45')
        .from('[data-h="rail"] > *', { opacity: 0, y: 10, duration: 0.4, stagger: 0.04 }, '-=0.3');
    }, el);

    return () => ctx.revert();
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
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">

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

            <div data-h="cta" className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={openAuth}
                className="group inline-flex min-h-[54px] cursor-pointer items-center gap-2.5 rounded-[6px]
                           bg-brand-500 px-8 text-[15px] font-semibold text-white
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
                className="inline-flex min-h-[54px] cursor-pointer items-center rounded-[6px] border
                           border-line-strong bg-canvas px-8 text-[15px] font-semibold text-fg
                           transition-colors duration-200 hover:border-brand-500/60 hover:bg-surface-1
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Login
              </button>

              <Link
                href="/lobby"
                className="group inline-flex min-h-[54px] items-center gap-2 px-2 text-[15px] font-semibold
                           text-fg-muted transition-colors hover:text-fg
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

        {/* Category rail closing the hero */}
        <nav aria-label="Browse categories" className="mt-12 border-t border-line pt-5">
          <div data-h="rail" className="rail">
            {CATEGORY_LINKS.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group inline-flex min-h-[46px] items-center gap-2 rounded-[6px] border
                           border-line bg-canvas px-4 text-[14px] font-semibold text-fg-muted
                           transition-colors hover:border-brand-500/50 hover:bg-surface-1 hover:text-fg
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                {c.label}
                <ChevronRight
                  className="h-3.5 w-3.5 text-fg-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-600"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
};
