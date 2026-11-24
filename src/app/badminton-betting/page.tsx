'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Radio, Smartphone, Globe2, Trophy, LineChart,
  UserRound, ClipboardList, Activity,
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { useReveal } from '@/hooks/useReveal';
import { Rail } from '@/components/ui/Rail';
import { Shuttlecock3D, FlightArc } from '@/components/badminton/Shuttlecock3D';
import { TiltCard } from '@/components/badminton/TiltCard';

const MATCH_CHECKS = [
  'Players and match details',
  'Tournament or competition',
  'Match date and time',
  'Event status',
  'Available badminton betting markets',
  'Current badminton betting odds',
  'Live market availability',
  'Applicable terms and restrictions',
];

const APPROACH: { t: string; b: string; icon: React.ElementType }[] = [
  { t: 'Players', icon: UserRound, b: 'Confirm the participants and match details displayed.' },
  { t: 'Competition', icon: Trophy, b: 'Review the tournament or event associated with the fixture.' },
  { t: 'Match status', icon: Activity, b: 'Check whether the match is upcoming, live or otherwise unavailable.' },
  { t: 'Available markets', icon: ClipboardList, b: 'Review the specific badminton betting markets offered for the match.' },
  { t: 'Current odds', icon: LineChart, b: 'Use the latest badminton odds displayed on the platform.' },
  { t: 'Live availability', icon: Radio, b: 'If the match is underway, check whether live markets are currently supported.' },
];

const WHY: { t: string; b: string; icon: React.ElementType }[] = [
  { t: 'Badminton-focused markets', icon: Trophy, b: 'Browse available markets directly from individual badminton events.' },
  { t: 'Current odds', icon: LineChart, b: 'Check the latest badminton betting odds displayed for available markets.' },
  { t: 'Live badminton', icon: Radio, b: 'Where supported, follow selected matches through available live markets.' },
  { t: 'Mobile access', icon: Smartphone, b: 'Use supported mobile options to browse badminton events and access your account.' },
  { t: 'Multiple competitions', icon: Globe2, b: 'Explore available matches from different supported badminton competitions.' },
];

const RESPONSIBLE = [
  'Badminton betting involves financial risk. No market or result guarantees a particular outcome, and losses can occur.',
  'Only participate where you are legally permitted to do so and where you meet the applicable age and eligibility requirements.',
  'Set a personal budget before participating and avoid using money required for everyday expenses.',
  'Do not chase losses or increase spending because a previous match did not produce the expected result.',
  'Live badminton can move particularly quickly, so avoid making decisions simply because the odds have changed during a match.',
  'If betting begins affecting your finances, relationships, work or everyday responsibilities, consider taking a break and seeking appropriate support.',
  'Always review the applicable terms, restrictions and local requirements before using the service.',
];

const FAQS: [string, string][] = [
  ['What is badminton betting?', 'Badminton betting refers to available betting markets associated with badminton matches and competitions. The markets offered can vary depending on the fixture, competition and location.'],
  ['Is badminton betting available in India?', 'Badminton betting India availability depends on the user’s location, applicable regulations, platform coverage and eligibility. Users should confirm that the relevant service is permitted in their jurisdiction before participating.'],
  ['What is online badminton betting?', 'Online badminton betting refers to accessing available badminton markets through an online platform. Available matches, markets and services can vary by location.'],
  ['What is live badminton betting?', 'Live badminton betting refers to selected markets available while a badminton match is in progress. Live markets and odds can change as the match develops.'],
  ['What are badminton betting odds?', 'Badminton betting odds are the prices displayed for available badminton markets. They can change before a match and during live betting.'],
  ['Can live badminton odds change?', 'Yes. Live badminton odds can change as a match develops and new information becomes available. Users should always check the current information displayed for the event.'],
  ['What are badminton betting markets?', 'Badminton betting markets are the different options available for a particular badminton match. Markets can differ depending on the tournament, players and event status.'],
  ['What is badminton match betting?', 'Badminton match betting refers to available markets associated with an individual badminton fixture.'],
  ['Is there a badminton betting app?', 'Where supported, users can access available badminton markets through the badminton betting app or compatible mobile website options.'],
  ['Can I access badminton betting online?', 'Where available and permitted in your location, users can browse online badminton betting markets through supported desktop and mobile platforms.'],
  ['Can badminton betting markets change?', 'Yes. Markets can change depending on the event, timing, match conditions and platform availability. Live markets can change particularly quickly.'],
  ['Are badminton betting outcomes guaranteed?', 'No. Badminton matches have uncertain outcomes. Odds and markets do not guarantee a particular result.'],
];

/* ---------------------------------------------------------------- shells -- */

/** Feather fan above the index — a shuttle skirt seen edge-on. */
function FeatherFan({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 22" className={className} aria-hidden>
      {Array.from({ length: 7 }, (_, i) => {
        const a = -42 + i * 14;
        return (
          <path
            key={i}
            d="M36 21 L34 5 Q36 1 38 5 Z"
            className="fill-bd-cyan/60"
            transform={`rotate(${a} 36 21)`}
          />
        );
      })}
    </svg>
  );
}

/**
 * Section shell. Heads are centred with a circular cork index above them —
 * every other page on the site anchors its head left and boxes the index in a
 * square, hexagon, silk or card corner.
 */
function Sec({
  id, n, kicker, title, tone = 'plain', children,
}: {
  id?: string; n: number; kicker: string; title: string;
  tone?: 'plain' | 'tint' | 'hall'; children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });

  const ground =
    tone === 'hall' ? 'bd-hall bd-on-dark border-transparent'
    : tone === 'tint' ? 'bg-surface-1 border-line'
    : 'bg-canvas border-line';

  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-[68px] md:scroll-mt-[118px] overflow-hidden border-t py-10 sm:py-12 lg:py-15 ${ground}`}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div data-rv className="flex flex-col items-center text-center">
          <FeatherFan className="h-5 w-[72px]" />
          <span className="bd-cork mt-2">{String(n).padStart(2, '0')}</span>
          <span className="mt-4 block text-[11px] font-extrabold uppercase tracking-[0.2em] text-bd-cyan">
            {kicker}
          </span>
          <h2 className="mt-2 max-w-3xl text-[clamp(1.7rem,4.2vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.042em] text-fg">
            {title}
          </h2>
        </div>

        <div data-rv className="mt-8">{children}</div>
      </div>
    </section>
  );
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">{children}</p>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[17px] font-semibold leading-relaxed text-fg sm:text-[18px]">{children}</p>
);

function Cta({
  href, children, solid = false,
}: { href: string; children: React.ReactNode; solid?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full px-5 text-[14px] font-extrabold
                  transition-all hover:-translate-y-0.5 sm:px-7 sm:text-[15px]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bd-cyan ${
        solid
          ? 'bd-cta-solid bg-bd-cyan shadow-[0_10px_26px_rgba(11,111,128,0.3)] hover:brightness-110'
          : 'border-2 border-line-strong bg-canvas text-fg hover:border-bd-cyan hover:bg-surface-1'
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

/* ------------------------------------------------------------------ page -- */

export default function BadmintonPage() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;
    if (document.visibilityState === 'hidden') return;

    // `gsap.from` writes opacity:0 inline the moment the tween exists, so a
    // timeline that never finishes leaves these invisible for good. Clearing on
    // every exit path makes that state unreachable.
    const HIDDEN = '[data-d="k"],[data-d="h"],[data-d="p"],[data-d="cta"] > *,[data-d="shuttle"]';
    const reveal = () => {
      el.querySelectorAll<HTMLElement>(HIDDEN).forEach((n) => {
        n.style.opacity = '';
        n.style.transform = '';
      });
    };

    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: reveal,
        onInterrupt: reveal,
      })
        .from('[data-d="k"]', { opacity: 0, y: -10, duration: 0.45 })
        .from('[data-d="h"]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.2')
        .from('[data-d="p"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, '-=0.35')
        .from('[data-d="cta"] > *', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=0.3')
        // Only opacity on the shuttle: it carries its own 3D spin, and a GSAP
        // transform here would fight the keyframe animation for the property.
        .from('[data-d="shuttle"]', { opacity: 0, duration: 0.9 }, '-=0.6');
    }, el);

    const watchdog = window.setTimeout(reveal, 4000);
    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `bd-${i}`, question: q, answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ========================= Hero ========================= */}
      <section
        ref={heroRef}
        data-hero
        className="bd-hall bd-on-dark relative overflow-hidden"
        aria-labelledby="badminton-title"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pt-9 pb-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">

            <div className="flex flex-col lg:col-span-7">
              <div data-d="k" className="flex items-center gap-3">
                <FeatherFan className="h-5 w-[72px]" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-bd-cyan">
                  Badminton Betting
                </span>
              </div>

              <h1
                id="badminton-title"
                data-d="h"
                className="mt-5 text-[clamp(2.2rem,5.6vw,4.2rem)] font-extrabold leading-[1] tracking-[-0.048em] text-fg"
              >
                Badminton Betting on{' '}
                <span className="text-bd-cyan [text-shadow:0_0_28px_rgba(79,216,238,0.38)]">1xBet</span>
              </h1>

              <p data-d="p" className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-fg sm:text-[18px]">
                Badminton is a fast-paced sport where a single rally can quickly change the momentum
                of a match. The badminton betting section on 1xBet gives users a dedicated place to
                browse available badminton matches, review event information and explore the markets
                offered for individual fixtures.
              </p>

              <div className="hero-spill">
                <p data-d="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  Users can check upcoming matches, explore badminton betting markets, review current
                  badminton betting odds and access selected live events where supported.
                </p>

                <p data-d="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  For users searching for badminton betting India, online badminton betting or mobile
                  access, availability can depend on the event, location, platform coverage and
                  applicable regulations.
                </p>

                <p data-d="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  Always review the current match information and applicable terms before
                  participating.
                </p>
              </div>

              <div data-d="cta" className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
                <Cta href="#markets" solid>Explore Badminton Betting</Cta>
                <Cta href="#live">View Available Matches</Cta>
              </div>
            </div>

            {/* The 3D shuttle */}
            <div data-d="shuttle" className="lg:col-span-5">
              <Shuttlecock3D className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ======================== Markets ======================= */}
      <Sec id="markets" n={2} kicker="Explore Badminton Betting Markets" title="Markets for Available Matches" tone="tint">
        <div className="mx-auto max-w-4xl space-y-4">
          <Lead>
            Different badminton matches can offer different betting markets depending on the
            tournament, players, competition stage and event status.
          </Lead>
          <P>
            The badminton betting markets available for one fixture may differ from those offered
            for another. Users can open an individual match to review the current options and
            badminton odds displayed for that event.
          </P>
          <P>
            Markets can also change as a match approaches and, where live markets are supported,
            while the match is in progress.
          </P>
          <P>
            Always check the individual event page for the latest available information instead of
            relying on previously viewed markets.
          </P>
          <div className="pt-1">
            <Cta href="#odds">Explore Badminton Markets</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================= Odds ========================= */}
      <Sec id="odds" n={3} kicker="Badminton Betting Odds" title="Check the Current Badminton Odds">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>Badminton betting odds show the prices displayed for available badminton markets.</Lead>
            <P>
              Odds can change before a match as new information becomes available. During live play,
              changes in the score, momentum or match situation can also affect the markets and live
              badminton odds.
            </P>
            <P>Because badminton matches can move quickly, previously viewed odds may no longer be available.</P>
            <P>Always check the current event page for the latest odds and market information.</P>
            <P>
              Badminton odds do not guarantee a particular result. Match outcomes are uncertain, and
              users should understand the financial risks involved before participating.
            </P>
          </div>

          <div className="lg:col-span-5">
            <div className="bd-card p-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-bd-cyan">
                The flight
              </p>
              <FlightArc className="mt-5 h-auto w-full" />
              <p className="mt-4 text-[13px] leading-relaxed text-fg-dim">
                Illustration only — not a live match or price feed.
              </p>
            </div>
          </div>
        </div>
      </Sec>

      {/* ====================== Live badminton ================== */}
      <Sec id="live" n={4} kicker="Live Badminton Betting" title="Follow the Match as It Happens" tone="hall">
        <div className="mx-auto max-w-4xl space-y-4">
          <Lead>
            Live badminton betting allows users to explore selected markets while a badminton match
            is already underway.
          </Lead>
          <P>
            A badminton match can change quickly from one rally to the next. A run of points, change
            in momentum or set result can affect the markets and odds displayed during live play.
          </P>
          <P>
            Where supported, users can follow the match and review the live badminton odds currently
            shown on the platform.
          </P>
          <P>
            Live markets can change, suspend or close as the match develops. Always check the latest
            event information before participating.
          </P>
          <P>Live badminton betting may not be available for every match or in every location.</P>
          <div className="pt-1">
            <Cta href="#app" solid>Explore Live Badminton</Cta>
          </div>
        </div>
      </Sec>

      {/* ===================== Match betting ==================== */}
      <Sec n={5} kicker="Badminton Match Betting" title="Review the Match Before You Decide">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-5">
            <Lead>
              Badminton match betting gives users access to available markets associated with
              individual badminton fixtures.
            </Lead>
            <P>Before participating, review:</P>
            <P>
              Different fixtures can have different markets. An option available for one match should
              not automatically be assumed to be available for another.
            </P>
            <P>
              The individual event page provides the most relevant information about the match and
              its current markets.
            </P>
          </div>

          <div className="lg:col-span-7">
            <ul className="bd-card divide-y divide-line">
              {MATCH_CHECKS.map((item, i) => (
                <li key={item} className="flex items-center gap-4 px-5 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-bd-cork font-mono text-[11px] font-bold text-bd-cork">
                    {i + 1}
                  </span>
                  <span className="text-[14px] font-semibold text-fg sm:text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Sec>

      {/* ========================= India ======================== */}
      <Sec n={6} kicker="Badminton Betting India" title="Check Availability for Your Location" tone="tint">
        <div className="mx-auto max-w-4xl space-y-4">
          <Lead>
            Badminton has a strong international following, with professional tournaments taking
            place throughout the year.
          </Lead>
          <P>
            For users searching for badminton betting India, availability depends on the
            user&rsquo;s location, applicable regulations, platform coverage and eligibility
            requirements.
          </P>
          <P>
            Users in India should confirm that the relevant service is permitted in their location
            before participating and meet all applicable age and eligibility requirements.
          </P>
          <P>
            Where badminton markets are available, users can browse supported matches, review the
            available markets and check the current odds displayed for each event.
          </P>
          <P>
            The selection of competitions and markets can change, so always refer to the latest
            information provided on the platform.
          </P>
          <div className="pt-1">
            <Cta href="#markets">Check Available Badminton Markets</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================= Online ======================= */}
      <Sec n={7} kicker="Online Badminton Betting" title="Browse Badminton Markets Online">
        <div className="mx-auto max-w-4xl space-y-4">
          <Lead>
            Online badminton betting provides access to available badminton events through an online
            platform.
          </Lead>
          <P>
            Users can browse upcoming fixtures, review match information, explore badminton betting
            markets and check the current odds displayed for individual matches.
          </P>
          <P>The available selection can vary according to competition, platform coverage and location.</P>
          <P>
            If you&rsquo;re searching for badminton betting online, use the official platform and
            check whether the match or competition you&rsquo;re interested in is currently available.
          </P>
          <div className="pt-1">
            <Cta href="#app">Explore Badminton Online</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================== App ========================= */}
      <Sec id="app" n={8} kicker="Badminton Betting App" title="Access Badminton on Mobile" tone="tint">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              The badminton betting app provides a mobile-focused way to access supported badminton
              markets from a compatible device.
            </Lead>
            <P>
              Registered users may be able to browse available matches, review event information and
              access their account through supported mobile options.
            </P>
            <P>App availability and functionality can depend on your device, operating system and location.</P>
            <P>
              If you&rsquo;re looking for a badminton betting app, check the official 1xBet platform
              for current mobile availability and installation requirements.
            </P>
            <P>Avoid downloading account-related applications from unknown third-party sources.</P>
            <div className="pt-1">
              <Cta href="/#app" solid>Explore the Badminton Betting App</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <TiltCard>
              <div className="bd-card flex h-full items-center justify-center p-10">
                <Smartphone className="bd-tilt-lift h-20 w-20 text-bd-cyan" strokeWidth={1.1} aria-hidden />
              </div>
            </TiltCard>
          </div>
        </div>
      </Sec>

      {/* ======================= Live odds ====================== */}
      <Sec n={9} kicker="Live Badminton Odds" title="Odds Can Change During a Match" tone="hall">
        <div className="mx-auto max-w-4xl space-y-4">
          <Lead>Live badminton odds can change as a match progresses.</Lead>
          <P>
            Badminton is built around quick rallies and frequent changes in momentum. A sequence of
            points, a set result or a shift in the match can affect the available markets and odds.
          </P>
          <P>
            Users following live badminton markets should check the latest information displayed for
            the event rather than relying on odds viewed earlier.
          </P>
          <P>Markets may change, suspend or become unavailable while the match is in progress.</P>
          <P>The availability of live badminton markets depends on the individual event and location.</P>
        </div>
      </Sec>

      {/* ==================== Competitions ====================== */}
      <Sec n={10} kicker="Badminton Competitions" title="Find Available Badminton Events">
        <div className="mx-auto max-w-4xl space-y-4">
          <Lead>
            Badminton tournaments are held across different countries and competition levels
            throughout the year.
          </Lead>
          <P>
            Depending on current platform coverage, users may find available events from different
            badminton competitions.
          </P>
          <P>
            The exact selection can change according to the tournament calendar, scheduled fixtures
            and regional availability.
          </P>
          <P>
            When browsing a competition, select an available match to view the markets and odds
            currently offered for that event.
          </P>
          <P>Always check the individual match page for the latest information.</P>
        </div>
      </Sec>

      {/* ======================== Approach ====================== */}
      <Sec n={11} kicker="How to Approach Badminton Betting" title="Start With the Match Information" tone="tint">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <Lead>Before exploring a badminton market, take time to understand the match you&rsquo;re viewing.</Lead>
          <P>Check the:</P>
        </div>

        {/* Tilt cards — the 3D carries through from the hero */}
        <Rail
          className="mt-8"
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-4 sm:gap-5"
          card="82%"
          label="What to check before a badminton match"
        >
          {APPROACH.map(({ t, b, icon: Icon }, i) => (
            <TiltCard key={t}>
              <div className="bd-card flex h-full flex-col p-6">
                <div className="bd-tilt-lift flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-bd-cork font-mono text-[12px] font-bold text-bd-cork">
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-bd-cyan" strokeWidth={1.8} aria-hidden />
                </div>
                <h3 className="bd-tilt-lift mt-4 text-[16px] font-extrabold tracking-[-0.01em] text-fg">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{b}</p>
              </div>
            </TiltCard>
          ))}
        </Rail>

        <p className="mx-auto mt-8 max-w-4xl text-center text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          This helps ensure that decisions are based on current event information rather than
          assumptions about another match.
        </p>
      </Sec>

      {/* ========================== Why ========================= */}
      <Sec n={12} kicker="Why Explore Badminton on 1xBet?" title="A Dedicated Badminton Experience" tone="hall">
        <p className="mx-auto max-w-4xl text-center text-[17px] font-semibold leading-relaxed text-fg sm:text-[18px]">
          The badminton section brings available matches and markets together in one dedicated place.
        </p>

        <Rail
          className="mt-8"
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-4 sm:gap-5"
          card="82%"
          label="Why explore badminton on 1xBet"
        >
          {WHY.map(({ t, b, icon: Icon }) => (
            <TiltCard key={t}>
              <div className="bd-card flex h-full flex-col p-6">
                <Icon className="bd-tilt-lift h-7 w-7 text-bd-cyan" strokeWidth={1.6} aria-hidden />
                <h3 className="bd-tilt-lift mt-4 text-[16px] font-extrabold tracking-[-0.01em] text-fg">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{b}</p>
              </div>
            </TiltCard>
          ))}
        </Rail>

        <p className="mx-auto mt-8 max-w-4xl text-center text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          The exact competitions, matches, markets and features available can vary according to
          location and current platform coverage.
        </p>
      </Sec>

      {/* ====================== Responsible ===================== */}
      <Sec n={13} kicker="Responsible Badminton Betting" title="Keep Your Betting Within Your Limits">
        <ul className="mx-auto max-w-4xl divide-y divide-line border-y border-line">
          {RESPONSIBLE.map((text, i) => (
            <li key={i} className="flex items-start gap-4 py-4 sm:gap-6">
              <span className="mt-0.5 font-mono text-[12px] font-bold text-bd-cyan">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[14px] leading-relaxed text-fg-muted sm:text-[15px]">{text}</p>
            </li>
          ))}
        </ul>
      </Sec>

      {/* ========================== FAQ ========================= */}
      <Sec n={14} kicker="Frequently Asked Questions" title="Badminton betting, answered" tone="tint">
        <div className="mx-auto max-w-4xl">
          <Accordion items={faqEntries} />
        </div>
      </Sec>

      {/* ======================== Closing ======================= */}
      <Sec n={15} kicker="Explore Badminton Betting on 1xBet" title="Explore Badminton Betting on 1xBet" tone="hall">
        <div className="mx-auto max-w-4xl space-y-4">
          <Lead>
            From badminton betting India and online badminton betting to selected live matches, 1xBet
            provides a dedicated place to browse available badminton fixtures and markets.
          </Lead>
          <P>
            Explore badminton betting markets, check current badminton betting odds, follow selected
            matches through live badminton betting and review live badminton odds where supported.
          </P>
          <P>
            Whether you&rsquo;re following an upcoming tournament match or a live fixture, check the
            individual event page for the markets and odds currently available.
          </P>
          <P>
            Mobile users can also check the availability of the badminton betting app and supported
            mobile access options.
          </P>
          <P>
            Badminton events, competitions, markets and services can vary according to location and
            applicable regulations. Always check the latest information provided on the platform,
            review the relevant terms and participate responsibly.
          </P>

          <div className="grid grid-cols-2 gap-2.5 pt-2 sm:flex sm:flex-wrap sm:gap-3">
            <Cta href="#markets" solid>Explore Badminton Betting</Cta>
            <Cta href="#odds">View Available Badminton Markets</Cta>
          </div>
        </div>
      </Sec>
    </main>
  );
}
