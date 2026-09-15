'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Radio, Smartphone, Globe2, Trophy, LineChart,
  MonitorSmartphone, Layers,
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { useReveal } from '@/hooks/useReveal';
import { Rail } from '@/components/ui/Rail';
import { HalfCourt, QuarterBar, ScoringRun } from '@/components/basketball/BasketballVisuals';

/* Leather / hardwood / court navy. Rotated section to section so the page has
   a range rather than one flat accent. */
const TONES = {
  leather: 'text-bb-leather',
  wood: 'text-bb-wood',
  court: 'text-bb-court',
} as const;

type Tone = keyof typeof TONES;

const MATCH_CHECKS = [
  'Teams',
  'Competition',
  'Match date and time',
  'Event status',
  'Available basketball betting markets',
  'Current basketball betting odds',
  'Live market availability',
  'Applicable terms and restrictions',
];

const WHY: { t: string; b: string; icon: React.ElementType }[] = [
  { t: 'Basketball-focused markets', icon: Trophy,
    b: 'Browse available markets directly from individual basketball events.' },
  { t: 'Pre-match access', icon: Layers,
    b: 'Review upcoming games and available markets before the event begins.' },
  { t: 'Live basketball', icon: Radio,
    b: 'Where supported, follow selected games through available live markets.' },
  { t: 'Current odds', icon: LineChart,
    b: 'Check the latest basketball betting odds displayed for available markets.' },
  { t: 'Mobile access', icon: Smartphone,
    b: 'Use supported mobile options to browse basketball events and access your account.' },
  { t: 'Multiple competitions', icon: Globe2,
    b: 'Explore available games from different supported basketball competitions.' },
];

const RESPONSIBLE = [
  'Basketball betting involves financial risk. No market or result guarantees a particular outcome, and losses can occur.',
  'Only participate if you are legally permitted to use the service and meet the applicable age and eligibility requirements in your location.',
  'Set a personal budget before participating and avoid using money needed for everyday expenses.',
  'Do not chase losses or increase your spending because a previous result did not go as expected.',
  'Live basketball can move especially quickly. Take time to consider your decisions rather than reacting to every scoring run or change in the game.',
  'If betting begins affecting your finances, relationships, work or everyday responsibilities, consider taking a break and seeking appropriate support.',
  'Always review the applicable terms and local requirements before using the service.',
];

const FAQS: [string, string][] = [
  ['What is basketball betting?', 'Basketball betting refers to the available betting markets associated with basketball games and competitions. The markets offered can vary depending on the event, competition and location.'],
  ['Is basketball betting available in India?', 'Basketball betting India availability depends on the user’s location, applicable regulations, platform coverage and eligibility requirements. Users should confirm that the service is permitted in their jurisdiction before participating.'],
  ['What is online basketball betting?', 'Online basketball betting allows users to access available basketball markets through an online platform. Available games, markets and services can vary by location.'],
  ['What is live basketball betting?', 'Live basketball betting refers to selected markets available while a basketball game is in progress. Live markets and odds can change as the game develops.'],
  ['What are basketball betting odds?', 'Basketball betting odds are the prices displayed for available basketball markets. They can change before a game and during live betting.'],
  ['Can live basketball odds change?', 'Yes. Live basketball odds can change as a game develops and new information becomes available. Users should always check the current information displayed for the event.'],
  ['What are basketball betting markets?', 'Basketball betting markets are the different options available for a particular basketball game. Markets can differ depending on the competition, teams, event stage and match status.'],
  ['What is basketball match betting?', 'Basketball match betting refers to the available markets associated with an individual basketball fixture.'],
  ['Is there a basketball betting app?', 'Where supported, users can access available basketball markets through the basketball betting app or compatible mobile website options.'],
  ['Can I access basketball betting online?', 'Where available in your location, users can browse online basketball betting markets through supported desktop and mobile platforms.'],
  ['Can basketball betting markets change?', 'Yes. Markets can change depending on the event, timing, game conditions and platform availability. Live markets can change particularly quickly.'],
  ['Are basketball betting outcomes guaranteed?', 'No. Basketball games have uncertain outcomes. Odds and markets do not guarantee a particular result.'],
];

/* ---------------------------------------------------------------- shells -- */

/**
 * Section shell. The head hangs off a heavy gradient rule with an oversized
 * numeral beneath it — a broadcast score bug rather than a boxed index.
 */
function Sec({
  id, n, kicker, title, tone = 'leather', tinted = false, dark = false, children,
}: {
  id?: string; n: number; kicker: string; title: string;
  tone?: Tone; tinted?: boolean; dark?: boolean; children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });

  const ground = dark
    ? 'bb-court bb-on-dark border-transparent'
    : tinted ? 'bg-surface-1 border-line' : 'bg-canvas border-line';

  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-[68px] md:scroll-mt-[118px] overflow-hidden border-t py-11 sm:py-13 lg:py-16 ${ground}`}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        {/* Oversized outlined index behind the head, for depth */}
        <span className="bb-watermark hidden sm:block" aria-hidden>{String(n).padStart(2, '0')}</span>

        {/* currentColor drives both the rule gradient and the numeral tint */}
        <div data-rv className={`relative ${TONES[tone]}`}>
          <span className="bb-rule block w-full max-w-[520px]" aria-hidden />
          <div className="mt-4 flex items-baseline gap-4">
            <span className="bb-index shrink-0" aria-hidden>{String(n).padStart(2, '0')}</span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-fg-muted">
              {kicker}
            </span>
          </div>
        </div>

        <h2
          data-rv
          className="mt-4 max-w-4xl text-[clamp(1.75rem,4.2vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.042em] text-fg"
        >
          {title}
        </h2>

        <div data-rv className="mt-7">{children}</div>
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
      className={`group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-[3px] px-4 text-[14px] font-extrabold
                  transition-all hover:-translate-y-0.5 sm:px-6 sm:text-[15px]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bb-leather ${
        solid
          ? 'bb-cta-solid bg-bb-leather shadow-[0_10px_26px_rgba(182,77,26,0.28)] hover:brightness-110'
          : 'border-2 border-line-strong bg-canvas text-fg hover:border-bb-leather hover:bg-surface-1'
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

/* ------------------------------------------------------------------ page -- */

export default function BasketballPage() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;
    if (document.visibilityState === 'hidden') return;

    // `gsap.from` writes opacity:0 inline the moment the tween exists, so a
    // timeline that never finishes leaves these invisible for good. Clearing on
    // every exit path makes that state unreachable.
    const HIDDEN = '[data-b="k"],[data-b="h"],[data-b="p"],[data-b="cta"] > *,[data-b="court"]';
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
        .from('[data-b="k"]', { opacity: 0, x: -12, duration: 0.45 })
        .from('[data-b="h"]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.2')
        .from('[data-b="p"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, '-=0.35')
        .from('[data-b="cta"] > *', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .from('[data-b="court"]', { opacity: 0, scale: 0.95, duration: 0.7 }, '-=0.5');
    }, el);

    const watchdog = window.setTimeout(reveal, 4000);
    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `bb-${i}`, question: q, answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ============================ Hero ============================ */}
      <section
        ref={heroRef}
        data-hero
        className="bb-court bb-on-dark relative overflow-hidden"
        aria-labelledby="basketball-title"
      >

        <div className="relative mx-auto w-full max-w-[1500px] px-4 pt-9 pb-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-12 lg:gap-12">

            <div className="flex flex-col lg:col-span-7">
              <div data-b="k" className="text-bb-leather">
                <span className="bb-rule block w-full max-w-[300px]" aria-hidden />
                <p className="mt-3.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-fg-muted">
                  Basketball Betting
                </p>
              </div>
              <h1
                id="basketball-title"
                data-b="h"
                className="mt-3 text-[clamp(2.35rem,6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.05em] text-fg"
              >
                Basketball Betting on{' '}
                <span className="text-bb-leather [text-shadow:0_0_28px_rgba(255,122,51,0.45)]">1xBet</span>
              </h1>

              <p data-b="p" className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-fg sm:text-[18px]">
                Basketball moves quickly. A few possessions can change the score, momentum and
                direction of a game, making every quarter important.
              </p>

              <div className="hero-spill">

              <p data-b="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                The basketball betting section on 1xBet gives users a dedicated place to browse
                available basketball matches, review event information and explore the markets
                offered for each game.
              </p>

              <p data-b="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                From scheduled fixtures to selected live events, users can check available
                basketball betting markets, review current basketball betting odds and access
                supported basketball events through the platform.
              </p>

              <p data-b="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                Whether you&rsquo;re looking for basketball betting India, online basketball
                betting or live match options, availability can depend on the event, location and
                current platform coverage.
              </p>

              <p data-b="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                Always check the latest match information, available markets and applicable terms
                before participating.
              </p>

              </div>

              <div data-b="cta" className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
                <Cta href="#markets" solid>Explore Basketball Betting</Cta>
                <Cta href="#live">View Live Basketball</Cta>
              </div>

              <div className="mt-8 max-w-[420px]">
                <QuarterBar upTo={1} />
                <ScoringRun className="mt-5" />
              </div>
            </div>

            <div data-b="court" className="lg:col-span-5">
              {/* Capped: at 300x280 an uncapped column would run far taller than
                  the copy beside it. */}
              <div className="mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[460px]">
                <HalfCourt glow className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= Markets ======================= */}
      <Sec id="markets" n={2} kicker="Explore Basketball Betting Markets" title="Markets for Different Basketball Games" tone="wood" tinted>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              Every basketball game can offer different betting markets depending on the
              competition, teams, event stage and match status.
            </Lead>
            <P>
              The basketball betting markets available for one game may differ from those offered
              for another. Users can open the individual event to review the available options and
              current basketball odds.
            </P>
            <P>
              Markets may also change as a game approaches or, where live markets are available,
              while the game is being played.
            </P>
            <P>
              Before making a decision, review the current event information and make sure you
              understand the market you&rsquo;re viewing.
            </P>
            <div className="pt-1">
              <Cta href="#odds">View Basketball Markets</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bb-card p-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-bb-wood">
                Game by game
              </p>
              <div className="bb-wood mt-5 h-20 rounded-[2px] border border-line" aria-hidden />
              <QuarterBar upTo={0} className="mt-5" />
            </div>
          </div>
        </div>
      </Sec>

      {/* ======================== Odds ========================= */}
      <Sec id="odds" n={3} kicker="Basketball Betting Odds" title="Check the Current Basketball Odds" tone="leather">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              Basketball betting odds show the prices displayed for available basketball markets.
            </Lead>
            <P>
              Odds can change before a game as new information becomes available. During live
              play, changes in the score, team performance or game situation can also affect the
              available markets and live basketball odds.
            </P>
            <P>
              Because basketball can move quickly, the odds displayed earlier may not remain
              available later.
            </P>
            <P>Always check the current event page for the latest information.</P>
            <P>
              Basketball odds do not guarantee an outcome. Every game has an uncertain result, and
              users should understand the financial risks involved before participating.
            </P>
          </div>

          <div className="lg:col-span-5">
            <div className="bb-card p-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-bb-leather">
                Scoring runs
              </p>
              <ScoringRun className="mt-5" />
              <ScoringRun pattern={[0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1]} className="mt-6" />
            </div>
          </div>
        </div>
      </Sec>

      {/* ==================== Live basketball ================== */}
      <Sec id="live" n={4} kicker="Live Basketball Betting" title="Follow the Game as It Happens" tone="leather" dark>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Live basketball betting allows users to explore selected markets while a basketball
            game is already in progress.
          </Lead>
          <P>
            Basketball can change rapidly. A scoring run, timeout, foul, injury or change in
            momentum can affect the game and the markets available during live play.
          </P>
          <P>
            Where live basketball markets are supported, users can follow the event and review the
            options currently displayed on the platform.
          </P>
          <P>
            Live markets can change, suspend or close as the game develops. Always check the
            latest information before participating.
          </P>
          <P>Live basketball betting may not be available for every game or in every location.</P>
          <div className="pt-1">
            <Cta href="#app" solid>Explore Live Basketball</Cta>
          </div>
        </div>
      </Sec>

      {/* ===================== Match betting =================== */}
      <Sec n={5} kicker="Basketball Match Betting" title="Review the Game Before You Decide" tone="leather">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-5">
            <Lead>
              Basketball match betting gives users access to available markets associated with
              individual basketball fixtures.
            </Lead>
            <P>Before participating, review the information shown for the game, including:</P>
          </div>

          <div className="lg:col-span-7">
            <ul className="bb-card divide-y divide-line p-1.5">
              {MATCH_CHECKS.map((item, i) => (
                <li key={item} className="flex items-center gap-3.5 px-3.5 py-3">
                  <span className="font-mono text-[11px] font-bold text-bb-leather">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] font-semibold text-fg sm:text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7 max-w-4xl space-y-4">
          <P>
            Different games can have different markets. An option available for one fixture should
            not automatically be assumed to be available for another.
          </P>
          <P>
            The individual event page provides the most relevant information about the game and
            the markets currently available.
          </P>
        </div>
      </Sec>

      {/* ======================== India ======================== */}
      <Sec n={6} kicker="Basketball Betting India" title="Basketball Betting for Users in India" tone="wood" tinted>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Basketball has a growing audience in India alongside its established international
            following.
          </Lead>
          <P>
            Basketball betting India availability depends on the user&rsquo;s location, applicable
            regulations, platform coverage and eligibility requirements.
          </P>
          <P>
            Users in India should confirm that the relevant service is permitted in their location
            before participating and make sure they meet all applicable age and eligibility
            requirements.
          </P>
          <P>
            Where basketball markets are available, users can browse supported fixtures, review the
            available markets and check the current odds displayed for each event.
          </P>
          <P>
            The available competitions, games and markets can change, so always refer to the latest
            information provided on the platform.
          </P>
        </div>
      </Sec>

      {/* ======================== Online ======================= */}
      <Sec n={7} kicker="Online Basketball Betting" title="Browse Basketball Markets Online" tone="court">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Online basketball betting gives users access to available basketball events through an
            online platform.
          </Lead>
          <P>
            Users can browse upcoming games, review team and event information, explore basketball
            betting markets and check the current odds displayed for each fixture.
          </P>
          <P>
            The available selection can include different competitions and events depending on
            current platform coverage and location.
          </P>
          <P>
            If you&rsquo;re searching for basketball betting online, always use the official
            platform and check whether the game or competition you&rsquo;re interested in is
            currently available.
          </P>
          <div className="pt-1">
            <Cta href="#app">Explore Online Basketball</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================= App ========================= */}
      <Sec id="app" n={8} kicker="Basketball Betting App" title="Access Basketball on Mobile" tone="leather" tinted>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              The basketball betting app provides a mobile-focused way to access supported
              basketball markets from a compatible device.
            </Lead>
            <P>
              Registered users may be able to browse available basketball games, review event
              information and access their account through supported mobile options.
            </P>
            <P>
              The availability of the app and its features can depend on your device, operating
              system and location.
            </P>
            <P>
              Users looking for a basketball betting app in India should check the official 1xBet
              platform for current mobile availability and installation requirements.
            </P>
            <P>
              Avoid downloading applications from unknown third-party sources. Always verify that
              you&rsquo;re using an official source before entering account information.
            </P>
            <div className="pt-1">
              <Cta href="/#app" solid>Explore the Basketball Betting App</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bb-card flex items-center justify-center p-10">
              <MonitorSmartphone className="h-20 w-20 text-bb-leather" strokeWidth={1.2} aria-hidden />
            </div>
          </div>
        </div>
      </Sec>

      {/* ====================== Live odds ====================== */}
      <Sec n={9} kicker="Live Basketball Odds" title="Odds Can Change During the Game" tone="leather" dark>
        <div className="max-w-4xl space-y-4">
          <Lead>Live basketball odds can change as a game progresses.</Lead>
          <P>
            Basketball is a fast-moving sport. A scoring run, change in lead, foul trouble, timeout
            or other game event can affect the markets and odds displayed during live play.
          </P>
          <P>
            Users following live basketball markets should check the current event information
            rather than relying on odds viewed earlier.
          </P>
          <P>Markets can change, suspend or become unavailable as the game develops.</P>
          <P>
            The availability of live basketball markets depends on the individual event and
            location.
          </P>
        </div>
      </Sec>

      {/* ==================== Competitions ===================== */}
      <Sec n={10} kicker="Basketball Competitions" title="Find Available Basketball Events" tone="court" tinted>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Basketball is played across different leagues, competitions and tournaments throughout
            the year.
          </Lead>
          <P>
            Depending on current platform coverage, users may find available basketball events from
            different competitions.
          </P>
          <P>
            The exact selection can change according to the basketball calendar, competition
            schedule and regional availability.
          </P>
          <P>
            When browsing a competition, select an available game to see the current markets and
            odds offered for that event.
          </P>
          <P>Always check the individual match page for the latest information.</P>
        </div>
      </Sec>

      {/* ========================= Why ========================= */}
      <Sec n={11} kicker="Why Choose 1xBet for Basketball?" title="A Dedicated Basketball Experience" tone="leather" dark>
        <Lead>
          1xBet brings available basketball games and markets together in one dedicated section.
        </Lead>

        <Rail
          className="mt-8"
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-3 sm:gap-4"
          card="82%"
          label="Why choose 1xBet for basketball"
        >
          {WHY.map(({ t, b, icon: Icon }) => (
            <div key={t} className="bb-card p-6">
              <Icon className="h-7 w-7 text-bb-leather" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-4 text-[16px] font-extrabold tracking-[-0.01em] text-fg">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{b}</p>
            </div>
          ))}
        </Rail>

        <p className="mt-7 max-w-4xl text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          The exact competitions, games, markets and features available can vary according to
          location and current platform coverage.
        </p>
      </Sec>

      {/* ===================== Responsible ===================== */}
      <Sec n={12} kicker="Basketball Betting and Responsible Use" title="Keep Your Betting Within Your Limits" tone="court" tinted>
        <Rail
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-3 sm:gap-4"
          card="86%"
          label="Responsible play guidance"
        >
          {RESPONSIBLE.map((text, i) => (
            <div key={i} className="bb-card flex gap-4 p-6">
              <span className="font-mono text-[12px] font-bold text-bb-court">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[14px] leading-relaxed text-fg-muted">{text}</p>
            </div>
          ))}
        </Rail>
      </Sec>

      {/* ========================= FAQ ========================= */}
      <section id="faq" className="scroll-mt-[68px] md:scroll-mt-[118px] border-t border-line bg-canvas py-9 sm:py-11 lg:py-14">
        <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="text-bb-leather">
                  <span className="bb-rule block w-full max-w-[300px]" aria-hidden />
                  <div className="mt-4 flex items-baseline gap-4">
                    <span className="bb-index shrink-0" aria-hidden>13</span>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-fg-muted">
                      Frequently Asked Questions
                    </span>
                  </div>
                </div>
                <h2 className="mt-4 text-[clamp(1.75rem,4.2vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.042em] text-fg">
                  Basketball betting, answered
                </h2>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={faqEntries} />
            </div>
          </div>
        </div>
      </section>

      {/* ======================= Closing ======================= */}
      <Sec n={14} kicker="Explore Basketball Betting on 1xBet" title="Explore Basketball Betting on 1xBet" tone="leather" dark>
        <div className="max-w-4xl space-y-4">
          <Lead>
            From basketball betting India and online basketball betting to selected live games,
            1xBet provides a dedicated place to browse available basketball fixtures and markets.
          </Lead>
          <P>
            Explore basketball betting markets, check current basketball betting odds, follow
            selected games through live basketball betting and review live basketball odds where
            supported.
          </P>
          <P>
            Whether you&rsquo;re following a regular league game or an important competition
            fixture, check the individual event page for the markets and odds currently available.
          </P>
          <P>
            Mobile users can also check the availability of the basketball betting app and
            supported mobile access options.
          </P>
          <P>
            Basketball events, markets, competitions and services can vary according to location
            and applicable regulations. Always check the latest information provided on the
            platform, review the relevant terms and participate responsibly.
          </P>

          <div className="grid grid-cols-2 gap-2.5 pt-2 sm:flex sm:flex-wrap sm:gap-3">
            <Cta href="#markets" solid>Explore Basketball Betting</Cta>
            <Cta href="/sports">Explore Sports</Cta>
          </div>
        </div>
      </Sec>
    </main>
  );
}
